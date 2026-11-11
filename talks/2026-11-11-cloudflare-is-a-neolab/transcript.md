---
title: "cloudflare is a neolab"
speakers:
  - name: Michelle Chen
    affiliation: Cloudflare
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-11T09:50:00-08:00
ends_at: 2026-11-11T10:10:00-08:00
format: talk
recording: 2026-11-11_0939_cloudflare
duration: 1212.5
source: qwen3-asr-1.7b
---

> The recording opens on the MC's introduction. The program ran about ten minutes early:
> the talk began around 09:40, not at its scheduled 09:50.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names of overlapping sessions. "Anthropic" at 00:00:56 and "Claude" at 00:13:09 may
> come from that prompt rather than the audio: the Voice Memos transcript has neither word.
> The model names are kept as transcribed ("CLUF", "Clef", "Cleric", "Claire"); the abstract
> spells them clef and clairic. The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Introduction

Edge AI and the ambition to become the agent cloud. Please welcome Michelle Chen, Group Product Manager at Club. Hi everyone. My name is Michelle Chen. I'm so excited to be here today at AI Engineer Code Summit. Chatting a little bit more about why Cloudflare became a neo lab. So at Cloudflare, I am the group PM here. I run on the product. Working on products like Workers AI, AI Search, AI Gateway, as well.

And so today we're going to go through this little journey of how Cloudflare came to be. You might have heard that we launched and trained some models recently. I'm going to tell you a little bit more about why. And what you can be doing with it, and so we're going to go through a little bit of a philosophical journey.

### 00:00:56 — Life understood backwards

When I was preparing for this talk, I wanted to use this quote, and then Anthropic like launched a blog post. Last weekend, and use my quote, but I'm still going to use it anyways. So the quote goes. In one second, the quote is from Kierkegaard, and it's. Says life can only be understood backwards, but it must be lived forwards. And I think this is really apt quote here for us.

Because at Cloudflare we're a 16-year-old company and we've done so many things over the years, but somehow. We got some of the pieces right, and we ended up having to become a new lab. So we're going to go through a little bit journey. The first thing we're going to do is look backwards. And talk through why Cloudflare had to became an AI lab. One second here.

### 00:01:45 — From CDN to compute

Okay, we're gonna go backwards and talk through why Cloudflare became a new lab. So, Cloudflare is a 16-year-old CDN company. We just celebrated our 16th birthday. At birthday week this year in September. And we first started as a CDM. So, as a CDN company, what you have to do is you have to serve content as quick to your users as possible. You sit between the user's request and the origin, and you help sit in the middle. You could do things like cache and protect.

Security and things like that. So that's kind of how Cloudflare started, but. Cloudflare's infrastructure had to be adaptable in order to become the CDN. And so what we did was 16 years ago, in 2010, we launched with our own infrastructure. Our fast CDN has to be everywhere. And this looks really different than a traditional hyperscaler, where compute is centralized in U.S. East one or U.S. West one. Cloudflare's infrastructure is a completely different paradigm.

We have data centers all around the world, as close to the user as possible. And this is really important in becoming a CDN. But now we have these computers basically running as close to user as possible. So we thought to ourselves. What else can we be doing with these computers that people would want to build with? And so came compute. We started launching these compute primitives as well, and so in 2017 we launched a product called Workers.

Which is basically like serverless functions that you can run. It contrasted me because at that time, where you had to rent the whole machine and pay for the whole machine, even if you're using it or not using it. And so, with workers, you just execute some code, and then the worker goes away. You don't have to pay for it. It takes milliseconds to start up, not seconds, as well.

And then we followed with other compute primitives like durable objects, which are more stateful. And then in 2025, we launched containers as well. Because there are some workloads that do need something like an OVM, and we want all of those workloads to be able to run on Cloudflare. So now you know. Twenty seventeen started our developer platform. We have these compute primitives. People started using it. People started building more like static.

Websites and things like that.

### 00:03:47 — Storage and the developer platform

So we thought for ourselves: How do we elevate this and take it to the next level? So we introduced storage as well. So we have these storage primitives on Cloudflare's developer platform. We have KV. We have R two dot object story databases like D one as well, and the idea here is that people should be able to build full stack applications. Applications all on Cloudflare, stable applications where people can go on and start building.

Full applications and web app platforms on the Cloudflare Developer Platform. So we hubs infrastructure. We added compute primitives to it. We added storage primitives to it.

### 00:04:24 — Workers AI and the small-model hypothesis

And then came 2023, and if you guys remember what happened in 2023. ChatGPT kind of blew up a little bit, and it changed how we think about AI, right, and. I remember it being birthday week, and three weeks before birthday week, a lot of us sat together in a room, and we were like. What do we do now that ChatGPT is on the rise? What can Cloudflare play in here with our infrastructure and our primitives?

In order to be in this AI game. So in 2023, we launched a product called Workers AI, where we added GPUs to our network. And so again, this is really distributed, where G P. Are running as close to the user as possible. It's not centralized like a U.S. East one hyperscaler, for example. But it's running as close to the edge as possible, and we had a hypothesis when we started Workers AI.

Our hypothesis was that models were going to get smaller. So that network latency was going to become more and more important. We launched small models that could fit on our small hardware around the world that were super distributed. And we thought that people would have models get better and faster and smarter, and that network latency was going to play a much more bigger. Impact here. Well, actually, opposite happened, and models got larger and larger.

So we went from something like seven billion parameters, which was frontier scale at the time, to. Being the three trillion parameter models that were getting launched. And I think this is not so shocking when you look back in time because. You know, as we're on the way to AGI, if you're following scaling law. As you train on more data, as the models get larger, they're more generalizable. And so, on the path to AGI, it makes sense that we're Pushing the frontier of research here in order to get larger and larger and smarter models.

So this goes against. Our hypothesis, right, that the models were going to get smaller. The models actually ended up being larger, and the network latency mattered less and less.

### 00:06:16 — Serving the giant models

So what did we do? We ended up. Pivoting, so Cloudflare got really good at serving these giant models as well. So in March 2026, we launched. Kimmy, and then we followed up with GLM and DeepSeek, and these large trillion-parameter models. Hosted on our infrastructure, and so this is serverless. People hit an API call and get a token back. It actually took us a while in order to decide to do this, right?

March 2026 is actually pretty late in the game to serving this model, but we were trying to make a conscious decision here. Does this actually make sense for us to be serving it? It didn't really fit with our infrastructure story, but it fit really well with the developer platform.

### 00:06:55 — The agent cloud story

So, in 2026, we had all these primitives. In place, we have the infrastructure, which is unique to Cloudflare, running close to users. We had compute primitives where people were building agents on top of. So workers and durable objects, right? As your agent needs to complete a task. It goes on and it spins and does a task and then sleeps when it doesn't. We have storage primitives. Some sort of agency and actually interact with data and storage, and then we have models, these large models that are powering agents.

And so all of this fit into the Cloudflare. Agent Cloud story, and so we started telling this narrative that we want to be the agent cloud. We want agents to be deployed on us. Powered by models on us, using our compute and data primitives. All built on our infrastructure and our network, but it never felt quite right. We felt like we were always missing a piece here because the infrastructure.

Didn't necessarily fit in with what workers AI was designed for.

### 00:07:50 — The east wind: system one models

And so I'm just going to sit here and give you my second philosophical quote, which is. A risk, considering that I'm a girl in Chinese. AI, but I'm going to give you this Chinese quote, anyways. And it basically says, "万事俱备." Sichuan Dongfeng, which means everything is ready here. All that's missing is the east wind. And one of the things about this is like you can't really predict where the wind is going to come from or how it's going to come.

But you need to be very reactive when it happens, and so in September two thousand and twenty-six, the Eastwind. TypeSafe launched a model called Jet and introduced. Idea of system one models, and it contrasted what we. Typically, new with LLMs, which were auto-regressive and taking a long time to generate tokens. It scales quadratically, etc. A system one model is a completely different paradigm, where it actually just takes one forward pass.

Through the inputs and generates an output that you can use to make decisions with it. And so, I really think that this came down to perfect timing. I think people were starting to get fed up a little bit. With LLMs, because they are so costly, it costs so many tokens. It's so super time-consuming. And I don't know about you, but when I read a reasoning trace, sometimes my blood pressure rises when the LLM doesn't get the right the things right.

And so I think we were sending everything to LLMs and started getting frustrated with it. And so when the System One and JAG paradigm started coming on board, we were like, this makes so much sense for us. To adopt, right? We don't have to send every request to an LLM. We can send some of it. To a system one model, and so the system one models actually end up taking.

Work off of the giant LLMs, and you give it to the small fast models, and the two are supposed to work in tandem. They're supposed to complement each other and get to the end goal faster. And so, if you look, we are back at these small and Fast models, right? This was the original workers AI hypothesis. And so Cloudflare was not wrong here. We actually were just early with these small and fast models. The network latency became important again.

We want the model to be responding fast, but also the network needs to do the unit faster.

### 00:09:53 — Building our own in a weekend

And so we decided to do something here, but Jasper is closed source. Cloudflare couldn't actually host the duck models and take advantage of our infrastructure. So what did we decide to do? We built our own version of Chat. So Chat launched on November 15th. On September eighteenth, just three days later, we started experimenting, and we launched. Our version of Jev, our first experiment of it, and then it took us.

It's a week of deliberation to decide: Do we actually want to be going into this neolab territory? It's completely new to us. We don't know what we need to know. You know, are we going to set the expectation that we want to be a game lab, and are we going to live up to those expectations? But we decided to do it. I remember on a Friday evening, we were like, "Let's just go for it," and we did it.

And we ended up training the model over 48 hours over the weekend, and then we launched it the following week. And so we ended up with a model called CLUF. Clef gave power back to the agents to be able to make decisions on their own. So agents could ask, act more autonomously. You didn't need to have an LLM reason through for minutes on if it should make this decision or not. You also didn't need to put a human in the loop.

And be interrupted by like a human's sleep schedule when you want your agents to be running twenty four seven. So you can now programmatically encode, decide, make decisions for your agent to take action on. So these decision models countered LLM models because they were a lot faster. They were also a lot cheaper as well. And so it actually, as an inference provider, takes a lot of pressure off the LLMs because the LLMs were reserved to work for.

Meaningful work, whereas the CLEF and decision models could be used. For fast, intuitive thinking and work, right?

### 00:11:35 — An extraction model

And so we also went back and thought to ourselves. You know what else do agents and people use for LLMs? That are overkill. So we came up with decisions and. There must be other workloads out there that are unsuitable for an LLM, both because they are either too expensive or take too long. Or maybe that it just would get the answer wrong because the autoregressive nature of an LLM means that it would hallucinate.

So we also launched a model three weeks later called Cleric. We actually ended up launching four models in the span of three weeks. So I think we did a pretty good job as a new lab. But Cleric is a new model paradigm, so it's completely new. We're calling it an extraction model. System one model in that in the sense that it is just as fast and just as cheap, but it is also doing like one forward pass through the user.

And the purpose of Cleric is when you're interacting with the world, you're not interacting in perfectly typed JSON objects. Right. Sometimes you're getting an email, a tweet, a Slack message. But those people are not filling out perfect forms for you to extract implicit. So what Claire's done is. Is it can take unstructured input, and it can extract. Compute, estimate, and forecast values from those inputs, and it gives you back a perfectly typed JSON object.

Which means the agents are able to do things with it. So we're kind of giving agents the ability to read here and take action with. As well. And so, in code again, you're giving Claire, you know, typed values. Unstructured data. You can pass it in whatever kind of unstructured data. You can also take image input as well. And so you can just tell it to read. Basically, what's in text here? Pass it to Claude. Decide what to do with this text, and then pass it to an LLM to decide what.

To do with the agent.

### 00:13:18 — Why Cloudflare had to become a neolab

And so Cloudflare had to become a needle app here. This was our missing bit. We had the infrastructure. We had the compute primitives. We had the data primitives. We had the large models powering the agents, but in order to take advantage of all of that. And the infrastructure that we were built on, we had to be in the lab and ship these system one models that fit perfectly with our infrastructure.

And I think one of the more important things is that we're not limited to this. Being a new lab means that we can create what we are missing, right? It means that we're not if we're missing a system one model because we're at risk of things being closed source or regulatory risk. So things like that, we can actually create and invent things. So I think being a neolab has actually opened a lot of doors for Cloudflare to do more.

In the AI world, so we went through backwards. We went through a little bit of a history lesson.

### 00:14:06 — Demo: triaging a failed CI build

I want to go forwards as well. I want to teach you guys. What you guys can be doing with Cloudflare, and I'm cognizant that I am at AI Engineer Code Summit. So in a in a room full of developers and engineers, how can you guys leverage CLEF and CLiRE and System One models? In order to better use your workflows. So we'll do a quick demo here. It is in. Let's think. You have an agent. You're triaging like a CI build that went wrong, right?

Let's say you have forty tool tools that are available. You have your PR that went wrong, and then you have your agent. Maybe it's running PyDurable on a durable object. Because all of this is built on Cloudflare. So this is the setup here. Typically, what you would do is you would take an LLM. And then the LLM would take a tool, make a tool call. The tool call would go back to the LLM. LLM would make another tool call, et cetera, et cetera, until the issue was.

So this is like five back and forth with GLM 5.3. You're sending four. Every single time, and maybe you're blowing up the context, right? Because you're setting the same kind of inputs. Back and forth to the LLM, and so what if we augment this with system one models? With system one models, this could look a lot different. So let's say we want speed. So we pick Cloudflare.

Claflash can actually help you prune your tool list. Maybe it only needs ten out of the forty tools that are available, so you only need to pick ten of those. Then let's say you take Cleric and you use it to extract. The values from the input, so we can get the PR number without reasoning and thinking about it too long, and then let's say you just. You know, orchestrate some code here to execute these API calls, and.

You can actually just you know get those answers back. Then you ask cleric again. To pull the data from the logs. So normally when you're using working with an LLM, you probably just paste an LLM log. Sorry. Look, all 300, 600 lines of code. But Claire can actually just go through and read those and say, "Here's the exact error. Here's the error message." Here, the lines of code it's affecting, and you're basically shrinking your context a lot.

And then finally, you use an LLM to actually do take action and. Make decisions and take action and extract values all together. This same agent can run the system one. Let's do a little bit of a live demo. Let's see how it goes. We're gonna have to click run both here. And this is a live demo, and I will say that Cloudflare, our Workers AI, is a.

Has a very diurnal usage pattern, so we're in the middle of the workday. So we'll see how this how this But it'll give you some illustrative example here of how it goes. And we're also dealing with conference Wi-Fi, so bear with me here. All right. The system one model side finished already, and all LLM one is going so. I think even illustratively, you can see that the.

System one set of models is a lot faster, even by just this. Simple waterfall chart. You can see that the system one part takes so much less time than the actual generation, which is. The purple bars here, and I think they both ended up getting to the answer at the end, so the quality was not affected. But it took. A lot less time, a lot cheaper. Six LLM calls versus one, forty thousand LLM tokens.

Versus 1,800, and so you can see how you can use these. Kind of system one and system two models, even in like developer workflows, in order to get you to your answer faster. So the same answer. But it took a fraction of the LLM time and cost, right? I ran this when we were not doing conference Wi-Fi, but we have about 9.2 seconds. And 17.2 seconds on the LLM was almost two times.

Faster. It was 72 percent less expensive. We shrunk our LLM calls from five down to one. It was about 94 percent less tokens. And so this is an illustrative example of how you could be using the System One and System Two models in tandem. It's not intended to completely replace your LLM usage, but it can augment it and make it better. By making allowing you to free up time.

And compute for your other more important tasks here, and you can. Now do you know higher concurrency tasks because these models are able. Able and capable to do so much more.

### 00:18:14 — What people are building

And so that was one illustrative example. I just wanted to flash on the screen really quickly as well. What else are people building with platform playeric, right? There's a lot of routers that you can build and making decisions there. There's fraud that we've been seeing a lot, like. Spam or phishing, you can make decisions on there. With Clarif, you can use it to extract data from like web pages.

For support to kids and things like that, I'm excited to see. We actually have a new launch coming out for cleric. We released an early preview, but Coming out, so these use cases will grow as. People are trying it out more and more, but the idea is that there's so much in the world we're not limited to just LLMs. Now these new paradigms have been introduced, and I think we should all take advantage of that and try building with it.

### 00:18:56 — Going onward

And so we went backwards, we went forwards, but I think the most important thing here is that we go onward. Right, we have to be very reactive in this industry. Love it or hate it, things just change on a whim. You know, if we, as Cloudflare, back in the day, said our hypothesis was wrong. We have to go and actually pivot and start serving these giant LLMs.

In order to take advantage of the fact that we want to be an agent cloud. Then it makes sense for our story. When an east wing wind comes, and we need to have decision models. Because it fit perfectly with our infrastructure story, we had to pivot and be a neolab as well. So it's not. It's one thing to sit here and look back, but the more important thing.

Took what we had and tried and moved forwards. So I'll leave you with one last quote here. Which is a story from Tolstoy. Remember that there's only one time that is important now. It is most important time because the only time when we have any power, and so I'll leave you with this quote and a question. What are you going to build today?
