---
title: "Your immune system doesn't file a Jira ticket: continuous diagnosis and self-healing for agents"
speakers: "Khasimul Asif Mohammad, Sudhir Tonse (Splunk)"
duration: "23:24"
source: transcript.md
video: null
themes: [guardrails-people-own, close-the-loop, context-for-ai]
reader: "Will and his clients: why static LLM-as-judge evals miss production drift, and how continuous trace sweeping, an opinionated failure taxonomy, and regression memory turn observability into healing"
built_from_notes:
  - notes/inbox/2026-11-11T1156-immune-system-not-ticketing-system.md
built_from_photos: 2
notes_frame:
  spine: "Immune system, not a ticketing system (1 note, 2 photos): detect unknown failures continuously, treat the root cause with opinionated remediations, and remember so agents don't fail the same way twice"
  clusters:
    - "Continuous immune-system loop & Signals 2.0 diagnosis/prognosis (1 note, 2 photos)"
    - "Limitations of regular evals & trace-ID debugging (folded from opening)"
    - "Closed-loop production verification & specialized small-model accuracy vs. raw LLM prompting (closing engineering case)"
  skipped: "Muffled live-demo audio segments (00:08:57 and 00:13:53–00:16:18 where ASR produced non-English noise) and post-talk hiring/egg banter after 00:21:30"
key_points:
  - "Traditional evals only check failure modes you predicted upfront, and per-trace debugging collapses at millions of production traces under user drift, model shifts, and adversarial attacks (00:02:08, 00:06:02)"
  - "An agent observability stack should act like an immune system, not a ticketing queue: continuously sweep all sessions, diagnose root causes via an opinionated taxonomy (45 failure types in 8 families), and prescribe concrete fixes (00:07:27, 00:08:50, 00:10:56)"
  - "Fixing once is incomplete without memory and verification: track whether remediations actually drive down production recurrence, and use tuned small models plus pipelines rather than raw LLM prompts where every 1% of F1 accuracy matters at scale (00:11:22, 00:12:42, 00:17:23, 00:19:48)"
kind: talk-story
status: draft
---

# Your immune system doesn't file a Jira ticket

Most teams start agent reliability with offline evals and OpenTelemetry trace trees, then stop at grading (`00:01:42`, `00:04:28`). Khasimul Asif Mohammad and Sudhir Tonse argue that grading alone fails in production because real agents break from unknown user drift, model updates, and adversarial inputs no test suite anticipated (`00:06:02`). Borrowing from biology rather than ticketing workflows, they outline a continuous **detect → respond → remember** loop that sweeps every session, classifies issues against an opinionated 45-type taxonomy, prescribes exact code, guardrail, or eval fixes, and verifies the bug stays dead (`00:07:27`, `00:08:50`, `00:12:42`).

*Framing note: this story is framed from one inbox note (`2026-11-11T1156-immune-system-not-ticketing-system.md`) and two slide photos taken in the room (`PXL_20261111_195547531.jpg` and `PXL_20261111_195708977.jpg`). Quotes keep the local Qwen3-ASR 1.7B machine transcription verbatim, including `"ChainPole"` (ChainPoll), `"GAN Deal"` (Galileo), `"Guna"` (an unidentified large-model comparison), `"garden is"` (guardrails), `"SignalFlow Control"` (Signals 2.0), `"CEA"` / `"new cost analysis"` (RCA / root-cause analysis), `"CodeX"` (Codex), and `"S one accuracy"` (F1 accuracy). Passages flagged in the transcript header as transcription-prompt bias (`"Asif"`, `"Splunk"`) are never quoted, and muffled demo segments (`00:08:57`, `00:13:53–00:16:18`) where ASR drifted into non-English characters are omitted from quotes. `"From the notes"` and `"The reading"` boxes are editorial interpretation, not the speakers' words.*

## Regular evals only grade what you already thought to test

Tonse opens from the standard observability baseline: teams instrument agent sessions, traces, and spans with OpenTelemetry, then attach LLM-as-judge evaluators for hallucination, tool usage, and context adherence (`00:01:42`, `00:04:28`). On top of observability, guardrails can block or steer bad actions in flight (`00:02:08`), and Galileo's journey from its 2023 ChainPoll paper onward pushed toward small, cheaper, lower-latency evaluation models (`00:03:19`, `00:04:55`).

> “And then, of course, what's the point of observing if you can't do anything about it?”
> — 00:02:08

Once he hands off to Mohammad (`00:06:02`), the core limitation of standard evals becomes clear: you only write tests for failures you already imagine. At millions of traces per day or week, engineers cannot hunt issues one trace ID at a time while user behavior drifts, underlying models change, external environments shift, and adversaries probe the agent (`00:06:02`).

> “And why just the regular eval loop is not enough? Regular evaluation is just not enough.”
> — 00:06:02

**Key points**

- Attaching LLM judges to OpenTelemetry sessions and spans catches anticipated regressions, not unknown production failure modes (`00:04:28`, `00:06:02`).
- Small purpose-built evaluator models beat heavyweight judge calls on latency and cost when running continuously (`00:03:19`).
- Searching individual trace IDs breaks down once user drift, model changes, and adversarial inputs hit scale (`00:06:02`).

**Visual:** diagram “Grading loop vs. unknown failures: OTel traces + pre-written evals miss user drift, model shifts, and adversarial attacks”

## An immune system doesn't file a Jira ticket

To replace manual trace triage, the team modeled **Signals** on the human immune system rather than an IT ticketing queue (`00:07:27`). When a pathogen enters the body, your immune system does not sit idle waiting for a pre-written unit test or open a Jira ticket—it detects the anomaly, responds to the underlying cause, and builds memory so the same failure does not make you sick twice (`00:07:27`).

> “Pathogen entering, it's not waiting for some test. Is trying to understand the problem, trying to respond in terms of getting to the root cause of it, and then he tries to remember. So that going forward, if you have a similar situation, it makes sure it prevents you from falling sick again.”
> — 00:07:27

Applied in Signals 1.0, that meant automatically scanning agent telemetry for unknown issues and pinpointing where in the trace the problem originated (`00:07:27`).

**Key points**

- Detect: surface unexpected agent failures even when nobody wrote an eval for them (`00:07:27`).
- Respond: trace symptoms back to the root cause instead of logging another alert (`00:07:27`).
- Remember: carry lessons forward so cured failure modes do not recur (`00:07:27`).

<div class="reading"><b>From the notes:</b> “taking inspirating from the immune system not a ticketing system” (<code>2026-11-11T1156-immune-system-not-ticketing-system.md</code>). <b>The reading:</b> This single sentence from the room captures the shift across the conference’s observability talks—dashboards that only accumulate alerts create operator fatigue; reliability systems have to diagnose causes and close the loop.</div>

**Visual:** photo `photos/PXL_20261111_195547531.jpg` (their slide, 11:55 am: *"Your immune system doesn't file a jira ticket — It detects, responds and remembers, on its own. A grade tells you something's wrong. Healing makes it better."* showing Detect / Respond / Remember)

## Clear diagnosis and prognosis: Signals 2.0

Enterprise teams liked Signals 1.0, then immediately pushed for what separates a one-off scan from real healing (`00:08:50`). Their second slide distills four customer demands that shaped Signals 2.0 (`00:08:50`, `00:10:14`): run automatically on a daily or weekly schedule rather than once; inspect *every* session rather than small samples; categorize failures with an opinionated taxonomy; and tell the engineer exactly what to change (`00:08:50`).

> “Look at all the sessions. And then, can you be a little more opinionated about them? Like, tell me. What kind of failure is it?”
> — 00:08:50

Rather than returning vague summaries, their taxonomy groups real enterprise exceptions into **45 problem types across 8 families** (`00:10:56`, documented in their Signals paper) and pairs each diagnosis with prescriptive remediations—whether that means editing a system prompt, swapping a model, adding a guardrail, or attaching a targeted eval (`00:11:22`).

> “Just because an issue has emerged, it's not enough.”
> — 00:11:22

**Key points**

- Continuous scheduled sweeps across all sessions replace ad-hoc sampling (`00:08:50`, `00:10:14`).
- An opinionated taxonomy (45 failure types in 8 families) classifies whether a break is orchestration, tooling, or security (`00:08:50`, `00:10:56`).
- Prescriptive remediations specify concrete next edits—prompt change, guardrail, eval, or code fix—plus regression memory (`00:08:50`, `00:11:22`).

**Visual:** photo `photos/PXL_20261111_195708977.jpg` (their slide, 11:57 am: *"Healing requires clear diagnosis & prognosis"* mapping four customer quotes to scheduled runs, full-session scope, 45-type/8-family taxonomy, and opinionated remediations)

## Closing the loop in production

To show why detection without verification still breaks, they point to high-stakes business workflows—like an insurance policy agent—and run a live payment-agent demo (`00:12:42`, `00:13:42`). In the demo, Signals surfaces a failure occurring in roughly 1 out of 10 sessions reaching a payment step: the agent sent funds using the wrong account compared to the payment instructions, realized something was wrong afterward, and could not reverse the transfer (`00:13:42`).

> “Agent used that account and send the money, and afterwards it checked. There was a problem, but it couldn't make the money back.”
> — 00:13:42

From the grouped evidence, the workflow hands off to coding tooling (`CodeX` in the demo) to pinpoint where in the codebase to apply the fix (`00:13:42`, `00:16:29`). Just as important is the final verification step (`00:12:42`): once a fix lands, continuous sweeps confirm the failure trend actually drops in production and stays down (`00:12:42`).

> “Once you fix it, you want to verify that it's. Indeed, and as a trend, the number of people fix so we can. Keep going in production, and make sure that it doesn't recur.”
> — 00:12:42

**Key points**

- Group multi-trace evidence first so engineers see systemic failure rates (e.g., 1 in 10 payment sessions) instead of isolated logs (`00:13:42`).
- Link diagnosis directly to remediation (including code fixes via coding agents) and then keep monitoring the live trend post-deploy (`00:12:42`, `00:16:29`).

**Visual:** diagram “Closed healing loop: Continuous sweep (all sessions) → Classify (45 types / 8 families) → Prescribe & apply fix → Verify trend drops in production”

## Why specialized detection beats prompting an LLM

Customers routinely ask why they cannot dump raw traces into a generic LLM prompt to get the same recommendations (`00:17:23`). The speakers give two engineering reasons: token economics and accuracy (`00:17:23`, `00:18:24`). Running a frontier LLM over half a million sessions per day burns massive token budgets, and their benchmarks show purpose-built pipelines and decision models beating raw prompting by double-digit points (`00:17:23`, `00:18:24`).

> “The reason we talk about this accuracy is that for enterprise customers, even one percent data point accuracy. Makes a big difference, especially when you have like millions of sessions.”
> — 00:17:23

Enterprise buyers push F1 accuracy aggressively—not settling for 92% when they want 95–98%—because catching failures before users notice is what earns trust in production multi-agent coordination and third-party tool calls (`00:18:24`, `00:19:48`).

> “One of the enterprises was like, hey, for me, 92% accuracy is not good enough. I wanted to go to like 95, 98.”
> — 00:19:48

**Key points**

- At 500,000+ sessions a day, specialized small detection models avoid prohibitive frontier-LLM token costs (`00:18:24`).
- Every 1% gain in F1 accuracy compounds across millions of sessions and builds enterprise trust by catching regressions before users do (`00:17:23`, `00:19:48`).

**Visual:** quote “The reason we talk about this accuracy is that for enterprise customers, even one percent data point accuracy. Makes a big difference, especially when you have like millions of sessions.” (00:17:23)
