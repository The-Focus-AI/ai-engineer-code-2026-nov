---
title: "The model eats the tool: rebuilding the harness from what the last one taught you"
speakers: "Philipp Schmid (Google DeepMind)"
duration: "16:02"
source: transcript.md
video: null
themes: [decision-load]
reader: "Will and his clients: how to decide what an agent harness should still provide, now that each model generation absorbs the tools the last one needed"
built_from_notes:
  - notes/inbox/2026-11-11T1121-deepmind-talk-slides-look-nice.md
  - notes/inbox/2026-11-11T1121-2-there-is-a-decision-model.md
  - notes/inbox/2026-11-11T1122-write-about-decision-models.md
  - notes/inbox/2026-11-11T1124-bash-is-a-python-one-liner.md
  - notes/inbox/2026-11-11T1125-the-model-eats-the-tool.md
  - notes/inbox/2026-11-11T1127-auto-background-return-file-descriptor.md
  - notes/inbox/2026-11-11T1135-2-code-tool-like-old-cloudflare-idea.md
  - notes/inbox/2026-11-11T1135-future-is-fewer-tokens.md
  - notes/inbox/2026-11-11T1136-philschmid-de.md
key_points:
  - "Every six months he rebuilds the harness and asks what the model no longer needs: the model eats the tools (00:03:20, 00:06:11, 00:13:33)"
  - "One tool, bash, replaces file editing, planning, memory and subagents; the harness only brings in what the model still can't do (00:04:31, 00:07:44)"
  - "A better model writes one script instead of many tool calls, and the difference only shows in tokens, not score (00:11:39, 00:13:33)"
kind: talk-story
status: draft
---

# The model eats the tool

Philipp Schmid builds agents at Google DeepMind, and every six months he rebuilds
his coding-agent harness from scratch. His latest rebuild deleted roughly 90
percent of it. The lesson isn't "use bash". It's the method: each model
generation absorbs tools the previous harness had to provide, so each rebuild
starts by asking what the model now does on its own, and brings in only what it
still can't.

*Framing note: the transcript is a Qwen machine transcription and garbles the
model names ("Calvin", "Argue", "Argent" for Gemini models; "PyHarness" for the
Pi harness). Quotes keep its wording. “From the notes” and “The reading” boxes
are interpretation, not his words.*

## The bitter lesson, applied to harnesses

He starts from Richard Sutton's essay (00:00:13).

> “General methods that leverage computations are ultimately the most effective by a large margin”
> — 00:00:13

For agents, that means the more compute goes into the models, the less harness
and the less code you need around them. And the way models learn agentic work
explains why (00:01:58): in post-training, the model attempts a task with tools
and a verifier scores the result.

> “No one is telling the model which tools to use, and basically it only receives that reward feedback.”
> — 00:01:58

So whatever path to the reward is cheapest, the model learns. A harness built
around a particular set of tools is a guess about what the model needs, and the
guess goes stale.

**Visual:** photo `photos/PXL_20261111_192121284.jpg` (his Sutton quote slide)

## Learning from the last harness

Every six months he builds a new harness and asks the same question (00:03:20).

> “how much of the harness do I really need to achieve the Same task, and what is overhead to the model”
> — 00:03:20

The history is a sequence of things the harness used to carry. Two years ago:
workflows with fixed steps, planners and retrieval. Then agents with many
fine-grained tools. Then coding agents in 2025 with ten to twenty tools for
editing files, planning and to-do lists, plus long system prompts full of rules
about what to do and what not to do. System prompts shrank too (00:06:11): much of
what had to be sent with every request is now part of the model.

<div class="reading"><b>From the notes:</b> “he's referring to it as ‘the model
eats the tool’”. That's the spine of the talk: each rebuild looks back at the last
harness, finds the tools and rules the model has absorbed, and deletes them. In
the recording his phrase comes out garbled at 00:13:33 (“Will keep eating the
honors”, likely “the harness”); both transcripts have it that way. His Bitter
Lesson slide backs the reading: its caption, partly hidden by the speaker in the
photo, says more compute makes better models, better models need less of our
code, and ends “…ats the harness”.</div>

**Visual:** photo `photos/PXL_20261111_192437514.jpg` (his slide: “A coding agent in 2025 – 16 tools and the rules to use them”)

## One tool: bash

His latest experiment gives the agent a single tool, bash, running in a clean
subshell (00:04:31). Everything else the old harness provided, the model now does
through it. Dedicated file tools become shell commands. Planning and memory
become files the model writes and reads. Subagents disappear:

> “If the agent itself is a CLI, it can call itself using bash.”
> — 00:04:31

The comparison is stark (00:02:31): the same repository change takes about ten
turns with dedicated read and edit tools, and two with one bash script, at about a
tenth of the tokens.

<div class="reading"><b>From the notes:</b> “having it automatically go to the
background after some number of seconds, just return the file descriptor, and it
is smart enough to deal with it”. That is one of the few things the harness still
brings in: a parameter that moves a long-running command to the background after a
timeout and hands the model a file to read its output from later. The model
handles the rest.</div>

**Visual:** photo `photos/PXL_20261111_192552608.MP.jpg` (his slide: “A 1-tool agent: a computer instead of a toolbox”)

## What the harness still brings in

Deleting tools isn't the whole method; adding back what's missing is the other
half (00:07:44). Bash can't show the model an image: cat-ing a screenshot returns
binary that fills the context and the model can't see. So his evaluation adds one
tool back, a view-media tool that returns images in a form the model can see.

The harness that's left is small and specific: a shell, a way to see images, and a
way to background long work. Each piece exists because the model can't do it
through bash, not because a previous harness had it.

<div class="reading"><b>The reading:</b> this is the part to copy. Not “one tool”
as a rule, but a review on every model release: what did the last harness provide
that the model now does itself (delete it), and what can the model still not do
through a computer (provide exactly that).</div>

**Visual:** diagram “2025 harness (16 tools, rules) → delete what the model absorbed → bash + view media + background handle” (illustrative)

## The model writes the tool

The demos show why it works better as models improve (00:09:37). With Gemini 3.5
Flash, bash-only and the default tools made the same number of calls: it used
bash one command at a time. The newer Gemini 4 model does something different.

> “it uses Python to write an inline script.”
> — 00:11:39

It searches for what to change and writes one script that makes all the edits in
one go. The better model chains 2.2 to 3.7 commands per bash call against 1.3 to
1.8 for Flash, and uses up to three times fewer tokens for the same task.

<div class="reading"><b>From the notes:</b> “its using bash but the bash is a
python ‘one-liner’ so I'm not sure if that is valid”. In his framing it's the
point, not a loophole. The bash tool gives the model a computer; the model writes
whatever code the task needs and runs it. The edit tool didn't vanish: the model
wrote its own, for this task, inline. That is the model eating the tool.</div>

**Visual:** photo `photos/PXL_20261111_192337423.MP.jpg` (his slide: “Two paths to the same reward”, ten turns with tools against two with bash)

## Same score, half the cost

The reason this is easy to miss (00:07:44): on his own set of about 350 coding,
knowledge-work and terminal tasks, four harnesses scored roughly the same. Only the
cost differed. Bash-only tasks used fewer tokens, hit the cache more often, and
were almost twice as cheap.

> “so if your harness Is more complex to use. The model will work around it.”
> — 00:13:33

It finds a way around an over-built harness, at the price of more turns and more
tokens, and accuracy alone won't show it. He expects 2027 to be about how many
tokens a task needs.

<div class="reading"><b>From the notes:</b> “he thinks that the future will be
fewer tokens, in terms of numbers not just token/sec”. The counterpoint to Natalie
Serrino's talk this morning
(<a href="../../2026-11-11-what-will-you-build-when-ai-is-10x-faster/experience/page.html">When the bottleneck moves</a>):
she makes tokens faster, he makes tasks need fewer of them. Both shorten the
wait.</div>

**Visual:** diagram “four harnesses: same score bar, different tokens-per-task and cost bars” (illustrative)

## What comes next

He'll rerun the experiment in six months, and he expects the next turn to be code
(00:14:23): agents writing TypeScript or Python directly instead of bash, and MCP
coming back, now that MCP servers can return structured output the model can
script against. A typed code layer is also easier to secure than bash, where the
commands are hard to inspect.

> “Give your model to a computer, not a toolbox.”
> — 00:15:25

<div class="reading"><b>From the notes:</b> “the code running tool is like the old
cloudflare idea”, likely Cloudflare's earlier “Code Mode”, where the model writes
code against tool APIs instead of calling them one by one. Unverified, but it's the
same direction.</div>

**Visual:** quote “Give your model to a computer, not a toolbox.”

## Also launched: a decision model

At the top of the talk (00:01:29) he announced the Gemini Decisions API, launched
about an hour earlier with a new Gemini Decision One model: multimodal input, up to
1,000 questions in one request, 150 to 250 milliseconds end to end, 10 cents per
million tokens.

> “Happy to share that we launched the Gemini Decisions API.”
> — 00:01:29

<div class="reading"><b>From the notes:</b> “there's a decision model also”, and
the follow-up to write about how to use decision models overall. That's the fourth
today, after Cloudflare's Clef, TypeSafe's Jev and Workday's use of it. The two
halves of his talk fit together: the harness shrinks to a computer, and the small
yes/no and pick-one calls move to decision models.</div>

**Visual:** quote “Happy to share that we launched the Gemini Decisions API.”
