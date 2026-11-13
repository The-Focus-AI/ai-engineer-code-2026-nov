---
title: "We trusted our judge until we measured it (closing fragment)"
speakers: "Brian Kennedy (ZoomInfo)"
duration: "00:28"
source: transcript.md
video: null
themes: [guardrails-people-own, close-the-loop]
reader: "Will and his clients: an honest 28-second closing takeaway on why you must run a second check in shadow mode against your LLM judge"
built_from_notes: []
built_from_photos: 0
notes_frame:
  spine: "Unverified LLM judges hide silent errors (00:00:00, 28s closing fragment): start small, run a second check in shadow mode, and read the cases where the two disagree"
  clusters:
    - "Closing takeaway only (00:00:00, 46-word transcript section)"
  skipped: "Body of the talk is missing—recording started at 15:22:39 after the scheduled 15:06–15:19 slot, capturing only the final 28 seconds"
key_points:
  - "Assume your LLM-as-judge is hallucinating until you test it empirically: Brian Kennedy's closing rule is 'We entrusted our judge until we measured it. Measure yours.' (00:00:00)"
  - "Validate your primary judge safely by running a second check in shadow mode alongside production evaluations rather than trusting single-judge scores blindly (00:00:00)"
  - "Skip heavy upfront harness rewrites—start small and read the actual disagreement cases to see where your judge is wrong (00:00:00)"
kind: talk-story
status: draft
---

# We trusted our judge until we measured it

This is an incomplete fragment, not a full talk capture: the recorder caught only the final 28 seconds (`15:22:39–15:23:07`) as Brian Kennedy wrapped up (`00:00:00`). Even in four sentences, the operational takeaway is sharp enough to stand on its own: teams treat LLM-as-judge scores as ground truth until they run a second check in shadow mode and read the disagreements (`00:00:00`).

*Framing note: no inbox notes or photos exist for this session, and `transcript.md` contains a single `00:00:00` section (46 spoken words captured out of a 13-minute slot; Qwen3-ASR 1.7B ends at `00:00:18`, with `"Thank you."` only in the companion Voice Memos `transcript.txt`). Per the dossier (`links.md`), attribution to Brian Kennedy and ZoomInfo's multi-agent / Jev shadow-judge comparison rests on the folder title and session abstract rather than words spoken inside the 28-second audio clip. Nothing beyond those closing lines is extrapolated here.*

## Don't trust an unmeasured judge

Teams build verification loops around LLM judges and quickly stop questioning the grader itself. Kennedy's closing line flips that assumption: confidence in your evaluator before you audit it is just unmeasured drift (`00:00:00`).

> “We entrusted our judge until we measured it. Measure yours.”
> — 00:00:00

**Key points**

- Treating an LLM judge as an infallible oracle leaves hallucinated passes and false failures invisible (`00:00:00`).
- Measuring the judge itself is the prerequisite before trusting any downstream verification score (`00:00:00`).

**Visual:** quote “We entrusted our judge until we measured it. Measure yours.” (00:00:00)

## Run a second check in shadow mode

You do not need to halt production or rebuild your evaluation pipeline to test your grader (`00:00:00`). Run a second evaluator in **shadow mode** beside the existing judge and log every case where the two disagree (`00:00:00`).

> “Run a second check. Run in shadow mode, seeing where it disagrees.”
> — 00:00:00

**Key points**

- Shadow-mode evaluation lets a second check grade live cases in parallel with zero production risk (`00:00:00`).
- Divergence between two judges immediately narrows human review to the ambiguous or broken boundary cases (`00:00:00`).

**Visual:** diagram “Shadow-mode judge check: Agent output → Primary judge (live) + Second check (shadow) → Disagreement log”

## Start small and read the disagreements

Instead of designing an elaborate meta-benchmark before looking at data, Kennedy closes with a minimal loop (`00:00:00`): start small, pull up the concrete disagreement cases, and inspect them by hand—because what the two judges argue over will surprise you (`00:00:00`).

> “Then read the cases, see where the two disagree, and don't overthink it. Just start small.”
> — 00:00:00

> “You may be surprised at what you find.”
> — 00:00:00

**Key points**

- Reading raw disagreement pairs by hand beats overthinking a grand evaluation framework (`00:00:00`).
- Auditing even a small slice of shadow-mode disagreements exposes blind spots in the primary judge fast (`00:00:00`).

**Visual:** diagram “Minimal audit loop: Start small → Capture disagreements → Read the cases → Spot judge hallucinations”
