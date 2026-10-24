#!/usr/bin/env bun
/**
 * Rank what to work on next in a conference build.
 *
 * Usage:
 *   bun scripts/next-work.ts            # markdown to stdout
 *   bun scripts/next-work.ts --write    # also write editorial/next.md
 *   bun scripts/next-work.ts --json
 *
 * The score is a prompt, not a verdict: theme centrality, visual assets,
 * whether a story exists, and whether the talk is long enough to be worth a
 * page. It never builds anything.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const talksDir = join(root, "talks");
const themesPath = join(root, "analysis", "themes.md");

interface Talk {
  slug: string;
  title: string;
  speakers: string;
  duration: string;
  words: number;
  photos: number;
  video: boolean;
  story: boolean;
  experience: boolean;
  themes: number[];
}

interface Theme {
  n: number;
  title: string;
  talks: string[];
}

function read(path: string): string {
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function frontmatter(text: string): Record<string, string> {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  return Object.fromEntries(
    m[1]!
      .split("\n")
      .map((line) => line.match(/^([A-Za-z_]+):\s*(.*)$/))
      .filter((x): x is RegExpMatchArray => Boolean(x))
      .map((x) => [x[1]!, x[2]!.replace(/^["']|["']$/g, "")]),
  );
}

function speakerNames(fm: string): string {
  const names = [...fm.matchAll(/^\s*-\s*name:\s*(.+)$/gm)].map((m) => m[1]!.trim());
  return names.join(", ");
}

function readThemes(): Theme[] {
  const text = read(themesPath);
  if (!text) return [];
  const themes: Theme[] = [];
  const parts = text.split(/\n(?=## )/);
  for (const part of parts) {
    const head = part.match(/^## (\d+)\.\s+(.+)$/m);
    if (!head) continue;
    const talks = [...part.matchAll(/\.\.\/talks\/([^/]+)\/transcript\.md/g)].map((m) => m[1]!);
    themes.push({
      n: Number(head[1]),
      title: head[2]!.trim().replace(/\s+—\s+\d+\s+talks?$/, ""),
      talks,
    });
  }
  return themes;
}

function readTalks(themes: Theme[]): Talk[] {
  if (!existsSync(talksDir)) return [];
  const themeBySlug = new Map<string, number[]>();
  for (const t of themes) {
    for (const slug of t.talks) {
      themeBySlug.set(slug, [...(themeBySlug.get(slug) ?? []), t.n]);
    }
  }
  return readdirSync(talksDir)
    .filter((slug) => statSync(join(talksDir, slug)).isDirectory())
    .map((slug) => {
      const dir = join(talksDir, slug);
      const transcript = read(join(dir, "transcript.md"));
      const fm = frontmatter(transcript);
      const links = read(join(dir, "links.md"));
      const photosDir = join(dir, "photos");
      const photos = existsSync(photosDir)
        ? readdirSync(photosDir).filter((f) => statSync(join(photosDir, f)).isFile()).length
        : 0;
      return {
        slug,
        title: fm.title ?? slug,
        speakers: speakerNames(transcript),
        duration: fm.duration ?? "",
        words: transcript.split(/\s+/).filter(Boolean).length,
        photos,
        video: /youtube|youtu\.be|vimeo|video/i.test(links),
        story: existsSync(join(dir, "story.md")),
        experience:
          existsSync(join(dir, "experience", "index.html")) ||
          existsSync(join(dir, "experience", "page.html")),
        themes: themeBySlug.get(slug) ?? [],
      };
    });
}

function score(t: Talk): number {
  return (
    t.themes.length * 3 +
    Math.min(t.photos, 8) +
    (t.video ? 3 : 0) +
    (t.story ? 0 : 8) +
    (t.words >= 2500 ? 1 : 0)
  );
}

function reason(t: Talk): string {
  const bits = [
    `${t.themes.length} theme${t.themes.length === 1 ? "" : "s"}`,
    t.photos ? `${t.photos} photo${t.photos === 1 ? "" : "s"}` : "no photos",
    t.video ? "video" : "no video",
    t.story ? "story" : "no story",
  ];
  if (t.experience) bits.push("page");
  return bits.join(" · ");
}

function atlases(): { slug: string; title: string }[] {
  const dir = join(root, "atlases");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((slug) => statSync(join(dir, slug)).isDirectory())
    .map((slug) => {
      const data = read(join(dir, slug, "atlas.json"));
      let title = slug;
      try {
        title = (JSON.parse(data) as { title?: string }).title ?? slug;
      } catch (_) {
        /* keep slug */
      }
      return { slug, title };
    });
}

const themes = readThemes();
const talks = readTalks(themes).sort((a, b) => {
  if (a.story !== b.story) return a.story ? 1 : -1;
  return score(b) - score(a) || a.slug.localeCompare(b.slug);
});
const built = atlases();
const readyThemes = themes
  .map((t) => ({
    ...t,
    stories: t.talks.filter((slug) => talks.find((x) => x.slug === slug)?.story).length,
  }))
  .filter((t) => t.stories >= 3)
  .filter((t) => !built.some((a) => a.title.toLowerCase().includes(t.title.toLowerCase().split(":")[0]!.trim())));

const payload = { talks: talks.map((t) => ({ ...t, score: score(t), reason: reason(t) })), themes: readyThemes, atlases: built };

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(payload, null, 2));
} else if (!talks.length) {
  console.log("No talks in this build. Run `new-conference`, then record and intake a talk first.");
} else {
  const lines: string[] = [];
  lines.push("# Next work", "");
  lines.push("Ranked by theme centrality, visual assets, and whether a story exists.", "");
  lines.push("| Score | Talk | Themes | Photos | Video | Story |");
  lines.push("| ---: | --- | ---: | ---: | :---: | :---: |");
  for (const t of talks) {
    lines.push(
      `| ${score(t)} | ${t.title} | ${t.themes.length} | ${t.photos} | ${t.video ? "yes" : "no"} | ${t.story ? "yes" : "no"} |`,
    );
  }
  lines.push("", "## Start here", "");
  const open = talks.filter((t) => !t.story).slice(0, 3);
  if (!open.length) lines.push("Every talk has a story. The next move is a through-line atlas.");
  else
    open.forEach((t, i) => {
      lines.push(`${i + 1}. **${t.title}** — ${reason(t)}. \`talks/${t.slug}/\``);
    });
  lines.push("", "## Themes ready for a through-line", "");
  if (!readyThemes.length) lines.push("None yet: a theme needs at least three talk stories.");
  else
    readyThemes.forEach((t) => {
      lines.push(`- **${t.title}** — ${t.stories} stories.`);
    });
  lines.push("", "## Existing atlases", "");
  if (!built.length) lines.push("None.");
  else built.forEach((a) => lines.push(`- ${a.title} (\`atlases/${a.slug}/\`)`));
  const out = lines.join("\n");
  console.log(out);
  if (process.argv.includes("--write")) {
    mkdirSync(join(root, "editorial"), { recursive: true });
    writeFileSync(join(root, "editorial", "next.md"), out + "\n");
    console.error("  wrote editorial/next.md");
  }
}
