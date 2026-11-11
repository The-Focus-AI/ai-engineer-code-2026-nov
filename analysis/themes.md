# Themes

Generated 2026-11-10T19:31:01-05:00 by `conference-themes` from the claims `talk-insights` extracted. Every citation points at a `### HH:MM:SS` heading in a filed transcript.

## Corpus

6 recorded talks, 23,252 words of transcript (Qwen3-ASR), 36 claims. All on Tue 10 Nov, Continental 1–3.

- [Building a Shared AI Assistant: The Platform Challenges Beyond MCP](../talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/transcript.md): Connecting company data to a shared AI assistant is now cheap; the platform's real job is deciding which source answers, who owns that answer, and how hard to gate by stakes, with evals in CI and company context as the lasting investment.
- [Building World-class Agentic GTM: Learnings from Monaco for Monaco](../talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/transcript.md): A vertical AI company is a shared harness (data, an agent workspace with memory, expert-guided workflows and evaluation) plus domain nuance, and it wins by putting its best domain experts inside the product, because correctness is whatever those experts say it is.
- [What It Takes to Run a Company on Agent Swarms](../talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/transcript.md): Running agent swarms across a company means giving each one scoped access to every app it needs and a firewall on what goes in and what it does, because attackers already use agents.
- [One team's path to trusting AI generated code](../talks/2026-11-10-one-teams-path-to-trusting-ai-generated-code/transcript.md): Once AI writes most of the code, a team should stop reviewing diffs and instead capture intent, decisions and evidence, owning the rules that verify the code rather than the code itself.
- [The True Cost of AI Coding](../talks/2026-11-10-scott-tolinski-co-host-syntax/transcript.md): AI coding's compulsive pull and the decisions it demands are wearing developers out, and the remedy is habits and limits, not more tools.
- [The new job of the data team is providing context to AI](../talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/transcript.md): The data stack built for business intelligence is now the context layer for AI, so data teams should connect agents to modeled warehouse data rather than wiring them to every source system.

## Themes

### Context for AI

**AI does its best work on context people have already curated (the intent captured in a session, modeled data, a map of the database), not on raw systems.**

George Fraser's companies connect their agents to the same modeled data stack that serves BI, simplify messy data for them, and give them an agent schema as a map. Ankit Jain captures a change's intent and acceptance criteria from the agent session rather than writing specs. Utkarsh Shrivastava calls the AI tool the tip of the iceberg and puts Netflix's lasting investment in the company context beneath it: enterprise skills and MCP servers. In each, the useful input is something a person already shaped. Mihail Eric seeds Monaco's agent memory from sales emails, call transcripts and onboarding context, then promotes what the agents learn back into it.

Talks: 4. Also called: agent schema, company context, context engineering, intent, memory, reflections, source of truth.

- Intent and acceptance criteria, captured from the agent session, replace hand-maintained specs that go stale. “Intent is why are we making whatever change.” — [One team's path to trusting AI generated code](../talks/2026-11-10-one-teams-path-to-trusting-ai-generated-code/transcript.md) 00:08:38
- The AI tool a company adopts is the tip of the iceberg and changes fast; the lasting investment is the company context beneath it: enterprise skills, MCP servers and the harness. “The company context is the key here.” — [Building a Shared AI Assistant: The Platform Challenges Beyond MCP](../talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/transcript.md) 00:02:11
- Leading companies connect their AI agents to the same modeled data stack that already serves business intelligence. “They are using as a source of truth for AI agents for questions about data.” — [The new job of the data team is providing context to AI](../talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/transcript.md) 00:03:18
- Modeling data into a simplified view is what makes it usable by AI, exactly as it was for human analysts. “You're presenting a simplified view of what is probably some very messy and complicated data.” — [The new job of the data team is providing context to AI](../talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/transcript.md) 00:05:23
- Agents need a map: a small agent schema inside the database that describes the rest of it. “Local tables in a special schema, a map of the rest of the database that acts as a guide.” — [The new job of the data team is providing context to AI](../talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/transcript.md) 00:11:18
- The memory system is seeded from emails, call transcripts and onboarding context, and a reflection process promotes what agents learn about users and organisations back into it, so the system changes daily. “This is where we developed a concept called reflections” — [Building World-class Agentic GTM: Learnings from Monaco for Monaco](../talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/transcript.md) 00:10:23

Uncontested: No talk argues agents do better on raw systems than on curated context; whether to reach company data through each app is recorded separately as contested.

### Guardrails people own

**Agents are trusted through guardrails that people own (rules that check their output, scoped access, and a firewall on what goes in and what they do) rather than by people reading what they produce.**

Ankit Jain mines years of review comments into rules with owners and turns some into deterministic checks, so people own the rules instead of the code. Karan Vaidya gives agents broad but granular access to each app and puts a firewall on both their inputs and their actions. Utkarsh Shrivastava has Netflix's domain teams run a regression eval suite in CI before any new connector or model change, and scales the gate with the stakes, from reads to irreversible writes. All three replace line-by-line supervision with controls a named person or team maintains. Mihail Eric goes further for vertical AI: there is no absolute correctness, so in-house domain experts define what good looks like and evaluations follow them.

Talks: 4. Also called: evals in CI, experts define correctness, firewall for agents, gates by stakes, invariants, own the rules.

- Mining past review comments yields rules (invariants) with owners, and some of them become deterministic checks. “Out of 200 candidates, we got 64 rules automatically created.” — [One team's path to trusting AI generated code](../talks/2026-11-10-one-teams-path-to-trusting-ai-generated-code/transcript.md) 00:10:17
- Humans stay accountable by owning the rules and guardrails that verify code, not the lines of code. “So instead of thinking about owning the code. Own the guardrails. Own the rules.” — [One team's path to trusting AI generated code](../talks/2026-11-10-one-teams-path-to-trusting-ai-generated-code/transcript.md) 00:17:18
- Agents need broad reach across the company's apps but granular, scoped access to each one. “So to be able to do that correctly, you need to give right amount of access to all of these agents.” — [What It Takes to Run a Company on Agent Swarms](../talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/transcript.md) 00:05:49
- Agents need a firewall on both what goes into them and what actions they take. “In case of non-deterministic agents, you want something similar protecting.” — [What It Takes to Run a Company on Agent Swarms](../talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/transcript.md) 00:07:15
- Domain teams should run a regression eval suite in CI on every change and model switch, starting from 20–50 real use cases, before adding a skill, plugin or connector. “And then finally, start with a solid twenty to fifty use cases.” — [Building a Shared AI Assistant: The Platform Challenges Beyond MCP](../talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/transcript.md) 00:09:03
- Gates should scale with stakes: reads are low risk, reversible writes higher, and irreversible actions like sending email or publishing numbers highest. “For reversible writes, the stakes are higher than read.” — [Building a Shared AI Assistant: The Platform Challenges Beyond MCP](../talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/transcript.md) 00:16:05
- In vertical AI correctness is contextual and defined by subject matter experts, so evaluations are set by in-house experts and every agent run is traced; traces are treated as gold. “Absolute correctness is only correctness informed by subject matter experts.” — [Building World-class Agentic GTM: Learnings from Monaco for Monaco](../talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/transcript.md) 00:17:41

Uncontested: No talk argues for trusting agent output unchecked or for returning to line-by-line review.

### Decision load

**As agents take over the work, the decisions left to people become the scarce, tiring part, so teams record them, queue them for a person, and keep them few enough to make well.**

Across the talks, agents do more of the doing and people are left with the deciding. Ankit Jain finds that human review comments were mostly about decisions and has agents argue so the decisions surface and get written down. Karan Vaidya's security agents queue uncertain findings for a person to judge in the morning. Scott Tolinski's survey shows the cost: running many agents multiplies the decisions and wears people out, and fewer agents in parallel helps.

Talks: 3. Also called: decision fatigue, micro decisions, human judgment.

- Human review comments are mostly about decisions, not bugs or correctness. “Most of the comments that humans are providing are actually not about bugs or correctness. It's about decisions.” — [One team's path to trusting AI generated code](../talks/2026-11-10-one-teams-path-to-trusting-ai-generated-code/transcript.md) 00:00:29
- A coding agent and a review agent with opposing goals should argue first, and every disagreement should be recorded as a decision. “Everything that they disagree about, we should write it down.” — [One team's path to trusting AI generated code](../talks/2026-11-10-one-teams-path-to-trusting-ai-generated-code/transcript.md) 00:07:08
- Security agent swarms watch company activity around the clock and queue uncertain findings for a person to judge in the morning. “And it's running twenty four into seven, so engineers can somewhat sleep effectively while.” — [What It Takes to Run a Company on Agent Swarms](../talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/transcript.md) 00:01:56
- Running many agents at once multiplies the decisions a person must make and leads to decision fatigue. “Obviously, it's decision fatigue.” — [The True Cost of AI Coding](../talks/2026-11-10-scott-tolinski-co-host-syntax/transcript.md) 00:09:42
- Fewer agents in parallel, better habits and time away from screens are what help. “Less paralization makes for a calmer mind.” — [The True Cost of AI Coding](../talks/2026-11-10-scott-tolinski-co-host-syntax/transcript.md) 00:19:50

Uncontested: No talk argues decisions can be handed to agents outright; even Karan Vaidya's always-on agents route uncertain cases to a person.

### Connecting is not answering

**Connecting an AI to every source is now cheap, but it does not settle which source answers, so a connection per source produces wrong or conflicting answers unless something decides between them.**

George Fraser argues that wiring an assistant to each system of record through MCP fails for data questions because it cannot join across sources. Utkarsh Shrivastava reaches the same problem from inside Netflix: every connector is another way for the agent to choose wrong, two correct connectors gave different viewer counts for one event, and MCP made access cheap without settling who owns the answer. Fraser's fix is one modeled store; Shrivastava's is a platform that gates and arbitrates across domain-owned connectors.

Talks: 2. Also called: source collisions, MCP sprawl, which source answers.

- Two connectors gave different viewer counts for the same live event (analytics vs. live transactional data); both were right, so the failure is choosing between sources, not any one tool. “You would be very disappointed, but the tool was never wrong.” — [Building a Shared AI Assistant: The Platform Challenges Beyond MCP](../talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/transcript.md) 00:04:40
- Every connector or tool added to a shared assistant is another way for the agent to pick the wrong source. “Is another way for the agent to choose wrong.” — [Building a Shared AI Assistant: The Platform Challenges Beyond MCP](../talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/transcript.md) 00:04:40
- MCP made connecting data cheap but left the ownership question unresolved: nobody settled which team's answer is authoritative. “The M C Ps have made it very cheap to make a lot of information accessible, but.” — [Building a Shared AI Assistant: The Platform Challenges Beyond MCP](../talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/transcript.md) 00:06:49
- Connecting an assistant to each system of record through MCP fails for data questions, because it cannot join across sources. “And you can't even do joins across sources, right?” — [The new job of the data team is providing context to AI](../talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/transcript.md) 00:07:04

Counter-claims:

- Agents need broad reach across the company's apps but granular, scoped access to each one. “So to be able to do that correctly, you need to give right amount of access to all of these agents.” — [What It Takes to Run a Company on Agent Swarms](../talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/transcript.md) 00:05:49

### The vertical harness

**A domain AI product is a shared harness (data access, an agent workspace with memory, expert-guided workflows and evaluation) plus the domain expertise built into it, and that expertise, not the model or the tool, is what lasts.**

Mihail Eric describes the same building blocks under every vertical AI company, with Monaco's go-to-market knowledge layered on top, and splits workflows into ones Monaco's own sales experts design and ones customers build for their niche. Utkarsh Shrivastava makes the same cut inside Netflix: the AI tool is the tip of the iceberg, and the lasting investment is the company context, skills and harness beneath it.

Talks: 2. Also called: company context, domain workflows, GTM harness, vertical AI.

- Every vertical AI company builds the same harness: data access, an agent workspace with memory, expert-guided workflows and evaluation; what differs is the domain nuance layered on top. “there are principles and primitives that are true to any vertical company, vertical AI company.” — [Building World-class Agentic GTM: Learnings from Monaco for Monaco](../talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/transcript.md) 00:08:33
- Workflows come in two modes: opinionated ones Monaco builds from its own sales expertise, and custom agents customers build for their own niche through an agent builder. “you know better than we do how to sell to dentists in the Midwest” — [Building World-class Agentic GTM: Learnings from Monaco for Monaco](../talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/transcript.md) 00:15:00
- The AI tool a company adopts is the tip of the iceberg and changes fast; the lasting investment is the company context beneath it: enterprise skills, MCP servers and the harness. “The company context is the key here.” — [Building a Shared AI Assistant: The Platform Challenges Beyond MCP](../talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/transcript.md) 00:02:11

Uncontested: No talk argues the model or tool is the durable asset; Karan Vaidya's recording, which might have described his harness, misses the part of the talk on it.

## Contested

**Do the skills people built before AI carry over?**

- Coding skills fade with AI use, and much of what is lost no longer matters — [The True Cost of AI Coding](../talks/2026-11-10-scott-tolinski-co-host-syntax/transcript.md) 00:14:00
- The analytics skills data teams built are exactly what AI context needs — [The new job of the data team is providing context to AI](../talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/transcript.md) 00:26:44

**Should agents reach company data through each app or through one modeled store?**

- Through the modeled warehouse; a connection per source cannot join across sources — [The new job of the data team is providing context to AI](../talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/transcript.md) 00:07:04
- Through scoped access to each of the company's apps — [What It Takes to Run a Company on Agent Swarms](../talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/transcript.md) 00:05:49
- Through MCP servers each domain owns, behind a shared platform that gates access and decides which source answers — [Building a Shared AI Assistant: The Platform Challenges Beyond MCP](../talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/transcript.md) 00:06:49

## Singletons

Claims only one talk makes. Often the most distinctive part of a talk.

- Attackers already use agents, so defense has to run on agents too. — [What It Takes to Run a Company on Agent Swarms](../talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/transcript.md) 00:00:41
- SRE agents watch deploys and configuration changes and propose a rollback in Slack before an incident lands. — [What It Takes to Run a Company on Agent Swarms](../talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/transcript.md) 00:03:38
- Give each surface area one agent swarm, since several on the same surface conflict. — [What It Takes to Run a Company on Agent Swarms](../talks/2026-11-10-from-coding-agents-to-knowledge-work-agents/transcript.md) 00:09:39
- Code review exists to build a team's shared mental model, and line-by-line review of large AI diffs no longer does that. — [One team's path to trusting AI generated code](../talks/2026-11-10-one-teams-path-to-trusting-ai-generated-code/transcript.md) 00:02:56
- Half of surveyed developers keep prompting past the point they meant to stop, and it costs them sleep. — [The True Cost of AI Coding](../talks/2026-11-10-scott-tolinski-co-host-syntax/transcript.md) 00:04:51
- Prompting works like a variable reward, which is what makes it hard to put down. — [The True Cost of AI Coding](../talks/2026-11-10-scott-tolinski-co-host-syntax/transcript.md) 00:06:32
- Most developers feel pressure to produce more simply because AI makes it possible. — [The True Cost of AI Coding](../talks/2026-11-10-scott-tolinski-co-host-syntax/transcript.md) 00:07:54
- Coding skills fade with AI use, but the brain forms new paths and much of what is lost no longer matters. — [The True Cost of AI Coding](../talks/2026-11-10-scott-tolinski-co-host-syntax/transcript.md) 00:14:00
- Keeping structured data, unstructured text and vector indexes in one database lets an agent write hybrid queries. — [The new job of the data team is providing context to AI](../talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/transcript.md) 00:14:29
- The skills data teams built for analytics are the skills that make them good at providing context to AI. — [The new job of the data team is providing context to AI](../talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/transcript.md) 00:26:44
- As software becomes a commodity, go-to-market is one of the few remaining sources of advantage, and Monaco's product is world-class go-to-market knowledge and procedure. — [Building World-class Agentic GTM: Learnings from Monaco for Monaco](../talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/transcript.md) 00:05:43
- Monaco sells Monaco with Monaco, embeds its best salespeople in the product team and makes traces visible to everyone, closing the gap between domain experts and engineers. — [Building World-class Agentic GTM: Learnings from Monaco for Monaco](../talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/transcript.md) 00:20:57

## Limits

- Six talks, all from one room on one day. The themes are a first map, not the conference's.
- Karan Vaidya's recording covers only the last 11 minutes of his talk, so his opening (how harnesses moved from code to knowledge work) is missing.
- Transcripts are local Qwen3-ASR with misheard words kept as transcribed; prompt insertions ("Databricks" in Scott Tolinski's, "At Composio" in George Fraser's, "Google DeepMind" in Utkarsh Shrivastava's, "Sonar" and "Netflix" in Mihail Eric's) are flagged in each transcript and never quoted here.
- Clustering used only the extracted claims, not the full transcripts; an argument a talk made but the extraction missed cannot appear.
- The Monaco talk was first filed from a garbled Voice Memos transcript and re-extracted from its Qwen transcript once the machine was on power; its claims now quote the Qwen text.
