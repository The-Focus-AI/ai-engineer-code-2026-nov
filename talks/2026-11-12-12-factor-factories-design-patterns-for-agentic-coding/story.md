---
title: "Loops are forward pressure plus backpressure: 12-factor factories and the war on slop"
speakers: "Dexter Horthy (HumanLayer / Factory)"
duration: "20:44"
source: transcript.md
video: "https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=29720s"
themes: [guardrails-people-own, judgment-when-code-is-free, decision-load]
reader: "Will and his clients: how to wire an agentic software factory around forward and backward pressure without letting unattended models turn a long-lived codebase into slop"
built_from_notes:
  - notes/inbox/2026-11-12T1658-factories-were-the-hype-3-months-ago.md
  - notes/inbox/2026-11-12T1700-pre-ai-software-factory.md
  - notes/inbox/2026-11-12T1702-forward-and-backward-pressure.md
  - notes/inbox/2026-11-12T1703-loops-are-forward-plus-backpressure.md
  - notes/inbox/2026-11-12T1705-look-up-slop-bench.md
  - notes/inbox/2026-11-12T1707-maintain-and-understand-the-codebase.md
  - notes/inbox/2026-11-12T1708-dont-over-plan.md
  - notes/inbox/2026-11-12T1709-expected-pain-vs-cost-of-change.md
  - notes/inbox/2026-11-12T1710-show-me-skills.md
  - notes/inbox/2026-11-12T1711-help-agents-test-their-work.md
  - notes/inbox/2026-11-12T1712-anti-slop-repo.md
  - notes/inbox/2026-11-12T1713-the-forge-lifecycle.md
  - notes/inbox/2026-11-12T1714-what-to-buy-vs-own.md
  - notes/inbox/2026-11-12T1715-slop-is-asymmetric.md
built_from_photos: 4
notes_frame:
  spine: "the factory loop (5 notes, 2 photos): forward pressure starting work and automated backpressure checking it before humans review"
  clusters:
    - "Unattended codebase degradation & anti-slop discipline (4 notes)"
    - "Expected-pain planning & visual review (3 notes)"
    - "Unifying the AI-native forge & what to buy vs. own (2 notes, 2 photos)"
    - "Asymmetric slop & human judgment (1 note, closing synthesis)"
  skipped: "HumanLayer joining Factory a week before the talk (folded into opening); the Faros PR study (folded into Ch. 1); throwaway feature-flag slop caveat (folded into Ch. 6); stage banter"
key_points:
  - "An agentic software factory is classic software engineering wired into tighter loops of forward pressure (auto-starting work) and automated backpressure (reviewers, tests, browsers, linters, formal verification) before a human sees it (00:01:11, 00:04:20, 00:11:26)"
  - "SlopCodeBench shows unattended coding models degrade long-lived codebases across checkpoints unless teams maintain architectural understanding and enforce anti-slop rules (00:06:50, 00:11:26)"
  - "Scale upfront planning to expected pain (likelihood of change × difficulty of changing later), inspect with visual artifacts like Show Me, and unify code, plans, specs, and traces inside one forge (00:09:49, 00:11:26, 00:13:00)"
  - "Buy undifferentiated models, sandboxes, and harnesses, but own verification and human judgment—because generating 1,000-line PRs costs zero while reviewing them stays costly (00:13:50, 00:14:43, 00:18:40)"
kind: talk-story
status: draft
---

# Loops are forward pressure plus backpressure

Three months after "software factories" peaked on social media, Dexter Horthy—who brought HumanLayer into Factory a week before the talk (`00:00:00`)—argues that reliable agentic delivery is not magic: it is standard engineering discipline wired into closed loops of forward pressure and automated backpressure (`00:01:11`, `00:04:20`). When implementation drops from days to minutes, unattended agents compound slop unless teams scale planning to expected pain, unify decisions beside code, and keep ownership of verification and judgment (`00:06:50`, `00:09:49`, `00:14:43`).

*Framing note: this story is framed from fourteen inbox notes and four slide photos taken in the room. Quotes keep the local Qwen3-ASR 1.7B machine transcription verbatim, including `"Slope Code Bench"` / `"Slop Codebench"` (SlopCodeBench), `"Farahs"` (Faros), `"he'll climb"` (hill climb), `"before the A and A4"` (before AI-native forge), `"anti-slavi manifesto"` / `"anti-slot manifesto"` / `"slotmanifesto.com"` and `"Swap"` / `"Flop"` (slop / slopmanifesto.com), `"postdoc or a statistician or a launch darkly"` (PostHog / Statsig / LaunchDarkly), and `"Videocoding"` (vibe coding). Tokens flagged in the transcript header as transcription-prompt bias (`"Dexter Horthy"`, `"HumanLayer"`, `"Quinn"`) are never quoted. `"From the notes"` and `"The reading"` boxes are editorial synthesis, not the speaker's words.*

## Loops are forward pressure plus backpressure

Software factories had a hype spike over the summer and an immediate backlash, including the Faros study finding roughly 30% of AI-authored PRs merging unreviewed alongside rising bugs per developer (`00:01:11`). People heard his earlier talk, *"Why software factories fail"*, and assumed he hated factories. His actual thesis is simpler:

> “But I think the main takeaway here, and I think we've heard this from a lot of folks, is software factories is just good engineering.”
> — 00:01:11

Walk through a pre-AI software team circa 2022 (`00:03:03`) and every box already exists: leadership, PMs, and engineers queue work in Linear or Jira; someone builds it and runs unit tests; CI runs linters and security scans; humans review PRs and manually click in the browser; code rolls out behind canaries and feature flags; monitoring catches 3 a.m. incidents while customers file bugs and feature requests.

> “We're around for thirty years, right? You take stuff off the tracker, you build it, run some unit tests, automated tests. Maybe you poke it locally when you're ready. You make a pull request.”
> — 00:03:03

Replacing *"someone builds the thing"* with an agent is only half the loop (`00:04:20`, `00:05:40`). **Forward pressure** is what triggers new work automatically—routing customer requests straight into the backend, or turning a 3 a.m. pager alert into a candidate pull request rather than a raw stack trace (`00:04:20`). **Backpressure** is everything that pushes back on the agent before a human wastes time looking at a bad diff: agentic code reviewers, automated browsers, screenshots, videos, static linters, and even formal verification checks (`00:04:20`, `00:11:26`).

> “So, forward pressure—what causes new work? Start and back pressure, which is sort of like okay, cool. Now we can build things in minutes or hours. But the review and testing still takes hours or days if we're doing it in the old way. So we bring in agentic code review, agentic testing.”
> — 00:04:20

**Key points**

- Forward pressure starts loops automatically from product signals and 3 a.m. production incidents instead of waiting for manual triage (`00:04:20`).
- Automated backpressure—agentic review, headless browsers, screenshots, videos, linters, and formal checks—lets agents hill-climb without human babysitting (`00:04:20`, `00:11:26`).
- "Loops" stop being buzzwords when split into how work enters the factory and what rejects bad outputs on the way out (`00:05:40`).

<div class="reading"><b>From the notes:</b> “Forward pressure, backward pressure: what are these ideas in the new factory? What causes new work to start?” (<code>2026-11-12T1702-forward-and-backward-pressure.md</code>) and “Loops = forward pressure + backpressure” (<code>2026-11-12T1703-loops-are-forward-plus-backpressure.md</code>). <b>The reading:</b> Horthy answers the question directly on stage: loops pair pull triggers (alerts, requests) with automated verification gates so human review only inspects work that already survived machine critique—mirroring Cognition's self-testing VMs (<code>help-agents-test-their-work.md</code>).</div>

**Visual:** photo `photos/PXL_20261113_010644949.jpg` (two-step diagram build alongside `PXL_20261113_010629420.jpg`: *"A Software Factory Circa 2022"* showing `LOOP #1` between build and PR checks, plus `USERS → complaints / feature requests` and `MONITORING → incidents` feeding back into the backlog)

## Know your enemy: unattended agents degrade a codebase over time

Despite the "12-Factor" title, Horthy moves quickly after Practice #1 (`Loops`) into Practice #2: **Know your enemy** (`00:06:50`). Models can clone Redis or Excel in days when the entire specification is known upfront (`00:06:50`). Real engineering ships one feature at a time, and without human refactoring—centralizing abstractions, removing dead paths—codebases rot:

> “So if you are just hands off pushing features into the machine. You may not find that it autonomously will make things better over time.”
> — 00:06:50

Where his June talk relied on intuition, he now cites new **SlopCodeBench** data released with Gabriel Orlanski's UW-Madison lab (`00:01:11`, `00:06:50`). Rather than single-shot tasks, SlopCodeBench grades models across sequential codebase checkpoints (`00:06:50`). GPT-5.5 scores around 15% and Astro scores 16.3%, while over 200 static and custom rules measure cyclomatic complexity, lines per symbol, broken abstractions, and even regressions into Python 2 conventions like `%s` formatting (`00:01:11`, `00:06:50`).

> “We should probably maintain understanding of the system and the code.”
> — 00:06:50

Because models happily bypass weak checks, teams have to encode anti-slop discipline directly into the repo (`00:11:26`): he points engineers to Dylan Mulroy's ~100-rule Cloudflare TypeScript anti-slop repository, Factory's ESLint plugin, and open Python rules extracted from SlopCodeBench (`00:11:26`).

**Key points**

- Iterative feature evolution exposes agent failure modes that one-shot app clones hide (`00:06:50`).
- SlopCodeBench (`~15–16.3%` pass rates) shows structural complexity and archaic idioms compounding across checkpoints (`00:01:11`, `00:06:50`).
- Repo-level anti-slop linters turn codebase taste into automated backpressure before PRs reach engineers (`00:11:26`).

<div class="reading"><b>From the notes:</b> “Look up the 'slop bench' stuff” (<code>2026-11-12T1705-look-up-slop-bench.md</code>), “We should maintain and understand the codebase” (<code>2026-11-12T1707</code>), and “Anti-slop repo” (<code>2026-11-12T1712</code>). <b>The reading:</b> SlopCodeBench supplies the empirical measurement behind Lauren Tan's “All Code Is Slop (Except Mine)” warning—if you don't prune abstractions and enforce lint gates across commits, each agent turn amplifies structural debt.</div>

**Visual:** diagram “One-shot clone vs. checkpoint-by-checkpoint evolution (SlopCodeBench: ~15–16.3% pass rate as cyclomatic complexity and legacy idioms compound across features)”

## Scale planning to expected pain, and review visually

With build time shrinking, many developers swing too far toward six-hour markdown specs (`00:09:49`). Horthy warns against over-planning trivial changes when two follow-up prompts fix a miss in seconds (`00:09:49`). Instead, calibrate specification depth to **expected pain**:

> “But I think about this in terms of expected pain. Like, how likely will this have to change later? Times, how hard will it be to change? I don't argue with the model during planning about what color the button is going to be, but I do want to make sure we get like our database schemas right and stuff like that.”
> — 00:09:49

Once you do plan or review, raw text walls slow humans down (`00:11:26`). Because human brains evolved for visual pattern recognition rather than walls of Markdown, he built `Show Me` (~40,000 installs) to make agents render HTML mockups, tables, and charts alongside code—plus screenshots, headless browsers, and videos so the agent can visually verify iOS or web flows itself (`00:11:26`).

> “You should help agents test their work, screenshots, browsers, videos. Whatever you can do to help the agent, again, he'll climb against an outcome.”
> — 00:11:26

**Key points**

- Multiply likelihood of future change by difficulty of changing later (`Expected Pain = P(change) × Cost(change)`) to decide whether to prompt immediately or align upfront (`00:09:49`).
- Skip spec debates on cheap UI tweaks; lock down database schemas and hard-to-reverse contracts (`00:09:49`).
- Pair human visual review (`Show Me` HTML mockups and charts) with visual agent test loops (browsers, screenshots, simulators) (`00:11:26`).

<div class="reading"><b>From the notes:</b> “Don't over-plan” (<code>2026-11-12T1708</code>), “Expected pain vs how hard it is to change” (<code>2026-11-12T1709</code>), and “‘Show me skills.’” (<code>2026-11-12T1710</code>). <b>The reading:</b> Expected pain gives engineers a concrete budget rule for human attention—reserve specification friction for irreversible interfaces, and replace prose walls with inspectable visual artifacts everywhere else.</div>

**Visual:** diagram “The planning spectrum: Expected Pain = likelihood of change × difficulty of change (fire-and-forget prompt for button colors; lock schemas and core interfaces upfront)”

## Unify the forge so decisions live beside the code

Before GitHub, teams mailed Git patches across lists; GitHub centralized commits and pull requests (`00:13:00`). Right now, however, software factories remain fragmented across a *"Before AI-Native Forge"* patchwork: plans in Google Docs or Notion, tickets in Linear, pasted Claude outputs in Slack, Figma designs, and agent traces stranded on individual laptops (`00:13:00`).

> “So you can understand not just the code about what something was built, but all the decisions that went into it.”
> — 00:13:00

To compound across runs (`00:13:00`), a team has to evaluate every trajectory and bring product specs, prompts, plans, designs, and coding sessions into the same centralized repository alongside commits so both humans and future agents inherit decision context (`00:13:00`).

**Key points**

- Copy-pasting agent answers back and forth in Slack wastes context and breaks provenance (`00:13:00`).
- A centralized AI-native forge colocates specs, prompts, plans, designs, and session traces directly with Git commits (`00:13:00`).
- Unifying artifacts lets teams evaluate past runs and compound engineering knowledge over time (`00:13:00`).

<div class="reading"><b>From the notes:</b> “The forge lifecycle.” (<code>2026-11-12T1713-the-forge-lifecycle.md</code>). <b>The reading:</b> Look at his four-stage diagram beside Quinn Slack's Amp talk earlier the same afternoon—Ramp (“Inspect”), Amp (“everything inside shared agent threads”), and Factory all converge on killing the split between chat, ticket trackers, and code repos.</div>

**Visual:** photo `photos/PXL_20261113_011613499.MP.jpg` (his slide: *"The Forge Lifecycle"*—four stages from *Before GitHub* patches on mailing lists and *After GitHub* commits to *Before AI-Native Forge* scattered across Slack, GDocs, Notion, Linear, and *Centralized AI Native Forge* uniting product specs, prompts, plans, designs, and sessions around commits)

## Buy the building blocks, own your verification

When teams look at the factory stack, what can they buy off the shelf and what can never be outsourced (`00:13:50`)? His 8-layer stack separates commodities from proprietary leverage (`00:13:50`): frontier/open models (`01 Models`), isolated sandboxes (`02 Compute`), policy/cost routing (`03 Routing`), Git/CI/ticket connectors (`04 Integrations`), coding harnesses like Factory Droids, OpenCode, or custom setups (`05 Agent harness`), multi-workstream automations (`06 Orchestration`), Slack/IDE/CLI/web entry points (`07 Surfaces`), plus cross-cutting `Governance` (SSO, approvals, audit trails, OpenTelemetry, team cost tracking).

Layers `01–07` are undifferentiated building blocks you can adopt or customize (`00:13:50`). Layer `08 Yours`—your repos, skills, automations, and **quality gates**—cannot be bought as a turnkey box (`00:13:50`):

> “I don't think anyone can sell you verification of your code because only you know. If you have hundreds of engineers and hundreds of repos.”
> — 00:13:50

**Key points**

- Treat models, sandboxes, routing, integrations, harnesses, orchestration, surfaces, and SSO governance as mix-and-match building blocks (`00:13:50`).
- No vendor can sell a black-box verifier for a complex production organization with hundreds of repos and domain invariants (`00:13:50`).
- Your durable investment sits in Layer `08 Yours`: bespoke skills, automations, and quality gates (`00:13:50`).

<div class="reading"><b>From the notes:</b> “What can you buy, and what must you own?” (<code>2026-11-12T1714-what-to-buy-vs-own.md</code>). <b>The reading:</b> This bridges Wednesday's verification talks directly to enterprise tooling—the mechanical factory layers commoditize fast, while your proprietary definition of “correct” remains strictly yours.</div>

**Visual:** photo `photos/PXL_20261113_011655806.MP.jpg` (his stack slide: *"building blocks for the undifferentiated stuff, flexibility for what's unique to you"*—Layers `01 Models` through `07 Surfaces` + `Governance` rail supporting `08 Yours: Your repos, Your skills, Your automations, Your quality gates`)

## Slop is asymmetric, so there is always alpha in judgment

Horthy closes by introducing [slopmanifesto.com](https://www.slopmanifesto.com/) (`00:14:43`, `00:19:44`), signed alongside swyx and other speakers. Defining **slop** not merely as bad code, he frames it as an asymmetry of effort (`00:14:43`): putting less care into producing something than you demand the reader or teammate spend trying to understand it.

> “AI cannot replace human judgment. It can only amplify our judgment, or maybe perhaps our lack of judgment in certain cases. And the slop is asymmetric. The cost of producing a thousand line PR or a ten page doc is approaching zero. But the cost of reviewing it is still barely constant.”
> — 00:14:43

Because slop compounds when uncurated docs and workarounds sit in repos or chat for future agents to imitate (`00:14:43`), manifesto signers commit to owning intent, taste, and consequences (`00:14:43`). At the same time, Horthy stays pragmatic (`00:11:26`, `00:18:40`): vibe-coded throwaways and experiments gated behind PostHog, Statsig, or LaunchDarkly feature flags are fine when testing demand (`00:11:26`). What never disappears is the advantage of human thought (`00:18:40`):

> “As models get better, we may stop reading most of the code. We basically review a plan or a design or a result. But if you don't review anything, if you bring nothing to the table, no thinking, then you're just going to get the same AI output as everybody else.”
> — 00:18:40

> “Swap is bad when it undermines our outcomes. We want to make a good product, maintainable system. We want to save people time and energy. If slop undermines that, then it's bad.”
> — 00:18:40

**Key points**

- Slop is asymmetric effort—generating 1,000-line PRs or 10-page docs approaches zero cost while human review cost remains flat (`00:14:43`).
- Temporary "good slop" (prototypes behind feature flags) earns its keep only when it stays bounded and doesn't pollute shared systems (`00:11:26`, `00:18:40`).
- Automated linters and agent reviewers help, yet teams still differentiate through human judgment on plans, designs, and real user outcomes (`00:18:40`, `00:19:44`).

<div class="reading"><b>From the notes:</b> “Slot is asymmetric.” (<code>2026-11-12T1715-slop-is-asymmetric.md</code>). <b>The reading:</b> This crystallizes the conference-wide “Judgment when code is free” theme alongside Ishaan Dey and Thariq Shihipar: once models can emit plausible code on demand, taste, accountability, and critical review become the only non-commoditized edge.</div>

**Visual:** quote “AI cannot replace human judgment. It can only amplify our judgment, or maybe perhaps our lack of judgment in certain cases. And the slop is asymmetric. The cost of producing a thousand line PR or a ten page doc is approaching zero. But the cost of reviewing it is still barely constant.” (00:14:43)
