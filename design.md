# Design language

Two artifacts share this: **explainer sites** and the **magazine**. One visual
language, two layouts. The model composes the page; this file is the contract it
composes within. The interaction runtime is fixed — style it, don't rewrite it.

## Intent

A reading surface, not a dashboard. Warm paper, dark ink, one accent. Type does
the work; chrome stays out of the way. It should look good printed.

## Tokens

```css
:root {
  --ink: #191714;
  --paper: #fbf8f1;
  --panel: #f2ecdf;
  --muted: #6d6458;
  --rule: #d6cbb8;
  --accent: #8a2f1d;
  --measure: 46rem;
  --panel-w: 24rem;
}
```

- Body: a serif with a book feel — Iowan Old Style, Palatino, Georgia.
- Labels: system sans, uppercase, tracked `.12em`, `.78rem`.
- Scale: h1 `clamp(2.4rem, 6vw, 4.4rem)`, h2 `1.9rem`, h3 `1.2rem`,
  body `1.12rem / 1.6`, small `.85rem`.
- Space: 4px base; sections `3.2rem`, paragraphs `1.1rem`.
- No web fonts, no external assets, no icon fonts. Inline SVG if a mark is
  needed.

## Layouts

**Explainer** — masthead (kicker, h1, promise, meta), then a grid:
`minmax(0, var(--measure))` and `var(--panel-w)`, gap `3rem`. The panel is
sticky. Under 980px it becomes a block below the article.

**Magazine** — cover filling the viewport; features as full pages; two columns
only on wide screens and never in print.

**Print** — `@page { margin: 18mm 16mm }`, paper white, `h2 { break-before:
page }`, figures and quotes `break-inside: avoid`, the panel hidden, links
inherit the ink color.

## Components

| Component | Markup | Notes |
| --- | --- | --- |
| Chapter | `<section data-chapter="slug" data-title="Claim">` or `<h2 id="slug">` | the runtime follows these |
| Term | `<button class="term" data-term="context rot">context rot</button>` | dotted underline, accent; the runtime binds it |
| Quote | `<blockquote>` | accent left rule, italic, `1.2rem` |
| Figure | `<figure><img src="assets/x.jpg" alt=""><figcaption>…</figcaption></figure>` | caption is a sentence, not a label |
| Callout | `<aside class="callout">` | one per chapter at most |
| Panel | `<aside id="reader-panel" aria-label="Reader guide"></aside>` | the runtime fills it |
| Question | rendered by the runtime as `.rg-question` | style through the class |

## Interaction contract

The page includes three placeholders, in this order:

```html
<head>
  <!--READER_STYLE-->
  …your own <style> after it, so your rules win…
</head>
<body>
  <main id="reader-doc">…the guide…</main>
  <aside id="reader-panel" aria-label="Reader guide"></aside>
  <!--READER_DATA-->
  <!--READER_RUNTIME-->
</body>
```

- `<!--READER_STYLE-->` → `runtime/reader.css` (defaults only).
- `<!--READER_DATA-->` → a JSON block with the glossary and questions.
- `<!--READER_RUNTIME-->` → `runtime/reader.js` (the fixed behavior).
- `data-term` values are glossary keys, lowercased.
- `data-chapter` values are the slugs used in `questions.json`.
- Internal links to talks are `../../talks/<slug>/transcript.md` (works on disk
  and when served from the repo root). Never a bare `talks/...`.

The runtime provides class hooks: `.rg-tabs`, `.rg-tab`, `.rg-pane`,
`.rg-search`, `.rg-terms`, `.rg-term`, `.rg-detail`, `.rg-section`,
`.rg-questions`, `.rg-question`, `.rg-input`, `.rg-ask`, `.rg-answer`. Style
them; do not add ids the runtime does not know, and do not attach your own click
handlers to terms or questions.

## Accessibility

`lang` on `<html>`, a viewport meta, visible `:focus-visible`, 4.5:1 contrast
for body text, `aria-live="polite"` on the answer, keyboard-reachable terms and
questions, and `prefers-reduced-motion` respected.

## Checklist before shipping

- The page reads at 46rem without the panel; the panel is an aid, not a crutch.
- A term is marked on first use, not every use.
- Print preview: no clipped figures, no panel, page breaks on chapters.
- At 380px wide: one column, panel after the article, nothing overflows.
- The validator passes (`bun scripts/validate-explainer.ts <index.html>`).
