# Backlog

## Ideas

- [ ] Execute TheFocus.AI 6-part research & newsletter series (`After the Diff`), starting with the shadow-mode LLM judge + locked oracle spike (`editorial/newsletter-series.md`, hooks in `editorial/hooks/2026-11-12-research-themes-hooks.md`)
- [ ] Run harness-subtraction benchmark (strip 80% scaffolding down to CLI + programmatic tools + dry-run checks, Issue 3 in `editorial/newsletter-series.md`) and DuckDB semantic `WHERE` + Grounded Decision prototype (Issue 4 in `editorial/newsletter-series.md`)
- [ ] Rebuild Mixedbread: our own search-over-your-data layer, indexed ahead of agent queries (from Aamir Shakir's talk; ties to the lakehouse service idea) — notes/inbox/2026-11-11T1225-rebuild-mixedbread.md
- [ ] Build out a map of how tools fit with decisions: tools, decision models, checks and humans, and where each belongs (from Diogo Almeida's Jev talk) — notes/inbox/2026-11-11T1417-2-map-tools-and-decisions.md
- [ ] Write about how to use decision models overall (System One models: DeepMind's decision model, Cloudflare's clef/clairic, Jev at Glean and Workday) — notes/inbox/2026-11-11T1122-write-about-decision-models.md
- [ ] Service idea: brownfield agent factories, bringing agents into a client's existing codebase with tooling for each mode of work (from Justin McCarthy's "Brownfield Factories") — notes/inbox/2026-11-12T1524-something-we-could-work-on-and-sell.md
- [ ] Start working on the demand factory: a factory for finding what customers actually need, the counterpart to a software factory (from Justin McCarthy's "Brownfield Factories") — notes/inbox/2026-11-12T1535-start-working-on-the-demand-factory.md

## Review later

- [ ] Look into how Mixedbread handles ACLs and access control when ingesting (permissions from source systems through to search results) — notes/inbox/2026-11-11T1234-acl-access-control-for-ingesting.md
- [ ] Follow up on Mixedbread: search over your own data, indexed ahead of MCP search (Aamir Shakir's "How to build agents over your own data") — notes/inbox/2026-11-11T1222-follow-up-on-mixedbread.md
- [ ] Shape a service for The Focus to sell: extract from a client's remote systems, build their data stack or lakehouse as the system of record, then build the code (agents, artifacts) on top (from George Fraser's talk) — notes/inbox/2026-11-10T1428-service-idea-extract-lakehouse-build-on-top.md (corrects notes/inbox/2026-11-10T1427-system-of-record-for-the-focus.md)
- [ ] Follow up on which tools to keep in the harness, and which the model now does itself (from today's tools talk; ties to Philipp Schmid's "I deleted 90% of my harness") — notes/inbox/2026-11-12T1221-follow-up-which-harness-tools-to-keep.md
- [ ] Follow up on giving the agent a database to store things (from Lance Martin's "Exploring Claude's frontier", which gives agents git and a SQL database as primitives) — notes/inbox/2026-11-12T1239-follow-up-agent-database-to-store-stuff.md
- [ ] Follow up on building agent memory from session transcripts (from Lance Martin's "Exploring Claude's frontier"; ties to Diogo Almeida and Ramp's Inspect) — notes/inbox/2026-11-12T1249-follow-up-memory-from-transcripts.md
- [ ] Try Parallel (Parallel Web Systems) for research: its search and Decisions APIs, possibly for talk dossiers (from Devin Gupta's "The first Grounded Decision Model") — notes/inbox/2026-11-12T1441-follow-up-parallel-for-research.md
- [ ] Try agent swarms ourselves: a lead agent plus helpers on a shared store (git and a SQL database), after Lance Martin's thousand-agent run — notes/inbox/2026-11-12T1500-try-agent-swarms.md
- [ ] Look into Mobbin for UI research (a library of real app screens and flows) — notes/inbox/2026-11-12T1507-look-into-mobbin-for-ui-research.md
- [ ] Research how to get Sentry into our projects: monitoring for apps and agent runs, and its Seer agent (from Arsalan Bashir's "Let the Agent Cook") — notes/inbox/2026-11-12T1508-research-adding-sentry.md
- [ ] Look into CustomInk for team merch (mentioned in Quinn Slack's "A Company Built Around the Agent") — notes/inbox/2026-11-12T1656-look-into-customink-team-merch.md
- [ ] Build a taxonomy of development interaction modes (comments-then-tab, chat, loop, continuous, background, promise-keeping, …) — notes/inbox/2026-11-12T1737-taxonomy-of-interaction-modes.md
- [ ] Follow up on the ArtCraft talk: Brandon Thomas, "Let's Open Source the World" (1378217), open-source software recreated in Rust by agentic factories — notes/inbox/2026-11-12T1740-follow-up-artcraft-talk.md
- [ ] Follow up on the Pi talk: Armin Ronacher, "The Software Atelier" (1373472), craft better software, not just more — notes/inbox/2026-11-12T1740-follow-up-pi-talk.md

## Digest later

- [ ] Read "The tyranny of the KV cache" (mentioned around 14:23, likely Diogo Almeida's Jev talk) — notes/inbox/2026-11-11T1423-read-tyranny-of-the-kv-cache.md
- [ ] Listen to Mihail Eric's recent Latent Space podcast episode (Monaco, vertical AI) — notes/inbox/2026-11-10T1555-2-latent-space-podcast-episode.md
- [ ] Research fast token inference: how much faster agents could run (from Natalie Serrino's "What Will You Build When AI Is 10x Faster?") — notes/inbox/2026-11-11T0916-research-fast-token-inference.md
- [ ] Check out the statechart skill (from Lauren Tan's "All Code Is Slop (Except Mine)") — notes/inbox/2026-11-11T1014-check-out-statechart-skill.md
- [ ] Deep dive: how Cloudflare really works with agents (Durable Objects, Workers AI, the Agents SDK), from Michelle Chen's "cloudflare is a neolab" — notes/inbox/2026-11-11T0949-cloudflare-and-agents-deep-dive.md
- [ ] Learn what dbt actually is and where it fits in a data stack; it has come up in several talks — notes/inbox/2026-11-12T1222-follow-up-what-is-dbt.md
- [ ] Read the papers Diffusion has published (Justin McCarthy's company, "Brownfield Factories") — notes/inbox/2026-11-12T1538-look-up-diffusion-papers.md
- [ ] Read up on SlopCodeBench (coding agents degrading over long iterative tasks) and Dex Horthy's runs of it (from "12-Factor-Factories") — notes/inbox/2026-11-12T1705-look-up-slop-bench.md
- [ ] Revisit old HCI research, as input to the interaction-modes taxonomy (from Thariq Shihipar's "The Sweet Side of the Bitter Lesson") — notes/inbox/2026-11-12T1738-revisit-old-hci-research.md
