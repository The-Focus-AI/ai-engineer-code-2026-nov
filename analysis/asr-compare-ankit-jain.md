# Apple vs Qwen3-ASR: Ankit Jain, "One team's path to trusting AI generated code"

Recording `recordings/inbox/2026-11-10_0933_Ankir-Jain` (22 min 30 s, recorded
from the audience in Continental 1–3). Apple is the Voice Memos transcript the
talk was filed from. Qwen is `qwen3-asr-1.7b` run locally through
`scripts/qwen-asr.ts`.

## At a glance

| | Apple (Voice Memos) | Qwen3-ASR 1.7B, long prompt | Qwen3-ASR 1.7B, names-only prompt + echo filter |
| --- | --- | --- | --- |
| Words | 3,824 | 1,987 | 1,907 |
| Audio covered | all 22:30 | 0:00–10:54, then nothing | 0:00–10:54, then nothing |
| Runtime | already done on the phone | 5 min 40 s | 7 min 52 s |
| Timings | per word | per ~5 s segment | per ~5 s segment |
| Prompt echo | n/a | yes: one 11½-minute "segment" is the prompt's term list | 2 echo segments dropped; no prompt names left in the text |

## Side by side

Quotes are verbatim and short. "—" means the transcript has nothing at that point.

| Point | Apple | Qwen (long prompt) |
| --- | --- | --- |
| Opening numbers | "I knew I'm gonna be working 100 PRs per week. And now we're doing about 4, right?" | "A year ago, we were merging about 100 PRs per week. And now we are doing about 400." |
| The shift | "we moved from human, redwood code with VI assistants, to now predominantly AI will concur with human assistance" | "we move from human. Written code with AI assistance to now predominantly AI written code with human assistance" |
| Microsoft study | "44% of people asked, why did they do good reviews? They said to find lots. But only 14% of analyzed comments actually were both." | "Forty-four percent of people asked why do they do code reviews. They said to find bugs. But only fourteen percent of analyzed comments actually were bugs." |
| Six steps | "We have 6 steps." | "We have six steps. I was like, okay, we're killing one thing and we're creating six." |
| Invariants | "these become your invariants … out of 200 candidates. We got 64 rules automatically created." | — (past 10:54) |
| Deterministic rules | "out of the 64 rules we had, we were even converted 19 on that." | — |
| Ownership | "own the rules that verify whether the code works … own the garbage, own the roofs, own these frameways." | — |
| Results | "It's 3.4 hours better used to be 2.one deals." · "It used to be open 5 days. It's like 2.5 hours." | — |
| Closing | "So please stop reading the death. Read these intent, instead." | — |

## Numbers

| Claim | Apple | Qwen (long prompt) |
| --- | --- | --- |
| 9 engineers | right ("9 engineers") | right ("nine engineers") |
| 100 → ~400 PRs/week | **wrong** ("about 4") | right ("about 400") |
| Microsoft 2013, 44% / 14% | right | right |
| 400-line review limit, 600-line median PR | right | 400 right; 600 lost |
| 200 candidates → 64 rules, 19 made deterministic | right | lost |
| 3.4 h median time to merge; 5 days → 2.5 h | right, words around them garbled | lost |
| First 90 days | right | lost |

## The prompt echo

The first run passed Qwen a long spelling prompt: every speaker, company, and
session title overlapping the recording. At 10:54 the model stopped
transcribing and emitted that list as text ("…Ankit Jain; Aviator; One team's
path to trusting AI generated code; Scott Tolinski; Syntax…") as a single
segment running to the end of the file. Two consequences:

- **Half the talk is gone.** Invariants, rules, verify, debate, ownership, and
  results are all after 10:54.
- **Names appear that were never said.** "Aviator", "Ankit Jain", and "Codex"
  are in the Qwen transcript only because of the echo. The intro was not in
  the recording at all.

`scripts/qwen-asr.ts` now passes only speaker names and affiliations, and drops
any segment carrying three or more prompt terms, counted in
`transcript_dropped_segments`. On the re-run with that fix, the echo is gone from the text: no "Aviator",
"Ankit", "Codex", or "Syntax" survives, and 2 segments were dropped. **The
second half is still missing.** Qwen again stopped producing speech at 10:54,
and what it produced instead was the dropped echo. The shorter prompt was not
the cause, only what got echoed. This build of Qwen breaks down past about 11
minutes of a long recording, and dropping the echo turns a wrong transcript
into a short one. `transcript_dropped_segments` in `meta.json` is the signal
to look for.

## Verdict

Where Qwen transcribes, it is much better than Apple: it gets the words right
("human-written code with AI assistance", "find bugs", "400") where Apple
produces "redwood code with VI assistants" and "about 4". Apple is worse
per sentence but complete, and its numbers in the second half are intact.

**Keep Apple as the default and Qwen as the fallback for recordings with no
transcript.** That is how `--asr auto` already behaves. Do not use `--asr qwen`
on talk-length recordings until long audio is fixed: a 22-minute talk lost its
second half on both runs. Two things to try next, in order:

1. Split long recordings into chunks of about 5 minutes, transcribe each with
   its own call, and offset the timings. Qwen is accurate on the first 10
   minutes, so short inputs avoid the breakdown.
2. Run with `--past-text no`, so a chunk's decoded text is not carried into
   the next as context. Carried-over text is the likely path for the prompt to
   take over.

Until then, a Qwen transcript whose last segment ends well before the audio's
duration, or that has `transcript_dropped_segments` above zero, should be
treated as partial.
