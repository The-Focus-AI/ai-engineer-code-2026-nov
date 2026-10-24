---
name: place-talk-photos
kind: function
version: 0.1.0
---

# Place Talk Photos

> Time narrows; the recording decides. A photo is filed only when exactly one
> window — a matched recording or a single session — contains it.

### Description

Takes the photo manifest, the session grid, and the recording index, and returns
one placement per photo: the session it belongs to, or the event bucket, or a
needs-review entry naming the candidates. Pure decision; copies nothing.

### Parameters

- `photos`: the manifest entries — `file`, `captured_at_utc`, `sha256`, burst id.
- `sessions`: the program sessions — `session_id`, `title`, `starts_at`,
  `ends_at`, `format`, `room_id`.
- `recordings`: the intake recordings — `source_recording`, `recorded_at`,
  `duration_seconds`, and its matched `session_id` when known.
- `timezone`: the event's IANA timezone.

### Returns

- `placements`: `[{ file, captured_at_local, session_id, method, confidence, evidence, candidates }]`
  where `method` is `recording-overlap`, `time`, `event`, or `none`.
- `needs_review`: the placements with `method: none` and a non-empty candidate list.
- `unplaced`: placements with no window and no event bucket.
- `bursts`: `{ [burst_id]: [file] }` — photos within 90 seconds of each other.

### Invariants

- `captured_at_local` is computed as `captured_at_utc` converted to `timezone`;
  the filename is never read as a local time.
- A `recording-overlap` placement requires a recording whose
  `[recorded_at, recorded_at + duration]` contains the photo time (2-minute
  grace) **and** whose matched `session_id` is known.
- A `time` placement requires exactly one session whose window contains the
  photo time.
- A session of format `break`, `registration`, `social`, or a title matching
  lunch/expo/reception is an event bucket, never a talk.
- Candidates are drawn only from `sessions`; no session is invented.
- A photo with no parseable time is `unplaced` and named in the result.

### Strategies

- when several recordings are active (nested or overlapping): prefer the one
  with the latest start that still contains the photo, and note the overlap.
- when a photo is minutes before a talk and inside no window: if it falls inside
  the preceding event window, file it there; otherwise needs-review.
- when the photo time is inside a talk's window but after the talk's recording
  ended: treat it as a `time` candidate only, never `recording-overlap`.

### Shape

- `self`: convert, intersect, and rank; no filesystem writes.
- `prohibited`: reading image content, modifying photos, or deciding "did this
  change".

### Runtime

- `persist`: true
