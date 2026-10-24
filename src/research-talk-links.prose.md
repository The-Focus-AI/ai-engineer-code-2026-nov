---
name: research-talk-links
kind: function
version: 0.1.0
---

# Research Talk Links

> One talk, one dossier candidate set: the speaker, the company, and the few
> sources that genuinely belong to the talk. Candidates only — verification is a
> separate call.

### Description

Given a talk's title, abstract, speakers, and transcript, proposes people,
companies, and at most six external resources, each with the evidence that
connects it to this talk. It never invents a URL; it returns candidates for
`verify-url` to accept or drop.

### Parameters

- `session_id`: the talk's session id.
- `title`, `abstract`: the schedule truth for the talk.
- `speakers`: the roster entries — `name`, `affiliation`, and any known links.
- `transcript`: the rendered talk text, or `null` when unavailable.
- `room`, `starts_at`: context that disambiguates a common name.

### Returns

- `people`: `[{ name, role, affiliation, links: { site, linkedin, x, github, scholar }, evidence: [String], status }]`
- `companies`: `[{ name, url, what, evidence: [String] }]`
- `resources`: `[{ type, title, url, why, evidence: [String] }]` — at most 6
- `gaps`: `[String]` — what was searched and not found

### Invariants

- Every `evidence` string is either a verbatim transcript quote or the exact
  title of the page it cites.
- Every URL is a candidate: nothing is presented as verified here.
- At most six resources; relevance beats volume.
- A person with no credible profile is returned with `status: not-found`, not
  with an unrelated homonym.
- No private or authenticated data; no paywall bypass; no contact guessing.

### Strategies

- read the transcript first for self-introductions ("I'm X from Y"), product
  names, blog/repo mentions, and "we wrote a post about this" lines.
- search `name + affiliation`, then `name + talk title`; a hit that shares two of
  {name, affiliation, topic} is a candidate.
- for a company, prefer the product page the talk discusses over the homepage.
- for a paper, prefer the arXiv/DOI page over a news write-up.
- when the talk has no transcript, work from the abstract and roster and say so
  in `gaps`.

### Shape

- `self`: read, search, and propose; no writes.
- `prohibited`: fabricating a URL or a profile; citing a page that was not read.

### Runtime

- `persist`: true
