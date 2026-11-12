---
title: "What it takes to set intelligence free"
speakers:
  - name: Fabian Hedin
    affiliation: Lovable
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-11T16:30:00-08:00
ends_at: 2026-11-11T16:50:00-08:00
format: talk
recording: 2026-11-11_1629_Lovable
duration: 1144.1
source: qwen3-asr-1.7b
---

> The recording opens mid-sentence at 16:29:13; the start of the talk and the MC's introduction
> are not captured.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names and affiliations of overlapping sessions. "Lovable" may come from that prompt:
> the Voice Memos transcript has "lumbo", "level" and "London" at most of those points and
> "lovable" once (00:01:37). "Niteshift" at 00:14:48 and "Ramp" at 00:13:54 come from that prompt,
> not the audio (they are a company and a company of other sessions; the speaker is describing a
> dev server and the computer's RAM). LLMs are "LMs", "larms" and "lems". The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Agents are back

2004, we went back to much simpler. System where it was a bit of a shame where we had like some smaller LMs doing some knowledge retrieval. And then, really, just one main kind of writing to the user and writing the code in the same message. And this worked great. It was very responsive for users in the UI. And it was reliable, and users were kind of in it, and trading with.

With the models, so. Let's do that now. And now. It's time again. We're back. We're so back. Asians this time. They work. And we're running them in production, over a billion tokens per minute on this system that I'm going to talk about.

### 00:00:42 — What is Lovable?

But first, just looking at okay, what is actually Lovable? So. If you simplify the UI, and this was same back in 2023 as it is today. To the left, we have a chat where two months come in and they kind of describe their intent to build or whatever they want to do. And to the right, you have a preview, which is the output or the outcomes of what you're building.

And this back in 2003, you could do simpler things with. Right, but now we're really seeing. Working at this layer of abstraction, we're able to build very complex things, right? And I think we've even seen. A lot of tooling meant for developers, for example, moving to this. Type of interface where you're not really looking at the code every day and so on, and you. Getting kind of attracted and working on base architecture.

Or looking at some kind of output of what you're doing. And this is something that we've always believed in, and it's been kind of a core thesis behind Lovable that. You won't have to care about the code in the same way that you had to do before, and I think today we're kind of. In this almost a bit in between, I think in the industry where you know some people might say we don't have to care about code at all.

And some people might have different opinions. I of course like. Growing up coding, and these things, you get a bit attached.

### 00:02:04 — Outcomes, not code

But in the end, what matters is actually not the code. Sorry, we removed the last part. But what matters is the outcomes, right? And so, the outcomes. What is that? Well, for our users, the outcomes. Is creating a business and monetizing and creating value for others in some type of way.

### 00:02:29 — The platform: agent, cloud and business

And I would kind of quickly go over what we build as a platform to enable this before I go in kind of from the. On the technical side of this talk, so. If you if you look at Lovable, the first thing that you can say about the platform is that we have this agent. And like any other agent, it can do quite arbitrary things, and it's quite specialized at building software.

And it has access to our clusters, so it can verify what it's building and. It connects to GitHub, and you know we write code. And you can do whatever you want with that code, so on. So that's kind of your basic coding agents. And the other pieces of the platform is this kind of cloud and business piece of the platform, and so. The cloud part of the platform is about just giving.

Kind of these hosting primitives just seamlessly to this agent, and so. We built out databases, authentication, storage, all types of backend compute and. Security scanners and like backups and logs for all of these things, and all of it can be. Introspected by the agent, and this just makes it seamless to build things. You don't have to kind of. Go to different services. This together, we are going to provide you these primitives.

So that's still around building software and hosting this, right? But then the last piece is around its business capabilities where. Again, the output of what our users are doing on Lovable, we don't see that output as code. The output is a product or. Or a business, and if you want to succeed as a business, you need to. Do more things than just write code, right? And so. We we help our users with receiving payments, sending emails, optimizing SEO.

Doing ads on Google and Meta, and kind of analyzing what is happening with the product through. For analytics, and you can look at kind of conversions and optimize these sort of things, and the agent is in the loop. In all of this, right? So, that's kind of our capability offering, you could say.

### 00:04:32 — From a time limit to 10 hours

And again, the core part of this is an agent that all of these capabilities are built for you, and. At some point in Noble's history, we used to limit our agents to work for only thirty minutes. Because we thought they weren't reliable to work for longer amount of time. But now we changed this to really be. Without any sort of problem in terms of the length, an agent can work. And so you can imagine agents working for ten hours.

### 00:05:00 — Three pieces of the architecture

Plus, and so I'll go into some of the things that we've done in our architecture to enable this. So the first piece is really around the agent runtime itself. And how we enable that to run for a long amount of time. And the second piece is the computer, where each of these agents are actually doing their work, running a web server. And actually verifying what it's doing, and so the last piece then is the verification itself, where.

If you want an agent to work for a long amount of time, you need to make sure that you have these feedback loops in place, so that it's not kind of going off. In the wrong direction.

### 00:05:39 — The agent runtime: an inbox per agent

And so, if we start by looking at the agent runtime itself. You can imagine that. You have really three different sources that can. Interact with an agent, so it can be yourselves kind of prompting this or a human. It could be other agents, and it could also be just a system on a schedule waking up. And the way we chose to architect this is that for each agent, we have a separate inbox.

Where any of these sources would kind of send in messages, and so you might have a message here like, "What's the status?" And you can imagine you have this agent, and this agent is kind of an always-on agent that. That might be working, right? And so, you can imagine it has done like three actions here: a request, a tool call, and it got some result. And then at this point, the agent is ready to actually receive messages. So. Since anyone can drop a message into his inbox, the agent then can copy that itself.

Into its own, what we call a trajectory. Basically, its task history. And this is the type of interaction that I think you're familiar with if you're using agents overall. So that's kind of the first design principle behind this agent runtime. I'll go. Through a few more here, and so.

### 00:06:56 — A trajectory modelled on Git

The trajectory in which the agent is working in, which is kind of the history of what has happened so far. And really, the basis for any sort of memory for the agent, right? And we designed this trajectory with really Git as inspiration, and so. The trajectory, what is it? It's a pendulum, where each event points towards. Apparent that the previous events. And because of this, you get a nice.

Capability just like Git, where you can fork things, right? So you can have two events pointing to the same parent, which essentially creates a fork. And because of that, you can kind of spin up parallel agents at. At any point of time in the history, without having to duplicate. All of the shared history and the. Semantically, it's a bit unclear what would happen if you merge this. So unlike it, we cannot merge agent trajectories, but we can kind of.

Spawn them out right, and these agents can talk to each other.

### 00:08:00 — Separating the prompt from the task history

The other thing that we made sure to design for is that. This agent trajectory it includes the full history and everything that happens. With agents, and so every tool call, a bunch of other things happening on the platform. If a tool call like failed or succeeded. A bunch of things that might not be fully relevant for our prompt, but. Then what we've done is make sure that we have this hand-only log.

And from that, we can actually build a prompt that we would feed into the actual LLM. And you might ask, why would you want to do this? Well. One reason is that when you build a prompt, you if you have a long history, you probably want to do some sort of Compaction. You want to summarize part of that history in earlier steps, for example. But this summarization would differ. For example, if you use different models with different context lengths, you would probably.

Think differently about when you should summarize or not. And so, by separating the prompt from the actual task history. We're able to render problems for any type of model or any type of task. That we can kind of find the best and optimal prompt for.

### 00:09:11 — Demo: the debug tool

So, to show this event history in. In progress. We have this debug tool here, so here it's just a recording of me dragging. This slider in our UI, and you can see on the right that. The UA is kind of updating as I'm dragging this along. You do have one hundred fifty-six events here. Each of those is an event in this event history, and you can see how the UI can render.

Of any point in history, and this is just showcasing that. At any point in time, we have full control of say the UI or anything else happening on the this. Platform, thanks to this history, kind of detailing everything that has happened.

### 00:09:49 — A stateless process

The last piece I'll go over here on the on the runtime itself is that. The process that is running these agents—they're separate. From the actual past history, and so the process is. Almost entirely stateless in that between each call, each full call, each turn. It will actually just persist into the task history, and so you can have. A process, common goal, and then the question is why? Why do we care about this? Well. As a whole, this system we deploy to it 700 times per day.

So that's about once every two minutes, and you can imagine if you have. A agent working for ten hours, and. You want to not disrupt that agent when it's working. Right? This agent is a serial thing for a customer. But at the same time, we want to make sure that this agent is running on the latest deploy. And it might be a new feature or something like that, but it might also be like a security vulnerability in the Linux kernel.

It was like okay, we need to update this tab. And so to do that, thanks to this separation between the actual history and the processes, we can. Actually, make sure that we have one agent that is working on one task, so we can have different processes. Picking up and actually doing the compute behind that work. So this task can keep on working while we have different toys.

Working on it, be it for ten hours or even longer, right? So that's the Aden front line.

### 00:11:24 — The computer: golden checkpoints

The second piece of this platform, right, is the is the computers. This is where the work is actually happening. And we've been through a lot of situations and a lot of vendors, kind of working with. Providing these sandboxes for the computer for. For the agent to work in, and we've landed in the system that we've worked really hard now to develop, which is. Checkpointing a computer, and so you can imagine you come to work, you start a new project.

We have this common, what we call a golden checkpoint. Which contains the OS and the system services. It has common tools installed and a dev server that is ready to start. And this checkpoint it includes everything: memory and also running processes. And so when you start a new project. You get all of that for free, and all of them you copy it over in about 230 milliseconds.

And so, once you start a project, you might have some specific. Code and some dependencies within that project. And that is also a checkpoint that as you go. And so each time the agent is running and it finishes a turn, we will actually save a checkpoint. Off that computer, and from that we're able to again. Like very quickly, some second, spin that computer up whenever you need it. That means we can save on resources by you know.

Spin this down if you need for say ten minutes or so, and come back. You can spin it up. Kind of requests. In transit, will not even cross in this app.

### 00:13:02 — Forking computers

The other thing we can do, thanks to this checkpointing, is that. Just like the directory itself, in the IronPython, we can also port the computer. And when we do this, we have, for example, we have a feature in Lovable that's called Drafts, where kind of. Work in different environments of what you're doing, and to support that we need to afford the computer that you're working in, and.

Here we have kind of. The example of doing two at the same time, and you can imagine doing hundreds of these, right, and so.

### 00:13:38 — Copy-on-write and streamed memory

We've we've had to do some optimizations to make. This feasible to actually run. So one of these optimizations is copy and write on the RAM itself, and so. Creating one of these forks of a computer is. It's basically free in terms of the RAM that it's using. But as soon as you start writing in a process to Ramp, we will kind of copy that page over. And when the damage is started, having to allocate new members.

And there's another optimization here also, which is that. Each of these sandboxes to require a few hundreds of megabytes of memory. But and that would take a few seconds to stream in. You have been like called on disk storage, and then it has to go to disk, and then into memory of this. This VM, but. Thanks to being able to stream the memory, we can actually. Boot up the machine before all of the memory is.

Is actually ready on it, so. The memory that always uses comes first, and then like processes and so on will start to work. As soon as the memory gets there, and this also shapes up. Some, some extra sort of time.

### 00:14:48 — Rewriting the dev server in Rust

And then we started asking ourselves, how can we make this even more efficient and even more faster for our users? And so you might be familiar with Niteshift, which is a The dev server that most of the meta frameworks out there in the JavaScript. The ecosystem is using, and so we took that and we forked it and we rewrote it in Rust. And that made our cold starts two times faster. We went from getting this preview from 40 seconds to three seconds, and the main.

Kind of thing that we make matter is that we use a Snow DS, and we're able to. Like drop that dependency off beat itself and just have this rust binary so. That made the memory footprint be 6.5 times less in these machines. And by taking control of the applications that we're running in these computers, we're also able to control kind of how we write. To memory, and so when we control how we write to memory.

We're even more optimizing. If you remember back to the kind of the copy and rights solution when we're drafting different. Different computers, and so we're able to run this extremely efficiently, so that we can run. Lots and lots of agents in parallel and kind of have agents explore different solutions to solving a bug or. Improving the performance of your applications and so on. And so this has been fun.

### 00:16:03 — Verification: inner and outer loops

But the last piece now is. It's about verification, and of course, this kind of computer and this cloud service—a big piece of being able to verify what an agent is doing. And if you look at verification, you can think of two things, right? That the agent needs. To get information, it took an action. Was this a good action, or was it a bad action? And You can think of it as this inner loop and this outer loop.

So this inner loop is during the turn of the agent. And you have kind of obvious things such as like the is the build working? You have linters, typers, and the code that we're running. And then you can check for runtime errors in the previews that you're running. You can also have within this computer a headless browser. Where they can kind of explore the web app it's it's building or whatever it's building, right?

And a bunch of other things that we're using to help verify. Within the turn of an agent, but then you also have this outer loop, which is. Between each turn, and the turn you can think of like when the agent is yielding to you as a user. And between each term, you might get some info on the product itself. From production from the user's side, and so you can look at how your visitors or behavior or behaving.

What users are telling you online, you can do automatic A/B tests and actually see. Change some copy and see if it's improving conversion and so on. And then you can also take these business metrics, and remember, this goes back to kind of the capabilities I showed you. By having control over these things, we can make sure that we can optimize how the agent is getting this outer feedback to.

So we can make sure that if you're running payments, we can actually. Track those transactions and conversions, and make sure that. Davin can actually help you optimize not only. The code right, but the business strategy around your product.

### 00:17:54 — Wrap-up

And so, those are really the three things that we've been working for. And we'll continue to kind of build out. These capabilities and this architecture around really orchestrating these alarms. Into the Asians, and so this agentic system that we're building—it's running billions of tokens per minute. And these computers, right? You can spawn up with each agent, and can have multiple agents use one computer. And now we're kind of back to this quite beautiful setup where we have agents talking to agents, and they're orchestrating, and this time.

It's it's actually working and it's working at scale thanks to some of these optimizations. And so, if you're curious to try this out, you can head to Lovable Avenue. You'll see our Or previews speeding up it and so on, but you'll get a very simple and a nice interface, and you won't have to care about all of this stuff. Thank you so much. It's been pleasure, and yeah, hope you hope you learned something.

That's cool.
