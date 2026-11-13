---
title: "A software factory with zero FDEs: specialized agents, pause gates, and scored memory"
speakers: "Raz Berman Gold (Overcut)"
duration: "19:48"
source: transcript.md
video: null
themes: [guardrails-people-own, close-the-loop, context-for-ai]
reader: "Will and his clients: how to wire an enterprise software factory around your existing repos, models, and human approval gates without Forward Deployed Engineers"
built_from_notes: []
built_from_photos: 1
notes_frame:
  spine: "Zero-FDE enterprise factory (1 photo, full Q&A): plug into existing repos, models, and harnesses; specialize agents with deterministic pause gates; and compound quality through scored retrospective memory and hard governance limits"
  clusters:
    - "Zero-FDE integration & bring-your-own stack (00:00:19–00:02:42)"
    - "Specialized agents, deterministic steps, and human-in-the-loop pause gates (00:02:42–00:07:30)"
    - "Self-improving workflows via scored retrospective memory (00:07:30–00:11:25)"
    - "Enterprise governance, usage caps, audit trails, and plain-English factory builder (00:01:31, 00:11:25–00:18:41, 1 photo)"
  skipped: "Adjacent audience conversation bleeding into the mic during Q&A (00:12:45–00:15:46) and post-talk Lego/Duplo banter (00:18:41)"
key_points:
  - "Software factories fail enterprise ROI when you buy automation yet still need Forward Deployed Engineers for months to integrate it; plug into existing repos, skills, models, harnesses, and trackers instead (00:00:19, 00:00:56, 00:01:56)"
  - "Keep agents single-purpose with narrow MCP/secret scopes inside deterministic workflows that support hard pause gates for human approval, rejection, and feedback loops (00:02:42, 00:04:32, 00:05:49)"
  - "Close the quality loop with background retrospectives that score memory layers on real outcomes—replaying only top-scoring memories to prevent context drift—backed by per-workflow and per-project execution caps (00:07:30, 00:08:43, 00:12:45)"
kind: talk-story
status: draft
---

# A software factory with zero FDEs

Enterprise teams buying "automated" software factories keep running into an awkward catch: the product arrives alongside a team of Forward Deployed Engineers (FDEs) who spend months wiring it into the company's stack (`00:00:19`). Raz Berman Gold presents Overcut's alternative (`00:00:56`): drop a governed orchestration layer onto the repos, skills, models, and harnesses a team already runs, constrain specialized agents behind deterministic human-approval gates (`00:02:42`, `00:04:32`), and improve workflows automatically using scored retrospective memories (`00:07:30`) capped by workspace execution limits (`00:12:45`).

*Framing note: no inbox notes were captured during this talk; this story is built from the full 19:48 transcript (including audience Q&A from `00:08:43`) and one slide photo taken at the close (`PXL_20261111_205517744.MP.jpg`, 12:55 pm). Quotes keep the local Qwen3-ASR 1.7B machine transcription verbatim, including `"FDI"` (FDE), `"worst-case settings"` (workspace settings), `"MCD"` / `"MCB"` (MCP), `"Slag"` / `"big bucket"` / `"Gira"` (Slack / Bitbucket / Jira), `"SBLC"` (SDLC), `"VR"` / `"create the art"` (PR / create PR), `"talking consumptions"` (token consumption), `"court review"` (code review), `"perigentic"` (per-agent), and `"audio trail"` (audit trail). Tokens flagged in the transcript header as transcription-prompt bias (`"Overcut"`, `"Aamir Shakir"`, `"Sonar"`) are never quoted, and side conversation bleeding into the room mic during Q&A (`00:12:45–00:15:46`) is omitted.*

## The FDE paradox and bring-your-own stack

The pitch starts from an enterprise buyers' frustration (`00:00:19`): you pay for an AI platform to automate software delivery, only to discover you need humans embedded on-site just to integrate it and see initial value.

> “there is something strange about the fact that. You need to buy a product that automate your. Workflows, software development, but actually you need a human to integrate.”
> — 00:00:19

Instead of forcing teams to rebuild from zero or lock into one model vendor, the platform connects directly to existing GitHub, Jira, Bitbucket, and Slack setups, scans skills already stored in a team's repositories, and runs across private cloud, on-prem isolated environments, or SaaS (`00:00:56`, `00:01:56`).

> “You can read any model. You can reach any tool, any harness. So we know how to get your existing tools and skills, and agents that you already built.”
> — 00:00:56

**Key points**

- Buying software-delivery automation that requires months of FDE services defeats the point of automation (`00:00:19`).
- Avoid vendor lock-in by connecting existing models, harnesses, repo skills, and issue/code trackers across SaaS, private cloud, or on-prem (`00:00:56`, `00:01:56`).

**Visual:** diagram “Drop-in factory layer: existing repos, skills, models, harnesses, and GitHub/Jira/Slack connected without FDEs”

## Specialized agents, deterministic steps, and pause gates

Rather than deploying one omniscient agent with keys to everything, each agent gets a single mission and the exact tools, secrets, MCPs, and skills that mission requires (`00:02:42`). Narrowing scope improves output quality while cutting execution time and token spend (`00:02:42`).

> “You don't need an agent to do a lot of different missions. Any agent who has the access and the permission that it needs, invests this way.”
> — 00:02:42

Those specialized agents sit inside structured SDLC playbooks—auto ticket triage, code review, technical design review, and end-to-end ticket-to-PR flows—combining deterministic steps, agentic steps, and explicit human-in-the-loop checkpoints (`00:03:36`, `00:04:32`).

> “You can define pausing, deterministic stop, where the agent will stop. And ask for your approval before it continues.”
> — 00:04:32

In her live ticket-to-PR walkthrough (`00:05:49`), a production bug ticket triggers automatic triage, routes into root-cause analysis, proposes a fix, and pauses before writing code or opening a PR. Replying `approve` advances execution; rejecting with targeted feedback (for example, noting a missed security angle) loops the orchestrator back to revise the root-cause analysis before moving forward (`00:05:49`). In Q&A (`00:10:03`, `00:16:53`), she adds that workflows can orchestrate other workflows end-to-end and resume from the exact failed step via full session logs rather than restarting from scratch (`00:16:53`).

**Key points**

- Scoped single-purpose agents with least-privilege MCPs and secrets beat monolithic generalists on both quality and token cost (`00:02:42`).
- Deterministic workflow triggers and hard pause gates let engineers approve, reject, or redirect work before code hits a PR (`00:04:32`, `00:05:49`).

**Visual:** diagram “Ticket-to-PR workflow: Jira/Slack trigger → Auto triage → RCA / design review → Human pause gate (approve or feedback loop) → Create PR”

## Self-improving workflows via scored memory

To keep workflows from stagnating at day-one prompt quality, a background **retrospective** job evaluates past runs (`00:07:30`). In her code-review example, the retrospective measures how many review comments developers actually addressed (61% addressed vs. 39% ignored in the demo) and distills lessons into memory layers injected as context into future runs (`00:07:30`).

Asked during Q&A whether recalling memories on every run bloats context or causes drift (`00:08:43`, `00:12:45`), she explains that an internal evaluator scores each memory against subsequent runs and filters to only the highest-scoring memories (`00:07:30`, `00:08:43`).

> “Not only that, we also scoring those memories. So over time, to make sure there is no drift. We are scoring them, so the next run we run only on top of the memories that have the highest score.”
> — 00:07:30

**Key points**

- Background retrospectives audit real downstream signals—such as whether AI code-review comments were actually resolved—to synthesize reusable memories (`00:07:30`).
- Scoring memories over time and injecting only top-ranked lessons prevents stale heuristics from drifting future agent runs (`00:07:30`, `00:08:43`, `00:12:45`).

**Visual:** diagram “Scored memory loop: Completed runs → Background retrospective → Evaluate comment uptake → Keep highest-scoring memories → Next run”

## Governance, usage limits, and audit trails

From the opening dashboard (`00:01:31`) through Q&A (`00:11:25`, `00:12:45`), Berman Gold ties autonomous execution directly to enterprise guardrails. Workspace admins see PR cycle time, time to first review, and token consumption in one place (`00:01:31`), split permissions independently across shared libraries, projects, and MCP tools (`00:11:25`), and enforce hard execution caps (`00:12:45`) so runaway triggers cannot burn budgets.

> “So we have the ability to create limits. A of times of number of executions. Per workflow, over a level that you disconnected. Over a project.”
> — 00:12:45

Every action carries an audit trail (including human approvals and changes made in GitHub, Jira, or Slack) that teams can export to Prometheus or existing telemetry stacks (`00:12:45`).

> “if you have a very high governance and very high observability on the flows.”
> — 00:12:45

**Key points**

- Separate permissions for shared workflow libraries, individual projects, and MCPs allow safe reuse across teams (`00:11:25`).
- Execution caps per workflow, project, day, and month plus exportable audit trails keep unattended automation bounded and observable (`00:01:31`, `00:12:45`).

**Visual:** quote “You can define pausing, deterministic stop, where the agent will stop. And ask for your approval before it continues.” (00:04:32)

## Describe your factory in plain words

Closing the session (`00:17:17`), Berman Gold points the room to a QR-linked builder where teams can describe a software-factory pipeline in plain English—for instance, deduplicating Slack production alerts, opening tickets, triggering a fix workflow, and automating low-risk deployments—and receive a configured workspace with step-by-step setup instructions (`00:17:17`).

> “here you have a place where you can just describe by words. What do you want to have in your software factory? And we will show you how we created just for you.”
> — 00:17:17

**Key points**

- Plain-language workflow specs map straight to multi-step agent orchestrations, replacing FDE onboarding with self-serve workspace generation (`00:17:17`).

**Visual:** photo `photos/PXL_20261111_205517744.MP.jpg` (her closing slide, 12:55 pm: *"OVERCUT — WHAT SHOULD YOUR FACTORY DO? One agent today, a full crew tomorrow. Your infra, your models, your rules."* with example prompt *"Set up a factory that handles our bug backlog with human approval before every merge"* and *"TRY IT"* QR code)
