---
captured_at: 2026-11-12T15:38:00-08:00
kind: todo
session_id: "1373480"
talk: talks/2026-11-12-brownfield-factories/
tags: [diffusion, papers, follow-up]
bucket: digest
---

Look up the papers they've published.

During Justin McCarthy's "Brownfield Factories" (1373480, Mainstage): "they" read as Diffusion, his company. The talk-links dossier for this talk, once it's recorded and filed, should collect them.

Looked up 2026-11-12 ~15:52 (web search; not yet verified by the talk-links node):
- "Demand Factories" is McCarthy's own term: his roster bio says he is "defining the frontier of agentic AI through the construction of Software and Demand Factories built for high-consequence settings". Before Diffusion he co-founded StrongDM and was its CTO, where he built its Software Factory.
- No published papers from Diffusion itself turned up. What is published is the StrongDM AI work (founded July 14, 2025, by McCarthy, Jay Taylor and Navan Chauhan): https://factory.strongdm.ai/ (the "Software Factories And The Agentic Moment" write-up, Feb 6, 2026); the Digital Twin Universe technique https://factory.strongdm.ai/techniques/dtu (behavioral clones of Okta, Jira, Slack and Google apps for testing); and Attractor, an open-source coding agent published as a natural-language spec https://factory.strongdm.ai/products/attractor.
- Commentary: Simon Willison's write-up https://simonwillison.net/2026/Feb/7/software-factory/ (also names techniques "gene transfusion", "semports" and "pyramid summaries"); StrongDM's blog post https://www.strongdm.com/blog/the-strongdm-software-factory-building-software-with-ai.

Found 2026-11-12 (the operator supplied the URL): https://diffusion.io/brownfield, "Brownfield rewrite resources", Diffusion's companion page to this talk ("Companion to Brownfield Factories, AIE Code Summit, November 12, 2026"; source links last checked November 9, 2026). It is the papers list, grouped by technique for testing and verifying software rewrites:
- Comparison and replay: characterization tests (Feathers; Meta TestGen-LLM), differential random testing (Csmith, PLDI 2011), shadow execution and replay (GitHub Scientist, Istio traffic mirroring), data reconciliation (AWS DMS), consumer-driven contracts (Pact).
- Generated inputs: coverage-guided fuzzing (OSS-Fuzz), property-based and metamorphic testing (Anthropic's agentic property-based testing, QuickCheck), model-based stateful testing (Hypothesis), deterministic simulation (FoundationDB, Jepsen), digital twins.
- Testing the tests: mutation testing (PIT, Google, Meta ACH), adversarial differential testing (SWE Refactor Bench), test integrity (MigrationBench), held-out checks (Microsoft, language modernization to Rust, October 2026).
- Specification and proof: specification recovery, proof construction (VeruSAGE, VeriStruct), design-level model checking (AWS formal methods).
- Simulated users: persona modeling (τ²-bench, Google ConvApparel), persistent agent users (Generative Agents).
- Migration and cutover: completeness audits, playbooks from migration artifacts (AWS), model-assisted migrations (Google), canary cutover (Google SRE Workbook).
- A Cedar case study: AWS's authorization language, built with a formal model, proofs, and differential testing against the Rust engine (FSE 2024).
The site's top links name his offers: "Reboot your Product Management", "Build your Demand Factory", "Wake Up your Executive Team". The talk-links node should pick this page up when the talk is filed.
