---
name: talk-links
kind: responsibility
version: 0.1.0
---

# Talk Links

> For every recorded talk, the people on stage, the company behind them, and the
> few external things worth reading or watching afterwards — each link verified,
> each claim sourced.

### Goal

Every recorded talk has a dossier: who spoke, where they work, where to find
them, and the handful of blog posts, papers, videos, or repositories that
actually relate to what was said. A link that was not verified is not published.

### Requires

- `program`: the session's title, abstract, time, room, and speaker ids.
- `speakers`: the roster — names, affiliations, and any published links.
- `talks`: the rendered talk (slug, path, sections) so the transcript can be
  read for mentions of blogs, videos, repositories, and products.
- `event`: the conference's dates and status, so the recheck cadence can follow
  the event's lifecycle rather than the wall clock.

### Maintains

The dossier for each recorded talk.

- `people`: `{ [session_id]: [{ name, role, affiliation, links: { site, linkedin, x, github, scholar }, evidence: [String], status }] }`
  with `status` one of `found`, `partial`, `not-found`
- `companies`: `{ [session_id]: [{ name, url, what, evidence: [String] }] }`
- `resources`: `{ [session_id]: [{ type, title, url, why, evidence: [String], first_seen, published_at, verified_at }] }`
  with `type` one of `blog`, `youtube`, `paper`, `repo`, `slides`, `podcast`,
  `product`
- `freshness`: `{ [session_id]: { phase, last_checked, next_check, checks } }`
  with `phase` one of `live`, `settling`, `settled` — the lifecycle state of the
  dossier, derived from `event.ends_on`
- `coverage`: `{ [session_id]: { searched: [String], gaps: [String], generated_at } }`

**Canonicalization spec**:

- **Material**: every `name`, `role`, `affiliation`, `status`, link URL, resource
  `type`/`title`/`url`, every `evidence` quote, and every `gaps` entry.
- **Immaterial** (excluded from the fingerprint): `verified_at`, `generated_at`,
  `last_checked`, `next_check`, `checks`, and the order in which searches
  happened. A recheck that finds nothing new therefore moves no fingerprint.
- Ordering: `people` by name; `resources` by `type` then `title`; URLs compared
  after stripping a trailing slash and `www.`.
- Text normalization: NFC, trimmed, whitespace-collapsed — **except** inside
  `evidence`, which is quoted verbatim from the transcript or the page title.

#### people

Who is on stage and where to find them. Material: the resolved name, role,
affiliation, each profile URL, and the evidence for the affiliation and for each
link (a roster entry, the speaker's own page, or a transcript self-introduction).
A person with no verified link is `not-found`, not a guessed profile.

#### companies

The organisation each speaker represents, with its primary URL and a one-line
description sourced from the site itself. Material: `name`, `url`, `what`.

#### resources

The external material worth attaching to the talk: a blog post by the speaker, a
paper the talk is based on, the demo repository, the recording on YouTube, the
slides. Material: `type`, `title`, `url`, `why`, and the transcript sentence that
points at it when one exists. Every URL here has been fetched and answered.

**Postconditions** (self-policed before signing):

- **Scoped**: a dossier exists only for a `session_id` present in `talks`; no
  dossier for a session without a recording.
- **Verified**: every `resources[].url` answered with a 2xx/3xx during this
  render; a content link that does not load is dropped and named in
  `coverage.gaps`. A `people[].links.*` or `companies[].url` may instead be
  *corroborated* when it is a login- or bot-walled profile (linkedin.com, x.com,
  twitter.com) that answered 401/403/429/999 but whose page title names the
  person and is cited in `evidence`. Dead profiles (404/410) are always dropped.
- **Sourced**: every affiliation is either the roster value or backed by an
  `evidence` entry; no affiliation is inferred from a name.
- **Quoted**: every `evidence` string is a verbatim substring of the transcript
  or of the page title it cites.
- **No duplicates**: one URL appears once per dossier; a link that is already a
  person profile is not repeated as a resource.
- **Bounded**: at most 6 resources per talk, chosen for relevance — not a link
  dump.
- **Fresh**: every dossier carries `freshness.phase` and `last_checked`; `phase`
  is `live` while `now` is inside the event, `settling` within 30 days of
  `event.ends_on`, and `settled` after 90 days.
- **Attributed**: a resource's `first_seen` records the render that added it; a
  resource first seen after `event.ends_on` is a post-event publication; when a later
  recheck adds it, `links.md` labels it (e.g. "added 8 days after the talk").

### Continuity

- **input-driven**: a new `talks` receipt (a talk was rendered) or new
  `program` / `speakers` facets.
- **self-driven**: a recheck cadence that follows the event's lifecycle, read
  from `event.ends_on` — never from a fixed wall-clock rule:
  - while the event is live and for **72 hours after it ends**: every 6 hours;
  - **72 hours to 30 days** after: daily;
  - **30 to 90 days** after: weekly;
  - after **90 days**: `settled` — no self-tick. A manual kick or a new `talks`
    receipt still renders.
  A recheck that finds nothing new writes only immaterial fields and stops
  there, so cost decays with the event, not with the clock.

### Errors

- `transcript-unavailable`: the talk file named by `talks` cannot be read; the
  dossier is marked `partial` and the gap named.
- `search-unavailable`: the research render cannot reach the web; the dossier is
  not published this wake (the prior truth stands) and the failure is recorded.
- `write-failed`: `talks/<slug>/links.md` could not be written.

### Strategies

- when the transcript names a blog, repo, paper, or product: verify that URL
  first; a speaker's own mention beats a search result.
- when the roster already carries a profile link: verify it, do not re-search.
- when a speaker has a common name: require a second corroborating signal
  (affiliation, talk title, or a co-speaker) before accepting a profile.
- when a company is large: link the specific product or team the talk covers,
  not the generic homepage, if the talk names one.
- when nothing credible is found: publish the person and company with
  `not-found`, name the searches in `gaps`, and do not pad with weak links.
- on a recheck inside the settling window: spend at most two searches per talk
  looking for material published *after* the talk — the official recording, the
  speaker's recap post, the slides, the paper — and add what verifies. Do not
  re-run the whole person search; the people do not change after the event.
- when a previously verified link stops answering, drop it, record the loss in
  `gaps`, and do not silently keep a dead URL.

### Shape

- `self`: read the talk and the roster, research each person and the talk's
  references, verify every candidate, and write the dossier.
- `delegates`: `research-talk-links`, `verify-url`.
- `prohibited`: inventing URLs, profiles, or affiliations; scraping private
  data; bypassing paywalls or authentication; writing outside
  `talks/<slug>/links.md` and the world-model.

### Runtime

- `persist`: project
