---
title: "Delete the harness, harden the runtime"
kind: through-line
status: draft
theme_id: delete-the-harness-harden-the-runtime
reader: "Will and his clients at TheFocus.AI: which agent scaffolding to delete every model release, and where to invest instead (fast sandboxes, semantic tools, deterministic guardrails, and one shared public agent)"
talks:
  - talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/story.md
  - talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/story.md
  - talks/2026-11-11-2026-in-llms/story.md
  - talks/2026-11-11-all-code-is-slop-except-mine/story.md
  - talks/2026-11-11-cloudflare-is-a-neolab/story.md
  - talks/2026-11-11-how-to-build-an-agent-that-builds-the-culture/story.md
  - talks/2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/story.md
  - talks/2026-11-11-software-factories-escape-from-trash-mountain/story.md
  - talks/2026-11-11-what-will-you-build-when-ai-is-10x-faster/story.md
  - talks/2026-11-12-a-company-built-around-the-agent/story.md
  - talks/2026-11-12-brownfield-factories/story.md
  - talks/2026-11-12-exploring-claudes-frontier/story.md
  - talks/2026-11-12-jarred-sumner-founder-of-bun-anthropic-bun/story.md
  - talks/2026-11-12-judgement-is-the-last-job/story.md
  - talks/2026-11-12-let-the-agent-cook-from-apis-to-answers/story.md
  - talks/2026-11-12-thariq-shihipar-independent/story.md
  - talks/2026-11-12-the-first-grounded-decision-model/story.md
---

# Delete the harness

Across 15 talks and 30 claims at the AI Engineer Code Summit—tested against four sharp counter-claims—the same pattern surfaces from lab engineers, infrastructure founders, and production engineering teams: **the scaffolding you built for last year's model is now slowing this year's model down.**

Every six months, post-training absorbs the orchestration crutches engineers wrote to babysit weaker models: step-by-step prompt choreography, pre-classified intent routers, pre-fetched schemas, and bespoke file-editing wrappers. The durable engineering work moves beneath and around the model—into millisecond sandboxes, non-overlapping semantic tools, low-latency tool execution, deterministic code checks, and a single shared organizational agent whose public traces compound taste across teams.

*Framing note: this synthesis draws on 30 claims and 4 counter-claims indexed by `conference-themes` across 15 assigned talks plus 2 counter-claim talks. All quotes are verbatim single-span substrings from each talk's local Qwen3-ASR 1.7B transcript, preserving ASR quirks without quoting prompt-bias tokens.*

## 1. The bitter lesson eats the harness

Philipp Schmid (Google DeepMind) opens with Rich Sutton's Bitter Lesson: post-training optimizes for outcomes rather than obeying hand-wired tool paths (`00:00:13`, `00:01:58`). Rebuilding the Gemini agent harness every six months exposed that 90% of custom tools, planners, and memory wrappers had turned into pure overhead—often collapsing cleanly into a single `bash` tool inside a sandbox where the model writes inline Python scripts on demand (`00:03:20`, `00:04:31`, `00:11:39`).

> “General methods that leverage computations are ultimately the most effective by a large margin”
> — Philipp Schmid, 00:00:13

Justin McCarthy (Diffusion) sees the same trajectory in brownfield factories (`00:08:09`): skills get shorter and harnesses get more general simply because frontier models improve. Steve Yegge warns what happens when teams refuse to delete (`00:01:59`): yesterday's overbuilt factory turns into "garbage mountain" that the next generation has to burn down. Ishaan Dey (Google DeepMind) states the design corollary (`00:04:35`): assumptions built for weaker models decay rapidly, so teams have to rebuild foundations rather than piling on features.

## 2. Swap per-API wrappers for semantic tools and plain primitives

At Sentry, Arsalan Bashir learned that pre-classifying user intent and pre-fetching schemas created blind spots that broke on every new model release (`00:05:18`). Consolidating overlapping per-API tools into coarse, use-case-oriented interfaces—or letting the model write code via programmatic tooling (`00:03:01`)—made the agent **4× faster while cutting token usage by 30%** (`00:08:07`).

> “The agent only got four times faster, but also used 30 percent.”
> — Arsalan Bashir, 00:08:07

Push that simplification further and coordination itself shrinks to commodity primitives. Lance Martin (Anthropic) ran 1,000 autonomous agents on formalizing Fermat's Last Theorem with no custom orchestration harness—only isolated sandboxes, `git`, and a shared SQL database (`00:02:06`). Jarred Sumner (Anthropic / Bun) reached the same conclusion rewriting Bun's ahead-of-time compiler: after initial bulk code generation, long-lived subagents holding deep codebase context outperformed rigid classical workflows (`00:14:51`), while Simon Willison notes that Fable-class models brute-force hard problems once given clear goals and tools (`00:08:02`).

## 3. Harden the runtime when inference gets 10× faster

Deleting scaffolding moves the bottleneck straight into execution infrastructure. Natalie Serrino (Gimlet Labs) notes that a 63-second median coding agent turn shatters human flow past the 10-second threshold (`00:01:02`, `00:02:57`). At 10× faster inference, agents move onto the live critical path—e.g., blocking malicious uploads inline (`00:12:18`)—yet her counter-claim warns that tool execution jumps from **18% to 67%** of turn time (`00:10:37`). Fast sandboxes, fast tool calls, and hybrid System One routing—such as Cloudflare's Clef cutting five LLM calls to one with 94% fewer tokens (`00:14:06`), or Parallel's sub-second grounded decisions at $1 per 1,000 requests (`00:03:01`)—become the new performance frontier.

## 4. One shared company agent with public traces

When every engineer maintains bespoke dotfiles, prompts, and MCP recipes, Zach Bruggeman (Ramp) points out that companies lose days to duplicated rote tuning (`00:03:29`). Ramp converged on a single shared `Inspect` agent with every session public by default (`00:05:14`, `00:05:38`), killing information silos (`00:04:25`) so good habits propagate by example without training mandates. Quinn Slack (Amp) pushed the same pattern across the whole company—eliminating Jira, sprint trackers, and separate support tools so engineering and customer work live in shared agent threads (`00:08:04`). Utkarsh Shrivastava (Netflix) reinforces why (`00:02:11`): the chat client is the tip of the iceberg, while shared company context underneath is the lasting asset.

## 5. Counter-claims: what you must not delete

Four counter-claims mark the exact boundary where "delete everything" goes too far:

1. **Do not replace code constraints with prose rules:** Lauren Tan (SpaceXSI / xAI) argues against stuffing fixes into `AGENTS.md` or rules files—encode every agent correction into deterministic APIs, types, and lint rules (`00:02:55`).
2. **Models meet humans in a "smooth interior":** Thariq Shihipar pushes back against the fear that alien models force everyone into bare Bash CLIs (`00:01:40`); pairing agent-owned engines with linted human-readable specs preserves creative control.
3. **Vertical nuance still lives in domain workflows:** Mihail Eric (Monaco) shows that while vertical AI shares a generic chassis, domain expertise, expert-scored traces, and customer agent builders cannot be deleted (`00:08:33`, `00:15:00`, `00:20:57`).
4. **Runtime and infra bets still face model gravity:** Michelle Chen (Cloudflare) notes that Workers AI initially bet models would shrink for edge latency, before trillion-parameter scaling shifted the win to pairing edge System One models with frontier LLMs (`00:04:24`).

## 6. Playbook for TheFocus.AI

For **TheFocus.AI** and client engineering teams, the lesson is an explicit **six-month harness audit**: benchmark your baseline, strip prompt choreography and one-to-one API wrappers down to semantic tools or `bash`, measure speed and token deltas, reinvest saved engineering hours into fast sandboxes and deterministic checks, and standardize on one shared team agent with visible traces.
