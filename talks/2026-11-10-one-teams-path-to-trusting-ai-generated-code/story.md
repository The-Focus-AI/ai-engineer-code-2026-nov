---
title: "Software that learns what it is"
speakers: "Ankit Jain (Aviator)"
duration: "22:30"
source: transcript.md
video: null
themes: [self-improving systems, intent, evidence, decisions, invariants, ownership]
reader: "Will and his clients: what changes when a system learns what it is from the conversations that build it"
thesis: "A system can start as a sketch and become resilient by learning its own invariants from sessions, chat logs and issues, promoting what keeps proving true into checks."
thesis_source: "Will's framing, developed with dramatic inquiry; Ankit Jain's talk is the main evidence, not the subject"
built_from_notes:
  - notes/inbox/2026-11-10T0944-capturing-intent-and-decisions-agents-argue.md
  - notes/inbox/2026-11-10T0950-new-development-model-intent-decisions-invariants.md
  - notes/inbox/2026-11-10T0951-responsibility-and-where-it-goes.md
  - notes/inbox/2026-11-10T0953-intent-evident-and-decisions-main-takeaway.md
  - notes/inbox/2026-11-10T0955-adr-link-matt-pocock-skills-vs-pull-requests.md
key_points:
  - "Every conversation that builds the system is evidence of what it is meant to be (00:08:38, 00:07:08)"
  - "What keeps proving true gets promoted: pattern, then rule, then check (00:10:17, 00:14:09)"
  - "Resilience accumulates where learning is captured; people own what gets promoted (00:17:18)"
open_question: "Who decides when something graduates to an invariant: a person, a repetition threshold, or the system proposing and a person approving?"
kind: talk-story
status: draft
---

# Software that learns what it is

*Thesis (Will's, not the speaker's):* a system can start as a sketch and become
resilient by learning what it is from the conversations that build it. Ankit
Jain's talk about Aviator's review process is the best evidence for it heard
today.

## Sketches drift, specs go stale

There are two familiar ways to build. Write the spec first and let the code
follow, or skip the spec and let the code find its shape. Jain's team tried
specs: they went stale as the code moved, and nothing checked that the code
still matched them (00:00:29). Without a spec, nothing holds the shape at all.
Neither approach learns.

> “The intent was written down, but nothing really checked whether we're actually still consistent with the spec.”
> — 00:00:29

**Visual:** diagram “spec-first: written once, drifts · sketch-first: no shape, drifts · neither learns”

## Every conversation is evidence

What makes learning possible now is that the work leaves a trail. The intent of
a change is already in the agent session (00:08:38). Decisions surface when a
coding agent and a review agent argue, and every disagreement is written down
with its outcome (00:07:08). Evidence that a change works is captured as agents
verify it (00:13:02). Sessions, chat logs and issues become a record of what the
system is meant to be, without anyone writing documentation.

> “And these already live in your sessions.”
> — 00:08:38

> “Everything that they disagree about, we should write it down.”
> — 00:07:08

**Visual:** diagram “sessions · agent arguments · issues → one record of intent, decisions, evidence”

## What keeps proving true gets promoted

The record is where invariants are discovered. Jain's team mined their past
review comments and found 200 candidate patterns, which distilled into 64 rules
written in English (00:10:17). An agent then turned rules into scripts, and 19
became deterministic checks (00:10:17). Settled decisions take the same path and
harden into the team's standards (00:14:09).

That is the movement from sketch to resilient: a pattern noticed, a rule named,
a check enforced. Each promotion constrains the next change. The system hardens
where it has proven itself and stays loose where it hasn't.

> “Out of 200 candidates, we got 64 rules automatically created.”
> — 00:10:17

> “Which now essentially become the standards of your approach.”
> — 00:14:09

**Visual:** diagram “pattern → rule → check (200 → 64 → 19)”

## The system reads itself back

Learning only counts if the record is used. Jain's team pulls the decisions
behind a feature or a week (00:14:09) and gives them to their agents, which then
know what was already decided (00:14:09). The system's memory of why it is the
way it is becomes context for the next change. Design-time decision records,
like the ADRs the `grill-with-docs` skill writes, capture intended decisions;
this captures the decisions actually made.

> “Now, agent knows these past decisions.”
> — 00:14:09

**Visual:** diagram “record → agent context → next change → record”

## What learning looks like up close

*Not from the talk.* This repo learned four things in one morning, each from a
conversation:

- A rule that a recording must name its talk relaxed once an operator's
  attribution proved trustworthy; it became a contract change.
- A speech model echoing its prompt as transcript text became a filter.
- Running speech recognition on battery became a deferral rule.
- A receipt that mislabeled its own result was caught and corrected.

Each started as "this happened once" and ended as a contract or a check.

**Visual:** timeline “four incidents → four invariants, 9:30 am to 12:30 pm”

## What it doesn't solve

The risk is learning the wrong thing. Mined rules reflect past habits,
including bad ones, and every rule needs an owner or it goes stale (00:10:17).
Jain's answer is that responsibility stays with people: models can't own
anything (00:05:48), so people own the guardrails and the rules (00:17:18).
Promotion is the part that still needs judgment. It also isn't free: his team
spent about ninety days doing double work before it paid off (00:18:42).

> “If you don't have an owner for a rule, this rule will become stale.”
> — 00:10:17

> “So instead of thinking about owning the code. Own the guardrails. Own the rules.”
> — 00:17:18

**Open question:** who decides when something graduates to an invariant: a
person, a repetition threshold, or the system proposing and a person approving?

**Visual:** quote

## Further reading (not from the talk)

Ideas that sharpen or challenge the thesis. None of these were cited by the
speaker except where noted.

**The frame**

- **How Buildings Learn** (Stewart Brand, 1994): buildings improve through use,
  adapting where they're actually lived in rather than where they were
  designed. The closest existing statement of "software that learns what it
  is." [Wikipedia](https://en.wikipedia.org/wiki/How_Buildings_Learn)
- **Gall's law** (John Gall, *Systemantics*): a complex system that works
  evolves from a simple system that worked. Sketch to resilient, as a law.
  [Wikipedia](https://en.wikipedia.org/wiki/John_Gall_(author))
- **Desire paths**: paths worn by use that planners later pave. Guardrails
  discovered, then reified. [Wikipedia](https://en.wikipedia.org/wiki/Desire_path)

**The risk**

- **Hyrum's law**: with enough users, every observable behavior gets depended
  on. Invariants form whether or not anyone names them, so a learning system
  can learn the wrong ones. [hyrumslaw.com](https://www.hyrumslaw.com/)
- **Lehman's laws of software evolution**: systems in use must keep changing,
  and their complexity grows unless work is done against it.
  [Wikipedia](https://en.wikipedia.org/wiki/Lehman%27s_laws_of_software_evolution)

**The decision record lineage**

- **Architecture decision records** (Michael Nygard, 2011): the design-time
  record that change-time decision logs extend.
  [Nygard's post](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) ·
  [adr.github.io](https://adr.github.io/)
- **Bacchelli and Bird, 2013**, *Expectations, Outcomes, and Challenges of
  Modern Code Review* (Microsoft Research). The study the speaker cites at
  00:02:56: review is mostly knowledge transfer, not bug-finding.
  [Microsoft Research](https://www.microsoft.com/en-us/research/publication/expectations-outcomes-and-challenges-of-modern-code-review/)
  (page not verified; it blocks automated requests)

**From the speaker**

- [We stopped reviewing code and started verifying intent](https://tessl.io/blog/we-stopped-reviewing-code-and-started-verifying-intent)
  (Tessl): Ankit Jain's own write-up of this talk.
- [Aviator Verify: invariants](https://docs.aviator.co/verify/concepts/invariants).

**From this conference**

- **Scott Tolinski, same room, 10:10**: the human cost of always-on agents
  ([talk](../2026-11-10-scott-tolinski-co-host-syntax/transcript.md)). A
  learning system still needs a pace people can sustain.
- [AI Agents, Anxiety, and the Cost of Too Many Decisions](https://www.turingpost.com/p/ai-agents-anxiety-and-decision-overload)
  (Turing Post), noted during that talk. If the system proposes promotions, people make fewer
  decisions: one possible answer to the open question above.
- **Kent C. Dodds, "Closing the Agentic Loop"** (workshop, 11:40, not
  attended): decision records and invariants; worth finding his materials.
