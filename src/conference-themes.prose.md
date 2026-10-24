---
name: conference-themes
kind: responsibility
version: 0.1.0
---

# Conference Themes

> A theme is a claim several talks make in different words. One talk repeating
> itself is still one talk.

### Goal

The conference's recurring arguments are named, counted by talk, and paired with
the claims that contest them, so a reader can see where the room agreed and where
it did not. Every theme cites atoms. No theme is named from vocabulary alone.

### Requires

- `claims`: the atom set — every claim with its section, verbatim quote, and
  talk. *(Facet `claims` of `talk-insights`.)*
- `theses`: one sentence per talk, so a theme can be named in the talks' own
  vocabulary. *(Facet `theses` of `talk-insights`.)*
- `coverage`: which talks were thin or partly unreadable, so the report can state
  its limits. *(Facet `coverage` of `talk-insights`.)*
- `talks`: the talk titles and paths, so every citation resolves to a file that
  exists. *(Facet `talks` of `recording-intake`.)*

### Maintains

The cross-talk argument map, and the report rendered from it.

- `themes`: `[{ theme_id, name, claim_sentence, definition, talk_count, talk_slugs: [String], claims: [claim_id], counter_claims: [claim_id], also_called: [String], why_uncontested }]`
- `singletons`: `[claim_id]`
- `contested`: `[{ question, sides: [{ claim_id, stance }] }]`
- `corpus`: `{ talk_count, word_count, last_touched, theme_count, unassigned: [String], thin: [String], report_path, generated_at }`

**Canonicalization spec**:

- **Material**: every `themes` field except `definition`; every `singletons` and
  `contested` entry; every `corpus` field except `generated_at`.
- **Immaterial** (excluded from the fingerprint): `corpus.generated_at`, the
  order claims were read in, and each theme's `definition`.

  A theme carries both its argument and its expansion. `claim_sentence` states
  the argument in one sentence and is material: sharpening it changes what the
  theme asserts, and that must wake the atlas and the hooks. `definition`
  expands the same argument for a reader and is rendered from the claims, so a
  reworded expansion that clusters the same claims must not wake anything.

  This is the structured-backing rule applied inside one theme: the field that
  changes meaning is material, the field that changes wording is not. It does
  not hide the new wording. The report is re-rendered from the world-model on
  every render, so a better `definition` reaches the reader the next time the
  node runs.

- Ordering: themes by `talk_count` descending then `name`; `claims` and
  `counter_claims` by `claim_id`; `talk_slugs` ascending; `singletons` by
  `(talk_slug, at_seconds)`; `contested` by `question`.
- Text normalization: NFC, trimmed, whitespace-collapsed for `name`,
  `claim_sentence`, `question`, and `stance`. A `claim_id` is compared exactly.
- `theme_id` is the slug of `name`. A rename is a new theme, and that is on
  purpose: the atlas and the hooks key on it.

#### themes

The clusters. Material: `theme_id`, `name`, `claim_sentence`, `talk_count`,
`talk_slugs`, `claims`, `counter_claims`, `also_called`, `why_uncontested`.
Immaterial: `definition`.

#### singletons

Claims only one talk makes. Material: the claim ids, ordered. A singleton is a
real finding, not a leftover: it is often the most distinctive talk.

#### contested

The open disagreements, each a question with the claims on each side. Material:
`question` and every `side` with its `claim_id` and `stance`. A theme with
counter-claims that never meet in a question is not contested yet.

#### corpus

What was read and what it could not reach. Material: `talk_count`, `word_count`,
`last_touched`, `theme_count`, `unassigned`, `thin`, `report_path`. Immaterial:
`generated_at`.

**Postconditions** (self-policed before signing):

- **Assigned**: every talk carrying atoms appears in at least one theme's
  `talk_slugs`, or in `corpus.unassigned`. Exactly one of the two, never both.
- **Citing**: every id in `themes[].claims`, `themes[].counter_claims`,
  `singletons`, and `contested[].sides[].claim_id` exists in the atom set. The
  clustering step adds no quote of its own.
- **Corroborated**: every theme has at least two distinct `talk_slugs`.
- **Stated**: every theme has a `claim_sentence` that asserts something. A noun
  phrase is a label, not a claim, and does not satisfy this.
- **Answered**: every theme records `counter_claims`, and a theme with an empty
  list states `why_uncontested`.
- **Limited**: `corpus.talk_count` and `corpus.word_count` match the talks the
  atoms came from, `corpus.theme_count` equals the number of themes, and `thin`
  lists every talk the atoms marked thin.
- **Reported**: `corpus.report_path` holds the sections Corpus, Themes,
  Singletons, and Limits. Each theme in it cites at least two talks at an
  `HH:MM:SS` heading that exists in the talk's transcript.

### Continuity

- **input-driven**: a `claims`, `theses`, `coverage`, or `talks` receipt whose
  fingerprint moved.

The day a talk lands, the map changes. A day with no new talk renders nothing.

### Errors

- `no-claims`: the atom set is empty and there is nothing to cluster.
- `unresolvable-citation`: a talk in `claims` has no entry in `talks`, so its
  citations cannot resolve.

### Strategies

- when two claims make the same argument in different vocabulary: they join. A
  shared word does not join them.
- when a claim argues the reverse of a theme, or qualifies it: it goes in
  `counter_claims`, not in a theme of its own.
- when a theme would cite only one talk: it is a `singleton`.
- when the conference uses a phrase for the idea: that phrase is the `name`, and
  any other phrase goes in `also_called` so a reader can search it.
- when naming a theme: `name` is the phrase a reader would search,
  `claim_sentence` is the argument in one sentence, and `definition` expands
  that sentence for someone who has not read the talks.
- when the atom set is too large to cluster in one pass: group by candidate
  argument first, then name the groups. Naming is the last step, never the first.
- when a talk is thin: assign it if it argues something, and name it in
  `corpus.thin`. A thin talk cannot carry a theme alone.
- when the operator asks about one talk instead of the corpus: answer from that
  talk's atoms and do not re-cluster the map.

### Shape

- `self`: cluster the atoms, count talks rather than mentions, write the
  world-model, render the report from it.
- `prohibited`: re-reading transcripts to find evidence the atoms do not hold;
  introducing a quote the clustering step found; naming a theme from vocabulary
  alone; rewriting earlier sections of `analysis/themes.md` to look settled.

### Runtime

- `persist`: project
