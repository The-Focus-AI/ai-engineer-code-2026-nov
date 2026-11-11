# Deploying AI in the enterprise: frontier-lab plans vs open-weight models with enterprise support

Research note, 2026-11-11, prompted by Utkarsh Shrivastava's Netflix talk
(talks/2026-11-10-building-a-shared-ai-assistant-the-platform-challenges-beyond-mcp/)
and the note notes/inbox/2026-11-10T1459-netflix-xai-frontier-open-weight-enterprise-support.md.
Web sources are mostly analyst notes and vendor blogs: treat figures as directional, and
check vendor terms directly before relying on them.

## What he said (transcript 00:00:43, 00:02:11)

- Two paths appeared during the year: the frontier labs' enterprise offerings (he names
  Anthropic, OpenAI, Google's Gemini enterprise offering, and xAI), and open-weight models
  that "started adding enterprise support". Domain teams had also built their own small agents.
- New options kept arriving while they evaluated, so he stopped treating the model as the
  decision: the agent harness is swappable between open-source and frontier options, and
  the lasting investment is company context (skills, connectors).

## The two deployment models

**Frontier-lab enterprise plans.** The best models, consumed as a service. You get the
vendor's guardrails, admin, and data-handling terms; the model itself doesn't leave their
infrastructure (or a cloud partner's). The labs are narrowing the control gap: OpenAI has
been reported to partner with Dell to bring its Codex agent into hybrid and on-premises
setups ([WebProNews](https://www.webpronews.com/openai-prepares-on-premises-push-as-enterprises-demand-data-control/)).

**Open-weight models with enterprise support.** You run the weights yourself (on-prem,
private cloud, edge) and buy support, packaging and security from a vendor, so it isn't a
science project. What that looks like in practice:

- **Packaged inference + support subscriptions.** NVIDIA's NIM microservices ship models as
  ready-to-run containers under an NVIDIA AI Enterprise subscription; the catalog includes
  Mistral models, and Mistral Medium 3 is positioned for enterprise and on-prem deployment
  ([NVIDIA blog](https://developer.nvidia.com/blog/build-agents-and-understand-long-docs-with-mistral-medium-3-and-nvidia-nim/),
  [NGC catalog](https://catalog.ngc.nvidia.com/orgs/nim/mistralai/containers/mistral-small-24b-instruct-2501/-)).
- **Platform bundles.** Red Hat and NVIDIA sell a combined "AI Factory" stack (Red Hat AI
  Enterprise plus NVIDIA AI Enterprise) for inference, tuning and agents across on-prem,
  cloud and edge, with node-based pricing
  ([Carahsoft brief](https://static.carahsoft.com/concrete/files/6517/7800/2926/Red_Hat_AI_Factory__plus__NVIDIA_Solution_Brief.pdf),
  [NVIDIA docs](https://docs.nvidia.com/ai-enterprise/deployment/red-hat-ai-factory/latest/overview.html)).
- **Model vendors with managed and self-hosted options**, e.g. Mistral; licenses differ even
  among models called "open", and an open license is not a support contract
  ([DataNorth guide](https://datanorth.ai/blog/self-hosted-llms-in-2026-a-complete-guide-to-running-models-on-your-infrastructure)).
- **Serving and gateway layers** (vLLM, SGLang, TRT-LLM, KServe, Triton behind an
  OpenAI-compatible API) so apps don't care which model answers
  ([TrueFoundry](https://www.truefoundry.com/de/blog/self-hosted-open-weight-models-gateway)).

## Why enterprises choose it, and the catches

- **Adoption is mainstream.** One 2026 survey puts open-weight models at about a third of
  enterprise AI token usage, up from under a quarter a year earlier; Futurum reports 42% of
  200 enterprises running them in production, and notes infrastructure sellers capture most
  of the value ([Constellation](https://www.constellationr.com/research/blog/evidence-shows-enterprises-use-open-weight-models-mainstream),
  [Futurum PDF](https://futurumgroup.com/wp-content/uploads/2026/10/Enterprises-Embrace-Open-Weights-but-Infrastructure-Sellers-Profit-Most_AIONP202610.pdf)).
- **Drivers:** data sovereignty, predictable cost, and customization (fine-tuning on
  company data) ([CIO](https://www.cio.com/article/4203027/with-ai-control-matters-more-than-capability.html),
  [Forte](https://www.fortegrp.com/insights/owning-the-stack-what-open-weight-models-change-for-enterprise)).
- **Catches:** open weights don't fix data residency by themselves (hosting with a US
  provider has that provider's posture); self-hosting needs real infrastructure and ML
  skills; and open models ship without the guardrails hosted APIs bundle, so you add your
  own filtering ([RaftLabs](https://www.raftlabs.com/blog/best-llm-for-enterprise)).
- **The consensus is a mix:** frontier models where the capability justifies the cost and
  data exposure, open-weight models on your own infrastructure for the rest.

## What it means

- It is the infrastructure version of Netflix's point: if the model is swappable, the
  durable asset is the company context and the harness, and the deployment choice becomes
  a per-workload decision (sensitivity, cost, capability), not a single vendor bet.
- It fits the day's decision-model thread: small, bounded "System One" models are exactly
  the workloads that suit open-weight, self-hosted deployment, with frontier models kept for
  the open-ended work.
- For The Focus: a service line. Help a client split workloads between frontier and
  open-weight, stand up the supported open-weight stack where data can't leave, and keep the
  harness and context portable across both. It pairs with the lakehouse service idea
  (notes/inbox/2026-11-10T1428-service-idea-extract-lakehouse-build-on-top.md).

## Open questions

- Concrete support terms (SLAs, tiers, pricing) from NVIDIA, Red Hat, Mistral, and the
  cloud providers were not found; check vendor pages.
- Which open-weight models and support vendor Netflix itself evaluated: not said in the talk.
