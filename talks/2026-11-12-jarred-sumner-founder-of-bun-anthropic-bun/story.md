---
title: "Shipping millions of agent-written lines: Bun’s ahead-of-time JavaScript compiler"
speakers: "Jarred Sumner (Anthropic / Bun)"
duration: "22:01"
source: transcript.md
video: null
themes: [guardrails-people-own, less-harness-more-model, long-running-agents, ambition-is-the-limit]
reader: "Will and his clients: how to steer multi-million-line agent projects by anchoring on pre-existing test suites, throwing away bad rewrites early, moving from rigid step-by-step workflows to long-lived subagents, and watching an hourly scorecard"
built_from_notes:
  - notes/inbox/2026-11-12T1407-aot-compiler-better-than-rust-rewrite.md
  - notes/inbox/2026-11-12T1409-design-for-testability-first.md
  - notes/inbox/2026-11-12T1423-hourly-loop-posts-updates-to-slack.md
built_from_photos: 6
notes_frame:
  spine: "testability and iteration discipline let agents ship a 5-rewrite ahead-of-time JavaScript compiler—keep the existing TypeScript tests, throw away bad architectures fast, run long-lived subagents, and watch an hourly Slack scorecard"
  clusters:
    - "Ahead-of-time compiler vs. Rust rewrite (1 note, 1 slide photo)"
    - "Design for testability first & pre-existing tests (1 note, 1 slide photo)"
    - "Three modes of working & 5 compilers in 46 days (2 slide photos)"
    - "Long-lived subagents & hourly Slack scorecard (1 note, 1 slide photo)"
    - "Nudging ambition & pushing past conservative model sizing (1 slide photo)"
  skipped: "Detailed prototype-pollution security edge case and UglifyJS eval/new Function caveat (folded into Ch. 2 and Ch. 6); live bun upgrade command folded into Ch. 6"
key_points:
  - "Ahead-of-time JavaScript compilation cut Claude Code’s memory ~4× and doubled startup speed while avoiding a Rust rewrite that would have forced rewriting—and losing trust in—the TypeScript test suite (00:02:15, 00:03:28, 00:04:37)"
  - "Design for testability first: treat TypeScript types as predictions and cross-check JIT vs. typed AOT vs. untyped AOT against pre-existing suites (Bun, WebKit, test262, and extended Fuzzilli) that agents did not write (00:01:51, 00:05:56, 00:06:26, 00:16:07)"
  - "Run one build at the end of a 140-agent code-writing batch, throw away early pre-shipped compilers when compile time or bloat fails (5 compilers in 46 days), and use long-lived subagents instead of rigid step-by-step workflows (00:08:28, 00:09:43, 00:14:51)"
  - "Track progress with an hourly Slack scorecard against fixed baselines and push the model past safe 0.1% edits by questioning slow steps and asking for 10% gains (00:16:07, 00:18:48, 00:20:35)"
kind: talk-story
status: draft
---

# Design for testability, then demand ambition

Roughly half of a typical JavaScript application's CPU time goes to JIT-compiling code on demand (`00:02:15`). To make Claude Code use far less memory and start faster without rewriting its entire TypeScript test suite in Rust, Jarred Sumner spent 46 days building an ahead-of-time JavaScript compiler into Bun and WebKit—throwing away four prototypes along the way (`00:00:53`, `00:03:28`, `00:09:43`). The real lesson is how to steer millions of agent-written lines: lock down pre-existing tests first, move from rigid step workflows to long-lived subagents, watch an hourly Slack scorecard, and refuse to let models settle for timid 0.1% wins (`00:01:51`, `00:14:51`, `00:16:07`, `00:20:35`).

*Framing note: this story is framed from three inbox notes and six slide photos taken on the main stage (`PXL_20261112_220704428.jpg` through `PXL_20261112_222619918.jpg`). Quotes keep the local Qwen3-ASR 1.7B machine transcription verbatim, including `"bond"` / `"Fun"` / `"Bunn"` / `"Bunsky's"` / `"Ubuntu"` (Bun), `"cloud code"` / `"Cloud Code"` (Claude Code), `"Zyg"` (Zig), `"Rosseri"` (Rust rewrite), `"Clapto"` (Claude), `"Fuseeley"` (Fuzzilli), `"EA"` (V8), `"Amplify JS"` (UglifyJS), and `"deepfashionary"` (canary upgrade channel). Tokens flagged in the transcript header as transcription-prompt bias (`"Anthropic"`, `"Jarred Sumner"`) do not appear in the transcript and are never quoted. `"From the notes"` and `"The reading"` boxes are editorial synthesis, not the speaker's words.*

## Why an ahead-of-time compiler beats a Rust rewrite

Rewriting a slow JavaScript tool in Rust or Go has become standard folklore—and the Bun team itself had just rewritten Bun from Zig to Rust over the summer (`00:00:00`, `00:02:15`, `00:03:28`). Yet Sumner rejected rewriting Claude Code in Rust for one decisive reason: Bun's own tests were already written in TypeScript, independent of the runtime language, whereas Claude Code's suite lived in TypeScript inside the app itself (`00:03:28`). Rewriting the tests destroys the oracle (`00:03:28`):

> “For a typical JavaScript-based application. Roughly half of like the CPU time is just spent compiling code on demand.”
> — 00:02:15

> “As soon as you're like rewriting the tests. Then you can't really trust the test anymore. So that seems like it'd be too risky.”
> — 00:03:28

Compiling ahead of time instead—dogfooded internally and approaching external release—cut memory usage roughly **4×**, made startup roughly **2×** faster (`00:04:37`), and pushed single-threaded AOT Bun past the single-threaded Go port of TypeScript (`TypeScript 7`) (`00:04:37`):

> “It uses about four x less memory.”
> — 00:04:37

**Key points**

- JIT compilation consumes ~50% of CPU time in typical JS applications (`00:02:15`).
- Keeping TypeScript intact avoided porting tests into Rust—preserving a trusted verification oracle (`00:03:28`).
- Ahead-of-time compilation in Bun cut memory ~4×, doubled startup speed, and beat single-threaded `typescript-go` (`00:04:37`).

<div class="reading"><b>From the notes:</b> “He says an ahead-of-time compiler is better than the rewrite to Rust.” (<code>2026-11-12T1407-aot-compiler-better-than-rust-rewrite.md</code>). <b>The reading:</b> unlike Lovable rewriting a standalone dev server in Rust, rewriting an evolving product forces you to rewrite its test suite at the exact moment you need tests most—making runtime compilation a cleaner lever.</div>

**Visual:** photo `photos/PXL_20261112_220704428.jpg` (his slide: *"What can models do today?"* progressing from 2021 line autocomplete and summer 2026 `"rewrite Bun in Rust"` to fall 2026 `"build an ahead-of-time JavaScript compiler"`)

## Design for testability first

When agents generate millions of lines of compiler code, verification architecture dictates everything else (`00:01:51`). Sumner treats TypeScript types as **predictions** rather than sound guarantees—letting the compiler emit fast field accesses when monomorphic and fall back to checks otherwise (`00:05:56`, `00:15:35`). Because any program can run three ways—JIT, AOT with types, and AOT without types—equivalence becomes an automatic oracle (`00:06:26`):

> “You're really constrained by how you test that the code works. So that's like even more important than what you're specifically like the approach you go with for how to build it.”
> — 00:01:51

> “Types are don't necessarily need to be correct. So it treats types as predictions instead of, like, trusting them.”
> — 00:05:56

Crucially, almost none of the core tests were invented by the agents (`00:06:26`, `00:16:07`). Sumner anchored on Bun's existing suite, WebKit tests, `test262`, and Google's `Fuzzilli` JavaScript engine fuzzer extended for TypeScript type predictions—and audited the fuzzers to ensure they actually caught bugs (`00:06:26`, `00:16:07`):

> “We can largely trust that the tests that predate the project worked.”
> — 00:06:26

**Key points**

- Differential execution (JIT vs. typed AOT vs. untyped AOT) turns real applications into self-checking test cases (`00:06:26`).
- Pre-existing conformance suites (`test262`, WebKit, Bun's suite) plus extended `Fuzzilli` fuzzing prevent agents from grading their own homework (`00:06:26`, `00:16:07`).

<div class="reading"><b>From the notes:</b> “Design for testability first.” (<code>2026-11-12T1409-design-for-testability-first.md</code>). <b>The reading:</b> this is the sharpest operational rule under “Guardrails people own”—before letting agents write a line of complex infrastructure, wire a pre-existing or differential oracle the model cannot rewrite.</div>

**Visual:** photo `photos/PXL_20261112_220735820.jpg` (his Sep 27 12:26 am Claude Code prompt: `> Build sound types and AoT into bun and webkit. ... Give Claude Code Go-like performance and memory usage. Modify WebKit freely to do so. Be ambitious!`)

## Batches, continuous agents, and one build per wave

Writing a compiler with agents splits into distinct operational modes (`00:08:28`). During an initial big-batch burst—where up to **140 agents** write code simultaneously—compiling after every file wastes everyone's time waiting on builds (`00:08:28`, `00:09:43`):

> “When you're in the big batch kind of project stage, then. You don't want to run builds. You want to run one build because otherwise you're going to spend all your time compiling”
> — 00:08:28

Once the scaffolding compiles and runs tests, work shifts to continuous long-running agents chasing individual optimizations and bugs (`00:08:28`, `00:14:51`), tracked on the same hourly scorecard (`00:16:07`).

**Key points**

- Batch parallel code generation together and pay the compile step once per wave (`00:08:28`).
- Separate big-batch scaffolding (`1 build`) from continuous tuning (`many builds`) and hourly measurement (`00:08:28`, `00:16:07`).

**Visual:** photo `photos/PXL_20261112_221526161.jpg` (his slide: *"Three modes of working"* — `Large structured batches (1 build)`, `Long-running continuous work (Many builds)`, `Keeping track (The same scorecard, every hour)`)

## Five compilers in 46 days

Nothing in the slide deck was sacred before shipping (`00:09:43`, `00:20:35`). Compiler #1 leaked gigabytes (`00:09:43`); #2 made dubious assumptions like mapping any `.archive` property access to `Bun.archive` (`00:09:43`); #3 used **140 agents** at once to get Claude Code running while skipping 1,500-file markdown specs (`00:09:43`); #4 produced clean code but took 50 seconds to compile Claude Code and 10–20 seconds on smaller apps (`00:09:43`). Compiler #5 cut the 900,000-line sprawl down and brought build times under 20 seconds (`00:09:43`):

> “140 agents at the same time write all the code all the same time, then get cloud code to run.”
> — 00:09:43

> “Because in older versions of this compiler, it was taking like ten to twenty seconds.”
> — 00:09:43

> “Part of it was also like, why is it nine hundred thousand lines of code? This should be a lot like smaller. So, let me do it one more time.”
> — 00:09:43

**Key points**

- Before a system ships, throwing away an entire compiler and restarting from what you learned beats nursing a bloated 900K-line codebase (`00:09:43`, `00:20:35`).
- Compilation latency is a product requirement for JavaScript developers—if builds take 10–50 seconds, rewrite the architecture (`00:09:43`).

**Visual:** photo `photos/PXL_20261112_221615006.jpg` (his slide: *"5 compilers in 46 days"* showing lines of code without tests across Sep 27, Oct 18, and Nov 2 with red reset lines where they started over)

## Long-lived subagents and an hourly Slack scorecard

During the summer Bun Rust rewrite, Sumner leaned on classic multi-step agent pipelines—a fresh agent for research, plan, write, review, and benchmark (`00:14:51`). With newer models (`Opus 5.5`, `Fable 5.2` on his slide), he switched to **long-lived subagents**—one agent staying on a single idea for days so it keeps architectural context warm in its window (`00:14:51`):

> “I mostly just rely on subagents that are like very long lived. Except for that initial part where you're like writing all the code all at once. And this, with the subagents, it works pretty well because. They keep all the context of the relevant code in their head, or like in the context window.”
> — 00:14:51

To avoid losing the plot across days of autonomous runs, an hourly loop posted a compact metrics card to Slack comparing the current build against the previous version and the JIT baseline (`00:16:07`, `00:20:35`):

> “I think a lot on like, just having an hourly update, and where we post this work card. Comparing a bunch of metrics that we were prioritizing.”
> — 00:16:07

**Key points**

- Replace short-lived step pipelines (*research → plan → write → review*) with long-lived subagents that hold codebase context across days (`00:14:51`).
- Post a consistent hourly scorecard to Slack against fixed baselines so regressions surface immediately (`00:16:07`, `00:20:35`).

<div class="reading"><b>From the notes:</b> “He had an hourly loop that posted updates to Slack, so he'd know what was going on.” (<code>2026-11-12T1423-hourly-loop-posts-updates-to-slack.md</code>). <b>The reading:</b> long-lived agents fail quietly when nobody watches the trend line; an automated hourly scorecard gives a human supervisor leverage over days-long runs without micromanaging turns.</div>

**Visual:** photo `photos/PXL_20261112_222208677.jpg` (his slide contrasting *"Dynamic workflows (Opus 4.5 to 4.8): A new agent for every step"* with *"Subagents (Opus 5.5, Fable 5.2): One agent per idea, for days"*)

## What you actually do all day: demand ambition

Even with strong models, Sumner found himself fighting a consistent failure mode: Claude estimates work conservatively, talks itself out of harder optimizations, and settles for tiny 0.1% tweaks (`00:18:48`, `00:20:35`). His daily prompts were short leading questions—*"why are we doing this?"*, *"what's taking so long?"*, *"you're not believing in yourself enough, Claude"* (`00:18:48`)—while `bun compile` compiled itself and pushed JetStream 3 past V8 and Node (`00:17:36`, `00:18:48`):

> “Because it kind of like talks itself into making up rules. And also, it tends to not be. It tends to like. Underestimate what it can do. So I often end up saying things like this to get it to like. Try harder.”
> — 00:18:48

> “And if you act ambitiously, then the models will like. Start having like zero point one percent improvements instead of like ten percent improvements.”
> — 00:20:35

> “And to make sure that the tests actually test things.”
> — 00:20:35

**Key points**

- Models naturally talk themselves into conservative 0.1% edits; active human steering keeps them swinging for 10% architectural gains (`00:18:48`, `00:20:35`).
- Expect outliers (`eval` / `new Function`-heavy apps like UglifyJS still fall back to the interpreter), enforce prototype-pollution guards, and continuously verify that your tests catch real bugs (`00:17:36`, `00:20:35`).

**Visual:** photo `photos/PXL_20261112_222619918.jpg` (his Nov 10 9:11 pm Claude Code slide: `> I don't think you're being nearly ambitious enough... I think you're not believing in yourself enough, Claude.` with `* Believing... (12h)`)
