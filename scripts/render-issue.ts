#!/usr/bin/env bun
/**
 * Render a magazine issue.md to a self-contained, print-first issue.html.
 *
 * Usage:
 *   bun scripts/render-issue.ts magazine/issue-01/issue.md
 *
 * The issue is the source. Re-run this after every change while the issue is
 * `growing`; the HTML is disposable. Images are referenced relative to the
 * issue folder, so `assets/` must sit beside `issue.md`.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

interface IssueMeta {
  title: string;
  issue: string;
  conference: string;
  date: string;
  theme: string;
  state: "growing" | "frozen";
}

const input = resolve(process.argv[2] ?? "magazine/issue-01/issue.md");
if (!existsSync(input)) {
  console.error(`  ✗ no issue at ${input}`);
  process.exit(1);
}

const source = readFileSync(input, "utf8");
const fm = source.match(/^---\n([\s\S]*?)\n---\n?/);
if (!fm) {
  console.error("  ✗ issue.md needs YAML frontmatter between --- lines");
  process.exit(1);
}
const raw = Object.fromEntries(
  fm[1]!
    .split("\n")
    .map((line) => line.match(/^([A-Za-z_]+):\s*(.*)$/))
    .filter((m): m is RegExpMatchArray => Boolean(m))
    .map((m) => [m[1]!, m[2]!.replace(/^["']|["']$/g, "")]),
);
const meta: IssueMeta = {
  title: raw.title ?? "Untitled issue",
  issue: raw.issue ?? "01",
  conference: raw.conference ?? "",
  date: raw.date ?? "",
  theme: raw.theme ?? "",
  state: raw.state === "frozen" ? "frozen" : "growing",
};

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inline(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  return out;
}

type Block =
  | { kind: "h1" | "h2" | "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "quote"; text: string }
  | { kind: "figure"; src: string; caption: string }
  | { kind: "code"; text: string };

function parse(body: string): Block[] {
  const lines = body.split("\n");
  const blocks: Block[] = [];
  let para: string[] = [];

  const flush = (): void => {
    if (para.length) {
      blocks.push({ kind: "p", text: para.join(" ") });
      para = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const t = line.trim();
    if (!t) { flush(); continue; }

    if (t.startsWith("```")) {
      flush();
      const code: string[] = [];
      for (i++; i < lines.length && !lines[i]!.trim().startsWith("```"); i++) code.push(lines[i]!);
      blocks.push({ kind: "code", text: code.join("\n") });
      continue;
    }

    const h = t.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flush();
      blocks.push({ kind: h[1]!.length === 1 ? "h1" : h[1]!.length === 2 ? "h2" : "h3", text: h[2]! });
      continue;
    }

    const img = t.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) {
      flush();
      blocks.push({ kind: "figure", src: img[2]!, caption: img[1]! });
      continue;
    }

    if (t.startsWith("> ")) {
      flush();
      const quote: string[] = [];
      for (; i < lines.length && lines[i]!.trim().startsWith("> "); i++) quote.push(lines[i]!.trim().slice(2));
      i--;
      blocks.push({ kind: "quote", text: quote.join(" ") });
      continue;
    }

    if (t.startsWith("- ")) {
      flush();
      const items: string[] = [];
      for (; i < lines.length && lines[i]!.trim().startsWith("- "); i++) items.push(lines[i]!.trim().slice(2));
      i--;
      blocks.push({ kind: "ul", items });
      continue;
    }

    para.push(t);
  }
  flush();
  return blocks;
}

const blocks = parse(source.slice(fm[0].length));
const firstSection = blocks.findIndex((b) => b.kind === "h2");
const cover = firstSection === -1 ? blocks : blocks.slice(0, firstSection);
const sections = firstSection === -1 ? [] : blocks.slice(firstSection);

function renderBlocks(list: Block[]): string {
  const out: string[] = [];
  for (let i = 0; i < list.length; i++) {
    const b = list[i]!;
    switch (b.kind) {
      case "h1": out.push(`<h1>${inline(b.text)}</h1>`); break;
      case "h2": out.push(`<h2>${inline(b.text)}</h2>`); break;
      case "h3": out.push(`<h3>${inline(b.text)}</h3>`); break;
      case "p": out.push(`<p>${inline(b.text)}</p>`); break;
      case "ul": out.push(`<ul>${b.items.map((x) => `<li>${inline(x)}</li>`).join("")}</ul>`); break;
      case "quote": out.push(`<blockquote>${inline(b.text)}</blockquote>`); break;
      case "figure": out.push(`<figure><img src="${escapeHtml(b.src)}" alt="${escapeHtml(b.caption)}" loading="lazy"><figcaption>${inline(b.caption)}</figcaption></figure>`); break;
      case "code": out.push(`<pre><code>${escapeHtml(b.text)}</code></pre>`); break;
    }
  }
  return out.join("\n");
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(meta.title)} — issue ${escapeHtml(meta.issue)}</title>
<style>
  :root { --ink: #191714; --paper: #f6f2e9; --muted: #6d6458; --rule: #c9bfae; --accent: #8a2f1d; }
  * { box-sizing: border-box; }
  html { background: var(--paper); }
  body { margin: 0; color: var(--ink); font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; line-height: 1.55; }
  .page { max-width: 46rem; margin: 0 auto; padding: 4rem 1.5rem 6rem; }
  .cover { min-height: 88vh; display: flex; flex-direction: column; justify-content: center; border-bottom: 1px solid var(--rule); }
  .kicker { font: 600 .72rem/1.2 ui-sans-serif, system-ui, sans-serif; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); }
  h1 { font-size: clamp(3rem, 8vw, 6rem); line-height: .95; letter-spacing: -.03em; margin: 1.2rem 0; }
  h2 { font-size: 2.1rem; line-height: 1.1; letter-spacing: -.02em; margin: 3.5rem 0 1rem; }
  h3 { font-size: 1.25rem; margin: 2rem 0 .5rem; }
  p { font-size: 1.12rem; margin: 0 0 1.1rem; }
  .cover p { font-size: 1.35rem; color: var(--muted); max-width: 36rem; }
  blockquote { margin: 1.8rem 0; padding: .2rem 0 .2rem 1.4rem; border-left: 3px solid var(--accent); font-size: 1.35rem; font-style: italic; }
  figure { margin: 2rem 0; }
  figure img { width: 100%; height: auto; display: block; }
  figcaption { font: .85rem/1.4 ui-sans-serif, system-ui, sans-serif; color: var(--muted); margin-top: .5rem; }
  ul { padding-left: 1.2rem; }
  li { margin: .35rem 0; }
  a { color: var(--accent); }
  code { font: .9em ui-monospace, SFMono-Regular, Menlo, monospace; background: #eae3d5; padding: .1em .3em; }
  .meta { margin-top: 2.5rem; font: .8rem/1.5 ui-sans-serif, system-ui, sans-serif; color: var(--muted); }
  .state { display: inline-block; border: 1px solid var(--rule); padding: .15rem .5rem; border-radius: 999px; margin-right: .5rem; }
  @media print {
    @page { margin: 18mm 16mm; }
    html, body { background: #fff; }
    .page { max-width: none; padding: 0; }
    .cover { min-height: auto; padding-bottom: 2rem; }
    h2 { break-before: page; }
    figure, blockquote { break-inside: avoid; }
    a { color: inherit; text-decoration: none; }
  }
</style>
</head>
<body>
<div class="page">
  <header class="cover">
    <div class="kicker">${escapeHtml(meta.conference)} · Issue ${escapeHtml(meta.issue)} · ${escapeHtml(meta.date)}</div>
    ${renderBlocks(cover)}
    <div class="meta"><span class="state">${escapeHtml(meta.state)}</span>${escapeHtml(meta.theme)}</div>
  </header>
  ${renderBlocks(sections)}
</div>
</body>
</html>
`;

const out = resolve(dirname(input), "issue.html");
writeFileSync(out, html);
console.log(`  rendered ${out} (${meta.state})`);
