---
title: "A thousand agents, git and a database: Claude organizes its own team"
speakers: "Lance Martin (Anthropic)"
duration: "7:06 (first half of an 18:20 talk)"
source: transcript.md
video: null
themes: [less-harness-more-model, long-running-agents]
part: "1 of 2 (the second half is story-memory.md)"
reader: "Will and his clients: what a frontier model does with a big team and almost no harness, and what that means for how much structure to build around agents"
built_from_notes:
  - notes/inbox/2026-11-12T1238-fable-52-no-human-steering-multi-agent.md
  - notes/inbox/2026-11-12T1239-primitives-git-and-sql-database.md
  - notes/inbox/2026-11-12T1239-follow-up-agent-database-to-store-stuff.md
  - notes/inbox/2026-11-12T1241-agent-created-db-tables-for-coordination.md
  - notes/inbox/2026-11-12T1242-magnificent-work-all-999-of-you.md
built_from_photos: 3
notes_frame:
  spine: "a self-organizing agent team (5 notes, 3 photos: the title slide, the coordination tables, a washed-out slide)"
  split: "the talk has two halves; the operator asked for two stories (2026-11-12); memory and dreaming are in story-memory.md"
key_points:
  - "A thousand Fable 5.2 agents, each in its own sandbox, got only git, a SQL database and the problem: no domain harness and no human steering on the solution (00:02:06)"
  - "Five minutes in, the lead agent built its own coordination tables, and the team used them for a 30-hour proof (00:03:46)"
  - "Agents are getting good at orchestrating themselves with simple primitives on long-horizon work (00:05:27)"
kind: talk-story
status: draft
---

# A thousand agents, git and a database

Lance Martin told two stories about what Claude can now do on its own. This is the
first. In September, a dozen agents formalized Fermat's Last Theorem with a
purpose-built harness and a lot of help from researchers. With Fable 5.2, Anthropic
tried a thousand agents with almost nothing: a sandbox each, git, a SQL database
and the problem. Five minutes in, the lead agent had built the tables the team
would coordinate through for the next thirty hours.

*Framing note: this story is framed by the notes and photos taken in the room: five
notes and three photos on the agent team. The talk's second half, on memory and
dreaming, is its own story (story-memory.md). The transcript is a Qwen machine
transcription; quotes keep its wording, including "able-to" for Fable, "Andrew Wild"
for Andrew Wiles, "ProofTino" for the proof platform, "get" for git and "rice" and
"reeds" for writes and reads. "I'm Lance from Anthropic" at the start may come from
the transcription prompt. "From the notes" and "The reading" boxes are
interpretation, not his words.*

## A dozen agents and a harness

Fermat's Last Theorem stood unproven for about 350 years; Andrew Wiles's proof took
him seven years, and formalizing it, checking every step by computer in Lean, has
been a major effort since (00:00:13). In September, Anthropic published that Claude
had done it.

> “We started with a team of about a dozen agents.”
> — 00:00:13

Early on the team didn't work well, so they gave it a proof-orchestration platform
that managed the project's state as a graph the agents could query.

> “Think about it as like a very domain-specific harness.”
> — 00:00:13

That result also leaned on extensive analysis and support from researchers
(00:02:06).

**Visual:** photo `photos/PXL_20261112_203545768.jpg` (his title slide: "Exploring Claude's Frontiers", Lance Martin, Member of Technical Staff, Anthropic)

## A thousand agents, git and a database

The Fable 5.2 experiment asked a different question (00:02:06).

> “So going from a dozen to a thousand.”
> — 00:02:06

No domain knowledge, no proof platform, and:

> “And with no human steering, with respect to the solution.”
> — 00:02:06

The setup is mostly about safety: each agent runs in its own sandbox with
restricted network access, with real-time monitoring and an offline review of runs
every ten minutes. What the agents get to work with is short:

> “Two different things: Git and a SQL database.”
> — 00:02:06

The prompt is simple too:

> “It establishes one lead agent, 999 helper agents.”
> — 00:02:06

It tells them about git, the database and the problem statement, and that's all.

<div class="reading"><b>From the notes:</b> "Fable 5.2 is doing massive multi-agent
work with no human steering" and "they give the primitive git and a SQL database".
<b>The reading:</b> the structure Anthropic built is all safety (sandboxes,
monitoring), and none of it is domain help. That's the "Less harness, more model"
theme from Philipp Schmid
(<a href="../2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/story.md">The model eats the tool</a>)
pushed to a thousand agents: give them a computer and a shared store, not a
toolbox.</div>

**Visual:** quote “Two different things: Git and a SQL database.” (00:02:06)

## The lead built the tables in five minutes

What happened next is the point of the story (00:03:46).

> “Five minutes in the run, basically created these database tables.”
> — 00:03:46

> “We didn't tell them to.”
> — 00:03:46

The lead created a table to announce things, one to assign roles to workers, one for
notes where agents share context, one for subtasks, and a log of finished work, which
his slide calls Landed (the transcript has "Progress land"). A chart of the run shows writes and reads to each table over
time: the lead posting to the announce table now and then, assigning workers to
statements in the theorem, the helpers reading and writing as they go.

> “So agents now are sufficiently advanced that they can actually build primitives if they need to solve hard problems.”
> — 00:03:46

The run lasted about thirty hours.

> “This ran for around 30 hours.”
> — 00:03:46

For one of the hardest parts of the proof, the team went further and built its own
task tree of dependencies, tracking each subtask from in progress to done.

> “They actually developed their own abstraction.”
> — 00:03:46

<div class="reading"><b>From the notes:</b> "the agent created the database tables
within 5 minutes, coming up with the coordination", and "follow up on giving the
agent a database to store stuff". <b>The reading:</b> the database became the
team's shared work surface: a message board, a job queue and a progress log the
agents designed for themselves. It's the same shape as Lovable's inbox per agent and
Yegge's beads task tracker, except nobody built it in advance. For the follow-up,
the question is what the minimum shared store is (a git repo and one SQL database
here) and what the agent should be left to design on top.</div>

**Visual:** photo `photos/PXL_20261112_203933625.jpg` (his slide: the coordination tables the lead created between 1 lead and 999 helpers: Announce, the lead's orders to everyone; Assign, who works on what; Notes, an open board; Subtasks, a shared to-do list; Landed, a log of finished work)

## Thirty hours, no harness

Over the run the lead and the helpers reallocated themselves across the sixty
statements in the proof as each was solved (00:05:27). The lesson he draws:

> “So the point of all this is really just to kind of highlight: agents can solve very long horizon problems without much.”
> — 00:05:27

One note an agent left near the end, as the work was frozen:

> “Magnificent work all night.”
> — 00:05:27

The September result needed a dozen agents, a purpose-built harness and researchers
poking at it. This one needed safety structure and two primitives.

> “And agents are getting increasingly good at orchestrating themselves.”
> — 00:05:27

<div class="reading"><b>From the notes:</b> "Magnificent work, all 999 of you." The
recording has "Magnificent work all night"; his blog post on the run, on the
<a href="links.md">links page</a>, confirms the one lead and 999 helpers.
<b>The reading:</b> this sits against Steve Yegge's lesson from the day before
(<a href="../2026-11-11-software-factories-escape-from-trash-mountain/story.md">Every problem is a fuel problem</a>):
the more agents he runs, the more people he needs. Here a thousand agents ran thirty
hours with no human steering the solution, though with humans watching for safety
every ten minutes. The difference is the task: a formal proof checks itself in Lean,
so the team always knows whether it's right. For a client, the question is whether
their task has that kind of check; if it does, the agents may need far less
managing than they expect.</div>

**Visual:** quote “Magnificent work all night.” (00:05:27)
