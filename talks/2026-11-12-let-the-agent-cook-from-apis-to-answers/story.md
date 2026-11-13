---
title: "Let the agent cook: fewer overlapping tools, thin guardrails, and cheap checks"
speakers: "Arsalan Bashir (Sentry)"
duration: "17:44"
source: transcript.md
video: null
themes: [guardrails-people-own, less-harness-more-model, connecting-is-not-answering]
reader: "Will and his clients: how to move from fragile one-tool-per-API harnesses to use-case or code-writing tools, strip out prompt-routing bloat, and keep a thin deterministic boundary plus cheap verification"
built_from_notes:
  - notes/inbox/2026-11-12T1215-olap-cubes-modality-of-values.md
  - notes/inbox/2026-11-12T1215-organize-tools-by-use-case.md
  - notes/inbox/2026-11-12T1217-likes-write-the-code-tools.md
  - notes/inbox/2026-11-12T1218-optimization-gives-agent-tunnel-vision.md
  - notes/inbox/2026-11-12T1221-follow-up-which-harness-tools-to-keep.md
  - notes/inbox/2026-11-12T1508-research-adding-sentry.md
built_from_photos: 3
notes_frame:
  spine: "stop over-optimizing the harness and let the model explore—consolidate overlapping tools by use case (or let the agent write code), keep only thin security/limit guardrails, and give the agent cheap deterministic checks"
  clusters:
    - "Use-case tools & programmatic 'write the code' tools (2 notes, 1 slide photo)"
    - "Over-optimization tunnel vision & which harness guardrails to keep (2 notes, 1 slide photo)"
    - "Failure modes on OLAP cubes & ID/pagination mismatches (1 note)"
    - "Cheap deterministic checks & Sentry Seer follow-up (1 note, 1 slide photo)"
  skipped: "Cut-off final Q&A sentence on Sentry's internal sandbox flavors (noted as open at recording end); Golden-trajectory eval details folded into Ch. 5"
key_points:
  - "One-tool-per-API fails across three modes: similar tool overlap (Jira vs. Linear), pagination/rate-limit loops, and ID/schema mismatches across CRMs, Stripe, and OLAP cubes (00:01:32)"
  - "Consolidate overlapping APIs into semantic use-case tools (find_user, find_pending_tasks) that own pagination, retries, and ID stitching—or go all the way to programmatic tool calling where the model writes code (00:03:01, 00:12:07)"
  - "Pre-classifying intent and pre-fetching schemas gives agents tunnel vision and breaks when new models ship; deleting that scaffolding made Sentry's data agent 4× faster and cut tokens by 30% (00:05:18, 00:08:07)"
  - "Keep the deterministic harness layer razor-thin (permissions, execution limits, PII scrubbing) and pair it with cheap deterministic checks—dry runs, dbt definitions, linters, tests—to verify results before the user sees them (00:05:18, 00:09:45, 00:12:07)"
kind: talk-story
status: draft
---

# Let the agent cook: from APIs to answers

Handing an agent one tool per API endpoint looks effortless on day one and fails in production by week two (`00:00:32`, `00:01:32`). Drawing on his previous data-agent startup ("Lightbox") and his work on investigative agents at Sentry (`00:00:00`, `00:01:32`), Arsalan Bashir shares three lessons for moving from brittle plumbing to reliable answers: organize tools by semantic use case (or let the model write code), stop building harness optimizations that give stronger models tunnel vision, and add cheap deterministic verification checks (`00:03:01`, `00:05:18`, `00:09:45`, `00:11:40`).

*Framing note: this story is framed from six inbox notes and three slide photos taken in the room (`PXL_20261112_201506625.jpg`, `PXL_20261112_201950177.jpg`, `PXL_20261112_202230030.jpg`). Quotes keep the local Qwen3-ASR 1.7B machine transcription verbatim, including `"Werzel"` (Vercel), `"Asian Google calls"` / `"Asian Google descriptions"` (agent tool calls / descriptions), `"hardest"` (harness), `"emails"` (evals), `"Europe"` (Jira), and `"Lightbox"` (his previous startup). Tokens flagged in the transcript header as transcription-prompt bias (`"Sentry"`, `"Anthropic"`, `"Auth0"`) are never quoted. `"From the notes"` and `"The reading"` boxes are editorial synthesis, not the speaker's words.*

## Why one-tool-per-API breaks in production

Spinning up a custom harness with one tool per SaaS integration handles simple prompts like *"find my latest GitHub issue"* right away (`00:00:32`). On real queries, however, Bashir sees agents break across three failure modes (`00:01:32`, `00:12:07`): picking the wrong tool among near-duplicate descriptions (such as Jira vs. Linear), spinning in circles on upstream pagination and rate limits, and hitting **modality and ID mismatches**—like querying a CRM by email address while Stripe keys on customer ID (`00:01:32`).

At his earlier startup connecting directly to OLAP cubes like Snowflake and Databricks, exposing raw `query` and `list_tables` primitives caused agents to stop prematurely and hallucinate certainty (`00:01:32`):

> “The agent starts picking the wrong tools sometimes. So it gets confused between tools that have similar descriptions.”
> — 00:01:32

> “You can either like look at the first table and stop. And declare that this is the ultimate source of truth, and give you the wrong answer pretty confidently.”
> — 00:01:32

**Key points**

- Raw API wrappers fail in three predictable ways: overlapping descriptions, pagination/retry churn, and cross-system ID or schema mismatches (`00:01:32`, `00:12:07`).
- Direct OLAP cube access tempts agents to inspect the first matching table, ignore join/modality rules, and assert a wrong answer confidently (`00:01:32`).

<div class="reading"><b>From the notes:</b> “I like the list of things he says: the modality of values when you connect directly to the OLAP cubes.” (<code>2026-11-12T1215-olap-cubes-modality-of-values.md</code>). <b>The reading:</b> simply wiring MCP servers or warehouse query tools is not answering—without semantic boundaries, agents mistake the first returned schema for ground truth.</div>

**Visual:** diagram “Three failure modes of one-tool-per-API: Overlapping Descriptions (Jira vs. Linear) · Pagination & Rate-Limit Loops · ID/OLAP Modality Mismatches (first-table confidence)”

## Organize tools by use case—or let the model write code

Lesson one follows Anthropic's tool-engineering research: push deterministic complexity—pagination, parameter differences, retries, and ID stitching—out of the prompt and down into the tool implementation (`00:03:01`). Instead of exposing separate Jira, Linear, GitHub, CRM, and database primitives, expose semantic use-case tools such as `find_user()` and `find_pending_tasks()` (`00:03:01`, `00:12:07`).

> “There are deterministic things that should still be in code, and your agent would benefit from something like that.”
> — 00:03:01

> “The first key is not categorize the tools, but actually combine the tools into some sort of semantic meaning.”
> — 00:12:07

At Sentry, Bashir's team takes that principle one step further with **programmatic tooling**—collapsing bespoke wrappers down to writing and executing code against APIs directly (`00:03:01`, `00:12:07`), while acknowledging in Q&A that the two-tool setup (*write code* and *run*) still needs sandboxed test guards (`00:12:07`, though the final Q&A sentence cuts off at the recording's end).

> “We don't even write our tools. We do something called programmatic tooling, which allows our model to kind of write tools.”
> — 00:03:01

**Key points**

- Merge overlapping endpoints into semantic use-case tools (`find_user`, `find_pending_tasks`) that handle ID resolution, pagination, and retries in deterministic code (`00:03:01`, `00:12:07`).
- In Q&A, Bashir notes that overlap—not raw count up to the 128-tool cap—causes confusion: 40 distinct tools can work cleanly while 2 overlapping tools trip the model (`00:12:07`).
- Programmatic tool calling eliminates wrapper maintenance by letting the model write code against APIs directly (`00:03:01`).

<div class="reading"><b>From the notes:</b> “Organize tools by use case.” (<code>2026-11-12T1215</code>) and “He likes the 'write the code' tools.” (<code>2026-11-12T1217</code>). <b>The reading:</b> both patterns solve the same waste—either bundle deterministic multi-step stitching inside a semantic tool, or give the agent a code sandbox so it writes the glue itself instead of burning turns on one-by-one API calls.</div>

**Visual:** photo `photos/PXL_20261112_201506625.jpg` (his slide: `Agent` calling semantic `find_user()` → `{ CRM, Database }` and `find_pending_tasks()` → `{ GitHub, Linear }`)

## Pre-optimizing the harness gives the agent tunnel vision

When building their data agent, the team initially distrusted the model's ability to navigate schemas and table names (`00:05:18`). They added pre-call intent classification and automated schema pre-fetching before the model ever ran—and created a maintenance trap (`00:05:18`):

> “The first and obvious one was if this optimization kind of became a blind spot for the model. And it's also not very resilient to new models coming out.”
> — 00:05:18

Every new model release made parts of that scaffolding obsolete (`00:05:18`). Once they stripped away the "training wheels" and let the model explore with clean tools, performance jumped (`00:08:07`), echoing Vercel's post on deleting 80% of its tool code and similar context-handoff guardrails that newer models no longer need (`00:08:07`):

> “The agent only got four times faster, but also used 30 percent. Fewer tokens across all of our kind of user queries”
> — 00:08:07

> “That as models get better, you might find your harness kind of compensating for a model that you use. Six months ago, that's a common like pitfall”
> — 00:08:07

**Key points**

- Intent routers and schema pre-fetchers hide information the model discovers naturally during investigation (`00:05:18`).
- Deleting obsolete harness heuristics made Sentry's data agent **4× faster** with **30% fewer tokens** (`00:08:07`).

<div class="reading"><b>From the notes:</b> “The optimization is giving the agent tunnel vision.” (<code>2026-11-12T1218-optimization-gives-agent-tunnel-vision.md</code>). <b>The reading:</b> harness logic built to patch a 6-month-old model's weakness actively handicaps today's models; re-audit routing and pre-fetching on every model upgrade.</div>

**Visual:** photo `photos/PXL_20261112_201950177.jpg` (his slide quoting OpenAI: *"Reduce or remove detailed step-by-step process guidance. Let the model choose the path unless the product requires that path."*)

## What deterministic guardrails to keep in the harness

Removing cognitive scaffolding does not mean removing all code outside the model (`00:05:18`). Asked how to reconcile slimming the harness with reliability, Bashir draws a sharp line between **intelligence heuristics** (delete) and **hard requirements** (keep deterministic and thin) (`00:05:18`, `00:12:07`):

> “Things like handling permissions, execution limits. Stripping out personally identifiable information, etc. These things do make sense to do outside of standard models.”
> — 00:05:18

> “On the other hand, you also want to have deterministic systems that are like libraries that kind of encapsulate. The absolute requirements that you have, for example, user A should not be able to. Kind of access into these tools. That stuff should be deterministic. It should be outright, but that layer should be super thin, as thin as possible”
> — 00:12:07

**Key points**

- Keep deterministic enforcement outside the model for **authorization/permissions**, **execution & rate limits**, and **PII scrubbing** (`00:05:18`, `00:12:07`).
- Delete intent classifiers, forced workflows, and prompt-rewriting middleware as soon as models outgrow them (`00:05:18`, `00:12:07`).

<div class="reading"><b>From the notes:</b> “We should do a follow-up on what sort of tools in the harness we want to keep around.” (<code>2026-11-12T1221-follow-up-which-harness-tools-to-keep.md</code>). <b>The reading:</b> paired with Philipp Schmid's “I deleted 90% of my harness” rule, this gives Will a clean audit checklist: keep security, budget caps, PII redaction, and verified semantic or code-execution primitives; delete every heuristic trying to steer the model's reasoning path.</div>

**Visual:** diagram “Thin Deterministic Perimeter (Permissions · Execution Limits · PII Scrubbing) enclosing an open Model Exploration Loop (Semantic Use-Case Tools or Code Execution)”

## Cheap deterministic checks build user trust

Lesson three closes the loop between autonomy and trust: always give the agent a cheap, fast, deterministic way to validate its own output before handing an answer to the user (`00:09:45`). For a data agent, that means dry-running SQL against BigQuery, cross-checking dbt metric definitions, and running automated data checks for joins, counts, and freshness (`00:09:45`); for a coding agent—like Sentry's own investigative debugging setup—it means running linters and tests and feeding exact failures back into the loop (`00:09:45`, `00:11:40`):

> “You have some sort of cheap, deterministic, fast way to validate results.”
> — 00:09:45

> “We're getting better results, which means the agent writes better SQL queries, writes better Python code. But also, you know, give confidence to the user.”
> — 00:09:45

> “So in summary, these are the three things we learned: automate what you know. But the second one is to let the agent explore and find out things you don't know. And finally, try to allow your agent to check its work whenever possible.”
> — 00:11:40

In Q&A (`00:12:07`), Bashir pairs these runtime checks with golden-trajectory evals that spot silent regressions—such as a support agent firing ten extra queries before issuing a refund (`00:12:07`).

**Key points**

- Cheap deterministic validators (BigQuery dry runs, dbt metric definitions, join/count sanity checks, linters, tests) catch hallucinations before the user ever sees them (`00:09:45`).
- Showing *how* an answer was verified builds user confidence alongside better accuracy (`00:09:45`).
- Pair runtime validators with golden-trajectory evals to detect tool overlap and multi-turn thrashing (`00:12:07`).

<div class="reading"><b>From the notes:</b> “Research how to get Sentry into our stuff.” (<code>2026-11-12T1508-research-adding-sentry.md</code>). <b>The reading:</b> adding Sentry telemetry to Will's apps and agent runs isn't just passive error logging—paired with Sentry's Seer investigative model (traces + logs + source + test validation), production exceptions become inputs an agent can diagnose and verify against real checks.</div>

**Visual:** photo `photos/PXL_20261112_202230030.jpg` (his slide: `> analyze("when did audit logs launch?")` running `BigQuery: dry run`, `dbt: matches definition`, and `checks: no duplicates` to verify `runs / matches / sane results`)
