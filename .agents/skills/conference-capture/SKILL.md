---
name: conference-capture
description: Capture an observation, question, link, quote, or todo from the conference into notes/inbox/. Use when the user says note this, remember this, capture this, log this, or wants something added to review or digest later.
---

# Capture

One note, one file. The microphone gets the talk; this gets everything around it.

## 1. Classify

`kind`: `observation`, `question`, `link`, `quote`, or `todo`.

A thing to do after the conference is `todo`, and needs a bucket: `review` (go
back and check it) or `digest` (read, watch, or process it).

## 2. Timestamp

Read `state/world-model/conference-schedule/published/event/event.json` for the
timezone. Name the file `YYYY-MM-DDTHHMM-<slug>.md` and repeat the time in
frontmatter:

```yaml
---
captured_at: 2026-10-14T11:32:00-04:00
kind: observation
session_id: null
talk: null
tags: []
---
```

Never timestamp in UTC. Notes sit beside the schedule and the photos, and those
are local.

## 3. Link the session

- Exactly one session window contains `captured_at` → set `session_id`.
- The user names a talk or slug → set `talk: talks/<slug>/`.
- Otherwise leave both `null`. A wrong link is worse than none.

## 4. Write the body

The words as they were said or seen. Preserve names and numbers exactly; the
reader can correct them later. State what happened, not what it meant.

## 5. Route todos

Append to `editorial/backlog.md` under `## Review later` or `## Digest later`:

```md
- [ ] <one line> — <source: note path, talk path, or URL>
```

Done when: the file exists with valid frontmatter, `session_id`/`talk` are set or
explicitly null, and every todo has a backlog line.
