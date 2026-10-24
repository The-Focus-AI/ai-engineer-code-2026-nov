#!/usr/bin/env bun
/**
 * Validate an atlas page and its evidence graph.
 *
 * Usage:
 *   bun scripts/validate-atlas.ts atlases/<slug>/index.html
 *
 * Exit 0 only when every node, edge, citation, quote, and runtime reference
 * resolves. Warnings do not block.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const input = resolve(process.argv[2] ?? "atlases/example/index.html");
if (!existsSync(input)) {
  console.error(`  ✗ no page at ${input}`);
  process.exit(2);
}
const dir = dirname(input);
const html = readFileSync(input, "utf8");
const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string): void => void errors.push(m);
const warn = (m: string): void => void warnings.push(m);

type Evidence = { quote?: string; cite?: string; href?: string };
type Node = {
  id?: string;
  type?: string;
  label?: string;
  x?: number;
  y?: number;
  href?: string;
  evidence?: Evidence[];
};
type Edge = { from?: string; to?: string; kind?: string };
type Atlas = { title?: string; nodes?: Node[]; edges?: Edge[] };

if (!/^<!doctype html>/i.test(html.trim())) err("missing <!doctype html>");
if (!/<html[^>]*\blang=["'][^"']+["']/i.test(html)) err("<html> needs a lang attribute");
if (!/<meta[^>]+name=["']viewport["']/i.test(html)) err("missing viewport meta");
if (/<!--ATLAS_(STYLE|DATA|RUNTIME)-->/.test(html)) err("unbundled ATLAS placeholder still present");
if (!/id=["']atlas-graph["']/.test(html)) err('missing <svg id="atlas-graph">');
if (!/id=["']atlas-detail["']/.test(html)) err('missing <div id="atlas-detail">');

const dataMatch = html.match(/<script[^>]*id=["']atlas-data["'][^>]*>([\s\S]*?)<\/script>/i);
let atlas: Atlas | null = null;
if (!dataMatch) {
  err("missing the atlas-data JSON block");
} else {
  try {
    atlas = JSON.parse(dataMatch[1]!) as Atlas;
  } catch (e) {
    err(`atlas-data is not valid JSON: ${(e as Error).message}`);
  }
}

if (!/\.\.\/runtime\/atlas\.js/.test(html)) err("does not load ../runtime/atlas.js");
if (!/\.\.\/runtime\/atlas\.css/.test(html)) err("does not load ../runtime/atlas.css");
if (!existsSync(join(dir, "..", "runtime", "atlas.js"))) err("../runtime/atlas.js is missing");
if (!existsSync(join(dir, "..", "runtime", "atlas.css"))) err("../runtime/atlas.css is missing");

if (atlas) {
  const nodes = atlas.nodes ?? [];
  const edges = atlas.edges ?? [];
  if (!atlas.title) err("atlas.title is required");
  if (!nodes.length) err("atlas.nodes is empty");
  if (!edges.length) err("atlas.edges is empty");

  const ids = new Set<string>();
  const byId = new Map<string, Node>();
  const allowed = new Set(["theme", "cluster", "claim", "talk", "question"]);
  for (const n of nodes) {
    if (!n.id) { err("node without an id"); continue; }
    if (ids.has(n.id)) err(`duplicate node id: ${n.id}`);
    ids.add(n.id);
    byId.set(n.id, n);
    if (!n.type || !allowed.has(n.type)) err(`${n.id}: invalid type ${n.type}`);
    if (!n.label) err(`${n.id}: missing label`);
    if (typeof n.x !== "number" || typeof n.y !== "number") err(`${n.id}: x/y must be numbers`);
    if (n.type === "talk" && !n.href) err(`${n.id}: talk nodes need href`);
    if (n.type === "claim" && (!n.evidence || !n.evidence.length)) err(`${n.id}: claim has no evidence`);
  }

  const themeIds = nodes.filter((n) => n.type === "theme").map((n) => n.id!);
  if (themeIds.length !== 1) err(`expected exactly one theme node, found ${themeIds.length}`);

  const kinds = new Set(["supports", "instantiates", "contests", "refines", "asks"]);
  const degree = new Map<string, number>();
  for (const e of edges) {
    if (!e.from || !e.to) { err("edge without from/to"); continue; }
    if (!byId.has(e.from)) err(`edge from unknown node: ${e.from}`);
    if (!byId.has(e.to)) err(`edge to unknown node: ${e.to}`);
    if (!e.kind || !kinds.has(e.kind)) err(`edge ${e.from} → ${e.to}: invalid kind ${e.kind}`);
    if (e.from === e.to) err(`self edge: ${e.from}`);
    degree.set(e.from, (degree.get(e.from) ?? 0) + 1);
    degree.set(e.to, (degree.get(e.to) ?? 0) + 1);
  }
  for (const n of nodes) if (n.type !== "theme" && !degree.get(n.id!)) err(`${n.id}: orphan node`);

  const root = resolve(dir, "..", "..");
  const inside = (p: string): boolean => p === root || p.startsWith(root + "/");
  let citations = 0;
  for (const n of nodes) {
    for (const ev of n.evidence ?? []) {
      if (!ev.quote || !ev.cite || !ev.href) {
        err(`${n.id}: evidence needs quote, cite, href`);
        continue;
      }
      const m = ev.cite.match(/,\s*(\d\d:\d\d:\d\d)\s*$/);
      if (!m) { err(`${n.id}: cite must end with ", HH:MM:SS": ${ev.cite}`); continue; }
      const ts = m[1]!;
      const file = resolve(dir, ev.href);
      if (!inside(file)) { err(`${n.id}: evidence href escapes the repo: ${ev.href}`); continue; }
      if (!existsSync(file)) { err(`${n.id}: transcript not found: ${ev.href}`); continue; }
      const text = readFileSync(file, "utf8");
      if (!new RegExp(`^### ${ts}`, "m").test(text)) err(`${n.id}: ${ts} is not a section heading in ${ev.href}`);
      if (!text.includes(ev.quote)) err(`${n.id}: quote is not verbatim in ${ev.href}`);
      citations++;
    }
    if (n.type === "talk" && n.href) {
      const file = resolve(dir, n.href);
      if (!inside(file) || !existsSync(file)) err(`${n.id}: talk href does not resolve: ${n.href}`);
    }
  }

  // Every claim must reach the theme by walking edges in either direction.
  const adj = new Map<string, Set<string>>();
  for (const id of ids) adj.set(id, new Set());
  for (const e of edges) {
    if (!e.from || !e.to || !adj.has(e.from) || !adj.has(e.to)) continue;
    adj.get(e.from)!.add(e.to);
    adj.get(e.to)!.add(e.from);
  }
  const theme = themeIds[0];
  if (theme) {
    const seen = new Set([theme]);
    const queue = [theme];
    while (queue.length) {
      const id = queue.pop()!;
      for (const next of adj.get(id) ?? []) {
        if (seen.has(next)) continue;
        seen.add(next);
        queue.push(next);
      }
    }
    for (const n of nodes) if (!seen.has(n.id!)) err(`${n.id}: not connected to the theme`);
  }

  if (citations === 0) warn("no evidence citations found");
  console.log(
    errors.length
      ? `  INVALID (${errors.length}) · ${nodes.length} nodes · ${edges.length} edges`
      : `  valid — ${nodes.length} nodes · ${edges.length} edges · ${citations} citations`,
  );
}

for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
process.exit(errors.length ? 1 : 0);
