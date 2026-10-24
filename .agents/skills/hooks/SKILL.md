---
name: hooks
description: Turn a talk, a theme report, or a research trace into evidence-backed hooks — the bullet points worth writing about. Use when the user wants ideas, angles, a hook, what's interesting here, or material for an article, thread, tutorial, or magazine.
---

# Hooks

A hook is one sentence you would say to a colleague who was not there. Every
hook carries its evidence: a verbatim quote, the talk, and a timestamp. No
evidence, no hook.

## 1. Pick the source

- one talk → `talks/<slug>/transcript.md` and `links.md`
- the conference → `analysis/themes.md`
- a research exchange → `notes/research/`
- a captured note → `notes/inbox/`

Name the source in the output frontmatter.

## 2. Read for claims

A claim is one speaker, one section, one argument. Read the `### HH:MM:SS`
sections; do not work from the abstract. Pull 5–10 candidates.

## 3. Hold each one to the bar

- **Verbatim quote** from the transcript, 30 words or fewer.
- **Talk + timestamp** — the `HH:MM:SS` heading, not an estimate.
- **Kind**: `novel`, `contrarian`, `data`, `practical`, `tutorial`, `quote`.
- **Angle**: the piece you would write — essay, thread, tutorial, talk.
- **Assets**: photos and dossier links that support it.

Kill a candidate that only restates the schedule abstract, or that you cannot
quote. The conference's own summary is not a hook.

## 4. Cluster

Two hooks collapse when they make the same argument in different words. Keep the
strongest evidence and list the other talks as corroboration. A hook only one
talk makes is allowed; mark it `single-source`.

## 5. Write

`editorial/hooks/<YYYY-MM-DD>-<slug>.md`:

```md
---
generated_at: 2026-10-23T20:40:00-04:00
sources: [talks/<slug>/transcript.md, analysis/themes.md]
---

## <hook sentence>

- kind: novel
- evidence: "<verbatim quote>" — <talk title>, <HH:MM:SS>
- also: <other talks making the same argument>
- angle: <one line>
- assets: [talks/<slug>/photos/, talks/<slug>/links.md]
- status: draft
```

Add the best two or three to `editorial/backlog.md` under `## Ideas`, each with
a source.

Done when every hook has a verbatim quote, a talk, and a timestamp; the output
names its sources; and at least one hook is non-obvious to someone who has only
read `brief/schedule.md`.

## Incremental runs

Run this after a talk, not once at the end. Append to the hook file for the
theme or the day; dedupe by argument against what is already there. A hook
written while an issue is `growing` also goes to `editorial/backlog.md` under
Ideas immediately, so the next day's issue update has something to select.
