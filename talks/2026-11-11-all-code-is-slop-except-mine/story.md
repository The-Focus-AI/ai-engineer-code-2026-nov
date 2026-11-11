---
title: "Code is memory: keeping the agent's codebase clean with verification loops"
speakers: "Lauren Tan (SpaceXSI (xAI))"
duration: "18:28"
source: transcript.md
video: null
themes: [context-for-ai, guardrails-people-own]
reader: "Will and his clients: how a team ships thousands of agent-written pull requests without drowning in slop"
built_from_notes:
  - notes/inbox/2026-11-11T1005-code-is-memory.md
  - notes/inbox/2026-11-11T1005-2-organic-architecture.md
  - notes/inbox/2026-11-11T1007-dune-nextjs-for-electron.md
  - notes/inbox/2026-11-11T1007-2-nuance-creates-slop-design-better-apis.md
  - notes/inbox/2026-11-11T1008-stop-unsolicited-markdown.md
  - notes/inbox/2026-11-11T1010-comment-slop.md
  - notes/inbox/2026-11-11T1011-code-review-is-verification-artifacts.md
  - notes/inbox/2026-11-11T1014-check-out-statechart-skill.md
  - notes/inbox/2026-11-11T1017-dont-automate-a-bad-loop.md
  - notes/inbox/2026-11-11T1018-all-about-verification-loops.md
key_points:
  - "The codebase is the agent's memory: agents copy whatever is in it, so keep it pristine (00:04:26, 00:05:56)"
  - "Every correction becomes a deterministic check; comments and prose rules can't be enforced (00:02:55, 00:07:54)"
  - "Don't automate a bad loop: fix the inner loop and its verification before building the factory (00:14:22, 00:16:10)"
kind: talk-story
status: draft
---

# Code is memory

Lauren Tan (“Potato”, @poteto) works at SpaceXSI on the product the abstract
calls Grok Bot. Last month she shipped three thousand pull requests to
production herself (00:01:40). Her talk is about how that volume doesn't turn
into slop. Read with the notes taken in the room, it has one idea: the codebase
is the agent's memory, and verification loops are how you keep that memory
clean.

*Framing note: “code is memory” and “it's all about verification loops” are the
framing from the notes, not her words. The transcript garbles the product name
(“GAPA”, “Grokbot”, “Grovbot”) and some terms; quotes keep its wording.*

## Everyone is a coding machine now

Before agents, a few engineers were “coding machines”, wildly productive
outliers. Now anyone can be one (00:01:40). Her colleagues used to send her
three pull requests a day to review; today it is more like three hundred. Every
engineer is a team of hundreds of agents, and code arrives as a continuous
stream (00:04:26).

> “And well, with agents, anyone can now be a coding machine”
> — 00:01:40

Her thesis: the engineer's job is now to keep, or raise, code quality while
productivity explodes, and the way to do that is trust. Not blind trust, but an
environment built so you can trust agents to do the right thing (00:01:40). It
took her six months to get there.

**Visual:** quote “anyone can now be a coding machine”

## Code is memory

Agents produce output from their inputs, and the codebase is the biggest input
(00:02:55). So it works like memory: workarounds, anti-patterns, deprecated code
and tech debt get copied by the next agent, because they look like the
established pattern (00:04:26). Her image is a garden where weeds spread before
you notice. Constraints and guardrails are the concrete that new code grows
around, which she calls organic architecture.

> “So you want to make your codebase as pristine as possible, so that agents are always copying the right stuff.”
> — 00:04:26

Dune, the client framework they built for the product (she describes it as
Next.js for Electron apps), encodes those lessons as constraints (00:05:56).
Anything that needs nuance gets banned: React's `useEffect` is allowed only
inside a few framework APIs, so the problem is gone rather than caught in
review. Folder structure carries context too: main-thread and renderer code sit
in two top-level directories, and imports between them are blocked by a
dependency-graph check.

<div class="reading"><b>From the notes:</b> “code is memory”, and “nuance tends
to create slop, so just design better APIs” (“nuage” as typed; the talk says
nuance). The codebase isn't only what agents edit; it's what they remember.</div>

**Visual:** photo `photos/PXL_20261111_180543709.jpg` (her on stage in front of the “Organic Architecture” slide)

## Comment slop

Agents write a lot of markdown: docs, code comments, rules, skills. They use it
to justify not doing something, or to turn one small correction into a rule
that can never be broken (00:07:54). Her example from earlier work on Cursor:
agents patched an architecture clash with timers, and wrote comments explaining
why each quick fix was fine. The timers spread and the app got slower.

So they banned 99% of comments. Comments go stale, people don't read them, they
give agents an excuse, and nothing enforces them. Instead, lint rules with
helpful error messages tell the agent to fix the root cause (00:07:54). It is
the top of her trust pyramid turned upside down: prefer the code itself, then
linters, types and tests, then verification, and only a thin layer of prose
rules last (00:02:55).

> “And so our general principle is that every time we correct our agents, it turns into one of these deterministic checks.”
> — 00:07:54

Do that enough and there is less and less to look for in review, until most
pull requests can merge without a person reading them (00:07:54).

<div class="reading"><b>From the notes:</b> “comment slop”, and “stop agents
from writing unsolicited markdown”: the comment is the slop, because it can't be
checked.</div>

**Visual:** photo `photos/PXL_20261111_180633895.MP.jpg` (slide: “dune: a framework for agents”, app framework plus one folder per feature, strict import bans, no comments in code)

## Review the evidence, not the code

What replaces reading code is verification. Review has shrunk to looking at
artifacts: videos, screenshots, a feature map of what the app does from the
user's side (00:10:40). Agents run the app themselves through the same debugging
tools people use.

Then formal verification, which she is still treating as an experiment
(00:10:40). TLA+ model-checks whole user flows, such as notifications arriving
across several devices and platforms. Lean proves specific algorithms: their own
list-virtualization library, checked so it can't flicker or jitter (the
transcripts garble “Lean”; the Apple one has “for proving”). It has already
found real bugs, and she is clear it is not a silver bullet, just one more layer.
For the interface there is property-based testing with an open-source tool
(heard as “Duckbill”; the links page has it as bombadil) that explores the app
looking for broken rules. A tweet she cites says 70 percent of one
developer's daily tokens now go to verification, and she says that matches her
experience (00:12:50).

> “And our code review process has now really shrunk into looking at verification artifacts.”
> — 00:10:40

None of this is new technique. What changed is cost: agents make testing
economical at a depth that used to be too expensive (00:12:50). Her statechart
skill, in her pstack plugin, draws state machines from the user's point of view
so a person can check them next to the screenshots.

> “And really, we are entering a golden age of software testing”
> — 00:12:50

<div class="alongside"><b>Read alongside</b>Her <a href="https://github.com/cursor/plugins/tree/main/pstack">pstack</a>
plugin makes this routine. The statechart skill has the agent write a TLA+
model, check it, and draw what the user sees, marking each broken rule with the
shortest path to it; rules come only from behavior a person agrees to and are
never weakened to pass. Other skills turn one proved property into a check that
reruns on every change, and tell model drift from real bugs. Detail in
<code>analysis/lauren-tan-formal-verification.md</code>.</div>

<div class="reading"><b>From the notes:</b> “code review process has become
looking at verification artifacts”, and the read of the whole talk: “this is all
about verification loops really”. It is the same move Ankit Jain made yesterday:
review intent and evidence, not diffs.</div>

**Visual:** photo `photos/PXL_20261111_181315486.MP.jpg` (her slide: “ui property based testing”, with the bombadil repo)

## Don't automate a bad loop

The payoff (00:14:22): the team shipped eleven thousand pull requests to
production, cuts a stable release about once a day, and 227 people contributed
at least one pull request in October. The share of reverted pull requests has
fallen to about half a percent, and the app got faster on startup, typing and
switching chats.

> “A ridiculous eleven thousand pull requests to production, which is a wild number.”
> — 00:14:22

Her warning comes before any of that: fix the codebase first, clean up old
patterns, and make verification strong, because that work is the prerequisite
for automation (00:16:10). Then the outer loop is easy: every release now spins
up agents that fuzz the build like a real user, open fixes for what they find,
and auto-merge them.

> “Then automating that loop just produces more slop.”
> — 00:16:10

<div class="reading"><b>From the notes:</b> “don't automate a bad loop”. Clean
memory and real verification are what make the factory safe to build.</div>

**Visual:** diagram “inner loop (codebase, checks, verification) made solid first; outer loop (fuzz, fix, auto-merge) built on top” (illustrative)
