---
name: place-talk-attachments
kind: function
version: 0.2.0
---

# Place Talk Attachments

> Side files are evidence with a timestamp problem. If a photo or slide can be
> placed at a moment in the talk, put it there; if it cannot, list it honestly.

### Description

Copies non-audio files that travelled with a recording into the talk's
`attachments/` folder, and records whether each belongs inline at a timestamp or
in a list at the end of the document.

### Parameters

- `talks`: the rendered talks (`slug`, `path`, `session_id`, `starts_at`,
  `duration`, `source_recording`).
- `inbox`: the drop folder, where each recording's `attachments/` lives.

### Returns

- `attachments`: `[{ talk_slug, path, placement, at_seconds, caption, source }]`
  where `placement` is `inline` or `listed`, `at_seconds` is null unless inline,
  and `source` is the original path inside the inbox.

### Invariants

- **Copy, never move.** The inbox copy is left untouched; the talk folder gets its
  own copy. Deleting raw material is never this function's job.
- Only media and document types are placed: images, PDFs, video. Anything else is
  reported and left alone.
- `placement: inline` requires an `at_seconds` that falls inside
  `[0, duration]`, derived from a defensible timestamp (EXIF `DateTimeOriginal`, or
  a timestamp in the filename). An unplaceable file is `listed`.
- `at_seconds` refers to the *talk's* timeline. If the attachment timestamp is
  earlier than the recording start, it cannot be inline.
- `caption` is derived from the filename when that is meaningful, else null. No
  caption is invented from an image's presumed content.
- A path that escapes the talk directory, or a symlink, fails with
  `attachment-unsafe` rather than being copied.
- Re-running over the same talk does not duplicate files or rewrite the document
  unless the attachment set actually changed.

### Strategies

- when several screenshots share a timestamp minute: place them in filename order
  at the same `at_seconds`.
- when an image has no EXIF and no timestamped name: list it under "Attachments"
  at the end of the talk; a reader can still see it.
- when a PDF looks like the deck (name contains "slide"/"deck"/the talk title):
  list it prominently at the top rather than guessing a slide-by-slide position.
- when the file is a photo of a whiteboard taken after the talk: list it; it is
  evidence about the talk, not a moment inside it.

### Shape

- `self`: match side files to talks, copy them into place, compute inline anchors
  from real timestamps, and record the placement.
- `prohibited`: moving or deleting inbox files, inventing captions or positions,
  copying non-media files, or writing outside `talks/<slug>/attachments/`.

### Runtime

- `persist`: true
