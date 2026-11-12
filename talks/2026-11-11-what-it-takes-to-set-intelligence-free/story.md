---
title: "The output is a business: how Lovable lets an agent work for ten hours"
speakers: "Fabian Hedin (Lovable)"
duration: "19:04"
source: transcript.md
video: null
themes: [guardrails-people-own, context-for-ai]
reader: "Will and his clients: what it takes to run agents for hours, not minutes, and why owning the business layer gives the agent better feedback than tests alone"
built_from_notes:
  - notes/inbox/2026-11-11T1633-lovable-business-functionality.md
  - notes/inbox/2026-11-11T1635-lovable-agent-runtime-30min-to-10h.md
  - notes/inbox/2026-11-11T1637-trajectory-append-only-forkable.md
  - notes/inbox/2026-11-11T1637-inbox-concept.md
  - notes/inbox/2026-11-11T1641-many-sandbox-providers.md
  - notes/inbox/2026-11-11T1646-lovable-inner-outer-loops.md
built_from_photos: 6
notes_frame:
  spine: "business functionality and the inner/outer loops (2 notes, one emphasized; 2 photos: Agent/Cloud/Business, Two loops)"
  then: "the agent runtime (3 notes, 1 photo), the computers (1 note, 1 photo), what Lovable is (2 photos of one slide)"
  skipped: "the debug-tool demo is folded into the trajectory chapter"
key_points:
  - "The output is a business, not code: Lovable owns payments, email, SEO, ads and analytics, and the agent is in the loop on all of it (00:02:04, 00:02:29)"
  - "Ten-hour agents need a runtime that survives deploys: an inbox per agent, a Git-like trajectory that forks but never merges, and stateless processes (00:05:39, 00:06:56, 00:09:49)"
  - "Two loops of verification: fix it now within the turn, improve it later between turns from production and business metrics (00:16:03)"
kind: talk-story
status: draft
---

# The output is a business

Lovable's agents now work for ten hours or more, at over a billion tokens a minute.
Fabian Hedin's talk is about what that took: a runtime that survives seven hundred
deploys a day, computers that start and fork in a fraction of a second, and two
loops of verification. The outer loop is the one to watch. Because Lovable owns
the business features too, from payments to ads, the agent can learn from how the
product is actually doing, not just whether the code builds.

*Framing note: this story is framed by the notes and photos taken in the room: six
notes and six photos, weighted towards the business features and the two loops. The
recording starts mid-sentence, so the opening of the talk is missing. The
transcript is a Qwen machine transcription; quotes keep its wording, including
“Asians” and “alarms” for agents and LLMs, and “problems” for prompts. “Niteshift” and
“Ramp” in the transcript come from the transcription prompt, not the audio. “From the
notes” and “The reading” boxes are interpretation, not his words.*

## Outcomes, not code

The recording opens on the history (00:00:00): early multi-agent systems, then a
simpler single-agent design that was responsive and reliable, and now agents again.

> “over a billion tokens per minute on this system that I'm going to talk about.”
> — 00:00:00

The interface hasn't changed since 2023 (00:00:42): a chat on the left where people
describe what they want, a preview on the right showing the result. What's changed is
how complex the result can be. Lovable's thesis:

> “You won't have to care about the code in the same way that you had to do before”
> — 00:00:42

> “But in the end, what matters is actually not the code.”
> — 00:02:04

What matters is the outcome, and for Lovable's users that means

> “Is creating a business and monetizing and creating value for others in some type of way.”
> — 00:02:04

So the platform has three parts (00:02:29). The agent builds, verifies against
Lovable's clusters, and pushes to GitHub. The cloud gives it hosting primitives it
can inspect: databases, authentication, storage, backend compute, security
scanners, backups and logs. And the business part, because the output isn't code:

> “The output is a product or. Or a business”
> — 00:02:29

That means taking payments, sending emails, SEO, Google and Meta ads, and analytics
on conversions,

> “and the agent is in the loop. In all of this, right?”
> — 00:02:29

<div class="reading"><b>From the notes:</b> “i like the business functionality that
lovable has built in, that's a key part of the system”. It's key for a reason the
talk only reveals at the end: owning payments and analytics is what lets the agent's
outer loop see real business results (last chapter). <b>The reading:</b> most coding
agents stop at the pull request. Lovable's agent can see whether the change sold
anything.</div>

**Visual:** photo `photos/PXL_20261112_003205587.jpg` (his slide: three columns. Agent: full-stack apps; build, run and test; browser verification; GitHub and code ownership; generate MCP servers; connect tools and APIs. Cloud: database and authentication; storage and realtime; edge functions and jobs; hosting and custom domains; security scanners; backups and logs. Business: payments and subscriptions; emails; SEO and AI search; Google and Meta ads; analytics and conversions; growth plans and outreach)

## From 30 minutes to 10 hours

Lovable used to cap its agents (00:04:32):

> “we used to limit our agents to work for only thirty minutes.”
> — 00:04:32

> “Because we thought they weren't reliable to work for longer amount of time.”
> — 00:04:32

Now there's no limit:

> “And so you can imagine agents working for ten hours.”
> — 00:04:32

Three pieces of the architecture made that possible (00:05:00): the agent runtime,
which has to keep running for that long; the computer, where each agent runs a web
server and checks its work; and verification, because

> “If you want an agent to work for a long amount of time, you need to make sure that you have these feedback loops in place”
> — 00:05:00

so that it doesn't wander off in the wrong direction.

<div class="reading"><b>From the notes:</b> “lovable used to limit agents to 30
minutes but now its 10+ hours”. It's the same horizon Simon Willison described the
same evening for Fable-class models: set up the goal and the tools, and twelve hours
later it's solved
(<a href="../2026-11-11-2026-in-llms/story.md">It doesn't get easier</a>). Lovable's
talk is the infrastructure side of that: what has to be true of the runtime and the
computer for an agent to run that long in production.</div>

**Visual:** diagram “three pieces: runtime (inbox, trajectory, stateless process) → computer (golden checkpoint, forks) → verification (inner loop, outer loop), around one ten-hour agent” (illustrative)

## An inbox per agent

An agent can hear from three kinds of sender (00:05:39): a human prompting it, other
agents, or a system on a schedule waking it up.

> “And the way we chose to architect this is that for each agent, we have a separate inbox.”
> — 00:05:39

Messages such as “What's the status?” land in the inbox while the agent works. When
it finishes a step, a request, a tool call and its result, it's ready to take
messages:

> “Since anyone can drop a message into his inbox, the agent then can copy that itself.”
> — 00:05:39

It copies them into its own task history, which Lovable calls the trajectory.

<div class="reading"><b>From the notes:</b> “there is an inbox concept”. The design
choice is that nobody writes into an agent's history directly: humans, agents and
schedules all post to the inbox, and the agent decides when to take messages in,
between steps. That's what makes an always-on agent interruptible without being
derailed.</div>

**Visual:** photo `photos/PXL_20261112_003527454.jpg` (his slide: “The agent runtime: Always-on”: you, other agents and a scheduled wake-up send messages to an inbox; the agent copies them into its task history between steps)

## A trajectory modelled on Git

The trajectory is the agent's history and the basis of its memory (00:06:56).

> “And we designed this trajectory with really Git as inspiration”
> — 00:06:56

It's an append-only log in which each event points to its parent. Two events can
point to the same parent, which makes a fork, so parallel agents can be spun off from
any point without copying the history they share. Merging is another matter:

> “Semantically, it's a bit unclear what would happen if you merge this.”
> — 00:06:56

> “So unlike it, we cannot merge agent trajectories”
> — 00:06:56

The forked agents can talk to each other instead. Two more design choices follow.
First, the log holds everything, every tool call and platform event, and the prompt
is built from it, not equal to it (00:08:00). Compaction depends on the model: a
model with a shorter context needs summarizing sooner.

> “And so, by separating the prompt from the actual task history.”
> — 00:08:00

> “We're able to render problems for any type of model or any type of task.”
> — 00:08:00

His debug tool shows it: drag a slider across 156 events and the UI re-renders
itself at any point in the history (00:09:11). Second, the process running an agent
is almost stateless (00:09:49). After each turn it writes to the history, so any
process can pick up the work. That matters because

> “As a whole, this system we deploy to it 700 times per day.”
> — 00:09:49

about once every two minutes, including urgent fixes such as a Linux kernel
vulnerability, and a ten-hour agent can't be restarted from scratch each time.

<div class="reading"><b>From the notes:</b> “the trajectory is an append only log
but it can be forked/split like git”. <b>The reading:</b> it's an answer to two other
talks from the same afternoon. Yegge warned that agent memory becomes a garbage dump
because agents never delete
(<a href="../2026-11-11-software-factories-escape-from-trash-mountain/story.md">Every problem is a fuel problem</a>);
Lovable keeps everything but never feeds the raw log to the model, rendering a fresh
prompt per model instead. And Diogo asked why parallel agents can't share what they've
learned
(<a href="../2026-11-11-i-love-you-so-jevving-much/story.md">Too good to be true</a>);
forks share their whole history up to the split. An append-only log is good evidence;
the prompt is the working memory.</div>

**Visual:** diagram “an append-only event log; two events share a parent, forking into parallel agents; no merge; a prompt rendered from the log per model” (illustrative)

## Computers from a golden checkpoint

The second piece is the computer each agent works in (00:11:24).

> “And we've been through a lot of situations and a lot of vendors”
> — 00:11:24

They landed on their own system: checkpointing whole computers. A golden checkpoint
holds the operating system and system services, common tools, and a dev server ready
to start, including memory and running processes. A new project copies it:

> “all of them you copy it over in about 230 milliseconds.”
> — 00:11:24

Each project then gets its own checkpoint, saved after every agent turn, so a
computer can be shut down after ten idle minutes and brought back in moments. The
same trick forks running computers (00:13:02):

> “we can also port the computer.”
> — 00:13:02

(“Port” is the transcript's fork.) Lovable's Drafts feature uses it to try several
versions at once, potentially hundreds. Two optimizations make that affordable
(00:13:38). Memory is copy-on-write:

> “Creating one of these forks of a computer is. It's basically free in terms of the RAM that it's using.”
> — 00:13:38

and memory streams in, so a machine boots before all of its memory has arrived. Then
they forked the JavaScript dev server and rewrote it in Rust (00:14:48), dropping the
Node dependency.

> “We went from getting this preview from 40 seconds to three seconds”
> — 00:14:48

> “That made the memory footprint be 6.5 times less in these machines.”
> — 00:14:48

Controlling how the app writes to memory also makes the copy-on-write forks cheaper,
so many agents can explore different fixes in parallel.

<div class="reading"><b>From the notes:</b> “they went through a lot of computer
providers/sandbox providers”. In the end they built their own, and their slide gives
the scale: around a million sandboxes a day. The transcript's “Niteshift” for the dev
server comes from the transcription prompt; the dossier identifies it as Vite, forked
into OJ, which is open source (on the <a href="links.md">links page</a>). <b>The
reading:</b> fast, forkable computers are what make parallel exploration cheap, which
is the condition for letting agents try several fixes and keep the one that
works.</div>

**Visual:** photo `photos/PXL_20261112_004138678.jpg` (his slide: “New computers start from a golden checkpoint”: a golden checkpoint prepared once with OS and system services, common tools and a dev server, copied to new computers for projects A, B and C with their own code and dependencies; “A VM resumes in 230 ms”; “We run around 1M sandboxes a day”)

## Two loops: fix it now, improve it later

The last piece is verification (00:16:03). After every action, the agent needs to
know whether it was a good one.

> “You can think of it as this inner loop and this outer loop.”
> — 00:16:03

> “So this inner loop is during the turn of the agent.”
> — 00:16:03

Within the turn: does the build work, linters and type checkers, runtime errors in the
preview, a headless browser exploring the app. His slide adds judges in the turn,
domain scanners, backend logs, guardrails, and fixes the user triggers.

> “but then you also have this outer loop, which is. Between each turn”
> — 00:16:03

Between turns, when the agent has handed back to the user, information arrives from
production: how visitors behave, what users say online, automatic A/B tests on a
change of copy. And because Lovable runs the payments, transactions and conversions
too, the agent can

> “help you optimize not only. The code right, but the business strategy around your product.”
> — 00:16:03

His slide's footnote draws a line: production outcomes reach the agent only as
next-turn findings, never as a training signal.

<div class="reading"><b>From the notes:</b> “the lovable inner and outer loops are
super interesting”, the note marked as the key one. <b>The reading:</b> this is where
the business functionality pays off. The inner loop checks the code; the outer loop
checks the product, and only a platform that owns payments, email and analytics can
close it. It's an answer to Diogo's line between assistance and automation: the inner
loop makes a single turn reliable, and the outer loop gives a ten-hour agent a reason
to change course. It also fits two Cognition notes from this morning, teaching agents
how to test the codebase and using sessions for self-improvement. For a client: what
is their outer loop, and can their agents see it?</div>

**Visual:** photo `photos/PXL_20261112_004621562.jpg` (his slide: “Two loops: fix it now, improve it later”. Inner loop, during the turn: build, lint and type errors; runtime errors; browser and visual checks; judges in the turn; domain scanners; backend logs and usage; guardrails and notices; user-triggered fixes. Outer loop, between turns: production signals, visitor behaviour, what users tell you, automatic A/B tests, transactions and conversions, findings fed back next turn. “Production outcomes reach the agent only as next-turn findings, never as a training signal.”)
