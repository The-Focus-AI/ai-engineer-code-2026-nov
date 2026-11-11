---
title: "Own the stack, build the platform: lessons from giving 10,000 people one AI assistant"
speakers: "Utkarsh Shrivastava (Netflix)"
duration: "27:10"
source: transcript.md
video: null
themes: [connecting-is-not-answering, context-for-ai, guardrails-people-own]
reader: "Will and his clients: once the model stops being the decision, what a company owns (infrastructure, data, context) and what it has to build on top"
built_from_notes:
  - notes/inbox/2026-11-10T1459-netflix-xai-frontier-open-weight-enterprise-support.md
  - notes/inbox/2026-11-10T1459-2-company-context-is-the-key.md
read_alongside: "https://claude.com/resources/webinars/scaling-ai-agent-development-at-netflix"
key_points:
  - "The model is no longer the decision: you own the infrastructure and the data underneath it (00:00:43, 00:02:11)"
  - "Connecting is cheap; the work moves to the platform that decides which answer is right (00:04:40, 00:06:49, 00:13:04)"
  - "Build the platform on what you own: ownership, intent, evaluation across models, and gates by stakes (00:09:03, 00:16:05, 00:20:28)"
kind: talk-story
status: draft
---

# Own the stack, build the platform

Utkarsh Shrivastava helped roll out one internal AI assistant to more than
10,000 people at Netflix (00:00:00). Underneath the specifics, his talk records a
shift: the infrastructure question has moved. Choosing a model is no longer the
decision. A company owns the stack below it (the runtime, its data, its context)
and the real work is building the platform on top. These are the lessons, with
his Netflix examples.

*Framing note: “From the notes” and “The reading” boxes are interpretation, not
his words. The transcript is a Qwen machine transcription and garbles some names;
quotes keep its wording.*

## 1. The model is no longer the decision

They started by trying to pick a tool, and the choice wouldn't hold still
(00:00:43). Frontier labs launched enterprise offerings; open-weight models added
enterprise support during the year; domain teams had built their own small
agents. While they evaluated one option, new ones kept arriving.

So he stopped treating it as the decision (00:02:11). The AI tool you adopt is the
tip of an iceberg: it changes so fast that by the time a contract is signed, the
vendor has shipped more. The agent harness, the runtime, is something you can swap
between open-source and frontier options.

<div class="reading"><b>From the notes:</b> his list of frontier labs included xAI,
and “open-weight models with enterprise support” as a real option. The reading:
the infrastructure has become something you can own. Run open-weight models
yourself with vendor support where data can't leave, use frontier models where
the capability is worth it, and keep the harness portable across both. (Research:
<code>analysis/enterprise-ai-deployment-options.md</code>.)</div>

**Visual:** photo `photos/PXL_20261110_225748351.jpg` (his opening slide: “Why care: the tools you add this year will start answering the same question differently.”)

## 2. What you own is below the surface

If the model is swappable, the durable assets are the ones underneath (00:02:11):
the harness, and above all the company's own skills and data connectors, which is
where he says to spend the time.

> “The company context is the key here.”
> — 00:02:11

The data was already yours; what changed is that it's all reachable (00:03:12).
Before, each department had its own application on its own slice of data. Now one
assistant reaches across teams, and turning on another source is a toggle.

<div class="reading"><b>From the notes:</b> “company context is the key”. The same
conclusion George Fraser reached that afternoon from the data side: own your data
and the context around it; the model is the replaceable part.</div>

**Visual:** photo `photos/PXL_20261110_230002960.MP.jpg` (his “Company context is the key” iceberg slide: the AI tool above the water; agent harness, enterprise skills and MCPs, human in the loop below)

## 3. Connecting is cheap; deciding isn't

Owning everything and connecting everything creates the new problem.

> “Is another way for the agent to choose wrong.”
> — 00:04:40

His example (00:04:40): asked how many people watched a live MMA event Netflix had
just streamed, the assistant said 12.4 million from the analytics connector. Weeks
later, after a connector to the live systems was added, the same question got
nearly 17 million. Both were right: an average and a peak. Nothing was broken.

> “the tool was never wrong.”
> — 00:04:40

The pattern is general (00:06:49): one word means different things to different
teams, two systems can both truthfully claim the answer, and connecting everything
never settled who owns it. Users who didn't get the answer they expected stopped
trusting it fast. That gap is what the platform is for.

**Visual:** diagram “one question, two connectors, two right answers: analytics average 12.4M, live peak ~17M” (illustrative)

## 4. The platform decides who answers

The platform's first job is deciding which answer is right, and for whom
(00:13:04). When sources conflict, don't silently prefer the newest or the oldest:
show both, labeled.

> “the right thing to do is to label both”
> — 00:13:04

Use who is asking: an engineer moving live traffic and a business user planning
content want different numbers for the same words. And set the agent's behavior:
an interactive agent should ask what you mean; a long-running one should pick and
state its assumption. In the Q&A he describes Netflix settling its own case by
routing: live systems first, handing off to analytics when that's the better
source (00:21:38).

**Visual:** diagram “question → who's asking → which source owns it → one answer, or both labeled” (illustrative)

## 5. The platform makes it hold, across any model

The rest of the platform is guarantees (00:09:03). Access by role first. Then a
regression suite that domain teams run on every new connector, skill or plugin,
starting from twenty to fifty real cases, which emails the owning team when it
breaks. Because the model is swappable, the same suite has to run whenever the
model changes too.

> “And so regressions will need to cover all of their models.”
> — 00:09:03

And the stakes set how strict to be (00:16:05): reads are low risk, reversible
writes higher, irreversible actions like sending an email or publishing earnings
numbers the highest.

**Visual:** diagram “stakes ladder: read → reversible write → irreversible action, with stricter gates at each step” (illustrative)

## 6. Platform and domain teams build it together

No single team solves it (00:20:28). The platform owns the harness, routing and the
thin layer of shared tests; domain teams own their answers and their regression
cases. Open questions remain (who owns overlapping data, when sharing is worth the
coordination) and he doesn't pretend otherwise (00:17:34).

> “So to end, don't crown a winner, but do the work.”
> — 00:20:28

<div class="reading"><b>The reading, for The Focus:</b> the same order for a client.
Don't start with the model. Own the infrastructure (a portable harness; frontier or
supported open-weight per workload) and own the data and context. Then build the
platform on top: who owns each answer, who is asking, evaluations that survive a
model swap, and gates by stakes.</div>

<div class="alongside"><b>Read alongside</b>Netflix engineering leaders on
running agents in production, in Anthropic's webinar
<a href="https://claude.com/resources/webinars/scaling-ai-agent-development-at-netflix">Scaling AI agent development at Netflix</a>
(background, not this talk).</div>

**Visual:** quote “don't crown a winner, but do the work”
