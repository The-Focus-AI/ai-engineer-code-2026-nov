---
title: "Swarms on both sides: running a company on agents means owning access and the perimeter"
speakers: "Karan Vaidya (Composio)"
duration: "10:41"
source: transcript.md
video: null
themes: [guardrails-people-own, decision-load]
reader: "Will and his clients: what it takes to let agent swarms operate across a company safely, and what the company has to own to do it"
built_from_notes:
  - notes/inbox/2026-11-10T1519-file-karan-vaidya-recording.md
key_points:
  - "Attackers already run agents, so defense has to be agents too (00:00:41)"
  - "Swarms watch the company around the clock, and queue what they're unsure of for a person in the morning (00:01:56, 00:03:38)"
  - "Agents need broad reach but granular, scoped access to every app (00:05:49)"
  - "Agents need a firewall on both sides: what goes in, and what they do (00:07:15)"
kind: talk-story
status: draft
---

# Swarms on both sides

Karan Vaidya runs Composio, which connects agents to the apps companies use. His
talk is about running a company's security and operations on swarms of agents,
and what has to be in place before that's safe. The recording starts about five
minutes into the slot and runs to his conclusion, so his opening is missing.

*Framing note: the recording is a Qwen machine transcription and garbles some
figures and names; quotes keep its wording, and garbled numbers are left out.
“The reading” boxes are interpretation, not his words.*

## Attackers already run agents

The starting fact is the threat (00:00:41). Exploits now arrive before patches
do: the time from a patch to an exploit used to be 63 days, and is now far
shorter. By his figures, eighty to ninety percent of attacks are now carried out
by agents, and they happen at a speed and volume no human team can follow.

> “Attackers are obviously using agents to attack you.”
> — 00:00:41

So defense has to be agents too. A security team that reads alerts by hand is
already behind.

**Visual:** quote “Attackers are obviously using agents to attack you.”

## Swarms that watch the company

Composio runs its own swarms (00:01:56). One sweeps the outside world every
few hours, reading threat feeds, advisories and researchers' posts, and checks
whether any new attack pattern matches the company's stack. Another runs every
30 minutes over the company's own activity logs, judging what it sees against
known attack patterns. Clear matches get flagged at once. Anything it isn't sure
about goes into a queue a person reviews in the morning, so engineers can sleep.

The same pattern runs operations (00:03:38). As a developer-infrastructure
company, an outage hits its customers' customers, so the blast radius is huge.
Since most incidents follow a change (a deploy, an environment variable, a
config), each change triggers a swarm that watches error patterns across the
services and posts a suggested rollback or fix in Slack within minutes.

> “We just can't go down.”
> — 00:03:38

<div class="reading"><b>The reading:</b> the human doesn't disappear; their job
changes. Agents handle the volume around the clock, and a person makes the
uncertain calls in the morning. It's the decision-load theme again: the swarm
filters so the person only sees what needs judgment.</div>

**Visual:** diagram “outside swarm every few hours + inside swarm every 30 minutes → clear match flagged now / uncertain → morning review queue for a person” (illustrative)

## Broad reach, granular access

To find problems before they spread, agents need access to everything the
company uses (00:05:49). The more access, the more useful they are. But it has
to be granular: even large swarms can be tricked by prompt injection or simply
make mistakes, and broad write access can take down production or leak customer
data. The average company uses 106 apps, and getting scoped access right across
all of them is a lot of work; that mapping is what Composio sells.

> “So to be able to do that correctly, you need to give right amount of access to all of these agents.”
> — 00:05:49

<div class="reading"><b>The reading:</b> access is a layer you own. Not the
model's job and not each app's; it's a deliberate map of who can do what,
where, kept as carefully as the data itself.</div>

**Visual:** photo `photos/PXL_20261110_220127976.jpg` (his slide: “Agent swarms need scoped access to nine apps, limited to non-destructive actions”, with 106 SaaS apps at the average company)

## A firewall on both sides

Swarms read unfiltered text, and none of it is fully trustworthy: anything can
be used to poison an agent's input (00:07:15). In the deterministic era, a web
firewall protected applications from known-bad traffic. Agents need the same
idea, in both directions.

> “In case of non-deterministic agents, you want something similar protecting.”
> — 00:07:15

On the way in, detection layers flag likely prompt injection before it reaches the
agent's context; Composio trains small models on the injection patterns it sees
across the tool calls running through its platform. On the way out, a second check
stops the agent from taking misaligned actions, because something can still get
through. And credentials are scoped from the start so an agent can't do what it
was never meant to.

**Visual:** diagram “untrusted input → inbound filter → agent → outbound check on actions → apps; scoped credentials underneath” (illustrative)

## Swarms on both sides

His closing patterns (00:09:39): give each swarm its own area so their contexts
don't conflict, give them connectivity, and treat a firewall as a must.

> “To conclude, attackers already run storms of agents.”
> — 00:09:39

<div class="reading"><b>The reading:</b> this is the security side of
<a href="../../../atlases/own-the-stack/page.html">owning the stack</a>. Besides
the data and the checks, a company running on agents owns the access map (who can
do what, in which app) and the perimeter (what goes in, what comes out), and
keeps a person on the calls the swarm can't make.</div>

**Visual:** photo or diagram: the swarm-per-area pattern (illustrative)
