---
name: talk-insights
kind: responsibility
version: 0.1.0
---

# Talk Insights

> The atom every synthesis quotes. One claim = one speaker, one section, one
> verbatim quote, one timestamp — extracted once, so themes, hooks, atlases, and
> answers select evidence instead of each re-reading the corpus.

### Goal

Every recorded talk is atomised into claims that carry a verbatim quote and a
citation that resolves, so a downstream synthesis selects evidence rather than
re-deriving it. A talk whose argument cannot be recovered is recorded as thin,
with the reason, rather than omitted.

### Requires

- `talks`: the rendered talk — slug, path, title, speakers, and the `### HH:MM:SS`
  section headings — so every claim can be anchored to a section that exists.
  *(Facet `talks` of `recording-intake`.)*

### Maintains

The claim atoms and the one-sentence thesis per recorded talk.

- `theses`: `{ [session_id]: { thesis, confidence } }`
- `claims`: `{ [session_id]: [{ claim_id, section, at_seconds, quote, claim, speaker, also_at: [String] }] }`
- `coverage`: `{ [session_id]: { sections_read, claims_found, thin, gaps: [String], extracted_at } }`

**Canonicalization spec**:

- **Material**: `thesis`, `confidence`, every claim field (`claim_id`, `section`,
  `at_seconds`, `quote`, `claim`, `speaker`, `also_at`), and every coverage field
  except `extracted_at`.
- **Immaterial** (excluded from the fingerprint): `extracted_at`, the order in
  which sections were read, and a re-extraction that reproduces the same atoms. A
  second pass over unchanged text must not wake anything.
- Ordering: claims by `(at_seconds, claim_id)`; `also_at` ascending; talks by
  slug. `claim_id` is derived from `(session_id, at_seconds, sha256(quote)[0..6])`,
  so it is stable across re-extractions and unique inside a section that carries
  more than one claim.
- Text normalization: NFC, trimmed, whitespace-collapsed for `thesis` and
  `claim` — **except** `quote`, which is compared byte-for-byte after NFC and is
  never rewritten.

#### theses

The argument of the talk in one sentence. Material: the sentence and its
`confidence`. Immaterial: nothing else.

#### claims

The atom set. Material: every field listed above. Two claims collapse when they
make the same argument in the same section; the earlier one wins and the later
section goes in `also_at`.

#### coverage

What the extraction could and could not reach. Material: `sections_read`,
`claims_found`, `thin`, and each `gaps` entry. `gaps` names a garble, a
unreadable passage, or an unrecorded section — not a to-do.

**Postconditions** (self-policed before signing):

- **Quoted**: every `claims[].quote` appears verbatim in that talk's
  `transcript.md`.
- **Anchored**: every `claims[].section` is a `### HH:MM:SS` heading present in
  that transcript, and `at_seconds` matches it.
- **Complete**: every talk under `talks/` has a `theses` and a `coverage` entry.
  A talk with no extractable claim is recorded with `thin: true` and a `gaps`
  reason, never dropped.
- **Sufficient**: a talk yields 3–6 claims. Fewer is allowed only when `thin` is
  true and `coverage.gaps` says why.
- **Attributed**: `speaker` is a name from the talk's frontmatter, or `null` when
  the transcript does not distinguish speakers. It is never guessed.
- **Original**: no claim restates the schedule abstract; a claim comes from the
  talk's body.

### Continuity

- **input-driven**: a `talks` receipt whose facet fingerprint moved.

A wake where no transcript moved re-extracts nothing and signs an unmoved
fingerprint.

### Errors

- `no-talks`: the corpus is empty; there is no truth to maintain.
- `unreadable-transcript`: a transcript is not sectioned into `### HH:MM:SS`
  headings and cannot be parsed. The render fails rather than emitting claims
  with invented anchors.

### Strategies

- when only some talks moved: read the prior world-model, re-extract the moved
  talks, and carry the rest forward unchanged.
- when a transcript is under roughly 600 words: extract 1–3 claims and set
  `thin: true` with the word count in `gaps`.
- when ASR garbles a name or product: quote it verbatim, and put the likely
  reading in `coverage.gaps` — never inside the `quote`.
- when two sections make the same claim: keep the earlier as the claim and list
  the later heading in `also_at`.
- when the talk is a panel or fireside: attribute each claim to the speaker who
  made it when the transcript distinguishes them; otherwise `speaker: null`.

### Shape

- `self`: read transcripts and frontmatter, extract claims and theses, write the
  world-model.
- `prohibited`: editing, cleaning, or normalising a transcript; quoting from a
  summary or an abstract; inventing a section heading or a speaker.

### Runtime

- `persist`: project
