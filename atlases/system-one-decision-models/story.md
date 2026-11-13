---
title: "System One decision models"
kind: theme-deep-dive
theme_id: system-one-decision-models
status: draft
reader: "Will and TheFocus.AI clients: when to replace slow conversational LLM agent loops and vector stacks with sub-second, calibrated System One decision models"
talks:
  - talks/2026-11-11-i-love-you-so-jevving-much/story.md
  - talks/2026-11-11-autocomplete-for-actions-system-one-from-the-ui-to-the-db/story.md
  - talks/2026-11-11-cloudflare-is-a-neolab/story.md
  - talks/2026-11-12-the-first-grounded-decision-model/story.md
---

# System One decision models

Across four uncontested talks at AI Engineer Code Summit, speakers from TypeSafe AI, Workday, Cloudflare, and Parallel converged on a quiet architectural shift: most steps inside production software and agent harnesses do not want a multi-second, token-streaming chat model. They want a sub-second, calibrated **System One decision model**—a programmatic fourth logic gate that returns a typed boolean, category, score, or cited answer inside SQL queries, UI keystrokes, edge workers, and web-grounded pipelines.

*Framing note: this synthesis draws on the four talks assigned to Theme 04 (`system-one-decision-models`, 13 claims, uncontested). Every block quote is verbatim from the talk's machine transcript (keeping ASR garbles such as `"Jeff"` for Jev), cited by speaker and timestamp. Prompt-bias artifacts flagged in transcript headers are excluded.*

## A fourth semantic logic gate

Diogo Almeida (TypeSafe AI) separates assistance from automation. Frontier models trained with RLHF excel at pleasing a human checking their work in chat, yet remain too unreliable for unattended control flow:

> “I often call it you get Einstein ninety five percent of the time, but Mr Bean five.”
> — Diogo Almeida, 00:08:57

When a model is trained specifically for reliable, narrow decision primitives rather than conversational fluency, calling it becomes an ordinary software branch—like adding a fourth logic gate alongside `AND`, `OR`, and `NOT`:

> “This is kind of conceptually adding a fourth semantic logic gate.”
> — Diogo Almeida, 00:12:12

## Every agent step is just a conditional

Scott Roberts (Workday) applies that primitive to agent harnesses and user interfaces. Most harness branches are not open-ended reasoning problems; they are fast routing and classification checks bogged down by oversized models:

> “So one is there's too much intelligence.”
> — Scott Roberts, 00:00:37

> “it's really just a conditional.”
> — Scott Roberts, 00:01:42

Running Jev on every keystroke lets an interface pick the right action card from 255 options at typing speed—at roughly `$20` per million judgments—leaving domain teams in control of the typed schema and follow-up questions:

> “And you know we can do this at about twenty bucks for a million judgments.”
> — Scott Roberts, 00:06:42

## Replace the retrieval stack inside DuckDB

The same sub-second decision call eliminates entire embedding, vector-database, and reranker pipelines for medium-scale filtering. Instead of maintaining embeddings and similarity indices, Roberts embeds Jev as a scalar SQL function inside DuckDB—scoring 117 resumes in 2.3 seconds while rejecting false positives that lexical keyword search misses:

> “But with Jeff, we basically take out all the embedding steps.”
> — Scott Roberts, 00:08:03

> “So this is against a DuckDB, where we have a function.”
> — Scott Roberts, 00:09:24

## Edge System One models in tandem with LLMs

Michelle Chen explains why Cloudflare built its own System One models—**Clef** for decisions and **Clairic** for single-pass extraction with confidence scores—trained over a 48-hour weekend sprint so edge agents do not burn frontier LLM latency on routine routing:

> “We don't have to send every request to an LLM.”
> — Michelle Chen, 00:07:50

> “And we ended up training the model over 48 hours over the weekend, and then we launched it the following week.”
> — Michelle Chen, 00:09:53

## Live web grounding fixes overconfident guesses

Devin Gupta (Parallel) identifies the remaining flaw in ungrounded decision models: asked about current world facts, they return wrong answers with dangerously high confidence:

> “And so it's kind of crazy that you would use a decision model in your workflow that has like almost no understanding of like what. And so this is where we think that like not only is it wrong, but also its confidence is too high.”
> — Devin Gupta, 00:00:55

Pairing a decision call with live retrieval over a proprietary ~100B-page web index makes confidence meaningful, cuts latency under one second at `$1` per 1,000 requests, and attaches verifiable citations:

> “What is correct is much more confident that's correct if you use actual grounding to ground your decision. So there's like a whole set of things here that unlocks, and specifically like. Calibration is the important thing about good decision models.”
> — Devin Gupta, 00:01:50

> “It runs under a second in response time. It's one dollar per thousand requests. So. Two orders of magnitude, maybe an order of magnitude cheaper than the LLM workflow we were using to be back in April. And then it's also like an order of magnitude faster.”
> — Devin Gupta, 00:03:01

> “Not only do we give you the answer, we also give you the citation, so you can go fact check the source yourself.”
> — Devin Gupta, 00:05:45

<div class="reading"><b>For TheFocus.AI:</b> Audit client agent loops for hidden <code>if</code>/<code>switch</code>/<code>sort</code> branches currently burning frontier LLM calls. Move deterministic routing, SQL row filtering, UI intent matching, and live web-verified KYC/classification checks onto sub-second typed decision models—keeping frontier LLMs strictly for open-ended synthesis.</div>
