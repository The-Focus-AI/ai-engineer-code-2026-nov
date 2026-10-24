---
name: conference-init
description: Turn a fresh template clone into one conference build. Use on first startup when brief/, state/, and talks/ are absent or gitignored, or when the user asks to start a new conference from this template.
---

# New conference

The upstream repo is a **template**: it carries the program engine, the contracts,
the skills, and the design language, but no conference data. This skill is the
one-time conversion into a **conference build** that tracks its own data.

One clone = one conference. Never initialize a second conference in an existing
build; fork or clone again.

## 0. Decide whether this is the template

```bash
git check-ignore brief/ state/ talks/
```

- All three print a path: this is the template. Continue.
- None print and `state/world-model/*/published/event/event.json` exists: a build
  already exists. Stop and report it.
- None print and there is no event truth: the fence was already removed. Continue
  at step 1 with an empty build.
- Mixed: stop. Do not guess which files belong to which mode.

If `.env` exists and `CONFERENCE_URL` points at the conference already present
under `state/`, this is a build. Do not reinitialize it.

## 1. Get the conference URL

Ask for the schedule URL. Never invent it, and do not reuse another build's URL
unless the user explicitly says this is that conference. If the user is in
the upstream template, tell them to fork or clone first; the upstream must stay
clean.

Record, but do not guess:

- the schedule URL
- the conference name and short slug
- the timezone only if the page does not publish it
- dates only if the page does not publish them

## 2. Remove the template fence

`.gitignore` has a marked block:

```text
# BEGIN conference build data
…
# END conference build data
```

Delete the block, including both marker lines. This is the mode change: the fork
now tracks its own `brief/`, `state/`, `talks/`, `recordings/inbox/`, `photos/`,
`analysis/`, `editorial/`, `explainers/<slug>/`, and `magazine/<issue>/`.

Do **not** delete the rest of `.gitignore`. `dist/`, `runs/`, `.env`, raw audio,
raw photos, and package caches stay ignored in a build.

## 3. Configure

```bash
cp .env.example .env          # set CONFERENCE_URL
mise install
bun install
```

Do not commit `.env`.

## 4. Build the schedule truth

In the agent:

```text
prose compile
```

Promote the compile (plain file copy):

```bash
cp dist/manifest.next.json dist/manifest.active.json
```

Then run the schedule node, either as one wake or under serve:

```text
prose run src/conference-schedule.prose.md
```

or `prose serve` and keep the session open.

This writes `state/world-model/conference-schedule/published/` and
`brief/schedule.md`.

## 5. Verify before committing

- `brief/schedule.md` has a masthead, venue, and day-by-day sessions.
- `state/world-model/conference-schedule/published/event/event.json` has the
  right name, dates, and timezone.
- The parsed session count reconciles with the page's stated total. If it does
  not, stop and report the coverage gap; do not publish a partial schedule as if
  it were whole.

## 6. First commit

```bash
git add .gitignore .env.example
git commit -m "conference: initialize <name>"
```

Then commit the build data as it lands:

```bash
git add brief state
git commit -m "conference: first schedule render"
```

`brief/` and `state/` are tracked **on purpose** in a build. Their diffs are the
audit trail of what the conference changed.

## 7. Continue

- Recordings: `mise run sync`, then run `recording-intake`.
- Photos: `mise run photos`, then run `talk-photos`.
- Talks: `/talk-ask`; patterns: `/conference-themes`.
- Artifacts: `/conference-hooks`, `/conference-explainer`, `/conference-magazine`.
- Before calling it done: `mise run validate` and `mise run typecheck` pass.

## Boundaries

- Do not rewrite history to remove another conference. Start a new fork.
- Do not copy another conference's build into this one.
- Do not delete `.gitignore`; delete only the marked block.
- If a step fails, leave the last-good truth standing and report the failed
  receipt; do not publish a half-built schedule.
