# The conference framework

One clone = one conference. The Prose program already keeps the **truth** current
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
| **capture** | notes, questions, links, photos, recordings taken during the event | `notes/inbox/`, `photos/`, `recordings/inbox/` | `/capture`, `mise run sync`, `mise run photos` |
| **atoms** | one claim per line: quote, speaker, talk, timestamp, topic | derived on demand from `talks/` | `/ask-talks`, `/talk-themes` |
| **themes** | claims several talks make in different words | `analysis/themes.md` (report) | `/talk-themes` |
| **hooks** | the editorial shortlist: novel, contrarian, data, practical, tutorial | `editorial/hooks/` + `editorial/backlog.md` | `/hooks` |
| **artifacts** | a magazine issue, a newsletter, a thread, a talk outline | `magazine/<issue>/` | `/magazine` |
| **backlog** | what to review and what to digest after the event | `editorial/backlog.md` | `/backlog` |

Skills are the interaction layer. When a stage needs to stay fresh on its own,
wake on its own inputs, or be subscribed to, it graduates to a
`kind: responsibility` under `src/` — the way `talk-links` graduated from
research-only to a node with a settling cadence.

## Capture

A note is a file, not a chat message:

```
notes/inbox/2026-10-14T1132-fable-war-room.md
---
captured_at: 2026-10-14T11:32:00-04:00
kind: observation | question | link | quote | todo
session_id: null            # set when the time or title matches a session
talk: 2026-10-13-inside-the-fable-war-room
tags: [verification, geico]
---
The war-room demo ran on the vendor's laptops, not the venue network.
```

- `/capture` classifies, timestamps in the event timezone, links the session when
  it can, and writes the file. It never invents a link.
- `kind: todo` also lands in `editorial/backlog.md`, under **Review later** or
  **Digest later**.
- Photos and recordings already land through the movers; a note can reference
  them by path.

## Research traces

A question you ask during the event is itself material. `/ask-talks` and
`/talk-themes` write their answer to `notes/research/<date>-<slug>.md` when you
say keep it: the question, the answer, the talks and timestamps it used. That is
what `/hooks` mines when the raw transcript is too much.

## Hooks — the bullet points

A hook is one sentence you would say to a colleague who was not there. Every hook
carries its evidence; a hook without a quote, a talk, and a timestamp is not a
hook, it is an opinion.

```
editorial/hooks/2026-10-23-verification.md
## Hook
The conference quietly agreed that verification, not capability, is the bottleneck.
- kind: novel
- evidence: "Writing code is the fastest part and the slowest part is verifying it." — Who verifies the software factory?, 00:17:33
- also: Two Sigma, Greptile, Basis, Anthropic
- angle: a 1,200-word essay; the talks as the evidence
- assets: talks/2026-10-14-who-verifies-the-software-factory/photos/, links.md
- status: selected
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
- [ ] Verification is the bottleneck — hooks/2026-10-23-verification.md
## Review later
- [ ] Re-watch the Basis demo — the behavior-spec example, not the slides
## Digest later
- [ ] Read the HarnessTax paper before writing the harness piece
```

`/backlog` adds, triages, and closes items. Statuses: `open`, `doing`, `done`,
`dropped`. An item without a source and a reason is noise.

## A conference, end to end

1. Fork or clone the template, then run the `new-conference` skill. It removes
   the template's conference fence, sets `CONFERENCE_URL`, dates, timezone, and
   social handles.
2. `prose compile`, promote, `prose serve` in the coding agent.
3. Continuously, during: `mise run sync`, `mise run photos`, `/capture` for what
   the mics miss, `/ask-talks` and `/talk-themes` for questions, `/hooks` after a
   talk that earns one, `/magazine` to open the issue and append features.
4. End of each day: `/backlog` triage, then re-render the open issue.
5. End of the event: freeze the issue, write its closing page, then channel
   drafts.
6. The settling cadence keeps dossiers current for 90 days; the backlog is what
   you owe the conference after that.

## Build order

| Slice | State |
| --- | --- |
| capture + notes + backlog file + `/capture` | built |
| `/hooks` and the hook schema | built |
| `/backlog` triage | built |
| `/magazine` — opens, grows, freezes; `render-issue.ts` re-renders | built |
| `/explainer` — LLM composes against `design.md`; bundle, validate, live ask | built |
| `/social` channel drafts | next |
| atoms as a responsibility (`talk-insights`) | next |
| template hardening: config file, fixture conference, tests | later |
