---
title: "Too good to be true, too bad to be useful: Diogo Almeida on reliable intelligence"
speakers: "Diogo Almeida (TypeSafe AI)"
duration: "22:00"
source: transcript.md
video: null
themes: [decision-load, guardrails-people-own]
reader: "Will and his clients: why today's AI helps people but can't be trusted to run on its own, and what changes when a model becomes a reliable part inside ordinary software"
built_from_notes:
  - notes/inbox/2026-11-11T1408-where-is-the-automation.md
  - notes/inbox/2026-11-11T1410-too-good-or-too-bad-whats-the-line.md
  - notes/inbox/2026-11-11T1411-human-in-the-loop-because-rlhf.md
  - notes/inbox/2026-11-11T1414-rlhf-dont-think-about-the-right-task.md
  - notes/inbox/2026-11-11T1417-reliable-intelligence.md
  - notes/inbox/2026-11-11T1417-2-map-tools-and-decisions.md
  - notes/inbox/2026-11-11T1417-3-saasapalooza-not-saaspocalypse.md
  - notes/inbox/2026-11-11T1418-smart-software.md
  - notes/inbox/2026-11-11T1423-read-tyranny-of-the-kv-cache.md
  - notes/inbox/2026-11-11T1424-principal-agent-problem.md
  - notes/inbox/2026-11-11T1426-dwim-twitter-demo.md
  - notes/inbox/2026-11-11T1427-slop-pushes-work-to-others.md
built_from_photos: 17
notes_frame:
  spine: "assistance vs automation, and RLHF as the cause (3 notes, 4 photos: the sane view, the jagged frontier, the assistance/automation stamps, the WTF list)"
  then: "reliable intelligence and smart software (4 notes, 3 photos), rethinking software and his ideas (3 notes, 3 photos), doing the right task (1 note, 3 photos), slop (1 note)"
  opened_up: "the two cults, the blue LED, software research, cursed software and 'what couldn't we automate?' were added on request (2026-11-12: \"open it up with more detail, there are a lot of threads here\")"
key_points:
  - "AI is too good to be true at assistance and too bad to be useful at automation, because RLHF optimized it to please the human checking it (00:03:24, 00:04:15)"
  - "The bitterest lesson is doing the right task: train for reliability, not occasional brilliance; Einstein 95% of the time and Mr Bean 5% can't be automated (00:06:05, 00:08:57)"
  - "Reliable model calls are a fourth logic gate: smart software puts small decisions inside ordinary programs instead of a chatbot beside them (00:10:25, 00:12:12)"
kind: talk-story
status: draft
---

# Too good to be true, too bad to be useful

Diogo Almeida co-created ChatGPT, RLHF and InstructGPT, and now runs TypeSafe AI,
which makes Jev, a model for small, typed decisions. His talk asks why AI can be
superhuman at some things and useless at others, and blames the method he helped
invent. His answer: today's models are built to help a person, not to run on their
own. Train them for the right task, reliability, and a model call becomes a new
building block for ordinary software. Then there's a lot of software to rethink.

*Framing note: this story is framed by the notes and photos taken in the room:
twelve notes and seventeen photos, most of them on why AI helps but doesn't
automate, and on reliable intelligence and smart software. The transcript is a Qwen
machine transcription; quotes keep its wording, including “Jeff”, “Jeb”, “Java” and
“Jetting” for Jev, “Arlo” and “R LHF” for RLHF, and “KB cache” for KV cache. “From
the notes” and “The reading” boxes are interpretation, not his words.*

## Two cults and a jagged frontier

He opens with his own odd position (00:00:37): he loves using chatbots and coding
agents, and still thinks the field has gone wrong.

> “One of the few people who hates on ChatGPT, who made it.”
> — 00:00:37

His slide puts him in the overlap of two circles: the people who made ChatGPT, and
the people who hate on it, with Yann LeCun and Gary Marcus. Then the two cults
(00:01:26). One reads the benchmarks, where models have beaten humans for two years:

> “We've been announcing AGI three months away for two years now.”
> — 00:01:26

The other looks outside San Francisco, at a world that has barely changed. Both are
looking at the same facts, and he wants a view that holds both:

> “It's a rare. Point of view to actually think AI is cool and transformative, and also like underwhelming the world right now.”
> — 00:01:26

That's the jagged frontier (00:02:29): models that can work on Millennium Prize
problems in maths but can't be trusted with bookkeeping. The transcript garbles the
example:

> “They can't even be used to touch a counting.”
> — 00:02:29

He wants an Occam's razor explanation for the gap, and the rest of the talk is his.

**Visual:** photo `photos/PXL_20261111_220808193.MP.jpg` (his slide: “My relationship to ChatGPT”, a Venn diagram of “Made ChatGPT” (OpenAI) and “Hates on ChatGPT” (Yann LeCun, Gary Marcus), with “Me” in the overlap)

## What explains the line?

His slide, “The Sane View of AI”, splits the field in two. Too good to be true:
instruction following, ChatGPT, copilots, coding agents and Claude Code, NotebookLM,
deep research, voice agents, customer service without decisions, and slop. Too bad
to be useful: customer service, drive-thrus, accounting and taxes, QA, insurance,
data entry, and anything requiring reliability. A red arrow points at the divide:
“What explains this line?”

His answer (00:03:24):

> “Everything on the left side is intrinsically a human-in-the-loop task.”
> — 00:03:24

Deep research writes better than he could. But if the answer had to be correct, not
well written, you'd pick him. Pleasing a person and doing the task are different
goals:

> “And my claim is actually for these tests pleasing a human. Is nothing to do with doing the task.”
> — 00:03:24

Automation means the decision gets made and the work moves on, which is why he
calls code the language of automation. And every year there's another infamous
failure to automate drive-thrus.

The cause is the method he co-created (00:04:15):

> “I get the irony. That you know, I co-created RLHF, and I do believe RLHF is part of the problem.”
> — 00:04:15

> “That is what the HF is in RLHF.”
> — 00:04:15

The human feedback is the human in the loop, built in. Unless a task is trivially
verifiable, a person still has to check the output afterwards.

> “My summary of the state is 100% of LMs today. Are optimized for assistance.”
> — 00:04:15

Models trained with verifiable rewards (RLVR) are, he says, bad to interact with
until they've had RLHF too. So the result is lopsided: never pick him over ChatGPT
for a ChatGPT question, but for background work that has to be right on its own,

> “You should not trust LMs at all.”
> — 00:04:15

His “WTF is going on in AI?” slide lays it out as a list: LLMs are too good to be
true at assistance; 0% are optimized for automation (“RL??”); they're too bad to be
useful at automation; his guess is that automation is worth more than assistance;
then “???” and “Profit”.

<div class="reading"><b>From the notes:</b> “where is the automation”, “why are
some too good to be true and the others are too bad, what explains this line”, and
“all ai today does require human in the loop, rlhf is the reason”. His answer to
your question: the left column is work a person checks anyway, so a model trained to
please that person shines; the right column is work nobody checks in the moment, so
it needs reliability the training never asked for. <b>The reading:</b> for a client,
sort their AI ideas onto his two columns. Anything in the right-hand column won't be
fixed by a better chatbot; it needs a narrower model call that can be trusted
without a reviewer, or a person who stays in the loop on purpose.</div>

**Visual:** photo `photos/PXL_20261111_220941916.jpg` (his slide: “The Sane View of AI”: too good to be true vs too bad to be useful, with the arrow “What explains this line?”)

## The bitterest lesson: doing the right task

He extends Sutton's bitter lesson (00:06:05). Compute beats clever algorithms; data
beats compute; and above that:

> “I would argue that the bitterest lesson is doing the right task.”
> — 00:06:05

ML people like algorithms and numbers going up or down, not thinking about the real
world, but in his view every big jump in performance comes from picking the right
task. In classical RL, the game supplies it:

> “So actually, when you're doing RL, you don't even need to think about the right task.”
> — 00:06:05

The rules define the task, and rollouts generate the data. Language models were
different. The field had to find next-token prediction, which wasn't better
mathematically than masked language modelling, just better at what you could do
with it afterwards: generate text. And for making models useful it matters even more:

> “Data obviously matters a lot more than computing.”
> — 00:06:05

His evidence is instruction following (00:08:04): before RLHF, the data for it didn't
exist, and with even simple algorithms a small model trained on that data beat far
larger pretrained ones at following instructions. The transcript garbles the model
sizes he gave (“GPT nine”, “GPT seven to nine”), so they're left out here.

<div class="reading"><b>From the notes:</b> “when you are doing RLHF you don't
even need to think about doing the right task”. He says this of RL on games, where
the rules are the task; the catch is that RLHF chose a task too, pleasing a rater,
and that's the one models got good at. <b>The reading:</b> his pyramid slide puts
“doing the right task” at the base, with RLHF and RLVR as examples of it, and data
(human feedback, verifiable environments) above. The garbled sizes are most likely
the InstructGPT result, where a much smaller instruction-tuned model was preferred to
GPT-3.</div>

**Visual:** photo `photos/PXL_20261111_221509505.jpg` (his slide: “This is extra true for making LLMs useful”: a pyramid of algorithms, compute, data and, at the base, doing the right task, annotated “human feedback / verifiable environments” and “RLHF / RLVR”)

## Reliable intelligence

So TypeSafe picked a different task (00:08:57).

> “You get what you optimize for.”
> — 00:08:57

What's missing in LLMs, he says, is reliability. His line for it:

> “I often call it you get Einstein ninety five percent of the time, but Mr Bean five.”
> — 00:08:57

> “If you can't tell which is which, how the fuck is it automated?”
> — 00:08:57

Instead of occasional brilliance that someone then has to check, aim for narrow,
dependable smarts:

> “What if you focused on extreme, extreme narrow focused reliability?”
> — 00:08:57

That doesn't show up in benchmarks, and he credits it for Jev's reception among
developers. Not speed, cost or interface:

> “And it is not the speed, cost, or even interface.”
> — 00:08:57

He isn't sure of the name himself:

> “I'm looking for a better word than reliable.”
> — 00:08:57

and he tells the room to build reliable models even if they aren't TypeSafe's.

<div class="reading"><b>From the notes:</b> “reliable intelligence is the phrase
he's using, but it's not really the right one, or what do we deeply mean by this”.
He's asking the same question. What the talk means by it is intelligence you don't
have to check: the Mr Bean five percent is the problem, not the Einstein ninety-five,
because one unpredictable miss forces a reviewer onto every answer. Candidates for a
better word: “dependable judgement”, or “unsupervised-grade”. His slide adds the
claims behind it: this is why benchmarks don't matter, why people prefer the model
over copycats, and why there was a “ChatGPT for developers” moment. The T-shirt on
the slide reads “jev ne sais quois”.</div>

**Visual:** photo `photos/PXL_20261111_221614856.jpg` (his slide: “Jev's secret: reliable intelligence”: you get what you optimize for; why benchmarks don't matter; why people love the model over copycats; why there was a “ChatGPT for developers” moment; NOT speed/cost/interface)

## Smart software: a fourth logic gate

What do you build with reliable model calls (00:10:25)? Not more chatbots. Software,
he says, has barely changed in a decade except that it's cheaper to write, and the
best AI has done inside it is a chatbot to the side:

> “Is having a chatbot to the side that sometimes interacts with the software, but cannot take expensive decisions for you.”
> — 00:10:25

> “And I think the problem is we're focusing too much on coding agents.”
> — 00:10:25

The intelligence belongs in the inner loop of the program. His slide draws three
kinds of software. Traditional software is a flowchart of fixed rules ending in
money, with one branch that needs a human. Just-in-time software is a long chain of
LLM steps ending in a question mark, with a panicking brain juggling papers. Smart
software is the flowchart again, with small model decisions at a few of its nodes,
and every branch ends in money. He's bullish on what it unlocks:

> “I think the narrative of SaaS apocalypse is obviously not going to happen.”
> — 00:10:25

Even “SaaSapalooza” undersells it, he says. His analogy is the blue LED (00:12:12).
Red and green LEDs were indicator lights; adding blue gave white light and displays,
far more than a third more uses. Software has been built from a handful of simple
operations: greater than, less than, equal.

> “This is kind of conceptually adding a fourth semantic logic gate.”
> — 00:12:12

> “What if we can program with common sense, with intention, with human understanding?”
> — 00:12:12

His example is regular expressions:

> “Like, do we still need regexes with like crazy things, or can we just say like we want a Gmail email address or a real looking one?”
> — 00:12:12

His “Infinitely replicable lego blocks” slide shows the gates: AND, OR and NOT,
next to three model gates that take data and a question: a yes/no with
probabilities, a score, and a choice among options.

<div class="reading"><b>From the notes:</b> “the idea we were talking about before
is smart software”, “we need to build out a better area of how tools fit in with
decisions”, and “SaaSapalooza, not SaaSpocalypse”. The three model gates are that
map's missing piece: a yes/no, a score and a choice are the shapes a decision takes
inside a program, next to tools (which act) and code (which follows rules). Jev is the decision
model that kept coming up this week, alongside
<a href="../2026-11-11-cloudflare-is-a-neolab/story.md">Cloudflare's Clef</a>,
<a href="../2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/story.md">Gemini Decisions</a>,
and Scott Roberts calling Jev inside a SQL statement in DuckDB
(<code>notes/inbox/2026-11-11T1534-jev-inside-sql-in-duckdb.md</code>).</div>

**Visual:** photo `photos/PXL_20261111_221803022.jpg` (his slide: traditional, just-in-time and smart software as three flowcharts)

## LLM Stockholm syndrome and software research

His “AIE secret” (00:11:32) is that the field isn't pushing hard enough. The
transcript has “getting”; his slide says “the field isn't jevving hard enough”.

> “I think the world still has LLM Stockholm syndrome.”
> — 00:11:32

The tools we use have changed how we think, he says, so most ideas just replace a
step with an LLM instead of rethinking the software. He calls the alternative
software research (00:14:32):

> “I call this software research.”
> — 00:14:32

Like the early web, it means building things because we can, not because they're
valuable, and finding out what's possible.

> “Should all of those websites existed? Probably not.”
> — 00:14:32

> “The theme is going to be real software engineering, not just white coding.”
> — 00:14:32

(“White coding” is the transcript's vibe coding.) That means decomposition, stages
that can be verified, real encapsulation, and state you design, not

> “Instead of assuming everything is global state within a KV cache”
> — 00:14:32

<div class="reading"><b>The reading:</b> his slide lists it as “breaking it down
(decomposition)”, “thinking about stages that can be verified (encapsulation)”,
“designing what a smart person would need to do that stage (state management)”, and
“engineering around the task!!!!”, beside a cartoon captioned “This is not your
vibecoder's AI.” It's the same advice as Yegge's two layers and Cognition's “teach
the agents how to test the codebase”: the gains come from engineering around the
model, not from a bigger one. It also answers your Cognition note, “most teams are
limited by the amount of ambition they have”: his software research is a call for
more ambition.</div>

**Visual:** photo `photos/PXL_20261111_222224555.jpg` (his slide: “Theme: real software engineering”: decomposition, stages that can be verified, state management, engineering around the task; “This is not your vibecoder's AI.”)

## Ideas worth building

He runs through ideas he'd like to see, and to fund (00:15:50).

**Agents beyond the KV cache.** Agents are inflexible by design:

> “They're so inflexible in design because of the tyranny of the KB cache.”
> — 00:15:50

Designs that fight the cache get slow and expensive, so people abandon them. Why
can't every new call include all your past coding-agent history? The memory exists;
what's missing is the smarts to search and summarize it. Why can't agents working at
once share what they learn, instead of each rediscovering the codebase?

> “Why do they need to rediscover the same patterns of the codebase?”
> — 00:15:50

**Principal-agent problems** (00:17:20). Not coding agents: any agent acting for
someone else whose interests differ, such as elected officials acting for citizens.

> “The world is full of principal-agent problems.”
> — 00:17:20

A fair society has to stress the letter of a rule over its spirit, which breeds
loopholes and pay-to-win.

> “And I think the root of that problem is we can't encode the spirit.”
> — 00:17:20

**Real-time security, semantic types, new interfaces** (00:18:11). Spotting a bad
action is easier than doing it; what's been missing is checks fast, cheap and
reliable enough to run in real time.

> “I would argue it's a lot easier to figure out they're doing a naughty thing. Than to actually do the naughty thing”
> — 00:18:11

He wants a type system that checks meaning, a model in the linter. And interfaces
that do what you mean, which he ties to a voice-interface video:

> “There was a great Twitter video on. Like a voice interface.”
> — 00:18:11

<div class="reading"><b>From the notes:</b> “read the tyranny of the kv cache”:
it's his phrase in the talk, not a published piece; no article by that title is in
the dossier. “What is a principal agent problem”: answered above; his slide shows the
Wikipedia article, titled “Principal-agent solutions + spirit over letter”. “What is
the DWIM twitter demo”: DWIM is “do what I mean”, an old idea that failed because it
needed too many hard-coded rules; the video itself isn't named in the talk, so it
stays open. <b>The reading:</b> his memory idea is the opposite of Yegge's warning
the same afternoon. Yegge says agent memory becomes a garbage dump and needs pruning;
Diogo says keep all the history and get smart enough to search it. Both agree the
missing piece is judgement about what matters, which is a decision model's job.</div>

**Visual:** photo `photos/PXL_20261111_222426885.jpg` (his slide: “Principal-agent solutions + spirit over letter”, over the Wikipedia article on the principal-agent problem)

## The root of slop, and what couldn't we automate?

He ends on slop (00:19:45).

> “The root of slop is that AI is unreliable.”
> — 00:19:45

Because it's unreliable, no one uses it for decisions that cost them anything. But
pushing the cost onto someone else is fine:

> “But it's actually totally fine to push the costs into other people.”
> — 00:19:45

That's slop: an externalized cost, and an advantage for people who don't care. Then
he turns playful (00:20:25): even “cursed software”, deliberately terrible
interfaces, is worth making.

> “Doing things because we can is what software engineering is about.”
> — 00:20:25

His closing question (00:21:07): every engineer knows what software can't do. What
if those limits went away in six months or a year?

> “What couldn't we automate?”
> — 00:21:07

<div class="reading"><b>From the notes:</b> “slop is pushing the work to other
people”. That's the same diagnosis as
<a href="../2026-11-11-all-code-is-slop-except-mine/story.md">Lauren Tan's talk</a>:
unchecked output moves the checking onto whoever receives it. Diogo's version puts the
cause in the model: make it reliable and there's less checking to push. <b>The
reading:</b> it closes the loop on his opening question. Today's line between
assistance and automation is drawn by reliability; move it, and the question stops
being whether something can be automated and becomes how much work it is.</div>

**Visual:** quote “The root of slop is that AI is unreliable.” (00:19:45)

<!-- Not used as visuals: the title slide (“the Jev! guy”), the jagged-frontier chart,
the assistance/automation stamps, the WTF list, the two other pyramid slides, the AIE
secret, the lego-blocks gates and the thank-you slide. Their content is in the text. -->
