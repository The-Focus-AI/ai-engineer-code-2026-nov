---
title: "Judgement is the Last Job: Tools Scale with Intelligence, Taste Decides What Ships"
speakers: "Ishaan Dey (Google DeepMind)"
duration: "13:23"
source: transcript.md
video: "https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22110s"
themes: [judgment-when-code-is-free, ambition-is-the-limit, decision-load, less-harness-more-model]
reader: "Will and his clients: how to rebuild workflow assumptions as models jump in capability, turn products into extensible platforms for ambition, and protect human taste when building becomes instant"
built_from_notes:
  - notes/inbox/2026-11-12T1458-will-we-be-able-to-judge-taste.md
  - notes/inbox/2026-11-12T1500-try-agent-swarms.md
  - notes/inbox/2026-11-12T1501-ambition-is-not-doing-more.md
  - notes/inbox/2026-11-12T1504-rebuild-your-foundations.md
  - notes/inbox/2026-11-12T1505-rewrite-the-slideshow-in-rust.md
built_from_photos: 2
notes_frame:
  spine: "judgment and taste under instant creation (notes 1458, 1501, 1505 + judgement slide photo): when anything can be generated in seconds, deciding what 'better' means is the only durable human edge"
  clusters:
    - "Taste & judgment when building flips from expensive to instant (note 1458, photo PXL_20261112_225737866.jpg)"
    - "Agent swarms & tools scaling with intelligence (note 1500)"
    - "Ambition ≠ doing more; rebuild foundations in the right window (notes 1501, 1504)"
    - "Extensible platforms for user ambition (photo PXL_20261112_230825038.jpg)"
    - "Resisting blind defaults and protecting cognitive load (notes 1458, 1505)"
  skipped: "The recording opens mid-sentence at 00:00:00; internal YouTube video-decoder and memory-optimization examples at 00:11:58 are folded into Chapter 4"
key_points:
  - "Because anything can now be built in seconds, the bottleneck flips from upfront implementation cost to taste and knowing what is worth building (00:00:39)"
  - "As models grow smarter, prescriptive turn-by-turn scaffolding becomes obsolete—teams must rebuild foundations around intent and agent swarms rather than adding more steps (00:02:57, 00:04:35)"
  - "Extensible platforms let users build personal and team software (dashboards, visual demo tools, science plugins) whose best patterns feed back into the core product (00:06:36)"
  - "An agent will happily over-engineer or 'rewrite the whole slideshow in Rust'; human judgment defines what 'better' means, cuts cognitive load, and refuses to stop at the first working draft (00:08:50)"
kind: talk-story
status: draft
---

# Judgement is the last job

Shipping Antigravity inside Google DeepMind to more than 100,000 internal users (`00:02:12`), Ishaan Dey argues that instant software creation flips the engineering bottleneck (`00:00:39`). When a sentence can spin up an app or an agent swarm, competitive advantage shifts away from generating output toward rebuilding obsolete foundations (`00:04:35`), giving users an extensible platform for ambition (`00:06:36`), and exercising human judgment over what *better* actually means (`00:08:50`).

*Framing note: this story is framed from five inbox notes and two slide photos taken in the room (`PXL_20261112_225737866.jpg` and `PXL_20261112_230825038.jpg`). Quotes preserve the local Qwen3-ASR 1.7B machine transcription verbatim, including `"anti-gravity"` / `"anti gravity"` / `"Edge grabbing"` / `"I Google"` (Antigravity / at Google), `"artificial seeing intelligence"` (artificial general intelligence), `"building a deep model"` (building at DeepMind), `"agents form"` / `"sensibility system"` (agent swarms / extensibility system), and `"anthropometry"` (Antigravity). Tokens flagged in the transcript header as transcription-prompt bias (`"Google DeepMind"` at `00:02:12` and `"Anthropic"` at `00:02:40`, `00:09:42`, `00:12:32`) are never quoted. `"From the notes"` and `"The reading"` boxes are editorial synthesis, not the speaker's words.*

## When building becomes instant, taste becomes the bottleneck

For decades, software engineering front-loaded specification and design because implementation consumed enormous time and money (`00:00:39`). That economic constraint has flipped: if an engineer or designer can materialize a working prototype immediately, try it, and feel where it fails, upfront speculation gives way to rapid empirical iteration (`00:00:39`).

> “Because building was expensive, it took a lot of time, effort, and resources. So we ideated more and invested more in that phase.”
> — 00:00:39

Yet instant creation introduces a trap (`00:00:39`). On his opening *Judgement* slide (`PXL_20261112_225737866.jpg`), Dey contrasts three lenses on taste—Mitchell Hashimoto ("making high-quality qualitative judgments where no objective metric exists"), Karri Saarinen ("judgment built through experience under constraint"), and Paul Graham—against Nan Yu's provocation that most people may not even have better taste than a frontier model. Dey's warning is sharper: speed makes it dangerously tempting to stop thinking (`00:00:39`).

> “This is exciting. But it's also a little bit deceptive. It's easier than ever to just turn our brains off and blindly accept what's made for us.”
> — 00:00:39

**Key points**

- Instant prototyping reverses the traditional waterfall of long upfront ideation before touching working software (`00:00:39`).
- When anyone can generate working software on demand, deciding *what* is worth making replaces *how* to code it as the scarce skill (`00:00:39`).
- The hidden failure mode of cheap generation is passive acceptance—shipping the first plausible artifact without interrogating it (`00:00:39`).

<div class="reading"><b>From the notes:</b> “I wonder if we will be able to judge taste.” (<code>2026-11-12T1458-will-we-be-able-to-judge-taste.md</code>). <b>The reading:</b> Dey answers the operator’s question by splitting taste from passive preference: taste is not aesthetics in isolation, it is refusing to stop at the model’s first output and iterating against how a product actually feels to real users.</div>

**Visual:** photo `photos/PXL_20261112_225737866.jpg` (his *Judgement* slide juxtaposing Mitchell Hashimoto, Karri Saarinen's *Against "Against Taste"*, Paul Graham's `taste.html`, and Nan Yu's provocation on AI taste)

## Tools scale with intelligence: from single turns to agent swarms

Building inside DeepMind close to frontier research lets the Antigravity team design interfaces for the next capability jump and validate them across more than 100,000 internal Google builders (`00:02:12`). The first recurring lesson is that product ceilings rise alongside model intelligence (`00:02:57`). Earlier models could produce impressive artifacts like whole operating systems, yet they required rigid, prescriptive scaffolding so they would not drift (`00:02:57`).

> “At the time, it was awesome. You create operating systems and really cool things we've never seen before. But it was also pretty prescriptive because the models needed at the time.”
> — 00:02:57

As models improved at communicating with and orchestrating one another, those guardrails could relax (`00:02:57`). Inside Antigravity, that shift shows up as native agent swarms—multiple agents coordinating on ambitious tasks without brittle step-by-step choreography (`00:02:57`).

> “There's more agents working together, and we're able to relax the constraints to achieve more.”
> — 00:02:57

**Key points**

- Capability jumps constantly move the target of what products can deliver, lifting the ceiling on user ambition (`00:02:57`).
- Early multi-agent workflows needed heavy prescriptive harnesses; stronger reasoning lets teams loosen constraints (`00:02:57`).
- Agent swarms in Antigravity already generate significant internal leverage across Google (`00:02:57`).

<div class="reading"><b>From the notes:</b> “Agent swarms seem like something more we can use, which we haven't tried yet.” (<code>2026-11-12T1500-try-agent-swarms.md</code>). <b>The reading:</b> Note the timing—unlike earlier rigid multi-agent pipelines, modern swarms work because models can now coordinate peer-to-peer without micromanaged turn scripts, echoing Claude’s self-organizing theorem-proving swarm and Bun’s long-lived subagents.</div>

**Visual:** diagram “Tools scale with intelligence: prescriptive single-agent harnesses give way to relaxed-constraint agent swarms as model coordination improves”

## Ambition is not adding more: rebuild your foundations

The second lesson counters a common builder reflex (`00:04:35`). When workflows grew from small, turn-based file edits into asynchronous background tasks and external triggers, teams kept bolting controls onto old turn-by-turn scaffolding (`00:04:35`). Dey argues that true ambition means deleting assumptions made for weaker models and passing user intent directly (`00:04:35`).

> “Evolving with intelligence is a little bit tricky because being ambitious does not always mean adding more.”
> — 00:04:35

> “Maybe a better pattern looks like. Treating the agent more as an entity that can make better decisions, and giving it user intent immediately, just like this.”
> — 00:04:35

Every architectural choice sits inside a narrow temporal window (`00:04:35`). Build for last year's model limits and your harness is instantly obsolete; build too far ahead of current reliability and the product becomes an impractical demo (`00:04:35`). Staying in the sweet spot requires deliberately tearing down and rebuilding foundations (`00:04:35`).

> “To create the most value, challenge your past assumptions, and rebuild your foundations to create good systems that scale with intelligence.”
> — 00:04:35

**Key points**

- Progressive context feeding and rigid step queues made sense for weaker models, yet choke smarter autonomous agents (`00:04:35`).
- Give capable agents direct user intent and let them decide whether to delegate to worker swarms or sequence follow-ups (`00:04:35`).
- Product architecture lives in a three-part window—obsolete past, practical present, impractical future—requiring periodic foundation resets (`00:04:35`).

<div class="reading"><b>From the notes:</b> “Being ambitious != doing more.” (<code>2026-11-12T1501-ambition-is-not-doing-more.md</code>) and “Rebuild your foundations.” (<code>2026-11-12T1504-rebuild-your-foundations.md</code>). <b>The reading:</b> This bridges the conference’s “Ambition is the limit” and “Less harness, more model” themes: genuine ambition is stripping out obsolete turn-based plumbing rather than piling on features for yesterday’s model.</div>

**Visual:** diagram “The three-window build horizon: too far in the past (obsolete) vs. right time window (rebuild foundations around intent) vs. too far in the future (impractical)”

## Build a platform for ambition so user extensions feed the core

Once foundations shift to intent, the product itself changes shape (`00:06:36`). Rather than shipping a single deterministic workflow, Antigravity acts as a platform where users generate leverage for themselves—designers letting agents explore hundreds of layouts broadly before zooming in, personal dashboards aggregating bug reports and user feedback, shared visual demo tools for design teams, and internal Google science plugins (`00:06:36`).

> “Users can create their own leverage and make room for their own ambition.”
> — 00:06:36

Crucially, extensibility is not just a user perk; it is product R&D (`00:06:36`). Antigravity's agent swarm capability itself originated as an internal plugin built on its extensibility surface before graduating into the core product (`00:06:36`, `PXL_20261112_230825038.jpg`), alongside internal wins ranging from YouTube video decoders to memory optimizations (`00:11:58`).

> “Let your users be ambitious, and watch it feed back into your product. To create more value for everyone.”
> — 00:06:36

**Key points**

- Software shifts from a fixed deterministic pipeline to an extensible surface for personal, team, and domain-specific software (`00:06:36`).
- User-built extensions act as live discovery for core product capabilities—Antigravity's `/swarm` began as an extensibility plugin (`00:06:36`).
- Broadening exploration (hundreds of candidate visualizations before committing) pairs naturally with deep human selection (`00:06:36`).

<div class="reading"><b>From the slide:</b> Antigravity’s feature ring (<code>PXL_20261112_230825038.jpg</code>) places <code>Plugin Marketplace</code>, <code>/swarm</code>, <code>MCP Apps</code>, <code>Orchestrator</code>, <code>Remote Agents</code>, <code>Auto Mode</code>, <code>Browser Use</code>, <code>Voice Mode</code>, <code>SSH</code>, <code>Gemini 4 Carbon</code>, and <code>Gemini 4 Hydrogen</code> around one core—showing how extensibility and agent runtime reinforce each other.</div>

**Visual:** photo `photos/PXL_20261112_230825038.jpg` (his Antigravity capability wheel uniting `Plugin Marketplace`, `/swarm`, `Orchestrator`, `MCP Apps`, `Browser Use`, `Remote Agents`, `Gemini 4 Carbon`, and `Gemini 4 Hydrogen`)

## Protect human judgment: don't accept the Rust rewrite

In his closing principle (`00:08:50`), Dey asks what remains for software engineers when factories automate building, verification, and deployment. His answer is blunt: an unguided agent optimizes for *more*, not *good* (`00:08:50`). Ask an agent to improve a presentation and it might flood slides with dashboards—or rewrite the whole deck in Rust (`00:08:50`).

> “If I ask an agent to say make this slide better. Maybe it'll add some visualizations and a bunch of dashboards and cool colors and everything. Maybe it'll rewrite the whole slideshow in Rust. So, it'll solve every problem. But does every problem need to be solved?”
> — 00:08:50

When redesigning Antigravity's own Agent Manager (`00:08:50`), an agent asked to "make it better" would dump every tool call and add endless knobs. Human judgment went the opposite direction: strip away walls of text, surface only the agent's latest semantic state, and lower cognitive load so builders can steer multiple workstreams calmly (`00:08:50`).

> “Just because you're finished creating something first, which can be done in an instant. It doesn't actually mean you're done. Think about what you're actually trying to achieve and how the thing you're making feels.”
> — 00:08:50

> “Agents might be doing more and more, but it's also more important than ever to solve real problems and use good prompting. Protect your judgment. And build things that people want. Thank you.”
> — 00:12:59

**Key points**

- Agents equate "better" with adding knobs, dashboards, and gratuitous rewrites unless humans define what actually matters (`00:08:50`).
- Good interface judgment often subtracts information—replacing raw tool-call logs with semantic progress to protect human cognitive load (`00:08:50`).
- Use instant generation to explore broadly, then slow down, evaluate how the product feels, and go deep on the right direction (`00:08:50`, `00:12:59`).

<div class="reading"><b>From the notes:</b> “Maybe it will rewrite the whole slideshow in Rust.” (<code>2026-11-12T1505-rewrite-the-slideshow-in-rust.md</code>) and “I wonder if we will be able to judge taste.” (<code>2026-11-12T1458</code>). <b>The reading:</b> Paired with Dexter Horthy’s warning on asymmetric slop and Jarred Sumner’s decision <em>not</em> to rewrite Claude Code in Rust, Dey shows what taste looks like operationally: knowing which problems should never be solved at all.</div>

**Visual:** quote “If I ask an agent to say make this slide better. Maybe it'll add some visualizations and a bunch of dashboards and cool colors and everything. Maybe it'll rewrite the whole slideshow in Rust. So, it'll solve every problem. But does every problem need to be solved?” (00:08:50)
