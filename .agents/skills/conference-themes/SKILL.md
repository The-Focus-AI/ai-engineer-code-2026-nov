---
name: conference-themes
description: Find the patterns across every recorded talk — recurring themes, consensus, disagreements, and where the conference's attention went. Use when the user asks what the talks had in common, wants a cross-talk synthesis, trends, or a themes report.
---

# Mine the talks for themes

A **theme** is a claim several talks make in different words. The unit of
evidence is one **claim**: one speaker, one section, one sentence in their
words. A recurring word is a lead; it becomes a theme only when talks make the
same argument with it.

This runs across the corpus. For a question about one talk, use `/talk-ask`.

## 1. Fingerprint the corpus

```bash
ls talks/*/transcript.md | wc -l
wc -w talks/*/transcript.md | tail -1
git log -1 --format='%h %cs' -- talks/
```

Record the count, the words, and the last commit that touched `talks/` in the
report. If the count is not 28, the corpus moved: analyse what is there and say
so.

## 2. One thesis per talk

Every talk gets a row before any clustering:

| slug | title | speaker / company | format | thesis (one sentence) | claims |
| --- | --- | --- | --- | --- | --- |

Read the frontmatter, the section headings, and enough body to state the
argument. Pull 3–6 claims per talk: the `HH:MM:SS` heading, a short verbatim
quote, and the claim in one line.

Do this for **every** talk. When the harness has subagents, fan out one per talk
(or per 4–6 talks) with a schema that returns these rows. A subagent that
returns only a summary has thrown away the evidence; require the quotes.

## 3. Cluster the claims

Work from the table, not from memory.

- Two claims join when they make the **same argument**, even in different
  vocabulary. "Agents need verifiers" and "the model must check its own work"
  join. "Agent" appearing in both does not.
- Name a theme in the conference's own vocabulary where it fits; the reader can
  then search that phrase.
- Count **talks**, not mentions. One talk repeating a claim is one talk.
- Record the **counter-claims**: talks that argue the reverse or qualify the
  theme. A theme with no counter is usually too broad.
- A claim only one talk makes is a **singleton**. List singletons separately;
  they are often the most distinctive talks.

## 4. Write the report

Write `analysis/themes.md`, creating `analysis/` if needed.

1. **Corpus** — count, dates, commit, words, and the talk titles.
2. **Themes**, ranked by talk count. Each: a one-line definition, the count,
   2–4 quoted claims with citations, and the counter-claims.
3. **Singletons** — claims unique to one talk.
4. **Limits** — unrecorded sessions, thin transcripts, ASR damage.

Cite inside the report as `[<talk title>](../talks/<date>-<slug>/transcript.md)`
at `HH:MM:SS`; the report sits one level below `talks/`.

Reply with a 5–10 line summary and link the file.

The report is done when every talk in the corpus appears in the inventory with
at least one theme or the label `unassigned`, and every theme cites at least two
talks; a claim that cannot is listed as a singleton.


## Keep the trace

Write the finished synthesis to `analysis/themes.md` (its existing home) and
date it. If the user asks for hooks from it, hand it to `/conference-hooks` rather than
rewriting the synthesis; the theme report is evidence, the hook file is
editorial.
