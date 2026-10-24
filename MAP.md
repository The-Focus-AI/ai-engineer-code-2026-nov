# Finding things

The agent's index to a **conference build**. Paths are from the repo root. The
product story is [README.md](README.md); this is where the bytes actually sit.

> **Template or build.** The upstream template tracks `src/`, `scripts/`,
> `.agents/skills/`, `fixtures/`, `design.md`, and the READMEs. It has no
> conference data. `brief/`, `state/`, `talks/`, `recordings/inbox/`, `photos/`,
> `analysis/`, `notes/inbox/`, `notes/research/`, `editorial/backlog.md`,
> `editorial/hooks/`, `explainers/<slug>/`, `atlases/<slug>/`, and `magazine/<issue>/` are ignored
> by the “conference build data” block in `.gitignore`. A build deletes that
> block; see `.agents/skills/conference-init/SKILL.md`.

## Two sources, two places

| Source | Lands in |
| --- | --- |
| **Declared** — the conference page, fetched and extracted by `prose serve` | `state/world-model/conference-schedule/published/` |
| **Observed** — Voice Memos, moved by `mise run sync`, identified by `recording-intake` | `recordings/inbox/` → `talks/<date>-<slug>/` |

## Schedule truth

Base: `state/world-model/conference-schedule/published/`.

| You want | Read |
| --- | --- |
| all sessions: title, abstract, room, track, speakers, start/end | `program/sessions.json` |
| the same, readable | `program/program.md` · `brief/schedule.md` |
| event name, dates, timezone, status | `event/event.json` |
| rooms and venue | `venue/venue.json` · `venue/venue.md` |
| speakers, affiliations, bios, links | `speakers/speakers.json` · `speakers/speakers.md` |
| what the source page did not publish | `coverage/coverage.md` |
| what changed since tracking began | `change-log/change_log.md` · `brief/changes.md` |

`brief/schedule.md` is the human brief: every session, with abstracts where the
page published one.

## The talks

A build renders the sessions it recorded; the template has none. A talk is one
folder:

| File | What it is |
| --- | --- |
| `talks/<YYYY-MM-DD>-<slug>/transcript.md` | The cleaned transcript. Frontmatter: `title`, `speakers` (name + affiliation), `room`, `starts_at`, `ends_at`, `format`, `recording`, `duration`. Body: `### HH:MM:SS — Section` headings over ASR text. |
| `talks/<YYYY-MM-DD>-<slug>/links.md` | The dossier: speakers, company, verified resources, gaps. |
| `talks/<YYYY-MM-DD>-<slug>/photos/` | Photos filed to the talk. Local only, not committed. |
| `talks/<YYYY-MM-DD>-<slug>/story.md` | The reader's cut: chapters, key points, quotes, visual cues. Derived, cited, not evidence. |
| `talks/<YYYY-MM-DD>-<slug>/experience/` | The talk page: sticky visual rail and story. |

`ls talks/` is the recorded corpus. `brief/schedule.md` is everything else.

## Recordings

`recordings/inbox/<date>_<time>_<label>/` holds `transcript.txt`,
`transcript.words.json`, `meta.json`, and `attachments/`. `audio.m4a` is local
only. The label is the Voice Memos name, not the talk slug.

## Dossiers and photos as state

| Path | What it is |
| --- | --- |
| `state/world-model/talk-links/published/world-model.json` | People, companies, resources, freshness, keyed by `session_id`. |
| `state/world-model/talk-photos/published/world-model.json` | Photo placements. |
| `photos/manifest.json` | The raw photo inventory with UTC capture times. |

## Serve evidence

`runs/<YYYYMMDD>-<HHMMSS>-<rand6>/` holds the activation, the compiled intent,
and `vm.log.md` for one wake. `runs/serve/` holds the trigger plan, the spool,
`policy.json`, and `serve.log.md`. Both are generated and gitignored.

## Joining the pieces

Slugs collide across parallel tracks; join on `recording` or on `title` +
`starts_at`.

- **Talk → session:** `recording` from the transcript frontmatter →
  `state/world-model/recording-intake/published/world-model.json` →
  `matches[<label>].session_id`. The match carries `confidence` and `evidence`.
- **Talk → session (no recording index):** `title` + `starts_at` in
  `program/sessions.json`, with YAML quotes and smart punctuation normalised.
- **Talk → words:** `transcript.md`; the `### HH:MM:SS` heading is the citation.

## Template and build

The template tracks `src/`, `scripts/`, `.agents/skills/`, `fixtures/`,
`design.md`, and the READMEs. It has no conference data.

A build is a **separate clone** in its own directory and repo. It has run
`conference-init`, removed the ignore block, and tracks its own:

- `state/` — the world-model, receipts, and published facets
- `brief/` — the schedule and changelog
- `talks/` — transcripts and dossiers
- `recordings/inbox/` — transcripts and `meta.json` (no audio)
- `analysis/themes.md`, `editorial/backlog.md`, `explainers/<slug>/`,
  `magazine/<issue>/`

Missing in both, and how it comes back:

| Missing | Comes back from |
| --- | --- |
| `node_modules/` | `bun install` |
| `.env` | `cp .env.example .env`, set `CONFERENCE_URL` |
| `dist/` | `prose compile`, then promote `manifest.next.json` → `manifest.active.json` |
| `runs/` | the first serve wake |
| `state/`, `brief/` | `conference-init` in a new directory, then the schedule render |
| `talks/` | `recording-intake` after `mise run sync` |
| `talks/*/photos/`, `photos/event/` | `mise run photos` over the local drop; filed copies stay local |
| `recordings/**/*.m4a` | `mise run sync` (needs Full Disk Access) |

A built clone answers questions about the talks and the schedule with nothing
running. Only new observations need serve. The template has no talks to ask
about until it builds.

## Ask the corpus

A build's transcripts are the corpus. Search the headings and body, then read the
sections that hit. Word counts are build-specific.

- `/talk-ask` — what a talk said, who said it, which talk covered a topic.
- `/conference-themes` — the patterns across every talk; the first report is
  `analysis/themes.md`.

## Notes and editorial

| Path | What it is |
| --- | --- |
| `notes/inbox/` | one file per `/conference-capture` — observation, question, link, quote, todo |
| `notes/research/` | a `/talk-ask` or `/conference-themes` answer kept on purpose |
| `editorial/backlog.md` | ideas to write, things to review, things to digest |
| `editorial/hooks/` | evidence-backed bullets, one file per synthesis |
| `magazine/<issue>/` | `issue.md`, `issue.html`, and the photos used |

[`FRAMEWORK.md`](FRAMEWORK.md) is the pipeline that connects them.

## Explainers

A build's `explainers/<slug>/` holds `guide.md`, `glossary.json`,
`questions.json`, `page.html` (the composed design), `runtime/`, `assets/`, and
the bundled `index.html`. The design language is [`design.md`](design.md).
`page.html` is the source; bundle it with `scripts/bundle-explainer.ts`, validate
with `scripts/validate-explainer.ts`, then serve. See [`FRAMEWORK.md`](FRAMEWORK.md).

## Atlases

A build's `atlases/<slug>/` holds `atlas.json` (nodes, edges, evidence),
`page.html` (the composed shell), and the bundled `index.html`. The fixed
runtime is `atlases/runtime/`. Bundle with `scripts/bundle-atlas.ts`, validate
with `scripts/validate-atlas.ts`, then serve like an explainer. The validator
requires a verbatim quote and a real section heading for every claim.
