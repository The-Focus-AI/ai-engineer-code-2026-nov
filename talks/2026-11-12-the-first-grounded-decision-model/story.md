---
title: "Ground the decision model: live web state turns overconfident guesses into calibrated, cited answers"
speakers: "Devin Gupta (Parallel Web Systems)"
duration: "10:45"
source: transcript.md
video: null
themes: [decision-load, context-for-ai]
reader: "Will and his clients: how grounding read-only decision models in live web search cuts cost, restores calibration, and fits research, KYC, and classification pipelines"
built_from_notes:
  - notes/inbox/2026-11-12T1435-how-do-we-ground-the-decision-model.md
  - notes/inbox/2026-11-12T1437-decisions-api-with-grounded-support.md
  - notes/inbox/2026-11-12T1440-is-jensen-still-ceo-of-nvidia-test.md
  - notes/inbox/2026-11-12T1441-follow-up-parallel-for-research.md
built_from_photos: 0
notes_frame:
  spine: "grounding decision models in live web state (2 notes: how do we ground the decision model? + Decisions API with grounded support)"
  clusters:
    - "Live world-state freshness & citations — the 'Is Jensen still CEO of Nvidia?' demo + customer classification/KYC (1 note)"
    - "Follow-up for TheFocus.AI research & dossier pipelines (1 note, todo)"
  skipped: "Opening mid-sentence aside on Yogo/evolution and unlabelled Q&A crowd chatter (folded where relevant)"
key_points:
  - "Ungrounded LLMs fail on changing world-state questions and emit overconfident probabilities—grounding with live web search restores calibration so predicted confidence tracks accuracy (00:00:55, 00:01:50)"
  - "Parallel's Decisions API queries a ~100-billion-page proprietary index, feeds retrieved evidence to a read-only decision model, and answers in under a second for $1 per 1,000 requests with citations (00:03:01, 00:05:45)"
  - "Batching parallel questions on one entity shares a single retrieved search context—great when sub-questions need the same pages, but accuracy degrades if sub-questions require distinct searches (00:03:01, 00:07:45)"
kind: talk-story
status: draft
---

# Ground the decision model

Decision models are exploding because reading and classifying is dramatically cheaper and faster than open-ended generation, yet an ungrounded model is only as good as the stale weights you freeze into it (`00:00:00`, `00:00:55`). Devin Gupta—core engineer on Parallel Web Systems' Decisions API—makes the case that pairing a read-only decision model with a live 100-billion-page web search index fixes uncalibrated overconfidence, returns verifiable citations in under a second at `$1` per `1,000` requests, and unlocks batch research and enrichment workflows (`00:01:50`, `00:03:01`, `00:04:34`).

*Framing note: this story is framed from four inbox notes taken during the session (zero photos). The recording opens mid-sentence and the local Qwen3-ASR 1.7B transcript is heavily garbled throughout, including `"vision model"` (decision model), `"Jeff"` / `"Web Jeff"` / `"Java"` / `"jobs"` (GPT / WebGPT), `"Versailles"` / `"evolution"` (inference / inference revolution), `"Justin Wong"` (Jensen Huang), `"the video"` (Nvidia), `"the prayers"` (Parallel's), `"WebMDX"` (web index), `"epochs"` (requests), and `"weather context"` (web context). Tokens flagged in the transcript header as prompt bias (`"parallel"`, `"Jarred"`, `"Exa"`) are never quoted. Session-abstract figures in the notes (such as 240× lower per-token read cost and 104 vs. 4,777 tokens on PWS-Decisions) are attributed explicitly to the notes and dossier rather than claimed as spoken words. `"From the notes"` and `"The reading"` boxes are editorial synthesis.*

## Ungrounded models guess confidently on stale facts

Cheap inference has caused request volume for classification and decision workflows to blow up, because once a model understands the context it is given, it does not need to write much (`00:00:00`). The trap is handing a decision model a world-state question without giving it the world (`00:00:00`, `00:00:55`):

> “And I'm here to make the case that like grounding for those is extremely important.”
> — 00:00:00

Ask an ungrounded model who won the Michigan Senate race—something a plain web search resolves in seconds—and it does not merely miss; it invents a confident probability from stale pretraining associations (`00:00:55`):

> “Okay, so maybe a question: Who won the Michigan Senate race? This should be easy. This is like well known. I mean, a couple days ago, if you do Google searches, the first thing that shows up. But if you ask Jeff this question, this is what'll give you back. Mike Rogers with fifty-eight percent. It really doesn't know.”
> — 00:00:55

> “And so this is where we think that like not only is it wrong, but also its confidence is too high.”
> — 00:00:55

**Key points**

- Inference volume has shifted toward fast read-only judgments, but pretraining weights freeze out recent facts (`00:00:00`, `00:00:55`).
- Ungrounded LLMs hallucinate stale candidates with false certainty instead of abstaining (`00:00:55`).

<div class="reading"><b>From the notes:</b> “How do we ground the decision model?” (<code>2026-11-12T1435-how-do-we-ground-the-decision-model.md</code>). <b>The reading:</b> Earlier in the summit, Cloudflare's Clef and Workday's Jev focused on making small decision models fast enough to run on every keystroke or SQL row; Gupta starts one layer earlier—even the fastest decision model fails if the state you hand it isn't grounded in current reality.</div>

**Visual:** diagram “Ungrounded weights vs. live web grounding: stale pretraining guesses at 58% confidence vs. live index retrieval returning verified state”

## Grounding unlocks calibration, not just accuracy

To measure the gap outside toy prompts, Parallel released the open **PWS-Decisions** benchmark (300 real-world questions directed at live workloads where ungrounded models cannot realistically know the answer) (`00:01:50`, `links.md`). Grounding does more than raise raw accuracy: it makes confidence scores meaningful (`00:01:50`).

> “What is correct is much more confident that's correct if you use actual grounding to ground your decision.”
> — 00:01:50

In Q&A (`00:07:45`), Gupta adds why elaborate post-hoc calibration tricks were mostly compensating for missing facts: once the model has live context in front of it, the right answer is usually unambiguous rather than a blind probability guess (`00:07:45`).

> “Calibration is the important thing about good decision models.”
> — 00:01:50

**Key points**

- PWS-Decisions (300 questions, open on GitHub and Hugging Face) tests decisions whose ground truth lives on the web (`00:01:50`).
- Grounding aligns predicted confidence with actual correctness—the core property required before software can branch automatically on a model's answer (`00:01:50`, `00:07:45`).

<div class="reading"><b>From the notes:</b> “Decisions API with grounded support.” (<code>2026-11-12T1437-decisions-api-with-grounded-support.md</code>) notes that on PWS-Decisions the question averages 104 tokens while the retrieved evidence averages 4,777 tokens. <b>The reading:</b> Calibration is the difference between a model you have to double-check manually and a primitive you can wire straight into automated workflows.</div>

**Visual:** diagram “Calibration gap on PWS-Decisions (300 questions): 104-token prompt + 4,777-token live evidence turns confident guesses into calibrated probabilities”

## One live search, shared state, $1 per 1,000 requests

Architecture-wise, the Decisions API wraps a familiar state-input schema around live search (`00:03:01`). For each request, it queries Parallel's proprietary index (~100 billion pages), pulls the most relevant content into the state, runs in under a second, and prices at `$1` per `1,000` requests—roughly one to two orders of magnitude cheaper and an order of magnitude faster than the multi-step LLM search workflows teams were wiring up earlier in the year (`00:03:01`, `00:07:03`).

> “We do a live search, web search call, and we get information from our proprietary index, which is like. On the size, I think that's at least their size, which is about 100 billion pages, and we find the most relevant content for that decision.”
> — 00:03:01

> “It runs under a second in response time. It's one dollar per thousand requests.”
> — 00:03:01

Because read-only decision models do not generate long prose, the economics tilt heavily toward retrieval (`2026-11-12T1437`, `00:03:01`). Gupta's session abstract notes that decision models cost roughly `240×` less per token read than frontier LLMs, dropping the model's share from `86%` to `17%` of a grounded answer's cost (`2026-11-12T1437`), and multiple typed questions over the same entity can reuse that single retrieved context (`00:03:01`). Since launching two weeks before the summit, usage has surged across both proprietary and first-party integrations (`00:04:05`), including live form autocomplete that classifies a business while a user is still typing its name (`00:07:03`).

**Key points**

- Sub-second latency (`<1s`) makes grounded classification fast enough for interactive onboarding and live UIs (`00:03:01`, `00:07:03`).
- At `$1 / 1,000` requests—and with read-only models cutting inference to a fraction of answer cost—web-scale enrichment becomes affordable (`00:03:01`, `2026-11-12T1437`).

<div class="reading"><b>From the notes:</b> “Decisions API with grounded support.” (<code>2026-11-12T1437-decisions-api-with-grounded-support.md</code>). <b>The reading:</b> Compare Philipp Schmid's Gemini Decisions API announcement the day before—decision APIs are emerging as a dedicated primitive alongside search and chat, where retrieval is the main cost center and read-only scoring is nearly free.</div>

**Visual:** diagram “Decisions API pipeline: Query (104 tok) -> Live 100B-page Index -> Evidence (4,777 tok) -> Read-Only Decision Model -> Typed Answers + Citations (<1s, $1/1k)”

## The “Is Jensen still CEO of Nvidia?” test and customer workflows

In the live demo (`00:05:45`), Gupta runs a intentionally lopsided check: asking an ungrounded model whether Jensen Huang is CEO of Nvidia (`00:05:45`, `2026-11-12T1440`). The ungrounded model replies `"true"` with `96%` confidence purely from decades of pretraining memory (`00:05:45`). The Decisions API returns the live answer **plus a citation** so the caller can verify the primary source directly—still at `$1` per `1,000` requests (`00:05:45`):

> “Not only do we give you the answer, we also give you the citation, so you can go fact check the source yourself.”
> — 00:05:45

Before the demo, Gupta highlights three customer workloads already running on grounded classification (`00:04:34`):

- **Sales enrichment at state scale**: Take `100,000` California restaurants, search each website, and classify reservation platform (`phone only`, `OpenTable`, `Resy`) and site builder (`Squarespace`, `Wix`) for roughly `$100` total (`00:04:34`).
- **Business KYC**: Search an entity like `Anchor Holdings Ltd` to determine business model, active operating status, and real threats at `$1` per `1,000` checks (`00:04:34`).
- **Instant news categorization**: Classify breaking stories in real time without relying on stale training cutoffs (`00:04:34`).

> “They have a list of like a hundred thousand restaurants. California, and you search every single one of them up here on the website, and you can actually classify for every single one of them.”
> — 00:04:34

**Key points**

- Every decision returns both a typed answer and a source citation, closing the trust loop for downstream automation (`00:05:45`).
- Concrete economics: classifying `100,000` restaurant websites across multiple dimensions costs about `$100` (`00:04:34`).

<div class="reading"><b>From the notes:</b> “"Is Jensen still the CEO of Nvidia?" is a hilarious test to do today.” (<code>2026-11-12T1440-is-jensen-still-ceo-of-nvidia-test.md</code>). <b>The reading:</b> Asking about Jensen Huang works as a joke precisely because everyone in the room assumes the answer is obvious—until you realize your automated pipeline would keep returning 96% confidence the day he steps down.</div>

**Visual:** quote “Not only do we give you the answer, we also give you the citation, so you can go fact check the source yourself.” (00:05:45)

## The shared-context trap when batching unrelated questions

Q&A surfaces an important boundary (`00:07:45`). An engineer who tested the API the night before notes that batching multiple questions in one call shares a single retrieved search state (`00:07:45`). Asking one question per call works well, but bundling divergent questions about the same topic—such as *"Who won?"*, *"What's their position on immigration?"*, and *"What party are they a member of?"*—causes quality to degrade because all three fields fight over one search result set (`00:07:45`).

> “Because the same search will back those results, it actually degrades as opposed to asking each of those as. Separate questions.”
> — 00:07:45

Gupta confirms the design intent and treats it as early product feedback (`00:07:45`):

> “Yeah, I think the intention behind the product shape is that we want. A single sort of grounding or single search to answer a question.”
> — 00:07:45

**Key points**

- Co-located questions about a single entity page (e.g. restaurant reservation tool + website builder) reuse one search cleanly (`00:03:01`, `00:04:34`).
- Divergent questions that demand different web queries should be split into separate calls rather than stuffed into one shared context (`00:07:45`).

<div class="reading"><b>From the notes:</b> Follows directly from the “Decisions API with grounded support” batching claim (<code>2026-11-12T1437</code>). <b>The reading:</b> This is a useful engineering guardrail for anyone integrating the API: group attributes that live on the same primary pages, and split orthogonal research angles into separate requests.</div>

**Visual:** diagram “One search per entity vs. divergent sub-questions: shared context works for co-located attributes, degrades when sub-questions need separate queries”

## From world-state decisions to automated research pipelines

For teams building research, due-diligence, or dossier pipelines, grounded decision primitives bridge the gap between slow deep-research agents and brittle ungrounded prompts (`00:03:01`, `00:04:34`, `2026-11-12T1441`). Because answers arrive in under a second with citations attached (`00:03:01`, `00:05:45`), a workflow can verify live company status, enrich thousands of leads, or corroborate entity facts before handing anything to a larger reasoning model (`00:04:34`, `00:07:03`).

> “And so it all comes to like one dollar per thousand requests. It's super easy. It's super fast.”
> — 00:05:45

**Key points**

- Treat grounded decision calls as a sub-second, cited verification primitive for research and dossier workflows (`00:05:45`, `2026-11-12T1441`).
- Keep complex open-ended synthesis in larger agents, and offload typed factual checks to `$1 / 1k` grounded decisions (`00:03:01`, `00:04:34`).

<div class="reading"><b>From the notes:</b> “Follow up on using Parallel to do research.” (<code>2026-11-12T1441-follow-up-parallel-for-research.md</code>). <b>The reading:</b> For Will and TheFocus.AI, the immediate experiment is testing Parallel's Decisions API on talk dossiers and client market scans—anywhere you need typed, cited answers across hundreds of entities without paying deep-research latency on every row.</div>

**Visual:** diagram “Where grounded decision models fit: Client KYC & Sales Scans + Automated Dossier Grounding -> Sub-second Live Index + Cited Typed Output”
