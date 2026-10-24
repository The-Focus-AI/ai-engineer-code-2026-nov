#!/usr/bin/env bun
// Lint the authored Contract Markdown sources under src/ against
// .agents/skills/open-prose/contract-markdown.md — the structural half of
// `prose lint`, which needs no compiler and no run.
//
// Usage:
//   bun scripts/validate-contracts.ts [--root <dir>] [--json]
//
// Exit 0 = every contract is structurally sound, 1 = at least one error.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const rootFlag = args.indexOf("--root");
const root = resolve(rootFlag >= 0 ? args[rootFlag + 1]! : join(HERE, ".."));
const srcDir = join(root, "src");

type Kind = "responsibility" | "function" | "gateway" | "pattern" | "test";
const KINDS = new Set<Kind>(["responsibility", "function", "gateway", "pattern", "test"]);

interface Issue {
  file: string;
  where: string;
  message: string;
}

const errors: Issue[] = [];
const warnings: Issue[] = [];
const err = (file: string, where: string, message: string): void => void errors.push({ file, where, message });
const warn = (file: string, where: string, message: string): void => void warnings.push({ file, where, message });

const REQUIRED: Record<Kind, string[]> = {
  responsibility: ["Goal", "Requires", "Maintains", "Continuity"],
  function: ["Parameters", "Returns"],
  gateway: ["Continuity", "Maintains", "Emits"],
  pattern: [],
  test: ["Fixtures", "Expects"],
};

const FORBIDDEN: Record<Kind, string[]> = {
  responsibility: ["Parameters", "Returns"],
  function: ["Requires", "Maintains", "Continuity"],
  gateway: ["Parameters", "Returns"],
  pattern: [],
  test: [],
};

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const name of readdirSync(dir).sort()) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith(".prose.md")) out.push(full);
  }
  return out;
}

function frontmatter(text: string, rel: string): Record<string, string> {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!m) {
    err(rel, "frontmatter", "missing identity frontmatter (--- name/kind ---)");
    return {};
  }
  const fields: Record<string, string> = {};
  for (const line of m[1]!.split(/\r?\n/)) {
    const hit = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (hit) fields[hit[1]!] = hit[2]!.replace(/^["']|["']$/g, "").trim();
  }
  return fields;
}

interface Section {
  level: number;
  name: string;
  line: number;
}

function sections(text: string): Section[] {
  const out: Section[] = [];
  const lines = text.split(/\r?\n/);
  let fenced = false;
  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) fenced = !fenced;
    if (fenced) return;
    const m = /^(#{1,4})\s+(.*\S)\s*$/.exec(line);
    if (m) out.push({ level: m[1]!.length, name: m[2]!.trim(), line: i + 1 });
  });
  return out;
}

function fenced(text: string, rel: string): void {
  let open = 0;
  for (const line of text.split(/\r?\n/)) if (/^\s*```/.test(line)) open++;
  if (open % 2 !== 0) err(rel, "fences", "unbalanced ``` fence");
}

function bullets(text: string, heading: string): { line: number; text: string }[] {
  const lines = text.split(/\r?\n/);
  const re = new RegExp(`^###\\s+${heading}\\s*$`);
  const start = lines.findIndex((l) => re.test(l));
  if (start === -1) return [];
  const out: { line: number; text: string }[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i]!;
    if (/^#{1,4}\s+/.test(line)) break;
    if (/^-\s+/.test(line)) out.push({ line: i + 1, text: line.trim() });
  }
  return out;
}

function sectionText(text: string, secs: Section[], name: string): string {
  const lines = text.split(/\r?\n/);
  const start = secs.find((s) => s.level === 3 && s.name === name);
  if (!start) return "";
  const next = secs.find((s) => s.level === 3 && s.line > start.line);
  return lines.slice(start.line, next ? next.line - 1 : undefined).join("\n");
}

const files = walk(srcDir);
if (files.length === 0) err("src/", "discovery", `no *.prose.md contracts under ${srcDir}`);

for (const full of files) {
  const rel = relative(root, full).split("\\").join("/");
  const text = readFileSync(full, "utf8");
  const fm = frontmatter(text, rel);

  const name = fm.name;
  const kind = fm.kind as Kind | undefined;

  if (!name) err(rel, "frontmatter.name", "missing `name`");
  if (!kind) err(rel, "frontmatter.kind", "missing `kind`");
  else if (!KINDS.has(kind)) err(rel, "frontmatter.kind", `unknown kind ${JSON.stringify(kind)}`);

  const expected = full.split(/[\\/]/).pop()!.replace(/\.prose\.md$/, "");
  if (name && name !== expected) err(rel, "frontmatter.name", `name ${JSON.stringify(name)} does not match filename ${JSON.stringify(expected)}`);

  if (kind === "test" && !fm.subject) err(rel, "frontmatter.subject", "a kind: test must declare `subject`");
  if (kind !== "test" && fm.subject) warn(rel, "frontmatter.subject", "subject only applies to kind: test");

  fenced(text, rel);

  const secs = sections(text);
  const seen = new Map<string, number>();
  for (const s of secs) {
    if (s.level === 2) err(rel, `line ${s.line}`, `## starts an inline node boundary; a standalone contract uses ### (got "## ${s.name}")`);
    if (s.level !== 3 && s.level !== 4) continue;
    if (s.level === 3) {
      const prior = seen.get(s.name);
      if (prior !== undefined) err(rel, `line ${s.line}`, `duplicate ### ${s.name} (first at line ${prior})`);
      else seen.set(s.name, s.line);
    }
  }

  if (kind && KINDS.has(kind)) {
    for (const section of REQUIRED[kind]) {
      if (!seen.has(section)) err(rel, "sections", `a kind: ${kind} must declare ### ${section}`);
    }
    for (const section of FORBIDDEN[kind]) {
      if (seen.has(section)) err(rel, "sections", `a kind: ${kind} must not declare ### ${section}`);
    }
  }

  const h3 = secs.filter((s) => s.level === 3);
  for (const s of secs) {
    if (s.level !== 4) continue;
    const owner = h3.filter((h) => h.line < s.line).pop();
    if (!owner || (owner.name !== "Maintains" && owner.name !== "Requires")) {
      err(rel, `line ${s.line}`, `#### ${s.name} is only a facet inside ### Maintains (or a facet-need inside ### Requires)`);
    }
  }

  if (seen.has("Continuity")) {
    const block = sectionText(text, secs, "Continuity");
    if (!/(input|self|external)[- ]driven/.test(block)) {
      warn(rel, "Continuity", "declare a wake source: input-driven, self-driven, or external-driven");
    }
  }

  if (kind === "function") {
    for (const heading of ["Parameters", "Returns"]) {
      const items = bullets(text, heading);
      if (items.length === 0) continue;
      for (const b of items) {
        if (!/^-\s+`[^`]+`(?:\s*(?:,|and)\s*`[^`]+`)*\s*:/.test(b.text)) {
          err(rel, `line ${b.line}`, `contract item style: "- \`name\`: description" (got ${JSON.stringify(b.text.slice(0, 48))})`);
        }
      }
    }
  }

  if (/\b(TODO|FIXME|TBD)\b/.test(text.replace(/`[^`]*`/g, ""))) warn(rel, "body", "contains a TODO/FIXME/TBD marker");

  if (!/^#\s+/m.test(text)) warn(rel, "title", "no # human title");
}

const summary = {
  ok: errors.length === 0,
  contracts: files.length,
  errors,
  warnings,
};

if (asJson) {
  process.stdout.write(JSON.stringify(summary, null, 2) + "\n");
} else {
  const line = (s = ""): void => void process.stdout.write(s + "\n");
  line(`prose contracts — ${files.length} source${files.length === 1 ? "" : "s"} under src/`);
  for (const w of warnings) line(`WARN      ${w.file}:${w.where}  ${w.message}`);
  for (const e of errors) line(`ERROR     ${e.file}:${e.where}  ${e.message}`);
  line(errors.length ? `result    INVALID (${errors.length} error${errors.length === 1 ? "" : "s"})` : "result    VALID — structurally sound");
}

process.exit(errors.length ? 1 : 0);
