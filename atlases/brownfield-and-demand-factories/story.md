---
title: "Brownfield & demand factories"
kind: theme-story
status: draft
theme: brownfield-and-demand-factories
talks:
  - talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/story.md
  - talks/2026-11-11-2026-in-llms/story.md
  - talks/2026-11-11-autocomplete-for-actions-system-one-from-the-ui-to-the-db/story.md
  - talks/2026-11-11-cloudflare-is-a-neolab/story.md
  - talks/2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/story.md
  - talks/2026-11-11-software-factories-escape-from-trash-mountain/story.md
  - talks/2026-11-11-the-software-factory-that-needs-zero-fdes/story.md
  - talks/2026-11-11-what-it-takes-to-set-intelligence-free/story.md
  - talks/2026-11-11-what-will-you-build-when-ai-is-10x-faster/story.md
  - talks/2026-11-12-a-company-built-around-the-agent/story.md
  - talks/2026-11-12-a-new-age-of-software-engineering/story.md
  - talks/2026-11-12-brownfield-factories/story.md
  - talks/2026-11-12-exploring-claudes-frontier/story.md
  - talks/2026-11-12-jarred-sumner-founder-of-bun-anthropic-bun/story.md
  - talks/2026-11-12-let-the-agent-cook-from-apis-to-answers/story.md
  - talks/2026-11-12-the-first-grounded-decision-model/story.md
  - talks/2026-11-12-thariq-shihipar-independent/story.md
---

# Brownfield & demand factories

**Thesis:** Because coding tokens make small teams look huge on existing products with live runtime feedback, agentic software factories thrive on brownfield maintenance—bounded by real token/fuel economics and durable multi-hour execution.

Across sixteen talks in this theme—and one pointed counter-argument from synchronous engineering—builders converged on a sharp division of labor. Autonomous factories fail when thrown at unformed greenfield bets where nobody yet knows what the customer actually wants; they compound rapidly when pointed at existing codebases whose runtime telemetry, tests, and paying users already define the specification. Inside those boundaries, small high-equity pods outship organizations ten times their size, while infrastructure teams race to contain token burn, latency, and multi-hour sandbox state.

## 1. Why brownfield beats greenfield discovery

> “So that's of course the time for me to say, please stop building software factories.”
> — [Brownfield Factories](../talks/2026-11-12-brownfield-factories/story.md), `00:02:12`

Justin McCarthy opened with deliberate irony: the same StrongDM software-factory lineage does not mean every problem belongs in an autonomous loop. When teams are still searching for product-market fit, factory throughput only produces the wrong software faster. Brownfield systems invert that geometry because paying behavior already specifies the contract:

> “It's something where customers are saying with their dollars and their and their utilization. Like yeah, this works for me. I like it. I want more of this.”
> — [Brownfield Factories](../talks/2026-11-12-brownfield-factories/story.md), `00:03:18`

Fabian Hedin pushed the same point from the commercial side at Lovable—code is only an intermediate artifact:

> “But in the end, what matters is actually not the code.”
> — [What it takes to set intelligence free](../talks/2026-11-11-what-it-takes-to-set-intelligence-free/story.md), `00:02:04`

## 2. Small high-equity pods replace coordination bloat

When a model handles implementation and verification loops, company shape flips. Quinn Slack described spinning out a 20–21 person team under an external hiring freeze and abandoning enterprise checklists and departmental boundaries:

> “And that skin in the game that you get when AI makes it so you can operate with way less people. Skin in the game—it's like this spiritual thing for the soul. Of great people, it makes them better at everything they do.”
> — [A Company Built Around the Agent](../talks/2026-11-12-a-company-built-around-the-agent/story.md), `00:05:51`

Slack reported more than $100M ARR at 40–50× higher dollar-in, dollar-out capital efficiency than conventional orgs, while internal mini-apps built inside sandboxes replace traditional SaaS seats:

> “That is profitable. That's more than a hundred million ARR. That is doing so. On a dollar in, dollar out, you know, basis, that's 40 to 50 times more efficient than old-fashioned companies.”
> — [A Company Built Around the Agent](../talks/2026-11-12-a-company-built-around-the-agent/story.md), `00:15:58`

Walden Yan documented a matching shift at Cognition: small pods owning engineering alongside triage and support grew merged pull requests 40× on 2.7× headcount:

> “But they're responsible for everything beyond engineering as well.”
> — [A New Age of Software Engineering](../talks/2026-11-12-a-new-age-of-software-engineering/story.md), `00:01:48`

And Raz Berman Gold warned from Overcut that "automated" enterprise factories collapse if they arrive tethered to months of Forward Deployed Engineers rather than plugging into existing repos, harnesses, and issue trackers.

## 3. Every problem is a fuel problem

Running factories around the clock exposes real unit economics. While Slack advocated removing individual token limits inside high-leverage teams, Steve Yegge framed factory scale around fuel supply—estimating his 22 consumer Max plans at roughly $1.5M/year in equivalent API burn—and governance failures he termed overfencing:

> “but I tell you, every problem is a few problem.”
> — [Software Factories: Escape from Trash Mountain](../talks/2026-11-11-software-factories-escape-from-trash-mountain/story.md), `00:09:22` (verbatim ASR transcript for "fuel problem")

> “That they put all these rules in place to make sure nothing bad ever happened, and so nothing ever happened. Okay, let's call it overfencing.”
> — [Software Factories: Escape from Trash Mountain](../talks/2026-11-11-software-factories-escape-from-trash-mountain/story.md), `00:15:27`

Across the runtime stack, builders responded by cutting wasted tokens and latency: Natalie Serrino (Gimlet Labs) targeted the 63-second median coding-agent turn where developers lose flow; Arsalan Bashir (Sentry) showed dynamic discovery and typed wrappers running 4× faster with 30% fewer tokens; Philipp Schmid rebuilt harnesses every six months to delete obsolete scaffolding; Jarred Sumner cut Claude Code memory ~4× with ahead-of-time JavaScript bundling; and Scott Roberts alongside Devin Gupta pushed narrow, calibrated decision models to handle high-volume triage and SQL classification for pennies instead of full frontier generation.

## 4. Sub-second checkpoints and 10-hour to 44-day agents

Keeping long-horizon loops alive without human babysitting depends on durable execution primitives. Lovable moved from a 30-minute cap to 10+ hour runs by giving every agent a persistent inbox and resuming VMs from copy-on-write golden checkpoints in 230 milliseconds:

> “we used to limit our agents to work for only thirty minutes.”
> — [What it takes to set intelligence free](../talks/2026-11-11-what-it-takes-to-set-intelligence-free/story.md), `00:04:32`

> “all of them you copy it over in about 230 milliseconds.”
> — [What it takes to set intelligence free](../talks/2026-11-11-what-it-takes-to-set-intelligence-free/story.md), `00:11:24`

Jarred Sumner described shifting from rigid workflows to long-lived subagents that preserve working context across multi-file edits, while Lance Martin showed frontier agents given only git and SQL inventing their own database tracking tables to survive 30-hour builds:

> “So agents now are sufficiently advanced that they can actually build primitives if they need to solve hard problems.”
> — [Exploring Claude’s frontier](../talks/2026-11-12-exploring-claudes-frontier/story.md), `00:03:46`

## 5. From promise-keeping to the demand factory

> “So you've got an existing codestate. You've got an existing set of promises. Just make it continuous. Make it loop and make it keep those promises.”
> — [Brownfield Factories](../talks/2026-11-12-brownfield-factories/story.md), `00:06:30`

Once a brownfield factory keeps existing product promises running continuously, product delivery stops being the bottleneck. Both Justin McCarthy and Mihail Eric argued that competitive differentiation moves outward to demand generation and go-to-market loops:

> “We have to figure out how to build a demand factory. Because our brownfield factory can't build the moat. Right. All it can do is keep our existing promises running well.”
> — [Brownfield Factories](../talks/2026-11-12-brownfield-factories/story.md), `00:13:17`

> “Go to market is one of the few remaining sources of alpha”
> — [Building World-class Agentic GTM: Learnings from Monaco for Monaco](../talks/2026-11-10-building-world-class-agentic-gtm-learnings-from-monaco-for-monaco/story.md), `00:05:43`

## 6. The fault line: 24/7 background loops vs. synchronous flow

The sharpest disagreement in the summit sits squarely on how human engineers should couple to these loops. Walden Yan cited autonomous agents maintaining Android parity over 44 days with sparse human check-ins, while Simon Willison warned that with brute-force models, engineering judgment shifts to stating the problem and taste-testing outcomes rather than babysitting edits:

> “Go manage the entire Android application, and over the course of 44 days, we have a working application, which we'll be putting out soon.”
> — [A New Age of Software Engineering](../talks/2026-11-12-a-new-age-of-software-engineering/story.md), `00:10:45`

> “As difficult as possible, the models will solve your problem just almost with brute force.”
> — [2026 in LLMs](../talks/2026-11-11-2026-in-llms/story.md), `00:08:02`

**Counter-position — Synchronous flow and human-readable specs:** Thariq Shihipar argued against fire-and-forget asynchronous prompting when engineers still need mental models of the system they own:

> “And I find that like the ball just makes a bunch of choices for me, and then I try it out. I'm like, wow, I have no idea what that actually does. I get distracted pretty easily. I don't feel in the zone very much. You know, I sort of send off a prompt and they start doing something else and I come back. And I honestly make less progress because of these things, right?”
> — [Thariq Shihipar, Independent](../talks/2026-11-12-thariq-shihipar-independent/story.md), `00:11:06`

**For TheFocus.AI:** Clients rarely win by automating greenfield guesses on day one. The durable wedge is pointing continuous, checkpointed agents at existing brownfield codebases with real customer usage, budgeting token and decision-model tiers explicitly rather than leaning on consumer loss-leader pricing, and keeping humans synchronously in the loop on architectural specs while background loops protect existing promises.
