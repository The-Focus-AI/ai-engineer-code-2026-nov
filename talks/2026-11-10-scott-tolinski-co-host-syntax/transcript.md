---
title: "The True Cost of AI Coding"
speakers:
  - name: Scott Tolinski
    affiliation: Syntax
room: "Continental 1–3 (Workshop Room 1)"
starts_at: 2026-11-10T10:10:00-08:00
ends_at: 2026-11-10T10:35:00-08:00
format: talk
recording: 2026-11-10_1009_Scott-Tolinski
duration: 1437.4
source: qwen3-asr-1.7b
---

> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names of overlapping sessions. "Databricks" at 00:14:40 comes from that
> prompt, not the audio (the Voice Memos transcript has "it's often uses like a marketing
> thing"). The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:03 — Introduction

And the talk will be on the true cost of AI coding. So. After seeing the mental health effects of AI coding throughout the industries. Developers on how agentic workloads are affecting their mental health. So he's going to share us. What's happening and why?

And without further ado. Welcome, Scott. Hey, what's up? My name is Scott Tolinski. I'm from Syntax. It was a great introduction.

So I'll just get right into it. I have a lot of slides, so I'll be moving relatively quick here. So, yes, AI coding. Co-hosted syntax. Syntax, by the way, is just a podcast or a YouTube channel. And we do all kinds of stuff.

We stream every single week, covering either the latest stuff going on in the Web ecosystem, but just programming in general, and we've been doing this. For a long time, I'm also an executive producer over at Century, which is a great place. To really understand what your agents are doing all the time. Agent tracing, they have error handling, error tracing, all that stuff. Awesome service, CenterNet AI, which I.

### 00:01:23 — Disclaimer and backstory

Okay, so quick disclaimer here. This is like a mental health topic, but I am not a mental health professional, and I'm not. Trying to claim that I have any kind of deep understanding of this stuff. But I am deeply connected into the developer ecosystem. We get thousands and thousands of comments on our YouTube channels every single week, and.

I would like to think that I have a good handle on how people are doing, and a lot of this stuff is stuff that a lot of people aren't talking about. So, yeah, like almost two years ago, I had a really bad. It really messed me up. In fact, I was getting. I'm eating zombie.

I'm getting two hours of sleep a night. I'm getting a lot of muscle twitches for. Wow! Like maybe like three thousand muscle twitches. A day, just kind of all the time, crazy symptoms, right? Physical symptoms, it was driving me nuts.

And it took a long time to recover, right? I. I just got better habits and worked through it, but. Just about the same time that I was like totally recovering from this. Something crazy happened in the industry, and the models got really good. Like I think we all know that like Obis, Orbot, and everybody was kind of like oh.

You know, this isn't maybe just this isn't just slop anymore. These are things that maybe I can start to trust the code a little bit more. And as a lifelong engineer here, like. For me, it was like a major point. Like, wow, the possibilities are so open right now.

I started prompting a whole lot, and what I noticed is. Is that some of these post-pandemic symptoms I was having started to creep back in? Right, I started to. Really feel some. These physical symptoms I was having—the muscle twitches, the insomnia, all that stuff—was starting to come back, and I was really.

Really confused by it, and I was seeing a lot of comments on YouTube. Right, people talking about.

### 00:03:25 — A viral tweet

How it's effective, and then I saw this tweet, which went viral from Rob. Rob says. That he ended up in the hospital because. Of stress related to AI coding, basically when Fable was getting removed, he wanted to use up all of his. Tokens before they were gone forever. So because of that.

He stressed himself out to the point of exhaustion and ended up in the hospital, and the comments. The code fleets, all that stuff on this. A lot of people. Were laughing at it. They were. Clouding on it, you could say, but the people were just kind of shocked that this would happen.

And at first, I even kind of had a very similar. First, I was like, "Oh, really? You invented an octo?" And then I I started to like really put it. In my own experience, as the physical symptoms of. Anxiety or stress I was experiencing, and I totally understood both.

### 00:04:22 — The survey

Really mad that this happened. So I surveyed developers. And this is well above 4,000 respondents so far. I'll have this link available. We did a whole video on syntax.

As well about this, if you want to take the survey. We surveyed developers with five quick questions about their mental health in regards to AI coding. And we got a ton of response, like massive response. Because people, they've been doing this stuff, but nobody's talking about it.

### 00:04:51 — Prompting past quitting time

So the first question we asked was, if you prompted it past your intended time of stopping. And 52 percent of the respondents. It said that they prompted past when they attended this office. They said. Okay, I'm done working at five, and it's like five fifteen. It's five thirty.

Whatever they're continuing to prompt, and this happened to me too—a whole bunch where it would be getting late. It'll be like nine o'clock, ten o'clock. Oh, okay, no, did a bad job. Let me just one more. Let me just one more, right?

On my phone or something, or even might leave my computer cracked open. Hands up. And we also ask people to leave their thoughts here. And I don't know about you, but every time I've ever done a survey. I've never ever submitted anything in the other thoughts part of. So we got over 1,000 other thoughts.

So I'm going to have some of these printed in this talk. So anytime you see a quote, this is somebody's actual. Other thought that they got it while they were taking the survey. So this person says months ago I made the AI prompt me to stop. For lunch and dinner, and I still ignore these pop-ups as much today.

So this person even put in reminders, whether that's the AI reminders or notifications or whatever.

### 00:06:05 — Sleep

And they still push through it. We also looked at sleep change and self-reported sleep change, and people who had difficulty stopping also. Largely reported having difficulty sleeping. And I know this personally because when I would prompt. And I would get really into a session, really deep late at night.

My sleep was either bad, or I had a hard time falling asleep. Which, with my post-encapsulated recovery, was like a nightmare.

### 00:06:32 — A variable reward

All right. We also did have some more positive comments, so. It feels like I'm buying lottery tickets with my time and attention, but it's so fun to build. This is kind of half positive because lottery tickets and gambling. There's a lot of sentiment around gambling here. Which is not a whole big surprise to me because.

This is maybe getting less relevant as the models get better, but. Over time, especially as you dial in your process, sometimes it can all feel like a variable. Reward system like a loot box on a video game, right? Where you're just like, oh, it's not quite right. Ooh, they goofed up the padding on this one.

Ooh, the the. This thing has now totally broken, or they implemented some new weird layout that I didn't approve of. And it really just that like pull of one more. Right? Maybe this this prompt is going to get there. And some of this is absolutely a skill issue, but in the same regard.

A lot of people are experiencing this variable rewards system. And so, what happens again? Late at night, staring at your computer, you should be sleeping. By the way, this whole talk is 3D models. Every single one of these.

And you can point your pointer. All right. So that's crazy.

### 00:07:54 — Pressure to produce more

All right. So feeling like you should produce more because AI makes it possible. It should be no surprise that a lot of people are feeling major pressure in their organizations. So, 71 percent of respondents. Said that they feel like they need to be producing. More just because AI makes it possible.

Only 195 people said never. Pretty wild to me, but like. It's it's it's shareholders. It's it's your boss. It's everybody. You don't want to become.

You're the permanent underclass, right? You need to just keep driving and keep spending tokens. This person says, "There's an immense." Pressure to shift my company. Previously, it was okay. You could go an entire week with one or two major tasks completed.

Now they expect a major shift every day, and are actively punishing people whose productivity did not rise. Punishing people, yeah. This respondent said the opposite, or not this one. This one is actually kind of bleak. All right, writing code by hand feels like taking a break, as in stealing company time, and actual breaks.

Feel borderline illegal. This is some of these actual thoughts here now. I don't know about the whole writing code by hand feels like a brain. That doesn't feel like a brain to me. But I do understand the sentiment about feel like.

Actually, taking breaks. Like I'm sitting at my my desk, and I always have a hard time, you know, taking a break for lunch. But now I'm like, boy, I just like talking to words, right? And it's just like these habits; they just kind of happen over time. And so you also get this pressure from your organization, your teammates, everybody else.

We ask people how many coding agents they typically run.

### 00:09:42 — Running many agents

Now I did this survey maybe about six months ago. I wonder what the difference is. Would be today. I was actually kind of surprised that only 314 people said they only they run more than five plus coding agents. It's a small room here, but how many people are running more than five agents at a time?

Yeah. Yeah, Alana. Yeah. Yeah, I got. I think I got five here running. I don't know if they're all running right now, but it's a problem. One, maybe it's it's a problem in the fact that you are diverting their attention here and there, here and there, where.

Right. People are using the Groovy skill. People know Groovy, yeah, yeah. So. Groking is great. It gets you on the same page as your agents. Ask you a billion questions.

And then we have five agents running at a time. They're all asking you twenty questions. There's something really crazy that happens when you start to get really exhausted. Obviously, it's decision fatigue. You're not. Used to making these many decisions over and over and over again all day.

But it can really hurt your brain, and well, it can hurt the way it is. Like managing your stress, this brain is supposed to be a brain on a grill. I think Obis didn't do a great job with this. I did tell it. It did not do a great job.

It didn't seem to care. So, people also have referenced this by saying, "I feel like I'm more productive, but I've never felt." So tired, and I get that too, man. I get so. Much more stressed out than I used to with coding. Now there were times in the past where I was like, stay.

Really late late to working on bugs, or like be really invested in fixing this thing, but. It gets really tough to pull yourself away. So it's no surprise that people who often. Also, ran four or more agents. Also had a hard time stopping their data.

It's only five and six people. It's not a crazy amount of people, but people also did report that. So Mark Emerson, who who works on readouts, he's been a core member of. With the React ecosystem for a long time, he did it really well. He said. If I can run one agent, and I can run two.

If I can run two, I can run four. If I can run four, I can run eight. And I can run infinity, and. Especially if you're coming from a point of being an engineer, right? You're so used to like, oh, I can do so much now.

You just get this flow where all of these things are working all at once.

### 00:12:11 — Enjoyment

We ask people about their enjoyment in coding. Their enjoyment from coding out of verse before AI, and 57 people reported that they enjoyed coding much. Plus, I think this is one of these things that maybe we'll see a change here because right now a lot of developers. And engineers are in a transition. In their understanding of what their work is.

And so, a lot of people are having to mourn the loss of writing code by hand, or understanding the code, or using the same. Problem-solving methods that they used in the past, and they're having to learn and experience new things. Because you do get different sentiment here. So this person said, "I lost my spark, my passion." Now it's just money for however long I'll be able to do it. Like that's something for an opportunity.

I'm reading that. This person says, for me, AI. Has not been the spark. Has not been an accelerator. It is the spark.

I'm not just coding fast. I'm doing things now. That a few years ago, I would have never considered even doing. Like making slides out of 3js, I would not have considered doing that before AI. Okay. This person says, "I reached the level of seniority in my job where it's hard to code daily." But dude, I'm so back now.

It's really fun. Now I've been seeing this a ton. So again, on syntax, we get a lot of people commenting all the time. And we see this with people who have moved up into higher management, where they could not. Code at the capacity they could, where they did not have the ability to focus.

Because now they're doing all these other things. And are able to continue to build it. Using their coding skills from before, just because they have AI to do.

### 00:14:00 — Skills sharpening or diminishing

We ask people to self-report how their coding skills are sharpening or diminishing. Sixty-three percent of people said their coding skills are diminishing, and I think a lot of us feel this. I did this. There's a ton of things there, and I couldn't tell you. Like that, I used to hear a whole lot about, especially in front-end code, that maybe I hear less about.

These days, and other people are doing that too. Only 120 people said that their skills are sharpening since using AI. I think that's pretty wild, and. Who here has heard of the term neuroplasticity? Yeah, Databricks uses like a marketing thing and like mobile games and stuff.

It's really groundbreaking with neuroplasticity. My wife is a doctor. Psychology, and I was surprised when she told me that it was like legit. Oh, neuroplasticity is actually legit. Not that those games are the constant, and so it's no surprise that.

Losing and diminishing our skills by using AI, at least in the coding skills and things. Specifically, because your brain is going to find the optimal path. To the answer, right, and if you use that path over and over again. That path becomes stronger, right? And with those stronger paths, your brain is finding the best ways to get to that.

Information and when you stop using that information. Those pathways can become diminished. This is also three to two. It was pretty sick. It's like there's so many points in these labs.

I'm like, check this out. And my wife did want to say she told me to tell everybody here that this is not an accurate representation of your brain. It's not supposed to be fun. So these. These pathways become diminished, and suddenly. These skills that we use to access, your access to Amazon to their work, they are going to diminish.

That's that's it. But I kind of come around this in a different way, where I used to get really upset about that internally, like ah. But I spent so much time. Learning about how to structure my spells or reactive components a certain way, and I like that, right? And then I began to think about like all of the.

The shit that I used to do in my programming that I don't do anymore now because of AI because of other like. I used to be able to tell you like five different clear fixes. Ooh, you need a clear effect, psychology. Which one you want? You want overflow hidden?

You want this or that? You want a transparent GIF? I used to be able to do all that stuff. Sliding doors, or all kinds of different creatures. I used to write sites that worked in Internet Explorer 5.

Folks, who cares, right? And most of that stuff I've totally forgotten. Right, I've completely forgotten it, and that's not so bad. Because I, it's not relevant anymore. I'm just thinking about this actually this morning.

Angular one. I could not write any other one. Just be good. It's not AI that did it. It's The things I like to do. So again, we start to form new pathways.

And learn new skills in ways that we've been doing. Okay, so a lot of doom and gloom, yeah. A lot of positive here. I think the survey results were pretty down. Right, people were feeling really.

Worn out. They're feeling tired. They didn't feel like they had been talking about these things. They they wanted. They held a lot in. And in fact, it was no surprise to me, even though we have a very wide range of audience, whether that's pro AI.

Or anti AI or AI impact. We have a wide range of audience. And I I think that people really use the survey as an opportunity to express. Just how hard everything is really for them, and they don't know if this can talk about it.

### 00:17:50 — What do we do about it

So what do we do about it? I'm going to tell you right now that. The end of the day, like the things that make an impact are building better habits and sticking to them. It should be. It's obvious to a point where you're like, oh, I just need to not do these.

Right, but it's easier said than done. This person says, "I'm not getting a kick off of." The slot machine anymore. It's just a tool. And I had to adjust this too, where you're so used to building things in a certain way. Where we used to start from the ground up, foundation, build up, and now we start with a block, and we're chiseling away, and then.

Oh, this part fell off. Let's stick it back on, or something like that. It feels different, and it can be frustrating. And it can be really frustrating for me because I'm used to really building things in a nice. A really structured, organized way, less than a here.

Make it work. Make it work. You know, so. This other person says, "My hours worked per day have passed, and my mental health has gotten better." I do half the work for X, the output, and a lot of time for H. Now I don't think this is practical for everybody.

As long as the as you saw that. You know your work organization might be expecting more of you, and that pressure might be coming from outside. You're not just like ooh, I'm done for the day, okay? Your boss might be like, do more, but. The time for hobbies thing is something I think that people often think about.

When we talk to a lot of people who work in the AI industry. I interviewed Dr. Sarah Burr at Microsoft, and she told me that the number one thing that she's really investing time in right now is Japanese piracy. When we talk to somebody else, they also express taking. Pottery classes, or going in hiking, right?

Like the types of things that we used to to to have as being. Like experiences that were just nice to have. These real kind of grounded experiences are becoming more necessary to bring you back.

### 00:19:50 — Less parallelization

This person says, "Less paralization makes for a calmer mind." Just watching the agent brothers doing other tasks in parallel. Is is easier, and this one is is true for me. You saw my. I quoted agents a little bit ago. I started to read there were too many agents.

That is a problem. It shouldn't look like that, and it doesn't typically look like that. But Tejas and Evan have a really good idea. I want to start working on this. And that's like the kind of thing that happens, right?

You like get into this moment, you're like. Well, what if I just do this, and the next thing you know, you've got five more agents doing this or that. I I do think that like. As the models get better or faster or whatever, some of this changes. The amount that we're being pulled in different directions is a positive degree.

And therefore, like being able to less parallelize things, parallelize, parallelize.

### 00:20:46 — Go outside

That's a good thing. All right, go outside. Seriously, feeling go outside. Feeling. Pray, okay. Go outside. Do some stuff.

Go outside. Nature heals AI psychosis. Go touch grass. My gosh, yes. And it's not just like going outside. It's getting away from computers and screens and the web.

It's weird that, like, since my accident, I have this weird problem because my post-concussive symptoms are definitely tied to stress. And I have like an alarm internally that goes off. When I'm too stressed out, if I'm staring at my phone, prompting or whatever, I'm not past the limit. I have this built-in. Alarm now is probably not a great thing to have, but.

Don't hit this until it's too late. It's not just about being outside. In my mind, it's about being away from distress. And the overall, and the agents, and the context, and the questions, and the answers, all that stuff.

### 00:21:48 — Checking agents from your phone

This is a big one. I could be checking cloud progress on my phone and have And would have a month ago. Instead, I'm relaxing. Is anybody using coding agents on their phone?

Yeah, like away from your computer, away from work. Like I think this is fine when it's during work hours and you're working, but like when I start to feel like it's a problem. Is when I am like, oh, I'm watching a hockey game. Let me pull up my agent and check in on this thing. Like that's my downtime.

That's not my like. That's not my productivity time. That's not my agent time. That's not my work time. And that can be like a slippery slope because.

It's one of those things where I almost feel like I need to uninstall the stuff on my phone or put it behind. The the parental controls and the obloxy, although all just get around the like any. Any good kid who can get around there probably knows right. And those kind of guardrails do not stop me, so I need to figure this one out personally because. A lot of these things are just like self-controlled.

In fact, I did my video on YouTube, which has. 200,000 views. So go check it out. A lot of the comments on there were like. Just use self-control. It's not that easy to build these systems, right?

I'll let me just.

### 00:23:08 — Closing

When we fire up the U-Cell control machine, so the surveys up here. If anybody wants to take it all in this QR code. It also links up to the YouTube video that we we have on this topic. And the YouTube video goes into a bit more depth, where we have interviews with experts, psychologists. We interview. Industry leaders and about their experiences with AIs, people who work at AI companies, people who are coders who have transitioned into building agenting engineers and all that stuff.

And give Syntax a subscribe on YouTube. We do all kinds of stuff, teaching all kinds of stuff all the time. And so, thank you so much. We got a couple minutes.
