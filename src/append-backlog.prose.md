---
name: append-backlog
kind: function
version: 0.1.0
---

# Append to the backlog

> One line, one source. The backlog is a record, not a queue.

### Description

Adds, marks, or drops one item in `editorial/backlog.md` without reordering what
is already there. Every caller — a captured todo, a hook synthesis, a triage pass
— writes through this one format, so the file does not drift into three dialects.

### Parameters

- `list`: which list the item belongs to — `ideas` (something to write or make),
  `review` (go back and check it), or `digest` (read, watch, or process; no
  decision yet).
- `item`: the one line to write. A reason that needs a paragraph is a note or a
  hook, and this points at it.
- `source`: where it came from — a note path, a hook path, a talk path, or a URL.
- `status`: `open` (default), `doing`, `done`, or `dropped`.
- `result`: what came of it; required when `status: done`.

### Returns

- `path`: always `editorial/backlog.md`
- `line`: the canonical line as written
- `created`: true when the file, or the list's heading, had to be created
- `deduped`: true when an open item with the same `item` and `source` already
  existed; the file was then left unchanged

### Invariants

- The canonical line is `- [ ] <item> — <source>`.
- `done` writes `- [x] <item> — <source> → <result>`; the line is kept, not
  removed.
- `dropped` is struck (`~~<item>~~`) and moved to the bottom of its own list.
- Existing items keep their order. New items append under the named list's `## `
  heading, before the next `## ` heading.
- An item without a source is refused: an unsourced item is noise.
- The other two lists are never touched, and no list is re-sorted.

### Errors

- `missing-source`: `source` is empty.
- `unknown-list`: `list` is not one of the three names.
- `missing-result`: `status: done` without a `result`.
- `no-heading`: the file exists but has none of the three list headings and
  cannot be repaired without guessing.

### Strategies

- when `editorial/backlog.md` is missing: create it with `## Ideas`,
  `## Review later`, and `## Digest later`, in that order, and report
  `created: true`.
- when the same source already has an open item making the same point: report
  `deduped: true` and leave the existing wording alone.
- when `status: done` closes an item opened earlier: update that line in place
  rather than appending a second one.
- when the item is a writing idea: it belongs in `ideas`; a writing idea parked in
  `digest` is a triage miss and the caller should be told.

### Shape

- `self`: read the one file, append or update one line, write it back.
- `prohibited`: rewriting, reordering, or re-sorting the file; touching a list
  other than the named one; writing an item with no source.

### Runtime

- `persist`: true
