# Conference Reporter

One clone, one conference. This repository is an OpenProse program that keeps a
single conference's schedule current: every session, speaker, room, and start/end
time, plus the venue you'll actually walk into — and an append-only record of what
changed since it started watching.

## Template or conference build

This repository is the template. It ships the program, contracts, skills, and
design language, and **no conference data**: `brief/`, `state/`, `talks/`,
`recordings/inbox/`, `photos/`, `analysis/`, `atlases/<slug>/`, and the editorial
artifacts are ignored by the “conference build data” block in `.gitignore`.

To make a build, fork or clone this repository and run the `new-conference` skill
in your agent:

```text
Run the new-conference skill. This is a fresh fork of conference-reporter;
the conference URL is <URL>.
```

It deletes that block so this fork's own data is tracked, sets
`CONFERENCE_URL`, and renders the schedule. One clone = one conference; never put
a second conference in the same build.

> **`prose ...` commands run inside your coding agent, not in a shell.** The
> agent session *is* the OpenProse runtime: `prose serve` loads the compiled
> intent, registers the cron and HTTP triggers, and runs the reconciler; the Bun
> adapters under `scripts/serve/` are what it calls for the deterministic parts.
> There is no `prose` binary on `PATH`, and there is no daemon — the schedules
> live in the session, so serve runs only while that session stays open.

**In a fresh template** — in your coding agent, run `new-conference`. It performs
the setup below, removes the conference fence, and builds the schedule. The
steps are here if you want to do them by hand.

**In a shell** — set up the clone:

```bash
cp .env.example .env          # set CONFERENCE_URL to the conference page
bun install
```

**In your coding agent** (Claude Code, Codex, OpenCode, Amp, DSH, …):

```text
prose compile                 # wire the DAG, compile canonicalizers + validators
```

Then promote the compile — the agent can run this, it is a plain file copy:

```bash
cp dist/manifest.next.json dist/manifest.active.json
```

```text
prose serve                   # register triggers; six-hourly ticks + the hourly live window
```

Or run one wake by hand — also an agent command, and the manual-kick path:

```text
prose run src/conference-schedule.prose.md
```

If the session ends, serve stops with it. Start it again the same way: validate
the active manifest, register the triggers, keep the session open.

## Toolchain

Bun, pinned by mise, with TypeScript everywhere. There is no Python in the
toolchain.

```bash
mise install                  # bun from mise.toml
bun install                   # exifr, typescript, bun-types
mise run validate             # compiled intent + trigger plan
mise run sync                 # Voice Memos → recordings/inbox (date-windowed)
mise run photos               # photos/ → photos/manifest.json
mise run typecheck            # tsc --noEmit
```

The Prose runtime under `scripts/serve/` is the same TypeScript: `validate-manifest.ts`,
`scan-inbox.ts`, `tick-inbox.ts`, `http-adapter.ts`, with shared shapes in
`types.ts`. Compiled canonicalizers and validators under `dist/` stay JavaScript
— they are generated OpenProse artifacts, not source.

## What it produces

| Path | What it is |
| --- | --- |
| `brief/schedule.md` | The readable brief: masthead, venue and logistics, day-by-day sessions with times, rooms, speakers, and abstracts; coverage line. |
| `talks/<date>-<slug>/links.md` | The dossier: speakers with verified profiles, the company, and up to six verified blog posts / papers / repos / videos tied to the talk. |
| `talks/<date>-<slug>/photos/` | Photos taken during the talk, filed by capture time (UTC filename → event timezone) and matched to the talk's recording window. |
| `photos/event/<date>/` | Photos from breaks, receptions and the hallway — event-level, not a talk. |
| `brief/changes.md` | Append-only changelog: added, retitled, retimed, room-changed, speaker-changed, cancelled, venue-changed, archived. |
| `state/world-model/conference-schedule/` | The canonical structured truth (the source of record). |
| `atlases/<slug>/` | An argument atlas: an evidence-backed graph of themes, claims, talks, and disagreements. `atlas.json` is the graph, `page.html` the composed shell, `index.html` the bundle. |
| `runs/` | One directory per wake: compiled topology, source snapshot, `vm.log.md`, receipts. |

An agent-facing index of every path — including the join keys between talks,
recordings and sessions, and what a fresh clone is missing — is [`MAP.md`](MAP.md).

## The DAG

Forme wires these by matching `### Requires` → `### Maintains`. Nothing is
internally autowired; there are no `system` kinds, only subscriptions and calls.

```
schedule-check  (gateway, external-driven — cron tick + manual kick)
      │  maintains: check_requests
      ▼
conference-schedule  (responsibility — the headline)
      │  maintains facets: event · venue · program · speakers · change_log · coverage
      │  calls: fetch-conference-pages → extract-conference-program
      │         → enrich-speaker-profiles → update-conference-truth
      ▼
schedule-brief  (responsibility — the human projection)
         maintains: brief (paths, section index, included sessions, headline changes)
         writes: brief/schedule.md, brief/changes.md

recording-inbox-watch  (gateway, every 15 min + manual kick)
      │  maintains: inbox_scans (folder fingerprint)
      ▼
recording-intake  (responsibility — recordings → talks)
      │  maintains facets: recordings · matches · talks · attachments
      │  requires: inbox_scans · program · speakers
      │  calls: scan-recording-inbox → identify-recording-talk
      │         → clean-talk-transcript → place-talk-attachments
      ▼
talks/<date>-<slug>/transcript.md + attachments/

talks/<date>-<slug>/links.md   (talk-links: people · companies · resources)
talks/<date>-<slug>/photos/    (talk-photos: filed by recording window)
```

The two pipelines are separate on purpose: the schedule is *declared*, the
recordings are *observed*, and neither can corrupt the other. `recording-intake`
reads the schedule truth as input, so a corrected room or speaker propagates into
the talks on the next render.

Why two responsibilities rather than one: the truth and its rendering have
different failure modes. A brief that fails to write must not cost you the
schedule state, and a byte-identical re-render must not look like a schedule
change. The brief subscribes to facets, so it wakes when the program moves — not
when a page was merely re-fetched.

## Keeping dossiers current after the talk

Conference material keeps appearing after the session ends: the official
recording is uploaded days later, the speaker posts a recap, the slides land, a
paper gets an arXiv id. `talk-links` therefore follows the event's lifecycle
rather than a fixed cron:

| Window (from `event.ends_on`) | Recheck |
| --- | --- |
| during the event and the first 72 hours | every 6 hours |
| 72 hours – 30 days | daily |
| 30 – 90 days | weekly |
| after 90 days | `settled` — no self-tick; a manual kick or a new talk still renders |

A recheck re-verifies the links it already has and spends at most two searches
per talk looking for material published *after* the talk. A recheck that finds
nothing new writes only immaterial fields (`last_checked`, `next_check`), so it
moves no fingerprint and wakes nothing downstream. A resource added by a later
recheck is labelled with how long after the talk it appeared. Each dossier's
lifecycle state lives in `state/world-model/talk-links/` (`freshness`).

Photos use the same idea, more briefly: the drop is scanned every 6 hours while
the event is live and for 7 days after, so a late export is still filed.

## Why it is cheap to run

- `content_hash` per source page is the first gate: unchanged page, nothing
  re-extracted.
- Every facet has a material/immaterial split, so `fetched_at`, page hashes, and
  cosmetic ordering never move a fingerprint.
- Speaker enrichment is budgeted (40 pages per render) and resumable through
  `coverage.enrichment.pending`.
- A tick that finds no material change writes an unmoved fingerprint: cost scales
  with surprise, not with the clock.

## Cadence

Six-hourly while the event is upcoming; hourly from 72 hours before the start
through 24 hours after the end; daily once the source goes archived. The rule
lives in `conference-schedule → ### Continuity`; the dates it reads live in the
world-model.

## Completeness is a claim you can audit

The schedule page usually states its own total ("120 sessions", for example). The contract
requires the parsed count to reconcile with that total and with the per-day
counts, and requires any unreadable region to be named in `coverage.gaps`. A
mismatch fails the render with `coverage-gap` rather than publishing a partial
schedule as if it were whole.

## Recordings → talks

The Bun side is deliberately dumb: `mise run sync` moves each Voice Memos
recording **inside the tracked conference's date window** into
`recordings/inbox/<date>_<time>_<title>/` with its audio, transcript, and
`meta.json`, and stops there. The window is the event's `starts_on`/`ends_on`
from the schedule truth, padded one day either side (override with
`--since/--until` or `RECORDINGS_SINCE`/`RECORDINGS_UNTIL`; `--all` exports the
whole library). It needs Full Disk Access.

Everything semantic is Prose: `recording-intake` identifies which session a
recording captured (quoting evidence from the transcript, never guessing),
renders a cleaned `talks/<date>-<slug>/transcript.md`, and files attachments
inline or listed. See [recordings/README.md](recordings/README.md).

## Ask the corpus

In a build, the rendered talks are queryable from the agent, without serve
running:

```text
/ask-talks    what did a talk say, who said it, which talk covered a topic
/talk-themes  the patterns across every talk
```

`/ask-talks` answers from `talks/*/transcript.md` and cites the talk and
timestamp; `/talk-themes` reads all of them and writes `analysis/themes.md`.

## Layout

```
src/                     contract source (responsibilities, gateway, functions, test)
scripts/                 TypeScript movers + the serve runtime (Bun)
fixtures/                a small schedule page used by the extraction test
prose.lock               dependency lockfile
package.json / tsconfig.json   Bun + TypeScript toolchain

# a build adds these; the template ignores them
recordings/              inbox: one folder per recording (audio, transcript, meta)
talks/                   rendered talks, one folder each
brief/                   rendered human artifacts
state/                   durable world-model + receipt ledger
analysis/  editorial/  notes/  explainers/<slug>/  atlases/<slug>/  magazine/<issue>/
dist/  deps/  runs/      generated — gitignored in both modes
```

## Tests

```bash
prose test src/test-extract-conference-program.prose.md
```

The test is offline: it extracts `fixtures/two-day-schedule.md` and asserts day
counts, offset-qualified times, room mapping, speaker linkage, side-event
handling, and the absence of invented abstracts or affiliations.

## Notes

- The URL is configuration, not source. A new conference is a new fork with a
  new `CONFERENCE_URL`; the contracts do not change.
- Archived conferences are still tracked: `event.status` becomes `archived`, the
  cadence drops to daily, and the brief labels itself an archived record.
- In a build, `state/` is committed on purpose: `git diff` between tracking runs
  is the audit trail of what the conference changed.
