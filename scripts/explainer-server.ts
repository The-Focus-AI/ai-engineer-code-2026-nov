#!/usr/bin/env bun
/**
 * Serve a repo-rooted explainer and answer follow-up questions.
 *
 * Usage:
 *   bun scripts/explainer-server.ts --root . --dir explainers/<slug> --agent "claude -p"
 *
 * The page is served at /<dir>/ so its relative assets and runtime work, and
 * citations like ../../talks/... resolve to the talks under the repo root.
 * Loopback only. POST /ask runs the configured agent with the section in view.
 */

import { existsSync, statSync } from "node:fs";
import { extname, join, normalize, relative, resolve, sep } from "node:path";

const args = process.argv.slice(2);
const flag = (name: string, fallback: string): string => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] ?? fallback : fallback;
};

const root = resolve(flag("root", process.cwd()));
const dirRel = flag("dir", "explainers/example").replace(/^\/+|\/+$/g, "");
const dir = resolve(root, dirRel);
const port = Number(flag("port", process.env.EXPLAINER_PORT ?? "8790"));
const host = "127.0.0.1";
const agent = flag("agent", process.env.EXPLAINER_AGENT ?? "claude -p");
const timeoutMs = Number(flag("timeout", "180")) * 1000;

if (!existsSync(join(dir, "index.html"))) {
  console.error(`  ✗ ${dir}/index.html not found — bundle the guide first`);
  process.exit(1);
}
if (!dir.startsWith(root + sep)) {
  console.error(`  ✗ --dir must be inside --root (${root})`);
  process.exit(1);
}

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".md": "text/markdown; charset=utf-8",
};

const json = (code: number, body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status: code,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

function promptFor(body: { question: string; section?: string; context?: string; title?: string }): string {
  return [
    "You are the reader guide for an explainer about recorded conference talks.",
    body.title ? `Guide: ${body.title}` : "",
    body.section ? `The reader is in the section: ${body.section}.` : "",
    body.context ? `Text in view:\n${body.context}` : "",
    `Question: ${body.question}`,
    "",
    "Answer for a reader who is trying to understand the material, in plain language.",
    "Use the recorded talks as the source. Cite each claim as (Talk title, HH:MM:SS).",
    "Quote the transcripts verbatim when the wording matters. If the corpus does not cover it, say so plainly.",
    "Keep it under 250 words unless the question needs more.",
  ].filter(Boolean).join("\n\n");
}

async function runAgent(prompt: string): Promise<string> {
  const parts = agent.split(/\s+/).filter(Boolean);
  if (!parts.length) throw new Error("empty agent command");
  const proc = Bun.spawn({ cmd: [...parts, prompt], stdout: "pipe", stderr: "pipe", env: process.env });
  const timer = setTimeout(() => { try { proc.kill(); } catch { /* already gone */ } }, timeoutMs);
  try {
    const [out, err] = await Promise.all([new Response(proc.stdout).text(), new Response(proc.stderr).text()]);
    const code = await proc.exited;
    if (code !== 0) throw new Error(err.trim() || `agent exited ${code}`);
    return out.trim();
  } finally {
    clearTimeout(timer);
  }
}

const server = Bun.serve({
  hostname: host,
  port,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/health") {
      return json(200, { ok: true, root, dir: dirRel, agent, pid: process.pid });
    }

    if (url.pathname === "/ask") {
      if (req.method !== "POST") return json(405, { error: "POST /ask" });
      let body: { question?: string; section?: string; context?: string; title?: string };
      try { body = (await req.json()) as typeof body; } catch { return json(400, { error: "invalid JSON" }); }
      const question = (body.question ?? "").trim().slice(0, 2000);
      if (!question) return json(400, { error: "question is required" });
      try {
        const answer = await runAgent(promptFor({
          question,
          section: (body.section ?? "").slice(0, 200),
          context: (body.context ?? "").slice(0, 4000),
          title: (body.title ?? "").slice(0, 200),
        }));
        return json(200, { answer });
      } catch (e) {
        return json(502, { error: String((e as Error).message ?? e) });
      }
    }

    if (url.pathname === "/" || url.pathname === `/${dirRel}`) {
      return Response.redirect(`/${dirRel}/`, 302);
    }

    if (req.method !== "GET" && req.method !== "HEAD") return json(405, { error: "method not allowed" });

    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";
    const file = normalize(join(root, pathname));
    if (!file.startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile()) {
      return new Response("not found", { status: 404, headers: { "content-type": "text/plain" } });
    }
    return new Response(Bun.file(file), {
      headers: {
        "content-type": MIME[extname(file).toLowerCase()] ?? "application/octet-stream",
        "cache-control": "no-store",
      },
    });
  },
});

console.log(`  serving ${relative(process.cwd(), dir) || dir}`);
console.log(`  http://${host}:${server.port}/${dirRel}/`);
console.log(`  ask → ${agent}`);
