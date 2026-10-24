---
name: fetch-conference-pages
kind: function
version: 0.1.0
---

# Fetch Conference Pages

> Stateless page acquisition for one conference. It answers "what pages exist,
> what did they say, and did any of them change?" — nothing about what the
> schedule means. Extracted content is written to the render's private
> `workspace/` and passed on by reference, so page text never bloats context.

### Description

Discovers the source page set from the conference URL, fetches each page, hashes
it, and segments it when long. Reuses a prior hash to skip re-reading an
unchanged page.

### Parameters

- `conference_url`: the tracked conference's entry or schedule URL.
- `prior_pages`: the prior `coverage.pages` list (`url`, `role`, `content_hash`) —
  empty on the first run.

### Returns

- `page_set`: `{ entry, schedule, speakers, venue }` — resolved same-site URLs.
  `schedule` falls back to `entry` when the site has no separate schedule route;
  `speakers` and `venue` are `null` when the site does not publish them.
- `pages`: `[{ url, role, content_hash, byte_length, truncated, segments, path }]`
  — one record per fetched page; `segments` is the ordered list of workspace
  segment files when the page was split, and `path` is the first of them.
- `unchanged`: the `url` list whose hash matched `prior_pages`, so the caller can
  skip re-extraction.
- `unreachable`: `[{ url, status, reason }]` — failed pages, never silently
  dropped.

### Invariants

- Every returned URL is one the site itself linked (same host or declared
  provider); no URL is constructed from a guess.
- A page that returned an error, a redirect to a marketing page, or a login wall
  is reported in `unreachable`, never returned as content.
- `content_hash` is computed over the normalized text (whitespace collapsed), so
  a cosmetic re-render of the same page yields the same hash.
- Fetching is read-only and unauthenticated: no credentials, no form posts, no
  rate-limit evasion.

### Strategies

- when a page is longer than the reader's limit: segment by day heading, then by
  room table anchor, and record every segment so nothing is lost to truncation.
- when the entry page links both `/schedule` and `/agenda`: prefer the route the
  site's own navigation labels as the schedule.
- when the schedule loads from a JSON endpoint the page calls: use the endpoint
  if it is public and same-origin; otherwise keep the rendered HTML path.
- when a fetch fails: retry twice with backoff, then report it in `unreachable`
  and let the caller decide (usually `source-unreachable`).

### Shape

- `self`: discover links, fetch, hash, segment, and hand back by reference.
- `prohibited`: interpreting the page, inventing URL patterns, bypassing auth or
  robots directives, or writing to any path outside `workspace/`.

### Runtime

- `persist`: true
