#!/usr/bin/env bun
/**
 * Validate a bundled explainer page against the design + interaction contract.
 *
 * Usage:
 *   bun scripts/validate-explainer.ts explainers/<slug>/index.html [--root .]
 *
 * Exit 0 when the page is shippable. Errors block; warnings do not.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";

const args = process.argv.slice(2);
const input = args.find((a) => !a.startsWith("--") && a !== ".");
if (!input) {
  console.error("usage: validate-explainer.ts <index.html> [--root .]");
  process.exit(2);
}
const file = resolve(input);
if (!existsSync(file)) {
  console.error(`  ✗ no page at ${file}`);
  process.exit(2);
}
const dir = dirname(file);
const rootFlag = args.indexOf("--root");
const root = resolve(rootFlag >= 0 ? args[rootFlag + 1]! : process.cwd());

const html = readFileSync(file, "utf8");
const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string): void => void errors.push(m);
const warn = (m: string): void => void warnings.push(m);
const inside = (p: string): boolean => p === root || p.startsWith(root + sep);

if (!/^<!doctype html>/i.test(html.trim())) err("missing <!doctype html>");
if (!/<html[^>]*\blang=["'][^"']+["']/i.test(html)) err("<html> needs a lang attribute");
if (!/<meta[^>]+name=["']viewport["']/i.test(html)) err("missing viewport meta");
if (!/id=["']reader-doc["']/.test(html)) err("missing <main id=\"reader-doc\">");
if (!/id=["']reader-panel["']/.test(html)) err("missing <aside id=\"reader-panel\">");
if (/<!--READER_(STYLE|DATA|RUNTIME)-->/.test(html)) err("unbundled READER placeholder still present");

const dataMatch = html.match(/<script[^>]*id=["']reader-data["'][^>]*>([\s\S]*?)<\/script>/i);
if (!dataMatch) {
  err("missing the reader-data JSON block");
} else {
  try {
    const data = JSON.parse(dataMatch[1]!) as { terms?: Record<string, unknown>; questions?: Array<{ section?: string }> };
    const terms = Object.keys(data.terms ?? {}).map((t) => t.toLowerCase());
    const used = new Set(
      [...html.matchAll(/data-term=["']([^"']+)["']/gi)].map((m) => m[1]!.toLowerCase()),
    );
    for (const t of used) if (!terms.includes(t)) err(`data-term "${t}" has no glossary entry`);
    for (const t of terms) if (!used.has(t)) warn(`glossary term "${t}" is never marked in the text`);
    const sections = new Set(
      [...html.matchAll(/data-chapter=["']([^"']+)["']/gi)].map((m) => m[1]!),
    );
    for (const q of data.questions ?? []) {
      if (q.section && !sections.has(q.section)) warn(`question section "${q.section}" has no data-chapter`);
    }
  } catch (e) {
    err(`reader-data is not valid JSON: ${(e as Error).message}`);
  }
}

if (!/runtime\/reader\.js/.test(html)) err("does not load runtime/reader.js");
if (!/runtime\/reader\.css/.test(html)) err("does not load runtime/reader.css");
if (!existsSync(join(dir, "runtime", "reader.js"))) err("runtime/reader.js is not copied next to the page");
if (!existsSync(join(dir, "runtime", "reader.css"))) err("runtime/reader.css is not copied next to the page");

for (const [label, m] of [...html.matchAll(/<script[^>]+src=["'](https?:\/\/[^"']+)["']/gi)].entries()) {
  err(`external script ${m[1]} (${label})`);
}
if (/\son[a-z]+\s*=\s*["']/i.test(html)) err("inline event handler (on*=) found; bind in runtime/reader.js");

for (const m of html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
  const src = m[1]!;
  if (/^(https?:|data:|\/\/)/i.test(src)) { warn(`external image ${src}`); continue; }
  const p = resolve(dir, src);
  if (!existsSync(p)) err(`image not found: ${src}`);
}

let citations = 0;
for (const m of html.matchAll(/href=["']([^"']+)["']/gi)) {
  const href = m[1]!;
  if (/^(https?:|mailto:|#)/i.test(href)) continue;
  const hrefPath = href.split("#")[0]!;
  if (!hrefPath) continue;
  if (/^\/talks\//.test(hrefPath) || /(\.\.\/)+talks\//.test(hrefPath)) {
    const p = hrefPath.startsWith("/") ? resolve(root, hrefPath.slice(1)) : resolve(dir, hrefPath);
    if (!inside(p) || !existsSync(p)) err(`citation link does not resolve: ${href}`);
    citations++;
  } else if (/^talks\//.test(hrefPath)) {
    warn(`citation "${href}" is relative to the page, not the repo — use ../../talks/...`);
  }
}
if (citations === 0) warn("no talk citations found; the guide should cite the corpus");

for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(errors.length ? `  INVALID (${errors.length})` : `  valid — ${citations} citations`);
process.exit(errors.length ? 1 : 0);
