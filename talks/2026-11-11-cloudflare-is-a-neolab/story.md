---
title: "The missing piece: how decision models made Cloudflare a model provider"
speakers: "Michelle Chen (Cloudflare)"
duration: "20:12"
source: transcript.md
video: null
themes: [decision-load, context-for-ai]
reader: "Will and his clients: why small decision models matter, and what it means when a company owns the whole stack except one layer"
built_from_notes:
  - notes/inbox/2026-11-11T0941-life-understood-backwards-kierkegaard.md
  - notes/inbox/2026-11-11T0944-what-are-durable-objects.md
  - notes/inbox/2026-11-11T0945-workers-ai-gpu-in-the-cloud.md
  - notes/inbox/2026-11-11T0949-2-system-1-model-made-cloudflare-a-provider.md
  - notes/inbox/2026-11-11T0951-clef-is-their-version-of-jev.md
  - notes/inbox/2026-11-11T0952-clairic-extracts-to-json.md
  - notes/inbox/2026-11-11T0954-pi-durable-comes-back.md
  - notes/inbox/2026-11-11T0949-cloudflare-and-agents-deep-dive.md
key_points:
  - "Cloudflare owned the network, the compute (Workers, Durable Objects) and GPUs at the edge, but its agent cloud was missing a piece (00:01:45, 00:04:24, 00:06:55)"
  - "System One decision models were that piece: they made Cloudflare a model provider, not just a host (00:07:50, 00:13:18)"
  - "Clef is their own Jev, trained over a weekend; Clairic turns unstructured input into typed JSON (00:09:53, 00:11:35)"
kind: talk-story
status: draft
---

# The missing piece

Michelle Chen runs Cloudflare's AI platform products. Her talk tells, looking
back, how a 16-year-old CDN company ended up training its own models, and then
looks forward at what developers can do with them. The turn in the story is one
kind of model: small, fast "System One" decision models. They are what made
Cloudflare a model provider.

*Framing note: the transcript is a Qwen machine transcription and garbles the
model names ("CLUF", "Cleric", "Claire" for Clef and Clairic; "Jet", "Chat" for
Jev). Quotes keep its wording. “From the notes” and “The reading” boxes are
interpretation, not her words.*

## Understood backwards

She opens with Kierkegaard (00:00:56), and the quote sets up the whole talk:
Cloudflare made a run of decisions over 16 years that only add up in hindsight.

> “Says life can only be understood backwards, but it must be lived forwards.”
> — 00:00:56

<div class="reading"><b>From the notes:</b> the Kierkegaard line, which you
noted as she said it. The talk follows its shape: backwards through the history,
forwards through a demo, then “onward”.</div>

**Visual:** quote “life can only be understood backwards, but it must be lived forwards”

## A stack with a hole in it

Each layer was built on the one before (00:01:45). A CDN has to be everywhere, so
Cloudflare put data centers as close to users as possible, unlike a hyperscaler
that centralizes compute in a few regions. With computers everywhere, it added
compute: Workers in 2017, serverless functions that start in milliseconds, then
Durable Objects, which are stateful, and containers in 2025. Then storage (KV, R2,
D1) for full applications (00:03:47).

In 2023 came Workers AI: GPUs spread across the same network (00:04:24). The bet
was that models would shrink and network latency would matter more. The opposite
happened. Models grew from seven billion parameters to trillions, and Cloudflare
pivoted to serving giant models such as Kimi, GLM and DeepSeek in March 2026
(00:06:16).

By 2026 it had every layer of an "agent cloud": the network, compute that agents
run on (a Durable Object lets an agent work, then sleep), storage, and large
models (00:06:55).

> “but it never felt quite right.”
> — 00:06:55

The giant models fit the developer platform, not the infrastructure. The
distributed edge had nothing that only it could serve well.

<div class="reading"><b>From the notes:</b> “workers ai: gpu in the cloud”, and
two open questions: what Durable Objects are from Cloudflare's side, and how
Cloudflare really works with agents. Her answer to the first is short: the
stateful compute primitive an agent runs on, spinning up for a task and sleeping
between (00:01:45, 00:06:55). The deep dive is still a backlog item.</div>

**Visual:** photo `photos/PXL_20261111_174332301.MP.jpg` (her compute timeline slide)

## System One made Cloudflare a provider

The missing piece arrived from outside (00:07:50). In September 2026, TypeSafe
launched Jev and the idea of System One models. An LLM generates token after
token; a System One model takes one forward pass over the input and returns an
output you can make a decision with. Not everything has to go to an LLM: the small
fast models take work off the big ones, and the two work together.

That brought Cloudflare back to its original bet.

> “And so Cloudflare was not wrong here. We actually were just early with these small and fast models.”
> — 00:07:50

Small, fast models are exactly what a distributed network serves well, and why
she says becoming a lab was the missing bit (00:13:18): Cloudflare had the
infrastructure, the compute, the data and the large models, but to use its own
infrastructure it had to ship System One models itself.

> “Being a new lab means that we can create what we are missing, right?”
> — 00:13:18

<div class="reading"><b>From the notes:</b> “system 1 model was the thing that
make cloudflare a provider!!!” This is the talk's hinge. Serving other labs'
giant models made Cloudflare a host. Training the small models that fit its own
network made it a provider.</div>

**Visual:** photo `photos/PXL_20261111_174749891.MP.jpg` (her “east wind” slide)

## Clef: their own Jev, in a weekend

Jev is closed source, so Cloudflare couldn't host it on its own infrastructure
(00:09:53). They started experimenting three days after its launch, deliberated
for a week over whether to become a lab at all, then decided on a Friday evening.

> “And we ended up training the model over 48 hours over the weekend, and then we launched it the following week.”
> — 00:09:53

The result was Clef, a decision model. Agents can make decisions on their own,
without an LLM reasoning for minutes and without waiting for a person. As an
inference provider, it takes pressure off the LLMs, which are kept for meaningful
work.

> “Clef gave power back to the agents to be able to make decisions on their own.”
> — 00:09:53

<div class="reading"><b>From the notes:</b> “clef is their version of jev”. Jev
returns in three talks today: Diogo Almeida's, Glean's, and Scott Roberts's at
Workday, where it picks the action card that has the data while you type, and runs inside a SQL statement in DuckDB.</div>

**Visual:** diagram “request → Clef decides in one pass → act / or hand the hard case to an LLM” (illustrative)

## Clairic: unstructured in, typed JSON out

Decisions weren't the only work too expensive or too slow for an LLM (00:11:35).
Clairic, launched three weeks later, is an extraction model. Emails, tweets and
Slack messages don't arrive as forms; Clairic reads unstructured input (text or
images), extracts, computes, estimates and forecasts values, and returns a typed
object an agent can act on.

> “and it gives you back a perfectly typed JSON object.”
> — 00:11:35

She calls it System One in the sense that matters: just as fast and cheap,
one forward pass.

<div class="reading"><b>From the notes:</b> you weren't sure extraction to JSON
was “really” System One. Her own answer is that it's System One by how it runs
(one forward pass, fast, cheap), not by what it does: deciding and extracting
are both work you stop sending to an LLM.</div>

**Visual:** photo `photos/PXL_20261111_175158642.MP.jpg` (her Clairic slide)

## Forwards: the CI triage demo

Her demo is an agent triaging a failed CI build with forty tools (00:14:06), the
agent running “PyDurable on a durable object”. The LLM-only version goes back and
forth with the model, resending the same inputs. The System One version prunes
the tool list to the ten it needs, uses Clairic to pull the PR number from the
input and the exact error from hundreds of log lines, and calls the LLM once, to
act. Same answer; in her earlier run, almost twice as fast, five LLM calls down to
one, and about 94 percent fewer tokens.

> “It was 72 percent less expensive.”
> — 00:14:06

<div class="reading"><b>From the notes:</b> “pi durable comes back again how
does that really work”. Her demo slide answers the first half: it is headed
“CI triage agent · a Durable Object running Pi”, so “PyDurable” is the
transcription of the Pi agent running inside a Durable Object. How that works
(the agent's state living in the object between steps) is still the agents deep
dive; the talk doesn't explain it.</div>

**Visual:** photo `photos/PXL_20261111_175645827.jpg` (the demo's waterfall chart)

## Onward

She closes (00:18:56): be reactive; when the hypothesis was wrong, Cloudflare
pivoted to serving giant models, and when the east wind came, it pivoted again
and became a lab.

<div class="reading"><b>The reading:</b> this is
<a href="../../../atlases/own-the-stack/page.html">own the stack</a> from the
infrastructure side. Cloudflare owned every layer except the model, and that one
gap kept the platform from fitting together, until it trained the small models
itself. For a client, the lesson is the System One split: not every request
deserves an LLM. Decisions and extraction go to small, fast models you can own;
the LLM is kept for the work that needs it.</div>

**Visual:** quote “Being a new lab means that we can create what we are missing, right?”
