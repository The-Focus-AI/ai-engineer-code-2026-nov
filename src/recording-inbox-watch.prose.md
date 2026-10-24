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
  `audio_sha256`), `folder_count`, and `latest_recorded_at`. A new recording, a
  replaced audio file, or a deleted folder moves the fingerprint; nothing else
  does.
- **Immaterial** (excluded): `scanned_at` and any filesystem mtimes. A tick is not
  a change.
- The fingerprint is computed by reading the folder, never cached across wakes.

### Emits

- `recording-intake`

### Payload

None. The inbox path is runtime configuration (`RECORDINGS_INBOX`, default
`recordings/inbox`) declared on `recording-intake`.
