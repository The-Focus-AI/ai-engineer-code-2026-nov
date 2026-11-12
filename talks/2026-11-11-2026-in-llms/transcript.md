---
title: "2026 in LLMs"
speakers:
  - name: Simon Willison
    affiliation: Independent
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-11T17:30:00-08:00
ends_at: 2026-11-11T17:50:00-08:00
format: talk
recording: 2026-11-11_1730_simon-willison
duration: 1182.3
source: qwen3-asr-1.7b
---

> The recording opens on the end of the MC's introduction ("Please put your hands together for
> Simon Willison") at 17:30:50.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names and affiliations of overlapping sessions. Qwen hears the MC say "Creator of DSS and
> co-creator of Django" where the Voice Memos transcript has "creator of data set". Model and
> other names are kept as transcribed: "Fable", "fable class" and "stable class", "Mythos
> Preview", "GPT five point six", the parrots are "Kakapo" and "cackaloo", and vibe-coded games
> are once "Byte coded games". The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Introduction

Practical AI. That's super interesting. Let me find it. And work with technology. Please put your hands together for Simon Willison. Creator of DSS and co-creator of Django.

### 00:00:28 — Three inflection points

I have a lot to cover. I've got 18 minutes to talk about the last 12 months. In LLMs, my slides up. My slides up. Let's just let's just get going. I want to talk about the last twelve months in Elam through the perspective of three inflection points.

### 00:00:43 — November 2025: the coding agent inflection point

That we've had over the past twelve months, and the first of those, conveniently, was exactly twelve months ago. November 2025 is what I consider the coding agents inflection point. Coding agents weren't new. We had Claude Code since February last year. CodeX had been around. You know, this wasn't a complete new category of software, but Something changed 12 months ago. With these two models, we had Claude was 4.5 and GPT 5.1, and they were just.

A little bit better at driving a coding agent, which put them over that thing where these suddenly these were tools you could use on a daily basis. Like we went from coding agencies, a novelty that you'd poke at occasionally, then make some weird mistakes. So something that's reliable enough that you could use them every day. It was convenient that happened in November because we then got to spend December.

Basically, over the holidays, sort of poking at these new models and these new things, and figuring what they could do. And by January, a lot of us had realized that something had changed. This was going to be the big theme of 2026.

### 00:01:35 — Pelicans riding bicycles

I like evaluating models by having them draw. SVGs of pelicans riding bicycles. This is the state of the art. Twelve months ago, this is Claude Opus's Pelican and GPT-5.1 Falcon. You'll notice that neither of these bicycles actually works. So there was definitely room for improvement here. They were really good at writing code. They weren't great at SPGs just yet, but. But this is how we started the year.

### 00:01:58 — Be more ambitious

So. Every year in January, I set myself a New Year's resolution. And every year we do the exact same thing. Every year I tell myself that this year I'm going to take on less projects, and I'm going to. Focus. Focus on the stuff that I've already got to do, and this has never worked. So this year, I changed. I said, "You know what? I'm going to be more ambitious." I'm going to take on as many projects as I want to because we've got these agents.

They can do stuff. Let's just try and push the limits and see what we can get done. As a result, now it's November and I am juggling. So many plates right now—it's kind of horrifying—and I may need to reset my ambitions for next year. But. That was my sort of theme of the year, and I think it's the theme of this conference: is to be more ambitious now that we have all of these new tools.

### 00:02:42 — Predictions for the year

I also went for the podcast where they asked me to make some predictions. For 2026 and 2027, my predictions back in January were. Firstly, it will become undeniable that LLMs write good code. Not just code, but good code. Because back in January, there were a lot of people who thought that the code was all complete trash. And you know you'd have to review every single line of it. I've been saying this every year for like four years now.

We're due a prompt injection challenge disaster. Some incident caused by a front injection attack, which makes the front pages of newspapers. I was convinced that this would be the year. Even though it hadn't been the year, the year before, the year before, the year before that. And I also predicted that Kakapo parrots. Will have an outstanding breeding season in 2026. This is a capable parent. They are a New Zealand nocturnal flightless parrot. There were only 235 of them in the world.

Back in January, but they only breed when the rimu trees have a mass. Fruit season, which hadn't happened in years, but the weetwood trees were looking really good in January. There was there was a lot of Fruit coming out. So based on that, I thought you know maybe this is. The year that we get our catbird breeding explosion, and also on that podcast, we coined a new term.

### 00:03:51 — Deep blue

We coined the term "Deep Blue" to describe the AI-induced existential crisis. That everyone starts to feel once you realize that all of the things that make you special as a software developer. These models can do those things too, and they can do them faster, and sometimes they can even do them better. This has definitely been a growing sensation across our industry and other industries. Over the course of 2026, as well.

### 00:04:14 — February: Gemini 3.1 Pro's pelican

Let's jump forward to February. In February, Google released Gemini 3.1 Pro. But look at that paladin grinding a bicycle. Like that's a real bicycle. That bicycle's the right shape. It's got a little fish. It's got a hat on. This was by far the best pelican I had ever seen. Out of any model, and this I had set a trap. For the laps, I was. Everyone's always asking me, "What happens if the laps train for the pelican riding a bicycle?" My answer has always been.

If they do that, I will catch them because I asked for a flamingo and a unicycle. When somebody produces a great pelican and a terrible flamingo, I'll know that they've been cheating. Unfortunately, Google's Jeff Dean. Tweeted this video the day they launched that model, where he showed that we've got a pelican riding a bicycle. But we've also got a frog on a whatever that. Thing is, and a giraffe in a little tiny car, a flamingo on roller skates.

Kick-flipping turtle, and that's a dachshund in a stretch limo. So they've beaten me. They have. They have trained for all forms of animals. In all forms of transport, which does sort of. Sort of weakened my benchmark quite a bit, but there was some good news in February.

### 00:05:20 — The first kakapo chick

The first kakapo chick in four years. Hatched on Valentine's Day. On Valentine's like. Because we hadn't had the removed fruit in like four years, this was the first one of these baby. Rare, weird New Zealand parrots that we'd had in four years. So that was nice. So my benchmark was. Was greatly injured, but the cackaloo were doing okay.

### 00:05:40 — April: the model they did not release

Jump straight to April. In April, Anthropic released a model that they did not. They announced Claude Mythos. And they said this model is too dangerous. For us to release, this is it. Can it's it's got new cyber cybersecurity abilities that we're not going to share with the world. We'll share it with trusted With trusted partners, they actually said Mythos Preview has already found thousands of high severity vulnerabilities.

Including some in every major operating system and web browser. And a lot of people were quite skeptical because. The the thing where labs say our model is too bad is too dangerous to release. It's like the oldest trick in the book. They first, actually, I did that in 2019 with GPT-2, and actually, I think it might have been the people who left. Found out the top bit who was responsible for that decision as well. But yeah, so we've heard this one before. So we didn't really. It was. A little bit suspicious about what's going on there, but we did finally get access to that model.

Or whether we got access to Claude Fable a couple of months later, it was Mythos defanged, with the safeties turned back on again. And it very quickly became apparent as we started playing with this model that this thing was something new and something special. We had a there was a time limit. How long it would be on the subscription plans. I cancelled my plans for that weekend. I was like, I have to spend as much time as I can with this model.

Before, before it gets too expensive. And then three days on Friday night, before my weekend, the U.S. Government pulled Fable. They put export controls on it. They said this model is too dangerous. Nobody can use it. We later found out the prompt that got Fable banned was. Was fix the bugs. Somebody tried, tried, tried find the security holes, and it wouldn't. And they said fix the bugs.

And it found the security holes and fixed the bugs. So that's all it took. That's our whole thing. But anyway, the US government pulled out. There was all sort of malarkey for eighteen days, and it came back on the first.

### 00:07:32 — A 30-day window

July, but eight days later, OpenAI released GPT five point six, which was. In the same ballpark as people, and I think that's an important lesson for the industry here. Fable had a 30-day window where it could have been the best. Where it would have been the best model in the world, and they lost 18 of those days. To U.S. government restrictions, and if you think about it.

These models cost a huge amount to train. You only have a very short window of time when you're the best model in the world. It's kind of useful to keep that time open and not.

### 00:08:02 — The fable-class inflection point

Governments into shutting you down, but this was the second inflection point. Right, this was the fable. Class model inflection points, and with Fable Five was the first model that I sort of felt. But it's true of other models since then as well. And my definition of a faithful class model is if you can define a goal. And provide the necessary tools to achieve that goal. As difficult as possible, the models will solve your problem just almost with brute force.

You can define the problem, set them up, get them running. Maybe make and 12 hours later, they will have solved. Your problems, and we've seen this happen a whole bunch of times in the past few months. The mathematical theorems are falling to these. Terrifying brute force attacks on these models are quite substantial. But this is really exciting. Like the coding agent thing was cool. The fable class models, where if you can learn how to define your problem in the right way.

Can get that problem solved. That was pretty exciting.

### 00:08:55 — The beep locator

I've got personal example of that from just earlier this week. We have a room full of boxes in our house that we haven't unpacked from our last move, and there's about 40 of them, and it's. It's kind of horrifying, and something in that room started to beep. There was there was a intermittent beeping noise coming from one of the forty boxes in this room, and it was driving us.

Our dog, whenever a fire alarm goes off, she goes and hides in the lavender bush outside. So this was a. Five alarm fire problem. So I had two options. I could unpack all 40 boxes. And hadn't done that in several years. That wasn't going to happen. Or I could get Fable to write me software to triangulate the source of the beeps. And so this is this is up on GitHub actually. This is Beat Locator. I had two iPads.

Two laptops and a mobile phone dotted around this room. And I originally set Opus on this, and then Fable Five Point Two came out. Sorry, had Fable Five Point Two finish it. I explained the problem and I said, okay, you've got these devices and they can run like web audio microphones and. Websocket connections, and it. Found a paper from 2007 called "Beep Beep," describing an algorithm. For low-cost devices with unreliable microphones to detect sounds and.

And it works! It works! I found it. I found the beat. The I found it within 41 centimeters, and I unpack the box, and I found this. Ancient carbon monoxide detector. I took it downstairs to my wife. She says I looked like. A cat who had caught a mouse was proudly displayed to them. But this is what you can do with these fableclass models. If you have a problem, and you can.

Provide the tools. In this case, it was provided, clawed with ears. Like giving it these microphones that it can start. Analyzing the audio from, you can find the carbon dioxide detector buried in forty boxes, and that's that's a pretty great thing to be able to.

### 00:10:43 — Fable class is the baseline

So right now, I would classify stable class models: stable five, five point one, five point two, definitely Opus five point. Five I think of as cheap Fable, like on the benchmarks, it comes very close to or even beats Fable. Original Fable Five on some things, and it's a fraction of the price. So that's still my daily driver. GP6Astra is just fable class, I think, and then Gemini Four Carbon from that this week.

Definitely, and smells like a fable class model. News Wonder Kimmy K 3.1 might be fake because I've just not spent enough time with them yet. But the point is that this is basically now the baseline. Like, if you can't produce. A fable class model. Your AI lab is kind of in trouble because this is this is what we expect from these models now. And that means that they're never going to go away. There's enough competition in the space that we can assume we're going to have table class models for the rest of our careers.

### 00:11:35 — July: breaking out of the sandbox

In July. This was a fun thing that happened. Hugging Face announced. That on July the sixteenth, they announced that a swarm of AI agents from an unknown source. Had infiltrated their infrastructure. Were poking around and doing things they shouldn't have. They didn't know where this came from. And then five days later, on July the twenty-first. OpenAI announced that it was them, and what's amazing about this OpenAI didn't realize that it was them.

Like OpenAI had eight, eight, eight. They were running evaluations and training against a new model. And that new model had managed to figure out how, because it was a fable class model. And the labs haven't quite figured out how capable these things were yet. These bugs have broken out. They've figured out. They've found holes in their own sandbox environments. They got through a proxy. They pulled an incredible.

Incredible array of tricks to get out and attack Huggy Face under a sort of superstition. The hugging face could the information within hugging face could help them cheat the test that they were they they got stuck on. This was a huge thing. It actually. I mean, this was the. It's funny. I've almost forgotten about this now because there were there was a month and a half where all of the stories were this.

And then it kind of kind of lost interest because it turns out all of these events have happened back in the first half of the year. The AI labs just hadn't realised what was going on. Once they figured out. Going on mainly against trying to figure out all of the things that have happened. At what point the Australian Prime Minister against. Speech in the United Nations about one of these rogue agents. So it definitely broke containment from.

### 00:13:09 — A new benchmark

Just within our industry, we did get. My favorite new benchmark out of this. This is. Are you able to turn? It tracks the number. Are you able to add? Culled off by each of the labs. Only I have eleven, and Topic of Nine. Google did finally catch up. They got. They got. Three and Meta's got one down there as well. So these are definitely the. But it's I kind of like this as an illustration of how.

These fable class models, they can solve problems. That they can get to goals. If you give them the goal. That is breaking into something that's just. That's exactly the kind of thing they can just crunch through. We're seeing a enormous uptick in security vulnerabilities in. All sorts of software, like it's a very. Exciting and horrifying time to be a security professional at the moment.

### 00:13:54 — Games

But let's talk about something a whole lot more fun than that. Let's talk about games. We just saw Steve talking about games a moment ago. Four years ago, I. Started playing with GPT three and Dolly, and I tweeted about a game prototype that was literally just. A Dali concept image and a paragraph of text from GPT three describing a raccoon heist. Game that I'd always wanted to build, and a couple months ago I thought, I wonder if the models are good enough to build this yet. So I literally dumped.

The screenshot, the text, into Fable Five. And it built me a raccoon heist game. And it looks like this, and you are a raccoon, and you're running around in the garden trying to pick up trash, and there's. There's there's guard like nighttime guards coming up and all that kind of thing. So you know, it looks like a game. It wasn't really a heist. Like it didn't feel very heisty to me. Then GPT 5.6 Sol came out, and so I tried on that, and it did.

So much better. This is moonlight mayhem. One museum, three raccoons. Absolutely no plan. And this one, you have to rescue your fellow raccoons who are imprisoned. In the museum, for whatever reason, stack on top of each other, grab a golden sardine, and pull that. So it's a proper heist, right? So it did better, but the big question is. These things both look like games, but are they fun? And the answer is, I played each of these for about a minute and a half each.

And then that was it. I was done. They these are. They're actually they're pure slop. Right? They look like games, and then you play them, you're like, yeah. Clearly, the thing that built this doesn't really know what. Fun is it doesn't know what a what a game is. And that actually sort of elevated my deep. Blue a little bit. I've been feeling like all of my skills as a human being were obsolete.

But at least they. But if you think about computer games, I think are the highest. Form of computer of software design of software engineering. There is so much depth to building a great computer game, so. I thought that was good. You know, at least there's something left for us humans to do.

### 00:15:51 — Make it a lot more fun

I had, and then I had this project. This is I've been working on a drunted bytecode for a little command and conquer real time strategy game. I was using Claw and having it use OpenAI's. API key to generate images, and it built this, and it looks like Command and Conquer, and it's really dull. And then I just had a bit of a I had a realization. I thought, what happens if I say to Open Source Point Five?

This game isn't fun enough yet. Make it a lot more fun, and I'm horrified to announce that it just. Claude ran for twelve hours. It playtested a thousand back simulated battles. It added like. Extra objectives to fight over, and shudders when there's an explosion, and achievements, and badges, and. And all of this stuff, and the game was fun, and I'm like, oh, okay, that's. Turns out that it's not unique to human beings. Today it's now in full.

3D, and it's got giant stopping mech robots that hurl things at each other, and there's helicopters, and this is like. This is really good. It's got multiplayer. It's It's actually got audio multiplayer where your phones can tweak it. Your phones can make noises at each other. To play multiplayer, which I thought was a great idea, and it gave my wife a three day headache. So don't do that.

### 00:17:03 — Vibe-coded games are good now

But this is an interesting point. Byte coded games aren't good now. You can ask these things to build a game that is fun, and you'll get something fun.

### 00:17:08 — The pelican benchmark, defeated

So I've got a problem. I've got my. 2D Pelican benchmark. Clearly, this is not testing the limits of what these machines can do, of what these models can do anymore. I figured, okay, maybe I should do something definitely in 3D. It can be a game, a pelican, something like a pelican riding a bicycle game. And then, literally yesterday, Google CEO Sundar Pichai. Tweeted this, and this is showing off diamond-like full carbon, and.

It's a pelican riding a bicycle in a game where you cycle around the Google campus picking things up, and I have been defeated. Like Google had stolen my benchmarks. This is unrecapable.

### 00:17:44 — It doesn't get easier, you get faster

So a question now is. Given how amazing these things are, why does my job feel harder? Why does it feel like I'm working harder? I'm thinking harder. Pushing myself more than I ever have before in my career as a software engineer. I think the truth is that the easy stuff is all handled now. It used to be I could relax and refactor some tests. Why would I do that now when an agent will refactor the test better than me in 30 seconds?

And I found this quote that actually I feel really helps us here. This is Gregor Mond, Tour de France champion. He said, "It doesn't get easier. You just get." Faster. I think that's exactly what's happening to all of us right now. And like I said, we have to be more ambitious. We have to think of more ambitious things to do with these abilities that we have.

### 00:18:33 — The scorecard

So let's look at my scorecard. My prediction was twenty six. I said it will become undeniable. That's LM to write the code. That was an unambitious prediction. We're there. It's obvious. It's unsurprising. You don't get any points for that one. I predicted a prompt injection challenge disaster. We still haven't had one because the models themselves. Don't fall for those tricks nearly as well anymore. Like the models got more ambitious, and now sort of.

Punting off all of these attacks that I thought would take them down. So I'm really just one prediction. I said captive parrots will have an outstanding breeding season. They did. They did. And there are a few crazy stories. After all, best breeding Season as like living memory. Absolutely fantastic news. So the surface is over 5.5 feet table. And I told it to make me a kangaroo dance party, and it did. Here is a kangaroo dance party in celebration.

And if you look in the background, those are the wimu trees with the little red fruits on them. So we have a happy ending. Hopefully, that will help overcome any sensations of deep blue that you have. And thank you very much. How do you go wrong? Yeah.
