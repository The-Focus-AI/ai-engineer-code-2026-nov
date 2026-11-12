---
title: "Easier in public than in private: how Ramp's coding agent changed its culture"
speakers: "Zach Bruggeman (Ramp)"
duration: "7:00 (partial)"
source: transcript.md
video: null
themes: [guardrails-people-own, context-for-ai]
reader: "Will and his clients: why one shared, public coding agent spreads good practice faster than training, and how a session becomes the evidence for trusting a change"
built_from_notes:
  - notes/inbox/2026-11-11T1650-ramp-inspect-multiplayer-coding-agent.md
  - notes/inbox/2026-11-11T1653-build-tools-to-kill-information-silos.md
  - notes/inbox/2026-11-11T1655-inspect-other-peoples-sessions.md
  - notes/inbox/2026-11-11T1705-cut-talk-short.md
built_from_photos: 4
notes_frame:
  spine: "shared, public sessions (2 notes, 2 photos: the Inspect demo, Easier to work in public)"
  then: "kill information silos (1 note), the intro (1 photo: The technology was the novel part)"
  missing: "the recording covers about the first seven minutes of the talk; the rest of 'Build trust', all of 'Think bigger' and the closing are not captured"
key_points:
  - "One shared coding agent for the whole company kills information silos: improvements reach everyone, with no mandate (00:04:25, 00:05:14)"
  - "Every session is public by default, so people learn by watching teammates instead of in AI training sessions (00:05:38)"
  - "The session is the artifact: a reviewer sees the conversation, tools, screenshots and a verification video, not just the diff (00:07:27)"
kind: talk-story
status: draft
---

# Easier in public than in private

Ramp built its own coding agent, Inspect, and it now writes about three quarters of
the company's code. Zach Bruggeman's talk skips the plumbing for what came after:
the culture. Ramp runs one shared agent for the whole company, and every session in
it is public by default. Good practice spreads without training, and a session
becomes the evidence that lets a reviewer trust a change.

*Framing note: this story is framed by the notes and photos taken in the room: three
notes on the talk and four photos. The talk was cut short in the room, so the
recording covers only about its first seven minutes. His slide sidebar shows the
sections: Intro, Kill silos, Build trust, Think bigger, Closing. This story covers
the first two and the start of the third. The transcript is a Qwen machine
transcription; quotes keep its wording, including “Inspire” and “inspects” for
Inspect. “From the notes” and “The reading” boxes are interpretation, not his
words.*

## Inspect, and why the technology isn't the story

The talk itself starts at 00:01:26, after some room chatter.

> “As a quick introduction, Inspect is Ramp's collaborative coding agent.”
> — 00:01:26

About a year ago Ramp bet on building its own,

> “with every session running remotely and being fully multiplayer.”
> — 00:01:26

It works alongside people and teams in Slack, Linear and other tools, and now goes
beyond writing code: design primitives, review agents, and verification, so anyone
can go from prompt to shipping. It's connected to the company's integrations, so
every session has the telemetry, databases and tools it needs.

> “Through this, we now see around seventy-five percent of all of Ramp's code. Being written and shipped by Inspire.”
> — 00:01:26

When Ramp first talked about Inspect, the technology was the news. His slide lists
it: sandboxes in under five seconds, all the internal context wired up, agents working
multiplayer. That's no longer rare, and Inspect is now a product.

> “the technology isn't nearly the barrier that it once was.”
> — 00:01:26

So the talk is about something else (00:02:55):

> “the lessons we've learned around building a culture around inspect”
> — 00:02:55

<div class="reading"><b>From the notes:</b> “inspect is Ramp's coding agent,
multiplayer”. His opening demo shows what that means: an Inspect session started
from a Slack message (“@inspect the approve and deny buttons are greyed out on this
transaction, fix this”), with the chat, a live browser on Ramp's expenses app, and
the agent's trace side by side. The technical deep dives (Ramp's own post and the
Pragmatic Engineer's) are on the <a href="links.md">links page</a>.</div>

**Visual:** photo `photos/PXL_20261112_005033164.MP.jpg` (the Inspect demo: a session titled “Show how Inspect re-shaped Ramp's engineering culture”, a request posted from Slack to fix greyed-out approve buttons, and a live browser on Ramp's card transactions page)

## Kill information silos: one Inspect for everyone

Ramp looks at everything as time and money (00:03:29).

> “One thing about working at Ramp is that it really makes you start thinking about everything through the lens of saving time and money.”
> — 00:03:29

If everyone in a company of hundreds or thousands spends fifteen minutes setting up
their own agent,

> “Once you start multiplying that across an organization, this is days lost for what is very rote work.”
> — 00:03:29

And best practice moves fast:

> “You realize this setup cost isn't just one time.”
> — 00:03:29

The knowledge also spreads unevenly, so outcomes differ across the organization. An
individual might count that as an edge; a company can't.

> “When you're trying to win, you need everyone on your A game.”
> — 00:03:29

That was the first lesson (00:04:25):

> “Build tools that kill information silos.”
> — 00:04:25

When a pattern or tool works, they push it to the whole company at once. People can
still tune their own setups,

> “But Inspect is always available as a very solid baseline.”
> — 00:04:25

and because the baseline is good, they've never had to mandate it. Nobody keeps up
with everything:

> “Even if keeping up with us is your full-time job, we all miss things, hold biases, and have blind spots.”
> — 00:04:25

So by design there's only one (00:05:14):

> “So part of the design of Inspect is that there's just one single inspect.”
> — 00:05:14

> “You just keep using Inspect as you normally would, and benefit from the improvements that everyone's making over time.”
> — 00:05:14

<div class="reading"><b>From the notes:</b> “build tools to kill information
silos”. <b>The reading:</b> the silo here isn't data, it's know-how: how each
engineer has set up their agent. A shared agent makes that know-how a company asset
that improves for everyone at once. It's the opposite of every engineer maintaining a private
harness. For a client: how many agent setups do they have, and who updates
them when best practice changes?</div>

**Visual:** diagram “left: many engineers, each with their own agent setup, fifteen minutes each, repeated whenever best practice changes; right: one shared Inspect, improved once and used by everyone” (illustrative)

## Easier to work in public than in private

The second half of the design is visibility (00:05:38). They don't run weekly
training sessions on using AI.

> “With every Inspect session being public within the company by default.”
> — 00:05:38

> “It's actually easier to work in public than in private.”
> — 00:05:38

> “And you can learn how to use it by watching how your teammates use it.”
> — 00:05:38

That happens in the channels people are already in, and it goes both ways. The agent
helps:

> “You can literally ask inspects to go through their recent sessions and tell you about how they work, how they structure prompts.”
> — 00:05:38

His slide shows one: asked to go through a colleague's recent sessions and say how
he structures prompts, Inspect finds three habits: he starts with the outcome and says
how he'll verify it; he points at prior art, a similar PR or session to follow; and he
splits big problems into one session per risky piece. The Inspect team learns from it
too:

> “We frequently see the way people use inspect in ways that we didn't originally imagine.”
> — 00:05:38

That shows them which patterns to make native and where tools or data are missing, a
self-sustaining loop.

<div class="reading"><b>From the notes:</b> “you can inspect other people's
sessions”. <b>The reading:</b> public sessions turn every engineer's work into
training material, and the agent can summarize it. The three habits on his slide are
worth copying as they are: start with the outcome and how you'll verify it, point at
prior art, one session per risky piece. They match Lovable's outer loop and Diogo's
“stages that can be verified”.</div>

**Visual:** photo `photos/PXL_20261112_005452779.jpg` (his slide: “Easier to work in public than in private”: every session is public inside the company; no “how to use AI” trainings; learn by watching your teammates. Beside it, Inspect answering “Go through RJ's recent sessions. How does he structure prompts?” with three habits)

## Building trust: the session is the artifact

The second lesson (00:06:44):

> “It's all about building trust.”
> — 00:06:44

Better models helped, but much of adopting agent-driven coding this year has been
learning to trust what an agent builds.

> “So much of building trust in tools comes from learning from other people.”
> — 00:06:44

Usually that means conference speakers:

> “But if we limit our corpus of knowledge to just those who find the perverse enjoyment in public speaking.”
> — 00:06:44

we miss most of it (00:07:27).

> “Instead of grouping around a select few leaders, can we build systems that inherently share the knowledge of everyone?”
> — 00:07:27

That's what the public session does for a change:

> “It's a living artifact of how that change came to be, when a pull request goes up.”
> — 00:07:27

> “Anyone reviewing it doesn't just see the 400-line diff dropped over the wall and hope for the best.”
> — 00:07:27

They see the conversation, the tools and specs used, before-and-after screenshots,
even a video of the verification agent clicking through the app in a browser to show
the change holds up. The recording ends here, mid-sentence.

<div class="reading"><b>From the notes:</b> “i had to cut that talk short”. The
rest of “Build trust”, all of “Think bigger” and the closing aren't captured.
<b>The reading:</b> this is the same move as your Cognition note this morning, “they
are sharing the videos etc to show that things work”
(<code>notes/inbox/2026-11-12T1125-cognition-sharing-videos-as-proof.md</code>):
evidence travels with the change. It's the answer to Diogo's root of slop, unchecked
output that pushes the checking onto someone else: here the author's agent does the
checking and attaches the proof. For a client: what does a reviewer see beside the
diff?</div>

**Visual:** quote “Anyone reviewing it doesn't just see the 400-line diff dropped over the wall and hope for the best.” (00:07:27)
