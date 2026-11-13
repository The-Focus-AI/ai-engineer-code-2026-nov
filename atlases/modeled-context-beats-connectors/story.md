---
title: "Modeled context over connectors"
kind: theme-deep-dive
theme_id: modeled-context-beats-connectors
status: draft
reader: "Will and TheFocus.AI clients: why raw per-app MCP connectors fail enterprise AI, and how modeled warehouses, unified ACL indexes, and curated agent memory replace sprawl"
talks:
  - talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/story.md
  - talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/story.md
  - talks/2026-11-10-one-teams-path-to-trusting-ai-generated-code/story.md
  - talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/story.md
  - talks/2026-11-11-all-code-is-slop-except-mine/story.md
  - talks/2026-11-11-how-to-build-agents-over-your-own-data/story.md
  - talks/2026-11-11-software-factories-escape-from-trash-mountain/story.md
  - talks/2026-11-11-the-software-factory-that-needs-zero-fdes/story.md
  - talks/2026-11-11-what-it-takes-to-set-intelligence-free/story.md
  - talks/2026-11-12-exploring-claudes-frontier/story.md
  - talks/2026-11-12-let-the-agent-cook-from-apis-to-answers/story.md
  - talks/2026-11-12-thariq-shihipar-independent/story.md
  - talks/2026-11-12-the-first-grounded-decision-model/story.md
  - talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/story.md
---

# Modeled context over connectors

Model Context Protocol made wiring an agent to enterprise software trivial, yet across 13 talks (26 claims and 2 counter-claims), practitioners reported the same second-order failure: giving an agent dozens of live connectors leaves it guessing which tool holds the truth, hitting rate limits, leaking or tripping on ACLs, and drowning in uncurated memory. Reliable enterprise AI replaces connector sprawl with modeled warehouses, unified permission-filtered search indexes, use-case-shaped tools, and disciplined memory curation.

*Framing note: this synthesis covers the 13 talks assigned to Theme 05 (`modeled-context-beats-connectors`) plus Karan Vaidya's counter-claim talk on scoped per-app swarm access. Every quote is verbatim from the talk's machine transcript (keeping ASR garbles intact), excluding prompt-bias tokens flagged in transcript headers.*

## MCP solved plumbing, not which source answers

At Netflix, Utkarsh Shrivastava found that connecting an assistant to thousands of employees' systems was the easy tip of the iceberg; the lasting asset is governed **company context**:

> “The company context is the key here.”
> — Utkarsh Shrivastava, 00:02:11

> “The M C Ps have made it very cheap to make a lot of information accessible, but.”
> — Utkarsh Shrivastava, 00:06:49

When two live connectors returned conflicting viewer counts for the same event (analytics vs. transactional store), neither tool was broken—the missing layer was organizational ownership deciding which source answers:

> “You would be very disappointed, but the tool was never wrong.”
> — Utkarsh Shrivastava, 00:04:40

> “Is another way for the agent to choose wrong.”
> — Utkarsh Shrivastava, 00:04:40

## Model the warehouse and map it with an agent schema

George Fraser (Fivetran) argues data teams already solved this once for business intelligence. Pointing agents at raw operational connectors fails immediately on cross-system questions because per-app MCPs cannot join data:

> “And you can't even do joins across sources, right?”
> — George Fraser, 00:07:04

Instead, teams connect agents to modeled warehouse tables and add a compact `AGENTS` schema describing tables, columns, and valid joins:

> “They are using as a source of truth for AI agents for questions about data.”
> — George Fraser, 00:03:18

> “Local tables in a special schema, a map of the rest of the database that acts as a guide.”
> — George Fraser, 00:11:18

## One permission-filtered index and use-case tools

Aamir Shakir (Mixedbread) quantifies the cost of per-tool MCP sprawl: every connector brings its own search semantics, latency, and rate limits, forcing the model to guess where knowledge lives:

> “Like getting the right data and access to data is actually the bottleneck, and not intelligence.”
> — Aamir Shakir, 00:03:12

> “We always say you are only as good as your data, but in this case, you're only as good as your weakest connector.”
> — Aamir Shakir, 00:04:07

In a banking deployment, replacing per-tool guessing with one pre-indexed, ACL-tagged search layer lifted answer accuracy from ~40% to 97%:

> “The answer accuracy jumped from very forty percent to ninety-seven percent”
> — Aamir Shakir, 00:14:19

Arsalan Bashir (Sentry) makes the matching API move: organize tools by user outcome rather than 1:1 backend endpoints so deterministic code absorbs ID translation, pagination, and joins (`00:03:01`), while Devin Gupta (Parallel) pairs retrieval with inline citations so users can verify facts directly (`00:05:45`).

## Codebases, specs, and trajectories as live context

Context extends beyond databases into code and execution artifacts. Lauren Tan (SpaceXSI / xAI) warns that every workaround left in a repository becomes a template for the next coding agent (`00:04:26`); Ankit Jain (Aviator) captures *intent* alongside changes so rationale stays legible (`00:08:38`); Thariq Shihipar separates an agent-built engine from a linted, English-like spec folder that preserves human ground truth (`00:13:27`); and Fabian Hedin (Lovable) treats task history as an append-only Git-like trajectory rendered cleanly per model (`00:06:56`).

## Curated memory: reflections, scoring, and dreaming

Long-running agents must accumulate knowledge across sessions without poisoning future runs. Monaco promotes customer learnings via **reflections** (`00:10:23`); Overcut runs background retrospectives that **score** memories so only high-signal context returns (`00:07:30`); and Lance Martin (Anthropic) shows how **dreaming** resolves the tension between greedy in-session notes and globally coherent wikis:

> “Dreaming lets you reflect over transcripts and these written notes, and re-represent them.”
> — Lance Martin, 00:12:13

## Fault lines: aggressive pruning and scoped app access

Two counter-claims sharpen the boundary. First, Steve Yegge warns that append-only memory rots because agents treat every note as law and never delete:

> “So you just gotta go in there and just aggressively slash the crap out of it.”
> — Steve Yegge, 00:10:42

Second, Karan Vaidya (Composio) reminds builders that knowledge-work swarms acting across live SaaS apps still need broad, granularly scoped per-app access and firewalls when action—not read-only BI—is the job (`00:05:49`).

<div class="reading"><b>For TheFocus.AI:</b> Never hand a client agent 20 raw SaaS MCPs and hope it picks right. Start by modeling one authoritative warehouse or ACL-indexed search layer, wrap cross-system workflows in deterministic use-case tools, and pair append-only session logs with periodic memory scoring, dreaming, and aggressive pruning.</div>
