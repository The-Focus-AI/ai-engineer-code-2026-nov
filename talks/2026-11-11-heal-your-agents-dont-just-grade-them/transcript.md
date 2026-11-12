---
title: "Heal Your Agents, Don't Just Grade Them"
speakers:
  - name: Khasimul Asif Mohammad
    affiliation: Splunk
  - name: Sudhir Tonse
    affiliation: Splunk
room: "Continental 1–3 (Expo Sessions)"
starts_at: 2026-11-11T11:45:00-08:00
ends_at: 2026-11-11T12:05:00-08:00
format: talk
recording: 2026-11-11_1148_Heal-your-agents
duration: 1404
source: qwen3-asr-1.7b
---

> Filed on the operator's attribution, not on a name in the audio: a note captured during the
> talk (notes/inbox/2026-11-11T1156-immune-system-not-ticketing-system.md) and the folder title
> name it, and the transcript answers the abstract's claims. The unprompted Voice Memos
> transcript names neither the speakers nor their company.
>
> The recording starts as the talk begins. The first speaker hands over to his co-speaker at
> about 00:06:09. The demo audio (00:13:53–00:16:18) was hard to hear ("Sorry about the
> audio"); Qwen rendered two passages there and at 00:08:57 as Chinese and Hindi, kept as
> transcribed. From about 00:21:30 the recording is the closing pitch and conversation after
> the talk.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names of overlapping sessions. "Asif" and "Splunk" may come from that prompt: the
> Voice Memos transcript has "asid" and "calledard" there. The Voice Memos transcript is kept
> beside it as `transcript.txt`.

### 00:00:04 — Opening

Still, really well. Higher. So let's get this going. Thank you all for being here and. It was a really nice hanging out here now, and we're going to have a good chat. What are we going to chat about? So, it's. There are different things in different places. We're going to talk about that. Right. That's the company. Anyway. We are agents, so. How many folks are actually deep into this year, as far as building multi-agent data framework and?

Quite a few, NASA even does a few hundred. New York, much more advanced.

### 00:01:04 — Introductions

Our companies. Here is my friend and. Product manager by trade, you can call him Asif. It's got a long name, but. A company called Splunk, and then. Here we're part of this project called Splunk. Agents of Google. So if you're all living agents, which part of you are? Then you understand the fact that Alice needs.

### 00:01:42 — Evaluating agents

It's got. The agent-based applications are very complicated right now. We want to evaluate your agents in multiple different ways. For example, the Holocaustation stops due to racism. Two conditions, context adherence. There's quite a few ways you can sort of evaluate your data. And that's a very important idea. How are you going to manage those agents?

### 00:02:08 — Observe, then act

The second part is that once you have your evaluation. Typically, of course, we open telemetry or some sort of monitoring mechanism to. Capture all of the events that I bring to the LMs that I bring to the tools. MCUs, sensors, all of that data, that structure. Faces like that, we want to capture that. And then, of course, what's the point of observing if you can't do anything about it? Right. So that's where the garden is.

What I've done is well. You observe. You see that a bad thing is about to happen. And you want to either block it or steer it differently, or get some other kind of action. And that's the kind of thing we've been doing for the past few years now, and. So the better thing is the ones that really run on data engineering. Thank you. Thank you. We're in the Southern Connecticut section.

### 00:03:19 — LLMs as judges

So that's the fundamental concept that everyone knows now. We just yeah we create LLMs using LLMs to generate diversity. Might have heard the saying that for every expert. There's an equal and opposite return, right? So as a stats engineer, you got you got an awesome stats engineer. The similar concept when you are evaluating an LLM output, you can ask. Other elements to be the judge, and if we had an art element before seven seconds.

And you use prompt engineering, and use a dataset, etc. That's called evaluation, and then. You reach a certain level of accuracy. Now you want to make sure that you find beyond that accuracy. As an in-browser application, and that's where we come. So we launched the product called. In the United Kingdom, we use Splunk. But then OpenAI came up with Guna. It was a large language model. Ours is a small language model.

And so it goes. Final accuracy. Coming to the small language model, we find that for better cost, error frequency, and the ability to display.

### 00:04:28 — Sessions, traces and spans

Okay, so far so good, and here's a pictorial view of what that looks like. As we mentioned, the incoming open telemetry data comes in. And you can imagine there's multiple user sessions going on. Within sessions, there are traces and spans. So it's like a tree that's formed. And to that, you attach these evaluators. And expanders, and the trees, and the sessions. All good. Well. Everyone's done that. Wait and stay on the floor.

### 00:04:55 — The journey to signals

Here's our journey. We started doing this roughly between 2020 and 2023. When we publish a paper called ChainPole, which is essentially about like small language models and decision making problems. And we graduated towards where we are. By 2026, we had something called signals. You might notice insights, patterns, signals, etc. So that's what it is essentially. It's about protecting a pattern. Then a set of things that are summarized for you beyond that.

By the way, we're a company called GAN Deal, which runs startup. They've been my sponsors for Barrel until the acquisition, actually. Talking. Are they back to maybe my sponsors again? They've got signals through that, and that's the journey we're going to talk about. So it's not about just real. It's about hearing them. And we've got Dr. Asif over here. I'm not quite the doctor yet, but he's kind of.

In those kind of situations, but it's going to take us to a somewhat different challenge.

### 00:06:02 — Why regular evals are not enough

And why just the regular eval loop is not enough? Regular evaluation is just not enough. And Asif is going to talk to us. Why not? Thanks. Hey everyone. Thanks for your mention. I'm PMR team. So I'll say a little bit here about our signals capabilities, but as you heard. Evans are amazing in terms of being able to like video agents and see how they're talking in interaction.

But then, how much of a thorough you are because there's always. Some unknown in terms of how your agents are going to function, and that's just by design. You're not going to mistake. And we're just looking for what we're innovating, based on what we already do. Plan for what about those things that you've not thought about, right? And then, what happens when you have these places in terms of ingredients of?

Traces per day, or a week, and so on. You can't do traditional application monitoring approach of. Going into places or searching based on trace ID and so on. That's not going to work here. And also, why is that? We have a different type of users. Could be user input drift. They could be model-based changes. Security risks, especially in our adversary attacks, and then environmental. So when you have all these things going on, what you need is something that's looking.

For these issues, or something that raises.

### 00:07:27 — The immune system as inspiration

And thus the thinking that we have in mind and the vision we have in mind. In here, just how do you build this kind of capability? That's very doctor and music on skin. That you are like okay, so you have to. Power systems, and we took inspiration from the fact that when you go to a doctor, essentially your body, you have a pathogen inside. Pathogen entering, it's not waiting for some test.

Is trying to understand the problem, trying to respond in terms of getting to the root cause of it, and then he tries to remember. So that going forward, if you have a similar situation, it makes sure it prevents you from falling sick again. That is, that's that's the loop. That your body is trying to do in terms of actions. We took inspiration from the same concept and tried to apply here.

And that's what led to us building Signals One Point Zero earlier this year. This. Did exactly similar answer to you, where we kept looking for unknown issues with our agents. Surface then by security, and then bring up errors and traces. So that let's say an AI engineer, you want to expose these things. We tell you exactly where this problem came from, and then. You can go and fix the issue. Now this was.

Working well. In fact, we have quite a few enterprise customers that lock this up and enjoy it, and then. Seven such renders on their opportunities signifies.

### 00:08:50 — What customers asked for next

Now, this while it's becoming a commodity in the industry, what we started hearing from customers is. 一樣每百人嘅字，點樣咧？買咗幾多？ And I'm not on the problem with your agent. What I mean is, just like a doctor does. Give me clear diagnosis and promises of this. Tell me, don't just run it one time for me. Like do it on a regular basis, run it on a daily basis or even weekly basis, and keep telling me.

This issue is emerging again, and it is coming again. Tell me, is it worse here than it was? Or if it's something that needs to be archived under values that's important to me. Take that feedback. I don't. Surface these are not issues. Like I say. Sometimes people come and say, Hey, context note is very nice and so valuable. You don't need any news. And then. The other thing I came up was don't look at just a few sample sessions.

Look at all the sessions. And then, can you be a little more opinionated about them? Like, tell me. What kind of failure is it? Is it an orchestration problem, or is it through some platform, or is it security problem? We'll talk about this, and then be prescriptive about what I could do. Don't just. Tell me here. Go make some changes. Tell me, do I have to make some changes to my prompt? Is it about Adding more rules, or just do and evaluate because it's probably not the smartest problem.

Okay, give me stack plan recommendations here.

### 00:10:14 — Continuous detection across sessions

None. And that's what we launched this week. And the approach we've followed is incorporating all the feedback from our customers. And we are now looking on a continuous basis across all the sessions. And we can learn from all of these types of failures that we can learn from. And then come up with a start time recommendation list. For some of these issues, we gotta help you to make a prompt change.

You probably just need a data interface. Sometimes you may have just. And that so this is where the game of this particular approach, and this defines our signals to find our approach.

### 00:10:56 — A taxonomy of failures

Now I don't want to read through all of this. We have people that we published. So please take time if you are going through it. But this is the white taxonomy that we came up with on the nature of data-driven failures that are common. And this comes from being customer exposure and having spent with our enterprise customers who've been doing like. Almost half a million different exceptions per day. The kind of things that they're doing, and we're incorporating them as we go.

### 00:11:22 — Recommendations and remembering

So, by. Okay, going back to the pattern that we brought up earlier, this is what SignalFlow Control does. We have a fundamental issue with the opinionated approach. And then we are coming up with this. Let's respond to it by coming up with a bunch of stylized. Stack plan recommendations that we could give. Again, this will evolve over time, but today I think. For multi-agent systems, we understand there are the typical features, right?

It's a system prompt chain. It's a model chain, or it could be. Just have eval in place, or guardrails in terms of steering its behavior, and so on. And then remembering it, and this is the key part. Just because an issue has emerged, it's not enough. Who, who are a creation of being? We also want to remember and remind them again that AI is not something in the past.

So whatever fix you get is not good enough. We want something other than that, and this is where the refresher comes in helping the customers close the loop. Why so?

### 00:12:42 — A customer story

One of our customers, but I can't name them. But they are running that insurance policy against. Right, and that's the business world, not just a chatbot in, but an actual business world. And imagine, if you will. That you know, there's a ton of evaluations we've actually been running on that. So essentially, what you want is a faster way to do a CEA, or do a new cost analysis.

And then, well, that's not enough. A lot of people can do that now, but it'd be better if you were to say, Hey, I know exactly. Bucket that we identify, and we also know how we can fix it too. Right. So that's remediation, and well. That's not enough either. You want to complete the entire loop. Once you fix it, you want to verify that it's. Indeed, and as a trend, the number of people fix so we can.

Keep going in production, and make sure that it doesn't recur.

### 00:13:42 — Demo

So. Let's see if the Star Yourself thing works. Yeah, that's the agent. This is the product, as you can see, Splunk has shown. Hi everyone. Today I'll show how signals help us find problems in an agent and get its behaviors. For this demo, we are using an in-house solution that handles features and events. It's the kind of assistance who might already be happening within my data environment.

So, let's open Splunk and see what problems it has found. Yeah, IBM is also a critical security company. And. Signals is found that it happens in one out of ten. Sessions that were that I reached this step. I'll open evidence. This is for my laptop screen. So the payment instructions listed a different account from the one that. But actually, the group has been a little bit. Second round. Agent used that account and send the money, and afterwards it checked.

There was a problem, but it couldn't make the money back. So. अच्छे टैक्सन आते हैं लेकिन टैक्सन भी The latest news from the Google Cloud Platform. And pick this option. It's in progress. I use CodeX as my tooling. I like looking at CodeX. This will go behind the scenes and try to understand what's going on with this. No, this is not great. Using the inspiration, metaphors. As the average thing, which is the size of this, not this great. Exit. That solves a stable problem for execution.

All right. So what are we looking at? Sorry about the audio. It was kind of making noise and.

### 00:16:29 — What the demo showed

Again, the takeout there is that the first thing we summarize issues. Actually occurred, and there's a navigation part where you can actually click on that, and in this particular case. Happens that the remedy is that we make code changes. Not only was integrated with colleagues, etc., etc., on the business case, in fact. Showed you that this is where I would make a code change. You applied this.

And you know the setup is about engineering. So it's about giving. Everyone knows that Splunk is an engineering company. But there's some significant differences about cost, about accuracy, about all of those things.

### 00:17:23 — Why not just use an LLM?

I mean, one question that gets coming up from our customers is that. Okay, so we take the product, the young staffs, and then. Coming up with recommendations that we can provide to users. Why can't I just do this with an AI? Right? Like just put this all in the prompt and then do it. Last year, we tried also to do this comparison with their benchmark in the past using same model, same.

And try to see how this fares, and we noticed that there is at least some educating percentage points improvement. Now, first, we can go do that trial and then prepare to. Aspect is the fact that we spend time in terms of plumbing and pipelines to make sure that. We do the hard work for customers in terms of making this more high quality is the big difference. So I just published a bunch of data sets on the efficiency and quality of.

Please take a look. The reason we talk about this accuracy is that for enterprise customers, even one percent data point accuracy. Makes a big difference, especially when you have like millions of sessions.

### 00:18:24 — What's next

So let's talk about what's coming next, right? Like. When we talk about meaning for us, this is still just the beginning. There's a lot more to discover here, and in terms of the problems, we want to. There is the cost efficiency aspect. We're looking at like half a million sessions per day. Imagine the number of tokens that we're involved, right? So we have to make sure that.

They were looking at the same benchmark while being pass efficient. The second is there are more remediation types that we ask. Is a thing of someone as the approach. That developers are finding very different things keep changing. We also often keep coming up with more refined. Mitigation options. Here we keep providing our people. And then the DAXM itself. DAXM was leaning heavily on at this point. Two large markets. One is the agent into the coordination issues.

And then the others are the external, third-party processors, platform processors, cost. Because the artificial scale of interaction occasions is just becoming. More harder to handle for us, and more noise. So we are kind of keep investing here, and we expect that to bring us some unique value.

### 00:19:48 — Takeaways

If I have to summarize, these are like four things that I think we want to like take away from the session, like the. Isn't trust relies on obviously we start with people because if. Before you put your agents in production, you need to think about what it is and what you are doing, and then the other starting is. Detection keeps going on as our signals. The next you will be giving us, and that helps you build the trust.

The conference aspect is what makes the gives you gives enterprises and agent builders the trust. That I know that I will define the problem, way before my users can. And then, of course, the failure modes are keep evolving. I think. Since he built our systems one point over nine ten months. It actually makes it valid. I think we started with like, hey, we've got something out there.

In three months, I was like, "Oh no, it was not enough. I need like six times." And you know, obviously, overlapping with people was. Top ten malaria medication, but again that's not enough. We just constantly keep working, and of course. I want to bring this back again about the accuracy aspect. We have focused so much on the S one accuracy of signals versus random, to say, a generic random, because.

Each percentage point for customers. In fact, you know the first time we use. One of the enterprises was like, hey, for me, 92% accuracy is not good enough. I wanted to go to like 95, 98. So, whereas each person's fine accuracy is important in terms of helping enterprise customers. In about agent trust, and then we use it for navigation. Also, we just try the agent systems are.

### 00:21:30 — Closing and after the talk

Yeah, with that, we've got exactly two minutes left, but. We did some better demos than we did last year. Also, we are hiring, right? AI researchers want some of us because we are building decision models, justice models. For you know, low cost, high accuracy, low latency. Looking for all the core engineers. Looking for SAs. There's our banner. This is my every. Yeah, this is this month, and then we have different ones.

Different colors, different vibes. This room. Man, these days are awesome. There's a lot of engineers and. Yeah, and I don't drop so many bullets, but at the same time, the ones are very tough that I've understood. How do we take these applications into actual production? And understand that every product that's human-powered. What's up? Fever. Kidding. I feel like. I'm just hungry, and I have eggs with me.

Let's go get some eggs. Yeah. Yeah, like five dollars an egg down there. Really? I didn't even check.
