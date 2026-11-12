---
title: "How to build an agent that builds the culture"
speakers:
  - name: Zach Bruggeman
    affiliation: Ramp
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-11T16:50:00-08:00
ends_at: 2026-11-11T17:10:00-08:00
format: talk
recording: 2026-11-11_1648_Zach-Bruggeman
duration: 506
source: qwen3-asr-1.7b
---

> Partial recording. The operator cut this talk short
> (notes/inbox/2026-11-11T1705-cut-talk-short.md): the recording runs 16:48:38–16:57:04 against
> the 16:50–17:10 slot, so it covers only about the first seven minutes of the talk and ends
> mid-talk. It opens with room chatter before the talk; the speaker begins at 00:01:26.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names and affiliations of overlapping sessions. "Steve Yegge" at 00:00:52, in the chatter
> before the talk, comes from that prompt, not the audio (the Voice Memos transcript has "We are
> going too much" there). "Ramp" may too, though the Voice Memos transcript also has "ramp" and
> "Ramp". Inspect is also "Inspire" and "inspect". The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Before the talk

Like, kind of get tranced out with this music. Thank you so much. So second here. Any Forty Niners fans? Okay, you know that's a better reaction I've gotten in other events. This year, when I've asked you about their local sports teams, I've gotten a lot of just like muted signs that hit the you know. Well, wrong audience for that type of joke, but glad we didn't have this time.

We're all just here for this one. That's why we're here, though. Yeah, also Steve Yegge. We should have like a standard, like. Your slides are on this URL.

### 00:01:26 — Introduction: Inspect at Ramp

All right. Good. Well, thanks so much for waiting, everyone. My name is Zach, and I'm an engineer at Ramp. I'm just really excited to tell you all a bit about how Ramp has evolved its engineering culture this year through the help of our robotic friend, Inspect. As a quick introduction, Inspect is Ramp's collaborative coding agent. About a year ago, we decided to take a bet on building our own coding agent, with every session running remotely and being fully multiplayer.

Inspect can work alongside you and your team rather than inspect itself. Slack. Linear or any other of our interventions, and now it goes far beyond just writing the code. With development design primitives, review agents, and verification players that let. Any builder go from prompt to shipping, all in sight and fact. Inspect is also connected with all of our integrations company wide. So everyone's automatically connected to the data and tools that matter most, whether that be telemetry.

Databases, or any of the other tools available. Through this, we now see around seventy-five percent of all of Ramp's code. Being written and shipped by Inspire. When we started sharing Inspect publicly at the start of the year, the technology itself was the more novel part. We're spinning up sandboxes and under. Seconds wiring up all that internal context, having agents. Work together in a multiplayer setting. People have a lot of questions about the plumbing.

But now, with much broader adoption of these concepts, and inspect itself now being a Product on the market, the technology isn't nearly the barrier that it once was.

### 00:02:55 — The culture angle

Instead, I want to talk about the other angle, the lessons we've learned around building a culture around inspect, and what you can take away. Inspire the people and teams that you work with. I'm not going to talk as much about those technical aspects of inspect today, but if you are curious about that. You can read our blog posts, or take a look at Pragmatic Engineers' deep dive that they did with us a few months ago.

You can also follow my boy Dylan Garcia on Twitter. He's on a social media grind, but he's also been posting a. Ton of really great insights since we launched it. So shout out Dylan, thanks for following.

### 00:03:29 — The cost of everyone tuning their own setup

One thing about working at Ramp is that it really makes you start thinking about everything through the lens of saving time and money. And although I think it is important to understand the systems that you work with and understand how your tooling works. If you're a multi-hundred or multi-thousand-person organization, and everyone has to go through, say, 15 minutes of setup. Once you start multiplying that across an organization, this is days lost for what is very rote work.

Then, if you consider how fast the frontier moves here on best practices and new ways to set up an agent. You realize this setup cost isn't just one time. Not to mention, these advancements won't always spread equally. So. Now you have an indeterminate amount of time and effort spent on this maintenance. With an equal spread of knowledge, leading to a disparate outcomes across organization. Well, you can perceive this as an advantage on an individual level.

When you're trying to win, you need everyone on your A game.

### 00:04:25 — Lesson one: build tools and kill information silos

So this was our first lesson. Build tools that kill information silos. When we found patterns that worked well or tools that benefited everyone, we could push it to our entire organization immediately. If you want to spend time tweaking your own setup, that's fine. But Inspect is always available as a very solid baseline. And what we've found is that we've never needed to mandate use of different specs because it existing as this baseline reduced the need for People to reach for their own setups all the time.

Part of what I think makes this powerful as well is that the reality of Industry is that it's unlikely that you, as an individual, Always know the absolute best way to work with agents across everything. Even if keeping up with us is your full-time job, we all miss things, hold biases, and have blind spots.

### 00:05:14 — One Inspect for the whole company

So part of the design of Inspect is that there's just one single inspect. For the whole company, when people figure out better ways to use it, or have ideas for what would make it better for the work they do. We're able to bring it to the entire company. The best part of this is that for most changes, this is invisible to everyone else. You just keep using Inspect as you normally would, and benefit from the improvements that everyone's making over time.

### 00:05:38 — Learning by working in public

What we found is that we really don't have to run these formal sit down. Here's how you use AI effectively. Weekly training sessions for Inspect. With every Inspect session being public within the company by default. It's actually easier to work in public than in private. As such, you default to working in public. And you can learn how to use it by watching how your teammates use it.

In the channels that you're already in, and your teammates can learn from you. You can literally ask inspects to go through their recent sessions and tell you about how they work, how they structure prompts. Or how they break down gnarly problems. I think this has not just been helpful for the builders at Ramp, but also for the inspect team itself. We frequently see the way people use inspect in ways that we didn't originally imagine.

This then informs what we should build towards, whether that should be more native primitives for common patterns, or where tools and data. Missing. All in all, it creates this self-sustaining loop where we're able to build towards what makes us happy most. Successful by seeing what people are already achieving with Inspire.

### 00:06:44 — Lesson two: building trust

This leads into the second lesson that we've learned. It's all about building trust. I think it's fair to say that adopting agentic-driven coding has been a massive. Trust building exercise for every engineer this year. It's helped that the models have become more competent at writing high-quality code, but there's a large part of this. That's just learning to trust what an agent builds. So much of building trust in tools comes from learning from other people.

After all, that's why most of us are here, right? You wanted to listen to people you respect. Or at least I hope you respect. Teach you about the things that they learn. But if we limit our corpus of knowledge to just those who find the perverse enjoyment in public speaking. We're still not getting the full picture.

### 00:07:27 — Sessions as living artifacts

This democratization of knowledge sharing is just fascinating to me as a concept. Instead of grouping around a select few leaders, can we build systems that inherently share the knowledge of everyone? This is what Inspect has built towards. Every time someone ships something with Inspect, people can see it right there on the work you've done. The session itself is easy to share. It's a living artifact of how that change came to be, when a pull request goes up.

Anyone reviewing it doesn't just see the 400-line diff dropped over the wall and hope for the best. They can see the exact conversation that you had, all the tools and specs used. Before and after screenshots, or even a video recording of the verification agent clicking through the app in the browser. Prove its work holds up. It makes it. For that above teenagers. Right.
