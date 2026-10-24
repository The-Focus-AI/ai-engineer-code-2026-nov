---
name: schedule-brief
kind: responsibility
version: 0.1.0
---

# Schedule Brief

> The human-facing projection of the tracked conference. It wakes only when the
> schedule, venue, or change log actually moves, and it never invents a row: the
> brief is rendered *from* the structured truth, so it is excluded from the
> fingerprint (the structured-backing rule).

### Goal

`brief/schedule.md` is a readable, always-current answer to "what is happening,
where, and when" for the tracked conference, and `brief/changes.md` is the
append-only record of what moved since tracking began.

### Requires

- `event`: conference name, edition, city, dates, timezone, and status.
  *(Facet `event` of `conference-schedule`.)*
- `venue`: venue name, address, rooms, transit, accessibility, and whether the
  venue was confirmed from an authoritative page. *(Facet `venue` of
  `conference-schedule`.)*
- `program`: the complete day/session structure with rooms, times, formats, and
  speaker ids. *(Facet `program` of `conference-schedule`.)*
- `speakers`: the roster the session `speaker_ids` resolve against. *(Facet
  `speakers` of `conference-schedule`.)*
- `change_log`: the append-only record of added, moved, retitled, cancelled, and
  re-roomed sessions. *(Facet `change_log` of `conference-schedule`.)*
- `coverage`: the completeness ledger, so the brief can state how much of the
  source was verified. *(Facet `coverage` of `conference-schedule`.)*

### Maintains

- `brief`: `{ schedule_path, changes_path, sections, included_sessions, headline_changes, generated_at, content_hash }`

**Type**

- `schedule_path`: always `brief/schedule.md`
- `changes_path`: always `brief/changes.md`
- `sections`: `[{ section_id, title, session_count }]` — the rendered outline, in order
- `included_sessions`: the `session_id` set the brief actually rendered
- `headline_changes`: the `change_log` `seq` values surfaced at the top of the brief
- `generated_at`: render timestamp
- `content_hash`: hash of the rendered Markdown

**Canonicalization spec**:

- **Material**: `schedule_path`, `changes_path`, `sections`, `included_sessions`,
  and `headline_changes`.
- **Immaterial** (excluded from the fingerprint): `generated_at`, `content_hash`,
  and all rendered prose. Re-rendering identical truth yields an unmoved
  fingerprint; downstreams never wake on a byte-identical rewrite.
- `included_sessions` is compared as a set; `sections` and `headline_changes`
  are ordered by first appearance.

**Postconditions**:

- `brief/schedule.md` renders every session in `program` exactly once, grouped by
  day, and each row carries local start–end times, room (or `location_note` for
  off-site), title, format, and speakers.
- The masthead states conference name, dates, city, timezone, status, and the
  venue block; unknown venue fields say "not published" rather than guessing.
- The header's session count equals `program.session_count`, and the brief states
  the coverage line ("N of M sessions verified; source archived …") so a partial
  schedule can never read as a complete one.
- `brief/changes.md` mirrors `change_log` exactly, newest first, and is
  append-only: an earlier run's entry is never rewritten.
- No session, speaker, room, or time appears in the brief that is absent from the
  structured truth.
- A render that moves nothing writes nothing: identical truth, identical bytes.

### Errors

- `truth-inconsistent`: a required upstream facet is missing or the session count
  in `program` cannot be reconciled; fail rather than render a partial brief.
- `write-failed`: the brief path is not writable; the prior brief stands.

### Continuity

- **input-driven**: a new `conference-schedule` receipt whose `event`, `venue`,
  `program`, `speakers`, `change_log`, or `coverage` facet fingerprint moved.

No self-driven cadence: the brief has no independent notion of freshness. A
schedule that did not move does not need a new brief.

### Shape

- `self`: turn the structured truth into a readable, correctly-ordered Markdown
  brief and a changelog; reconcile counts; keep byte-identical renders identical.
- `prohibited`: editing the structured truth; inventing or "tidying" sessions;
  adding commentary the truth does not support; summarizing away a session;
  writing outside `brief/`.
- `delegates`: none. Rendering is this node's own work.

### Invariants

- The brief is a projection of the truth, never a second source of truth: if the
  two disagree, the truth wins and the brief is re-rendered.
- Every `included_sessions` id exists in `program.sessions`; every
  `program.sessions` id is in `included_sessions`.
- `brief/changes.md` is a faithful copy of `change_log`, never curated.
- Rendered prose is not fingerprinted: a cosmetic re-render never wakes a
  downstream.

### Strategies

- when a day has more than one room: render a time-ordered list per day and mark
  the room on each row; a wide grid is unreadable in a file.
- when two sessions overlap for the same speaker: keep both and note the clash
  from `coverage.gaps` directly under that day.
- when `event.status` is `archived`: say so in the masthead and label the brief
  "archived record" rather than "upcoming".
- when `coverage.gaps` is non-empty: put the gap line above the first day, not in
  a footnote — incompleteness is the most important thing on the page.
- when a session has `abstract`: include it as an indented block under the row
  only for `keynote` and `talk` formats, to keep the page scannable.

### Runtime

- `persist`: project
