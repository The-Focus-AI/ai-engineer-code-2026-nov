---
name: explainer
description: Build an interactive reader guide — an explainer website — for a talk, a topic, or a theme. Use when the user wants to understand a talk, asks for an explainer or reader guide, wants terms defined as they read, or wants follow-up questions answered from the corpus.
---

# Explainer

An explainer is a reading experience, not a summary. The reader should finish a
chapter able to say the argument back, with the jargon defined where they hit it.

The model composes the page inside [`design.md`](design.md). A fixed runtime
supplies the behavior: terms, chapter questions, the ask box. You design; you do
not write the interaction.

## 1. Frame

- **Subject**: one talk, a topic across talks, or a theme.
- **Reader**: what they already know, and what they want to be able to do after.
- **Promise**: one sentence the guide makes and keeps.

If the reader already knows the field, skip the primer and go to the argument.

## 2. Gather

| Subject | Read |
| --- | --- |
| talk | `talks/<slug>/transcript.md`, `links.md`, photos |
| topic | every transcript that makes the claim; dossiers for the links |
| theme | `analysis/themes.md` and the talks it cites |

Collect the verbatim quotes and timestamps you will cite before writing. General
knowledge is allowed only when marked `(background)`; the corpus is the source.

## 3. Outline

Four to eight chapters, each a **claim**, not a topic label ("The bottleneck
moved to verification", not "Verification"). Order by dependency: define what the
reader needs before the argument uses it.

## 4. Write `guide.md`

```md
---
title: "Verification, not capability"
kind: theme
subject: "why the 2026 talks stopped arguing about model quality"
audience: "engineers who use coding agents but have not run evals"
sources: [analysis/themes.md, talks/<slug>/transcript.md]
---

# <cover line>

<the promise, two or three sentences>

## <chapter claim>

<paragraphs. Mark a term on first use: [[context rot]]. Cite every factual
claim: ([The Model Ate the Coding Harness](../../talks/<slug>/transcript.md), 00:06:12)
```

Rules:

- One idea per paragraph; 40–90 words.
- Define a term the first time it appears with `[[term]]`; link it thereafter.
- Quote verbatim when the wording is the point; paraphrase otherwise.
- Name the talk and timestamp for every claim.
- Cut throat-clearing and "in today's fast-moving world".

## 5. Build `glossary.json`

10–25 terms, each one sentence of definition, one of why it matters here, and a
source:

```json
{
  "terms": {
    "context rot": {
      "definition": "The degradation of an agent's output as its context fills with stale turns.",
      "why": "It is the failure the harness and review talks are really about.",
      "source": "The Model Ate the Coding Harness, 00:06:40",
      "see": ["harness", "compaction"]
    }
  }
}
```

Every `[[term]]` in the guide must exist here. Definitions come from the corpus;
a general-knowledge definition is marked `(background)` in its `why`.

## 6. Build `questions.json`

Two to four questions per chapter — the ones a reader actually asks, not
rhetorical ones. Answer from the corpus with citations; mark inference:

```json
{
  "questions": [
    {
      "section": "the-bottleneck-moved",
      "q": "Why is verification harder than generation?",
      "a": "Because generation is now cheap and parallel, while checking each result still costs a human or a second system...",
      "cites": ["Who verifies the software factory?, 00:03:39"]
    }
  ]
}
```

`section` is the slug of the `##` heading.

## 7. Compose `page.html`

Render the HTML yourself, inside [`design.md`](design.md). The page must
contain:

- `<main id="reader-doc">` around the guide;
- `<aside id="reader-panel" aria-label="Reader guide"></aside>` where the panel
  belongs;
- one `<section data-chapter="slug" data-title="Claim">` per chapter;
- `<button class="term" data-term="context rot">context rot</button>` on a term's
  first use;
- citations as `../../talks/<slug>/transcript.md`;
- three placeholders: `<!--READER_STYLE-->` in `<head>`, and
  `<!--READER_DATA-->` plus `<!--READER_RUNTIME-->` at the end of `<body>`.

Compose freely: layout, type, images, pull quotes, section rhythm. **Do not write
panel JavaScript or attach handlers to terms** — the runtime owns that.

## 8. Bundle

```bash
bun scripts/bundle-explainer.ts explainers/<slug>/page.html
```

Injects the glossary and questions as JSON, copies `runtime/reader.js` and
`runtime/reader.css`, and writes `index.html`.

## 9. Validate

```bash
bun scripts/validate-explainer.ts explainers/<slug>/index.html
```

Fails on a missing shell, a `data-term` with no glossary entry, a citation link
that does not resolve, a missing image, an external script, or an inline handler.
Fix the page and re-bundle until it passes.

## 10. Serve

```bash
bun scripts/explainer-server.ts --root . --dir explainers/<slug>
```

Open the printed URL; it redirects to `/explainers/<slug>/`. The ask box posts
the section in view to `/ask`, which runs the configured agent.

## Verify

- The validator passes; every citation names a talk that exists.
- Every `[[term]]` resolves; unused glossary entries are pruned or marked draft.
- Chapter 1 is followable by someone who knows nothing about the subject.
- Served: a follow-up question returns a cited answer. As a file: the ask box
  copies a prompt rather than doing nothing.

## Output

```
explainers/<slug>/
  guide.md          the reading document
  glossary.json     terms, definitions, sources
  questions.json    chapter questions and answers
  page.html         the composed page (the model's design)
  runtime/          fixed reader.js + reader.css, copied by the bundle
  assets/           photos copied from talks/<slug>/photos/
  index.html        bundled; re-bundle after every edit
```

Done when the validator passes, the guide reads in one sitting, the panel defines
every marked term, the suggested questions answer without the transcripts, and
the live ask returns something the reader could not have guessed without the
corpus.
