---
generated_at: 2026-11-12T22:45:00-08:00
sources:
  - analysis/themes.md
  - state/world-model/conference-themes/published/world-model.json
  - talks/2026-11-12-jarred-sumner-founder-of-bun-anthropic-bun/transcript.md
  - talks/2026-11-11-your-judge-is-hallucinating-too/transcript.md
  - talks/2026-11-12-brownfield-factories/transcript.md
  - talks/2026-11-11-software-factories-escape-from-trash-mountain/transcript.md
  - talks/2026-11-12-let-the-agent-cook-from-apis-to-answers/transcript.md
  - talks/2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/transcript.md
  - talks/2026-11-11-i-love-you-so-jevving-much/transcript.md
  - talks/2026-11-12-the-first-grounded-decision-model/transcript.md
  - talks/2026-11-11-how-to-build-agents-over-your-own-data/transcript.md
  - talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/transcript.md
  - talks/2026-11-12-12-factor-factories-design-patterns-for-agentic-coding/transcript.md
  - talks/2026-11-12-judgement-is-the-last-job/transcript.md
---

# Research Theme Hooks

Twelve evidence-backed hooks organized across the six consolidated conference themes (two per theme), ready to drive TheFocus.AI research spikes and client newsletter issues.

## Never rewrite your test suite in another language while rebuilding the runtime with agents

- kind: contrarian
- evidence: "As soon as you're like rewriting the tests. Then you can't really trust the test anymore. So that seems like it'd be too risky." — Jarred Sumner, Founder of Bun, Anthropic / Bun, 00:03:28
- also: One team's path to trusting AI generated code; All Code Is Slop (Except Mine); Post-Training Gemini 4 for Real Engineering Work
- angle: Essay for engineering leaders on "trusted oracles": why keeping an untouched, pre-existing test suite beats greenfield rewrites when letting agents iterate autonomously.
- assets: [talks/2026-11-12-jarred-sumner-founder-of-bun-anthropic-bun/experience/five-compilers-in-46-days.jpg, talks/2026-11-12-jarred-sumner-founder-of-bun-anthropic-bun/links.md]
- status: draft

## Run a shadow-mode second check before trusting any LLM judge in production

- kind: practical
- evidence: "We entrusted our judge until we measured it." — Your Judge Is Hallucinating Too, 00:00:00
- also: Heal Your Agents, Don't Just Grade Them; Post-Training Gemini 4 for Real Engineering Work; Talk But Verify: human-in-the-loop for agents that actually matter
- angle: Practical 1-day tutorial on audit-sampling production LLM judges with a deterministic oracle or secondary model in shadow mode and reviewing disagreement buckets by hand.
- assets: [talks/2026-11-11-your-judge-is-hallucinating-too/experience/page.html, talks/2026-11-11-heal-your-agents-dont-just-grade-them/experience/immune-system.jpg]
- status: draft

## Software factories fail on open-ended greenfield discovery and win on continuous brownfield promises

- kind: contrarian
- evidence: "So you've got an existing codestate. You've got an existing set of promises. Just make it continuous. Make it loop and make it keep those promises." — Brownfield Factories, 00:06:30
- also: A New Age of Software Engineering; A Company Built Around the Agent; 12-Factor-Factories: Design Patterns for Agentic Coding
- angle: Core service framing for TheFocus.AI clients: stop trying to vibe-code net-new businesses; attach a background promise-keeping loop to existing customer revenue first.
- assets: [talks/2026-11-12-brownfield-factories/experience/brownfield-faster-cheaper-safer.jpg, talks/2026-11-12-brownfield-factories/experience/demand-factory.jpg, talks/2026-11-12-brownfield-factories/links.md]
- status: draft

## Subsidized token pricing hides the real cost ceiling of multi-agent software factories

- kind: contrarian
- evidence: "but I tell you, every problem is a few problem." — Software Factories: Escape from Trash Mountain, 00:09:22
- also: What Will You Build When AI Is 10x Faster?; cloudflare is a neolab; Jarred Sumner, Founder of Bun, Anthropic / Bun
- angle: Economics deep-dive comparing naive fan-out agent loops against lean small-pod architectures and small-model routing before subsidy floors tighten. (Note: "few" is verbatim ASR for "fuel".)
- assets: [talks/2026-11-11-software-factories-escape-from-trash-mountain/experience/five-horsemen.jpg, talks/2026-11-11-cloudflare-is-a-neolab/experience/compute.jpg]
- status: draft

## Deleting blind-spot harness scaffolding made Sentry's agent 4x faster and cut token burn by 30%

- kind: data
- evidence: "The agent only got four times faster, but also used 30 percent." — Let the Agent Cook: From APIs to Answers, 00:08:07
- also: I deleted 90% of my harness (And It Got Better); A Company Built Around the Agent
- angle: Benchmark recipe for auditing existing agent pipelines: strip custom routing/planning boilerplate and measure wall-clock latency + token cost with pure programmatic tools + dry-run checks.
- assets: [talks/2026-11-12-let-the-agent-cook-from-apis-to-answers/experience/let-model-choose-path.jpg, talks/2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/experience/one-tool.jpg, talks/2026-11-12-let-the-agent-cook-from-apis-to-answers/links.md]
- status: draft

## Rebuild your agent harness from scratch every model release around bash and durable sandboxes

- kind: practical
- evidence: "how much of the harness do I really need to achieve the Same task, and what is overhead to the model" — I deleted 90% of my harness (And It Got Better), 00:03:20
- also: What it takes to set intelligence free; How to build an agent that builds the culture; Thariq Shihipar, Independent
- angle: Concrete architecture memo on separating perishable prompt scaffolding (delete quarterly) from durable runtime primitives (millisecond snapshots, scoped OAuth, public session traces).
- assets: [talks/2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/experience/harness-2025.jpg, talks/2026-11-11-what-it-takes-to-set-intelligence-free/experience/platform.jpg]
- status: draft

## RLHF turned frontier chat models into crowd-pleasing assistants instead of reliable software logic gates

- kind: novel
- evidence: "I often call it you get Einstein ninety five percent of the time, but Mr Bean five." — I love you so jevving much, 00:08:57
- also: Autocomplete for Actions: System One from the UI to the DB; cloudflare is a neolab
- angle: Architectural essay introducing the "fourth semantic logic gate": when sub-second calibrated decision models belong inside `WHERE` clauses and UI keystroke handlers instead of chat loops.
- assets: [talks/2026-11-11-i-love-you-so-jevving-much/experience/smart-software.jpg, talks/2026-11-11-autocomplete-for-actions-system-one-from-the-ui-to-the-db/experience/in-code-conditional.jpg, talks/2026-11-11-autocomplete-for-actions-system-one-from-the-ui-to-the-db/experience/duckdb-live-demo.jpg]
- status: draft

## Grounding a sub-second decision model against a live web index cures LLM overconfidence with verifiable citations

- kind: data
- evidence: "Not only do we give you the answer, we also give you the citation, so you can go fact check the source yourself." — The first Grounded Decision Model, 00:05:45
- also: Autocomplete for Actions: System One from the UI to the DB; cloudflare is a neolab
- angle: Client build recipe testing grounded binary/ranking decision calls ($1/1k requests, sub-second) vs. embedding pipelines and ungrounded zero-shot classifiers.
- assets: [talks/2026-11-12-the-first-grounded-decision-model/experience/page.html, talks/2026-11-12-the-first-grounded-decision-model/links.md]
- status: draft

## Pre-computing a unified ACL-aware search layer raised enterprise QA accuracy from 40% to 97%

- kind: data
- evidence: "The answer accuracy jumped from very forty percent to ninety-seven percent" — How to build agents over your own data, 00:14:19
- also: Building a Shared AI Assistant: The Platform Challenges Beyond MCP; The new job of the data team is providing context to AI
- angle: Technical blueprint for why naive one-MCP-server-per-SaaS federation fails and how to build an ingest-time ACL index over modeled lakehouse data.
- assets: [talks/2026-11-11-how-to-build-agents-over-your-own-data/experience/one-search-layer.jpg, talks/2026-11-11-how-to-build-agents-over-your-own-data/experience/weakest-connector.jpg]
- status: draft

## Treat your data warehouse as an authored map for agents instead of plumbing live API connectors

- kind: practical
- evidence: "Local tables in a special schema, a map of the rest of the database that acts as a guide." — The new job of the data team is providing context to AI, 00:11:18
- also: Exploring Claude’s frontier; The Software Factory That Needs Zero FDEs; All Code Is Slop (Except Mine)
- angle: How dbt/warehouse modeling plus curated "guide schemas" and scored memory pruning solve agent context rot better than live connector sprawl.
- assets: [talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/experience/agents-schema.jpg, talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/links.md]
- status: draft

## Autonomous coding models degrade sequential codebases unless teams budget review by expected pain

- kind: practical
- evidence: "Models don't do a great job of maintaining and improving codebase quality over time." — 12-Factor-Factories: Design Patterns for Agentic Coding, 00:06:50
- also: All Code Is Slop (Except Mine); One team's path to trusting AI generated code; Brownfield Factories
- angle: Practical executive guide to allocating shrinking human attention: spend heavy planning on high "expected pain" (schemas, auth boundaries) and use visual artifacts (`Show Me`) for UI iteration.
- assets: [talks/2026-11-12-12-factor-factories-design-patterns-for-agentic-coding/experience/forge-lifecycle.jpg, talks/2026-11-12-12-factor-factories-design-patterns-for-agentic-coding/experience/page.html, talks/2026-11-12-12-factor-factories-design-patterns-for-agentic-coding/links.md]
- status: draft

## When anything can be generated instantly, human taste and deciding what to build become the moat

- kind: quote
- evidence: "So, anything can be made by anyone. Then it's more important than ever to know what the right thing to even make is." — Judgement is the Last Job, 00:00:39
- also: The True Cost of AI Coding; Thariq Shihipar, Independent; 2026 in LLMs
- angle: Leadership closing issue contrasting high-velocity decision fatigue against deliberate intent layers, human-readable specs, and taste as the final moat.
- assets: [talks/2026-11-12-judgement-is-the-last-job/experience/judgement-taste.jpg, talks/2026-11-12-thariq-shihipar-independent/experience/industrial-vs-renaissance.jpg]
- status: draft
