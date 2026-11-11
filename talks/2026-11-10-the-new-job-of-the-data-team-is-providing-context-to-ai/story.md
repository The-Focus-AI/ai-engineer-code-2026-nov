---
title: "The warehouse is the context: why agents should read your data stack, not your apps"
speakers: "George Fraser (Fivetran)"
duration: "27:57"
source: transcript.md
video: null
themes: [context-for-ai, connecting-is-not-answering]
reader: "Will and his clients: where an AI agent should get its facts about a business, and what that means for a data stack worth building"
built_from_notes:
  - notes/inbox/2026-11-10T1420-down-with-dashboards-up-with-artifacts.md
  - notes/inbox/2026-11-10T1423-data-agents-on-the-bi-data-stack.md
  - notes/inbox/2026-11-10T1424-agents-to-warehouse-or-lakehouse.md
  - notes/inbox/2026-11-10T1426-mcp-connection-is-an-antipattern-cant-join.md
  - notes/inbox/2026-11-10T1427-system-of-record-for-the-focus.md
  - notes/inbox/2026-11-10T1428-service-idea-extract-lakehouse-build-on-top.md
  - notes/inbox/2026-11-10T1431-agents-schema-as-a-good-map.md
  - notes/inbox/2026-11-10T1433-major-databases-have-vector-indexes.md
  - notes/inbox/2026-11-10T1435-how-well-do-text-columns-work.md
key_points:
  - "AI is a new consumer of the data stack companies already built for BI (00:03:18, 00:05:23)"
  - "Don't wire agents to every system through MCP: messy data, poor query languages, no joins across sources (00:07:04)"
  - "Give the agent a map of the database, kept in the database itself: an AGENTS schema (00:11:18, 00:15:24)"
kind: talk-story
status: draft
---

# The warehouse is the context

George Fraser runs Fivetran, which moves and models data for thousands of
companies (00:00:00). His talk makes one practical claim: when an AI agent
needs facts about your business, the best place for it to get them is the data
warehouse you already built for business intelligence, not the apps where the
data was born. That makes context the data team's new job (00:01:22).

*Framing note: "From the notes" boxes are the reading taken in the room,
including an idea for The Focus. Everything else is his talk, cited to the
transcript. The transcript is a Qwen machine transcription and garbles some
names; quotes keep its wording.*

## A new consumer of the data stack

Agents are already good at the simple work data teams used to do: writing
queries, making charts, much of the dashboard work (00:01:22). What they need is
correct, data-grounded answers, for people and for autonomous agents alike. His
example is a head of sales who asks an assistant in Slack for the best ideas to
improve pipeline conversion: open-ended, and he says that's a good pattern to
encourage (00:02:56).

In the last six months a pattern has emerged at tech-forward companies (00:03:18).
Ramp built an interactive data analyst on its modeled data. Stripe built a
knowledge agent (heard as "Kai") on its data platform. OpenAI and Anthropic both
built in-house data agents on their data platforms and have written about it.
What they share: each points its AI at the same stack that has served people for
years.

> “They are using as a source of truth for AI agents for questions about data.”
> — 00:03:18

The shape is simple: business systems flow into a warehouse or lakehouse, and
that warehouse feeds two consumers instead of one, BI and AI agents (00:05:23).
It works because agents behave so much like people: the same work that makes data
usable for an analyst (pulling every system into one database, joining across
them, modeling it to fit the business) makes it usable for an agent.

> “Modeling is fundamentally an exercise of simplification.”
> — 00:05:23

<div class="reading"><b>From the notes:</b> “down with dashboards and up with
artifacts”, and the same AI connected to the warehouse or lakehouse that serves
BI. The dashboard stops being the product; the agent answering from the modeled
data is.</div>

**Visual:** photo `photos/PXL_20261110_222347495.jpg` (slide: "AI is a new consumer of the data stack")

## Why not just connect it to everything

The obvious move is to give the assistant MCP connections to every system of
record. None of the companies he named do that, and he says it doesn't work
(00:07:04). Ask a human analyst to answer a business question by logging into
each system and clicking around: they could do it, but slowly and with many
mistakes.

> “It would take them like a year, and they would make a lot of mistakes.”
> — 00:07:04

An agent going through MCP tools hits the same problems. The source data is
messy (every company has a messy Salesforce), while the warehouse copy has been
cleaned and organized by the business's rules. Each system's query language is
poor: Salesforce's own SQL dialect, Jira's query language, or for Slack only the
search box. And the decisive one:

> “And you can't even do joins across sources, right?”
> — 00:07:04

MCP itself isn't the villain. It is still the right tool for taking actions and
for fetching a single record that just changed (00:07:04), and at Fivetran every
client (a Slack bot, Claude, an autonomous support agent) reaches the warehouse
through an MCP server (00:09:47). The problem is what the tools point at: gather
context from the modeled warehouse, act through the apps.

<div class="reading"><b>From the notes:</b> the MCP-to-every-app pattern is an
anti-pattern “mainly because you can't join across sources”.</div>

**Visual:** diagram “an agent with MCP links to five apps, no joins, versus an agent reading one warehouse that joins them” (illustrative)

## A map, kept in the database

Connecting an agent to a database and saying “go look around” gives poor answers,
better than six months ago but still poor (00:11:18). It needs a map. Vendors
sell context catalogs for this; his point is that you don't need one, because a
database can describe itself.

> “Metadata is a kind of data.”
> — 00:11:18

His proposal, framed as a standard like AGENTS.md but for databases: a schema
called `agents` with a table called `root`, one column of markdown blocks
describing the rest of the tables (00:11:18). What sits under `root` depends on
the company; at Fivetran it is drawn from their Looker metadata. In the demo it is
three tables: what the tables are, what the columns mean, and how to join them
(00:15:24). The agent's system prompt only says to read `agents.root` first, so
when the data changes, the agent's map changes with it (00:15:24).

Why it fits: agents and databases cover each other's weaknesses. Agents interpret
open-ended questions and explain answers but forget everything, like the man in
Memento writing himself notes; databases remember and calculate but can't
interpret (00:11:18).

> “They have exactly the mirror image of each other's strengths and weaknesses.”
> — 00:11:18

<div class="reading"><b>From the notes:</b> “the agents schema thing as a good
map”.</div>

**Visual:** photo `photos/PXL_20261110_223052728.MP.jpg` (slide: the AGENTS schema, root → dbt_tables → dbt_columns, dbt_joins)

## Everything in one place

The new domain is unstructured data. Agents read so fast they can go through a
thousand customer-call transcripts (00:06:38), so text belongs in the stack too.
You don't need a separate vector database: the major data platforms now have
built-in vector indexes, and text goes in ordinary text columns (00:14:29,
00:15:24). Keeping both kinds of data in one database lets a single query mix them.

> “And it's really convenient to have everything in one place.”
> — 00:14:29

His demo uses Formula 1 (00:15:24): structured race data from a public API, and
the rules, glossary and post-race press-conference transcripts from the F1 site.
Connectors written with the Fivetran connector SDK (he suggests letting an AI
write them with its SDK skill) land everything in BigQuery; dbt models normalize
it and build the embeddings and vector index; a Gemini agent answers questions,
checked by a small set of multiple-choice evals in CI. A typical agent query is
hybrid: a vector search for what people said about tire problems in 2025,
combined with a structured filter on post-race transcripts. He built it in about
five hours (00:15:24). Asked who the most improved driver is, the agent reads
`agents.root`, probes the data, then writes a long multi-join query, much as a
human analyst would (00:22:31).

<div class="reading"><b>From the notes:</b> every major database now has vector
indexes, and an open question: how well do text columns really work at scale?</div>

**Visual:** diagram “one query: vector search on transcripts AND structured filter on races” (illustrative)

## The data team owns the context

His close: this simple pattern gets better as models get smarter, because it puts
the model in charge instead of boxing it in with an over-engineered context system
(00:26:44). The work belongs to the data team, whose skills in delivering
analytics are the ones that deliver context. Use standard components, avoid
anyone's walled garden, and keep definitions in code so agents can write code too
(00:26:44).

> “The data team should own your context.”
> — 00:26:44

<div class="reading"><b>From the notes:</b> a service The Focus could sell.
Extract from a client's remote systems, build their data stack or lakehouse as the
system of record, then build the code (agents, artifacts) on top. This talk is the
case for doing it in that order.</div>

**Visual:** quote “The data team should own your context.”
