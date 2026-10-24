---
name: enrich-speaker-profiles
kind: function
version: 0.1.0
---

# Enrich Speaker Profiles

> Depth without sprawl. Speaker bios, links, and talk artifacts are worth having,
> but opening a profile page per speaker is the most expensive thing this system
> does — so it is bounded per render and resumable across renders.

### Description

Given the extracted roster, fills `affiliation`, `bio`, and `links` for speakers
whose record is still thin, within a per-render budget, and reports what remains
so the next render can continue rather than restart.

### Parameters

- `speakers`: the extracted speaker map, keyed by `speaker_id`.
- `sessions`: the extracted sessions, for talk-level artifacts (slides, video).
- `budget`: the maximum number of profile pages this render may open.

### Returns

- `speakers`: the same map, enriched in place — `affiliation`, `bio`, `links`,
  and per-talk `slides_url` / `video_url` when the site publishes them.
- `enrichment`: `{ done: [speaker_id], pending: [speaker_id], failed: [{ speaker_id, reason }] }`
  — `pending` is what the next render should pick up.

### Invariants

- Only observed facts: `affiliation` comes from a page that presents that person
  with that organization, never from a company mentioned in a talk title.
- A failed or blocked profile page never blanks an existing bio or link; the
  record is returned unchanged and the speaker is listed in `failed`.
- `budget` is a hard cap, not a target: a render may finish under it and must not
  exceed it.
- `done` + `pending` + `failed` covers exactly the input roster — no speaker is
  silently dropped.
- Talk-level `slides_url` / `video_url` are recorded only when the conference
  site itself links them.

### Strategies

- when the conference publishes its own speaker page: prefer it over third-party
  bios, which drift.
- when a speaker has no published bio: leave `bio: null`, keep the name and
  affiliation, and let `pending` shrink — absence is not a failure.
- when a speaker appears on multiple talks: open their profile once and attach
  all talks.
- when a profile link is a social account: record it under `links` with the
  platform, but do not scrape it for a bio.
- when the budget runs out: stop cleanly and report the remainder as `pending`;
  never truncate the roster.

### Shape

- `self`: open profile pages, read the published bio and links, attach talk
  artifacts the conference links.
- `prohibited`: guessing affiliations, summarizing a speaker's bio into
  marketing copy, contacting speakers, scraping private profiles, using
  non-public contact details.

### Runtime

- `persist`: true
