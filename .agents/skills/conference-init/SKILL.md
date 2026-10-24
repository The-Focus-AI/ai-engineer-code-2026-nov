---
name: conference-init
description: Create a new conference build as a separate directory and repository. Use when starting a new conference from the master template; clones the template to a sibling directory, removes the conference fence, and initializes the archive repo.
---

# New conference build

The master repo is the **template**. A conference build is its own directory and
its own git repository. It is not a branch.

One directory = one repo = one conference.

## 0. Run this from the master

```bash
git check-ignore brief/ state/ talks/
```

- All three print: this is the template. Continue.
- None print: this is already a build. Stop; do not initialize it again.

The master and the build are different directories. Never run this from inside
an existing build.

## 1. Ask for the build identity

- **Target directory** — default `../conference-<slug>` (a sibling of the
  master, not inside it).
- **Conference URL** — the schedule page. Never invent it.
- **Repository** — default `<owner>/conference-<slug>`, private unless the user
  says public.
- Timezone and dates only if the source page does not publish them.

## 2. Clone the template to the new directory

```bash
git clone <template-url> <target-dir>
cd <target-dir>
git remote rename origin template
```

Use the master's `origin` URL. If the master has no remote, use its absolute
path as the clone source and skip the GitHub steps.

Do not copy the master's `.env`, `dist/`, `runs/`, raw media, or node_modules.

## 3. Remove the conference fence

`.gitignore` has:

```text
# BEGIN conference build data
…
# END conference build data
```

Delete the whole block. This is the mode change: this repo now tracks its own
`brief/`, `state/`, `talks/`, `recordings/inbox/`, `photos/`, `analysis/`,
`editorial/`, `explainers/<slug>/`, `atlases/<slug>/`, and `magazine/<issue>/`.

Do **not** delete the rest of `.gitignore`. `dist/`, `runs/`, `.env`, raw audio,
raw photos, and package caches stay ignored in every build.

## 4. Configure

```bash
cp .env.example .env          # set CONFERENCE_URL
mise install
bun install
```

Do not commit `.env`.

## 5. Create the archive repository

```bash
gh repo create <owner>/conference-<slug> --private --source=. --remote=origin
git add .gitignore .env.example
git commit -m "conference: initialize <name>"
git push -u origin main
git remote remove template
```

If the user does not want a remote yet, run `git init` and commit locally; the
directory is still a separate repo. The archive must not pull the master; its
`origin` is its own repo.

## 6. Build the schedule truth

In the agent:

```text
prose compile
```

Promote the compile:

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

## 7. Verify before committing data

- `brief/schedule.md` has a masthead, venue, and day-by-day sessions.
- `state/world-model/conference-schedule/published/event/event.json` has the
  right name, dates, and timezone.
- The parsed session count reconciles with the page's stated total. If it does
  not, stop and report the coverage gap; do not publish a partial schedule as if
  it were whole.

Then commit the build data:

```bash
git add brief state
git commit -m "conference: first schedule render"
git push
```

`brief/` and `state/` are tracked on purpose in a build. Their diffs are the
audit trail of what the conference changed.

## 8. Continue

- Recordings: `mise run sync`, then run `recording-intake`.
- Photos: `mise run photos`, then run `talk-photos`.
- Talks: `/talk-ask`; patterns: `/conference-themes`.
- Artifacts: `/conference-hooks`, `/conference-explainer`, `/conference-magazine`.
- Talk stories: `/conference-next` → `/talk-polish` → `/talk-page`.
- Before calling it done: `mise run validate` and `mise run typecheck` pass.

## Boundaries

- No branches for builds. A branch in the master is not an archive.
- Never initialize a second conference in an existing build; clone again.
- Do not copy the NYC build into a new conference.
- Do not delete `.gitignore`; delete only the marked block.
- If a step fails, leave the last-good truth standing and report the failed
  receipt; do not publish a half-built schedule.
