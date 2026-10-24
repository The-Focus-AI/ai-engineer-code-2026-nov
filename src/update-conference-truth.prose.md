---
name: update-conference-truth
kind: function
version: 0.1.0
---

# Update Conference Truth

> The commit gate. It compares the freshly extracted structure against the prior
> truth field by field, appends a change only where something material actually
> moved, reconciles the counts, and returns the next truth — or the unchanged one.

### Description

Deterministic-ish reconciliation for one conference: diff prior against next,
classify each difference into a `Change` kind, carry the append-only log forward,
merge the coverage ledger, and hand back a truth that satisfies every
`conference-schedule` postcondition.

### Parameters

- `prior`: the prior world-model (empty on first run).
- `extracted`: the structural truth from `extract-conference-program`.
- `speakers`: the enriched roster from `enrich-speaker-profiles`.
- `fetched`: the page records from `fetch-conference-pages`, for the coverage
  ledger.

### Returns

- `truth`: the complete next world-model — `event`, `venue`, `program`,
  `speakers`, `change_log`, `coverage` — shaped exactly as `conference-schedule`
  declares it.
- `changes`: the entries appended this render (empty when nothing material moved).
- `gaps`: the reconciled completeness gaps, also written into `coverage.gaps`.

### Invariants

- **Append-only**: `change_log` entries are never dropped, reordered, or
  rewritten; `seq` is strictly increasing from the prior maximum.
- **Material only**: a change is appended only when a material field moved.
  Whitespace, ordering, and `fetched_at` churn append nothing.
- **Matched by identity, not position**: sessions are matched on `session_id`;
  when an id is absent but the `(starts_at, room_id, speaker_id set)` matches a
  prior session, that is a `retitled`, not a remove-plus-add.
- **Counts reconcile**: `session_count` equals the number of sessions actually
  returned, `days[].session_count` equals the rows for that day, and a mismatch
  against `stated_session_count` becomes a named gap rather than a quiet edit.
- **A vanished session is `removed`**, not forgotten: it leaves `program` and
  enters `change_log` with its last-known title and time.
- A `cancelled` session stays in `program` with `status: cancelled`; it is not
  removed, and its slots remain visible to the brief.
- The prior truth is never mutated in place: the function returns a new truth.
- `coverage.pages` is replaced by the current fetch record; `verification_count`
  increments by one; `last_verified_at` is set.

### Strategies

- when a session's time moves by any amount: `retimed` with `before`/`after`
  timestamps — do not round to the nearest slot.
- when a session moves room but keeps its slot: `room-changed`.
- when the venue block gains a confirmed address or room set: `venue-changed`,
  summarized once, not once per session.
- when the event's `starts_on`/`ends_on` moves: `event-dates-changed`, and note
  it above every session-level change in the brief.
- when the source first states a total it did not state before: set
  `stated_session_count`; do not backfill a change for every session.
- when the page gains an archive banner: append `source-archived` **once** on the
  transition to `archived`, never on subsequent renders.
- when extraction reports `unparsed_regions`: carry them into `coverage.gaps` even
  if the counts happen to reconcile, so the gap is visible downstream.

### Shape

- `self`: diff structural truth, classify changes, reconcile counts, merge
  coverage, and return the next truth.
- `prohibited`: rewriting history, deleting change entries, "fixing" a session
  the source does not show, or deciding whether a render should have happened
  (the reconciler owns skip-vs-render).

### Runtime

- `persist`: true
