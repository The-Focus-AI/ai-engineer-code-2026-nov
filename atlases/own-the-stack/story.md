---
title: "Own the stack: the model is the replaceable part"
kind: through-line
status: draft
reader: "Will and his clients: what a company should own once the model stops being the decision, and what to build on top"
talks:
  - talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/
  - talks/2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/
  - talks/2026-11-11-all-code-is-slop-except-mine/
  - talks/2026-11-10-one-teams-path-to-trusting-ai-generated-code/
  - talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/
  - talks/2026-11-10-scott-tolinski-co-host-syntax/
stack: [model, data-and-context, harness, verification, organization]
---

# Own the stack

Across six talks at AI Engineer Code Summit, the same shift keeps showing up from
different directions. Choosing a model is no longer the decision. The model is
the replaceable part. What a company has to own is everything around it: its
data and context, the environment its agents work in, the checks that verify
their work, and the people who decide what's right. The work is building the
platform on what you own.

Read bottom to top, it's a stack. Each talk is a piece of evidence on the layer it
actually addresses.

*Framing note: this through-line is the reading across the talk stories, not any
one speaker's claim. Quotes are verbatim from each talk's transcript (machine
transcriptions, garbles kept), cited by talk and timestamp.*

## Model: the replaceable part

At Netflix, Utkarsh Shrivastava tried to pick a model for an assistant serving
10,000 people, and the choice wouldn't hold still: frontier labs launched
enterprise plans, open-weight models gained enterprise support, and new options
arrived while they evaluated. He stopped treating the model as the decision. The
tool is the tip of an iceberg, and the harness can be swapped between frontier
and open-source options (Netflix, 00:00:43, 00:02:11).

Swappable has a cost: whatever you build has to keep working when the model
changes.

> “And so regressions will need to cover all of their models.”
> — Utkarsh Shrivastava, Netflix, 00:09:03

<div class="reading"><b>The reading:</b> the infrastructure itself can now be
owned: supported open-weight models run in-house where data can't leave,
frontier models where the capability is worth it, and a harness portable across
both (<code>analysis/enterprise-ai-deployment-options.md</code>).</div>

**Layer:** model · **Chips:** Netflix

## Data and context: own what only you have

Every talk that touched data reached the same conclusion: the durable asset is
the context you've built, not the model you point at it.

George Fraser showed companies pointing their agents at the warehouse they built
for business intelligence, not wiring them into every app, because you can't
join across sources through a tool per app (Fivetran, 00:03:18, 00:07:04). The
Netflix talk put it in one line.

> “The company context is the key here.”
> — Utkarsh Shrivastava, Netflix, 00:02:11

Mihail Eric's vertical AI lessons add the sharper version: separate the data
anyone can buy from the data only your customers generate, and keep that current
(Monaco, 00:10:23).

> “The data team should own your context.”
> — George Fraser, Fivetran, 00:26:44

**Layer:** data and context · **Chips:** Fraser, Netflix, vertical AI

## Harness: own the environment agents work in

The environment agents work in shapes what they produce. Lauren Tan's framing
is that the codebase is the agent's memory: agents copy whatever patterns they
find, so the code itself has to be kept clean, with constraints the next agent
grows around (SpaceXSI, 00:04:26).

> “So you want to make your codebase as pristine as possible, so that agents are always copying the right stuff.”
> — Lauren Tan, SpaceXSI (xAI), 00:04:26

The vertical AI lessons make the same point from the product side: the chassis
(data, workspace, memory, workflows) is generic and reusable; the effort and the
advantage go into filling it with the domain.

> “I could have pulled this and said this was a talk about insurance.”
> — Mihail Eric, Monaco, 00:08:33

**Layer:** harness · **Chips:** Lauren Tan, vertical AI, Netflix

## Verification: own the checks

If you don't trust the model, you trust the checks around it, and you own those.
Lauren Tan turns every correction into a deterministic check and reviews
verification artifacts instead of code (00:07:54, 00:10:40). Ankit Jain mines
years of review comments into rules with owners. Netflix runs evaluations in CI
on every connector and model change. The vertical AI lessons trace every agent
run and let domain experts judge the traces.

> “And so our general principle is that every time we correct our agents, it turns into one of these deterministic checks.”
> — Lauren Tan, SpaceXSI (xAI), 00:07:54

> “Absolute correctness is only correctness informed by subject matter experts.”
> — Mihail Eric, Monaco, 00:17:41

**Layer:** verification · **Chips:** Lauren Tan, Ankit Jain, Netflix, vertical AI

## Organization: own the decisions

At the top of the stack are people: who owns an answer, who owns a rule, who
judges. Ankit Jain's version is the cleanest statement of the whole through-line.

> “So instead of thinking about owning the code. Own the guardrails. Own the rules.”
> — Ankit Jain, Aviator, 00:17:18

Netflix settles which of two right answers wins, and for whom, through platform
and domain teams together (00:13:04, 00:20:28). The vertical AI team puts its best
domain expert in charge of deploying agents (Monaco, 00:20:57). And Scott
Tolinski's survey is the warning about this layer's limit: more agents means more
decisions for the same people, and it wears them out (Syntax, 00:09:42, 00:19:50).

> “Less paralization makes for a calmer mind.”
> — Scott Tolinski, Syntax, 00:19:50

**Layer:** organization · **Chips:** Ankit Jain, Netflix, vertical AI, Scott Tolinski

## Then build the platform

Put together, the order is the same in every talk: don't start with the model.
Own the infrastructure, own your data and context, own the environment, own the
checks, and own the decisions. The platform is what you build on that: routing to
the right answer, evaluations that survive a model swap, gates by stakes, and
experts inside the build. Lauren Tan's warning applies to the whole stack:

> “Then automating that loop just produces more slop.”
> — Lauren Tan, SpaceXSI (xAI), 00:16:10

<div class="reading"><b>The reading, for The Focus:</b> this is the shape of the
work to sell. Not "which model", but helping a client own each layer (portable
infrastructure, their data brought together, a clean environment, checks they
maintain, experts who decide) and then building the platform on top. The model
can change underneath without the client starting over.</div>
