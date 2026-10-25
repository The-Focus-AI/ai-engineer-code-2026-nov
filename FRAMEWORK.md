# The conference framework

One build directory = one repo = one conference. The Prose program already keeps
the **truth** current
— the schedule, the talks, the dossiers, the photos. This is the layer above it:
capture what happens while you are there, turn it into evidence-backed hooks, and
ship artifacts from them.

```
capture ──► atoms ──► themes ──► hooks ──► artifacts ──► share
   │                    │          │           │
   └──────────────► backlog ◄──────┴───────────┘
                  review / digest / ideas
```

## Stages

| Stage | What it is | Where it lives | How it runs |
| --- | --- | --- | --- |
| **capture** | notes, questions, links, photos, recordings taken during the event | `notes/inbox/`, `photos/`, `recordings/inbox/` | `capture-note`, `/conference-capture`, `mise run sync`, `mise run photos` |
| **atoms** | one claim per line: quote, speaker, talk, timestamp, topic | `state/world-model/talk-insights/` | `talk-insights` |
| **themes** | claims several talks make in different words | `analysis/themes.md` (report) | `conference-themes`, `/conference-themes` |
| **hooks** | the editorial shortlist: novel, contrarian, data, practical, tutorial | `editorial/hooks/` + `editorial/backlog.md` | `/conference-hooks` |
| **artifacts** | a magazine issue, a newsletter, a thread, a talk outline | `magazine/<issue>/` | `/conference-magazine` |
| **backlog** | what to review and what to digest after the event | `editorial/backlog.md` | `append-backlog`, `/conference-backlog` |

Skills are the interaction layer. When a stage needs to stay fresh on its own,
wake on its own inputs, or be subscribed to, it graduates to a
`kind: responsibility` under `src/`, the way `talk-links` graduated from
research-only to a node with a settling cadence. Atoms and themes have made that
move. Hooks have not.

## Where skills and contracts meet

A skill composes an artifact, and a contract can consume it. That works in both
directions:

- **skill → prose.** The artifact enters as a declared input: a `### Parameters`
  value for a function, or a `### Requires` facet satisfied by the node that
  observed it. Something has to fingerprint it, which is why an artifact used as
  input carries a structured sidecar (`atlas.json`, `glossary.json`,
  `questions.json`, frontmatter) or gets hashed by an observing node the way
  `recording-inbox-watch` hashes the drop folder.
- **prose → skill.** A responsibility publishes structured truth; the skill reads
  it and selects from it. `/conference-hooks` reads `analysis/themes.md` (or the
  `themes` facet once it subscribes), and `/conference-themes` reads the claim
  atoms.

What does not work is free-form prose treated as a subscribed truth. A rendered
`page.html` or a written `themes.md` is a projection. A contract may read it, but
the contract publishes its own structured world-model for anything downstream.
Otherwise a re-render that changed no fact would wake every subscriber.

## Capture

A note is a file, not a chat message:

```
notes/inbox/2026-10-14T1132-demo-caveat.md
---
captured_at: 2026-10-14T11:32:00-04:00
kind: observation
session_id: null            # set when the time or title matches a session
talk: 2026-10-13-the-demo
tags: []
---
The demo ran on the vendor's laptops, not the venue network.
```

- `capture-note` classifies, timestamps in the event timezone, links the session
  when it can, and writes the file. It never invents a link. `/conference-capture`
  is the same work, run interactively.
- `kind: todo` also lands in `editorial/backlog.md`, under **Review later** or
  **Digest later**, through `append-backlog`.
- Photos and recordings already land through the movers; a note can reference
  them by path.

## Research traces

A question you ask during the event is itself material. `/talk-ask` and
`/conference-themes` write their answer to `notes/research/<date>-<slug>.md` when
you say keep it: the question, the answer, the talks and timestamps it used. That is
what `/conference-hooks` mines when the raw transcript is too much.

## Hooks carry their evidence

A hook is one sentence you would say to a colleague who was not there. Every hook
carries its evidence; a hook without a quote, a talk, and a timestamp is not a
hook, it is an opinion.

```
editorial/hooks/2026-10-23-verification.md
## Hook
The conference agreed that verification, not capability, is the bottleneck.
- kind: novel
- evidence: "<a verbatim quote, 30 words or fewer>" — <talk title>, 00:17:33
- also: <other talks that make the same argument>
- angle: a 1,200-word essay; the talks as the evidence
- assets: talks/<date>-<slug>/photos/, links.md
- status: draft
```

Hook kinds: `novel`, `contrarian`, `data`, `practical`, `tutorial`, `quote`.

## Artifacts

A **magazine issue** opens on day one and grows with the conference. It is a
presentation of the presentations: a cover, an opening essay, features added as
talks land, and a closing review/digest page written when the issue freezes. A
feature carries a headline, a standfirst, two or three cited quotes, a photo from
the talk, links that go deeper, and a "why it matters". `issue.md` is the source;
`issue.html` is re-rendered from it after every change by
`scripts/render-issue.ts`. State is `growing` or `frozen`.

A **talk story** turns one transcript into a reading experience: `story.md` is
the reader's cut (chapters, key points, pull quotes), and
`talks/<slug>/experience/` is the scrollytelling page with a visual rail. The raw
transcript is never edited. The pipeline is `conference-next` → `talk-polish` →
`talk-page` → through-line `atlas`. See [`TALKS.md`](TALKS.md).

An **explainer site** is a reader guide for one talk, topic, or theme: chapters,
a side panel that defines a `[[term]]` where the reader meets it, the chapter's
suggested questions, and a live ask box backed by the agent. The model composes
`page.html` inside [`design.md`](design.md); `bundle-explainer.ts` injects the
fixed runtime and data; `validate-explainer.ts` gates it; `explainer-server.ts`
answers follow-ups on loopback. One runtime, many designs.

An **argument atlas** maps a theme across talks: nodes for themes, clusters,
claims, talks, and questions; edges for supports, instantiates, contests,
refines, and asks. Every claim carries a verbatim quote and timestamp. The model
composes `page.html` inside [`design.md`](design.md); `bundle-atlas.ts` injects
the graph and links the fixed runtime; `validate-atlas.ts` checks the evidence
and the graph.

A **social draft** is the same hook at a different length: a thread, a LinkedIn
post, a newsletter section. Drafts, never auto-posted; each carries its citation.

## The backlog

One file, three lists, every item sourced:

```md
## Ideas
- [ ] The verification bottleneck — editorial/hooks/2026-10-23-verification.md
## Review later
- [ ] Re-watch the demo — the behavior spec, not the slides
## Digest later
- [ ] Read the paper before writing the harness piece
```

`/conference-backlog` adds, triages, and closes items. Statuses: `open`, `doing`,
`done`, `dropped`. An item without a source and a reason is noise.

## A conference, end to end

1. From the master, run the `conference-init` skill. It clones to a new sibling
   directory, removes the template's conference fence, creates a separate repo,
   and sets `CONFERENCE_URL`. Open a new session in that directory.
2. In that session: `prose compile`, promote, `prose serve` in the coding agent.
3. Continuously, during: `mise run sync`, `mise run photos`,
   `/conference-capture` for what the mics miss, `/talk-ask` and
   `/conference-themes` for questions, `/conference-hooks` after a talk that
   earns one, `/conference-magazine` to open the issue and append features.
4. End of each day: `/conference-backlog` triage, then re-render the open issue.
5. End of the event: freeze the issue, write its closing page, then channel
   drafts.
6. The settling cadence keeps dossiers current for 90 days; the backlog is what
   you owe the conference after that.

## Build order

| Slice | State |
| --- | --- |
| capture + notes + backlog file + `/conference-capture` | built |
| `/conference-hooks` and the hook schema | built |
| `/conference-backlog` triage | built |
| `/conference-magazine` — opens, grows, freezes; `render-issue.ts` re-renders | built |
| `/conference-explainer` — LLM composes against `design.md`; bundle, validate, live ask | built |
| atoms as a responsibility — [`src/talk-insights.prose.md`](src/talk-insights.prose.md) | built |
| capture as a function — [`src/capture-note.prose.md`](src/capture-note.prose.md) | built |
| backlog appends as a function — [`src/append-backlog.prose.md`](src/append-backlog.prose.md) | built |
| themes as a node over the atoms — [`src/conference-themes.prose.md`](src/conference-themes.prose.md) | built |
| hooks as a node over the atoms | next |
| `/social` channel drafts | next |
| template hardening: config file, fixture conference, tests | later |
