# Talk stories and through-lines

The transcript is evidence, not an experience. A folder of ASR text with
`### HH:MM:SS` headings is the record of what was said; it is not what a reader
should meet first. This is the layer between the two.

```
next → polish-talk → talk → through-line atlas
```

The atlas is built **on top of** talk stories, not instead of them. A through-line
without talk pages is a graph of claims nobody has read.

## The artifacts

| Artifact | Path | What it is |
| --- | --- | --- |
| Transcript | `talks/<slug>/transcript.md` | The raw evidence. Never edited. |
| Dossier | `talks/<slug>/links.md` | Speakers, company, video and resources. |
| Story | `talks/<slug>/story.md` | The reader's cut: chapters, key points, pull quotes, visual cues. Derived and cited, not evidence. |
| Talk page | `talks/<slug>/experience/` | The scrollytelling page: visual rail left, story right. |
| Through-line atlas | `atlases/<slug>/` | A story across talks. The visual is the stack, not a node graph. |

The story is **editorial**. It may compress, reorder, and paraphrase, but every
claim points back to the transcript. Quotes stay verbatim. The transcript stays
the source of truth.

## The talk page

Maggie Appleton's `planning-agents` page is the right reference for the *shape*:
a sticky visual left, scrolling text right, one visual per beat. The difference
is that the visual is not a baked slide; it is the smallest thing that makes the
claim legible.

```
┌──────────────────────┬────────────────────────────────────┐
│  visual rail         │  chapter 01                        │
│  (sticky)            │  claim headline                    │
│                      │  two or three paragraphs           │
│  [photo / slide]     │  key points                        │
│  [quote card]        │  pull quote + timestamp            │
│  [diagram]           │                                    │
│  [video still]       │  chapter 02 …                      │
└──────────────────────┴────────────────────────────────────┘
```

- **Desktop:** rail ~42%, text ~58%, rail sticky. A **Hide visuals** control
  collapses the rail and centres the text.
- **Mobile:** the rail becomes a card at the **top** of the page (or a horizontal
  strip), then the story follows. It never floats over the text.
- **Print:** rail hidden; each chapter's visual is printed above its text.

### Visual card types

| Type | Use when | Avoid |
| --- | --- | --- |
| `photo` | A filed photo shows the speaker, a slide, or the room | Decorative crowd shots |
| `slide` | The talk published slides or a still from the video | Blurry screenshots |
| `quote` | The wording is the point | Long block quotes |
| `diagram` | The talk describes a mechanism, loop, stack, or split | Diagrams with more than 7 nodes |
| `video` | There is a recording link and a timestamp worth watching | Autoplaying video |
| `code` | The talk shows a CLI, schema, or proof | Decorative terminal screenshots |

The rail is a stack of cards, not a carousel. One card is active at a time; the
previous cards recede to a thin spine. The reader always knows which beat they
are on.

### What the visual is for

The visual should answer a question the paragraph raises:

- **Beyond Done:** the verification loop, the missing half, the script.
- **Who verifies:** the three layers, the two kinds of gate.
- **The Machine:** the confidence product, the compounding error curve.
- **Process Supervision:** the trajectory and the behavior rubric.
- **Anthropic:** the five-layer agent foundation.
- **Balancing:** the approval queue and the classifier routing.

If no artifact exists, draw the mechanism as a small SVG. Do not use a stock
image or a generic AI illustration.

## The through-line atlas

A through-line atlas is a story about several talks. The visual is **the stack**:

```
ORGANIZATION   who owns the loop, who signs off
EVIDENCE       receipts, traces, evals
VERIFICATION   scripts, judges, review agents
HARNESS        tools, sandbox, context
MODEL          capability, cost, latency
```

Each talk is a chip on the layer it actually addresses. As the reader scrolls a
chapter, the active layer lifts, the relevant chips light up, and a quote card
shows the evidence. The reader sees the conference's argument as a movement up
the stack, not a hairball of edges.

The graph atlas is a **map** prototype. It is useful for seeing which claims
connect; it is not the through-line. Do not build a through-line atlas until at
least three talks have an `experience/` page.

## The pipeline

### 1. `next`

Scans the build and recommends:

- the talks with the strongest combination of theme centrality, video, and photos
  that do not yet have a story;
- themes with enough talk stories to support a through-line;
- gaps: no video, no photos, thin transcripts, missing dossiers.

Run `bun scripts/next-work.ts` (or `/next`). It writes nothing by default; add
`--write` to save `editorial/next.md`.

### 2. `polish-talk`

Turns `transcript.md` into `story.md`:

- reads the whole transcript, the dossier, and any photos;
- proposes a thesis and five key points with timestamps;
- asks the reader which three matter;
- writes 4–8 chapters, each with a claim headline, 2–4 paragraphs, key points,
  one or two verbatim quotes, and a visual cue;
- leaves the transcript untouched.

### 3. `talk`

Builds `talks/<slug>/experience/page.html` from the story:

- asks who the reader is and what they should leave with;
- proposes the chapter order and the visual card for each chapter;
- composes the page inside `design.md`;
- links the fixed runtime, validates citations, serves it.

### 4. Through-line atlas

After three or more talk pages exist, `/atlas` builds the stack visual and the
cross-talk essay. The atlas links to the talk pages for the full story.

## Skills

| Skill | Use |
| --- | --- |
| `/next` | What should I work on next? |
| `/polish-talk` | Turn a transcript into a readable story. |
| `/talk` | Design and build the talk experience. |
| `/atlas` | Build the through-line once the talk pages exist. |
