---
title: "A New Age of Software Engineering"
speakers:
  - name: Walden Yan
    affiliation: Cognition
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-12T11:20:00-08:00
ends_at: 2026-11-12T11:40:00-08:00
format: talk
recording: 2026-11-12_1120_walden
duration: 830.8
source: qwen3-asr-1.7b
---

> The recording opens as the speaker begins ("We build a AI product called Devon."); the MC's
> introduction is not captured.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names and affiliations of overlapping sessions. "Cognition" at 00:00:12, 00:05:48
> and 00:09:30 was in that prompt; the unprompted Voice Memos transcript also has "cognition"
> three times. No speaker name from the prompt appears. Other names are kept as
> transcribed: Devin is also "Devon", "Devan" and "Dem", the 40x is once "48x", the Vera Rubin
> GPUs are "Verro Ruben" and "bare Ruben", the GB300s are "GV three hundred", Datadog is "data
> dog", and the Slack channel is "this black channel". The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Introduction: 40x merged PRs

We build a AI product called Devon. I want to spend most of my time here today, though. Kind of straying a bit away from that, and focusing on what are we doing internally as an engineering team. To move way faster, and so the backdrop I would put for all this is this is what our merged PR throughput looks like at Cognition. The start of this is around.

Twelve months ago, so you're looking at about a snapshot of a year, and over this last year. This blue chart here. This 40x. Is a 40x in the number of merged PRs we are producing on our engineering team. Now you might also notice there's a small black line along the bottom there. It's easy to miss, but that two point seven x. That is our engineering headcount growth in the same period.

So we have been hiring engineers, but each of our engineers is now more than ten x more productive than they were before. And I would dare to say that these PRs are just as high quality, if not higher quality, than they were a year ago. So really, the crux of what I want to talk about today. Is what did we do to unlock this 48x engineering throughput?

And there's a lot of things we did. From both the codebase to the way you structure engineering teams. That I think are very practical steps you can take if you want to reproduce the same results.

### 00:01:18 — The software factory

Many of you are probably familiar with the Software Factory. How many of you guys have heard of Software Factory? Let's see a raising hands. Cool. So, I'll start with the basics, and then I'll work my way up to the more advanced stuff. The basic idea of the software factory is. Yeah. By default, everything should be self-driving. We have PRs that go from initial bug report. To file merge and monitoring and maintenance, without human involvement, oftentimes human judgment is needed though.

And that's where we have escalations. But by default, our entire Software development process is just run by Devin from end to end.

### 00:01:48 — A new role for engineers

One of the things this means. Is that the role of the software engineer has to change quite a bit? Around March of this year, we had this conversation with the engineering team, and we said, "Look." If you are right now just picking up tickets off of your board and then sending that to an agent and implementing it. You're not going to really be set up for success in the age of AI because anything that is described and can be implemented will be able to send to Devin.

So really, everyone has to change the way that they're developing. And the way we've enforced this is we've taken our larger teams and we've broken them up into smaller pods. In these smaller pods, not only are given swarms of agents to do work for them, they are given more broader responsibility. So instead, you might have only two or three engineers on a team at a time. But they're responsible for everything beyond engineering as well.

They're responsible for missing customer bug reports. They're responsible for doing QA testing. They're responsible for doing the PMing and product management, and basically every engineer manages their entire own linear board of things to do. And they send that to an agent to perform. So it's really a fundamental change in the way that our engineers do work. This has been one of the things that we've implemented over the last year, and we've been helping a lot of large organizations implement.

For themselves as well.

### 00:03:09 — Working from Slack

Another thing I'd like to highlight is we work from Slack everywhere. So this is an example of what a customer bug report might look like. They send me a video on Slack. And we just forward bug reports. Straight into our internal channel, and we tag Devin and say, "Hey, please fix this." Devon really comes up, shows up a PR, but then also sends back a video. With the fix, improved.

And this makes our lives so much easier because I literally don't have to leave Slack for most of my work. We've abstracted away all the development to be based on evidence, videos, and I can just send the proof. That the fix is ready right back to the customer without having open an IDE or even GitHub most of the time. So this is kind of the end goal we want to reach, which is.

A point where you can do your entire development lifecycle without opening up an IDE or without opening up a single coding engine.

### 00:04:06 — Testing without live services

But to get to this point, there's a lot of infrastructure we have to change underneath, and so this is the hard part. That really every engineering team has to do if they want to get that. It's not just you purchase a coding agent. You got to go change the way you build. So. Before, when we tested our applications, we'd be testing them against cloud deployments. We have a staging environment connected to staging database connected to live servers, and then we have our engineers manually go.

Click through and verify that the flows work into it. We did a big migration. To move every service to be able to run locally with Docker Compose. We've made it so every third-party service we have mocked versions. To be able to run them, and these can all run inside a single virtual machine that every Devan has access to. And every code agent in our company now does not need to touch any live services at all to test their changes.

They, in fact, these VMs we rebuild them every hour at the. Every hour, we pull the latest version of the code. We rebuild the entire codebase from scratch and be able to run very quickly and easily from scratch. And if these builds ever fail, because your codebase is rapidly changing. We also have Devin be the first response there, and they're always immediately fixing these VM snapshots. So every time you spin up an agent from Slack, it goes to a fresh machine on a fresh version of the codebase with the latest updates.

And by the way, these agents. You need to teach them how to test your codebase as well. But the benefit of using cloud coding agents is that they self maintain their training data. So that last section there on testing. Devon will write its own skills for how to test our codebase. The codebase will change over time, so the way you test it will change. But Devin can keep on updating his skills so that tests it over and over again.

So the end result of this is literally people do not need to open their laptops anymore to test any code changes. In fact, several engineers at Cognition. Have already moved to using iPads for the development process. By the way, iPads are also more secure. You know, you see a lot of these hacks recently. A lot of it is because of. DevOps and people leaking keys. Who knows what's on your developer machine? You might have secrets all over the place.

When everything is in the cloud, in these controlled VMs, you're actually in a much more secure spot. I showed some basic versions of things you can test. We also tested advanced multiplayer setups, which is really cool. We oftentimes, when we were developing Devin's ability to join voice. In Zoom calls, we actually had Devin. When it tests, create multiple accounts, have them join the same Zoom call, all from within their one VM.

And send voice memos back and forth to make sure that the functionality is working. So you can do quite advanced setups if you really push the limits of your Kubernetes.

### 00:06:41 — Recursive self-improvement

And actually. On top of all this, you know, you obviously want recursive self-improvement. I think people think about this from the model sense. Quite a lot, but actually, if you think about it. Every single line of code that's being written, every single PR that's being generated, every decision. If you have an audit set up, that's all tracked across your entire codebase. So there's no reason why you should also be able to run agents on top of that.

Do the data analysis and figure out where are we wasting time, where are we wasting tokens, what? You know things can be turned into scripts. What tests can we be adding to improve this process? And so we have a channel where Dem every day posts ideas about hey if you. Change our node setup. We can save like a minute off of our CI. If we change this lint script, we can like catch 20% more of these bugs before they ever hit AI code review.

And this has actually been a huge unlock, where you can just set up these systems, and the agents will go and optimize your software factory for you. This has been really exciting.

### 00:07:41 — From tasks to jobs

One of the things that I don't hear people talking about a lot, but I think is really where. Things are going next is moving from the world where you're giving tasks to your agents to giving jobs to your agents. And this is a bit of a paradigm shift. You really have to start treating these things like coworkers. So, what does giving a job to an agent look like? Imagine I care about backend performance.

Really, this is what the development flow of the future should look like. You should send to your agent, hey, I want to improve P99 latency of my application. Instead of you telling me what to do to do that. It should say okay, P99 latency. Let me add the telemetry to figure out where our P99 latency is today. Let me. Set of alerts, so I can figure out where we need to be in the future.

Let me go break down every single task we need to do to be able to move this latency. Let me. Create data dog alerts. Let me create weekly reports in Slack, and let me send you updates on your phone every day. Here's where our P99 latency is, and here's how much it's improved. This is fundamentally the type of systems. That we encourage all of our engineers to be building their cognition.

We don't even we don't even want you to be prompting your agents most of the time. We want you to just be giving your agent goals that they can work. Toward over long durations of time, and anything in your company that you think isn't measurable. Find a way to measure it. You know, do you care about your application performance? Go measure, you know, the latency of clicks on your application.

If your application has a lot of weird layout shifts, go measure the bounding boxes and try to figure out how you can minimize layout shifts across your application. There's also P9 latency, but there's also things like you know onboarding retention. How much of what you guys do as engineers is things you can boil it down to a single number or metric? And I encourage you that if you can do that, you should just set up an agent to go optimize that number twenty four seven.

### 00:09:27 — Example: inference latency

So a great example of this is inference latency. At Cognition, we're lucky to be the first receivers of NVIDIA's new class of Verro Ruben GPUs. Internals were not built for these GPUs, so we received them. So we had to from scratch figure out how do we build our own inference stack on top of this new hardware that's coming out, and. Agents have allowed us to do this in a way that is much more efficient than before.

So, we just tell that hey, we care about the throughput, our T P M, of these G P U's. Go figure out how to push that to its limits. And over the course of was about I guess here like a week. The agent was able to go. We allocated it a permanent set of GPUs to work on. It was able to go find different strategies. Test them. The strategies that it found worked best. It was sent to a human engineer for final approval.

But basically, there's eight or nine different things that were roughly discovered. Via just giving these agents these high-level goals, and we're able to push the. Throughput on these new bare Ruben GPUs from. What was worse than the new GV three hundred s to what is now significantly better than the previous class of GV three hundred GPUs. Again, this is all done by just giving a end goal to your agents.

### 00:10:45 — Example: Android parity

Another example that I like to share with folks. We are a very small engineering team. It means we do not have oftentimes the bandwidth to fully staff things that we might want to do, like authentication. But the other day, one of our engineers, our team, Samuel. He had this brilliant idea. He said, "Okay, look, we have a team of people working on building a great iOS application." Can't we just use that as a blueprint for our Android application?

And tell Devin, hey, go maintain parity with from an iOS application to an Android application. And that is what he did, but it wasn't just hey one dev session to go do all of it. He said, "Set up permanent hooks against our codebase to monitor the iOS application." you know, going into this black channel. For user feedback about our applications, and then go recursively improve our application.

Go do live QA testing of every detail and making sure it all works. Syncing these things live has been really cool. And I think the final results here are actually quite sick. So we really just gave our agent this one high-level prompt, which is, hey. Go manage the entire Android application, and over the course of 44 days, we have a working application, which we'll be putting out soon.

But as the time lapses, most days there's not a single human message going to the stage I'm working on it. And on those days, you know, was merging upward of like forty, fifty PRs a day. All this is being live QA tested against the iOS application, pixel for pixel. Testing whether, you know, escalating only the most important decisions to a human at the end of the day.

And most of the time, our engineers don't even need to look. Open them, and they're just from Slack. We get the recordings that sent back to them. So in the app, the human is barely doing anything in the loop. This is how many messages a human actually had to send to our agent in. Entire process. Yeah, and it's not a slo—it's not a slop application. This is actually something.

That we will be going live with very soon.

### 00:13:07 — Be ambitious

So cool. That's actually all I have. I think the. And message from all this is: if you set up your agents correctly, you can do some pretty incredible stuff. So I think really most teams are limited by the amount of ambition they have. So it's time to be ambitious. Thank you.
