# Explainers

An interactive reader guide for a talk, a topic, or a theme: chapters in plain
language, terms defined in a side panel as you meet them, and follow-up questions
answered from the recorded talks.

```
explainers/<slug>/
  guide.md          the reading document, with [[term]] markup and citations
  glossary.json     terms, definitions, why, source
  questions.json    the questions each chapter invites
  assets/           photos copied from talks/<slug>/photos/
  page.html         the composed page (layout and type, no behavior)
  runtime/          fixed reader.js + reader.css, copied by the bundle
  index.html        bundled; re-bundle after every edit
```

Build one with `/conference-explainer`. The model composes `page.html` against
[`design.md`](../design.md); the bundle injects the fixed runtime and data:

```bash
bun scripts/bundle-explainer.ts explainers/<slug>/page.html
bun scripts/validate-explainer.ts explainers/<slug>/index.html
bun scripts/explainer-server.ts --root . --dir explainers/<slug> --agent "claude -p"
```

Open the served URL. Click a dotted term for its definition; the panel follows the
section you are reading and offers that section's questions. The ask box sends a
question to the agent with the section in view. Opened as a file, the same box
copies a ready-made prompt instead.
