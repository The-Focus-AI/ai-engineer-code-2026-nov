---
name: magazine
description: Build and grow a magazine issue from selected hooks, themes, talks and photos — a designed, printable presentation of the conference. Use when opening an issue, adding a feature as talks land, freezing at the end, or re-rendering the printable page.
---

# Magazine

An issue opens early and grows with the conference. `issue.md` is the source;
`issue.html` is re-rendered from it after every change. State is `growing` until
you freeze it.

## Open — day one

Create `magazine/<issue>/issue.md` and the `assets/` folder. Do not wait for the
theme to settle; a working title is enough.

```md
---
title: "Working title"
issue: "01"
conference: "<conference name>"
date: "<YYYY-MM-DD>"
theme: "the argument this issue will make"
state: growing
---

# <cover line>

<two or three sentences: the argument so far>

## Review / Digest
```

Render once so the file exists. Done when `issue.html` renders and the cover
reads as a promise, not a placeholder.

## Add — after a talk lands

A feature enters when it has a headline, a standfirst, at least two cited
quotes, and a "why it matters". A photo is optional. Take it from
`editorial/hooks/`; if it is not there yet, run `/hooks` first.

Append the feature just above `## Review / Digest`:

```md
## <headline>

<standfirst>

<two to four paragraphs, at least two quotes>

![<caption>](assets/<file>.jpg)

**Why it matters.** ...

**Go deeper.** [<link>](...)
```

Update the date, keep `state: growing`, re-render. Do not rewrite or reorder an
existing feature without a reason: the issue is the record of how the argument
grew.

Done when the new feature has two citations, every image resolves, and the HTML
is re-rendered.

## Freeze — end of the event

- Close the feature set at four to seven. Fold weaker candidates into the
  backlog rather than padding.
- Write the opening for real; it is the argument, not a summary of the features.
- Write `## Review / Digest` from `editorial/backlog.md`.
- Set `state: frozen`, re-render, read the print preview.

Done when every feature cites at least two talks, no link is unverified, and the
issue reads top to bottom without the reader needing the transcripts.

## Render

The model composes `issue.html` inside [`design.md`](design.md): layout, type,
images, spreads. `render-issue.ts` remains the plain baseline — one column, fixed
type — for a quick issue with no design pass:

```bash
bun scripts/render-issue.ts magazine/<issue>/issue.md
```

Every `##` starts a page in print, whichever path rendered it.

## Rules

- Every claim cites a talk and a timestamp.
- Quotes are verbatim; ASR garble stays.
- Photos come only from `talks/<slug>/photos/`, copied into `assets/`.
- No stock images, no invented transitions, no "in today's fast-moving world".
- The issue is a projection: if it disagrees with `talks/`, the talks win.
