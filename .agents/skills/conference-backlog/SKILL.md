---
name: conference-backlog
description: Add, triage, or close items in editorial/backlog.md — ideas to write, things to review, things to digest after the conference. Use when the user asks what's left, wants to park something for later, or is working through the post-conference list.
---

# Backlog

One file: `editorial/backlog.md`. Three lists: **Ideas**, **Review later**,
**Digest later**. Every item carries a source and a reason.

## Add

Put it in the list that matches the intent:

- **Ideas** — something to write or make.
- **Review later** — go back and check, re-watch, verify, follow up.
- **Digest later** — read, watch, or process; no decision yet.

```md
- [ ] <one line> — <source: hook path, talk path, note path, URL>
```

The reason lives in the one line; if it needs more, it becomes a hook or a note
and this points at it.

## Triage

Read the list with the user. Each item moves to one of:

- `open` — stays, still true.
- `doing` — someone is on it now.
- `done` — the thing was reviewed or digested; say what came of it.
- `dropped` — not worth it; say why.

Use `- [x]` for `done` and move `dropped` items to the bottom of their list with
`~~struck~~`.

## Close

A `done` item keeps its line and gains a result: `→ <what we found / wrote>`.
The backlog is a record, not just a queue.

Done when every open item has a source and a reason, and nothing sits in the
wrong list (a writing idea in Digest is a triage miss).

## During the event

Run this at the end of each day, not only at the end. Append what happened,
triage the day's items, and leave the rest open. The list is expected to grow
every day; its value is that nothing is lost between talks, not that it is short.
