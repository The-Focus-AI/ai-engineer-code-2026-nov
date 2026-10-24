# AGENTS.md

**`src/` is the source of truth**, `dist/` is compiled and disposable,
`state/` is the durable truth, `runs/` is evidence. The README explains the
product; this is the working agreement for changing it.

## Template or build

At session start, run `git check-ignore brief/ state/ talks/`. If all three
print, this is the **template**: it has no conference data and the “conference
build data” block in `.gitignore` hides one. Do not invent data or edit contracts
around the absence.
Run the `new-conference` skill first. A build deletes that block so its own
`brief/`, `state/`, `talks/`, and artifacts are tracked. One clone = one
conference.

Two pipelines share one reconciler: **schedule** (`schedule-check` →
`conference-schedule` → `schedule-brief`) and **recordings**
(`recording-inbox-watch` → `recording-intake` → `talk-photos` / `talk-links`).
A node renders only when a contract or input fingerprint moved. Run the
reconciler; don't reason about whether a node should wake. Every render commits a
world-model and signs a receipt.

## Where the data is

[`MAP.md`](MAP.md) indexes it: the schedule truth, a build's talk transcripts,
dossiers, recordings, the join keys between them, and what the template lacks.

`/ask-talks` answers a question about what a talk said. `/talk-themes` finds the
patterns across every talk.

## Read before you edit

| If you are… | Read |
| --- | --- |
| changing a contract | [`contract-markdown.md`](.agents/skills/open-prose/contract-markdown.md), then the contract in `src/` |
| running, restarting, or debugging serve | [`scripts/serve/README.md`](scripts/serve/README.md) — tick procedure, policy fencing, receipts |
| changing the toolchain | [`README.md`](README.md) Toolchain |
| capturing a note or making an artifact | [`FRAMEWORK.md`](FRAMEWORK.md) — capture, hooks, backlog, magazine |
| changing the visual language | [`design.md`](design.md) — tokens, components, interaction hooks |
| resolving a photo or a dossier | `src/talk-photos.prose.md`, `src/talk-links.prose.md` |

## Rules the code will not enforce

- Edit `.prose.md` sources, recompile, promote. Hand-editing `dist/` or `state/`
  produces a receipt that lies.
- A talk is faithful when its body is an **in-order token subsequence** of the
  transcript. ASR garble stays; correcting it changes evidence.
- Photo filenames are **UTC**; convert with the event timezone before comparing
  to a session.
- A dossier link is published only if it answered, or is a login-walled profile
  corroborated by its own title. `first_seen` after `ends_on` is a post-event
  publication.
- `talk-links` runs a **settling** cadence after the event. The cadence lives in
  `### Continuity`, not in cron.

## Done means

`mise run validate` and `mise run typecheck` pass, `git status` shows no
generated or raw-media files, and any state change has a receipt in
`state/world-model/<node>/receipts.jsonl`.
