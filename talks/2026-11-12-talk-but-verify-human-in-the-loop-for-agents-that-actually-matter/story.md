---
title: "Scale human-in-the-loop to the stakes: Token Vault, CIBA, and agent payments"
speakers: "Michael Liendo (Auth0)"
duration: "21:41"
source: transcript.md
video: null
themes: [guardrails-people-own]
reader: "Will and his clients: how to wire agent authentication, scoped OAuth tokens, out-of-band human approvals, and capped payments without dumping raw API keys on a developer laptop"
built_from_notes:
  - notes/inbox/2026-11-12T1154-token-vault-limits-agent-scopes.md
  - notes/inbox/2026-11-12T1204-ciba-human-approval-for-agents.md
  - notes/inbox/2026-11-12T1204-agent-payment-flow.md
built_from_photos: 2
notes_frame:
  spine: "three escalation gates for agents with real-world consequences: Token Vault to limit API scopes, CIBA to verify humans out of band, and capped payment tokens to guard money"
  clusters:
    - "Token Vault & scoped authorization (2 notes, 1 unusable blurry photo)"
    - "CIBA out-of-band human approval (1 note, paired with Token Vault)"
    - "Agent payment flows & 402 protocols (1 note)"
    - "The shift & four-checkpoint stakes ladder (2 slide photos)"
  skipped: "Blurry photo of the Token Vault code slide behind audience heads (PXL_20261112_195334232.MP.jpg, replaced with a mechanism diagram); Miss Mabel dog-grooming banter and closing 90-second booth raffle (folded/skipped)"
key_points:
  - "Long-lived local API keys expose everything when an agent runs autonomously; match human-in-the-loop friction to the stakes instead of blocking every step or trusting raw keys (00:00:45, 00:02:04)"
  - "Use Token Vault for step-up authorization so an authenticated user grants only narrow, short-lived OAuth scopes (like Google Calendar or GitHub write) when a tool needs them (00:06:11, 00:08:44)"
  - "Use CIBA (Client-Initiated Backchannel Authentication) for destructive or high-stakes actions—push, SMS, or email approval outside the browser session before polling and executing (00:12:49)"
  - "Never hand an agent a raw credit card; use virtual cards or Shared Payment Tokens over HTTP 402 (Stripe MPP / Coinbase x402) with hard dollar caps against hidden-HTML spoofing (00:15:56)"
kind: talk-story
status: draft
---

# Scale human-in-the-loop to the stakes

When agents only answered questions, a hallucination stayed inside the chat window (`00:02:04`). Once agents book flights, write to GitHub, and spend money, handing them long-lived API keys turns every failure into a real-world incident (`00:00:45`). Michael Liendo maps a four-rung escalation ladder where friction matches the consequence of getting it wrong (`00:02:04`, `00:06:11`, `00:12:49`, `00:15:56`).

*Framing note: this story is framed from three inbox notes and two legible slide photos taken in the room (`PXL_20261112_194819770.jpg`, `PXL_20261112_194914731.jpg`; a third photo `PXL_20261112_195334232.MP.jpg` of the Token Vault code slide was too blurry behind audience heads to crop legibly). Quotes keep the local Qwen3-ASR 1.7B machine transcription verbatim, including `"Open Club"` (OpenClaw), `"Brusell"` (Vercel), `"hardness"` (harness), `"Ciba"` / `"Siva"` (CIBA), `"striking the point base"` (Stripe and Coinbase), `"ages"` (agents), and `"all zero"` / `"office zero"` / `"off-zero"` (Auth0). Tokens flagged in the transcript header as transcription-prompt bias (`"Michael Liendo"`, `"Auth0"`, `"AWS"`) are never quoted. `"From the notes"` and `"The reading"` boxes are editorial synthesis, not the speaker's words.*

## From raw keys to real-world consequences

Early agent builders moved fast by dropping long-lived API keys onto local machines during the OpenClaw wave (`00:00:45`). That shortcut collapses as soon as keys leak, cannot be revoked cleanly per action, or run unattended (`00:00:45`). Identity becomes unavoidable: is the agent acting on your behalf, or as its own principal (`00:00:45`)?

> “Is just give us an API key to this service and that service and this one over here. It was great. We were building really, really fast. And then we realized, well, those are long-lived APIs. Probably not the best thing.”
> — 00:00:45

> “If I have an agent going off and doing its own thing, is it acting on behalf of me? Does the agent have its own identity?”
> — 00:00:45

**Key points**

- Raw long-lived API keys leave no clean revocation path when an agent runs autonomously (`00:00:45`).
- "Going wrong" now means real-world side effects—flights booked, calendars modified, money moved—so identity must separate user intent from raw credentials (`00:00:45`, `00:02:04`).

**Visual:** photo `photos/PXL_20261112_194819770.jpg` (his slide: *"— THE SHIFT: Agents aren't just answering questions anymore. They're booking flights, sending emails, moving money. 'Going wrong' no longer means a bad answer — it means a real-world consequence."*)

## Four checkpoints as the stakes rise

Putting a confirmation modal on every tool call ruins the product, yet zero checks invite disaster (`00:02:04`). Liendo organizes human-in-the-loop into four progressive checkpoints (`00:02:04`): conversational clarification (*"Just ask me"*), Token Vault scoped access (*"Act for me"*), CIBA out-of-band verification (*"Prove it's me"*), and capped payments (*"Move my money"*). Even at the lowest tier—a dog-grooming booking chatbot built with the Vercel AI SDK—hard step ceilings catch runaway loops before they spiral (`00:04:30`, `00:07:19`).

> “Well, it doesn't make sense to have a human in the loop at every single stage of the application, but sometimes it's implied. And sometimes it's right there, staring at us in the face, waiting for us to approve.”
> — 00:02:04

> “Let's say you have a back. You say, Hey, I don't want this to exceed more than you know eight steps or twelve steps.”
> — 00:04:30

**Key points**

- Conversational back-and-forth (confirming flight time, seat, or grooming service) is already an implicit human-in-the-loop gate (`00:02:04`, `00:07:19`).
- Bound multi-step agent loops in the SDK (e.g., 8–12 steps) so off-the-rails chains pause automatically (`00:04:30`).

**Visual:** photo `photos/PXL_20261112_194914731.jpg` (his slide: *"— THE MAP: As the stakes rise, the type of check changes"*—four columns: `01 Conversational`, `02 Token Vault`, `03 CIBA step-up`, `04 Payments`)

## Token Vault: limit what the agent can touch

A user who logs into a web app with email and password does not automatically want the agent reading their Google Drive or YouTube (`00:06:11`). With step-up authorization, the agent requests only the missing scope—such as Google Calendar or writing to a specific GitHub repo in his Party Animals audience drawing demo—and Auth0's Token Vault holds the upstream credentials while issuing a short-lived, scoped token (`00:06:11`, `00:08:44`).

> “So I'm authenticated, but my agent needs to do more. So now we have this authorization stuff.”
> — 00:06:11

> “A short-lived token. OAuth 2 has solved this for decades now, and I'm going to associate that with my user.”
> — 00:06:11

**Key points**

- Start agents with baseline sign-in and escalate scopes on demand rather than pre-granting broad OAuth access (`00:06:11`).
- Token Vault keeps raw refresh tokens off the agent's context and works across web apps, nightly cron jobs, and MCP servers (`00:08:44`).

<div class="reading"><b>From the notes:</b> “Token vault is a super interesting idea: limiting the scopes of what the agents can do.” (<code>2026-11-12T1154-token-vault-limits-agent-scopes.md</code>). <b>The reading:</b> for Will and clients building MCP or multi-tool agents, Token Vault replaces the dangerous pattern of pasting personal access tokens into <code>.env</code> with per-user, narrow, short-lived OAuth exchanges.</div>

**Visual:** diagram “Token Vault step-up flow: User signs in → Tool needs Calendar/GitHub scope → Vault triggers consent interrupt → Agent receives short-lived scoped token without seeing upstream credentials”

## CIBA: verify outside the browser session

When an agent tries to perform a high-stakes or destructive action—such as cancelling an appointment—trusting a "yes" inside the same browser chat is too weak (`00:12:49`). Client-Initiated Backchannel Authentication (CIBA) brokers an approval request directly to the user's email, SMS, or mobile push notification (`00:02:04`, `00:12:49`). While the user reviews and approves on a separate channel, the application polls the identity provider and releases the delete tool only once consent is confirmed (`00:12:49`).

> “I don't trust the human that's in the browser session.”
> — 00:12:49

> “Ciba client-initiated back-channel authentication. It's really just a fancy way of saying we're going to send you an email, push notification, or an SMS. To make sure that it is in fact you.”
> — 00:12:49

**Key points**

- CIBA decouples approval from the browser session so a hijacked tab or prompt-injected chat cannot self-approve (`00:12:49`).
- Push notifications give near-real-time human sign-off from any harness via a simple SDK call and poll loop (`00:12:49`).

<div class="reading"><b>From the notes:</b> “CIBA (Client-Initiated Backchannel Authentication, an OpenID Connect extension): the app asks the identity provider directly, and the user approves on a separate device, usually a push notification on their phone... Paired with Token Vault (scoped access to third-party APIs), it's the pattern for agents: limit what they can touch, and ask a human before the sensitive step.” (<code>2026-11-12T1204-ciba-human-approval-for-agents.md</code>). <b>The reading:</b> Token Vault answers <em>what</em> the agent is allowed to reach; CIBA answers <em>who</em> is authorizing an irreversible mutation right now.</div>

**Visual:** quote “Ciba client-initiated back-channel authentication. It's really just a fancy way of saying we're going to send you an email, push notification, or an SMS. To make sure that it is in fact you.” (00:12:49)

## Agent payments: HTTP 402 and capped tokens

At the top of the stakes ladder sits moving money (`00:15:56`). Liendo contrasts three patterns over HTTP `402 Payment Required`—driven by Stripe's Machine Payments Protocol (MPP) and Coinbase's `x402` across cards and stablecoins (`00:15:56`): never share your raw card number; prefer a capped virtual card or a **Shared Payment Token** scoped to a transaction and maximum spend (`00:15:56`). Because human-readable context strings can be spoofed by hidden HTML elements (turning a $12 shirt into a $15 charge), hard spend caps and screenshot-vs-DOM checks remain mandatory (`00:15:56`).

> “It just says you are not authenticated, just like a 401, because you owe me money.”
> — 00:15:56

> “You can share your card with the agent. Please don't do that.”
> — 00:15:56

> “The context is also human generated, which means it is subject to spoofing.”
> — 00:15:56

> “There's nothing stopping. That came from going through because you set a maximum threshold. That's super important.”
> — 00:15:56

**Key points**

- HTTP `402` protocols (Stripe MPP and Coinbase `x402`) standardize machine-to-machine payment challenges alongside cards and stablecoins (`00:15:56`).
- Use capped virtual cards or Shared Payment Tokens—never raw credit cards—and enforce hard maximum thresholds because page context can be spoofed by hidden HTML (`00:15:56`).

<div class="reading"><b>From the notes:</b> “The agent payment flow is super interesting.” (<code>2026-11-12T1204-agent-payment-flow.md</code>). <b>The reading:</b> payment authorization mirrors Token Vault—instead of exposing the underlying instrument, issue a single-purpose, hard-capped credential that fails closed when a malicious page tries to inflate the amount.</div>

**Visual:** diagram “Three payment tiers + HTTP 402 guard: Raw Card (never) → Virtual Card (single-use) → Shared Payment Token (MPP / x402 + hard max cap against hidden-DOM spoofing)”
