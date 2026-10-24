---
name: extract-conference-program
kind: function
version: 0.1.0
---

# Extract Conference Program

> The typed edge of the tracker: page text in, structured event/venue/program/
> speakers out. It is the one place that decides what a row *means*, and it is
> deliberately paranoid — a value it did not read becomes `null`, never a guess.

### Description

Reads the fetched page segments (by reference) and produces the structural truth
for one conference: identity and dates, venue and rooms, the complete session
list, and the speaker roster. It also reports how much of the source it could
not structure, so completeness is measurable rather than assumed.

### Parameters

- `pages`: the `fetch-conference-pages` page records (paths and hashes).
- `page_set`: the resolved `{ entry, schedule, speakers, venue }` URLs.
- `prior`: the prior world-model, so stable ids and known unknowns survive.

### Returns

- `event`, `venue`, `program`, `speakers`: the structural truth, shaped exactly
  as `conference-schedule` → `### Maintains` declares it.
- `coverage`: `{ stated_session_count, unparsed_regions, gaps, enrichment: { done, pending, failed } }` —
  the extraction-side ledger. `stated_session_count` is the total the source
  claims ("167 sessions"), or `null` when it claims none.

### Invariants

- **Nothing is invented.** `abstract`, `bio`, `affiliation`, `track`, and
  `room_id` come from source text or are `null`; a missing value is recorded in
  `coverage.gaps`, not filled from prior knowledge of the conference.
- `abstract` is captured verbatim (whitespace-normalized only). It is never
  summarized, tightened, or rewritten.
- Every session carries `source_url` and, when the site provides one, a
  `source_anchor`.
- Times are offset-qualified ISO 8601 in `event.timezone`. A time without enough
  information to resolve an offset becomes `null` plus a gap — never a guessed
  hour.
- `session_id` is derived from the source anchor when present, else
  `slug(title) + "@" + starts_at`; it never depends on row order.
- A session's `speaker_ids` reference speakers actually named for that session;
  a name mentioned in an abstract prose paragraph is not a speaker.

### Errors

- `timezone-ambiguous`: the source mixes offsets or labels a zone that cannot be
  resolved to one IANA zone; times cannot be published honestly.
- `not-a-schedule`: the pages contain no day/session structure (wrong page).

### Strategies

- when the schedule is a time-by-room grid: read the column headers once as the
  room set, then let each non-empty cell become a session with that room.
- when a cell holds several talks: split on the cell's own separator, not on
  punctuation inside titles.
- when a session links to a detail page: take `abstract` from the detail page and
  keep the grid's time and room as authoritative.
- when the same title appears twice on different days: they are different
  sessions; disambiguate with the day in the id, not by merging.
- when the site publishes a speakers page separately: use it for `affiliation`
  and `bio`, and treat the schedule's inline names as the authoritative roster.
- when a day contains only breaks or registration: keep the day, set its
  `session_count` to the real number of rows, do not drop it.
- when the page is the archived snapshot: extract normally and let the caller set
  `event.status = archived`; do not alter times because the event has passed.

### Shape

- `self`: read segments, recognize the day/room structure, normalize text and
  times, resolve ids, and record what could not be structured.
- `prohibited`: inventing, paraphrasing, or repairing source content; inferring
  affiliations from company names in talk titles; writing any file.

### Runtime

- `persist`: true
