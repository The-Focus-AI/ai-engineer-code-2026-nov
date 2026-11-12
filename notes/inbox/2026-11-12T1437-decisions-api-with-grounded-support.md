---
captured_at: 2026-11-12T14:37:00-08:00
kind: observation
session_id: "1381580"
talk: null
tags: [decision-models, grounding, api]
---

Decisions API with grounded support.

In Devin Gupta's "The first Grounded Decision Model" (1381580, 14:30–14:50, Expo sessions), following "how do we ground the decision model?" (2026-11-12T1435-how-do-we-ground-the-decision-model.md). This is Parallel's Decisions API: Devin Gupta (Parallel Web Systems; https://devin-gupta.github.io/, https://x.com/devingupta_) leads it, per the conference roster. His abstract: decision models only read, so they cost about 240x less per token read than a frontier LLM and are only as good as the state you hand them, which for most judgments lives on the live web; on Parallel's open PWS-Decisions benchmark (300 questions) the question is 104 tokens and the evidence 4,777, and the model has gone from 86% to 17% of the cost of a grounded answer. Compare the Gemini Decisions API Philipp Schmid announced on Nov 11 (talks/2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/).
