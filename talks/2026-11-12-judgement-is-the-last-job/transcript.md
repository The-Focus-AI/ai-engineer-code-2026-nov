---
title: "Judgement is the Last Job"
speakers:
  - name: Ishaan Dey
    affiliation: Google DeepMind
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-12T14:55:00-08:00
ends_at: 2026-11-12T15:15:00-08:00
format: talk
recording: 2026-11-12_1455_judgement-is-the-last-job
duration: 802.6
source: qwen3-asr-1.7b
---

> The recording opens mid-sentence ("And some lessons that we've learned from shipping anti-gravity.");
> the MC's introduction is not captured, and the speaker never says his name.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names and affiliations of overlapping sessions. "Google DeepMind" at 00:02:12 was in that prompt (the
> unprompted Voice Memos transcript has "I Googled Deep Mine" there). "Anthropic" at 00:02:40, 00:09:42
> and 00:12:32 is a prompt artifact: the Voice Memos transcript has "it to grab", "anti-gravity" and
> "antigravity" there, so those three sentences are about Antigravity, not Anthropic. Other names are kept
> as transcribed: Antigravity is also "Edge grabbing", "anti gravity" and "I Google". The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Introduction: what is left for us

And some lessons that we've learned from shipping anti-gravity. So. Edge grabbing is a tool to get work done with agents, and we're trying to make the best interface for. Developers and builders to do high intelligence tasks. Software engineering we used to know has completely changed. We can do things now that we wouldn't have even dreamed of a year ago. A sentence can turn into an operating system, and my voice can create a AAA game.

So, what's left for us? The tools we use have changed.

### 00:00:39 — A new paradigm every year

We used to use a code editor that's been around for decades, but now. Every year, if not more often than that, there's a new paradigm for how to do our work. It redefines what our work it looks like. And on the side of building products, that's changed as well. We spend a lot of time upfront figuring out. The right thing to make. Because building was expensive, it took a lot of time, effort, and resources. So we ideated more and invested more in that phase.

This is completely flipped. Where now? You should still understand the problem you're trying to solve and how to go about it. But if you want to make something, it can exist just like that. You can try it. Feel it, get feedback, and understand the nuances that you might not have realized about it before. Use that to inform how to move forward. This is exciting. But it's also a little bit deceptive. It's easier than ever to just turn our brains off and blindly accept what's made for us.

So, anything can be made by anyone. Then it's more important than ever to know what the right thing to even make is. Everyone has their own definition for what taste or judgment looks like. I think that's okay. That's good because we all work in different ways, and we're all working towards different things. But by the end of this talk, I'm hoping. But I can help you form a little bit of a clearer idea on what judgment in building products looks like to you.

### 00:02:12 — Building at Google DeepMind

I've gone from the scale of working at startups to now at Google DeepMind, where the scale is—it feels pretty incredible. We're making frontier models, and on the product side, we're able to use this internal frontier. To build the interfaces that will use the next steps of artificial seeing intelligence. We're very close to the research, and we can experiment and iterate really fast. And shipped to over a hundred thousand people inside Google.

These people at Google are using Anthropic internally in really ambitious and unique ways. And this creates a really cool feedback loop where we can continue building and do awesome things. I want to walk you through three big lessons that we've learned from this cycle.

### 00:02:57 — Lesson one: tools scale with intelligence

So I think we've all seen this first pattern of the tools we use. Scaling up with intelligence, we used to build products in a pretty. Relatively straightforward way: we identify a problem, understand it deeply. And make something that people want with a clear target. Now that target is moving, the ceiling is going up for what's even possible to make. And with that, the possible value that you can create in the products that you build is changing as well.

So I'm always coming back to a few thoughts. Whenever I'm working, of what we can achieve now and what's just past the edge. Of what we can achieve, and we've seen this look like two main ways in building a deep model. As our models got better earlier in the year. They got better at communicating with and orchestrating each other. We created systems for teamwork for to do more ambitious work.

We stepped up in intelligence to let users do more. At the time, it was awesome. You create operating systems and really cool things we've never seen before. But it was also pretty prescriptive because the models needed at the time. More recently, this would look like our version of agent swarms. You can actually try this now in anti gravity. This has been creating a ton of value inside Google for us.

People can be more ambitious. There's more agents working together, and we're able to relax the constraints to achieve more. You can bet that with the next models coming out, we'll see even more cool patterns and things we didn't expect. But I think we all already kind of knew this. We've been seeing this for the past few years, but all the tools we're using are just adding more and more.

New cool ways to scale up with intelligence.

### 00:04:35 — Lesson two: ambition is not always adding more

But the second way I've seen. Evolving with intelligence is a little bit tricky because being ambitious does not always mean adding more. Let's go back in time a little bit and walk together through. The way we used to use AI models looked very much like a structured turn-based format. Like this, I would ask for some small scopes change. For example, editing a few files. The model would do it, and then we move on to the next thing, step by step. It made sense at the time.

To be able to cue instructions. So the next things I wanted could be delivered to the model one at a time. They might not have been smart enough to get everything at once. But it made sense to give it limited context progressively, so it could get the work done. Fast forward now. There's a lot more going on. Long-running agents, asynchronous tasks, external triggers, and everything else we're doing.

Things are looking more complicated, and the agents are also smarter. So maybe the decision we made in the past might no longer be correct. Maybe a better pattern looks like. Treating the agent more as an entity that can make better decisions, and giving it user intent immediately, just like this. Maybe it'll choose to orchestrate through a bunch of worker agents, or do the task after we're done the current task at hand.

It's smarter, so it can decide for itself. The decision we made in the past. Can easily become obsolete as intelligence grows, and you need to challenge your prior assumptions. If we separate the timeline of what we can achieve into three clear parts. If you build too far in the past, it'll be obsolete. You build too far from the future; it could be visionary, but impractical. It's important for us.

To ideate quickly and work towards building in the right time window. To create the most value, challenge your past assumptions, and rebuild your foundations to create good systems that scale with intelligence.

### 00:06:36 — Lesson three: a platform for ambition

With these foundations, we've seen another really awesome pattern evolve, or. Come out, I Google. Where? We see the value in creating a platform for AI. So something like this might sound familiar. I used to use design tools in a very manual way. I'd create frames, build user interfaces manually, and. Create things by hand. And the tool, if we look at how it changed from before to now, it looks pretty similar. But the way I use it is completely flipped.

Maybe now agents are creating hundreds of visualizations for me to go over very broadly before I go deeper into something. Building software now doesn't always look like giving the user value in a very clear and deterministic way. Users can create their own leverage and make room for their own ambition. Let me walk you through how this has looked for us. In our products, there's a lot of room for extensibility.

People can build specialized tools that work for them, and this can often end up leading back to the problem. I'll show you some examples. Personal software can come up where I can make a dashboard where agents will scan across feedback channels and bug fixes. To show me all this information in a way that just I like. Maybe it'll look like software for my team. Where designers can create the tool that works just for them, where they can collaborate visually on demos.

This can also branch out even more. The science team at Google is doing some awesome things with their science plugins. We're creating this platform for a mission for a wide range of users to create their own value and create their own leverage. And this can actually feed back into the product you're making at its core. The agents form example I mentioned earlier actually started as a plugin through our sensibility system.

Has created a ton of value internally for us at Google. And by giving the users surface area to explore and create value for themselves. We were able to learn from it and iterate the products to make the core better. Let your users be ambitious, and watch it feed back into your product. To create more value for everyone.

### 00:08:50 — Human judgment matters more than ever

Last principle I want to go over kind of applies to all of us. There's a lot of great talks at this conference about software factories. You know it's really exciting. We can give our agents ways to build more, verify more reliably, and ship faster. It's exciting, but if all the parts of what software engineering used to look like get abstracted away. Then how do we define what the remaining value in our human judgment is?

I'll argue that human judgment is more important than ever. If I ask an agent to say make this slide better. Maybe it'll add some visualizations and a bunch of dashboards and cool colors and everything. Maybe it'll rewrite the whole slideshow in Rust. So, it'll solve every problem. But does every problem need to be solved? Take for instance what the agent manager looked like around a year ago when Anthropic first launched.

If you want to make it better, to an agent that might look like adding a lot more detail, ship everything. Add more detail into every single step that agent is taking. And give the user knobs for everything. Might be better in some ways. It's blind. It's easy to blindly accept the first thing that we're given. What does better even mean to us? If we're trying to make a better agent manager interface, maybe that looks a little bit different.

Maybe we need to ship fast, but understand at each step of the iteration process. What better actually means to us, and what the next direction is. Let's start here. Better might mean. Simplifying the interface, only showing the user exactly what the latest thing the agent is doing. Semantically, so they're not shown a wall of text and tool calls that might not actually matter. Maybe it looks like simplifying the whole interface to give the user less cognitive load.

So that they can multitask easier and be able to achieve more in a different way. So this kind of brings us closer to what anthropometry looks like. Today, all these steps along the process have brought us closer to what good means. And we're making a lot of improvements fast. So I'm excited for you all to see. Now is the time to try many things. Be ambitious. It's more exciting than ever, and it'll actually get more exciting as the models get better.

Try many directions, but take a moment to think. Use your human judgment. Just because you're finished creating something first, which can be done in an instant. It doesn't actually mean you're done. Think about what you're actually trying to achieve and how the thing you're making feels. Very quickly identify many. Directions you can go in and try them, but arrive at the right thing, and go deep into that.

So make time to think, make room to think, and use your human judgment.

### 00:11:58 — Summary

To summarize, some of the lessons we've learned involve if scaling up with intelligence. Which doesn't always mean adding more. It could mean rebuilding your foundation. Take these foundations and enable your users to be ambitious in new ways you might not have expected before. And at the end of all this, when we're shipping faster and faster. Make room to think and protect the human side of software engineering.

I Google this has led to some awesome things by creating a platform for ambition, improvements to YouTube. Better video decoders, and memory optimizations. As for DeepMind and Anthropic, it's a more exciting time than ever with new models coming out. And on the product side, we're also moving quicker than ever. These are just some of the feature launches we've announced in the last two weeks. And we're continuing to use the principles we've covered today.

To work on the future of interfaces for higher intelligence, I'm excited for you all to see it, and I'll leave you with this.

### 00:12:59 — Closing

This new age of software engineering is actually worth celebrating. Agents might be doing more and more, but it's also more important than ever to solve real problems and use good prompting. Protect your judgment. And build things that people want. Thank you.
