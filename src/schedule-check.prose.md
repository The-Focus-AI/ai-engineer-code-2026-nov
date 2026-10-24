---
name: schedule-check
kind: gateway
version: 0.1.0
---

# Schedule Check

> Ingress for the one tracked conference. The repo is cloned per conference, so
> the URL is runtime configuration (`CONFERENCE_URL`) rather than payload: this
> gateway carries *when* to re-verify, never *what* to verify.

### Continuity

- external-driven

### Schedule

- `0 */6 * * *` — the coarse six-hour tick. The tracked responsibility tightens
  to hourly inside its live window; that policy lives in
  `conference-schedule` → `### Continuity`, not here.

### Receives

- POST /webhooks/conference/check
- Provider: local operator (manual kick) or the cron adapter
- Event: `check-requested`

### Maintains

- `check_requests`: `{ items: [{ request_id, reason, requested_at }], received_at }` —
  the latest request to re-verify the tracked conference.

**Canonicalization spec**:

- **Material**: `reason` (a `manual-kick` is a genuinely different request from a
  `cron-tick`) and the request id set.
- **Immaterial** (excluded from the fingerprint): `requested_at` and the
  transport `received_at`. A re-delivered tick must not masquerade as surprise.
- Ordering by `request_id` before hashing.

### Emits

- `conference-schedule`

### Payload

No conference payload. The URL and timezone come from the runtime environment
(see `### Environment` on `conference-schedule`).
