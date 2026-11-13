---
title: "Judgment when code is free"
kind: theme-deep-dive
theme_id: judgment-when-code-is-free
theme_number: 6
status: draft
reader: Will and TheFocus.AI clients
talks:
  - talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/story.md
  - talks/2026-11-10-one-teams-path-to-trusting-ai-generated-code/story.md
  - talks/2026-11-10-scott-tolinski-co-host-syntax/story.md
  - talks/2026-11-11-2026-in-llms/story.md
  - talks/2026-11-11-all-code-is-slop-except-mine/story.md
  - talks/2026-11-11-i-love-you-so-jevving-much/story.md
  - talks/2026-11-11-software-factories-escape-from-trash-mountain/story.md
  - talks/2026-11-12-12-factor-factories-design-patterns-for-agentic-coding/story.md
  - talks/2026-11-12-a-new-age-of-software-engineering/story.md
  - talks/2026-11-12-brownfield-factories/story.md
  - talks/2026-11-12-jarred-sumner-founder-of-bun-anthropic-bun/story.md
  - talks/2026-11-12-judgement-is-the-last-job/story.md
  - talks/2026-11-12-thariq-shihipar-independent/story.md
  - talks/2026-11-11-cloudflare-is-a-neolab/story.md
also_called:
  - asymmetric slop
  - be more ambitious
  - capacity
  - cognitive load
  - decision fatigue
  - expected pain
  - human judgment
  - knowing what to build
  - micro decisions
  - software Renaissance
  - taste and craft
  - the theme of the conference
---

# Judgment when code is free

Zero-cost implementation shifts engineering value away from typing syntax toward human judgment, taste, ambition, and deliberate attention budgets—protecting teams from high-speed burnout. Across 13 talks and 28 supporting claims (with 2 counter-claims), speakers returned to the same inversion: when models generate working code in minutes, the scarce resource is no longer execution speed, it is deciding what should exist, what must stay rigid, and what deserves a human eye.

> Framing note: Quotes below preserve exact Qwen3-ASR 1.7B wording from each cited talk transcript (including spoken restarts and transcription artifacts) so every claim resolves cleanly to the underlying recording.

## 1. Asymmetric slop and expected pain

Dexter Horthy framed the core economics cleanly: generation cost is collapsing toward zero while comprehension cost stays flat.

> “AI cannot replace human judgment. It can only amplify our judgment, or maybe perhaps our lack of judgment in certain cases. And the slop is asymmetric. The cost of producing a thousand line PR or a ten page doc is approaching zero. But the cost of reviewing it is still barely constant.”
> — Dexter Horthy, 12-Factor-Factories: Design Patterns for Agentic Coding (00:14:43)

Because attention is fixed, engineers have to triage where to spend it. Horthy filters every architectural choice by expected pain—probability of later change multiplied by cost of changing it—leaving button colors to the model while locking down database schemas. Ankit Jain observed the same shift in production PR reviews:

> “Most of the comments that humans are providing are actually not about bugs or correctness. It's about decisions.”
> — Ankit Jain, One team's path to trusting AI generated code (00:00:29)

## 2. Knowing what to build beats making it fast

Lauren Tan warned that automating an undisciplined workflow simply scales waste, and Justin McCarthy noted that industrializing ambiguity only burns tokens faster:

> “And if we're trying to industrialize something where we don't know what we want. We're certainly we're not going to get the right thing, or we're going to take too long, or we're going to spend too much.”
> — Justin McCarthy, Brownfield Factories (00:02:12)

Ishaan Dey put the same point at the top of the closing afternoon: once anyone can generate software instantly, taste and product direction become the primary engineering differentiator.

> “So, anything can be made by anyone. Then it's more important than ever to know what the right thing to even make is.”
> — Ishaan Dey, Judgement is the Last Job (00:00:39)

## 3. Decision fatigue and cognitive load

Higher token throughput carries a real human tax. Scott Tolinski polled developers and found widespread exhaustion—compounded by constant context-switching, endless micro-approvals, and the loss of coding flow.

> “Obviously, it's decision fatigue.”
> — Scott Tolinski, The True Cost of AI Coding (00:09:42)

Running too many parallel loops fragments focus rather than freeing it. Thariq Shihipar described sending off a prompt, drifting elsewhere, and returning to surprising choices he no longer understood, while Tolinski advised capping concurrency deliberately (`"Less paralization makes for a calmer mind."`). Ishaan Dey argued the interface itself must hide raw tool chatter behind semantic progress summaries so humans spend cognitive load on real choices rather than log triage.

## 4. Ambition as the real bottleneck

Once routine implementation drops off the critical path, the remaining ceiling is how bold a team dares to be. Simon Willison called it directly from the stage:

> “and I think it's the theme of this conference: is to be more ambitious now that we have all of these new tools.”
> — Simon Willison, 2026 in LLMs (00:01:58)

Walden Yan backed the claim with Cognition's internal metrics—merged PR volume expanding 40.4x on 2.7x headcount—concluding that `"So I think really most teams are limited by the amount of ambition they have."` At Bun and Anthropic, Jarred Sumner described how steering long-running builds relies on relentless questioning rather than passive prompting: pushing the agent to try harder paths and rejecting timid first drafts.

## 5. Software Renaissance vs. industrial slop—and the counter-evidence

Thariq Shihipar resisted the metaphor of an assembly line spitting out uniform gray products. Instead, he argued that falling marginal cost triggers a Software Renaissance where readable specs, human soul, and distinct taste earn outsized returns—while Diogo Almeida traced generic output back to uncalibrated reliability.

Two counter-claims complicate any simple prescription to slow down or pull humans back into every loop:

- **Speed without fatigue when infrastructure fits:** Michelle Chen described Cloudflare training and shipping a specialized System One model from scratch over a 48-hour weekend (`"And we ended up training the model over 48 hours over the weekend, and then we launched it the following week."`), showing that small teams with tight tooling can still sprint at extreme speed without drowning in process.
- **Not every developer burns out:** In Scott Tolinski's own survey on AI coding fatigue, `"Only 195 people said never."`—a reminder that while most respondents felt real strain, a substantial minority thrive under high-velocity agent workflows.

## 6. Reading for TheFocus.AI

For Will and TheFocus.AI's client engagements, the value proposition flips completely: clients do not need an agency to type faster, they need a sharp partner to decide *what* to build, design an expected-pain review budget, keep human-readable specs as ground truth, and channel agent capacity toward ambitious outcomes instead of 1,000-line AI slop.
