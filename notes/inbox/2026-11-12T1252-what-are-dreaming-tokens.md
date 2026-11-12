---
captured_at: 2026-11-12T12:52:00-08:00
kind: question
session_id: "1379010"
talk: talks/2026-11-12-exploring-claudes-frontier/
tags: [memory, dreaming, tokens]
---

I want to know what dreaming tokens are.

In Lance Martin's "Exploring Claude's frontier" (1379010), during the memory part of the talk (see 2026-11-12T1248, 1249 and 1251 notes). A likely lead, not confirmed from the talk: Claude Code has a background memory-consolidation step called "auto-dream" (the `autoDreamEnabled` setting), where idle time is spent reorganizing memory, so "dreaming tokens" may be the tokens spent on that consolidation rather than on the task. Check against the recording.

Answered by the recording (talks/2026-11-12-exploring-claudes-frontier/transcript.md, claims 1379010-733-6a4275 and 1379010-915-2e0e17 in talk-insights): dreaming is a separate pass where Claude reviews session transcripts and memory notes, fixes them, builds new representations such as a wiki, and promotes memories into every session's context. Dreaming tokens are the tokens spent on that pass; on the Stainless corpus the wiki got better the more dreaming tokens it was given, and beat semantic search alone. His post "The components of agent memory" is on the talk's links page.
