---
name: atlas
description: Build an argument atlas — an evidence-backed graph of themes, claims, talks, questions, and disagreements — as an interactive page. Use when the user wants a map, diagram, constellation, or non-linear alternative to a magazine or explainer.
---

# Argument atlas

An atlas is a **map of the argument**, not a summary of it. Nodes are themes,
claims, talks, and questions. Edges are supports, instantiates, contests,
refines, and asks. Every claim carries a verbatim quote and a talk timestamp.
The reader can follow a guided scroll, explore the graph, or build a reading
path.

## 1. Frame

- **Subject**: one theme across several talks, or a whole conference.
- **Reader**: someone who wants the shape of the disagreement, not one talk.
- **Promise**: one sentence the atlas makes and keeps.

If the graph does not change what the reader believes, it is decoration.

## 2. Gather

| Subject | Read |
| --- | --- |
| theme | `analysis/themes.md`, every transcript it cites |
| talk | `talks/<slug>/transcript.md`, `links.md` |
| contest | the “What is contested” table in `analysis/themes.md` |

Collect exact quotes and timestamps before drawing. A claim without evidence is
not a node.

## 3. Model `atlas.json`

```json
{
  "title": "Verification, not capability",
  "subject": "what makes agent work trustworthy",
  "theme": "theme:verification",
  "nodes": [
    { "id": "theme:verification", "type": "theme", "label": "Verification,\nnot capability", "summary": "…", "x": 500, "y": 420 },
    { "id": "cluster:check", "type": "cluster", "label": "The check", "summary": "…", "x": 500, "y": 245 },
    { "id": "claim:script", "type": "claim", "label": "Script, not prose", "summary": "…", "x": 450, "y": 125,
      "evidence": [{ "quote": "…", "cite": "Beyond “Done”, 00:16:07", "href": "../../talks/2026-10-12-beyond-done/transcript.md" }] },
    { "id": "talk:beyond-done", "type": "talk", "label": "Beyond Done", "speakers": "Nick Nisi, Zack Proser", "href": "../../talks/2026-10-12-beyond-done/transcript.md", "x": 200, "y": 90 },
    { "id": "question:last-verifier", "type": "question", "label": "Who is the last verifier?", "summary": "…", "x": 860, "y": 170 }
  ],
  "edges": [
    { "from": "talk:beyond-done", "to": "claim:script", "kind": "supports" },
    { "from": "claim:script", "to": "cluster:check", "kind": "instantiates" },
    { "from": "cluster:check", "to": "theme:verification", "kind": "instantiates" },
    { "from": "question:last-verifier", "to": "claim:gate", "kind": "asks" },
    { "from": "claim:gate", "to": "claim:classifier", "kind": "contests" }
  ]
}
```

Rules:

- `type`: `theme` (one), `cluster`, `claim`, `talk`, `question`.
- Every claim has at least one `evidence` entry with `quote`, `cite`, `href`.
- Every talk has an `href` to its transcript.
- Coordinates are in a 1000 × 840 viewBox. Place talks outside the claim ring,
  clusters around the theme, claims around their cluster, questions near the
  dispute they name.
- `labelPos`: `above` (default for claims), `below`, `left`, `right` (default
  for talks). Use it to keep labels off edges.
- Edge kinds: `supports`, `instantiates`, `contests`, `refines`, `asks`.
- A contest is a real disagreement, not a nuance. If both sides agree on the
  machinery, put the split on the question node.

## 4. Compose `page.html`

Read [`design.md`](../../design.md). The page is yours; the runtime is fixed.

Required shell:

- `<svg id="atlas-graph">` for the canvas;
- `<div id="atlas-detail">` for evidence;
- `#atlas-path-list`, `#atlas-path-empty`, `#atlas-copy-path`,
  `#atlas-clear-path` for the path builder;
- `[data-filter]` buttons: `all`, `claims`, `talks`, `contested`;
- `[data-zoom]` buttons: `in`, `out`, `reset`;
- scroll steps as `<section data-focus="id,id" data-caption="…">`;
- three placeholders: `<!--ATLAS_STYLE-->`, `<!--ATLAS_DATA-->`,
  `<!--ATLAS_RUNTIME-->`.

Do not write graph JavaScript. The runtime owns selection, highlighting, zoom,
filters, the path, and the URL hash.

## 5. Bundle and validate

```bash
bun scripts/bundle-atlas.ts atlases/<slug>/page.html
bun scripts/validate-atlas.ts atlases/<slug>/index.html
```

The validator checks node/edge shape, one theme, orphan nodes, connectivity,
talk hrefs, evidence shape, section headings, and **verbatim quotes**. Fix the
graph, re-bundle, repeat.

## 6. Serve

```bash
bun scripts/explainer-server.ts --root . --dir atlases/<slug>
```

Open the printed URL. The ask box is optional; the atlas should answer by
structure and evidence, not chat.

## Verify

- Every claim has a quote that appears verbatim in its transcript.
- Every talk is connected and every claim reaches the theme.
- The contested edges are the ones a reader would argue about.
- At 380px the labels do not collide and the detail panel is reachable.
- Print preview shows the whole graph and the evidence path.
- The reading path exports useful markdown.

## Output

```
atlases/<slug>/
  atlas.json     nodes, edges, evidence
  page.html      composed shell and argument steps
  index.html     bundled
```

The fixed runtime lives at `atlases/runtime/`.

## Through-line mode (target)

The node graph is a **map prototype**. A through-line atlas is a scrollytelling
story built on top of talk stories: the left is **the stack** (model → harness →
verification → evidence → organization), talks are chips on the layer they
address, and each chapter lifts a layer and shows the evidence. See
[`TALKS.md`](../../../TALKS.md).

Do not build a through-line atlas until at least three talks have
`talks/<slug>/experience/` pages. The graph can stay as a map mode; it is not
the through-line.
