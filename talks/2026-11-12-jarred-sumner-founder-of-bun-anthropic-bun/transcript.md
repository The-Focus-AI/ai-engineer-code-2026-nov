---
title: "Jarred Sumner, Founder of Bun, Anthropic / Bun"
speakers:
  - name: Jarred Sumner
    affiliation: Anthropic
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-12T14:05:00-08:00
ends_at: 2026-11-12T14:50:00-08:00
format: talk
recording: 2026-11-12_1406_jarred-sumner
duration: 1320.7
source: voice-memos-transcript
---

> The recording opens mid-sentence as the speaker begins ("line of code PR."); the MC's
> introduction is not captured, and the speaker never says his name.
>
> Rendered from the Voice Memos transcript (word timings), the transcript in force: the local
> Qwen3-ASR upgrade was deferred because the laptop was on battery when it was rendered.
> Names are kept as transcribed: Bun is also "Fun", "fun", "one", "London" and
> "bone", Claude Code is "Clyde code", "cloud code", "Cloud code", "clock code", "plot code", "Coco"
> and "Codd", JavaScriptCore is "Jobless Record" and "Java's Records", Rust is "Ross", "ROS" and
> "rest", Zig is "zinc", the JIT is "jet" and "legit", Fuzzilli is "Puzzili", V8 is "VA", UglifyJS
> is "Ugle of IJS" and "Uncle 5JS", Node.js is "no jazz", and agents are once "AIDS".

### 00:00:00 — Introduction: an ahead-of-time compiler

Line of code PR. To add an ahead of time compiler, to keep on, which is, basically the idea is, instead of paying the cost of a jet at runtime, you can, you can compile all the code ahead of time. And it's like a really big project. Over the summer, I rewrote Bun and Ross. And this is a project on a larger scale. This ahead of time, pilot, like a larger project than that.

And I think one of the challenges right now with large projects is like how do you actually constantly do like 1000000s of life in code written by AIDS? So that's what I want to talk about.

### 00:00:53 — Making Claude Code use less memory

This was like the opening album after some of this that it was, it was like basically, we need to make Clyde code use a lot less memory. And, and faster, and we can modify either WebKit or Fun, Fun uses Jobless Record, which is WebKit, under the hood. And it's been a little bit over a month. This is this compiler has gone through 5 rewrites. You can see the, like, the 1st couple months were pretty short, and then I, like, almost shipped the blue one, and then I was like, this is building way too long.

Like I said, you can wage long to buy out of code. So we wrote it again. And this next one is your big next week.

### 00:01:51 — Constrained by how you test

This is kind of the way I think about it, a project like this is, like, you're really constrained by how you test that the code works. So that's, like, even more important than what you're specifically, like, if you do it for how to build it, is entirely driven by how do you verify that it actually is going to, like, work and not make money? You trust it.

### 00:02:13 — Why compile ahead of time

And so there's just a little more background on like, like, why this particular project lied ahead of time compiler, and it's because, for a typical job service based application, roughly half of, like, this the CVU time has just been compiling code on the hand. And so a lot of the general, like, thing you've seen in a lot of applications where people are rewriting their probases and like rust or sometimes go.

It's like when coming from Dollar, it's because, like there, it's really the combination of the jet and that it's a single threaded application. So that's sort of the difference between a bit and AOT is that, you compile before, whereas religion you compile as you go wrong. This is particularly important for something like cloud code, where when I'm using like the cloud code, like iOS app, where the CPU time is a lot, if you're, if you have to put a high every session of cloud code, also compile it.

Is he, is he really nice?

### 00:03:26 — Why not rewrite Claude Code in Rust

So we talked a lot about like, like, should we rewrite plot code in ROS? Because the bun team, us, ultimately wrote Bun and Rust. So like, we're pretty good at rewrites. And we decided not to. And the reason why is because, like, for in one case, it's actually pretty easy to do. Like, a bunch of easy projects you do arrested, right? Because the tests were written in a language that's independent of the one that runs it.

So because all the tests were written in typescript, we could run the tests on both the zinc version and the rest version, whereas for clock code, we, like, thought this tests were written in types written. So we would have them for cloud codes, that's true. And as soon as you're like rewriting the test, then you can't really trust the test anymore. So that seems like it'd be too risky.

So instead, what if we just make jealous your faster? So we don't have to be right and rest.

### 00:04:39 — Results: less memory, faster starts

This was another prompt a little bit later. And the result, Is that it actually did, have JavaScript's memory, like the memory usage, it uses about 4X less memory. It starts about 2 times faster. And we were dog putting this internally. And it'll be external soon. So more benchmarks and then I'll also go to more detail about how we actually did this. So, like, it's it's possible that if an interesting thing is, like, like types of seven, rerun their code by hand, from slash types of to, to go.

And, the single threaded version, with, when compiled, the abundant pile is now faster than the single threaded types of go port. And we will add threads also to the ahead of time compiled version of one, but we haven't done that yet. So there is a PR.

### 00:05:55 — Types as predictions

And it's a little bit about like the actual amount of time compiler. Type group is not types of types that don't necessarily need to be correct. So it treats types as predictions instead of like trusting them. And this kind of problem works really well for models because they're really good at writing compilers.

### 00:06:23 — Tests that predate the project

So, this is sort of like more about like how you, how, like should we, like how we were thinking about this decision, and a big thing here is like there's so many tests you can run when you're, when it's like, in ahead of time. Like for something like this, because we don't need to write any tests pretty much ourselves. Like we actually do write a lot of tests, but, we can largely trust that the tests that predate the project work.

And this was the same thing with the fun restaurant, right? Where we had buns existing, tests we could run. And now with a compiler, we have buns reducing test suite, plus web test, plus test 262 plus 5 to its test. And then we also made it that way, one itself, the unloading test render could be run in the AOC mode. And, like, we have one breaking change with, early, 2 breaking changes with the added time compiler, and that's pretty much why these particular tests are failing.

But the and the 2 breaking changes are actually like mostly security things. To prevent prototype pollution attacks, but they also end up benefiting for performance. So, like, what makes this particular kind of problem pretty good for agents is like, you run it with, you can run all 3 versions of the application, one with digit, one with ahead of time and files, and one also without the types.

And as long as the 3 of them behave the same, then we know that it works for that specific application. But then you can take that kind of problem and was it a lot? And just have thought, like, turnout to generators to, like, fund different patterns. And you can catch a lot of bugs that way.

### 00:08:30 — Batches, then long-running agents

This is a very large project. It was the biggest, I think, that we're done. In terms of like food volume. Most of this is half. And also just because we rewrote it 5 times. When you're like doing this kind of project, how I think about it is like you have like batches of like, okay, we need to write a lot of code at once. And then after that initial batch, then it's okay, let's have, let's like fix everything, make sure it compiled, make sure it passes a monthly pass.

And make sure it, like, really, truly works. And the actual logistics of that are like when you're in the big batch kind of project stage, then, you don't want to run builds. You want to run one duel because otherwise you're going to spend all your time compiling and like waiting for builders and it's going to like not be a good use of anyone's time. And then separately, for like longer running, like once you have, once you've written all the code, you want to have it, like, have lots of individual agent.

### 00:09:44 — Five rewrites

This is like a little bit of the timeline of this project. The 1st one was not very good, but, like, plug food was a goo buddy. Which is terrible. And like this used as much as possible from Java's Records existing code. So it was like basically the ceiling was what is like only as good as like what it could be from that. So then a little bit after this, we added a typescript type checker into line itself.

We were not. And so we added one track and then we're like, hey, what, 2 season contract? And then after that, sort of time about 2 times faster and, hitting my boot and, started using about 3 X plus number. But the COVID slot. And like, like, this is not good. It should never, basically, this meant that any object that accessed a property called Archive, it would then assume that the Bunda Archive API was potentially used.

And I looked at this and I was like, we cannot share this, this is not good. So then, This is like, yeah, well, this is another thing too, is like, it just, like, just, like, when you're doing, like, a large plane, like when you're starting to, like, have to do a bunch of design docs and stuff, it just loves writing markdown dogs, and it doesn't make tests.

So it's gonna, like, 300 mark on file. Not reasonable. So, for this, it was like, and this was like, I think, the 3rd compiler, where they were. No, this is the third. To like, just to kind of fashion, get it all out, at 140 agents at the same time, write on the code all the same time, then get Cloud code to run. And then, this is the 4th one, and this one, the code was not far.

Pretty good. with like basically the same performance as before. However, compilation time was way too slow because people coming from like a jobs or background don't expect any compilation time. So 50 seconds for, like, Coco is, like, pretty large movies, but this meant that, like, other projects would take, like, single digit seconds and people don't want to wake that home. So, we're gonna rewrite it again. And, because in older versions of this compiler was taking like 10 to 20 seconds.

And then Codd does this thing where like, it'll try to like, size up everything to judge whether or not it's worth working on, but it's really easy to convince yourself that like your measurements are good, when they're not good. And, like, part of it was also like why it's 900,000 lines of Coke. There should be a lot of like smaller. So then we do it one more time.

And the COVID was good. And the build time was under 20 seconds. It's possible that we end up with the 6th time sometime later, but the 5th one is like very shippable and I've worked on this for enough time that it's like time to shift it. A lot of this was like, just like, hey, well, I've tried this idea and then see what happens and then it would like size up the idea.

And I think this is like still kind of not right. Like, I think a lot of this are like things that we should try again and not let it, like, kind of what I said earlier about, like, sizing up the impact of the change is, like, it's really easy to underestimate or to, like, size it up incorrectly and then tuck yourself out of it. So I think this probably needs to be revisited more.

### 00:14:51 — Long-lived agents over workflows

My old approach, particularly with like the fun roster, right, was very much leaning on like plateau workflows to do things. And pretty much now with the most recent models, I mostly just rely on some 80s that are like very long-lived. Except for that initial part where you're like writing all the code all at once. And this, with those other agents, it works pretty well because they keep all the context of the relevant code in their head or like in the context window.

And that's like less wasteful. And like they can just keep going.

### 00:15:40 — How the compiler works

Here's a little more about like how the different parts of the compiler works. Generally, it's like there's, if we can continently prove that, the value is, like the types are the same, that they're monomorphic, then it can become a field access. Otherwise, it has to check every single time. And it has like some inline cashing, but not like a lot.

### 00:16:08 — Hourly updates and fuzzing

As with the project of the size, you really do need to, it's kind of hard to follow sometimes, like what everything, what everything's happening. So, I lean a lot on like just having an hourly update. And where it would post this 4 card, comparing a bunch of metrics that we were prioritizing. Usually the window was supposed to use slacking, which was like a previous and this version.

So that way it was easy to see if numbers went up or down. But it's like not helpful in this life because the previous one is just legit. The important thing is, like, none of these tests for the most part are things that are, like, made up. There are things that like predated the project so that way we know that like the agent couldn't have messed with it.

Puzzili is like a Javaister bending buzzer that VA uses. So, and we were already using that in London, but we also extended it to have, to like test for type fruit types, as well. And it's also important to check that the tests actually catch things because it's really easy to fool yourself that it's finding bugs when it's not finding bugs.

### 00:17:38 — Benchmarks

Some more numbers on the ahead of time compiler. It generally, for most projects, outperforms legit. Not always, that you can see in the Ugle of IJS case, and that's basically if it has to use the interpreter a lot. So if there's a lot of like eval or a new function, then it's not faster. But most applications don't do that. And it's like, It's like if we get, like, as close as possible as you can get to like a one liner to like make an application run faster.

This is not 100% true because as you can see, Uncle 5JS, and there are other cases as well. But it is often true. So like, yeah, the other thing is the object prototype. This is like a rare edge taste, but basically, there's a lot of security vulnerabilities in job strip applications called, like, prototype. This usually works by assigning properties onto object prototype. And the compiler brings that.

### 00:18:49 — What you actually do all day

So like, for a large project like this, what do you actually do all day? These are the top messages that I sent. So then continue a lot. Also, like my laptop kept time. And then, like, but like more concretely, what you actually do is, like, a bunch of leading questions. Like, why are we doing this? Can we do this? Also, I ended up saying like, can you do this faster or like what's taking so long?

Because it kind of like talks itself into making up rules. And also, it tends to not be, it tends to like underestimate what it can do. So I often end up saying things like this, I thought, to get into like, try harder. Believe it. That's good. And the result is that it's, jet stream 3, which is one of the main benchmarks that JavaScript engines use. The bun performance, both drums, of course, and no jazz in, like, BHG, and most of them, And the whole time, like, it's been using plateau to, like, build the buns and pile, like, to build on your pile itself, and then using the build of vodka that was compiled with one compile.

### 00:20:35 — Takeaways

So sort of how you think about this is like, like the testability thing is super important when you're working on a large project with pod. And to make sure that the tests actually test things. And if you're not actively remeasuring, then it's gonna like get worse because it's just, if there's so much stuff going on, it's really easy to lose track. And, like, it's easier for large projects like this that haven't shipped yet to rewrite the Spanish factor.

And if you're ambitiously, then the models will like start having like 0.one% improvements instead of like 10% improvements. So you kind of have to constantly nudge into like, okay, you can do really cool things if you try harder. You can try this now if you want, by running bone upgrade that veterinary. Youult. and then there's one compile. Thanks, everyone.
