---
captured_at: 2026-11-12T16:36:00-08:00
kind: observation
session_id: "1373474"
talk: talks/2026-11-12-post-training-gemini-4-for-real-engineering-work/
tags: [post-training, reward-hacking, chain-of-thought]
---

Penalize the cheating, but not the thoughts.

In Melvin Johnson's "Post-Training Gemini 4 for Real Engineering Work" (Google DeepMind; 1373474, Mainstage), following "check carefully that there are no workarounds" (2026-11-12T1628-check-for-no-workarounds.md). Read as: in training, penalize the model for actually gaming a check, but not for considering it in its reasoning; penalizing the thoughts teaches the model to hide them, which makes the reasoning less useful for spotting cheating.
