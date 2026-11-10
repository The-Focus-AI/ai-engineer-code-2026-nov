---
name: recording-inbox-watch
kind: gateway
version: 0.2.0
---

# Recording Inbox Watch

> The only thing this gateway knows is *whether the inbox changed*. It scans the
> drop folder, fingerprints it, and lets the reconciler decide whether the
> expensive render is worth running. Fifteen minutes of polling with no arrivals
> costs nothing downstream.

### Continuity

- external-driven

### Schedule

- `*/15 * * * *` — a tick every fifteen minutes. A dropped recording can also be
  kicked by hand without waiting for the tick.

### Receives

- POST /webhooks/recordings/scan
- Provider: local operator, or the cron adapter
- Event: `scan-requested`

### Maintains

- `inbox_scans`: `{ folder_fingerprint, folder_count, latest_recorded_at, scanned_at }` —
  the latest observed state of the recording drop folder.

**Canonicalization spec**:

- **Material**: `folder_fingerprint` (a hash over the sorted folder names plus each
  `audio_sha256`, with an `untranscribed` mark on any folder that has audio but
  no `transcript.txt` yet), `folder_count`, and `latest_recorded_at`. A new
  recording, a replaced audio file, a deleted folder, or a deferred transcript
  arriving moves the fingerprint; nothing else does. A folder that already had
  its transcript hashes exactly as it did before the mark existed.
- **Immaterial** (excluded): `scanned_at` and any filesystem mtimes. A tick is not
  a change.
- The fingerprint is computed by reading the folder, never cached across wakes.

### Emits

- `recording-intake`

### Payload

None. The inbox path is runtime configuration (`RECORDINGS_INBOX`, default
`recordings/inbox`) declared on `recording-intake`.
