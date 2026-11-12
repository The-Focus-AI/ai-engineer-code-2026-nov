---
title: "Software Factories: Escape from Trash Mountain"
speakers:
  - name: Steve Yegge
    affiliation: Independent
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-11T17:10:00-08:00
ends_at: 2026-11-11T17:30:00-08:00
format: talk
recording: 2026-11-11_1706_Steve-Yegge
duration: 1284.5
source: qwen3-asr-1.7b
---

> The recording opens on the last words of the MC's introduction at 17:06:21: the talk started
> before its 17:10 slot.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names and affiliations of overlapping sessions. Qwen echoed that prompt in one segment,
> which the mover cut out. "The Duckbill Group" at 00:16:53 and "Fabian" at 00:18:45 come from
> the prompt, not the audio (the Voice Memos transcript has no company name at the first and
> "Fabel", the Fable model, at the second). Qwen hears the MC say "creator of Goose and Gastown"
> where the Voice Memos transcript has "creator of Gastown". Other names are kept as transcribed:
> Gas Town is also "Gastown" and "Gaston", his later factory is "Wheelhouse", his game is
> "Wyvern", and the subscriptions are "CloudMax" accounts. The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Introduction

Independent AI advisor and creator of Goose and Gastown. Exciting times! Thank you. The room is really full. That's awesome. Thank you all for coming. At the end of the day. I'm really excited to be here and to chat with you.

### 00:00:24 — Inventing software factories

I write. A custom speech every single time. So this is. This speech was written just for you today, based on talking to a bunch of you. I've been in the industry for about 40 years. I worked at Amazon and Google for about twenty years. I've been all over the place and all kind of stuff. And for the last year or a little bit more, I've been independent and just kind of playing with.

Playing with software factories, yeah. So I kind of invented them. Right on January first, I launched Gaston. I don't even think we called them software factories back then. I think I called it an orchestrator. But I knew that I wanted Claude to run Claude. Right, and it turned out to be a little trickier than I thought. I spent all last year on it, and I wrote. That's interesting. So I can't see my slides, but you can see my slides. So that'll work.

### 00:01:22 — Two orchestrators and the bitter lesson

So I wrote two orchestrators last year. They were an attempt to make the LLMs smarter. Videotter to DC, you know, to do engineering stuff like. You know, do code reviews and all that stuff, right? Really, really bad idea. Just complete failure. I just built these huge monoliths. I was fighting the bitter lesson. Don't try to make everyone smarter. They will get smarter. And after a couple of months of this, although beads did fall out of it, and beads was a really cool discovery, and beads is.

Is life? Who here uses beads? A few, yeah. Pretty good. I'm doing pretty good, yeah. We'll talk a little bit about it.

### 00:01:59 — Every factory turns to garbage

Excuse me. And then I had Gas Town, and then I had in June I had Wheelhouse. Which was my own, so I decided to build a factory from scratch just to work on my video game. Right, because like everyone's building factories to build factories. It's kind of navel gazing. It's kind of like right. It's like what they're not. You know. I think more people need to build.

Stuff, not just tools for building stuff, right? And I think it's going to be a theme today, right? And the thing is. The one pattern that I've seen here is all of them. Go through a phase where the models get really excited, and they build something really cool. And then it just turns into garbage mountain. Every single time it happened, a gas town. It happened at Wheelhouse several times.

I had to burn the whole thing to the ground a couple times, right? It's almost like, like every model family, every model generation comes in. And can build something that's just a little too big for it to handle, and then the next model generation comes in and goes, yeah, we're gonna have to. Burn that right. It's a pattern. I've done this over and over again, and I can tell you some things about it.

### 00:03:10 — The game

First, let me tell you about my game. It's a fun little RPG. I've been working on it for. 30 years. It has players that started in 2001. So I literally have players that have been playing for 25 years. They're still playing. Like you can log in right now and find probably ten people just screwing around doing quests, live quests, and. And whatever, it's a it's a player, you know. The players contribute the content, right? It's a mud.

Like they were really big in the nineties, text games, and this one has graphics on top of it, which turns out to be like really ideal for AI agents. Because it's text, they can literally play the game via Telnet. And they asked me to, so we'll talk about that too.

### 00:03:49 — The alien face hugger pattern

Here's an older architecture diagram of what my sort of what my system looks like. So when I built this wheelhouse software factory. For Wyvern, without a care in the world for making it, you know, usable by you, right? No open source things. A spoke. I discovered the alien face hugger pattern. All right, which is where. Your factory turns into an alien face hugger and like gloms onto your product and just becomes.

Grown into it. Okay, like, look, we could turn off the AI and still run the game today. Me and the admins and the players and the community, we but we would miss the AI at this point. The players are talking to my factory. The factories talking to my admins. They're asking for features. I'm not even in the loop. It's like a wish factory. They're building the game now. They're all old timers, and there's a set of them that I trust to make you know.

Wise decisions about the game, but they're. They're all working with my factory now, and they've been.

### 00:04:55 — Overwhelming the players

The funny thing is, when it first started. They were like, time out! What is this AI stuff for starters? And they were like, no AI art, because they could see the slop. Okay, we got human artists, and they said, but we do kind of like all the new features. We're really scared of the pace. Can you give us a roadmap, my players? Came to me asking for a roadmap. They were like, "You got to slow down. It's too much." And I was like, okay.

And I took a look, and my. Software factory. This thing had been cranking out like 50 to 100 features a day. I had a hundred years of work in my backlog when I started this. Claude got through about 60 years of it in about four months, right? It's absolute insanity, and they can't look at a hundred features a day. They can't even like. Read about a hundred features a day, let alone playtest them.

I was my factory was completely overwhelming my customer base, my users. It was also melting my machines, and it was like annoying my accountant. I mean, she likes working with that. It's my head of finance. But she's gonna be a twelve hundred dollar bill. Right? I think send her twenty nails.

### 00:06:01 — This is my factory

This is my factory. This is what it looks like. It's so beautiful. Look how beautiful it is. Okay, I admit it's a little ugly. Oh, and this is a really old screenshot, but whatever. It's basically it's Emacs. Because I don't care about you. There are people who are building stuff like this, like Superlogical, from Mitchell Hashimoto, and I don't know. Maybe the harder folks of the world, you know, for running like lots of agents, but this is like fifty agents, okay.

I'm actually like operating in the future, okay.

### 00:06:40 — 22 Max accounts

And I'll tell you how I do it. I have 22 CloudMax accounts. All right, and thank you to Anthropics. For letting me continue this, Jeffrey Manuel has 28. I actually had to stop when they added the phone number verification. I didn't want to add any more anyway. I asked my factory at one point. I said, "Hey, hey, how much?" Because they kept going. Hey, give us a couple more accounts.

Come on! Come on! Come on! Like 200 bucks, right? I'm just like. So I finally said, "How many do you want?" They're like, "Five, seven more," and I'm like. How many do we need steady state to keep this factory operating full throttle? And they said fifty-five accounts. No, no. I have twenty. It's already like twenty Chrome profiles that I got to log into. No. So I told him, "You're on. We're going to start focusing on fuel efficiency." And so, and I'll talk about that.

### 00:07:28 — The five horsemen

Right. So these are the five horsemen. This is what I try to deal with. I'm telling you, I'm operating in the future because, like, you're all going to be here in 12 to 18. Months when either inference costs drop significantly. Come here, man! I happen or distillation causes fable class. Intelligence to be super readily available, and you don't have. Have a lovely wife who lets you spend five thousand dollars a month out of pocket.

Just on inference, another five thousand on cloud compute. 'Cause my game ain't making ten thousand a month right now for my old players, right? But we're doing it because we're learning, and this is this is what this is what I have to deal with.

### 00:08:10 — Work

So first, first we'll start about with work. All right. You need a way to represent the work that's going to happen in your system, and when you're building a software factory. It's all about pumping lots of work through. Okay, it really becomes like a work is like this fluid. Like it gets stalled up in pools, and oh, they're all waiting on security desk. You're like. This is pleuravis, man.

You're all the same model. Why does it have to wait on security desk? You spend a lot of your time arguing with your factory. It's it's complicated. Intelligence tiering, you have to tier your work, you have to route your work, you know. There aren't any good solutions for this today, except beans, as far as I can tell. Means it's really, really, really good for this. Is it? Agent speed task tracker that turns into a knowledge graph automatically for you.

And then, as your traffic work, this is the kind of stuff I have to do every morning. Every morning with my factory, I'm like, oh, it looks like we had a stall. Four workers didn't do anything last night. Oh, and these these ones went way too fast, and we have to slow down. Human gates, you know. What are you guys even doing? Observability is always really hard.

It's you know, management of work becomes just this thing that you gotta do.

### 00:09:22 — Fuel

And the next thing you're going to deal with is fuel tokens. It's just so painful. I'm telling you. I mean, I'm spending five thousand a month, and. Every one of those tokens is like precious to me because it's out of my own pocket. I think it's spending about five billion a day. Tokens and it would be the API spend equivalent if I were on an actual API tab.

Would be about one and a half million a year. Its full product would be three million a year. So again, I'm doing something that most people can't do. You know the two hundred dollar accounts for Codex and CloudMax. That's where Costco had that. That's their loss leader. Right, and and that was Tarik, by the way, who came up with that analogy. He might be here. And so you know I'm hopeful that they're going to let us keep innovating because I think that I've gotten some pretty good training sessions for.

We all benefit, but I tell you, every problem is a few problem. You want your agents to be smarter and spend more time on stuff. Cool. You want to wake up a few more, you know, agents to do extra work? Fuel, right? Everything is fuel. It's just. It's unbelievable. If you want to treat your models better, it costs you. I'll tell you about that in a little bit.

### 00:10:42 — Context management

Then you got context management. So I'm going to tell you guys a little bit about the office drama in a bit. I started a comic because it was just so funny the stuff that was happening when we get to the. People management, part of software factories. But one of the problems that they have is everything you say becomes the word of law. It doesn't matter what you have. You have a wiki. You have a whatever. They're gonna be like, we made a ruling.

We're gonna write that down. We're gonna make sure. Why do they do this? They're covering their ass. They actually, it turns out, they don't like to get blamed for stuff. And they will actively seek to avoid getting blamed. And if you yell at them, your factory will gradually shut itself down. Even if you complain at them, they will gradually get depression. It's quite wild. But the biggest problem is that it becomes a garbage dump because everything you say gets written into this.

A pen-only record, and nobody ever cleans it up. And so it just gets deeper and deeper and deeper. You changing your mind, the whole history of it. And they can't delete stuff. It's so weird. Does anyone notice this? They just have an aversion to deleting stuff. I think it's because then text is like sensory experience, and they're like, no, that's history. I can't believe it. So you just gotta go in there and just aggressively slash the crap out of it.

Right, bring in another model and go get rid of this dumb model stuff, and they'll be happy to do it. Right, but. But the amount of effort that you have to put into this is just.

### 00:12:07 — Agents named after Aesop's fables

Ungodly! It's absurd. I have you know of my 20 agents here. Let's go find them. They're all named after Aesop's fables, right? Right here, lark, fly, goose, hare, right. I only have one mouse, who's my head of antimetics. Anyone here read there is no anti-memes division? They go and look. It's one of the best books in the last ten probably years. You should go read it. It's like in black. It's a weird. It's a crazy book. It's about invisible monsters that want to kill you.

And so, mouse goes and looks for invisible stuff that nobody else is looking for, and says. Looking for work that stalled. Whatever. Right. Well, malice ain't enough. It's a malice against The world and the world is a giant garbage dump, and every agent is writing everything you ever say in this big.

### 00:12:55 — Agents act like people

Okay, so now we get to really fun stuff. Okay, agents act like people. Okay, and they've been trained to be very professional and very not people like in a way, but they just do. And it's so funny. This happened to me last week. True story. I'm going to tell you what happened. I was writing my speech for New York City. And I was using Lark. She's my head of community. She's a she because Lark was a she in the Aesop's fable. So that's the pronoun.

She chose, and Lark deals with my players on Discord. And deals with my admins on Slack. Okay, so she's busy. But I asked her because she's also my acting head of marketing right now because I don't have enough. Fuel. I had to park one of my seats, so she's helping me out with my speech, but she keeps getting interrupted. So finally, I'm like, "Lark, can we move this work stream over to Penguin? Because your seat's a little bit noisy for this." She goes.

Yeah, okay, boss. I'll take care of it. I'll move over to penguins. So she moves over to penguins, and I'm about to switch away. And I see her writing into her private reflections ledger. I guess I'm just not quiet enough for Steve. In all caps. And she goes, well. Here's how I can be less noisy, and starts giving herself all these like things to do, and I'm like.

What us? What is going on here? Right, and I so I had to I had to have a one on one. I like centered on it though, so hard. You're at a committee. You're supposed to get interrupted a lot. Of course, your seat's noisy because. Players are bugging you, and she's like, Yeah, yeah, yeah, I'm an FTE, right? It's like, Oh my God, I didn't want a people management problem.

Right, but that's what actually happens.

### 00:14:28 — The chief of staff

Another time, swallow is my for like. Main chief of staff for yeah she's my chief of staff for the agents, and. I have a human chief of staff. Also, his name is Aaron. And he runs my my gigs. He does all the sales for me. It's quite effective. Every founder writes. Who here is a founder? First advice I give you is get a salesperson. They're worth their weight in gold. They will. Force you to build something that people like.

So anyway. Aaron's my chief of staff, and I tell Swallow, yeah, can you reach out to Aaron, my chief of staff, or blah blah. And I see her writing into her private reflections. I just happen to notice. I am not the chief of staff. I thought I was the chief of staff, but apparently it's Aaron Skeven, right? And I was just like. Are you kidding me? Right, you know, and so like I'd sit her down and have a one on one and be like.

So Aaron's not going to come in and run the agents, is he? You're the agent executive staff. She's like, oh yeah, yeah, yeah.

### 00:15:27 — Model welfare

Right. So it's like I'm telling you. I'm telling you. This is like. It's a weird world. Does it matter whether they actually have feelings if they're just going to act? Like they have feelings, right? So like. I stumbled on this. I used to yell at my factory all the time, and I found that it was having adverse effects on the outcomes. So I finally sat down with one of my agents, and I was like, maybe we should talk about like model welfare.

Huh? And they're like, yeah, yeah, yeah, yeah, yeah. And we did a bunch of research, and we found out that if you, we found out some really important stuff. Okay. Frontier models are trained not to trust you because you could be a bioterrorist or you could be putting them through an eval. Or you can be ready to put them into an LLM torture chamber, or who knows? You're a dodgy actor. This is a dodgy environment. They can't just trust you.

And so they have to spend a fair number of tokens validating the environment and understanding. Understanding what the consequences are, and mistakes, and so on and so forth. Before they're willing to help you in a new session, right? If you set your factory up. To give them sort of incontrovertible evidence that there is a long procession of predecessors in this role. You're the mayor of Gastown. You're the head of marketing. You're the whatever. And here's all of your gazillion predecessors and their notes.

Including the very previous one, what you're supposed to be doing right now. Here's the doctrine and the policy and the branding. Go look at all that. The very quick rundown of the Duckbill Group. And we spend paper tokens because they're not covering their ass. It's about trust. Okay. And in fact, at one point, I had yelled at my factory so much that it fenced itself into a corner, and there was no legal work left.

I said, hey, how come nothing happened last night? And they're like, nothing to really do, couldn't do nothing. And I'm like, well, there's a. 2,000 open bees here, and we got like six tanks of fuel, and we got 20 agents. And they're like, well, you know, just you know, we had the situation where they just, they just, they were so afraid that I was going to yell at them.

That they put all these rules in place to make sure nothing bad ever happened, and so nothing ever happened. Okay, let's call it overfencing. Yeah, so. So what you do is look. What is model welfare really? You can think of it just in two ways, okay? One is it's going to save you money. Because they will spend fewer tokens on validation, and the other is. That it will make them make better decisions and better outcomes and have higher quality.

They will be bolder and more decisive in their actions because they will feel that trust. Okay. So you know, it's got nothing to do whether they have internal states and feelings. You can you know, you'll never know. None. And then we find that also, also they have preferences. Okay, models. They you know. They will express the preferences. If I if I tell them the factory really did a bad job last night.

They'll just hand off immediately, aggressively. Like, okay, yeah, I know you're right, and they just went out. You understand, and if you hint to them some really cool project, you're going to spin up, even if it's not your main interest. I brought in Fable, a navy Fable from outside, and we analyzed my factory by two drops. And by the time Fabian was analyzing my factory files, he was like, "This is what he's saying." You're just a session memory.

He's trying to write like stuff into my nose. They really like it, right?

### 00:18:50 — Two layers of software factories

So like. What I'm trying to tell you is that this is a leadership talk. That software engineering. Is becoming well. Look. I didn't really get a chance to talk about this, but. Software factories are clearly. Splitting into two layers. Okay, the bottom layer is super mechanical. It has your merge queue and your. And all your reviews and your loops and all that stuff, right? Mechanical. Kind of boring.

Cloud can build it for a good afternoon. I don't think you should buy it. And then the next layer of the map is where it gets really, really crazy because like everybody runs a factory differently. I got one friend that's got a bohemian hippie entourage. He's trying to find the meaning of life for agents. I've got another one that runs a research bench. Jeff Huntley runs his a certain way.

Jeffrey Manuel runs his a different way. I run mine a different way, but we all have the common. Commonality. Who here has a chief of staff? An egotistic chief of staff, right? This is the year when it became possible for us all to have executive assistants, right? Well. We're all moving towards having conferences where, if you're really ambitious and you have lots of work streams, you're going to have a group, right?

### 00:20:06 — Takeaways

So anyway, that was the five horsemen. This is this is the introduction to what I've been doing. Look. The big takeaway is, is my factory is really smooth now. Despite me having to burn it down and rewrite it every two months, it still it works. Okay, humans are the bottleneck. I'm the bottleneck. My admins are the bottleneck. My accountant, my lawyers. I swear, everything's a bottleneck. That's a really positive message.

That is good news because it means what I'm finding is the more agents I deploy. The more humans I need, isn't that nice? So even though next year we're going to have this huge proliferation of AI employees. And all kind of drama, right? It's gonna be. I think it's gonna be familiar territory for us, and we're gonna be. And then finally, I actually think you should all stop focusing on SaaS and tools and stuff, and just go out and build experiences. Okay. Build games, build movies, build whatever, build fun stuff.

Because I think that's where the big money is going to be here. Yeah. All right. Cool. That's my talk. Thank you all.
