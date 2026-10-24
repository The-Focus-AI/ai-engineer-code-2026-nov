#!/usr/bin/env bun
/**
 * Bundle a composed atlas page with its graph data and the fixed runtime.
 *
 * Usage:
 *   bun scripts/bundle-atlas.ts atlases/<slug>/page.html
 *
 * page.html must contain:
 *   <!--ATLAS_STYLE-->  <!--ATLAS_DATA-->  <!--ATLAS_RUNTIME-->
 * The bundle injects ../runtime/atlas.css, the atlas.json graph, and
 * ../runtime/atlas.js, then writes index.html next to page.html.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const input = resolve(process.argv[2] ?? "atlases/example/page.html");
if (!existsSync(input)) {
  console.error(`  ✗ no page at ${input}`);
  process.exit(1);
}
const dir = dirname(input);
const atlasPath = join(dir, "atlas.json");
if (!existsSync(atlasPath)) {
  console.error(`  ✗ no atlas.json next to ${input}`);
  process.exit(1);
}

const page = readFileSync(input, "utf8");
const missing = ["<!--ATLAS_STYLE-->", "<!--ATLAS_DATA-->", "<!--ATLAS_RUNTIME-->"]
  .filter((token) => !page.includes(token));
if (missing.length) {
  console.error(`  ✗ page.html is missing ${missing.join(", ")}`);
  process.exit(1);
}

const atlas = JSON.parse(readFileSync(atlasPath, "utf8")) as {
  title?: string;
  nodes?: unknown[];
  edges?: unknown[];
};
const runtime = resolve(import.meta.dir, "..", "atlases", "runtime");
for (const file of ["atlas.js", "atlas.css"]) {
  if (!existsSync(join(runtime, file))) {
    console.error(`  ✗ runtime file missing: ${join(runtime, file)}`);
    process.exit(1);
  }
}

const json = JSON.stringify(atlas).replace(/</g, "\\u003c");
const html = page
  .replace("<!--ATLAS_STYLE-->", '<link rel="stylesheet" href="../runtime/atlas.css">')
  .replace("<!--ATLAS_DATA-->", `<script type="application/json" id="atlas-data">${json}</script>`)
  .replace("<!--ATLAS_RUNTIME-->", '<script src="../runtime/atlas.js" defer></script>');

const out = join(dir, "index.html");
writeFileSync(out, html);
console.log(`  bundled ${out}`);
console.log(`  ${atlas.nodes?.length ?? 0} nodes · ${atlas.edges?.length ?? 0} edges · runtime linked`);
