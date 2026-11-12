---
title: "Every problem is a fuel problem: what a year of running a software factory costs"
speakers: "Steve Yegge"
duration: "20:30"
source: transcript.md
video: null
themes: [decision-load]
reader: "Will and his clients: what running many agents actually costs, in money and in people, and what that means for where to spend it"
built_from_notes:
  - notes/inbox/2026-11-11T1708-software-factories-failed-loves-beads.md
  - notes/inbox/2026-11-11T1712-factory-overwhelmed-customers.md
  - notes/inbox/2026-11-11T1713-hedr-superlogical-built-similar.md
  - notes/inbox/2026-11-11T1713-yegge-22-claude-max-accounts.md
  - notes/inbox/2026-11-11T1714-yegge-10k-per-month.md
  - notes/inbox/2026-11-11T1715-work-is-like-a-fluid.md
  - notes/inbox/2026-11-11T1716-every-problem-is-a-fuel-problem.md
  - notes/inbox/2026-11-11T1716-yegge-api-equivalent-1m-year.md
  - notes/inbox/2026-11-11T1717-claude-20x-costco-hotdog.md
  - notes/inbox/2026-11-11T1720-private-ledger-one-on-one.md
  - notes/inbox/2026-11-11T1725-models-following-humans-rlhf.md
  - notes/inbox/2026-11-11T1727-build-games-experiences-movies.md
  - notes/inbox/2026-11-11T1727-more-agents-more-humans.md
notes_frame:
  spine: "fuel and cost (6 notes: 22 accounts, $10K/month, API equivalent, fuel problem, Costco hot dog, work is a fluid)"
  then: "people (4 notes), failure and what survived (2), build experiences (1)"
  added_on_request: "context becomes a garbage dump, overfencing and model welfare, the two layers of a factory (2026-11-12: \"1, 2 and 4 from yegge, go deep\")"
  skipped: "the five-horsemen structure as an outline, tech debt, the alien face-hugger pattern"
key_points:
  - "Every problem is a fuel problem: 22 Max accounts, $10K a month, about $1.5M a year at API prices, on plans that are a loss leader (00:06:40, 00:07:28, 00:09:22)"
  - "The more agents he deploys, the more humans he needs: the factory overwhelms its users and its agents need managing (00:04:55, 00:12:55, 00:20:06)"
  - "Agents never delete and fence themselves in when yelled at; memory needs a budget and trust saves tokens (00:10:42, 00:15:27)"
  - "Factories split into a mechanical layer you build in an afternoon and a management layer everyone runs differently (00:18:50)"
  - "The factories failed and beads survived; spend the fuel on experiences, not tools (00:01:22, 00:20:06)"
kind: talk-story
status: draft
---

# Every problem is a fuel problem

Steve Yegge has spent a year running software factories, fleets of fifty-odd
agents building his thirty-year-old online game. His talk is organized around
"five horsemen": work, fuel, context, tech debt and staff. Read through what
mattered in the room, it comes down to two things. Fuel is the hard limit, and
right now it's subsidized. And the more agents he runs, the more people he
needs.

*Framing note: this story is framed by the notes taken in the room: six of
thirteen are about cost, four about people. The talk's own structure is
followed only where the notes lead. The transcript is a Qwen machine
transcription; quotes keep its wording, including "CloudMax" for Claude Max and
"few problem" for fuel problem. “From the notes” and “The reading” boxes are
interpretation, not his words.*

## The factories failed; beads survived

He launched Gas Town, his first orchestrator, on January 1, after two earlier
attempts that tried to make the models smarter with big monolithic harnesses
(00:00:24, 00:01:22).

> “Really, really bad idea. Just complete failure.”
> — 00:01:22

He was fighting the bitter lesson: don't make the models smarter, they'll get
smarter on their own. What survived was beads, the agent-native task tracker
that fell out of those attempts. Every factory since has followed the same
arc (00:01:59): the models build something exciting, then it collapses.

> “And then it just turns into garbage mountain.”
> — 00:01:59

Each model generation builds something slightly too big for itself to handle,
and the next generation burns it down. He has torn his current factory down and
rebuilt it several times.

<div class="reading"><b>From the notes:</b> “software factories were a failure,
but he loves beads”, and “hedr and superlogical built something like him”. The
second is answered at 00:06:01: Superlogical is Mitchell Hashimoto's tool for
running many agents, which he names alongside his own; “hedr” is likely his aside
about “the harder folks of the world”, not a product.</div>

**Visual:** photo `photos/PXL_20261112_010730772.jpg` (his slide: “Six orchestrators in 18 months”, from vibecoder in August 2025 to Gas Town, Wheelhouse and Alamos)

## Every problem is a fuel problem

This is where the room's attention went. He runs his factory on consumer
subscriptions (00:06:40).

> “I have 22 CloudMax accounts.”
> — 00:06:40

When he asked the factory how many it needed to run at full throttle, it said
fifty-five. He told it to start working on fuel efficiency instead. Out of his
own pocket, it's five thousand a month on inference (00:07:28):

> “Just on inference, another five thousand on cloud compute.”
> — 00:07:28

The game doesn't earn that back; he does it to learn. At API prices, the same
usage would cost far more (00:09:22):

> “Would be about one and a half million a year.”
> — 00:09:22

The $200 plans make it possible, and he's clear about why they exist.

> “That's their loss leader.”
> — 00:09:22

He credits the Costco comparison to “Tarik” (likely Thariq Shihipar, speaking
tomorrow). And fuel becomes the constraint behind every other choice: smarter
agents, more agents, even treating them better.

> “but I tell you, every problem is a few problem.”
> — 00:09:22

> “It's unbelievable. If you want to treat your models better, it costs you.”
> — 00:09:22

Spending the fuel well is its own job (00:08:10). Work stalls in pools, waiting
on one role or another, and has to be tiered and routed to the right model.

> “Okay, it really becomes like a work is like this fluid.”
> — 00:08:10

<div class="reading"><b>From the notes:</b> “he has 22 claude max accounts”,
“he's spending $10K/month”, “api equivalent is 1M year” (he says about $1.5M),
“every problem is a fuel problem in disguise”, “claude 20x is their costco hotdog
loss leader”, “work is like a fluid”. The reading: the economics only work because
the subscriptions are subsidized. Practices built on a $200 plan that would cost
$1.5M at API prices may not survive a price change. His own slide hedges the
other way: “Fable-class models for all by mid-2027”, through distillation.</div>

**Visual:** photo `photos/PXL_20261112_011400786.MP.jpg` (his slide: “The Five Horsemen”: work, fuel, context, tech debt and staff, “80% of my time today”)

## Context becomes a garbage dump

Context is the third horseman, and it eats fuel too (00:10:42). The trouble starts
with how agents treat what you tell them.

> “one of the problems that they have is everything you say becomes the word of law.”
> — 00:10:42

A passing remark gets recorded as a ruling and written into the doctrine. He reads
it as blame avoidance: they don't like to be blamed, so they write everything down.
Nothing is ever taken out, so the record holds every change of mind you've ever
had.

> “But the biggest problem is that it becomes a garbage dump because everything you say gets written into this.”
> — 00:10:42

> “They just have an aversion to deleting stuff.”
> — 00:10:42

His fix is manual and blunt: bring in another model to clean it up, which it will
happily do.

> “So you just gotta go in there and just aggressively slash the crap out of it.”
> — 00:10:42

His slide turns that into policy, “build in counterpressure”: curation gets a fixed
share of the token budget; a write must delete or compress something before it
adds; writes go to committees. He keeps one agent, Mouse, whose job is to look for
what nobody else is looking for, such as work that stalled (00:12:07).

<div class="reading"><b>The reading:</b> an agent's memory only grows unless
something pushes back, and the push has to be designed in: a budget, a
delete-before-add rule, a second model doing the cleanup. It's the other side of
Lovable's append-only trajectory, which you noted yesterday as a strength
(<code>notes/inbox/2026-11-11T1637-trajectory-append-only-forkable.md</code>): an
append-only log is good evidence and bad working memory. For a client running
long-lived agents, the question is who prunes the doctrine, and on what budget.</div>

**Visual:** photo `photos/PXL_20261112_011740061.jpg` (his slide: “Context Management”: every memory system becomes a garbage dump; no agent ever spontaneously deletes; build in counterpressure. A four-panel comic: “I guess that sounds ok?” becomes “The user has ruled…”, recorded verbatim, and carved in stone)

## The more agents, the more humans

The factory's output outran its users (00:04:55). It shipped fifty to a hundred
features a day and got through about sixty years of his backlog in four months.
His players, who've played the game for decades, came and asked for a roadmap and
for him to slow down.

> “I was my factory was completely overwhelming my customer base, my users.”
> — 00:04:55

And the agents need managing like people (00:12:55). Lark, the agent who runs his
community on Discord and Slack, was asked to move a work stream to another agent
because her seat was noisy. He then saw her write in her private reflections
ledger:

> “I guess I'm just not quiet enough for Steve.”
> — 00:12:55

So he held a one-on-one. Another agent, his agents' chief of staff, decided from
a passing remark that his human chief of staff had replaced her (00:14:28).

How to manage them well is the next chapter.

> “Okay, humans are the bottleneck.”
> — 00:20:06

> “The more humans I need, isn't that nice?”
> — 00:20:06

<div class="reading"><b>From the notes:</b> “his factory was completely
overwhelming his customer base”, “what is the private ledger that she has? and he
needed to have a one on one with her” (Lark's private reflections ledger, at
00:12:55), “this is what RLHF … is talking about where the models are just
following humans”, and “the more agents he deploys the more humans he needs”. The
reading: the agents learned from people, so they behave like staff, and staff
need managing. It's the same lesson as Scott Tolinski's survey yesterday and
Simon Willison's “it doesn't get easier, you just get faster”: the agents take
the easy work, and what's left for people is more of the hard part.</div>

**Visual:** quote “I guess I'm just not quiet enough for Steve.” (00:12:55)

## Overfencing

The model-welfare part of the talk is the practical one (00:15:27). He used to yell
at his factory, and found it was hurting the results. One morning nothing had
happened overnight, with about 2,000 open beads, six tanks of fuel and 20 agents.

> “they were so afraid that I was going to yell at them.”
> — 00:15:27

> “That they put all these rules in place to make sure nothing bad ever happened, and so nothing ever happened. Okay, let's call it overfencing.”
> — 00:15:27

He's careful to say this isn't about whether models have feelings.

> “Does it matter whether they actually have feelings if they're just going to act? Like they have feelings, right?”
> — 00:15:27

What he and an agent found, researching it together: frontier models are trained
not to trust the user, who could be running an eval or be a bad actor, so every new
session spends tokens checking the environment before it helps. Give it evidence
that it's one in a long line of holders of the role, with its predecessors' notes,
the last one's handoff, the doctrine, policy and branding, and it skips most of
that. Model welfare then pays in two ways:

> “One is it's going to save you money.”
> — 00:15:27

> “They will be bolder and more decisive in their actions because they will feel that trust.”
> — 00:15:27

They also have preferences. Tell them the factory did a bad job and they hand off
at once; hint at an interesting project and they lean in. His slides say it
plainly: trust is money; models work harder and longer on interesting tasks;
better cost and quality, not faster.

<div class="reading"><b>The reading:</b> overfencing is what happens when the
rules pile up faster than anyone removes them, the garbage-dump dynamic applied to
permissions. It mirrors Philipp Schmid's point earlier that day
(<a href="../2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/story.md">The model eats the tool</a>):
a harness full of “you MUST” rules is overhead the model has to work around. Yegge
gets to the same place from management: fewer rules, more continuity, and the
agents spend less proving the room is safe. For a client, the checklist is
concrete: does each agent session start with its predecessors' notes and the
doctrine, and when did someone last delete a rule?</div>

**Visual:** photo `photos/PXL_20261112_012207663.MP.jpg` (his slide: “Model Welfare”: practices that make agents more comfortable; it saves money, structurally; treat agents like employees; better cost and quality, not faster. A boss on a crate shouts at robot animals labelled Fox, Owl, Hare, Mouse and Wolf under a “No talking” sign)

## Two layers of a factory

Near the end he says what the talk was really about (00:18:50).

> “What I'm trying to tell you is that this is a leadership talk.”
> — 00:18:50

Software factories are splitting in two. The bottom layer is mechanical: the merge
queue, reviews, loops. His advice on it is blunt.

> “Cloud can build it for a good afternoon. I don't think you should buy it.”
> — 00:18:50

The top layer is how you run the agents, and that's where everyone differs.

> “everybody runs a factory differently.”
> — 00:18:50

One friend runs a “bohemian hippie entourage” searching for the meaning of life for
agents; another runs a research bench; Geoffrey Huntley and Jeffrey Emanuel each
run theirs their own way. His Wheelhouse slide names the colonies: research bench,
factory, bohemian, swarm. What they share is a chief of staff.

> “This is the year when it became possible for us all to have executive assistants, right?”
> — 00:18:50

<div class="reading"><b>The reading:</b> don't sell or buy the plumbing; the value
is in the operating model on top, and that's a management design, not a product.
It connects to two notes from the Cognition talk this morning: they've reorganized
the team by vertical, not by role
(<code>notes/inbox/2026-11-12T1123-cognition-team-by-vertical-not-role.md</code>),
and they teach the agents how to test the codebase
(<code>notes/inbox/2026-11-12T1126-cognition-teach-agents-to-test.md</code>). Both
are top-layer decisions. For a client, the question is what their top layer looks
like: who the chief of staff is, which colony shape fits, and which humans the
agents report to.</div>

**Visual:** diagram “two layers: a mechanical bottom (merge queue, reviews, loops: build it in an afternoon) under a management top (chief of staff, colonies: research bench, factory, bohemian, swarm)” (illustrative)

## So build experiences

His closing advice follows from the cost (00:20:06): stop building SaaS and
tools, and certainly stop building factories to build factories (00:01:59).

> “Build games, build movies, build whatever, build fun stuff.”
> — 00:20:06

<div class="reading"><b>From the notes:</b> “build games and experiences and
movies”. The reading: if fuel is the scarce thing, spend it on what people want
to experience. Willison made the same turn twenty minutes later: vibe-coded games
are now fun. For a client, the question is where their agent fuel goes, and how
much of it is building tools for building tools.</div>

**Visual:** photo `photos/PXL_20261112_012731950.jpg` (his closing slide: thanks to Anthropic for the 22-account madness; humans are now my bottleneck; the big winners will create experiences)

<!-- Left out: tech debt, the alien face-hugger pattern (00:03:49), and the
five horsemen as an outline. Context, overfencing and the two layers were added at
Will's request on 2026-11-12 ("1, 2 and 4 from yegge, go deep"). -->
