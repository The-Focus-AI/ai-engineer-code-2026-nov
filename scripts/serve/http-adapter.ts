#!/usr/bin/env bun
// prose serve — local HTTP trigger adapter.
//
// Accepts the ingress routes declared by the active topology's entry points,
// acknowledges immediately, and spools one trigger event per request under
// runs/serve/triggers/. The serve heartbeat drains the spool and turns each
// event into the gateway's edge receipt. No render is ever held open here.
//
// Usage:
//   bun scripts/serve/http-adapter.ts [--root <dir>] [--port 8787] [--host 127.0.0.1]
//
// Loopback-only by design. Webhook authentication is not part of the v0 runtime.

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { fileURLToPath } from "node:url";
import type { TriggerPlan } from "./types.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const flag = (name: string, fallback: string): string => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] ?? fallback : fallback;
};

const root = resolve(flag("root", process.env.PROSE_OPENPROSE_ROOT ?? join(HERE, "..", "..")));
const host = flag("host", "127.0.0.1");
const port = Number(flag("port", process.env.PROSE_SERVE_PORT ?? "8787"));
const stateDir = join(root, "runs", "serve");
const spoolDir = join(stateDir, "triggers");
const planPath = join(stateDir, "triggers.json");

interface TriggerEvent {
  kind: "openprose.serve.trigger";
  id: string;
  node: string;
  event: string | null;
  method: string;
  path: string;
  received_at: string;
  remote: string | null;
  query: Record<string, string>;
  payload: unknown;
}

const iso = (): string => new Date().toISOString();
const log = (msg: string): void => void process.stdout.write(`${iso()} ${msg}\n`);

if (!existsSync(planPath)) {
  log(`FATAL no trigger plan at ${planPath} — start serve (validate first) before the adapter`);
  process.exit(2);
}
const plan = JSON.parse(readFileSync(planPath, "utf8")) as TriggerPlan;
const routes = new Map(plan.triggers.http.map((r) => [r.path, r]));
if (routes.size === 0) {
  log("FATAL trigger plan declares no HTTP routes");
  process.exit(2);
}

mkdirSync(spoolDir, { recursive: true });

function readBody(req: IncomingMessage, limit = 1_000_000): Promise<string> {
  return new Promise((resolveBody, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => {
      size += c.length;
      if (size > limit) { reject(new Error("payload too large")); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => resolveBody(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function json(res: ServerResponse, code: number, body: unknown): void {
  const out = JSON.stringify(body);
  res.writeHead(code, { "content-type": "application/json", "content-length": Buffer.byteLength(out) });
  res.end(out);
}

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? "/", `http://${host}:${port}`);
  const route = routes.get(url.pathname);

  if (req.method === "GET" && url.pathname === "/health") {
    const pending = existsSync(spoolDir) ? readdirSync(spoolDir).filter((f) => f.endsWith(".json")).length : 0;
    return json(res, 200, {
      ok: true, pid: process.pid, root, started_at: process.env.PROSE_SERVE_STARTED_AT ?? null,
      manifest_sha256: plan.manifest_sha256, routes: [...routes.keys()],
      pending_triggers: pending, uptime_seconds: Math.round(process.uptime()),
    });
  }

  if (!route) return json(res, 404, { error: "no such trigger route", path: url.pathname });
  if (req.method !== route.method) return json(res, 405, { error: `use ${route.method}`, path: url.pathname });

  let body: string;
  try { body = await readBody(req); } catch (e) { return json(res, 413, { error: (e as Error).message }); }

  let payload: unknown = null;
  if (body.trim()) {
    try { payload = JSON.parse(body); } catch { payload = { raw: body.slice(0, 4000) }; }
  }

  const id = `${Date.now()}-${randomBytes(3).toString("hex")}`;
  const event: TriggerEvent = {
    kind: "openprose.serve.trigger", id, node: route.node, event: route.event,
    method: route.method, path: url.pathname, received_at: iso(),
    remote: req.socket.remoteAddress ?? null, query: Object.fromEntries(url.searchParams), payload,
  };
  const file = join(spoolDir, `${id}.json`);
  writeFileSync(file, JSON.stringify(event, null, 2) + "\n");
  log(`accepted ${event.event ?? "trigger"} → ${route.node} (${file})`);
  return json(res, 202, { accepted: true, trigger_id: id, node: route.node, event: event.event });
});

server.listen(port, host, () => {
  log(`listening on http://${host}:${port}`);
  log(`routes: ${[...routes.entries()].map(([p, r]) => `${r.method} ${p} → ${r.node}`).join(" · ")}`);
  log(`spool: ${spoolDir}`);
});

function shutdown(sig: string): void {
  log(`stopping (${sig})`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 2000).unref();
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
