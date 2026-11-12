---
title: "Search ahead of the agent: one index instead of one connector per tool"
speakers: "Aamir Shakir (Mixedbread)"
duration: "15:46"
source: transcript.md
video: null
themes: [context-for-ai, connecting-is-not-answering]
reader: "Will and his clients: why agents over company data should search one prepared index, not every source live, and what it takes to build that index"
built_from_notes:
  - notes/inbox/2026-11-11T1221-index-data-ahead-of-mcp-search.md
  - notes/inbox/2026-11-11T1221-2-more-sources-more-noise.md
  - notes/inbox/2026-11-11T1222-follow-up-on-mixedbread.md
  - notes/inbox/2026-11-11T1225-rebuild-mixedbread.md
  - notes/inbox/2026-11-11T1226-which-embedding-models.md
  - notes/inbox/2026-11-11T1234-acl-access-control-for-ingesting.md
key_points:
  - "One MCP server per source makes the agent guess, inherit each vendor's search, and hit rate limits; index the data ahead of time instead (00:02:08, 00:04:07, 00:06:22)"
  - "More sources means more noise: the bottleneck is context, not intelligence (00:03:12, 00:05:00)"
  - "The index carries the access rules: ACLs ride along as metadata and the agent searches as a named user (00:06:22, 00:17:41)"
kind: talk-story
status: draft
---

# Search ahead of the agent

Aamir Shakir runs Mixedbread, which started as a research lab building
open-source embedding models and now sells search over company data. His
argument: for agents working on a company's data, the hard part isn't the
model, it's getting the right data in front of it. Searching every source live,
one tool at a time, gets worse with every source you add. Index it all ahead of
time into one search layer and let the agent search that.

*Framing note: the transcript is a Qwen machine transcription. It garbles the
company name (“Big Spread”, “mixbreed”), inserts “Splunk” from its prompt in
several places, and garbles most dollar figures; those figures are left out.
Quotes keep its wording. “From the notes” and “The reading” boxes are
interpretation, not his words.*

## One connector per tool

His scenario is an on-call engineer at 3 a.m. asking why checkout failed on
Tuesday (00:01:49). The usual way to build that agent today is one MCP server or
CLI per tool, GitHub, Linear, Datadog, Notion, Slack, handed straight to the
agent (00:02:08).

> “And then your agent has the task to guess, basically, what might be the right tool containing this information.”
> — 00:02:08

And every tool brings its own search, built by someone else, returning data in
whatever format they chose. Each call costs money, adds latency, and hits that
service's rate limits; these tools were built for people, not for agents
(00:03:12).

> “We always say you are only as good as your data, but in this case, you're only as good as your weakest connector.”
> — 00:04:07

If the one document that matters is in the source whose connector is weakest, the
agent never sees it.

<div class="reading"><b>From the notes:</b> “get the data into a place where it
can search ahead of the mcp search function”. That's his fix in one line: don't
let the agent search the sources; search a copy you prepared. It's George Fraser's
point from yesterday
(<a href="../../2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/experience/page.html">the warehouse is the context</a>),
applied to search.</div>

**Visual:** photo `photos/PXL_20261111_201809500.jpg` (his slide: “Today: one MCP server per tool”, with a search call per tool and a 429 rate-limit error)

## More sources, more noise

The problem compounds (00:05:00). Real companies don't have five clean SaaS
tools; they have legacy Postgres databases, mainframes, data everywhere. His
arithmetic: a hundred sources, ten documents pulled from each, five hundred tokens
a document, is half a million tokens for one question, and then the agent has to
rank documents from different systems against each other.

> “The answers will get just worse, and so the main bottleneck really becomes context here.”
> — 00:05:00

He'd said it a minute earlier in plainer words:

> “Like getting the right data and access to data is actually the bottleneck, and not intelligence.”
> — 00:03:12

<div class="reading"><b>From the notes:</b> “more sources, more noise”. The
counterintuitive part: adding a source can make the agent worse, because it adds
more to sift than it adds signal.</div>

**Visual:** photo `photos/PXL_20261111_202017480.jpg` (his slide: “You're only as good as your weakest connector. Most MCP servers were built to read data. Search is an afterthought.”)

## One search layer

Mixedbread's answer is connectors that copy everything into one index ahead of
time (00:06:22): PDFs, slides, charts and diagrams, in any language, parsed so the
model can use them, aware of recency, kept in sync, and carrying each document's
access rules. The agent gets one search instead of a tool per source.

He frames it as infrastructure (00:08:13): the agent sees everything and
contextualizes, then goes deeper into a particular source when a result points
there.

> “Your big fishnet, which we pull it out and then you can sort out what's relevant.”
> — 00:08:13

Because it's one index, the agent can also follow connections across sources,
with a graph tool over the whole index (00:11:24).

**Visual:** photo `photos/PXL_20261111_202234302.jpg` (his slide: “One search layer for company knowledge”: Slack, Gmail, Google Drive, GitHub, Linear and Notion into Mixedbread, parsed, indexed and kept in sync, one search across all of it, out to your agents)

## Their own embedding models

The search quality comes from models they train themselves (00:00:09).

> “And we build open source embedding models, and we're one of the best ones.”
> — 00:00:09

His claim is that retrieval had its own scaling moment (00:09:56). For decades
retrieval quality barely moved, which is why agents still lean on grep and BM25.
Mixedbread's result is that retrieval models follow scaling laws too:

> “meaning the more data and compute you throw at the model, the better it's getting.”
> — 00:09:56

Their newest model improved ten points on the metric he showed over their previous
one.

<div class="reading"><b>From the notes:</b> “what are the embedding models that
they are using”. Their own. The talk doesn't name the current one; the
<a href="../links.md">links page</a> has Mixedbread's post on Wholembed v3, and
their OCR post (“The Hidden Ceiling”) on why parsing quality caps retrieval.</div>

**Visual:** diagram “retrieval quality flat for decades, then a step up with scaling” (illustrative)

## Access control rides along

Indexing everything into one place raises the obvious question, asked from the
floor after the talk (00:17:41): who gets to see what? When a connector pulls from
a source such as Google Drive, it pulls the access list too.

> “And Mixedbread has this concept of metadata.”
> — 00:17:41

The access rules are stored as metadata on each document. An agent searching on a
person's behalf has to identify them:

> “they need to authorize say I'm user X.”
> — 00:17:41

and results are filtered to what that user may see. In the talk itself he puts the
ACLs in the connector's job description from the start (00:06:22), alongside
compliance.

<div class="reading"><b>From the notes:</b> “look into how they do the acl and
the other access control for ingesting”. The answer has two parts: carry the
source's permissions in as metadata at ingestion, and make every search name the
user it's for. The recording's answer is brief and partly garbled, so the
mechanics (how often permissions resync, what happens when access is revoked) are
still worth the follow-up.</div>

**Visual:** diagram “source document + its ACL → index with ACL metadata → search as user X → only what X may see” (illustrative)

## Should we rebuild it?

His build-or-buy pitch (00:07:12, 00:08:59): building this yourself means
ingestion pipelines, OCR and parsing, the access-control plumbing, and handling
every data type, before you get to the agent.

> “Without having to deal with all this overhead of building ingestion pipelines”
> — 00:07:12

He claims it's much cheaper than building it, because they train their own
models and tuned their infrastructure. The transcript garbles his figures; his
slide is clearer, though the photo is blurry. As far as it shows, building it
yourself means connectors for every source, permission and sync jobs, parsing
and OCR, embeddings with a vector database and reranker, and an engineer to own
it: tens of thousands of dollars a month (the figure reads as about $24K or $34K)
and two to three months to production. Mixedbread's column: about $2K a month,
and days. Customers, he says, arrive on Monday, see results on Wednesday and go
to production on Friday.

<div class="reading"><b>From the notes:</b> “i think we should rebuild
mixedbread”. The talk is a parts list for doing that: connectors per source,
parsing and OCR for every format, embedding models, ACL metadata, a sync loop to
keep it current, and one search API with a graph over it. It's the search half of
your service idea from Fraser's talk yesterday
(<code>notes/inbox/2026-11-10T1428-service-idea-extract-lakehouse-build-on-top.md</code>):
extract into a lakehouse, build on top.</div>

**Visual:** photo `photos/PXL_20261111_202529574.jpg` (his slide: “Build it yourself or use Mixedbread”)

## What it buys

Two results (00:12:15, 00:14:19). Answers trace back to their source, which
matters when the answer feeds a financial or legal decision:

> “You can always type back exactly to the source”
> — 00:12:15

And in a bank case study he says publishes in two days, answer accuracy rose from
about 40 percent to 97 percent; staff stopped triple-checking answers, and API
errors halved.

> “The answer accuracy jumped from very forty percent to ninety-seven percent”
> — 00:14:19

<div class="reading"><b>The reading:</b> this is the data layer of
<a href="../../../atlases/own-the-stack/page.html">own the stack</a>. Fraser says
own the warehouse; Shakir says own the search index over it, with the permissions
inside. Both say the same thing about agents: don't make them query the world
live, one connector at a time. For a client, the question is which of their
agents are still guessing which tool to call. <b>From the notes:</b> “follow up on
mixedbread” — the case study and the posts are on the
<a href="../links.md">links page</a>.</div>

**Visual:** photo `photos/PXL_20261111_203144669.MP.jpg` (his closing slide: “Your agent is only as good as what it can find.”)
