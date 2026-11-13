---
title: "Thariq Shihipar, Independent (The Sweet Side of the Bitter Lesson)"
speakers: "Thariq Shihipar (Independent, formerly Claude Code at Anthropic)"
duration: "19:33"
source: transcript.md
video: "https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=31030s"
themes: [judgment-when-code-is-free, context-for-ai, interaction-modes]
reader: "Will and his clients: why improving models form a versatile 'smooth interior' rather than an alien cage, and how pairing an agentic engine with human-readable specs unlocks a software Renaissance"
built_from_notes:
  - notes/inbox/2026-11-12T1723-bash-is-not-all-you-need.md
  - notes/inbox/2026-11-12T1724-industrial-revolution-vs-renaissance.md
  - notes/inbox/2026-11-12T1725-jagged-edge-vs-smooth-interior.md
  - notes/inbox/2026-11-12T1736-comments-then-tab-interactive-style.md
  - notes/inbox/2026-11-12T1737-taxonomy-of-interaction-modes.md
  - notes/inbox/2026-11-12T1738-revisit-old-hci-research.md
  - notes/inbox/2026-11-12T1739-our-job-is-to-bring-about-the-renaissance.md
built_from_photos: 6
notes_frame:
  spine: "Industrial Revolution vs. Renaissance + smooth interior (3 notes, 4 slide photos): models do not trap us in Bash or React; they create a broad smooth interior where human taste and malleable specs steer a Renaissance"
  clusters:
    - "Interactive development beyond prompt-and-wait: human-readable spec folder + comment-then-tab (2 notes, 1 slide photo)"
    - "Revisit old HCI research & close on Renaissance ambition (2 notes, 1 slide photo)"
    - "Stage opener photo not used as a separate slide (PXL_20261113_012514487.jpg shows title slide 'The Sweet Side of the Bitter Lesson' on stage)"
  skipped: "World of Warcraft opening joke and the 2025 predictions checklist (HTML understanding, video editing, uncovering unknowns — folded into Ch. 1)"
key_points:
  - "Early fears that the Bitter Lesson would trap builders inside Bash CLIs, React, or uncontrollable diffusion art turned out wrong: models adapt smoothly across languages, formats, and tools (00:01:40, 00:06:19)"
  - "AI is simultaneously an Industrial Revolution (software factories making execution reliable) and a Renaissance (rising demand for creativity, spirit, and soul in software) (00:05:09, 00:17:04)"
  - "Below the jagged frontier sits a widening 'smooth interior' where models reliably handle everyday tasks across stacks—illustrated by 12 blind Claude models reconstructing Earth's map up to 99.0% (00:06:19, 00:09:42)"
  - "When vibe coding a fighting game hid too many design choices, splitting an agent-owned engine from an English-like human spec folder—edited via comments and Cursor Tab—restored creative control (00:11:06, 00:13:27, 00:14:15)"
kind: talk-story
status: draft
---

# The sweet side of the bitter lesson

Looking back on a year since leaving the Claude Code team at Anthropic, Thariq Shihipar argues that developers misread the Bitter Lesson (`00:00:00`, `00:01:40`). Instead of forcing humanity to submit to an alien Shoggoth that only speaks Bash and React, scaling models fill in a broad *"smooth interior"* capable of adapting to any language, file format, or creative workflow we want (`00:01:40`, `00:06:19`). The real work now is pairing that industrial engine with human-readable abstractions, new interaction modes, and old HCI ideas to bring about a software Renaissance (`00:05:09`, `00:13:27`, `00:17:04`).

*Framing note: the conference schedule lists this session as `"Thariq Shihipar, Independent"`, while his opening slide and the operator's notes title it `"The Sweet Side of the Bitter Lesson"`. This story is framed from seven inbox notes (plus two cross-talk follow-up notes captured during the talk) and six photos taken in the room (five slide shots straightened into `experience/*.jpg`, with the stage opener `PXL_20261113_012514487.jpg` referenced for the title). Quotes preserve the local Qwen3-ASR 1.7B machine transcription verbatim, including `"Farward"` (Thariq), `"sweet side of the video"` (sweet side of the bitter lesson), `"Cloud code"` (Claude Code), `"finger"` (Figma), `"AGI built"` (AGI-pilled), `"Caparthy"` (Karpathy), `"bod coder"` / `"God putting"` (vibe coder / vibe coding), `"the ball"` (the bot), `"lintered"` (linted), and `"pod"` (Claude). Tokens flagged in the transcript header as transcription-prompt bias (`"Thariq Shihipar"`, `"Dexter"`) are never quoted. `"From the notes"` and `"The reading"` boxes are editorial synthesis, not the speaker's words.*

## Why Bash, React, and the Shoggoth did not trap us

After ticking off three predictions he got right—models editing video, generating HTML to inspect their work, and helping surface unknowns during planning (`00:00:00`)—Shihipar lists three assumptions he got completely wrong (`00:01:40`). First, when agents excelled at Unix pipes and Claude Code centered on Bash, builders assumed every API would collapse into CLIs (`00:01:40`):

> “There is just going to be bash and CLI's, and that's going to like take over the world. That's actually kind of not how it turned out. Like I actually prefer MCP to CLI's now.”
> — 00:01:40

Second, because models wrote React effortlessly, he worried React would become *"the last language"* (`00:01:40`). Instead, frontier models now move fluently across HTML, React, Swift, and even Figma’s proprietary JSON (`00:01:40`):

> “They can write in HTML. They can write in React. They can write in Swift. They can write in the Figma proprietary JSON format.”
> — 00:01:40

Third, instead of diffusion models replacing human creative control with opaque image blobs, LLMs make art through code and computer use in Blender, Photoshop, or Figma (`00:01:40`). All three worries stemmed from the same mistaken assumption about Bitter Lesson scaling (`00:01:40`, `00:04:28`):

> “These were all sort of like fears I had about like I think. The bitter lesson, you know, our alien intelligence.”
> — 00:01:40

> “And so I think the like the question I come back to a lot is like okay like how can we be AGI built and human centered.”
> — 00:04:28

**Key points**

- Early training biases toward Bash and React did not lock software into one permanent tool or UI framework (`00:01:40`).
- With MCP, skills, code mode, and computer use, agents operate across native apps, custom engines, and creative suites (`00:01:40`).
- Software engineers are the leading edge of AI adoption and the first line of defense against slop (`00:04:28`).

<div class="reading"><b>From the notes:</b> “Bash is not all you need; React is not all you need.” (<code>2026-11-12T1723</code>). <b>The reading:</b> This directly answers Philipp Schmid’s <a href="../../2026-11-11-i-deleted-90-of-my-harness-and-it-got-better/experience/page.html">“I deleted 90% of my harness”</a> talk from Wednesday: deleting brittle scaffolding makes sense, yet model generality frees builders from having to force every problem through Bash or React.</div>

**Visual:** photo `photos/PXL_20261113_012832389.jpg` (his slide *"The bitter lesson. Alien intelligence. Shoggoth."* with the smiling-mask Shoggoth illustration)

## Both an Industrial Revolution and a Renaissance

Much of the summit framed AI through *"software factories"*—turning unpredictable craft into reliable, repeatable production (`00:05:09`). Shihipar agrees that industrialization is underway, yet insists a second force is accelerating at the same time (`00:05:09`):

> “What I like to think about it as AI is both at the same time an industrial revolution. And the Renaissance, right?”
> — 00:05:09

When execution ceases to be the bottleneck, user expectations rise rather than fall (`00:05:09`). Generic software loses value while craft, taste, and intentionality regain leverage (`00:05:09`):

> “there's also kind of a Renaissance happening, right? Where people want and higher and higher quality software, and every marginal. Bit of like creativity, utility, like spirit. Like soul that you put into it is like is useful and like economically valuable, right?”
> — 00:05:09

**Key points**

- Industrialization turns software production from flaky manual labor into dependable factory throughput (`00:05:09`).
- Simultaneously, a software Renaissance raises the payoff on every extra ounce of taste, utility, and human spirit (`00:05:09`).
- Holding both halves together—factory reliability without factory blandness—is the central creative challenge (`00:05:09`).

<div class="reading"><b>From the notes:</b> “Comparing it to the Industrial Revolution vs the Renaissance.” (<code>2026-11-12T1724</code>). <b>The reading:</b> Placed right after Quinn Slack’s agent-factory talk and Dexter Horthy’s 12-Factor Factories, Shihipar supplies the closing corrective: efficiency without soul only produces faster commodity software.</div>

**Visual:** photo `photos/PXL_20261113_012939440.jpg` (his slide *"AI is both an industrial revolution and a renaissance"* pairing interlocking blue gears with a golden flower)

## Forget the jagged frontier—look at the smooth interior

Benchmarks obsess over the **jagged frontier**: can a model build Mario Kart from scratch or port it to the Wii (`00:06:19`)? Inside that frontier, however, models form a steadily expanding **smooth interior** where capabilities stop being spiky (`00:06:19`):

> “And what you see is that like it's not jagged below the frontier, right? Like if. It can write React. It can write Figma. It can write JSON. It can do sort of like all of these capabilities all together.”
> — 00:06:19

That smoothness explains why builders can ask for a mockup in HTML, React, Figma, or After Effects and expect competence across all of them (`00:06:19`). To visualize how broad general knowledge has become underneath benchmarks, he shows a grid of twelve "blind" Claude models asked simply whether 16,200 lat/long points are land or water (`00:09:42`)—moving from blurry continents on Sonnet 4.5 (60.5%) to near-photographic Earth fidelity on Opus 5.5 (99.0%). As reliability fills in that interior, QA-heavy scaffolding shrinks (`00:06:19`) and builders can turn intelligence back onto shaping their own workflows (`00:09:42`):

> “And what's exciting, I think, about this is that we can use. Intelligence to understand and shape how we use intelligence, right?”
> — 00:09:42

**Key points**

- Below the headline-grabbing jagged frontier lies a smooth interior where models cross languages and media formats fluently (`00:06:19`).
- Pretraining recall across 12 blind Claude models rose from 60.5% to 99.0% land/water fidelity, illustrating breadth beyond narrow coding evals (`00:09:42`).
- Stronger general intelligence lets teams spend less effort fighting model quirks and more effort designing ideal human workflows (`00:06:19`, `00:09:42`).

<div class="reading"><b>From the notes:</b> “Jagged edge vs the smooth interior.” (<code>2026-11-12T1725</code>). <b>The reading:</b> Smoothness is the “sweet side” of the Bitter Lesson: scaling didn't trap developers in one preferred format—it erased the penalty for picking the representation humans actually prefer.</div>

**Visual:** photo `photos/PXL_20261113_013435497.MP.jpg` (his slide *"How much each model has memorized from pretraining"* showing the 12-panel *"How 12 blind Claudes see the Earth"* grid from Sonnet 4.5 at 60.5% to Opus 5.5 at 99.0%)

## Where vibe coding hits a wall: losing touch with your own game

Testing his own thesis on a 2D isometric fighting game inspired by *Avatar* and *Smash Bros.*, Shihipar ran straight into vibe coding’s creative ceiling (`00:11:06`). Ask an agent to let a character *"throw a rock"*, and dozens of hidden choices vanish inside generated code: can the rock smash through summoned walls, how fast does it fly, how does charge scale (`00:11:06`)?

> “I find that like the ball just makes a bunch of choices for me, and then I try it out. I'm like, wow, I have no idea what that actually does.”
> — 00:11:06

Worse, firing off prompts and tabbing away destroys flow (`00:11:06`). Echoing earlier conference themes on judgment, he argues that great creative work emerges from messy iteration and deliberate exclusion (`00:11:06`):

> “It's more about the choices you made and what wasn't involved. Or was it what wasn't included versus like what was included”
> — 00:11:06

**Key points**

- Prompt-and-wait vibe coding delegates hundreds of subtle game-feel and product decisions invisibly to the model (`00:11:06`).
- Context-switching while waiting on long agent turns breaks creative flow and slows genuine taste iteration (`00:11:06`).
- Making something worthy of a Renaissance requires owning what is included, tuned, and left out (`00:11:06`).

<div class="reading"><b>From the notes:</b> Bridge from the Renaissance thesis (<code>2026-11-12T1724</code>) into his live game demo (<code>2026-11-12T1736</code>). <b>The reading:</b> Even an author of Claude Code hits the “comprehension wall” when prompting hides design parameters inside opaque implementation files.</div>

**Visual:** photo `photos/PXL_20261113_013532470.jpg` (his slide *"I've been building a game"* showing a screenshot of the circular isometric fighting arena with two characters across a glowing stream)

## Splitting `engine/` from `human/`—and the comment-then-tab loop

To stay in the driver's seat without writing camera math by hand, Shihipar split his repository in two (`00:13:27`):

> “I've got like this like engine part of the codebase, and then I have a folder. Like I think I call it spec, but I think I'm just calling it human or something. And that folder is the code that I write.”
> — 00:13:27

The `engine/` directory stays agent-owned (`00:14:15`). The `human/` (or `spec/`) folder is heavily linted for Claude so it stays concise, domain-unit-driven (meters instead of raw normalized floats), and legible enough to function as ground truth (`00:13:27`, `00:14:15`):

> “It's supposed to feel like English. It's kind of like a spec, and I'll show you what it looks like. But it's at the density where, if I just read this code, I know what's happening, and I can edit it. I can tweak it. But more importantly, I just like you know can have a bit of a ground truth of like what the what my game looks like.”
> — 00:13:27

In his live demo (`00:14:15`), he adjusts rock scale directly in the IDE and uses an interactive **comment-then-tab** loop in Cursor: writing a quick inline comment (*queue a rock throw if a wall is summoned mid-move*) and letting the Tab model autocomplete the custom scripting logic while Claude implements deeper primitives underneath (`00:14:15`):

> “If you summon a wall in the middle, like queue it up as an action, and then cursor will sort of like. You know, do the tab completion. And this is kind of like it's kind of like spec-driven development, you know, but the spec is like. This, this scripting language, basically.”
> — 00:14:15

**Key points**

- Separate opaque infrastructure (`engine/`) owned by agents from an English-density, linted `human/` spec layer owned by the creator (`00:13:27`, `00:14:15`).
- Expressing domain logic in human units (meters, ability rules) turns code into an inspectable custom scripting language (`00:13:27`, `00:14:15`).
- Writing inline comments and hitting Tab unlocks fast, synchronous co-creation that sits outside slow async chat loops (`00:14:15`).

<div class="reading"><b>From the notes:</b> “He's using comments and then tab-writing as an interactive development style.” (<code>2026-11-12T1736</code>) and “There are a bunch of different modes of development we aren't talking about. There's no taxonomy of the different interaction modes. We need to follow up on this.” (<code>2026-11-12T1737</code>). <b>The reading:</b> Most teams only talk about chat prompts vs. background agents; Shihipar’s DSL + comment-then-tab style points to a whole missing taxonomy of tight human-AI interaction modes.</div>

**Visual:** diagram “Two-layer repo + comment-then-tab loop: Agent-owned engine/ (cameras, primitives) ↔ Human-owned linted spec/ (English-like DSL in meters) ↔ Creator writes comment → Tab completes → Live play”

## Revisit old HCI research and bring about the Renaissance

Once the smooth interior means models can target hot-reloading languages, new database primitives, OS-level personal software, and malleable tools (`00:17:04`), the bottleneck shifts back to interaction design—and decades of shelved Human-Computer Interaction research suddenly become buildable (`00:17:04`):

> “A lot of like old HCI research is now like very interesting to revisit.”
> — 00:17:04

Shihipar closes the summit’s technical arc by putting responsibility back on builders (`00:17:04`). Models are flexible enough to meet whatever creative workflow we design; deciding what the future of software feels like is ours (`00:17:04`):

> “Because the models are not, you know, this alien intelligence that's like trying to force us into a specific way of working. They can kind of do everything, and they will, but our job is to like bring about the renaissance.”
> — 00:17:04

**Key points**

- Model flexibility opens room for hot-reloading languages, personal OS tools, new aesthetics, and malleable software (`00:17:04`).
- Decades of neglected HCI interaction concepts are ripe for revival now that implementation cost has collapsed (`00:17:04`).
- Builders—not the Bitter Lesson—decide whether AI yields uniform industrial output or a software Renaissance (`00:17:04`).

<div class="reading"><b>From the notes:</b> “Revisit old HCI research.” (<code>2026-11-12T1738</code>), “Our job is to bring about the Renaissance.” (<code>2026-11-12T1739</code>), plus follow-up notes on Brandon Thomas’s ArtCraft (<code>2026-11-12T1740-follow-up-artcraft-talk.md</code>) and Armin Ronacher’s “The Software Atelier” (<code>2026-11-12T1740-follow-up-pi-talk.md</code>). <b>The reading:</b> Together with Ronacher’s atelier framing, Shihipar’s closing keynote gives Will and TheFocus.AI clients a concrete craft rule: use factories for the engine, and design human-legible, malleable surfaces for everything users touch.</div>

**Visual:** photo `photos/PXL_20261113_014241094.MP.jpg` (his closing slide *"What a renaissance could bring"* showing seven tiles: *New languages (Fast, expressive, hot reloading)*, *New primitives*, *New operating system interactions*, *New personal software*, *New interaction paradigms*, *New aesthetics*, and gold-highlighted *Malleable software*)
