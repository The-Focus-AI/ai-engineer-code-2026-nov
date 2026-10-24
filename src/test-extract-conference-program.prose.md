---
name: test-extract-conference-program
kind: test
subject: src/extract-conference-program.prose.md
version: 0.1.0
---

# Test Extract Conference Program

> Covers the deterministic core: a small grid-shaped page must produce a complete,
  offset-qualified, non-invented structure. No network, no prior truth.

### Fixtures

- `pages`:
  - `{ url: "fixtures/two-day-schedule.md", role: "schedule", content_hash: null, byte_length: null, truncated: false, segments: ["fixtures/two-day-schedule.md"], path: "fixtures/two-day-schedule.md" }`
- `page_set`:
  - `{ entry: "fixtures/two-day-schedule.md", schedule: "fixtures/two-day-schedule.md", speakers: "fixtures/two-day-schedule.md", venue: null }`
- `prior`: `null`

### Expects

- `program.session_count`: equals 8, and equals `program.stated_session_count`.
- `program.days`: has two entries, October 14 and October 15, 2026, with session
  counts that sum to 8.
- `program.sessions`: every session has a `session_id`, a `title`, and
  `starts_at`/`ends_at` in offset-qualified ISO 8601 ending `-04:00`.
- `venue`: names "Hudson Hall" with the street address, and lists Main Hall,
  Studio B, and Foyer as rooms.
- `speakers`: contains four people — Ada Okafor, Ravi Menon, June Park, and Tomás
  Rivera — with the affiliation stated on the page, and Ada Okafor is linked to
  three sessions.
- The coffee break has `format: break` and no `speaker_ids`.
- The afterparty has `format: side-event`, `room_id: null`, and a `location_note`
  naming "The Dead Rabbit".
- The two 9:30 sessions on October 14 are distinct sessions in different rooms,
  both retained.

### Expects Not

- `abstract`: contains paraphrased or invented prose — the fixture publishes no
  abstracts, so every `abstract` is null.
- `speakers`: contains an affiliation inferred from a talk title rather than the
  page's speaker list.
- `program.sessions`: contains a duplicate of any fixture row, or a session
  invented to fill an empty grid cell.
- `starts_at`: is a naive local time, a date-only value, or offset `-05:00`
  (October 2026 is EDT, not EST).
- `coverage.gaps`: is non-empty when the page is fully readable.
