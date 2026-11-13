---
title: "A Company Built Around the Agent"
speakers: "Quinn Slack (Amp)"
duration: "19:11"
source: transcript.md
video: "https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=28490s"
themes: [close-the-loop, organization-design, context-for-ai]
reader: "Will and his clients: how a 21-person team spun out of a 200-person enterprise vendor to reach $100M+ ARR by wiring every workflow, customer loop, and internal tool directly around coding agents"
built_from_notes:
  - notes/inbox/2026-11-12T1640-amp-and-dropping-sourcegraph.md
  - notes/inbox/2026-11-12T1641-enterprise-ready-vs-frontier.md
  - notes/inbox/2026-11-12T1643-hard-to-say-how-things-differ-honestly.md
  - notes/inbox/2026-11-12T1644-no-real-differentiation.md
  - notes/inbox/2026-11-12T1645-good-example-of-org-in-age-of-ai.md
  - notes/inbox/2026-11-12T1650-21-people-to-100m-arr.md
  - notes/inbox/2026-11-12T1652-feedback-mechanism-is-amazing.md
  - notes/inbox/2026-11-12T1654-once-agent-plugged-in-we-dont-use-tools.md
  - notes/inbox/2026-11-12T1656-look-into-customink-team-merch.md
  - notes/inbox/2026-11-12T1657-follow-your-energy.md
built_from_photos: 7
notes_frame:
  spine: "organizational design in the age of AI (4 notes, 3 slide photos): spinning out 21 co-owners with one weekly meeting, no PMs, and 'follow your energy' to reach $100M+ ARR"
  clusters:
    - "Frontier vs. enterprise checklists & no feature differentiation (4 notes, 2 slide photos)"
    - "Agent-first tooling & shedding 96% of SaaS (2 notes, 1 slide photo)"
    - "Closed customer bug-report loop (1 note)"
    - "Audience & swag photos not used as slides (2 photos: PXL_20261113_004408772.TS-000.jpg audience hat shot; PXL_20261113_010122172.MACRO_FOCUS.jpg promo QR card)"
  skipped: "Swag hat tosses at the opening and close (00:00:00, 00:08:04, 00:17:57) and the dictation return-to-remote aside (00:12:35, folded into Ch. 3)"
key_points:
  - "Spinning out a 20–21 person high-equity team under a legal hiring freeze forced an agent-native operating model that a 200-person enterprise company could not adopt incrementally (00:02:39, 00:05:51, 00:15:58)"
  - "When every coding agent shares frontier models and copies features fast, enterprise checklists make you obsolete in three months; differentiation shifts to speed, customer love, and organizational structure (00:03:52, 00:14:45)"
  - "Closing the customer loop—fixing reported bugs, sweeping logs for silent victims, and proactively crediting and emailing them—lets an AI-built product achieve high quality without PM or support handoffs (00:10:58)"
  - "Once agents plug directly into internal systems via plugins and MCP servers, teams stop opening third-party UIs and replace bloated SaaS like Salesforce with the custom 4% they actually need (00:08:04, 00:13:16)"
kind: talk-story
status: draft
---

# A company built around the agent

In January 2025 at the Frankfurt Airport with teammate Thorsten Ball, Quinn Slack watched an early coding agent edit code, run commands, and check its own output (`00:01:31`). Realizing that a 200-person enterprise software company could not pivot fast enough around that shift (`00:02:39`), he spun out a 21-person team under an accidental hiring freeze (`00:05:51`)—replacing Jira, PR gates, and most SaaS with shared agent threads, one weekly meeting, and a closed customer-feedback loop that scaled past $100M ARR (`00:08:04`, `00:10:58`, `00:15:58`).

*Framing note: this story is framed from ten inbox notes and seven photos taken in the room (five slide shots straightened into `experience/*.jpg`, plus two audience/swag photos left out of the visual rail). Quotes preserve the local Qwen3-ASR 1.7B machine transcription verbatim, including `"sourcecraft"` (Sourcegraph), `"anthropomorphic threads"` (Amp threads), `"vibe coated"` / `"vinecode"` (vibe-coded / vibe code), `"soccer industry"` (software industry), `"no way in L"` (no way in hell), `"PMS"` (PMs), `"Get in the game"` (skin in the game), `"Beyond"` (Beyang), and `"Adam Watkin"` (Adam Wathan). Tokens flagged in the transcript header as transcription-prompt bias (`"Quinn Slack"`, `"Amp"`) are never quoted. `"From the notes"` and `"The reading"` boxes are editorial synthesis, not the speaker's words.*

## From a 200-person enterprise vendor to a 21-person spin-out

The break started with a trivial prompt (`00:01:31`)—asking an agent to change a background color—before Claude Code existed:

> “When I saw an agent actually work for the first time. It ran commands. It looked at itself. It gave itself some feedback loops. That blew my mind”
> — 00:01:31

Even as CEO of Sourcegraph—roughly 200 people across engineering, sales, marketing, and support (`00:02:39`)—Slack found that declaring *"no more mandatory pull request reviews"* inside an existing enterprise machine was harder than expected (`00:02:39`). He carved out a 15–20 person group to ignore sales calls and executive meetings (`00:02:39`), and in late 2025 spun the product out completely (`00:05:51`). Legal mechanics blocked hiring and option grants for months, trapping the team at 21 people (`00:05:51`). That constraint became the design principle:

> “And that skin in the game that you get when AI makes it so you can operate with way less people. Skin in the game—it's like this spiritual thing for the soul. Of great people, it makes them better at everything they do.”
> — 00:05:51

**Key points**

- Seeing an agent run commands and verify its own loop convinced leadership that company structure—not just code editors—had to change (`00:01:31`).
- Authority on an org chart was not enough to retrofit a 200-person enterprise vendor; carving out an insulated team and spinning out forced new habits (`00:02:39`, `00:05:51`).
- A legal hiring freeze at 21 co-owners pushed equity ownership and agent leverage across every seat (`00:05:51`).

<div class="reading"><b>From the notes:</b> “They just started building Amp and dropped Sourcegraph.” (<code>2026-11-12T1640</code>) and “This is a good example of how an organization works in the age of AI.” (<code>2026-11-12T1645</code>). <b>The reading:</b> Slack’s timeline slide (Jan 2025 start → Sep 2025 spin-out decided → Nov 2025 independent → May 2026 spin-off done) shows that organizational architecture—not a new tool mandate—was the real pivot.</div>

**Visual:** photo `photos/PXL_20261113_004514950.jpg` (his slide *"I was the CEO. I could change anything."* contrasting ~200 Sourcegraph seats across Engineering 75 and Sales & Marketing 75 against the green 15-person spin-out pod)

## Enterprise checklists vs. frontier love when features have no moat

Early in 2025, the old SaaS playbook—get early traction, build an enterprise-ready checklist, hire a sales team—became fatal (`00:03:52`). Any team pausing to satisfy median enterprise procurement fell behind the frontier in months (`00:03:52`):

> “To make the median enterprise buyer happy, your product was going to go obsolete in like three months. And the whole game had to change. Nothing mattered other than making it so that the people at these other companies love your product”
> — 00:03:52

At the same time, coding-agent teams face blunt questions on social media: how is your agent honestly better than Codex or Claude Code (`00:03:52`)? Slack’s answer is disarmingly candid: isolated product features like cloud "orbs" or multiplayer threads are copied almost immediately (`00:03:52`). When differentiation cannot rest on a three-bullet feature matrix, the organizational gap becomes the only durable separation:

> “Having a whole product management team, a design team, an engineering team that's so disconnected from the actual customers, a whole company apparatus. If that's the best way that you can market a product, it's really tough.”
> — 00:03:52

**Key points**

- Chasing enterprise checklists too early freezes product velocity and leaves frontier tools obsolete within a quarter (`00:03:52`).
- Individual agent features are rapidly commoditized across frontier labs, making honest feature-by-feature differentiation fleeting (`00:03:52`).
- Eliminating layers between builders and customers—and letting users feel the product directly—replaces traditional enterprise marketing apparatus (`00:03:52`).

<div class="reading"><b>From the notes:</b> “Enterprise-ready vs frontier.” (<code>2026-11-12T1641</code>), “It's hard to answer how things are different in an intellectually honest way.” (<code>2026-11-12T1643</code>), and “A lot of this is that there's no real kind of differentiation.” (<code>2026-11-12T1644</code>). <b>The reading:</b> This pairs directly with Ramp’s thesis that technology is no longer the bottleneck—when model capabilities equalize, company velocity and direct customer intimacy become the moat.</div>

**Visual:** photo `photos/PXL_20261113_004654887.jpg` (his slide *“How is this better?” — No intellectually honest way to answer that*, showing three skeptical posts comparing coding agents)

## 21 people to $100M ARR: shared threads, one meeting, and follow your energy

To survive at 21 people, the team threw out traditional engineering and management scaffolding (`00:08:04`, `00:15:58`):

> “We got rid of all of the other tools. We got rid of all of the other things you got to check. Obviously, not Jira. No task tracking. We don't have a support system. Everything we do in the agent.”
> — 00:08:04

Instead of local-only sessions where a stuck developer works in isolation, communication and debugging happen inside shared threads (`00:08:04`), fed rapidly by voice dictation (`00:12:35`). Pushing straight to main stays safe because changes are tiny, observable, and verified before rollout—either by running shadow systems side by side (`00:08:04`) or asking agents to compare every rendered UI frame for jitter and generate nine design iterations at once (`00:09:54`).

Org charts collapsed alongside tooling (`00:15:58`): no PMs, no sprints, no departments, everyone talking to customers. An SDR two years out of college ships an ACH wire-transfer flow; teammates give customers blunt, honest advice rather than commissioned sales spin (`00:15:58`). Every person owns roughly one-twenty-first of the upside, enabling radical autonomy (`00:15:58`):

> “We have one meeting per week, and then everything else. The guidance is follow your energy.”
> — 00:15:58

The result, Slack reports, is a profitable business past $100M ARR (`00:15:58`):

> “On a dollar in, dollar out, you know, basis, that's 40 to 50 times more efficient than old-fashioned companies.”
> — 00:15:58

**Key points**

- Replace Jira, task boards, and support queues with shared multiplayer agent threads and voice dictation (`00:08:04`, `00:12:35`).
- Ship smaller chunks continuously with agent-run shadow verification and multi-variant visual comparisons instead of multi-week PR queues (`00:08:04`, `00:09:54`).
- High-equity generalist pods running on one weekly meeting and *"follow your energy"* reached $100M+ ARR at 40–50× capital efficiency (`00:15:58`).

<div class="reading"><b>From the notes:</b> “They stayed at 21 people up to $100M ARR.” (<code>2026-11-12T1650</code>) and “"Follow your energy."” (<code>2026-11-12T1657</code>). <b>The reading:</b> Compare this 21-person model with Cognition’s vertical pods (40× PRs on 2.7× headcount)—both prove that removing coordination layers multiplies individual leverage once agents absorb implementation and verification.</div>

**Visual:** photo `photos/PXL_20261113_004802860.MP.jpg` (his slide *"Old-fashioned companies vs. companies of the future"* contrasting 11 crossed-out practices against agent-native replacements, from *Push to main, agent proof, feature flags* to *No token limits*)

## The closed bug-report loop: fix, sweep the logs, and apologize

The clearest operational proof of an agent-built product avoiding "vibe-coded junk" is how Slack’s team handles a single bug report (`00:10:58`). Instead of routing a ticket from support to PM triage to an engineering sprint, the agent fixes the defect, thanks the reporter with credits, and then performs an exhaustive sweep no human team would ever spare time for (`00:10:58`):

> “So you find the seventeen other people that hit that same obscure error. They remember it probably, and you proactively tell them.”
> — 00:10:58

Receiving an unexpected email—*"Hey, we saw you hit an error yesterday, we fixed it, and here's $10"*—turns a quiet frustration into trust (`00:10:58`):

> “It's a self-perpetuating cycle where then people who get that know that you care, and they're going to send more feedback in the future.”
> — 00:10:58

**Key points**

- Collapse support, triage, and engineering into one agent loop triggered by user reports (`00:10:58`).
- Use agents to mine production logs for every silent user who hit the same obscure failure (`00:10:58`).
- Proactive apologies and credits turn bug fixes into a compounding user-feedback flywheel (`00:10:58`).

<div class="reading"><b>From the notes:</b> “The feedback mechanism is pretty amazing.” (<code>2026-11-12T1652</code>). <b>The reading:</b> This exemplifies the conference’s “Close the loop” theme outside pure CI: production telemetry feeds directly back into fixes and customer care without human queue lag.</div>

**Visual:** diagram “The 5-step closed bug loop: User report → Agent fix & deploy → Log sweep finds 17 silent affected users → Proactive $10 credit & apology email → Higher trust & richer future reports”

## Once the agent uses the tools, 96% of SaaS disappears

As the team connected their agent to production systems via plugins and MCP servers, human tool usage vanished (`00:13:16`). People stay inside agent threads while the agent operates twelve internal connectors spanning CRM, Bug reports, Amp admin, Hiring, Gmail & Calendar, Slack, Grafana, Buildkite, App Store & Play, GitHub & Linear, QR Offer cards, and even CustomInk team merch (`00:13:16`):

> “The more that we start using these tools, where just the agent is using it directly, we don't even need the software product on the other end, and it's. A very small number of products that we think actually have sticking power for us.”
> — 00:13:16

Instead of buying bloated enterprise seats and begging a vendor PM for Q4 roadmap slots, a tiny team builds "softer-than-software" mini apps tailored to their exact workflow (`00:13:16`)—such as a custom CRM covering the 2% of Salesforce they actually use plus 2% deep internal integration (`00:13:16`):

> “Actually, would you code the two percent subset of Salesforce features? And then another two percent that integrate with the rest of your stack in the most perfect way because the agent is so good at that.”
> — 00:13:16

**Key points**

- When agents drive APIs and MCP servers directly inside threads, human employees rarely open the underlying SaaS dashboards (`00:13:16`).
- Building the exact 4% of a CRM or admin tool you need beats waiting on external vendor roadmaps (`00:13:16`).
- Twelve custom agent connectors—from Grafana and Buildkite to Offer cards and CustomInk—run the whole company (`00:13:16`).

<div class="reading"><b>From the notes:</b> “Once it's plugged into the tools, we don't need to use the tools.” (<code>2026-11-12T1654</code>) and “They use CustomInk for team merch; we should look into that.” (<code>2026-11-12T1656</code>). <b>The reading:</b> The same pattern surfaced at Cognition and Workday—the agent thread or action bar absorbs the interface, turning SaaS into headless storage or disposable custom mini-apps.</div>

**Visual:** photo `photos/PXL_20261113_005524636.MP.jpg` (his slide *"Custom tools our agent can use: Plugins and MCP servers, hooked up to every thread"* showing all 12 tool tiles including CRM, Bug reports, Grafana, Buildkite, Offer cards, and CustomInk)

## Get out of the cage: what breaks for traditional SaaS and stalled engineers

If companies stop buying 10-year SaaS licenses with $100K sales commissions, traditional enterprise software economics cracks (`00:14:45`). For Slack, the divide between legacy organizations and small, high-ownership teams is already irreversible (`00:14:45`):

> “Once you have seen how the new kind of companies that are two orders of magnitude smaller. Where everyone can do everything, where everyone has skin in the game, then you know you don't want anything else.”
> — 00:14:45

His closing challenge targets engineers sitting in company Slack gossip channels complaining that leadership will not adopt AI (`00:17:57`). Staying comfortable inside a slow organization while agents reshape software hurts your own craft (`00:17:57`):

> “Let agents really shape how you work, and get to a company that's willing to be shaped by the agents.”
> — 00:17:57

**Key points**

- Custom agent-built software undermines long-term, commission-heavy SaaS seat expansion (`00:14:45`).
- Teams two orders of magnitude smaller with full-stack ownership outperform rigid departmental hierarchies (`00:14:45`).
- Engineers stuck in internal gossip channels should push their org to adapt—or leave for one willing to be shaped by agents (`00:17:57`).

<div class="reading"><b>From the notes:</b> Synthesis across <code>2026-11-12T1640</code>–<code>1657</code>. <b>The reading:</b> For Will and TheFocus.AI clients, the practical takeaway is a diagnostic: ask which meetings, tickets, and SaaS dashboards only exist because human teams are not yet organized around shared agent loops.</div>

**Visual:** photo `photos/PXL_20261113_004415509.jpg` (his opening slide *"Agents Change Everything"* pairing the waveform visual, early agent thread, and the Jan 2025 → Today 21 co-founders timeline)
