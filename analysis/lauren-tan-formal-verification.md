# Lauren Tan's formal verification, in depth

Research note, 2026-11-11, for talks/2026-11-11-all-code-is-slop-except-mine/. What she said is cited to the transcript; what the tools do comes from their own pages, read today.

## What she said (transcript 00:02:55, 00:10:40, 00:12:50)

- Verification sits in the middle of her trust pyramid: runtime and formal verification find bugs, check the properties and invariants you want to hold, and check whether the agent understood the goal (00:02:55).
- **TLA+** for model checking major user flows, e.g. notifications across multiple devices and platforms (00:10:40).
- **Lean** for proving certain algorithms. The Qwen transcript garbles it ("a leaning as ball for pruning"); Apple's has "a meaning as well for proving". Her example: their custom virtualization library, checked so that lists don't flicker or jitter (00:10:40).
- Still experimental: "very promising", has already found real bugs, "not a silver bullet", one more layer (00:10:40).
- **Property-based testing for UIs** with bombadil (heard as "Duckbill"), which has caught UI bugs (00:10:40).
- The point of it: agents make these techniques cheap enough to use routinely, and formal models help a person check whether the agent understood the intent (00:12:50).

## The tools

**pstack** ([cursor/plugins/pstack](https://github.com/cursor/plugins/tree/main/pstack)) is her MIT-licensed Cursor plugin of agent skills, aimed at slowing agents down for quality. Verification skills in it:

- **/statechart**: the agent writes a TLA+ spec and config, checks it with TLC, and renders what the user sees as a Mermaid statechart (`chart.mmd`), with a view module labelling states in the reader's words. Each broken rule is marked on the chart with the shortest path to it. Rules are written only for behavior the reader agrees to, and never weakened to make a check pass; each bug path is to be replayed against the real code one step at a time. User-invoked.
- **/create-formal-verification-skill**: verify one property with a fitting tool, and generate a project skill that rechecks it on every change.
- **/maintain-formal-verification-skill**: update the model after the code drifts, and say whether a failure is model drift or a real code bug.
- **/create-verification-skill**, **/maintain-verification-skill**: the project-local feature map she described, for proving app behavior.
- Also: **/tdd** (failing test first), **/interrogate** (several models try to break a diff; only findings a run proves are kept), **/blast-radius**, **/benchmark-checklist**.

**bombadil** ([antithesishq/bombadil](https://github.com/antithesishq/bombadil), [manual](https://antithesishq.github.io/bombadil/browser/1-introduction.html)) is Antithesis's property-based tester for web and terminal UIs. Properties are TypeScript invariants (`always(...)`) over browser state read through "extractors"; it explores the app on its own, then reproduces and shrinks any violation. Runs locally, in CI, or inside Antithesis.

## The pattern

Verification becomes a maintained, per-project skill: the agent writes the model (TLA+, Lean, or a UI property), a person approves the rules in plain terms (the statechart), and the check reruns on every change. When it fails, the skill separates "the model is stale" from "the code is wrong". It is her "every correction becomes a deterministic check", carried up from lint rules to behavior.

## Open questions

- The pstack page describes poteto as an engineer on the React compiler team; the talk and roster say SpaceXSI (xAI). Likely an older bio; unverified.
- No write-up by her on the TLA+ or Lean work turned up in a web search; the talk is the only source so far.
- Not yet read: pstack's references/ and scripts/, bombadil's exploration and reporting pages.

Related outside work found while searching (not hers): [Specula](https://www.alphaxiv.org/abs/2607.25333), agents writing TLA+ specs of system code; [Formal Verification for Agent Orchestration](https://understandingdata.com/posts/formal-verification-for-agent-orchestration/).
