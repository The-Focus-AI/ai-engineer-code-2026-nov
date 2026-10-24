# Recordings

The drop folder. A recording arrives here as a folder; the Prose program turns it
into a talk.

```
recordings/inbox/2026-10-13_0904_Blackwater/
    audio.m4a               the original, untouched
    transcript.txt          Apple's transcript, already embedded in the m4a
    transcript.words.json   word + sentence timings
    meta.json               title, recorded_at, duration, word count, hashes
    attachments/            any images/PDFs that arrived with it
```

## Moving files in (the only mover)

```bash
mise run dry-run   # what would move
mise run sync      # move it
```

`mise run sync` runs [export-voice-memos.ts](../scripts/export-voice-memos.ts),
which does exactly four things: find the Voice Memos library, copy each `.m4a`
**inside the conference window** into a folder, extract the transcript Voice
Memos already embedded in it, and write `meta.json`. It does not match, judge,
or clean anything.

The window is the tracked event's `starts_on`/`ends_on` (from
`state/world-model/conference-schedule/published/event/event.json`), padded by
one day on each side — so a conference clone never hoovers up years of unrelated
memos. Override it for one run with `--since 2026-10-10 --until 2026-10-15`, set
`RECORDINGS_SINCE`/`RECORDINGS_UNTIL` for a different default, or pass `--all`
to export everything. With no window and no flags the script refuses rather than
silently exporting the whole library.

It needs **Full Disk Access** for the terminal or app running it:

```
System Settings → Privacy & Security → Full Disk Access → + → add the app
quit and reopen it (TCC is read at launch)
```

Re-running is idempotent — audio is keyed by sha256 in each `meta.json`, so only
new recordings move.

### Where the transcript comes from

Voice Memos writes an `udta/tsrp` box inside every recording: JSON with a
`locale` and an `attributedString` whose `runs` alternate text with indexes into
`attributeTable`, each entry `{"timeRange": [start, end]}`. That is Apple's own
recogniser, word-timed, covering the whole recording — **86 of 87 recordings in
this library carry one**. It is not in `CloudRecordings.db`, which has no
transcript table; looking there finds nothing and wrongly concludes the audio is
untranscribed.

`meta.json` records `title` (from the m4a `©nam` — the label you typed, e.g.
`Blackwater`, `Air Canada`, `apify`), `recorded_at`, `duration_seconds`, word
count, locale, and the audio hash.

## Turning recordings into talks (the Prose program)

[mise run sync] only moves bytes. Everything semantic lives in
[src/recording-intake.prose.md](../src/recording-intake.prose.md):

```
recording-inbox-watch (gateway, every 15 min + manual kick)
      │  maintains: inbox_scans (folder fingerprint — a tick with no arrivals moves nothing)
      ▼
recording-intake (responsibility)
      │  scan-recording-inbox      → index the folder, hash audio, carry prior state
      │  identify-recording-talk   → which session? evidence-quoted, or needs-review
      │  clean-talk-transcript     → talks/<date>-<slug>/transcript.md
      │  place-talk-attachments    → inline at a timestamp, or listed
      ▼
talks/2026-10-13-beyond-done/
      transcript.md            schedule frontmatter + timestamped sections + Q&A
      attachments/             images/PDFs that travelled with the recording
```

Rules the program enforces:

- **No evidence, no match.** A talk is only claimed when the transcript contains a
  verbatim quote naming the talk, the speaker, or their company. Time and duration
  narrow the field; they never decide alone.
- **Ambiguity is an outcome.** Two candidates with evidence → `needs-review`, both
  quoted. A guessed match is worse than an admitted one.
- **Faithful cleaning.** Fillers, punctuation, paragraphing, headings, Q&A split.
  No paraphrase, no summary, no invented sentence. Technical terms stay as
  transcribed, even when the ASR mangled them.
- **The inbox is read-only.** Raw audio, transcript, and meta are never edited or
  deleted; attachments are copied into the talk folder.
- **Schedule metadata is copied, not retyped.** Title, speakers, room, and time
  come from the schedule truth, so a schedule correction propagates.

## Status terminology

| `status` | Meaning |
|---|---|
| `new` | indexed, not yet looked at |
| `identified` | matched to a session, no talk written yet |
| `needs-review` | recording is real, the talk is undecided (candidates listed) |
| `cleaned` | talk written at `talks/<slug>/transcript.md` |
| `failed` | audio without a transcript, or an unreadable folder |
