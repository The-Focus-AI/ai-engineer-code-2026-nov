---
title: "Six shifts after the diff"
kind: conference-themes
status: draft
reader: Will and TheFocus.AI clients
corpus:
  talks: 33
  words: 101668
  claims: 191
  themes: 6
talks:
  - talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/story.md
  - talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/story.md
  - talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/story.md
  - talks/2026-11-10-one-teams-path-to-trusting-ai-generated-code/story.md
  - talks/2026-11-10-scott-tolinski-co-host-syntax/story.md
  - talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/story.md
  - talks/2026-11-11-2026-in-llms/story.md
  - talks/2026-11-11-all-code-is-slop-except-mine/story.md
  - talks/2026-11-11-autocomplete-for-actions-system-one-from-the-ui-to-the-db/story.md
  - talks/2026-11-11-cloudflare-is-a-neolab/story.md
  - talks/2026-11-11-heal-your-agents-dont-just-grade-them/story.md
  - talks/2026-11-11-how-to-build-agents-over-your-own-data/story.md
  - talks/2026-11-11-how-to-build-an-agent-that-builds-the-culture/story.md
  - talks/2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/story.md
  - talks/2026-11-11-i-love-you-so-jevving-much/story.md
  - talks/2026-11-11-software-factories-escape-from-trash-mountain/story.md
  - talks/2026-11-11-the-software-factory-that-needs-zero-fdes/story.md
  - talks/2026-11-11-what-it-takes-to-set-intelligence-free/story.md
  - talks/2026-11-12-12-factor-factories-design-patterns-for-agentic-coding/story.md
  - talks/2026-11-12-a-company-built-around-the-agent/story.md
  - talks/2026-11-12-a-new-age-of-software-engineering/story.md
  - talks/2026-11-12-brownfield-factories/story.md
  - talks/2026-11-12-jarred-sumner-founder-of-bun-anthropic-bun/story.md
  - talks/2026-11-12-judgement-is-the-last-job/story.md
  - talks/2026-11-12-thariq-shihipar-independent/story.md
---

# Six shifts after the diff

Across 33 recorded talks, 101,668 spoken words, and 191 extracted claims at AI Engineer Code Summit 2026, the center of gravity moved decisively past autocomplete and chat-based diff generation. Engineering attention migrated into six stacked layers—verification loops, brownfield factories, disposable harnesses, sub-second decision models, modeled context, and human judgment—alongside six live disagreements where leading builders still split.

> Framing note: Quotes below preserve exact Qwen3-ASR 1.7B wording from cited talk transcripts so every observation resolves cleanly to the underlying recording.

## 0. The stack after the diff

When generating 400 lines of code drops near zero marginal cost, the diff stops being the primary unit of software engineering. Every winning team rebuilt around a six-layer stack: human judgment at the top deciding what promises to keep, modeled context feeding a lean runtime, sub-second System One decision models handling routine calls, brownfield and demand factories running continuously, and deterministic verification closing the loop at the base.

## 1. Own the verification loop (19 talks · 48 claims)

The largest cluster in the corpus centers on verification: replacing slow line-by-line PR reading with deterministic rules, replayable session traces, stakes-scaled permissions, and continuous production failure diagnosis.

> “Now we can build things in minutes or hours. But the review and testing still takes hours or days if we're doing it in the old way. So we bring in agentic code review, agentic testing.”
> — Dexter Horthy, 12-Factor-Factories: Design Patterns for Agentic Coding (00:04:20)

> “So instead of thinking about owning the code. Own the guardrails. Own the rules.”
> — Ankit Jain, One team's path to trusting AI generated code (00:17:18)

## 2. Brownfield & demand factories (16 talks · 26 claims)

Autonomous factories thrive on existing brownfield software because live customers, runtime telemetry, and existing guarantees already specify what "working" means—while forcing teams to confront real token economics and build companion demand factories to grow.

> “We have to figure out how to build a demand factory. Because our brownfield factory can't build the moat. Right. All it can do is keep our existing promises running well.”
> — Justin McCarthy, Brownfield Factories (00:13:17)

## 3. Delete the harness (15 talks · 30 claims)

Model capabilities absorb brittle orchestration wrappers every few months. Speakers urged teams to strip out multi-agent plumbing down to fast millisecond sandboxes, clean CLI/bash tools, and one shared organizational agent whose sessions stay public.

> “General methods that leverage computations are ultimately the most effective by a large margin”
> — Philipp Schmid, I deleted 90% of my harness (And It Got Better) (00:00:13)

## 4. System One decision models (4 talks · 13 claims)

Uncontested across four talks, sub-second calibrated decision models turn AI from heavy conversational chatbots into an inline fourth logic gate inside DuckDB queries, UI keystrokes, and web-grounded pipelines.

> “We don't have to send every request to an LLM.”
> — Michelle Chen, cloudflare is a neolab (00:07:50)

## 5. Modeled context over connectors (13 talks · 26 claims)

Giving agents twenty raw live connectors fragments retrieval and leaks inconsistent answers. Teams pushed context upstream into governed warehouse models, unified permission-filtered search indexes, and actively pruned agent memory.

> “The company context is the key here.”
> — Utkarsh Shrivastava, Building a Shared AI Assistant: The Platform Challenges Beyond MCP (00:02:11)

## 6. Judgment when code is free (13 talks · 28 claims)

When implementation approaches zero cost, competitive advantage moves to taste, expected-pain triage, higher ambition, and protecting developers from decision fatigue.

> “and I think it's the theme of this conference: is to be more ambitious now that we have all of these new tools.”
> — Simon Willison, 2026 in LLMs (00:01:58)

## 7. Six fault lines where speakers disagreed

The summit reached broad consensus on the six-layer architecture, yet split sharply on six operational questions:

1. **Company context strategy:** Modeled warehouse layers (Claire Carroll) vs. one unified permissioned search index (`"The answer accuracy jumped from very forty percent to ninety-seven percent"`, Aamir Shakir) vs. aggressively deleting stale markdown (`"So you just gotta go in there and just aggressively slash the crap out of it."`, Steve Yegge).
2. **Multi-agent autonomy vs. shared trajectories:** Single shared threads (`"So unlike it, we cannot merge agent trajectories"`, Fabian Hedin) vs. supervised multi-agent swarms and parallel worktrees.
3. **Rule encoding:** Delete prompt-heavy harnesses vs. encoding deterministic checks in code rather than prose (`"Instead of adding another line to your rules or your agent's dot md, because it's far more reproducible, it's in code."`, Lauren Tan).
4. **Decision architecture:** Replace agent retrieval loops with System One models (`"But with Jeff, we basically take out all the embedding steps."`, Diogo Almeida) vs. keeping tool-using general reasoning agents for open-ended queries.
5. **Factory pacing:** Steady continuous loops over existing brownfield promises (Justin McCarthy) vs. rapid 48-hour weekend model drops (Michelle Chen).
6. **Guardrails vs. overfencing:** Hard deterministic pause stops (`"You can define pausing, deterministic stop, where the agent will stop."`, Raz Berman Gold) vs. Steve Yegge's warning against paralyzing agents with excessive rules.

## Reading for TheFocus.AI

For Will and TheFocus.AI, the playbook across all six shifts is clear: do not sell clients bloated prompt harnesses or raw diff volume. Anchor engagements in Theme 01 verification artifacts, Theme 05 modeled/indexed context, and Theme 06 judgment—using Theme 04 System One calls for routine inline decisions and deleting orchestration scaffolding whenever the next model release absorbs it.
