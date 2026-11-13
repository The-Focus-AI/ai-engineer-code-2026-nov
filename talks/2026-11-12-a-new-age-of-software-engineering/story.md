---
title: "40× the work on 2.7× the people: how Cognition rebuilt its engineering around agents"
speakers: "Walden Yan (Cognition)"
duration: "13:51"
source: transcript.md
video: null
themes: [ambition-is-the-limit, guardrails-people-own, close-the-loop, long-running-agents]
reader: "Will and his clients: what a team actually changes to get many times the output from coding agents, beyond buying one"
built_from_notes:
  - notes/inbox/2026-11-12T1123-cognition-team-by-vertical-not-role.md
  - notes/inbox/2026-11-12T1125-cognition-sharing-videos-as-proof.md
  - notes/inbox/2026-11-12T1126-cognition-teach-agents-to-test.md
  - notes/inbox/2026-11-12T1128-cognition-sessions-for-self-improvement.md
  - notes/inbox/2026-11-12T1133-cognition-android-parity-with-ios.md
  - notes/inbox/2026-11-12T1134-cognition-teams-limited-by-ambition.md
built_from_photos: 4
notes_frame:
  spine: "how they changed the way they work (6 notes, 4 photos): the org (1 note, 2 photos), outcomes not tasks (1 note, 2 photos), evidence and testing (2 notes), self-improvement (1 note), ambition (1 note)"
key_points:
  - "Merged PRs grew 40× on 2.7× the headcount, and it took changing how they build, not buying an agent (00:00:00, 00:04:06)"
  - "Small pods own everything, agents test themselves in hourly-rebuilt VMs and send video proof, and agents mine the factory's own record to improve it (00:01:48, 00:03:09, 00:04:06, 00:06:41)"
  - "Give agents jobs, not tasks: a measurable goal held for weeks, like P99 latency, GPU throughput, or an Android app kept at parity with iOS; most teams are limited by their ambition (00:07:41, 00:10:45, 00:13:07)"
kind: talk-story
status: draft
---

# 40× the work on 2.7× the people

Walden Yan opened with a chart. In a year, Cognition's merged pull requests grew
forty-fold while its engineering headcount grew 2.7 times. His talk is about what
they changed to get there, and the answer isn't the agent they sell. They
reorganized the team, rebuilt how code gets tested, let agents prove their work with
videos and improve the factory themselves, and started giving agents jobs instead
of tasks. Set up that way, he says, the limit is ambition.

*Framing note: this story is framed by the notes and photos taken in the room: six
notes on the practices and four photos of the org and the numbers. The transcript is
a Qwen machine transcription; quotes keep its wording, including "Devon", "Devan" and
"Dem" for Devin, "48x" once for 40x, "Verro Ruben" and "bare Ruben" for Vera Rubin,
"GV three hundred" for GB300, and "this black channel" for the Slack channel.
"Cognition" may come from the transcription prompt, though the unprompted Voice
Memos transcript has it too. "From the notes" and "The reading" boxes are
interpretation, not his words.*

## 40× the PRs on 2.7× the people

He starts with the backdrop (00:00:00), a year of merged pull requests at Cognition.

> “This 40x. Is a 40x in the number of merged PRs we are producing on our engineering team.”
> — 00:00:00

Along the bottom of the chart is a second line:

> “that two point seven x. That is our engineering headcount growth in the same period.”
> — 00:00:00

So each engineer is more than ten times as productive, and he claims the work hasn't
got worse:

> “And I would dare to say that these PRs are just as high quality, if not higher quality, than they were a year ago.”
> — 00:00:00

The machinery behind it is a software factory (00:01:18).

> “By default, everything should be self-driving.”
> — 00:01:18

A pull request goes from bug report to merge, monitoring and maintenance without a
person, escalating when human judgment is needed.

> “But by default, our entire Software development process is just run by Devin from end to end.”
> — 00:01:18

**Visual:** photo `photos/PXL_20261112_192122983.jpg` (his slide: "Cognition's delivery capacity is exploding": merged PR volume by month from Nov 2025, 1× to 40.4× by Oct 2026, against engineering headcount reaching 2.7×)

## Organized by vertical, not role

The first change was to the engineer's job (00:01:48). In March they told the team:

> “You're not going to really be set up for success in the age of AI because anything that is described and can be implemented will be able to send to Devin.”
> — 00:01:48

So they broke large teams into small pods, each with swarms of agents:

> “So instead, you might have only two or three engineers on a team at a time.”
> — 00:01:48

> “But they're responsible for everything beyond engineering as well.”
> — 00:01:48

Customer bug reports, QA testing, product management: each engineer runs their own
board and sends the work to agents.

<div class="reading"><b>From the notes:</b> “they've restructured the team,
organized by vertical, no longer by role”. His slide shows it: before, product,
engineering and QA were separate rows; after, each vertical (billing, the mobile app,
integrations) is a small pod covering product, engineering, QA and on-call.
<b>The reading:</b> if implementation is cheap, what's scarce is knowing what to
build and whether it works, so the engineer becomes the owner of a product area. It's
the same move as Justin McCarthy's “we have a new job” and his demand factory in
“Brownfield Factories” this afternoon.</div>

**Visual:** photo `photos/PXL_20261112_192236451.jpg` (his slide: "We've restructured our teams to ship more": before, organized by role (a product manager, four engineers, QA and on-call); after, organized by vertical, such as billing, the mobile app and integrations, each a pair of people with a block of agents, covering product, engineering, QA and on-call)

## Proof, not review

Work happens in Slack (00:03:09).

> “Another thing I'd like to highlight is we work from Slack everywhere.”
> — 00:03:09

A customer sends a video of a bug; it's forwarded to an internal channel with Devin
tagged; Devin opens a pull request and sends back a video of the fix. He can send that
straight to the customer.

> “We've abstracted away all the development to be based on evidence, videos, and I can just send the proof.”
> — 00:03:09

The goal:

> “A point where you can do your entire development lifecycle without opening up an IDE or without opening up a single coding engine.”
> — 00:03:09

<div class="reading"><b>From the notes:</b> “they are sharing the videos etc to
show that things work”. <b>The reading:</b> it's the same idea as Ramp's “the
session is the artifact”
(<a href="../2026-11-11-how-to-build-an-agent-that-builds-the-culture/story.md">Easier in public</a>)
and Lauren Tan's review by verification artifacts: evidence travels with the change,
so people check proof instead of reading code.</div>

**Visual:** quote “We've abstracted away all the development to be based on evidence, videos, and I can just send the proof.” (00:03:09)

## Teach the agents to test

None of that works without infrastructure (00:04:06), and he's blunt that this is the
hard part.

> “It's not just you purchase a coding agent.”
> — 00:04:06

> “You got to go change the way you build.”
> — 00:04:06

They used to test against a staging environment with people clicking through flows.
Now every service runs locally with Docker Compose, every third-party service has a
mocked version, and it all runs in one virtual machine each agent gets, rebuilt from
the latest code every hour; when a rebuild breaks, Devin fixes it first.

> “And every code agent in our company now does not need to touch any live services at all to test their changes.”
> — 00:04:06

> “And by the way, these agents. You need to teach them how to test your codebase as well.”
> — 00:04:06

> “Devon will write its own skills for how to test our codebase.”
> — 00:04:06

As the codebase changes, Devin updates those skills. Engineers no longer need their
laptops to test changes:

> “Have already moved to using iPads for the development process.”
> — 00:04:06

That's also more secure, with no secrets on developer machines. They even test
multi-user features this way: agents create several accounts and join the same Zoom
call inside one VM.

<div class="reading"><b>From the notes:</b> “teach the agents how to test the code
base”. <b>The reading:</b> this is the “Guardrails people own” theme as
infrastructure: a reproducible environment the agent can run anything in, and testing
knowledge the agent keeps current itself. It's StrongDM's Digital Twin Universe idea
(mock every third party) and Lovable's golden checkpoints, built for one company's
own stack.</div>

**Visual:** quote “And by the way, these agents. You need to teach them how to test your codebase as well.” (00:04:06)

## The factory improves itself

Then the record of all this becomes input (00:06:41). Every line, pull request and
decision is tracked.

> “So there's no reason why you should also be able to run agents on top of that.”
> — 00:06:41

Agents analyse where time and tokens go, what could become a script, and what tests
would help, and every day post ideas to a channel: change the Node setup and save a
minute of CI; change a lint script and catch 20% more bugs before AI code review.

> “And this has actually been a huge unlock, where you can just set up these systems, and the agents will go and optimize your software factory for you.”
> — 00:06:41

<div class="reading"><b>From the notes:</b> “they are using sessions for self
improvement”. <b>The reading:</b> this is the outer loop of the “Close the loop”
theme, pointed at the factory instead of the product: Overcut's scored retrospectives
and Lance Martin's dreaming over transcripts, applied to the engineering process
itself.</div>

**Visual:** quote “And this has actually been a huge unlock, where you can just set up these systems, and the agents will go and optimize your software factory for you.” (00:06:41)

## From tasks to jobs

The next shift, he says, is the one people don't talk about (00:07:41):

> “moving from the world where you're giving tasks to your agents to giving jobs to your agents.”
> — 00:07:41

> “You really have to start treating these things like coworkers.”
> — 00:07:41

Instead of instructions, say “improve P99 latency”: the agent adds telemetry, sets
targets, breaks down the work, creates Datadog alerts and weekly Slack reports, and
updates you daily.

> “We want you to just be giving your agent goals that they can work.”
> — 00:07:41

Anything that matters but isn't measured, measure it: click latency, layout shifts,
onboarding retention.

> “And I encourage you that if you can do that, you should just set up an agent to go optimize that number twenty four seven.”
> — 00:07:41

His example (00:09:27): Cognition got early access to NVIDIA's Vera Rubin GPUs and had
to build an inference stack from scratch. They gave an agent a dedicated set of GPUs
and one goal, throughput:

> “Go figure out how to push that to its limits.”
> — 00:09:27

Over about a week it found eight or nine improvements, each sent to an engineer for
final approval, and took the new GPUs from worse than the previous GB300s to well past
them.

<div class="reading"><b>The reading:</b> his slides make both examples concrete. On
latency: a human states a desire (“Make our P99 endpoint latency faster”), Devin sets
the target (840 ms to 500 ms) and a budget (5,000 ACUs approved), files 14 issues
(batching lookups, missing indexes, an alert above one second, a weekly report), and
reports back: P99 down 65%, no regressions. On GPUs: 2.8× tokens per minute per GPU,
27,336 against the GB300's best of 17,185, through nine steps such as merging
GPU-to-GPU steps and batching draft-model guesses. It's Simon Willison's “Fable class”
in practice: define the goal, provide the tools, and the agent works it for days.</div>

**Visual:** photo `photos/PXL_20261112_192852968.MP.jpg` (his slide: "From delegating tasks to delegating outcomes": a human expresses a desire, "Make our P99 endpoint latency faster"; Devin defines goals and KPIs, from 840 ms to 500 ms, 5,000 ACUs approved; Devin scans and creates 14 issues; Devin monitors and reports, P99 down 65%, no regressions)

## Android parity in 44 days

The last example (00:10:45). Cognition is small and can't staff everything. An
engineer, Samuel, had an idea:

> “Can't we just use that as a blueprint for our Android application?”
> — 00:10:45

Not one session, but a standing job: hooks on the iOS codebase, the Slack channel of
user feedback, live QA of every detail against the iOS app, pixel for pixel.

> “and over the course of 44 days, we have a working application, which we'll be putting out soon.”
> — 00:10:45

> “most days there's not a single human message going to the stage I'm working on it.”
> — 00:10:45

Some days it merged forty or fifty pull requests, escalating only the most important
decisions.

> “So in the app, the human is barely doing anything in the loop.”
> — 00:10:45

> “it's not a slo—it's not a slop application.”
> — 00:10:45

His closing (00:13:07):

> “So I think really most teams are limited by the amount of ambition they have.”
> — 00:13:07

> “So it's time to be ambitious.”
> — 00:13:07

<div class="reading"><b>From the notes:</b> “he asked the dev to make an android
app and keep it parity to the ios app” and “most teams are limited by the amount of
ambition they have”. This talk is half of the “Ambition is the limit” theme, with
Simon Willison. <b>The reading:</b> your later note sharpens it: “being ambitious !=
doing more”
(<code>notes/inbox/2026-11-12T1501-ambition-is-not-doing-more.md</code>). The Android
app isn't more volume; it's a thing they wouldn't have attempted with the people they
had. For a client, the question isn't how many tickets agents can close but which
standing jobs, with a measurable goal and a way to check, they'd hand over. It's also
the opposite of Steve Yegge's experience: forty PRs a day with almost no human
messages, because the iOS app is the spec and pixel-level QA is the check.</div>

**Visual:** quote “So I think really most teams are limited by the amount of ambition they have.” (00:13:07)
