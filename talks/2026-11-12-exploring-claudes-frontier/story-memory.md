---
title: "Understood backwards, lived forwards: how Claude dreams over its memory"
speakers: "Lance Martin (Anthropic)"
duration: "11:14 (second half of an 18:20 talk)"
source: transcript.md
video: null
themes: [agent-memory-needs-curating]
part: "2 of 2 (the first half is story.md)"
reader: "Will and his clients: why agent memory written on the job decays, and how a separate consolidation pass, dreaming, fixes it and turns raw transcripts into a wiki"
built_from_notes:
  - notes/inbox/2026-11-12T1244-life-understood-backwards-lived-forwards.md
  - notes/inbox/2026-11-12T1248-claude-better-at-reading-writing-memory.md
  - notes/inbox/2026-11-12T1249-follow-up-memory-from-transcripts.md
  - notes/inbox/2026-11-12T1251-wiki-and-data-from-memory.md
  - notes/inbox/2026-11-12T1252-what-are-dreaming-tokens.md
built_from_photos: 3
notes_frame:
  spine: "memory and dreaming (5 notes, 3 photos: the Pokémon memory directories, the dreaming diagram, a washed-out slide)"
  split: "the talk has two halves; the operator asked for two stories (2026-11-12); the agent team is in story.md"
key_points:
  - "Agents write memory greedily inside a session, but memory has to be globally coherent, so it needs a separate consolidation step, as human memory does in sleep (00:07:06)"
  - "Stronger models know when to write and read memory and write better memories, with no special prompting (00:08:54, 00:10:40)"
  - "Dreaming re-reads transcripts and notes to fix poisoned memories, fill gaps and build new representations such as a wiki that improves with more dreaming tokens (00:12:13, 00:13:42, 00:15:15)"
kind: talk-story
status: draft
---

# Understood backwards, lived forwards

The second half of Lance Martin's talk is about memory. An agent writes memory as it
works, one session at a time, but memory is only useful if it makes sense as a
whole. Anthropic's answer borrows from sleep: a separate pass, which they call
dreaming, where Claude reviews its transcripts and notes, fixes what's wrong, and
builds better representations, such as a wiki, that load into the next session.

*Framing note: this story is framed by the notes and photos taken in the room: five
notes and three photos on memory and dreaming. The talk's first half, on a
thousand-agent team, is its own story (story.md). The transcript is a Qwen machine
transcription; quotes keep its wording, including "Claus", "Clauson", "clock" and
"cloud" for Claude, "CL Bench" and "CLH benchmark" for the benchmark, "reaming" once
for dreaming, "white keys" for wikis and "Sun at" for Sonnet. "From the notes" and
"The reading" boxes are interpretation, not his words.*

## The paradox of agent memory

He opens the memory half with the lead line of his recent blog post (00:07:06).

> “So life can only be understood backwards, but it must be lived forwards.”
> — 00:07:06

> “This is a fundamental paradox of agent memory because agents write memory typically as they go about a task.”
> — 00:07:06

An agent notices something odd or important and writes it down for the task at hand.
But memory has to be a coherent, non-redundant map that later sessions can rely on:

> “But memory needs to be something that's globally coherent and not redundant.”
> — 00:07:06

Humans have the same problem. During the day we form short-term memories; at night,
it's believed, the hippocampus replays them to the neocortex, consolidating the
important fragments into long-term knowledge.

> “And we found agents can benefit from the same decomposition.”
> — 00:07:06

<div class="reading"><b>From the notes:</b> “life can only be understood backwards,
but it must be lived forwards”, the second time this week; the first was Michelle
Chen's Cloudflare talk
(<a href="../2026-11-11-cloudflare-is-a-neolab/story.md">The missing piece</a>). Here
it carries the talk's argument: writing memory and making sense of it are two
different jobs, and they should run at different times.</div>

**Visual:** quote “So life can only be understood backwards, but it must be lived forwards.” (00:07:06)

## Better models use memory better

The evidence starts with a benchmark (00:08:54): forty questions about a database,
each in a fresh session, with a memory directory Claude can write to in between. The
only instruction is that the directory exists:

> “It just tells the agent the directory is available.”
> — 00:08:54

Older models barely benefit; Sonnet 4.6 doesn't reliably know when to write or read.
Stronger models gain much more from the same instruction:

> “They know intrinsically when to write to memory, and they kind of know intrinsically when to read from memory to retrieve information.”
> — 00:08:54

Their memories are also better: verified statements and predictions rather than
fragments. Pokémon makes it visible (00:10:40). Claude 3.7's memory directory from
playing the game is enormous and indiscriminate:

> “It creates this huge, unwieldy, just disgusting memory directory of things that are not really relevant or.”
> — 00:10:40

Fable 5's is small and strategic, the tactical knowledge you can't read off the game
state, and it gets much further in the game.

> “So what we see is better models are much have much better instincts for salience.”
> — 00:10:40

<div class="reading"><b>From the notes:</b> “Claude is getting better at reading and
writing memory than it used to be.” <b>The reading:</b> it's the memory version of
the “Less harness, more model” theme. The memory system here is just a folder;
what improved is the model's judgment about what belongs in it.</div>

**Visual:** photo `photos/PXL_20261112_204747489.MP.jpg` (his slide: the memory directories of Claude Sonnet 3.7, 413 files and 977,930 characters, and Claude Fable 5, 10 files and 43,406 characters, as treemaps at the same scale)

## Dreaming

Both examples are memory written during the work (00:12:13). Dreaming is the other
half: a separate pass over everything stored.

> “Transcripts you think about as kind of foundational.”
> — 00:12:13

A memory system could be just transcript search, but transcripts are large and most
of what's in them doesn't matter. Memory notes are the next layer, salient
observations Claude writes as it goes. Dreaming works on both:

> “Dreaming lets you reflect over transcripts and these written notes, and re-represent them.”
> — 00:12:13

It can build new representations, such as wikis, and promote certain memories into
context that loads into every future session.

<div class="reading"><b>From the notes:</b> “I want to know what dreaming tokens
are” and “follow up on building memory from session transcripts”. This is the
answer to both: dreaming is a compute pass that reads transcripts and notes and
writes better memory, and dreaming tokens are what that pass spends. <b>The
reading:</b> it automates what Steve Yegge does by hand when his agents' memory
becomes a garbage dump (“aggressively slash the crap out of it”), and it completes
Lovable's design: keep the full log as evidence, but render what reaches the model
(<a href="../2026-11-11-what-it-takes-to-set-intelligence-free/story.md">The output is a business</a>).</div>

**Visual:** photo `photos/PXL_20261112_204832330.MP.jpg` (his slide: "Dreaming": from a session, transcripts (a searchable event log), memory notes (salient observations written by Claude), memory representations (computed from transcripts and notes, such as wikis) and injected context (memory loaded into every session) feed the next session)

## Dreaming fixes poisoned memory

The first use is correction (00:13:42). Playing Pokémon, Claude wrote down the wrong
location for a landmark. From then on it mislocalized itself, fell through a trapdoor
back to the ground floor, and repeated the loop.

> “The key idea is a poison memory is injected and it's stuck there.”
> — 00:13:42

> “Dreaming can rescue that.”
> — 00:13:42

In the game-progress traces, raw memory without dreaming crashes at that point; with
dreaming, Claude corrects the note and carries on to the next level. The same pass can
fill gaps (00:17:09): a wiki Claude built had placeholder pages that didn't exist, and
after dreaming the gaps were filled and an index created.

> “Dream is a way that Claude can reflect and kind of apply compute across its memory to improve it.”
> — 00:17:09

**Visual:** quote “The key idea is a poison memory is injected and it's stuck there.” (00:13:42)

## A wiki from a corpus

The last example builds something new (00:15:15). Anthropic acquired Stainless in May;
from its documents and Slack messages, anonymized, they built 25 questions only that
corpus can answer. Plain semantic search over the documents does reasonably well:

> “You can see it's like 53 percent, just for search.”
> — 00:15:15

Then they let Claude build a wiki from the corpus.

> “You can see as you push, you add more and more dreaming tokens.”
> — 00:15:15

> “The wiki gets better and better and better, allowing Claude answers questions.”
> — 00:15:15

And the two together do best:

> “We also find that adding the wiki and the search tool together actually bumps further beyond just raw.”
> — 00:15:15

<div class="reading"><b>From the notes:</b> “wiki and data from memory”. <b>The
reading:</b> this is the practical takeaway for a client with a pile of documents,
tickets and chat history: don't stop at search. Let a model spend compute building a
structured representation of the corpus, keep the search alongside it, and rerun the
consolidation as the corpus grows. It's a different answer from Mixedbread's (index
everything for search,
<a href="../2026-11-11-how-to-build-agents-over-your-own-data/story.md">Search ahead of the agent</a>)
and Workday's (judge every row): the model writes its own map of the knowledge.
His post, “The components of agent memory”, is on the <a href="links.md">links
page</a>.</div>

**Visual:** diagram "accuracy on 25 Stainless questions: search alone about 53%; a Claude-built wiki rising as dreaming tokens increase; wiki plus search highest" (illustrative, only the 53% is from the talk)
