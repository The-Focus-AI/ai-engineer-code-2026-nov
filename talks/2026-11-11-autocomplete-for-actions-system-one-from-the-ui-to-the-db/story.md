---
title: "A judgment in a SQL query: Workday puts a decision model inside the database and the search box"
speakers: "Scott Roberts (Workday)"
duration: "11:52"
source: transcript.md
video: null
themes: [decision-load, context-for-ai]
reader: "Will and his clients: what changes when a model judgment is just a SQL function, and the same decision model running at typing speed in the UI"
built_from_notes:
  - notes/inbox/2026-11-11T1530-predict-say-vs-do.md
  - notes/inbox/2026-11-11T1531-jev-selects-cards-with-data.md
  - notes/inbox/2026-11-11T1534-jev-inside-sql-in-duckdb.md
built_from_photos: 4
notes_frame:
  spine: "Jev inside a SQL query (1 note, 3 photos: Retrieval three ways, Natural language inside the query, the live DuckDB demo); the user said on 2026-11-12 to lead with it"
  then: "predicting what you want to do and picking the card (2 notes), decision primitives (1 photo)"
key_points:
  - "Jev as a function inside a DuckDB SQL query: a question in plain English, scored on every row, 117 resumes in 2.3 seconds (00:09:24)"
  - "That replaces the retrieval stack: no embeddings, no vector database, no reranker, no training (00:08:03)"
  - "The same decision model runs at typing speed in the UI: predict what you want to do, pick the card, let the domain team fill it in (00:04:00, 00:06:42)"
kind: talk-story
status: draft
---

# A judgment in a SQL query

Scott Roberts' best demo is a SQL query. Inside it, a function asks a decision model,
TypeSafe's Jev, a question in plain English about every row, and the query sorts by
the answer. No embeddings, no vector database, no classifier to train. The same
model, fast and cheap enough to call on every row, also runs on every keystroke in
Workday's search box, guessing what you're trying to do and showing the card that
does it. Both replace something heavier: a retrieval stack in one case, an LLM agent
loop in the other.

*Framing note: this story is framed by the notes and photos taken in the room: three
notes and four photos, most of the photos on Jev inside a SQL query, which leads the
story at the operator's request. The recording opens a few seconds into the talk. The
transcript is a Qwen machine transcription; quotes keep its wording, including
“Jeff”, “Jeb”, “Jim”, “Gem” and “Java” for Jev, and “Quinn” for Qwen. Workday's
caveat from the talk applies throughout: the demos use fake data and aren't in
production. “From the notes” and “The reading” boxes are interpretation, not his
words.*

## Natural language inside the query

The problem is a recruiter's: a pile of resumes, and the need to find who fits
(00:08:03). The demo answers it with a query (00:09:24).

> “So this is against a DuckDB, where we have a function.”
> — 00:09:24

The function calls Jev on each resume with a question in plain English, returns the
probability as a score, and the query orders by it. His slide shows it:

`SELECT substr(name, 1, 22) AS candidate, round(jev_noul(resume_body, 'Has this person worked on fraud, or trust and safety problems?'), 2) AS score FROM pool ORDER BY score DESC LIMIT 20;`

The pool is 117 resumes with made-up names. They're synthetic and ML-heavy, so fraud
and trust-and-safety experience scores high. Then he makes it adversarial. The
resumes are full of “pipeline”, data pipelines and AI pipelines, so he asks whether
each person is qualified to do plumbing.

> “If you were going to just do a lexical search, it might pick up some of these.”
> — 00:09:24

Jev scores them all low.

> “So we went over one hundred seventeen records.”
> — 00:09:24

> “We had 2.3 seconds of wall time and spent almost nothing on this query.”
> — 00:09:24

<div class="reading"><b>From the notes:</b> “he is calling jev inside of a sql
statement inside of a duckdb”. <b>The reading:</b> this is the most concrete version
of the decision-model idea from the whole conference. A judgment becomes a SQL
function, so it composes with everything SQL already does: filtering, sorting,
joining, grouping. His slide says it plainly: no classifier to train, no index to
build. DuckDB is the query engine here; it can also read Parquet files directly, so
the same function would run over a lakehouse's open files, judging data where it
already sits, which is the shape of George Fraser's “the warehouse is the context”
(<a href="../2026-11-10-the-new-job-of-the-data-team-is-providing-context-to-ai/story.md">the data team's new job</a>)
and of this morning's note about connecting straight to OLAP cubes
(<code>notes/inbox/2026-11-12T1215-olap-cubes-modality-of-values.md</code>).</div>

**Visual:** photo `photos/PXL_20261111_233429743.jpg` (his slide: “Natural language inside the query”, the SQL above, over 117 resumes with made-up names, with “a question in plain English” highlighted; “No classifier to train. No index to build.”)

## Retrieval without the retrieval stack

The usual answer to the recruiter's problem is a pipeline (00:08:03): embed the
resumes, put the vectors in a vector database, retrieve, rerank, and show the top of
the list.

> “One interesting callout is the Quinn reranker.”
> — 00:08:03

Qwen's reranker already asks the model a yes/no question about each candidate at the
end, which is what Jev does. So skip everything before it:

> “But with Jeff, we basically take out all the embedding steps.”
> — 00:08:03

> “I don't have to train anything up. I don't have to do embedding. I don't have to put things in a vector database.”
> — 00:08:03

Put the resumes in a database, ask in natural language, and check every one.

<div class="reading"><b>The reading:</b> his slide lays out retrieval three ways.
Qwen and Cohere both go embedding, vector database, similarity search, then a
judgment at the end; Jev goes straight to the judgment, on every row. It's the
opposite answer to Mixedbread's the same day
(<a href="../2026-11-11-how-to-build-agents-over-your-own-data/story.md">Search ahead of the agent</a>),
which said to index everything ahead of time. Both are right at different sizes:
checking every row is simple and exact for hundreds or thousands; at millions of
documents you still narrow the pool first, with a cheap SQL filter or an index, and
let the model judge what's left.</div>

**Visual:** photo `photos/PXL_20261111_233341807.jpg` (his slide: “Retrieval three ways: Qwen, Cohere and Jev”: embedding, vector database and similarity search before a yes/no judgment or relevance score; “The reranker already asks a yes/no question. Jev asks it of every row directly: no embeddings, no vector database, no retrieval.”)

## Why a decision model, not an LLM

Calling a model on every row only works because the model is small. He starts from
the agent loop (00:00:37): take a request, decide, run tools, judge, repeat, with an
LLM call at every step.

> “So one is there's too much intelligence.”
> — 00:00:37

> “So you know, LLMs a lot of times are just a hammer looking for a nail.”
> — 00:00:37

> “So we want something that is fast. Smart, easy to use.”
> — 00:00:37

In code, most of those steps need something simple (00:01:42):

> “it's really just a conditional.”
> — 00:01:42

Jev has primitives for exactly that: a probability (is it this or that?), categories
(which of these does it fall into?), and a score (probability plus sorting). The SQL
function is the probability one. He was sceptical at first (00:02:24):

> “We already have classifiers.”
> — 00:02:24

But a classifier needs a dataset, training and retraining. With Jev,

> “We plugged in our question.”
> — 00:02:24

and it generalized, for routing, judging and resume screening. His simplest example
(00:03:17): nobody taught Jev what a fish is.

> “is a fish a pet? Well, fifty-fifty.”
> — 00:03:17

Add context and ask again, twenty milliseconds later: a fish in a bowl, yes.

> “Oh, is a fish on my plate a pet? Clearly not.”
> — 00:03:17

<div class="reading"><b>The reading:</b> his slide writes a harness's branches
(continue the plan, retry with a refined query, escalate to review) as Jev calls.
They're the same shapes Diogo drew as model gates (a yes/no, a score, a choice),
seen from the customer's side
(<a href="../2026-11-11-i-love-you-so-jevving-much/story.md">Too good to be true</a>).
The SQL demo is the yes/no gate, applied to a table.</div>

**Visual:** photo `photos/PXL_20261111_232705433.jpg` (his slide, from the back of the room: “In code, it's a conditional”, harness branches written as Jev calls)

## From what you want to say to what you want to do

The other half of the talk is the interface (00:04:00). Autocomplete guesses your
question:

> “It's just predicting the question. It's not helping you get to the answer.”
> — 00:04:00

Workday wants to move from predicting the next word to finishing the task:

> “Where we go from predicting what you want to say. To predicting what you want to do”
> — 00:04:00

Type that you need time off next week, and as you type, the interface adjusts to what
it's learning.

> “This is not something that we could have done with an LLM.”
> — 00:04:00

Ask “what was my pay last period?” and a card pops up with the payslip, hidden until
you reveal it. Start typing about a meeting, next Friday at 2 p.m., with your boss,
and the meeting is booked. Type a name, or “the person who owns this part of the
organization”, and a contact card appears with an email button.

<div class="reading"><b>From the notes:</b> “predicting what you want to say vs what
you want to do”. That's his framing, nearly word for word. <b>The reading:</b> it's
the System One idea from Cloudflare's talk in the morning, applied to a product: the
quick decision happens while you type, and slow, deliberate work starts only if it's
needed. Most enterprise AI adds an agent beside the app; this puts the decision in
the search box.</div>

**Visual:** quote “Where we go from predicting what you want to say. To predicting what you want to do” (00:04:00)

## Jev picks the card; the team fills it in

Under the hood (00:06:42), Jev runs at typing speed: predict the intent as the words
arrive, and render an interface to match.

> “And you know we can do this at about twenty bucks for a million judgments.”
> — 00:06:42

It works in two steps:

> “So first, Jeb is picking the card”
> — 00:06:42

Jev reads the intent and picks a card. Then the team that owns that domain decides
which questions progressively fill the card in. The first step gets people in the
front door; the second makes sure the card helps them finish. Before a new card is
added, they check it doesn't collide with existing ones, and in early experiments
with seven cards:

> “We were able to get ninety-six percent accuracy on that.”
> — 00:06:42

His summary (00:10:57) joins the two halves: wherever a decision used to be too
expensive or too slow, they now look for places to put Jev. Decide fast at the front
door; filter deep in the data.

> “imagine the things that you can do when you have a decision model installed.”
> — 00:10:57

<div class="reading"><b>From the notes:</b> “jev will select cards that have the
data, that's the UI choices that he's talking about”. Yes: the UI choice is which card
to show, and Jev makes it; the data in the card comes from the domain team's
questions. <b>The reading:</b> it's a clean split of judgment and ownership. The
model makes one narrow decision it can be trusted with, and the people who own the
domain own what happens next: Diogo's “smart software”, ordinary software with a small
model decision at the branch point. Together with the SQL demo, it answers your
backlog item on mapping where tools and decisions fit
(<code>notes/inbox/2026-11-11T1417-2-map-tools-and-decisions.md</code>): a decision
model belongs at the front door and inside the query. Jev is the decision model that
kept coming up this week, alongside
<a href="../2026-11-11-cloudflare-is-a-neolab/story.md">Cloudflare's Clef</a> and
<a href="../2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/story.md">Gemini Decisions</a>.</div>

**Visual:** diagram “keystrokes → Jev picks a card (intent) → the domain team's questions fill it in → the task is done; $20 per million judgments; collision check before a card is added” (illustrative)
