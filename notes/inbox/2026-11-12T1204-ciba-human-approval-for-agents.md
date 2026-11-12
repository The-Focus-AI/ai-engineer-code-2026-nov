---
captured_at: 2026-11-12T12:04:00-08:00
kind: observation
session_id: "1379052"
talk: talks/2026-11-12-talk-but-verify-human-in-the-loop-for-agents-that-actually-matter/
tags: [ciba, token-vault, human-in-the-loop, auth]
---

CIBA (Client-Initiated Backchannel Authentication, an OpenID Connect extension): the app asks the identity provider directly, and the user approves on a separate device, usually a push notification on their phone. For agents: no browser session needed, and a human approves a specific action when it happens ("your agent wants to do X, approve?").

Paired with Token Vault (scoped access to third-party APIs), it's the pattern for agents: limit what they can touch, and ask a human before the sensitive step. See 2026-11-12T1154-token-vault-limits-agent-scopes.md.

Explanation written by Claude in chat when the user asked "what is ciba"; the user said to note it. Linked to Michael Liendo's "Talk But Verify" (1379052) on the same basis as the token vault note.
