#!/usr/bin/env bun
/**
 * Bundle an LLM-composed explainer page with its data and the fixed runtime.
 *
 * Usage:
 *   bun scripts/bundle-explainer.ts explainers/<slug>/page.html
 *
 * The page is the design; it must contain three placeholders:
 *   <!--READER_STYLE-->  <!--READER_DATA-->  <!--READER_RUNTIME-->
 * The bundle injects runtime/reader.css, the glossary + questions as JSON, and
 * runtime/reader.js, then writes index.html. The model never writes behavior.
 */

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const input = resolve(process.argv[2] ?? "explainers/example/page.html");
if (!existsSync(input)) {
  console.error(`  ✗ no page at ${input}`);
  process.exit(1);
}
const dir = dirname(input);
const outIdx = process.argv.indexOf("--out");
const out = outIdx >= 0 ? resolve(process.argv[outIdx + 1]!) : join(dir, "index.html");
const runtimeSrc = resolve(import.meta.dir, "..", "explainers", "runtime");

const readJson = <T>(name: string, fallback: T): T => {
  const p = join(dir, name);
  if (!existsSync(p)) return fallback;
  return JSON.parse(readFileSync(p, "utf8")) as T;
};

const page = readFileSync(input, "utf8");
const missing = ["<!--READER_STYLE-->", "<!--READER_DATA-->", "<!--READER_RUNTIME-->"]
  .filter((token) => !page.includes(token));
if (missing.length) {
  console.error(`  ✗ page.html is missing ${missing.join(", ")}`);
  process.exit(1);
}

const guidePath = join(dir, "guide.md");
let meta: Record<string, unknown> = {};
if (existsSync(guidePath)) {
  const source = readFileSync(guidePath, "utf8");
  const fm = source.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    meta = Object.fromEntries(
      fm[1]!.split("\n")
        .map((line) => line.match(/^([A-Za-z_]+):\s*(.*)$/))
        .filter((m): m is RegExpMatchArray => Boolean(m))
        .map((m) => [m[1]!, m[2]!.replace(/^["']|["']$/g, "")]),
    );
  }
}

const glossary = readJson<{ terms: Record<string, unknown> }>("glossary.json", { terms: {} });
const questions = readJson<{ questions: unknown[] }>("questions.json", { questions: [] });

const data = { meta, terms: glossary.terms, questions: questions.questions };
const json = JSON.stringify(data).replace(/</g, "\\u003c");

const withData = page
  .replace("<!--READER_STYLE-->", '<link rel="stylesheet" href="runtime/reader.css">')
  .replace("<!--READER_DATA-->", `<script type="application/json" id="reader-data">${json}</script>`)
  .replace("<!--READER_RUNTIME-->", '<script src="runtime/reader.js" defer></script>');

const runtimeDir = join(dir, "runtime");
mkdirSync(runtimeDir, { recursive: true });
for (const file of ["reader.js", "reader.css"]) {
  const from = join(runtimeSrc, file);
  if (!existsSync(from)) {
    console.error(`  ✗ runtime file missing: ${from}`);
    process.exit(1);
  }
  copyFileSync(from, join(runtimeDir, file));
}

writeFileSync(out, withData);
console.log(`  bundled ${out}`);
console.log(`  ${Object.keys(glossary.terms).length} terms · ${questions.questions.length} questions · runtime copied`);
