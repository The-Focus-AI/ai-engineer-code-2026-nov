---
name: next
description: Inspect a conference build and recommend what to work on next — which talk to turn into a story, which theme is ready for a through-line, and what is missing. Use when the user asks what is next, where to start, or what to do with the corpus.
---

# Next work

The build has more material than attention. This skill ranks it and stops.

## Run the audit

```bash
bun scripts/next-work.ts            # markdown
bun scripts/next-work.ts --json     # structured
bun scripts/next-work.ts --write    # also editorial/next.md
```

It scans:

- `talks/*/transcript.md` — title, speakers, duration, word count.
- `talks/*/links.md` — a video link.
- `talks/*/photos/` — filed photos.
- `talks/*/story.md` and `talks/*/experience/` — has the talk been storied?
- `analysis/themes.md` — which themes cite the talk.
- `atlases/*/atlas.json` — existing through-lines.

The score is a prompt, not a verdict:

```
themes * 3 + min(photos, 8) + video(3) + no-story(8) + long-enough(1)
```

## Read it in three passes

1. **Best visual candidate.** The top unstoried talk with photos and video. It
   is the cheapest way to test the talk-page layout.
2. **Best argument candidate.** The top unstoried talk with three themes and no
   photos. It will need generated diagrams, so it tests the harder visual case.
3. **Theme readiness.** A theme with at least three stories and no atlas. That is
   the next through-line, not the next talk.

Do not recommend a talk that already has `story.md` and `experience/index.html`.

## Output

Tell the user:

- the top one or two talks, with the exact slug;
- why (themes, photos, video, length);
- the first theme that will be ready for a through-line;
- what is missing (no video, no photos, thin transcript, no dossier).

Then ask which talk to take through `/polish-talk`. One at a time.

## Boundaries

- The audit does not write prose, choose quotes, or build pages.
- A score is not an editorial judgment. If the user wants a different talk, take
  it; the audit is a map, not a manager.
- Never run `polish-talk` and `talk` in the same turn without the user's choices.
