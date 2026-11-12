#!/usr/bin/env bun
// Renders the build's own pages, all under one top bar (scripts/site/nav.ts):
//
//   index.html                  Today: the day's plan with now/next, what's captured, latest notes, pipeline
//   site/talks/index.html       Talks: one block per captured talk, built vs pending
//   site/talks/<slug>.html      One hub per talk: speakers, notes, photos, recording, themes, links, transcript
//   site/themes.html            Themes: analysis/themes.md, linked back to the hubs
//   site/people.html            People: every speaker, with follow and write-to links on X
//
// The planner and floor maps (site/index.html) are rendered by render-site.ts;
// the plain timetable (site/schedule.html) is rendered here. Everything here
// is a derived projection over the schedule truth, the recording intake truth,
// talks/, notes/inbox/, analysis/ and the receipt ledgers. No model call, no
// network. Markdown sources are rendered inline so nothing opens as raw text.
//
// Usage: bun scripts/render-pages.ts [--root <dir>]

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { topnav, type Section } from "./site/nav.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const flag = (name: string, fallback: string): string => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] ?? fallback : fallback;
};
const root = resolve(flag("root", join(HERE, "..")));
const TZ = "America/Los_Angeles";

const esc = (s: string): string => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const exists = (p: string): boolean => existsSync(join(root, p));
const list = (dir: string): string[] => (exists(dir) ? readdirSync(join(root, dir)).filter((f) => !f.startsWith(".")).sort() : []);
const isDir = (p: string): boolean => exists(p) && statSync(join(root, p)).isDirectory();
const read = (p: string): string => readFileSync(join(root, p), "utf8");
const write = (p: string, s: string): void => { mkdirSync(dirname(join(root, p)), { recursive: true }); writeFileSync(join(root, p), s); };
const clock = (d: Date): string => d.toLocaleTimeString("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" });
const day = (d: Date): string => d.toLocaleDateString("en-US", { timeZone: TZ, weekday: "short", month: "short", day: "numeric" });
const slugify = (s: string): string => s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const stripFront = (md: string): string => md.replace(/^---\n[\s\S]*?\n---\n?/, "");
const front = (md: string, key: string): string | undefined => md.match(new RegExp(`^${key}:\\s*"?([^"\\n]*)"?\\s*$`, "m"))?.[1];
const md = (s: string): string => Bun.markdown.html(s);

// --- Schedule truth.
interface Session { session_id: string; title: string; abstract: string | null; format: string | null; starts_at: string; ends_at: string; room_id: string | null; speaker_ids: string[]; day: string }
interface Speaker { name: string; affiliation: string | null; bio: string | null; links: string[] }
const wm = JSON.parse(read("state/world-model/conference-schedule/published/world-model.json")) as {
  event: { name: string };
  program: { sessions: Session[]; days: Array<{ date: string; label: string | null }> };
  speakers: Record<string, Speaker>;
  venue: { rooms: Array<{ room_id: string; name: string }> };
};
const rooms = new Map(wm.venue.rooms.map((r) => [r.room_id, r.name]));
const roomName = (s: Session): string => (s.room_id ? rooms.get(s.room_id) ?? s.room_id : "");
const sessionSlug = (s: Session): string => `${s.starts_at.slice(0, 10)}-${slugify(s.title)}`;
const sessionById = new Map(wm.program.sessions.map((s) => [s.session_id, s]));
const bySlug = new Map(wm.program.sessions.map((s) => [sessionSlug(s), s]));
const recs = exists("site/recommendations.json")
  ? (JSON.parse(read("site/recommendations.json")) as { calls: Record<string, { call: string; why: string }> }).calls
  : {};

const xHandle = (links: string[]): string | null => {
  for (const l of links) {
    const m = l.match(/^https?:\/\/(?:www\.)?(?:x|twitter)\.com\/@?([A-Za-z0-9_]{1,15})\/?(?:[?#].*)?$/);
    if (m && !["intent", "share", "home", "i", "search"].includes(m[1]!.toLowerCase())) return m[1]!;
  }
  return null;
};
const linkLabel = (l: string): string => {
  const h = l.replace(/^https?:\/\/(www\.)?/, "");
  if (/^linkedin\.com/.test(h)) return "LinkedIn";
  if (/^github\.com/.test(h)) return "GitHub";
  if (/^(x|twitter)\.com/.test(h)) return "X";
  if (/^bsky\.app/.test(h)) return "Bluesky";
  if (/youtube\.com/.test(h)) return "YouTube";
  return h.split("/")[0]!;
};

// --- Captured talks: talk folders, notes and recordings, keyed by slug.
const intakePath = "state/world-model/recording-intake/published/world-model.json";
const intake = exists(intakePath)
  ? (JSON.parse(read(intakePath)) as { matches: Record<string, { session_id: string | null; status: string }>; talks: Record<string, { slug: string }> })
  : { matches: {}, talks: {} };
const photosPath = "state/world-model/talk-photos/published/world-model.json";
const photoPlacements = (exists(photosPath) ? (JSON.parse(read(photosPath)) as { placements?: Record<string, { dir: string }> }).placements : undefined) ?? {};
const sessionForSlug = (slug: string): Session | null => {
  const fromIntake = Object.entries(intake.talks).find(([, t]) => t.slug === slug)?.[0];
  const fromFiles = ["transcript.md", "links.md", "story.md"].map((f) => `talks/${slug}/${f}`).filter(exists)
    .map((f) => front(read(f), "session_id")).find(Boolean);
  // A photos-only talk (no recording yet) is known by the photo step's placements.
  const fromPhotos = Object.entries(photoPlacements).find(([, v]) => v.dir === `talks/${slug}/photos`)?.[0];
  const id = fromIntake ?? fromFiles ?? fromPhotos;
  return (id && sessionById.get(id)) || bySlug.get(slug) || null;
};
interface Note { file: string; at: string; kind: string; body: string }
interface Recording { folder: string; minutes: number; source: string; audio: string | null }
interface Talk { slug: string; session: Session | null; title: string; notes: Note[]; recordings: Recording[] }
const talks = new Map<string, Talk>();
const talk = (slug: string): Talk => {
  if (!talks.has(slug)) {
    // A talk folder keeps its slug when the schedule retitles the session, so
    // resolve it by session id first (intake truth, then the folder's own files).
    const s = sessionForSlug(slug);
    talks.set(slug, { slug, session: s, title: s?.title ?? slug, notes: [], recordings: [] });
  }
  return talks.get(slug)!;
};
for (const d of list("talks")) if (isDir(`talks/${d}`)) talk(d);

const notes: Note[] = list("notes/inbox").filter((f) => f.endsWith(".md")).map((f) => {
  const raw = read(`notes/inbox/${f}`);
  return { file: f, at: front(raw, "captured_at") ?? "", kind: front(raw, "kind") ?? "note", body: stripFront(raw).trim() };
});
for (const n of notes) {
  const t = read(`notes/inbox/${n.file}`).match(/^talk:\s*talks\/([^/\s]+)\/?\s*$/m)?.[1];
  if (t) talk(t).notes.push(n);
}

for (const d of list("recordings/inbox")) {
  if (!isDir(`recordings/inbox/${d}`) || !exists(`recordings/inbox/${d}/meta.json`)) continue;
  const meta = JSON.parse(read(`recordings/inbox/${d}/meta.json`));
  const match = intake.matches[d];
  let slug: string | null = null;
  if (match?.session_id && intake.talks[match.session_id]) slug = intake.talks[match.session_id]!.slug;
  if (!slug && match?.status === "needs-review") continue;
  if (!slug) {
    const title = String(meta.title ?? "").toLowerCase();
    const s = wm.program.sessions.find((x) => x.speaker_ids.some((id) => (wm.speakers[id]?.name ?? "").toLowerCase() === title));
    if (s) slug = sessionSlug(s);
  }
  if (!slug) continue;
  const audio = list(`recordings/inbox/${d}`).find((f) => /^audio\.(m4a|mp3|wav|aac)$/.test(f));
  talk(slug).recordings.push({
    folder: d, minutes: meta.duration_seconds ? Math.round(meta.duration_seconds / 60) : 0,
    source: meta.transcript_source ?? "no transcript yet", audio: audio ? `recordings/inbox/${d}/${audio}` : null,
  });
}
const captured = [...talks.values()].sort((a, b) => (a.session?.starts_at ?? "9999").localeCompare(b.session?.starts_at ?? "9999"));
const capturedSessionIds = new Set(captured.map((t) => t.session?.session_id).filter(Boolean) as string[]);
const hubHref = (slug: string, up: string): string => `${up}site/talks/${slug}.html`;
// A talk's front door: its story page when one is built, otherwise its hub.
const talkHref = (slug: string, up: string): string => { const pg = pagePath(slug); return pg ? `${up}${pg}` : hubHref(slug, up); };
const slugBySession = new Map(captured.filter((t) => t.session).map((t) => [t.session!.session_id, t.slug]));

// --- Themes: analysis/themes.md, split into its parts.
const themesMd = exists("analysis/themes.md") ? read("analysis/themes.md") : "";
const thesis = new Map<string, string>();
for (const m of themesMd.matchAll(/^- \[[^\]]+\]\(\.\.\/talks\/([^/]+)\/transcript\.md\): (.+)$/gm)) thesis.set(m[1]!, m[2]!);
interface Theme { name: string; id: string; claim: string; slugs: Set<string> }
const themes: Theme[] = [];
const themeBlock = themesMd.split(/^## Themes\s*$/m)[1]?.split(/^## /m)[0] ?? "";
for (const part of themeBlock.split(/^### /m).slice(1)) {
  const name = part.split("\n")[0]!.trim();
  themes.push({
    name, id: slugify(name),
    claim: part.match(/^\*\*(.+)\*\*\s*$/m)?.[1] ?? "",
    slugs: new Set([...part.matchAll(/\.\.\/talks\/([^/]+)\/transcript\.md/g)].map((m) => m[1]!)),
  });
}

// --- Artifacts per talk, linked to the hub's own sections.
type State = "built" | "pending";
interface Artifact { name: string; state: State; anchor: string; note?: string }
const pagePath = (slug: string): string | undefined => ["experience/index.html", "experience/page.html"].map((f) => `talks/${slug}/${f}`).find(exists);
// A talk can carry more than one story: extra pages sit beside page.html in experience/.
const extraPages = (slug: string): { href: string; title: string }[] =>
  list(`talks/${slug}/experience`).filter((f) => f.endsWith(".html") && f !== "page.html" && f !== "index.html")
    .map((f) => `talks/${slug}/experience/${f}`)
    .map((f) => ({ href: f, title: (read(f).match(/<title>([^<]*)<\/title>/)?.[1] ?? f).split(" · ")[0]!.trim() }));
const artifacts = (t: Talk): Artifact[] => {
  const p = `talks/${t.slug}`;
  const photos = list(`${p}/photos`).length;
  const story = exists(`${p}/story.md`) ? read(`${p}/story.md`) : "";
  const transcript = exists(`${p}/transcript.md`) ? read(`${p}/transcript.md`) : "";
  return [
    { name: "Recording", state: t.recordings.length ? "built" : "pending", anchor: "recording", note: t.recordings.length ? `${t.recordings.reduce((n, r) => n + r.minutes, 0)} min` : undefined },
    { name: "Transcript", state: transcript ? "built" : "pending", anchor: "transcript", note: transcript ? front(transcript, "source") : undefined },
    { name: "Links", state: exists(`${p}/links.md`) ? "built" : "pending", anchor: "links" },
    { name: "Photos", state: photos ? "built" : "pending", anchor: "photos", note: photos ? `${photos}` : undefined },
    { name: "Notes", state: t.notes.length ? "built" : "pending", anchor: "notes", note: t.notes.length ? `${t.notes.length}` : undefined },
    { name: "Story", state: story ? "built" : "pending", anchor: "story", note: front(story, "status") },
    { name: "Talk page", state: pagePath(t.slug) ? "built" : "pending", anchor: "story" },
  ];
};
const builtCount = (t: Talk): number => artifacts(t).filter((a) => a.state === "built").length;

// --- People: one row per speaker, with X intent links.
const followHref = (h: string): string => `https://x.com/intent/follow?screen_name=${encodeURIComponent(h)}`;
const writeHref = (h: string, title: string | null): string =>
  `https://x.com/intent/post?text=${encodeURIComponent(title ? `@${h} Enjoyed your talk "${title}" at AI Engineer Code Summit. ` : `@${h} `)}`;
const speakerSessions = (id: string): Session[] =>
  wm.program.sessions.filter((s) => s.speaker_ids.includes(id)).sort((a, b) => a.starts_at.localeCompare(b.starts_at));
// Talk dossiers sometimes find a handle the roster lacks.
const dossierHandles = new Map<string, string>();
for (const t of captured) {
  if (!exists(`talks/${t.slug}/links.md`) || !t.session) continue;
  const handles = [...read(`talks/${t.slug}/links.md`).matchAll(/https?:\/\/(?:x|twitter)\.com\/@?([A-Za-z0-9_]{1,15})/g)].map((m) => m[1]!);
  if (t.session.speaker_ids.length === 1 && handles[0]) dossierHandles.set(t.session.speaker_ids[0]!, handles[0]);
}
const handleFor = (id: string): string | null => xHandle(wm.speakers[id]?.links ?? []) ?? dossierHandles.get(id) ?? null;

const personCard = (id: string, up: string, heard: Session | null): string => {
  const p = wm.speakers[id]!;
  const h = handleFor(id);
  const sessions = speakerSessions(id);
  const s = heard ?? sessions[0] ?? null;
  const seen = new Set<string>();
  const others = p.links.filter((l) => !/(x|twitter)\.com/.test(l)).filter((l) => {
    const k = l.replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "").toLowerCase();
    return seen.has(k) ? false : (seen.add(k), true);
  });
  const talkLine = s
    ? capturedSessionIds.has(s.session_id)
      ? `<a href="${hubHref(slugBySession.get(s.session_id) ?? sessionSlug(s), up)}">${esc(s.title)}</a>`
      : `${esc(s.title)} <span class="minor">· ${esc(day(new Date(s.starts_at)))} ${esc(clock(new Date(s.starts_at)))}</span>`
    : "";
  return `<div class="person" data-search="${esc(`${p.name} ${p.affiliation ?? ""} ${h ?? ""} ${s?.title ?? ""}`.toLowerCase())}">
    <div class="who"><b>${esc(p.name)}</b>${p.affiliation ? ` <span class="minor">${esc(p.affiliation)}</span>` : ""}<div class="talkline">${talkLine}</div></div>
    <div class="acts">${h
      ? `<a class="btn" href="${followHref(h)}" target="_blank" rel="noopener">Follow @${esc(h)}</a><a class="btn ghost" href="${writeHref(h, heard ? heard.title : null)}" target="_blank" rel="noopener">Write</a><label class="done"><input type="checkbox" data-handle="${esc(h)}"> followed</label>`
      : `<span class="minor">no X handle found</span>`}${others.map((l) => `<a class="ext" href="${esc(l)}" target="_blank" rel="noopener">${esc(linkLabel(l))}</a>`).join("")}</div>
  </div>`;
};

// --- Page shell.
const shell = (o: { title: string; active: Section | null; up: string; body: string; style?: string; script?: string }): string => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(o.title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&display=swap">
<link rel="stylesheet" href="${o.up}site/theme.css">
<link rel="stylesheet" href="${o.up}site/nav.css">
<link rel="stylesheet" href="${o.up}site/pages.css">
${o.style ? `<style>${o.style}</style>` : ""}
</head>
<body>
${topnav(o.active, o.up)}
<div class="sheet">
${o.body}
</div>
${o.script ? `<script>${o.script}</script>` : ""}
</body>
</html>
`;
const generatedAt = new Date().toLocaleString("en-US", { timeZone: TZ, dateStyle: "medium", timeStyle: "short" });
const pills = (t: Talk, up: string): string => artifacts(t).map((a) =>
  `<a class="pill ${a.state === "built" ? "call-go" : "call-skip"}" href="${a.name === "Talk page" && a.state === "built" ? talkHref(t.slug, up) : `${hubHref(t.slug, up)}#${a.anchor}`}">${a.name}${a.note ? ` · ${esc(a.note)}` : ""}</a>`).join("");
const whenLine = (s: Session | null): string => (s ? `${day(new Date(s.starts_at))} · ${clock(new Date(s.starts_at))}–${clock(new Date(s.ends_at))} · ${roomName(s)}` : "");
const speakerNames = (s: Session | null): string =>
  s ? s.speaker_ids.map((id) => wm.speakers[id]).filter(Boolean).map((p) => [p!.name, p!.affiliation].filter(Boolean).join(", ")).join(" · ") : "";
const noteTime = (n: Note): string => (n.at ? clock(new Date(n.at)) : n.file.slice(11, 15));
const firstLine = (s: string, n = 110): string => { const l = s.split("\n")[0] ?? ""; return l.length > n ? `${l.slice(0, n)}…` : l; };

// Ticks for "followed" and the people filter, kept in this browser only.
const PEOPLE_JS = `(function(){
  var key="aie-followed";var done={};try{done=JSON.parse(localStorage.getItem(key)||"{}")}catch(e){}
  document.querySelectorAll('input[data-handle]').forEach(function(b){
    var h=b.getAttribute('data-handle').toLowerCase();b.checked=!!done[h];
    b.closest('.person').classList.toggle('is-done',b.checked);
    b.addEventListener('change',function(){done[h]=b.checked;b.closest('.person').classList.toggle('is-done',b.checked);try{localStorage.setItem(key,JSON.stringify(done))}catch(e){}});
  });
  var q=document.getElementById('find');if(q)q.addEventListener('input',function(){var v=q.value.trim().toLowerCase();
    document.querySelectorAll('.person[data-search]').forEach(function(p){p.hidden=v&&p.getAttribute('data-search').indexOf(v)<0});});
})();`;

// On a hub, a link to #transcript or #story opens that section's collapsed text.
const HUB_JS = `(function(){function open(){var t=location.hash&&document.getElementById(location.hash.slice(1));var d=t&&t.querySelector('details');if(d){d.open=true;t.scrollIntoView()}}open();addEventListener('hashchange',open)})();`;

// ===== Talk hubs =====
const themeChips = (slug: string, up: string): string =>
  themes.filter((th) => th.slugs.has(slug)).map((th) => `<a class="chip" href="${up}site/themes.html#${th.id}">${esc(th.name)}</a>`).join("");

for (const t of captured) {
  const up = "../../";
  const p = `talks/${t.slug}`;
  const s = t.session;
  const page = pagePath(t.slug);
  const photos = list(`${p}/photos`).filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f));
  const storyMd = exists(`${p}/story.md`) ? read(`${p}/story.md`) : "";
  const transcriptMd = exists(`${p}/transcript.md`) ? read(`${p}/transcript.md`) : "";
  const linksMd = exists(`${p}/links.md`) ? stripFront(read(`${p}/links.md`)).replace(/^# .*\n/m, "") : "";
  const people = s ? s.speaker_ids.filter((id) => wm.speakers[id]) : [];
  const body = `
  <header class="masthead hub">
    <p class="mono agency">${esc(whenLine(s))}</p>
    <h1>${esc(t.title)}</h1>
    ${s ? `<p class="speakers">${esc(speakerNames(s))}</p>` : ""}
    ${thesis.get(t.slug) ? `<p class="sub">${esc(thesis.get(t.slug)!)}</p>` : ""}
  </header>
  <div class="marginalia mono"><a href="index.html">← All talks</a><span>${builtCount(t)} of 7 built</span></div>
  <div class="pills">${pills(t, up)}</div>
  ${page ? `<a class="cta" href="${up}${page}">Read the story →</a>` : ""}
  ${extraPages(t.slug).map((e) => `<a class="cta" href="${up}${e.href}">Also: ${esc(e.title)} →</a>`).join("")}
  ${themeChips(t.slug, up) ? `<div class="chips"><span class="mono">Themes</span>${themeChips(t.slug, up)}</div>` : ""}

  ${people.length ? `<section class="view" id="people"><div class="view-head"><h2>Speaker${people.length > 1 ? "s" : ""}</h2></div>
    <div class="people">${people.map((id) => personCard(id, up, s)).join("")}</div></section>` : ""}

  <section class="view" id="notes"><div class="view-head"><h2>My notes</h2><p class="lede">${t.notes.length ? `${t.notes.length} captured during the talk.` : "None captured."}</p></div>
    ${t.notes.length ? `<ol class="notes">${[...t.notes].sort((a, b) => a.file.localeCompare(b.file)).map((n) =>
      `<li><span class="mono">${esc(noteTime(n))} · ${esc(n.kind)}</span><div class="prose">${md(n.body)}</div></li>`).join("")}</ol>` : ""}
  </section>

  <section class="view" id="photos"><div class="view-head"><h2>Photos</h2><p class="lede">${photos.length ? `${photos.length} filed.` : "None filed."}</p></div>
    ${photos.length ? `<div class="photos">${photos.map((f) => `<a href="${up}${p}/photos/${esc(f)}"><img loading="lazy" src="${up}${p}/photos/${esc(f)}" alt="Photo taken during the talk, ${esc(f)}"></a>`).join("")}</div>` : ""}
  </section>

  <section class="view" id="recording"><div class="view-head"><h2>Recording</h2><p class="lede">${t.recordings.length ? "My Voice Memos from the room." : "None synced."}</p></div>
    ${t.recordings.map((r) => `<div class="rec"><span class="mono">${esc(r.folder)} · ${r.minutes} min · ${esc(r.source)}</span>${r.audio ? `<audio controls preload="none" src="${up}${esc(r.audio)}"></audio>` : ""}</div>`).join("")}
  </section>

  <section class="view" id="story"><div class="view-head"><h2>Story</h2><p class="lede">${page ? `<a href="${up}${page}">The scrolling talk page</a> is built.${extraPages(t.slug).length ? ` Also: ${extraPages(t.slug).map((e) => `<a href="${up}${e.href}">${esc(e.title)}</a>`).join(", ")}.` : ""}` : storyMd ? "A draft story, not yet a page." : "Not written yet."}</p></div>
    ${storyMd && !page ? `<details><summary>Read the draft</summary><div class="prose">${md(stripFront(storyMd))}</div></details>` : ""}
  </section>

  ${linksMd ? `<section class="view" id="links"><div class="view-head"><h2>Links and resources</h2></div><div class="prose">${md(linksMd)}</div></section>` : `<section class="view" id="links"><div class="view-head"><h2>Links</h2><p class="lede">No dossier yet.</p></div></section>`}

  <section class="view" id="transcript"><div class="view-head"><h2>Transcript</h2><p class="lede">${transcriptMd ? `Machine transcript (${esc(front(transcriptMd, "source") ?? "ASR")}). Garbled words are kept as heard.` : "Not transcribed yet."}</p></div>
    ${transcriptMd ? `<details><summary>Read the transcript</summary><div class="prose transcript">${md(stripFront(transcriptMd))}</div></details>` : ""}
  </section>
  <p class="colophon mono">Generated ${esc(generatedAt)} · bun scripts/render-pages.ts</p>`;
  write(`site/talks/${t.slug}.html`, shell({ title: t.title, active: "talks", up, body, script: PEOPLE_JS + HUB_JS }));
}

// ===== Talks index =====
{
  const up = "../../";
  const card = (t: Talk): string => {
    const n = builtCount(t);
    return `<article class="card">
      <div class="mono">${esc(whenLine(t.session))}</div>
      <h3><a href="${talkHref(t.slug, up)}">${esc(t.title)}</a></h3>
      ${t.session ? `<p class="speakers">${esc(speakerNames(t.session))}</p>` : ""}
      ${thesis.get(t.slug) ? `<p class="thesis">${esc(thesis.get(t.slug)!)}</p>` : ""}
      <div class="progress"><span class="mono">${n} of 7 built</span></div>
      <div class="meter"><i style="width:${Math.round((n / 7) * 100)}%"></i></div>
      <div class="pills">${pills(t, up)}</div>
      <div class="card-acts">${pagePath(t.slug) ? `<a class="cta small" href="${talkHref(t.slug, up)}">Read the story →</a><a href="${t.slug}.html">Details</a>` : `<a class="cta small ghost" href="${t.slug}.html">Details →</a>`}</div>
    </article>`;
  };
  // Grouped by day, in time order within each day; talks with no session go last.
  const byDay = new Map<string, Talk[]>();
  for (const t of captured) {
    const k = t.session ? t.session.starts_at.slice(0, 10) : "unscheduled";
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k)!.push(t);
  }
  const cards = [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([d, ts]) => {
    const label = d === "unscheduled" ? "Unscheduled" : new Date(`${d}T12:00:00-08:00`).toLocaleDateString("en-US", { timeZone: TZ, weekday: "long", month: "long", day: "numeric" });
    return `<section class="view day-group" id="day-${d}"><div class="view-head"><h2>${esc(label)}</h2><p class="lede">${ts.length} talk${ts.length === 1 ? "" : "s"}</p></div><div class="blocks">${ts.map(card).join("\n")}</div></section>`;
  }).join("\n");
  const body = `
  <header class="masthead"><p class="mono agency">${esc(wm.event.name)}</p><h1>Talks</h1><p class="sub">Everything collected from each talk I've been in.</p></header>
  <div class="marginalia mono"><span>${captured.length} talks</span><span>Titles open the story when there is one</span></div>
  ${cards}`;
  write("site/talks/index.html", shell({ title: "Talks", active: "talks", up, body }));
}

// ===== Themes =====
{
  const up = "../";
  let html = md(stripFront(themesMd).replace(/^# Themes\s*\n/m, ""));
  html = html.replace(/href="\.\.\/talks\/([^/"]+)\/transcript\.md"/g, (_, slug) => `href="talks/${slug}.html#transcript"`);
  html = html.replace(/<h3>([^<]+)<\/h3>/g, (_, name) => `<h3 id="${slugify(name)}">${name}</h3>`);
  // Through-lines: atlases/<slug>/ with a story.md and a built page.html.
  const throughLines = list("atlases").filter((d) => exists(`atlases/${d}/page.html`) && exists(`atlases/${d}/story.md`)).map((d) => {
    const md = read(`atlases/${d}/story.md`);
    const title = front(md, "title") ?? d;
    const n = (md.match(/^  - talks\//gm) ?? []).length;
    return `<a class="theme-card" href="${up}atlases/${d}/page.html"><b>${esc(title.split(":")[0]!)}</b><span>${esc(title.split(":").slice(1).join(":").trim())}</span><span class="mono">${n} talks</span></a>`;
  }).join("");
  const toc = themes.map((th) => `<a class="theme-card" href="#${th.id}"><b>${esc(th.name)}</b><span>${esc(th.claim)}</span><span class="mono">${th.slugs.size} talks</span></a>`).join("");
  const body = `
  <header class="masthead"><p class="mono agency">${esc(wm.event.name)}</p><h1>Themes</h1><p class="sub">What the talks have in common, with every claim tied to a moment in a transcript.</p></header>
  <div class="marginalia mono"><span>${themes.length} themes · ${thesis.size} talks</span><span>Refreshed when a talk lands</span></div>
  ${throughLines ? `<section class="view"><div class="view-head"><h2>Through-lines</h2><p class="lede">Stories across several talks.</p></div><div class="themes">${throughLines}</div></section>` : ""}
  <section class="view"><div class="themes">${toc}</div></section>
  <section class="view"><div class="prose wide">${html}</div></section>`;
  write("site/themes.html", shell({ title: "Themes", active: "themes", up, body }));
}

// ===== People =====
{
  const up = "../";
  const heardIds: Array<[string, Session]> = [];
  for (const t of captured) for (const id of t.session?.speaker_ids ?? []) if (wm.speakers[id] && !heardIds.some(([x]) => x === id)) heardIds.push([id, t.session!]);
  const heard = new Set(heardIds.map(([id]) => id));
  const rest = Object.keys(wm.speakers).filter((id) => !heard.has(id))
    .sort((a, b) => (speakerSessions(a)[0]?.starts_at ?? "9").localeCompare(speakerSessions(b)[0]?.starts_at ?? "9") || wm.speakers[a]!.name.localeCompare(wm.speakers[b]!.name));
  const withX = Object.keys(wm.speakers).filter((id) => handleFor(id)).length;
  const body = `
  <header class="masthead"><p class="mono agency">${esc(wm.event.name)}</p><h1>People</h1><p class="sub">Follow a speaker, or start a post to them. Each button opens X; nothing is sent until you send it.</p></header>
  <div class="marginalia mono"><span>${Object.keys(wm.speakers).length} speakers · ${withX} with an X handle</span><span>“Followed” ticks are kept in this browser</span></div>
  <input id="find" class="find" type="search" placeholder="Find a name, company or talk" aria-label="Find a speaker">
  <section class="view"><div class="view-head"><h2>Speakers I've heard</h2><p class="lede">From the talks I've captured. “Write” starts a post that names their talk.</p></div>
    <div class="people">${heardIds.map(([id, s]) => personCard(id, up, s)).join("")}</div></section>
  <section class="view"><div class="view-head"><h2>Everyone else</h2><p class="lede">In schedule order.</p></div>
    <div class="people">${rest.map((id) => personCard(id, up, null)).join("")}</div></section>`;
  write("site/people.html", shell({ title: "People", active: "people", up, body, script: PEOPLE_JS }));
}

// ===== Schedule: a plain timetable, one tab per day, track rooms as columns =====
{
  const up = "../";
  const LONG = 3 * 3600e3;
  const short = (s: Session): string => roomName(s).match(/\(([^)]+)\)/)?.[1] ?? (roomName(s) || "TBA");
  const isTrack = (s: Session): boolean => !!s.room_id && /talk|workshop|keynote/i.test(s.format ?? "talk") && s.format !== "break";
  const who = (s: Session): string => s.speaker_ids.map((id) => { const p = wm.speakers[id]; return p ? p.name + (p.affiliation ? ` (${p.affiliation})` : "") : ""; }).filter(Boolean).join(", ");
  const pill = (s: Session): string => {
    if (slugBySession.has(s.session_id)) return `<span class="pill call-go">captured</span>`;
    const c = recs[s.session_id]?.call;
    return c === "go" ? `<span class="pill call-go">go</span>` : c === "maybe" ? `<span class="pill call-maybe">maybe</span>` : c === "skip" ? `<span class="pill call-skip">skip</span>` : s.format === "break" ? `<span class="pill call-skip">break</span>` : "";
  };
  const cell = (s: Session, withRoom: boolean): string => {
    const href = slugBySession.has(s.session_id) ? talkHref(slugBySession.get(s.session_id)!, up) : null;
    const title = href ? `<a href="${esc(href)}">${esc(s.title)}</a>` : esc(s.title);
    const meta = `<span class="mono">${esc(clock(new Date(s.starts_at)))}–${esc(clock(new Date(s.ends_at)))}${withRoom ? "" : ` · <span class="rm">${esc(short(s))}</span>`}</span>`;
    const why = recs[s.session_id]?.why;
    const more = s.abstract || why ? `<details><summary>About</summary>${why ? `<p class="why"><b>My call:</b> ${esc(why)}</p>` : ""}${s.abstract ? `<p>${esc(s.abstract)}</p>` : ""}</details>` : "";
    return `<div class="tt-cell" data-start="${s.starts_at}" data-end="${s.ends_at}">${meta}<b class="tt-title">${title}</b>${who(s) ? `<span class="tt-who">${esc(who(s))}</span>` : ""}<div class="tt-foot">${pill(s)}</div>${more}</div>`;
  };
  const days = wm.program.days.map((d) => {
    const all = wm.program.sessions.filter((s) => s.day === d.date).sort((a, b) => a.starts_at.localeCompare(b.starts_at));
    const allDay = all.filter((s) => Date.parse(s.ends_at) - Date.parse(s.starts_at) > LONG);
    const timed = all.filter((s) => !allDay.includes(s));
    const counts = new Map<string, number>();
    for (const s of timed.filter(isTrack)) counts.set(s.room_id!, (counts.get(s.room_id!) ?? 0) + 1);
    const rooms = [...counts.entries()].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).map(([r]) => r);
    const inTrack = (s: Session): boolean => rooms.includes(s.room_id ?? "");
    const starts = [...new Set(timed.map((s) => s.starts_at))].sort();
    const rows = starts.map((t) => {
      const here = timed.filter((s) => s.starts_at === t);
      const wide = here.filter((s) => !inTrack(s));
      const track = here.filter(inTrack);
      const end = here.map((s) => s.ends_at).sort().at(-1)!;
      const out: string[] = [];
      if (track.length) out.push(`<div class="tt-row" data-start="${t}" data-end="${end}" style="--cols:${rooms.length}"><div class="tt-time mono">${esc(clock(new Date(t)))}</div>${rooms.map((r) => { const s = track.find((x) => x.room_id === r); return s ? cell(s, rooms.length > 1) : `<div class="tt-empty" aria-hidden="true"></div>`; }).join("")}</div>`);
      for (const s of wide) out.push(`<div class="tt-row wide" data-start="${t}" data-end="${s.ends_at}"><div class="tt-time mono">${esc(clock(new Date(t)))}</div>${cell(s, false)}</div>`);
      return out.join("");
    }).join("");
    const head = rooms.length > 1 ? `<div class="tt-head" style="--cols:${rooms.length}"><div></div>${rooms.map((r) => `<div class="mono">${esc(rooms_short(r))}</div>`).join("")}</div>` : "";
    const ad = allDay.length ? `<p class="minor tt-allday">All day: ${allDay.map((s) => `${esc(s.title)} (${esc(short(s))}, ${esc(clock(new Date(s.starts_at)))}–${esc(clock(new Date(s.ends_at)))})`).join(" · ")}</p>` : "";
    return { date: d.date, label: day(new Date(`${d.date}T12:00:00-08:00`)), full: d.label ?? "", html: `<section class="tt-day" data-day="${d.date}" hidden>${d.label ? `<p class="lede">${esc(d.label)}</p>` : ""}${ad}${head}${rows || `<p class="lede">No timed sessions this day.</p>`}</section>` };
  });
  function rooms_short(r: string): string { const n = rooms.get(r) ?? r; return n.match(/\(([^)]+)\)/)?.[1] ?? n; }
  const body = `
  <header class="masthead"><p class="mono agency">${esc(wm.event.name)}</p><h1>Schedule</h1><p class="sub">Every session, by day and time, room by room.</p></header>
  <div class="marginalia mono"><span class="tt-tabs" role="tablist">${days.map((d) => `<button type="button" role="tab" data-day="${d.date}" title="${esc(d.full)}">${esc(d.label)}</button>`).join("")}</span><a href="index.html">Planner and floor maps →</a></div>
  <section class="view">${days.map((d) => d.html).join("")}</section>
  <p class="colophon mono">Times are San Francisco time · go / maybe are my picks · captured links open the talk</p>`;
  const script = `(function(){
  var today=new Date().toLocaleDateString('en-CA',{timeZone:${JSON.stringify(TZ)}});
  var tabs=[].slice.call(document.querySelectorAll('.tt-tabs button'));var dates=tabs.map(function(b){return b.getAttribute('data-day')});
  var pick=dates.indexOf(today)>=0?today:(today<dates[0]?dates[0]:dates[dates.length-1]);
  try{var h=location.hash.slice(1);if(dates.indexOf(h)>=0)pick=h}catch(e){}
  function show(d){tabs.forEach(function(b){b.setAttribute('aria-selected',String(b.getAttribute('data-day')===d))});
    document.querySelectorAll('.tt-day').forEach(function(s){s.hidden=s.getAttribute('data-day')!==d});mark()}
  function mark(){var now=Date.now();document.querySelectorAll('.tt-row').forEach(function(r){var a=Date.parse(r.getAttribute('data-start')),b=Date.parse(r.getAttribute('data-end'));
    r.classList.toggle('past',b<now);r.classList.toggle('cur',a<=now&&now<b)});
    document.querySelectorAll('.tt-cell').forEach(function(c){var a=Date.parse(c.getAttribute('data-start')),b=Date.parse(c.getAttribute('data-end'));c.classList.toggle('on',a<=now&&now<b)})}
  document.querySelector('.tt-tabs').addEventListener('click',function(e){var b=e.target.closest('button');if(b){show(b.getAttribute('data-day'));try{history.replaceState(null,'','#'+b.getAttribute('data-day'))}catch(x){}}});
  show(pick);setInterval(mark,60000);
  var cur=document.querySelector('.tt-day:not([hidden]) .tt-row.cur');if(cur&&pick===today)cur.scrollIntoView({block:'center'});
})();`;
  write("site/schedule.html", shell({ title: "Schedule", active: "schedule", up, body, script }));
}

// ===== Today =====
{
  const up = "";
  // The whole day, both rooms; all-day items (registration, expo hours, lounges) go on one line.
  const ALL_DAY = 3 * 3600e3;
  const shortRoom = (s: Session): string => roomName(s).match(/\(([^)]+)\)/)?.[1] ?? roomName(s);
  const plan = wm.program.sessions
    .filter((s) => Date.parse(s.ends_at) - Date.parse(s.starts_at) <= ALL_DAY)
    .map((s) => ({
      id: s.session_id, day: s.day, start: s.starts_at, end: s.ends_at, title: s.title, room: shortRoom(s),
      main: /mainstage/i.test(roomName(s)),
      who: s.speaker_ids.map((id) => { const p = wm.speakers[id]; return p ? p.name + (p.affiliation ? ` (${p.affiliation})` : "") : ""; }).filter(Boolean).join(", "),
      call: recs[s.session_id]?.call ?? (s.format === "break" ? "break" : ""),
      why: recs[s.session_id]?.why ?? "", abstract: s.abstract ?? "",
      hub: slugBySession.has(s.session_id) ? talkHref(slugBySession.get(s.session_id)!, up) : null,
    }))
    .sort((a, b) => a.start.localeCompare(b.start) || Number(b.main) - Number(a.main));
  const allDay = wm.program.sessions.filter((s) => Date.parse(s.ends_at) - Date.parse(s.starts_at) > ALL_DAY)
    .map((s) => ({ day: s.day, title: s.title, room: shortRoom(s), start: s.starts_at, end: s.ends_at }));
  const days = wm.program.days.map((d) => ({ date: d.date, label: day(new Date(`${d.date}T12:00:00-08:00`)), full: d.label ?? "" }));
  const recent = captured.map((t) => `<div class="receipt"><span><a href="${talkHref(t.slug, up)}">${esc(t.title)}</a> <span class="minor">${esc(speakerNames(t.session).split(" · ").map((x) => x.split(",")[0]).join(", "))}</span></span><span class="mono">${builtCount(t)}/7 built</span></div>`).join("");
  const latest = [...notes].sort((a, b) => b.file.localeCompare(a.file)).slice(0, 6).map((n) => {
    const t = read(`notes/inbox/${n.file}`).match(/^talk:\s*talks\/([^/\s]+)/m)?.[1];
    return `<div class="receipt"><span>${t ? `<a href="${hubHref(t, up)}#notes">${esc(firstLine(n.body, 100))}</a>` : esc(firstLine(n.body, 100))}</span><span class="mono">${esc(n.file.slice(5, 10))} ${esc(noteTime(n))}</span></div>`;
  }).join("");
  const manifest = JSON.parse(read("dist/manifest.active.json")) as { topology: { nodes: Array<{ node: string }> } };
  const ORDER = ["schedule-check", "conference-schedule", "schedule-brief", "recording-inbox-watch", "recording-intake", "talk-photos", "talk-links", "talk-insights", "conference-themes"];
  const pipeline = manifest.topology.nodes.map((n) => n.node).sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b)).map((node) => {
    const path = `state/world-model/${node}/receipts.jsonl`;
    const lines = exists(path) ? read(path).trim().split("\n").filter(Boolean) : [];
    const r = lines.length ? (JSON.parse(lines.at(-1)!) as { at: string; status: string; semantic_diff?: { summary?: string } }) : null;
    return `<div class="receipt"><span>${node}<span class="minor"> · ${esc(firstLine(r?.semantic_diff?.summary ?? "", 90))}</span></span><span class="mono">${r ? `${esc(r.status)} · ${clock(new Date(r.at))}` : "never run"}</span></div>`;
  }).join("");
  const git = Bun.spawnSync({ cmd: ["git", "status", "--porcelain"], cwd: root, stdout: "pipe" }).stdout.toString().split("\n").filter(Boolean).length;
  const data = JSON.stringify({ plan, allDay, days, tz: TZ }).replace(/</g, "\\u003c");
  const body = `
  <header class="masthead"><p class="mono agency">${esc(wm.event.name)}</p><h1 id="today-title">Today</h1><p class="sub" id="today-sub">Where the day stands.</p></header>
  <div class="marginalia mono"><span id="dayswitch"></span><a href="site/schedule.html">Full schedule →</a></div>
  <section class="view now-next" id="nownext"></section>
  <section class="view"><div class="view-head"><h2>Schedule</h2><p class="lede">Everything on, in time order. GO and maybe are my picks; tap a talk for its abstract.</p>
    <div class="roomfilter" id="roomfilter"><button type="button" data-r="all">Both rooms</button><button type="button" data-r="main">Mainstage only</button></div>
    <p class="minor" id="allday"></p></div>
    <ol class="plan" id="plan"></ol></section>
  <section class="view"><div class="view-head"><h2>Captured so far</h2><p class="lede"><a href="site/talks/index.html">${captured.length} talks</a> · ${notes.length} notes · <a href="site/themes.html">${themes.length} themes</a></p></div><div>${recent}</div></section>
  <section class="view"><div class="view-head"><h2>Latest notes</h2></div><div>${latest}</div></section>
  <section class="view"><details><summary class="mono">Pipeline · ${git} files uncommitted · updated ${esc(generatedAt)}</summary><div>${pipeline}</div></details></section>`;
  const script = `var D=${data};
(function(){
  var fmt=function(iso){return new Date(iso).toLocaleTimeString('en-US',{timeZone:D.tz,hour:'numeric',minute:'2-digit'})};
  var today=new Date().toLocaleDateString('en-CA',{timeZone:D.tz});
  var dates=D.days.map(function(d){return d.date});
  var pick=dates.indexOf(today)>=0?today:(today<dates[0]?dates[0]:(dates.find(function(d){return d>today})||dates[dates.length-1]));
  var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var room='all';try{room=localStorage.getItem('aie-room')||'all'}catch(e){}
  var cur=pick;
  function render(date){cur=date;
    var now=Date.now(), live=date===today;
    var lab=D.days.find(function(d){return d.date===date});
    document.getElementById('today-title').textContent=live?'Today':(lab?lab.label:date);
    document.getElementById('today-sub').textContent=new Date(date+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})+(live?' · '+new Date().toLocaleTimeString('en-US',{timeZone:D.tz,hour:'numeric',minute:'2-digit'})+' in San Francisco':'');
    var rows=D.plan.filter(function(p){return p.day===date&&(room==='all'||p.main||p.call==='break')});
    var inProg=live?rows.filter(function(p){return Date.parse(p.start)<=now&&now<Date.parse(p.end)}):[];
    var talksNow=inProg.filter(function(p){return p.call!=='break'});var nowRows=talksNow.length?talksNow:inProg;
    var upcoming=rows.filter(function(p){return Date.parse(p.start)>now&&p.call!=='break'});
    var nextRows=upcoming.length?upcoming.filter(function(p){return p.start===upcoming[0].start}):[];
    var card=function(k,p){return '<div class="nn"><span class="mono">'+k+' · '+fmt(p.start)+'–'+fmt(p.end)+' · '+esc(p.room)+'</span><b>'+(p.hub?'<a href="'+p.hub+'">'+esc(p.title)+'</a>':esc(p.title))+'</b><span class="minor">'+esc(p.who)+'</span></div>'};
    var nn=document.getElementById('nownext');
    nn.innerHTML=live?(nowRows.map(function(p){return card('Now',p)}).join('')+nextRows.map(function(p){return card('Next',p)}).join(''))||'<p class="lede">Nothing else on today.</p>':'';
    nn.hidden=!live;
    var ad=D.allDay.filter(function(a){return a.day===date});
    document.getElementById('allday').textContent=ad.length?'All day: '+ad.map(function(a){return a.title+' ('+a.room+', '+fmt(a.start)+'–'+fmt(a.end)+')'}).join(' · '):'';
    document.querySelectorAll('#roomfilter button').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-r')===room))});
    document.getElementById('plan').innerHTML=rows.map(function(p){
      var past=live&&Date.parse(p.end)<now, cur=nowRows.indexOf(p)>=0;
      var pill=p.hub?'<span class="pill call-go">captured</span>':p.call==='go'?'<span class="pill call-go">go</span>':p.call==='maybe'?'<span class="pill call-maybe">maybe</span>':p.call==='break'?'<span class="pill call-skip">break</span>':'';
      var head=(p.hub?'<a href="'+p.hub+'">'+esc(p.title)+'</a>':esc(p.title))+(p.who?'<span class="minor"> · '+esc(p.who)+'</span>':'');
      var more=(p.abstract||p.why)?'<details><summary>'+head+'</summary>'+(p.why?'<p class="why"><b>Why '+esc(p.call)+':</b> '+esc(p.why)+'</p>':'')+(p.abstract?'<p class="abs">'+esc(p.abstract)+'</p>':'')+'</details>':head;
      return '<li class="'+(past?'past ':'')+(cur?'cur ':'')+(p.main?'':'side')+'"><span class="mono">'+fmt(p.start)+'</span><span class="t">'+more+'<span class="room mono">'+esc(p.room)+'</span></span>'+pill+'</li>'}).join('')||'<li class="lede">Nothing scheduled.</li>';
    document.getElementById('dayswitch').innerHTML=D.days.map(function(d){return '<button type="button" title="'+esc(d.full)+'" data-d="'+d.date+'"'+(d.date===date?' aria-pressed="true"':'')+'>'+esc(d.label)+'</button>'}).join('');
  }
  document.getElementById('dayswitch').addEventListener('click',function(e){var b=e.target.closest('button');if(b)render(b.getAttribute('data-d'))});
  document.getElementById('roomfilter').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;room=b.getAttribute('data-r');try{localStorage.setItem('aie-room',room)}catch(x){}render(cur)});
  render(pick);setInterval(function(){var b=document.querySelector('#dayswitch [aria-pressed]');render(b?b.getAttribute('data-d'):pick)},60000);
})();`;
  write("index.html", shell({ title: "Today", active: "today", up, body, script }));
}

const people = Object.keys(wm.speakers).length;
console.log(`wrote index.html, site/talks/ (${captured.length} hubs), site/themes.html (${themes.length}), site/people.html (${people} speakers, ${Object.keys(wm.speakers).filter((id) => handleFor(id)).length} on X)`);
