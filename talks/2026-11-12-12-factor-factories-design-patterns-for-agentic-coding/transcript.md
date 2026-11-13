---
title: "12-Factor-Factories: Design Patterns for Agentic Coding"
speakers:
  - name: Dexter Horthy
    affiliation: HumanLayer
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-12T17:10:00-08:00
ends_at: 2026-11-12T17:30:00-08:00
format: talk
recording: 2026-11-12_1702_dex
duration: 1244.2
source: qwen3-asr-1.7b
---

> The Mainstage ran ahead of the grid this afternoon, so the recording starts before the scheduled slot.
>
> The MC's introduction is captured at the start. The last lines are the stage changeover.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names and affiliations of overlapping sessions. "Dexter Horthy", "HumanLayer" and "Quinn" may come from that
> prompt: the unprompted Voice Memos transcript has "Dex Horthy", "Human Layer", "I'm Dex." and "I'm your
> friend" there. Fable, Factory and SlopCodeBench were not in it. Other names are kept as transcribed:
> swyx is "Swixson", SlopCodeBench is "Slope Code Bench" and "Slop Codebench", the anti-slop manifesto is
> also the "anti-slavi manifesto" and the "anti-slot manifesto", its site is "slotmanifesto.com", and slop is
> once "slot". The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Introduction

Factories look like to explore the design patterns and principles behind agentic coding. Please welcome Dexter Horthy, CEO and founder of HumanLayer. What's up, everybody? How we all doing? Give it up for all the fucking organizers out here. They are killing. It's Swixson team. Let's get around replies. All the speakers, Steve Johnson speakers. I knew Quinn was really smart, but that was a really dope talk. I enjoyed watching it from backstage.

Hi everybody. I'm Dexter. This is Twelve Factor Factories, which started as a joke title, but then everyone started calling it that. So and the war on slop. So thank you all for coming. I like to yap about coding agents on the internet, and like a year ago, we did the whole context engineering thing. A lot of views on YouTube, and up until about a week ago, I was the CEO and co-founder at a company called HumanLayer.

The multiplayer coding agent workspace, and for those of you who are blessed. To not be quite as terminally online as some of us may be. We are now a part of Factory, which I'm very excited about, and I will be touching on during this talk. But I want to get right into it.

### 00:01:11 — Why software factories fail, revisited

Last summer. Was all about this like three months ago. Feels like forever. Factories were all the hype. And I gave an intuition-based talk back in June of like we should probably still read the code, and here's how RL and verifiers are working, and like. Exactly as our friends at Google were saying, you know, models really like just solving the tests, just getting them to pass. I now have some data beyond just that intuition.

There's a benchmark called Slope Code Bench, which we just released. Actually. Today, a bunch of new data on from the lab at University of Wisconsin. But very unsaturated benchmark, you know, GPT five point five got a fifteen percent. Astro, I think, scored sixteen. 16.3. So like we are getting better at this, but there's a lot of a lot of ways to go. I'll talk all about that data in a sec.

We of course have the study from Farahs of you know. Thirty percent of PRs merging without review. Longer comments, more comments, more incidents per PR, more bugs per developer. And I tell in this talk, I don't think it was quite correct. I said why software factories fail. And everyone said, "Oh, Dexter is the anti-software factory guy. Dexter hates software factories." I actually love software factories. I'm a huge fan.

The title was probably more along the lines of you know there are certain things you could do in your software factory that would cause it to fail. And here's what those things, what I think those things might be, and you know, please, please don't do them, do the dark factory thing. But I think the main takeaway here, and I think we've heard this from a lot of folks, is software factories is just good engineering.

A friend of the friend of the friend of the pod, friend of the conference. Lauren was talking about this yesterday. Of like, a lot of this is just stuff we've been doing for a long time. Actually, you know, from factory had a really post is much longer, but it's like the factory mindset is about how do we standardize our. Process, not just the output, and there's a whole bunch of stuff we'll dig into there on like how we're thinking about that.

### 00:03:03 — The pre-AI software factory

But I try to kind of make the same point, right? It's like your standard software factory is going to look something like. You have some engineers, some product managers, maybe a CEO or someone to drive the vision. And those people are going to come up with stuff that we want to build. And they're gonna put it in a tracker. This is again. This is pre AI. A lot of the things we hear about software factories today.

We're around for thirty years, right? You take stuff off the tracker, you build it, run some unit tests, automated tests. Maybe you poke it locally when you're ready. You make a pull request. At that point, someone might pull it down, interact with it, test it. Your CI is going to run a bunch of checks and static linters, and like none of this is like that new. And if anything is wrong with it, you send it back. You go fix the problems.

And when it's actually ready to go to prod, we do some canaries and rollouts and feature flags and all kinds of fun stuff. Stuff there, and eventually it makes contact with our users. And I love our users. I love customers. But they do like to complain about things that are broken. And ask for stuff that we haven't built yet, and so that goes back to the team.

And at some point, something breaks at three in the morning, and the customers are the first one to figure it out. So we had monitoring, so that we can wake people up at three in the morning, and they can solve it before anybody notices. This is your pre-AI software factory.

### 00:04:20 — Forward pressure and back pressure

And the basic point is like, all you need to do to make this agentic is replace someone builds the thing with an agent builds the thing. So you have orchestration. I'm not going to go into the details of the sandbox and the model and all this stuff. But you can incrementally build this up by adding what I'll call forward pressure. What causes work to start? Can we take all of the feature requests and just route them straight to our backend?

Can we take all of the incidents that happen so that when I get paged at three in the morning, I'm looking at a pull request that we think is going to solve it, not just. A stack trace about what went wrong. So, forward pressure—what causes new work? Start and back pressure, which is sort of like okay, cool. Now we can build things in minutes or hours. But the review and testing still takes hours or days if we're doing it in the old way. So we bring in agentic code review, agentic testing.

Anyone doing agent agents code reviewing their pull requests? Okay, I thought it would be a little bit more, but that's pretty good. Y'all are y'all catching up? And then we invest heavily into our CI/CD and our linters and our. Doing like lean checks on their code, like formal verification. All right, hardcore. I like it. The backpressure. How do we let agents hill climb to a better outcome without needing to involve humans? How do we just?

Overall, increase the quality of what is coming out of our build step, and agents help here. But a lot of what makes Software Factory is good. Is stuff we've kind of had for decades.

### 00:05:40 — Twelve practices

And just like context engineering, which was the thing that I was talking about last summer in like June of two thousand and twenty-five. There was all these ideas of like RAG and memory and state and history and all this stuff and. We tried to like distill out what are the timeless things that go into building agents. And so I want to distill out now some of like what I think are the timeless things that go into building and designing a software factory.

Because there's a lot of noise and hype, like I said, terminally online, Twitter is gonna break your brain if you spend too much time. Wondering what everyone else is doing. I'm also going to talk about swap. Because I have a very fun project that I've been working on with Swyx and a couple handful of other speakers here, but we'll get to that later. We're gonna do twelve great practices for software factories.

And I think the first time I started talking about this is only like nine, but we are at twelve now. So I'm very excited about this. I touched on this, but loops was this concept that was very in vogue. I think this is much more useful if you think about the interplay of forward pressure and back pressure. So you know, again, very hyped up, but the actual tactical thing is like, how do you start work automatically?

And how do you make sure that whatever comes out and is touched by a human by the end, all the low-hanging stuff is already. The outcome is as good as it can be autonomously.

### 00:06:50 — Know your enemy

Number two, I will call. Know your enemy. I will posit that unattended. Models don't do a great job of maintaining and improving codebase quality over time. So we care about having a system that's going to be still maintainable in three to six months. I mean, again, again, this talk. I said, please read the code because a lot of it is slop. Agents got really good at solving one-off problems and making video games and Blender slop and all this stuff.

I don't think you know. You steer a model to fix your codebase. It can go fix your codebase, but then you have to know what is there and what you want. So if you are just hands off pushing features into the machine. You may not find that it autonomously will make things better over time. Back then, I didn't have a benchmark. Now I have a benchmark. That basically has the model solve problems in checkpoints. Like a model can clone all of Excel or Redis in a couple days.

Maybe even a couple hours now of like agent swarms, but that requires knowing the entire problem in advance. And most of us don't write software that way. Most of us ship a feature, and then ship another feature, and then ship another feature. And if you're building by hand without AI, along the way you say, oh, that's a bad abstraction. We need to centralize this. We need to remove this.

And so this is a benchmark that measures a model's ability to. Evolve a codebase over time. And so, Astra again is sixteen percent, very unsaturated. There's a bunch of data here. Probably don't have time to look at all of it, but we can look at code quality metrics like. Cyclomatic complexity, lines per symbol. The percentage of functions that have high complexity. There's more. There's 200 custom rules.

Fifty of them are based on things we've been doing for a while. A lot of them are custom, based on looking at code that models write, comparing it to pre-AI repos. I read a long article about that. I read a bunch. Gabe Warlandsky, who runs the lab and does this benchmark, just put up this paper today. Based on some of the research we did with them. There's a bunch of stuff in here. I probably don't have time to go through all of it, but they also test the model's ability to design good libraries and interfaces.

The most, the craziest one here is like models did learn to use exceptions instead of returning tuples in Python. There was a lot of patterns that were identified as like probably not great. That were way less present in the you know six months ago models than they are in today's models. So it almost feels like we're like. The slop is amplifying over time. And Claude and GLM are now writing Python three in Python two style, so we have.

You know percent s format strings are back, and they will not use s strings by default anymore. So. Things to be aware of. You may not care about this. I care about this. The jury's still out on Fable 5.2. I love reading the Anthropic blog posts about like how to prompt the new models. So allegedly, if you tell Fable it owns the codebase, it should keep it clean. I haven't tested this yet. We're running the benchmark in the background right now.

But for those of us not building FBS games, shouts out to Ben built a cool game. You should go watch this video. It's insane. You should know your enemy. You should understand that, like. Work with this in mind that if you need your codebase to last a long time, or your codebase has been around for a long time. We should probably maintain understanding of the system and the code.

### 00:09:49 — Plan before you build

To do this, we like to plan before we build. I highly encourage this. You should do this. We used to do this before in this old software factory. People realize, especially when. Building things took hours or days, and when testing and reviewing things took. Hours or days. Even if this part is faster, this part is probably still slow. If you're doing it properly, we would have architecture review.

And we would have sprint planning, and we would talk as a team, and we would align in the hopes that we might decrease the percent chance. That we'd have to rework something later. We wanted to be rather sure that we're building the right thing in the right way. Before we actually go and spend time building it, time and tokens, and then get to review and have to rework it.

A lot of people overdo this as well. I've overdone this for sure. Where you spend six hours working on a spec, and you're like, I feel like I'm getting busy all over. Because sometimes you can just go to send this prompt, and if it's smaller, you don't care. Maybe a 50% chance to send a couple more prompts, and then it's good. You could spend five hours hand writing a detailed spec, and maybe there's a 10% of it you have to change afterwards.

Or you could write all the code by hand in 20 hours, and then there's like a zero percent chance. Well, the zero percent chance you have to rework it because of something the agent. You know, people still make mistakes too. But I think about this in terms of expected pain. Like, how likely will this have to change later? Times, how hard will it be to change? I don't argue with the model during planning about what color the button is going to be, but I do want to make sure we get like our database schemas right and stuff like that.

Because it's really hard to change later. So based on your problem and what you're doing and your codebase. You should probably decide where on the spectrum you want to land.

### 00:11:26 — Align visually, test, fight slop

Align visually. I published a skill called Show Me, which is like optimized for instead of reading walls of text. You get HTML mockups. You get tables. You get charts. You get all this stuff that you know is optimized for. The human brain, which is very visual, we've been. I think Koda said, you know, we've been running away from predators and eating fruit. For millions of years, we've only been reading text for about 5,000.

Anyways, you can get this. It's got about 40,000 installs. You should help agents test their work, screenshots, browsers, videos. Whatever you can do to help the agent, again, he'll climb against an outcome. Given if you're building an iOS app, make sure it can build, run, and test. In whatever environment it's running, you should fight slop with anyone here writing in TypeScript. Okay, some people are feeling lazy.

I feel like it should be more than that, but this is a repo from Dylan Mulroy, who's a principal engineer. Cloudflare anti-slop. If you haven't, if you're not using this, you should go check it out. It's a hundred-ish rules on like stopping agents from building slop. Factory also has an ESLint plugin that I should probably mention, and also again the so you can go slot fork all of the.

Python code quality rules out of Slop Codebench. This this exists for your language. You should use it. Slop is a tool. Not all slop is bad. Vibe coding prototypes. Side projects. If you have something behind a feature flag, you just need to like figure out if people even want it. Before you go putting the time, I think it's like it's great. I don't think there's like always, always, always, always. Every line of code has to be perfect.

You should give models a feature plugging system. Postdoc or a statistician or a launch darkly or whatever it is, so they can try stuff and see if it performs better, and then make decisions about. What the right thing to be in your tool?

### 00:13:00 — Compound, and unify your forge

You should compound over time. Eval everything. Learn from past sessions. And you should unify your forge. What I mean by this is, you know, we used to send Git patches around on mailing lists. I think Linus and the Linux people still do this, but most people keep all their code to GitHub. And so, before the A and A4, we have centralized patches. But we still have people pasting like Claude answers back and forth in Slack, and hopefully like.

Not doing too many rounds of that because it's like I copy out of mine and send it to my coworker. He pasted it into his agent. And then they send it back to me, and then I paste it in my agent. Maybe we get an answer. So like centralizing all of your designs and decisions and like whatever you have and like. Notion and Google Docs and whatever it is, should like you should try to bring those things as close as possible together.

So you can understand not just the code about what something was built, but all the decisions that went into it.

### 00:13:50 — You cannot buy everything

You can't buy everything. I think there's. Things in this space that just cannot be productized. Obviously, you can buy VMs, or you can bring your own. Dev environment, I think, is very personal to most teams. The harness. Of course, you can go get a Frontier harness, or you can use something minimal like OpenCode or Py, and customize the heck out of it. And then you have this control plane picture of like.

How do you collaborate on sessions and plans? How do you do automations and scheduling? How do you respond to events? All this governance stuff. One of the reasons I'm really excited to be working with Factory on all this stuff is like. They have a much bigger view of this picture and have a lot more stuff saltier. But there are parts, especially the top here, is like. I don't think anyone can sell you verification of your code because only you know. If you have hundreds of engineers and hundreds of repos.

You have those opinions, and you know how to. Not just a black box you can buy. There are building blocks that are under. But the idea of software factory, I think, is it's a way of thinking about our work. So that's software factories.

### 00:14:43 — The anti-slop manifesto

I also want to talk about slop. It's. Factories are about how do we increase human leverage, right? How do we get the best return on our time? And I've talked a little bit about why humans should be involved, and like what it means to be a diligent steward of. We're building and what we're doing, but it's I think it's bigger than just software. So I'm very excited to announce the anti-slavi manifesto.

Which you can go if you go to slotmanifesto.com, you can read it. I'll put their URL up later. But we built this in collaboration with a lot of people here, both the attendees and speakers. Special shout out to Swyx and Philip. It has signers from ZoomInfo and. I think XAI and OpenAI and like. There's a lot of cool people on there. I encourage you to go read it and check it out and be a part of you know. But I'll tell you what.

We value outcomes over outputs. We value understanding over speed. We value our own thinking over whatever the model came up with as a first draft. We value better work over easier work. We value improving the system. Over just patching outputs. And the things we believe are that AI is the most useful tool most of us have ever worked with. But it can create a like a swarm of agents can produce more work in a single day.

Than a human can review in their entire career. Look at some of the math stuff coming out of OpenAI. Flop is when we put less effort into producing something. Then we ask their consumer on the other end to spend, understanding it. And using AI doesn't necessarily make something slop, but it happens when we pass off AI output. Without taking responsibility for its quality or for the reader's experience.

I believe strongly. I've been saying this for a year now. AI cannot replace human judgment. It can only amplify our judgment, or maybe perhaps our lack of judgment in certain cases. And the slop is asymmetric. The cost of producing a thousand line PR or a ten page doc is approaching zero. But the cost of reviewing it is still barely constant. And sloppier livers when we repeatedly work around problems instead of solving them.

It comes from tools that love to add and are not biased towards subtractive. I'm not gonna name names. But I think a lot of slop comes from pressure. Companies are pushing their people to redefine what is humanly possible. And I think slop compounds. So the more slop sits in our knowledge base. In chat, in code, the more of it the next agent reads and copies. And the more slop flying around our team.

The more we lose the will to fight it, and everything gets worse over time. Communication and quality and all of this. So as the sign, we the undersigned of the anti-slot manifesto, guys. Is it? A little hot in here. I might just have to pop off. There we go. They couldn't give me one of these with a factory logo on it yet, but I'm sure it's coming soon.

Thus, we the anti-slop undersigners. Resolve that human time and attention is incredibly valuable. So we optimize for using it wisely. We fight slop because AI should make our work better, not not just easier. We optimize our systems and tools and products for the efficient elicitation of human intent and for efficient human understanding. And we do our own thinking when working with a model. We explore resources, code, prior art. We really want to understand the problem before we actually get to work.

And we own the intent and the taste and the consequences of what we ship. However much AI helps us to make it. We own it, and when an agent wrote something that we're sending somebody. We make that clear, and we actually make sure it's good before we drop it in Slack or email or whatever it is. And when someone sends us slop, this is also like we have to we have to push back. We have to tell people, you know, kindly and empathetically.

And ask them to like review it first. And most of us, it's a journey. I've been I've been on both sides of this one. So I've had to have that note.

### 00:18:40 — Always alpha in reviewing

I believe there will always be alpha in reviewing. Something. As models get better, we may stop reading most of the code. We basically review a plan or a design or a result. But if you don't review anything, if you bring nothing to the table, no thinking, then you're just going to get the same AI output as everybody else. Agent reviewers, linters, verifiers—they're very useful, but they are not. Excuse me, they are not sufficient.

So for now, we'll still review some subset of the outputs. What subset, of course, depends on the stakes. But what shift? Who's using it, and how it's helping them matters far more than lines of code or PRs merged or. God forbid the number of agents we're running in parallel. It's cool if it gets you the outcome, but unrevealed output isn't always necessarily bad. You know, slop is cool. One-shot prompts. Videocoding, these are all like high-leverage things that are in the right place.

Swap is bad when it undermines our outcomes. We want to make a good product, maintainable system. We want to save people time and energy. If slop undermines that, then it's bad.

### 00:19:44 — Closing

And I guess finally, like none of us has this figured out. We're each relearning what we will and won't accept. And there's no single right answer here. You got to calibrate yourself. The world moves fast. My goal here is these are principles that we can use to embrace our importance. Human role in harnessing the AI safely, responsibly, in a way that creates value for everyone. For many years to come.

So you can read and sign the manifesto at slotmanifesto.com. TLDR, you know, give a shit. Care about what you're doing. I'm gonna stick around for Tariq's talk, but then. I'll be hanging in the hallway afterwards. Come say hi. Keep learning. Keep giving a shit. I'm excited to keep building with y'all. Thanks so much. It's always so exhausting. The slides, thick. Oh man, I remember you saying.
