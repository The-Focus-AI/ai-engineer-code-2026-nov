---
title: "How to build vertical AI: seven lessons from a team that did it"
speakers: "Mihail Eric (Monaco)"
duration: "29:36"
source: transcript.md
video: null
themes: [the-vertical-harness, guardrails-people-own, context-for-ai]
reader: "Will and his clients: the process of building an AI product for one domain, as a sequence of lessons, with one team's sales product as the examples"
built_from_notes:
  - notes/inbox/2026-11-10T1532-monaco-ai-native-gtm-company.md
  - notes/inbox/2026-11-10T1533-gtm-harness-domain-specific-product.md
  - notes/inbox/2026-11-10T1551-principles-for-vertical-ai-native-companies.md
  - notes/inbox/2026-11-10T1552-tracing-and-observability-for-everyone.md
  - notes/inbox/2026-11-10T1555-vertical-ai-is-new-lingo.md
  - notes/inbox/2026-11-10T1555-2-latent-space-podcast-episode.md
read_alongside: "https://latent.space/p/cs146s/"
key_points:
  - "Start from what the domain's best people know; build a generic chassis and spend the effort on filling it with the domain (00:05:43, 00:08:33)"
  - "Encode expert workflows, capture judgment as it emerges, and let experts define what correct means (00:10:23, 00:15:00, 00:17:41)"
  - "Put the experts inside the team that builds it; the process is organizational as much as technical (00:20:57)"
kind: talk-story
status: reviewed
---

# How to build vertical AI

Vertical AI means an AI product built for one domain: capturing the workflows
specific to that domain rather than offering general intelligence. Mihail Eric
built one for sales, and his talk is really about what that process taught his
team. These are the lessons, in the order you'd meet them on a project. His
sales product appears only as the worked example (00:08:33).

*Framing note: “From the notes” and “The reading” boxes are interpretation, not
his words. Quotes are verbatim from a Qwen machine transcription, which garbles
some names.*

## 1. Define world-class before you build anything

The first job isn't choosing a model. It is writing down what the best
practitioners in the domain actually know and do. His team distilled theirs from
the best salespeople they could hire (00:05:43): knowledge (which customers fit,
who decides, what matters to them), judgment (who to contact, with what angle,
and when), procedure (the repeatable steps), and adaptation (changing course as
the customer changes).

That definition is the specification for everything after it, and it is where
the value is: when software is a commodity, the scarce thing is the domain
expertise.

> “Go to market is one of the few remaining sources of alpha”
> — 00:05:43

<div class="reading"><b>The reading:</b> each of the four maps to a layer of the
product. Knowledge becomes data, judgment and adaptation become memory, procedure
becomes workflows, and “world-class” becomes the evaluation.</div>

**Visual:** photo `photos/PXL_20261110_233809826.MP.jpg` (slide: “What is world-class GTM?”)

## 2. The chassis is generic; the effort goes into the domain

Most vertical AI systems share the same layers, bottom to top: the domain's data,
a workspace where agents run, memory, domain workflows guided by experts, and
evaluation running through all of it (00:08:33). That structure is reusable
across industries, so don't spend your originality there.

> “I could have pulled this and said this was a talk about insurance.”
> — 00:08:33

The work, and the advantage, is in what you put in each layer for your domain.

<div class="reading"><b>From the notes:</b> “a GTM harness, or how to build a
product in a domain-specific area”: the harness is the reusable part; the domain
is the product.</div>

**Visual:** diagram “the generic layers (data, workspace, memory, workflows, with evaluation through all of them), each filled with domain expertise” (illustrative)

## 3. Own the domain data that nobody can buy

Separate the data anyone can get from the data only your customers generate
(00:10:23). In the sales example, records about companies and people can be
bought or scraped. What matters is the customer's own activity, their meetings
and emails, flowing in continuously so the system's picture of their work is
always current. Expose all of it to agents through one tool interface that can
also plug in the customer's own systems. He calls this the most strategic piece,
and more art than science.

<div class="reading"><b>The reading:</b> the same move as George Fraser's talk
the same day: agents should read data you've already brought together and kept
current, not reach into every source live.</div>

**Visual:** photo `photos/PXL_20261110_234049175.jpg` (slide: “World data model”)

## 4. Encode the experts' workflows, and leave room for the customer's

Turn each expert practice into an opinionated workflow an agent follows: meeting
prep, coaching, pipeline review (00:15:00). The examples show why (00:18:47): the
expert move for a prospect who went quiet (follow up, at the right moment, framed
the right way) becomes an agent with reply rates above 30 percent; the expert move
after a win (go after the companies most like that customer) has led to deals as
large as $15 million.

You can't know every niche, so also let customers encode their own playbooks
with an agent builder.

> “you know better than we do how to sell to dentists in the Midwest”
> — 00:15:00

<div class="reading"><b>From the notes:</b> “vertical AI is new lingo, capturing
workflows that are specific to domains”.</div>

**Visual:** photo `photos/PXL_20261110_235027064.jpg` (slide: “GTM agents in the wild”)

## 5. Capture judgment as it emerges

Expertise isn't static, so the system has to keep learning it (00:08:33,
00:10:23). Seed memory from what each customer brings at onboarding (their
context, preferences, definition of a good customer). Then add a learning loop
his team calls reflections: when something meaningful happens, like a meeting
booked or a deal closed, agents look back at what led to it, write candidate
lessons, rank them, and promote the best into shared memory (00:26:46).

> “Right, this is where you start capturing things like judgment.”
> — 00:08:33

**Visual:** photo `photos/PXL_20261110_234349286.jpg` (slide: “Memory”, with the Reflections loop)

## 6. Trace everything, and let experts define correct

You can't improve what you can't see, so trace every agent run (00:17:41). But
traces only show what happened. In a vertical, “good” is a judgment with no
universal answer, so the domain experts, not the engineers, define it and set the
evaluations.

> “Absolute correctness is only correctness informed by subject matter experts.”
> — 00:17:41

<div class="reading"><b>From the notes:</b> “tracing and observability is key
for everyone to see”: the trace is the evidence, the expert is the judge.</div>

**Visual:** diagram “agent run → trace → expert judges it → evaluation → better workflow” (illustrative)

## 7. Put the experts inside the build

The hardest gap is between domain experts, who often aren't technical, and the
engineers (00:20:57). His team's answers, all organizational:

- Use your own product, so you feel every failure first.
- Put your best domain expert in charge of deploying agents, as part of the product team, not an engineer or product manager.
- Give experts an equal vote in product design, and make them the first users of what ships.
- Have experts and agents share the same tools, and make every trace visible to everyone.
- Run hackathons that put experts and engineers in one room.

> “This is literally the best salesperson at Monaco.”
> — 00:20:57

He closes on empathy: understanding the person across the table is what makes
the translation from expertise to product work (00:25:21).

<div class="reading"><b>The reading, for The Focus:</b> the process for a client
is the same seven steps: (1) write down what their best people know; (2) reuse a
generic chassis; (3) bring their own data together and keep it current; (4) turn
expert practice into workflows, with room for their own; (5) capture judgment as
it emerges; (6) trace everything and let their experts judge; (7) keep those
experts inside the build. Only step 2 carries from client to client.</div>

<div class="alongside"><b>Read alongside</b>His Latent Space episode two days
before the talk, <a href="https://latent.space/p/cs146s/">How Stanford Teaches
AI-Native Engineering</a>, on teaching AI-native engineering.</div>

**Visual:** photo `photos/PXL_20261110_235341969.MP.jpg` (slide: “Principles for vertical AI-native companies”)
