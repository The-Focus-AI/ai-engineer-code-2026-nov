---
name: talk-polish
description: Turn a raw ASR transcript into a readable talk story — chapters, key points, pull quotes, and visual cues — while keeping the transcript as the untouched evidence. Use after /conference-next, or when a talk is hard to read.
---

# Polish a talk

The transcript is evidence. The story is the reader's cut. Never confuse them.

## Inputs

- `talks/<slug>/transcript.md` — read the whole thing, including the headings.
- `talks/<slug>/links.md` — video, speakers, resources.
- `talks/<slug>/photos/` — what visual material exists.
- `analysis/themes.md` — where the talk sits in the conference.

## 1. Propose before writing

Give the user, in chat:

- **A one-sentence thesis.** What is this talk actually arguing?
- **Five candidate key points**, each with a timestamp and a short quote.
- **The visual assets you found**: photos, video, slides, diagrams the talk
  describes.
- **One question**: who is the reader, and what should they be able to say after
  the talk?

Wait for the user to pick **three** key points and correct the thesis. Do not
write the story first.

## 2. Write `talks/<slug>/story.md`

```md
---
title: "Beyond “Done”: Building Verification Loops for AI Agents"
speakers: "Nick Nisi, Zack Proser"
duration: "56:47"
source: transcript.md
video: "https://www.youtube.com/watch?v=q4WC4TowkBo"
themes: [verification]
kind: talk-story
status: draft
---

# <cover line>

<two or three sentences: the promise of the talk>

## <chapter claim>

<two to four paragraphs in the reader's direction. Compress, reorder, and
paraphrase. Every factual claim cites the transcript: (00:16:07).>

**Key points**

- <one sentence>
- <one sentence>
- <one sentence>

> “<verbatim quote>”
> — 00:16:07

**Visual:** quote | photo `photos/<file>` | video `00:16:07` | diagram “<what to draw>”
```

Rules:

- **Never edit `transcript.md`.** The story is a separate, derived file.
- Quotes are **verbatim**; ASR garble stays in the quote. Paraphrase around it.
- Every claim points to a `HH:MM:SS` heading that exists in the transcript.
- 4–8 chapters. One idea per chapter. A chapter should be readable in 60–90
  seconds.
- Choose the visual cue that makes the chapter legible, not decoration.
- If a passage is unrecoverably garbled, say so; do not invent a clean version.
- Label the story `status: draft` until the user has read it.

## 3. Check the story

- Every quote appears in `transcript.md`.
- Every timestamp is a `### HH:MM:SS` heading.
- The key points are the three the user chose.
- The story does not claim more than the talk did.
- The transcript is byte-identical to before.

## 4. Hand off

The next step is `/talk-page`, which designs the page around the story. Do not build
the page here.
