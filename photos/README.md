# Photos

The raw photo drop. Photos are filed into the talk they belong to; the drop
itself is read-only.

```
photos/
  PXL_20261013_151041463.jpg        the export, untouched
  manifest.json                     capture time, hash, dimensions, burst
  event/2026-10-13/                 breaks, receptions, hallway — event-level
```

## Inventory

```bash
mise run photos-dry   # show the inventory
mise run photos       # write photos/manifest.json
```

## Time convention

Pixel filenames (`PXL_YYYYMMDD_HHMMSSmmm`) are **UTC**. The conference timezone
comes from the schedule truth (`event.timezone`), so `captured_at_local` is
unambiguous. EXIF `DateTime` is local and is used only as a cross-check; the
inventory reports any disagreement over two minutes. Do not compare a raw
filename against a local session time — that is a four-hour error.

## Filing

`talk-photos` (`src/talk-photos.prose.md`) decides where each photo goes:

1. a matched recording whose window contains the photo → that talk;
2. exactly one session in the window → that talk;
3. a break / registration / expo / reception window → `photos/event/<date>/`;
4. two or more talk candidates and no recording → `needs-review`, left in place;
5. nothing → `unplaced`.

Photos are **copied** into `talks/<slug>/photos/`; the original is never moved or
edited. Every placement records its method and evidence in
`state/world-model/talk-photos/`.

## Cleaning (not built yet)

Centre/crop the slide or the speaker, deskew a photo taken from a seat, remove
the motion-photo clip, strip GPS. That is a separate image-editing step — the
current render files the original bytes.
