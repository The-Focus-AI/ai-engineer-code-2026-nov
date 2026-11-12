---
title: "When the bottleneck moves: what 10x faster inference changes"
speakers: "Natalie Serrino (Gimlet Labs)"
duration: "17:30"
source: transcript.md
video: null
themes: [decision-load]
reader: "Will and his clients: why inference speed changes what agents can be used for, not just how long you wait"
built_from_notes:
  - notes/inbox/2026-11-11T0916-research-fast-token-inference.md
  - notes/inbox/2026-11-11T0918-gimlet-token-mint-game.md
  - notes/inbox/2026-11-11T0919-what-is-the-pareto-frontier.md
  - notes/inbox/2026-11-11T0922-bottleneck-shifts-with-inference-speed.md
  - notes/inbox/2026-11-11T0925-inference-on-the-critical-path.md
  - notes/inbox/2026-11-11T0926-dog-site-to-cat-site-demo.md
key_points:
  - "Waiting breaks flow: the median coding-agent turn is 63 seconds, past the point where people switch away (00:02:57)"
  - "More tokens and faster tokens are at odds on a Pareto frontier; better hardware matching pushes it out (00:06:01, 00:06:33, 00:08:06)"
  - "Make inference 10x faster and the bottleneck moves to the tool calls (00:10:37)"
  - "Fast enough, an agent can sit on the critical path instead of watching afterwards (00:12:18)"
kind: talk-story
status: draft
---

# When the bottleneck moves

Natalie Serrino co-founded Gimlet Labs, which builds an inference cloud for much
faster tokens. Her talk answers the question she gets all the time: isn't
inference already fast enough? Her answer is that speed doesn't just shorten the
wait. It moves the bottleneck, and it changes where agents can be used at all.

*Framing note: the transcript is a Qwen machine transcription; quotes keep its
wording. “From the notes” and “The reading” boxes are interpretation, not her
words.*

## Waiting breaks flow

She opens with her own agent making a slide look better in Figma (00:01:02). It
did good work, in about two minutes, after one request. Faster than she could
have done it, but long enough that she'd moved on to something else.

The web went through this already (00:02:57). In 2000, someone could have looked
at dial-up and said it was fast enough. The large companies of that era found
otherwise: a hundred milliseconds of added delay had a measurable effect on the
bottom line, and users didn't fully come back even after the delay was removed.

> “Even very small delays cost the users.”
> — 00:02:57

The psychology is about flow. About a tenth of a second feels instant; at one
second you keep your train of thought; at ten seconds you pick up your phone or
switch to another agent.

> “From data from June, the median coding agent turn is 63 seconds.”
> — 00:02:57

<div class="reading"><b>From the notes:</b> “i want to see how much faster these
agents can be, like do a research on fast token inference”. Still open; her
talk gives the yardsticks (0.1 s, 1 s, 10 s against a 63-second turn) and
Gimlet's posts in the links are a starting point.</div>

**Visual:** photo `photos/PXL_20261111_171650670.MP.jpg` (her slide: “Fast products keep us in flow state”, with 0.1 s, 1 s, 10 s and 63 s)

## More tokens or faster tokens

The catch is compute scarcity (00:06:01). Infrastructure is asked for two things
at once, and they pull against each other.

> “More tokens and faster tokens. Unfortunately, these goals are fundamentally at odds because faster tokens require more energy to produce than slower tokens.”
> — 00:06:01

Her Token Mint game makes it concrete (00:06:33): you run a token factory, and
the strategy for one fast token is completely different from the strategy for
the most tokens in a minute. Plotting real runs from her colleagues gives a
Pareto frontier.

> “If we have faster tokens, we don't have as many. And if we have more tokens, they're not as fast.”
> — 00:06:33

Upgrades in the game push the frontier up and to the right: more tokens and
faster ones. Gimlet's real-world upgrade is matching the chip to the job
(00:08:06): splitting a model into pieces and running each on a different kind of
accelerator, GPUs alongside SRAM-centric chips. Even with the network overhead,
that gives much faster tokens for the same power. Her Snake demo shows a coding
agent finishing on the split setup while the conventional one is still running
(00:09:43).

<div class="reading"><b>From the notes:</b> “what really is the pareto frontier?
does that mean the curve of price/performance tradeoff?” Yes, in this sense: the
curve of best trade-offs between how many tokens a data center makes and how
fast each user gets them. Every point on it is one you can't improve on one axis
without losing on the other. Better hardware matching doesn't move you along the
curve; it moves the curve. The game is at gimletlabs.ai/token-mint-game (laptop
only).</div>

**Visual:** diagram “tokens produced (up) against speed per user (right): today's frontier curve, and the upgraded curve further out” (illustrative)

## The bottleneck moves

People ask whether inference is even the bottleneck, or the tool calls are
(00:10:37). On her slide-editing run, 80 percent of the time was inference and
18 percent tool calls. Simulate 10x faster inference and the tool calls become
67 percent of the time.

> “That's why it's important that we have to constantly attack the bottlenecks of the application and get the low-hanging fruit where we can.”
> — 00:10:37

Nobody has optimized tool calls much, because today they aren't the bottleneck.
Once inference is fast, they will be the reason everyone waits. She notes that
this kind of optimization is verifiable (known inputs, known outputs), so agents
can do it; Gimlet is building a self-optimization loop from data-center telemetry
up to the model (00:11:38).

<div class="reading"><b>From the notes:</b> “the bottleneck will change when we
increase inference speed”. This is the line her slide makes: speeding up one part
of a system exposes the next slowest part, so the work is systematic, not one
fix.</div>

**Visual:** photo `photos/PXL_20261111_172207359.jpg` (her slide: “Big speedups in one area lead to new bottlenecks in other areas”, the turn timeline before and after 10x faster inference)

## Agents on the critical path

Her security demo (00:12:18) is a site for dog lovers, Dog Club, with a real
vulnerability in a Node dependency that lets an upload overwrite files it
shouldn't. A security agent watches live traffic. It doesn't know this
vulnerability, but it knows its job.

> “And the defender is monitoring, but it's not in the critical path because it's not fast enough.”
> — 00:12:18

So it watches asynchronously. When a malicious “dog” is uploaded, the defender
works out that the upload is doing something it shouldn't, but too late: the
attacker has already taken over the site. Rerun the same upload with ultra-fast
inference, and the defender sits inline and blocks the request before it lands.
Her point is that we think of agents as asynchronous; fast enough, they can work
online, in the request path.

<div class="reading"><b>From the notes:</b> “she's saying that we could use
inference on the critical path if things are really fast”, and the demo you
noted, where the attacker turned the dog website into a cat website. The reading:
speed changes the architecture, not just the wait. An agent that answers in
milliseconds can be a gate; one that answers in a minute can only be a
reviewer.</div>

**Visual:** diagram “request → slow defender watches after the fact → too late / request → fast defender inline → blocked” (illustrative)

## What faster unlocks

Faster internet took us from webmail at dial-up speed to on-demand streaming
(00:15:11). She asks the same of inference.

> “What does it look like when we get to a million tokens per second?”
> — 00:15:11

Her list: security that runs online, telling an agent what to build and watching
it appear, tap-complete for everything, many more agents, even robots. Requests
that fail today will start working as latency drops, the same way they start
working after a model release.

<div class="reading"><b>The reading:</b> this pairs with the decision-model talks
(<a href="../../2026-11-11-cloudflare-is-a-neolab/experience/page.html">Cloudflare</a>
and the Jev talks). They make a decision fast by making the model small; she
makes it fast by making inference fast. Either way, the agent moves from
reviewing afterwards to deciding inline. For a client: ask which checks you run
after the fact only because the model was too slow to run them in the path.</div>

**Visual:** photo `photos/PXL_20261111_172722980.MP.jpg` (her slide: “What new experiences will you build when AI is much faster?”)
