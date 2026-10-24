#!/usr/bin/env bun
// prose serve — validate dist/manifest.active.json against compiler/ir-v0.md
// and resolve the trigger plan the runtime registers.
//
// Usage:
//   bun scripts/serve/validate-manifest.ts [--root <dir>] [--manifest <path>] [--json]
//
// Exit 0 = servable, 1 = not servable. Warnings do not fail a serve start.

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import type {
  CanonicalizerEntry,
  CanonicalizerModule,
  CompileSource,
  Diagnostic,
  Manifest,
  PostconditionEntry,
  PostconditionModule,
  Severity,
  SourceKind,
  TopologyEdge,
  TopologyNode,
  WakeSource,
} from "./types.ts";

const require = createRequire(import.meta.url);
const HERE = dirname(fileURLToPath(import.meta.url));

const KINDS = new Set<SourceKind>(["responsibility", "function", "gateway", "pattern", "test", "unknown"]);
const WAKE_SOURCES = new Set<WakeSource>(["input", "self", "external"]);
const SEVERITIES = new Set<Severity>(["info", "warning", "error"]);
const POSTCONDITION_MODES = new Set(["deterministic", "render-attested"]);
const SHA256 = /^sha256:[0-9a-f]{64}$/;

interface Issue {
  where: string;
  message: string;
}

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const rootFlag = args.indexOf("--root");
const manifestFlag = args.indexOf("--manifest");
const root = resolve(rootFlag >= 0 ? args[rootFlag + 1]! : process.env.PROSE_OPENPROSE_ROOT ?? join(HERE, "..", ".."));

const errors: Issue[] = [];
const warnings: Issue[] = [];
const notes: Issue[] = [];

const err = (where: string, message: string): void => void errors.push({ where, message });
const warn = (where: string, message: string): void => void warnings.push({ where, message });

function checkRelPath(where: string, p: unknown): p is string {
  if (typeof p !== "string" || p.length === 0) {
    err(where, "path must be a non-empty string");
    return false;
  }
  if (p.startsWith("/") || p.includes("\\")) {
    err(where, `path must be root-relative with forward slashes: ${p}`);
    return false;
  }
  if (p.split("/").some((s) => s === "" || s === "." || s === "..")) {
    err(where, `path has an empty, current, or parent segment: ${p}`);
    return false;
  }
  return true;
}

const abs = (rel: string): string => join(root, ...rel.split("/"));
const sha256 = (buf: Buffer): string => createHash("sha256").update(buf).digest("hex");

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const manifestPath = manifestFlag >= 0 ? resolve(args[manifestFlag + 1]!) : join(root, "dist", "manifest.active.json");
const nextPath = join(root, "dist", "manifest.next.json");

let ir: Manifest | undefined;
let promotion = "unknown";
let triggers: Triggers | null = null;

function finish(): never {
  const result = {
    ok: errors.length === 0,
    root,
    manifest: manifestPath,
    manifestSha256: existsSync(manifestPath) ? sha256(readFileSync(manifestPath)) : null,
    promotion,
    counts: {
      sources: ir?.sources.length ?? 0,
      nodes: ir?.topology.nodes.length ?? 0,
      edges: ir?.topology.edges.length ?? 0,
      entryPoints: ir?.topology.entry_points.length ?? 0,
    },
    triggers,
    errors,
    warnings,
    notes,
  };

  if (asJson) {
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
  } else {
    const line = (s = ""): void => void process.stdout.write(s + "\n");
    line("prose serve — active compiled intent");
    line(`root      ${root}`);
    line(`manifest  ${manifestPath}`);
    if (result.manifestSha256) line(`sha256    ${result.manifestSha256}`);
    if (ir) {
      line(`ir        ${ir.kind} v${ir.version}`);
      const count = (k: SourceKind): number => ir!.sources.filter((s) => s.kind === k).length;
      line(
        `source    ${result.counts.sources} files · ${count("responsibility")} responsibilities · ` +
          `${count("gateway")} gateways · ${count("function")} functions · ${count("test")} test`,
      );
      line(`topology  ${result.counts.nodes} nodes · ${result.counts.edges} edges · ${result.counts.entryPoints} entry points · acyclic=${ir.topology.acyclic}`);
      line(`wiring    ${ir.topology.edges.map((e) => `${e.producer}.${e.facet} → ${e.subscriber}`).join("\n          ")}`);
      line(`artifacts ${ir.canonicalizers.length} canonicalizers · ${ir.postconditions.length} postconditions`);
      line(`promotion ${promotion}`);
      if (triggers) {
        for (const t of triggers.cron) line(`cron      ${t.expression ?? "(none)"}  → ${t.node}`);
        for (const t of triggers.http) line(`http      ${t.method} ${t.path}  → ${t.node}${t.event ? ` (${t.event})` : ""}`);
        for (const t of triggers.self_clocks) line(`self      ${t.node}  (continuity-declared)`);
      }
    }
    for (const w of warnings) line(`WARN      ${w.where}: ${w.message}`);
    for (const e of errors) line(`ERROR     ${e.where}: ${e.message}`);
    line(errors.length ? `result    INVALID (${errors.length} error${errors.length === 1 ? "" : "s"})` : "result    VALID — servable");
  }

  process.exit(errors.length ? 1 : 0);
}

if (!existsSync(manifestPath)) {
  err("manifest", `missing ${manifestPath} — run \`prose compile\` then promote manifest.next.json`);
  finish();
}

const raw = readFileSync(manifestPath);
try {
  ir = JSON.parse(raw.toString("utf8")) as Manifest;
} catch (e) {
  err("manifest", `not valid JSON: ${(e as Error).message}`);
  finish();
}

const m = ir!;

// ---------------------------------------------------------------- top level

if (m.kind !== "openprose.compile-phase-ir") err("kind", `expected "openprose.compile-phase-ir", got ${JSON.stringify(m.kind)}`);
if (m.version !== 2) err("version", `expected integer 2, got ${JSON.stringify(m.version)}`);
for (const field of ["sources", "canonicalizers", "postconditions", "diagnostics"] as const) {
  if (!Array.isArray(m[field])) err(field, "must be an array");
}
if (!isRecord(m.topology)) {
  err("topology", "must be an object");
} else {
  if (!Array.isArray(m.topology.nodes)) err("topology.nodes", "must be an array");
  if (!Array.isArray(m.topology.edges)) err("topology.edges", "must be an array");
  if (!Array.isArray(m.topology.entry_points)) err("topology.entry_points", "must be an array");
  if (typeof m.topology.acyclic !== "boolean") err("topology.acyclic", "must be a boolean");
}
if (!isRecord(m.contract_fingerprints)) err("contract_fingerprints", "must be an object map");

if (errors.length) finish();

// ------------------------------------------------------------------ sources

const sourceNames = new Set<string>();
m.sources.forEach((s: CompileSource, i: number) => {
  const where = `sources[${i}]`;
  if (!isRecord(s)) { err(where, "must be an object"); return; }
  if (checkRelPath(`${where}.path`, s.path) && !existsSync(abs(s.path))) warn(`${where}.path`, `source no longer on disk: ${s.path}`);
  if (!KINDS.has(s.kind)) err(`${where}.kind`, `unknown kind ${JSON.stringify(s.kind)}`);
  if (s.name !== undefined) {
    if (typeof s.name !== "string" || !s.name.trim()) err(`${where}.name`, "must be a non-empty string when present");
    else if (sourceNames.has(s.name)) warn(`${where}.name`, `duplicate source name ${s.name}`);
    else sourceNames.add(s.name);
  }
});

// ------------------------------------------------------------------ topology

const nodes = m.topology.nodes ?? [];
const nodeById = new Map<string, TopologyNode>();
nodes.forEach((n: TopologyNode, i: number) => {
  const where = `topology.nodes[${i}]`;
  if (!isRecord(n)) { err(where, "must be an object"); return; }
  if (typeof n.node !== "string" || !n.node) err(`${where}.node`, "must be a non-empty string");
  else if (nodeById.has(n.node)) err(`${where}.node`, `duplicate node id ${n.node}`);
  else nodeById.set(n.node, n);
  if (typeof n.contract_fingerprint !== "string" || !SHA256.test(n.contract_fingerprint)) {
    err(`${where}.contract_fingerprint`, `expected sha256:<64 hex>, got ${JSON.stringify(n.contract_fingerprint)}`);
  }
  if (!WAKE_SOURCES.has(n.wake_source)) err(`${where}.wake_source`, `expected input|self|external, got ${JSON.stringify(n.wake_source)}`);
});

const edges = m.topology.edges ?? [];
const outgoing = new Map<string, Set<string>>();
edges.forEach((e: TopologyEdge, i: number) => {
  const where = `topology.edges[${i}]`;
  if (!isRecord(e)) { err(where, "must be an object"); return; }
  if (!nodeById.has(e.subscriber)) err(`${where}.subscriber`, `unknown node ${JSON.stringify(e.subscriber)}`);
  if (!nodeById.has(e.producer)) err(`${where}.producer`, `unknown node ${JSON.stringify(e.producer)}`);
  if (typeof e.facet !== "string" || !e.facet) err(`${where}.facet`, "must be a non-empty string");
  else if (nodeById.has(e.producer)) {
    if (!outgoing.has(e.producer)) outgoing.set(e.producer, new Set());
    outgoing.get(e.producer)!.add(e.facet);
  }
  if (e.subscriber === e.producer) err(where, "self-subscription edge");
});

if (m.topology.acyclic !== true) {
  err("topology.acyclic", "manifest is not acyclic");
} else {
  const state = new Map<string, 1 | 2>();
  const visit = (id: string, stack: string[]): void => {
    state.set(id, 1);
    for (const e of edges.filter((x) => x.subscriber === id)) {
      const next = e.producer;
      if (state.get(next) === 1) { err("topology.acyclic", `cycle: ${[...stack, id, next].join(" → ")}`); return; }
      if (!state.has(next)) visit(next, [...stack, id]);
    }
    state.set(id, 2);
  };
  for (const id of nodeById.keys()) if (!state.has(id)) visit(id, []);
}

const entryPoints = m.topology.entry_points ?? [];
const entrySet = new Set(entryPoints);
for (const id of entryPoints) {
  const n = nodeById.get(id);
  if (!n) err("topology.entry_points", `unknown node ${JSON.stringify(id)}`);
  else if (n.wake_source !== "external") err("topology.entry_points", `${id} is an entry point but wake_source is ${n.wake_source}`);
}
for (const [id, n] of nodeById) {
  if (n.wake_source === "external" && !entrySet.has(id)) warn("topology.entry_points", `external-driven node ${id} is not registered as an entry point`);
}

// ------------------------------------------------- contract fingerprints map

for (const [id, n] of nodeById) {
  const fp = m.contract_fingerprints[id];
  if (fp === undefined) err(`contract_fingerprints.${id}`, "missing entry for node");
  else if (fp !== n.contract_fingerprint) err(`contract_fingerprints.${id}`, "does not match topology node fingerprint");
}
for (const id of Object.keys(m.contract_fingerprints)) {
  if (!nodeById.has(id)) err(`contract_fingerprints.${id}`, "references a node that is not in the topology");
}

// ------------------------------------------------------------ canonicalizers

function loadArtifact<T>(where: string, rel: string, expectedExports: string[]): T | null {
  if (!checkRelPath(`${where}.artifact`, rel)) return null;
  const file = abs(rel);
  if (!existsSync(file)) { err(`${where}.artifact`, `artifact missing on disk: ${rel}`); return null; }
  try {
    const mod = require(file) as Record<string, unknown>;
    for (const name of expectedExports) {
      if (mod[name] === undefined) err(`${where}.artifact`, `module does not export ${name}`);
    }
    if (!file.startsWith(join(root, "dist") + sep) && !file.startsWith(join(root, "deps") + sep)) {
      warn(`${where}.artifact`, `artifact lives outside dist/: ${rel}`);
    }
    return mod as T;
  } catch (e) {
    err(`${where}.artifact`, `cannot load ${rel}: ${(e as Error).message}`);
    return null;
  }
}

const canonByNode = new Map<string, CanonicalizerEntry>();
m.canonicalizers.forEach((c: CanonicalizerEntry, i: number) => {
  const where = `canonicalizers[${i}]`;
  if (!isRecord(c)) { err(where, "must be an object"); return; }
  if (!nodeById.has(c.node)) err(`${where}.node`, `unknown node ${JSON.stringify(c.node)}`);
  else if (canonByNode.has(c.node)) err(`${where}.node`, `duplicate canonicalizer for ${c.node}`);
  if (!Array.isArray(c.facets) || !c.facets.length) err(`${where}.facets`, "must be a non-empty array");
  else {
    if (!c.facets.includes("@atomic")) err(`${where}.facets`, `must include "@atomic"`);
    if (new Set(c.facets).size !== c.facets.length) err(`${where}.facets`, "contains duplicates");
    for (const f of c.facets) if (typeof f !== "string" || !f) err(`${where}.facets`, `invalid facet ${JSON.stringify(f)}`);
  }
  const mod = loadArtifact<CanonicalizerModule>(where, c.artifact, ["canonicalize"]);
  if (mod && Array.isArray(c.facets)) {
    const spec = Object.keys(mod.SPEC ?? {});
    const declared = [...c.facets].sort().join(",");
    const actual = spec.sort().join(",");
    if (declared !== actual) err(`${where}.artifact`, `SPEC facets [${spec.join(", ")}] do not match manifest facets [${c.facets.join(", ")}]`);
  }
  if (nodeById.has(c.node)) {
    canonByNode.set(c.node, c);
    for (const facet of outgoing.get(c.node) ?? []) {
      if (Array.isArray(c.facets) && !c.facets.includes(facet)) {
        err(`${where}.facets`, `edge publishes facet "${facet}" but the canonicalizer does not emit it`);
      }
    }
  }
});
for (const id of nodeById.keys()) if (!canonByNode.has(id)) err("canonicalizers", `node ${id} has no canonicalizer`);

// -------------------------------------------------------------- postconditions

const postByNode = new Map<string, PostconditionEntry>();
m.postconditions.forEach((p: PostconditionEntry, i: number) => {
  const where = `postconditions[${i}]`;
  if (!isRecord(p)) { err(where, "must be an object"); return; }
  if (!nodeById.has(p.node)) err(`${where}.node`, `unknown node ${JSON.stringify(p.node)}`);
  else if (postByNode.has(p.node)) err(`${where}.node`, `duplicate postcondition for ${p.node}`);
  if (!POSTCONDITION_MODES.has(p.mode)) err(`${where}.mode`, `expected deterministic|render-attested, got ${JSON.stringify(p.mode)}`);
  const mod = loadArtifact<PostconditionModule>(where, p.artifact, ["validate"]);
  if (mod && typeof mod.mode === "string" && mod.mode !== p.mode) {
    err(`${where}.artifact`, `artifact mode ${mod.mode} does not match manifest mode ${p.mode}`);
  }
  if (nodeById.has(p.node)) postByNode.set(p.node, p);
});
for (const id of nodeById.keys()) if (!postByNode.has(id)) err("postconditions", `node ${id} has no postcondition validator`);

// ---------------------------------------------------------------- diagnostics

(m.diagnostics ?? []).forEach((d: Diagnostic, i: number) => {
  const where = `diagnostics[${i}]`;
  if (!isRecord(d)) { err(where, "must be an object"); return; }
  if (!SEVERITIES.has(d.severity)) err(`${where}.severity`, `unknown severity ${JSON.stringify(d.severity)}`);
  if (typeof d.message !== "string" || !d.message.trim()) err(`${where}.message`, "must be a non-empty string");
  if (d.sourcePath !== undefined && !m.sources.some((s) => s.path === d.sourcePath)) {
    warn(`${where}.sourcePath`, `does not reference a discovered source: ${d.sourcePath}`);
  }
  if (d.severity === "error") err(where, `error diagnostic present: ${d.message}`);
});

// ---------------------------------------------------------------- promotion

const isActive = manifestPath.endsWith("manifest.active.json");
if (!isActive) {
  promotion = "not-the-active-manifest";
} else if (existsSync(nextPath)) {
  promotion = sha256(readFileSync(nextPath)) === sha256(raw) ? "active-equals-next" : "active-differs-from-next";
  if (promotion === "active-differs-from-next") {
    warn("promotion", "manifest.active.json differs from manifest.next.json — a newer compile is not being served; promote it to serve the latest intent");
  }
} else {
  warn("promotion", "no manifest.next.json — active manifest cannot be checked for staleness");
}

// ------------------------------------------------------------- trigger plan

function sectionList(text: string, heading: string): string[] | null {
  const re = new RegExp(`^###\\s+${heading}\\s*$`, "m");
  const hit = re.exec(text);
  if (!hit) return null;
  const rest = text.slice(hit.index + hit[0].length);
  const end = rest.search(/^###\s+/m);
  const body = end === -1 ? rest : rest.slice(0, end);
  const bullets: string[] = [];
  let current: string | null = null;
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      if (current) bullets.push(current);
      current = trimmed.slice(2);
    } else if (current && trimmed) {
      current += ` ${trimmed}`;
    } else if (!trimmed && current) {
      bullets.push(current);
      current = null;
    }
  }
  if (current) bullets.push(current);
  return bullets;
}

const CRON = /(?<![\w*/,:-])((?:[0-9*/,:-]+\s+){4}[0-9*/,:-]+)(?![\w*/,:-])/;

interface CronTrigger { node: string; expression: string | null }
interface HttpTrigger { node: string; method: "POST"; path: string; event: string | null }
interface SelfClock { node: string; continuity: string[] | null }
interface Triggers { cron: CronTrigger[]; http: HttpTrigger[]; self_clocks: SelfClock[] }

const plan: Triggers = { cron: [], http: [], self_clocks: [] };
for (const id of entryPoints) {
  const src = m.sources.find((s) => s.name === id)?.path;
  const entry = { node: id, source: src ?? null, cron: null as string | null, route: null as string | null, event: null as string | null };
  if (src && existsSync(abs(src))) {
    const text = readFileSync(abs(src), "utf8");
    for (const line of sectionList(text, "Schedule") ?? []) {
      const hit = CRON.exec(line);
      if (hit) { entry.cron = hit[1]!.trim(); break; }
    }
    for (const line of sectionList(text, "Receives") ?? []) {
      const route = /POST\s+(\/\S+)/.exec(line);
      if (route) entry.route = route[1]!;
      const event = /Event:\s*`?([\w.-]+)`?/.exec(line);
      if (event) entry.event = event[1]!;
    }
    if (!entry.cron) warn(`trigger.${id}`, "entry point declares no cron expression in ### Schedule");
    if (!entry.route) warn(`trigger.${id}`, "entry point declares no POST route in ### Receives");
  }
  plan.cron.push({ node: id, expression: entry.cron });
  if (entry.route) plan.http.push({ node: id, method: "POST", path: entry.route, event: entry.event });
}

for (const id of [...nodeById.keys()].sort()) {
  const n = nodeById.get(id)!;
  if (n.wake_source !== "self") continue;
  const src = m.sources.find((s) => s.name === id)?.path;
  let continuity: string[] | null = null;
  if (src && existsSync(abs(src))) continuity = sectionList(readFileSync(abs(src), "utf8"), "Continuity");
  plan.self_clocks.push({ node: id, continuity });
}

triggers = plan;
finish();
