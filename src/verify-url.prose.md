---
name: verify-url
kind: function
version: 0.1.0
---

# Verify URL

> A link is published only if it answered. Fetch, follow, and report; no guesses.

### Description

Fetches each candidate URL once, follows redirects, and returns the status, final
URL, and page title. Rejected candidates are named with a reason. This is the gate
between "a search result" and "a link in the dossier".

### Parameters

- `urls`: candidate URLs, already deduplicated by the caller.
- `timeout_seconds`: optional per-request timeout (default 10).

### Returns

- `verified`: `[{ url, final_url, status, ok, title, content_type }]` where `ok`
  is a 2xx or a 3xx that settled on a 2xx.
- `rejected`: `[{ url, reason }]` — timeout, non-HTML, login wall, 404/410.

### Invariants

- One unauthenticated `GET` (or `HEAD` when the server allows it), redirects
  followed, no cookies, no credentials, no paywall bypass, no JavaScript
  execution.
- `title` comes from the page's `<title>` or `og:title`; a page without one gets
  `null`, never an invented title.
- `final_url` is the URL that actually served the content; tracking parameters
  are stripped from the reported form.
- A URL that resolves to a login, consent, or error page is rejected with that
  reason, even if the status is 200.
- Private or localhost addresses are never fetched.

### Strategies

- when a request times out or returns 5xx: retry once after two seconds, then
  reject.
- when a redirect chain exceeds five hops: reject.
- when the content type is not HTML/PDF/text: accept the URL but report the type
  so the caller can decide.
- when the same URL differs only by trailing slash, `www.`, or fragment: verify
  one canonical form.

### Shape

- `self`: fetch and report; no writes beyond the network read.
- `prohibited`: inventing a status or a title; retrying a 404; bypassing a wall.

### Runtime

- `persist`: true
