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
source: qwen3-asr-1.7b
---

> The recording opens mid-sentence as the speaker begins ("Line of code PR to add an ahead-of-time
> compiler."); the MC's introduction is not captured, and the speaker never says his name.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names and affiliations of overlapping sessions. "Anthropic" and the speaker's name were in that prompt and do
> not appear; Bun, Claude Code and Rust were not in it. Echoes of the prompt were cut from 11 segments
> before this text was written. Names are kept as transcribed: Bun is also "Fun", "fun", "Bunn", "Bunsky's"
> and "Ubuntu", Claude Code is also "cloud code" and "Cloud Code", Zig is "Zyg", Rust is once "Rosseri",
> Claude is once "Clapto", and the upgrade command's channel is "deepfashionary". The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Introduction: an ahead-of-time compiler

Line of code PR to add an ahead-of-time compiler. To bond, which is. Basically, the idea is instead of paying the cost of a JIT at runtime, you can. You can compile all the code ahead of time. And it's it's like a really big project. Over the summer, I rewrote. And this is a project on a larger scale. This ahead of time project, like a larger project than that.

And I think one of the challenges right now with. Large projects, it's like how do you actually confidently ship a mil like millions of lines of code written by agents? So that's what I'm going to talk about.

### 00:00:53 — Making Claude Code use less memory

This was like the opening after some discussion. It was like. Basically, we need to make cloud code use a lot less memory. And faster, and we can modify either WebKit or Bun. Fun uses JavaScript core, which is WebKit. I know, and it's been a little bit over a month. This is this compiler has gone through five rewrites. You can see the like the first couple ones were like pretty short.

And then I like almost shipped the blue one, and then I was like, "This is building way too long." Like it's taking way too long to compile the code, so we rewrote it again.

### 00:01:51 — Constrained by how you test

This is kind of the way I think about a project like this is like. You're really constrained by how you test that the code works. So that's like even more important than what you're specifically like the approach you go with for how to build it. Is entirely driven by how do you verify that actually is going to like work and not be buggy. And that you can trust it.

### 00:02:15 — Why compile ahead of time

And so, just a little more background on like. Like, why this particular project? Why the ahead of time compiler? And it's because. For a typical JavaScript-based application. Roughly half of like the CPU time is just spent compiling code on demand. And so, a lot of the general, like, thing you've seen a lot of. Applications where people are rewriting their codebases in languages like Rust to order sometimes go.

It's like when coming from the culture. It's because. Like, there—it's really the combination of the JIT and that it's a single-threaded. Application. So that's sort of the difference between a JIT and AOT is that. You compile before, whereas with the JIT you compile as you go along. This is particularly important for something like Claude Code, where when using like the Claude Code like iOS app. Where the CPU time is.

A lot, if you're if you have to have every section of thought code also compiling. Is he in noise?

### 00:03:28 — Why not rewrite Claude Code in Rust

So we talked a lot about like, like should we rewrite code in Rust? Because the Bun team, us, rewrote Bun and Rust. So, like, we're pretty good at rewrites. And, decided not to. And the reason why is because, like for in Bunsky's, it's actually pretty easy to do. Like Bunn is an easy project to do a Rust rewrite because the tests were written in a language that's independent of the.

One it runs in, but so because all the tests were written in TypeScript. We could run the test on both the Zyg version and the Rust version, whereas for Cloud Code. We like Claude, GPT, has certain type traits. So we would have to port cloud codes to that suite, and. As soon as you're like rewriting the tests. Then you can't really trust the test anymore. So that seems like it'd be too risky.

So instead, what if we just make JavaScript faster, so we don't have to rewrite in Rust?

### 00:04:37 — Results: less memory, faster starts

This was another prompt a little bit later. And the result. Is that it? Actually, did have JavaScript memory like the memory usage. It uses about four x less memory. It starts about. Times faster. And we're dogfooding this internally, and it'll be external soon. Some more benchmarks, and then I'll also go into more detail about how we actually did this. So like, it's it's. It's possible that if an interesting thing is like.

TypeScript seven rewrote their code by hand from TypeScript slash TypeScript. To go, and the single-threaded version. With when compiled, the Ubuntu file is now faster than the single-threaded TypeScript Go port. And we will add threads also to the ahead of time compiled version of one. But we haven't done that yet, so there is a PR.

### 00:05:56 — Types as predictions

And so, a little bit about like the actual ahead of time compiler. Types are not types. Types are don't necessarily need to be correct. So it treats types as predictions instead of, like, trusting them. And this kind of problem works really well for models because. They're just really good at writing compilers, so.

### 00:06:26 — Tests that predate the project

This is sort of like more about like how. Like should we, like how we were thinking about this decision, and a big thing here is like. There's so many tests you can run when it's like. In ahead of time, like for something like this, because we don't need to write any tests pretty much ourselves. Like we actually do write a lot of tests, but. We can largely trust that the tests that predate the project worked.

And this was the same thing with the Bun Rust rewrite, where we had Bun's existing test suite we could run. And now with the compiler, we have one of the existing test suite. Plus WebKIS test plus test two six two plus FiveKIS test. And then we also made it so that way Bun itself, the Bun load and test render could be run in the AOT mode. And like. The we have one breaking change with or really it's two breaking changes with the ahead of time compiler and that's.

Pretty much why these particular tests are failing, but the. And the two breaking changes are actually like. Mostly security things. To prevent prototype pollution attacks, but they also end up benefiting for performance. So, like, what makes this particular kind of problem pretty good for agents is like. You run it with. You can run all three versions of the application: one with the JIT, one with. Ahead of time, compiled and one also without the types, and as long as the three of them.

Behave the same, then you know that it works at least for that specific application, but then. You can take that kind of problem and fuzz it a lot. And just have fog-like, turn-out code generators. To like buzz different patterns, and you can catch a lot of bugs that way.

### 00:08:28 — Batches, then long-running agents

This is a very large. Project is the biggest I think I've worked on in terms of like code volume. Most of this is S, and also just because we rewrote it five times. When you're like doing this kind of project. How I think about it is like. You have like batches of, like okay, we need to write a lot of code at once, and then. After that initial batch, then it's okay. Let's have let's like.

Fix everything. Make sure it compiles. Make sure it passes a bunch of tests, and make sure it like really truly works. And the actual logistics of that are like. When you're in the big batch kind of project stage, then. You don't want to run builds. You want to run one build because otherwise you're going to spend all your time compiling and like. Waiting for build theirs, and it's going to like not be a good use of anyone's time.

And then separately. For like longer running, like once you have once you've written all the code. You want to. Have it like have lots of individual agents.

### 00:09:43 — Five rewrites

This is like a little bit of the timeline of this project. The. The first one was not very good. Like Claude would. The gigabyte, which is terrible. And like this, used as much as possible from Jarvis Report's existing code. So it was like basically the ceiling was what is like only as good as like. What it could be from that. So then, a little bit after this, we added a type script type checker in the bun itself.

These were prompts, and so we added one track. And then we're like eight log two teams one check. And then after that. Sort of time about two times faster, and in cloud boot and. Started using about exa level memory. But the koba's law. And like, like this is not good. It should never. Basically, this meant that any object that accessed a property called archive. It would then assume that the bun dot archive API was potentially used.

And I looked at this and I was like, "We cannot ship this. This is not good." So then. This is like yeah, and this is another thing too. Is like it just like. So like when you're doing like a large planning, like when you're starting to like have to do a bunch of design docs and stuff. It just loves writing markdown docs, and it doesn't make sense. Who's gonna? Like 1500 markdown files, not.

Reasonable. So for this, it was like. This was like I think the third compiler. No, this was the third. It to like just to kind of get it all out. 140 agents at the same time write all the code all the same time, then get cloud code to run. And then this is the fourth one, and this one. The code was not slop. Pretty good. With like basically the same performance as before, however.

The compilation time was way too slow. Because people coming from like a JavaScript background don't expect any compilation time. Yeah. So. Fifty seconds for like cloud code is like a pretty large codebase, but this meant that like other projects would take like. Single-digit seconds, and people don't want to wait that long. So, we're gonna rewrite it again, and. Because in older versions of this compiler, it was taking like ten to twenty seconds.

And then Claude does this thing where like. It'll try to like size up everything. To judge whether or not it's worth working on, but it's really easy to. Convince yourself that like your measurements are good when they're not good. And like. Part of it was also like, why is it nine hundred thousand lines of code? This should be a lot like smaller. So, let me do it one more time.

And the code was good, and the build time was under 20 seconds. It's possible that we end up with the sixth time sometime later, but the fifth one is like very shippable and. I've worked on this for enough time that it's like time to ship it. A lot of this was like, just like. Hey Claude, try this idea, and then see what happens, and then it would like size up the idea.

And I think this is like still kind of not right. Like, I think a lot of this are like. Things that we should try again, and not let it like, kind of what I said earlier about like. Sizing up the impact of a change is like it's really easy to underestimate or to like. Size it up incorrectly, and then talk yourself out of it. So I think this probably needs to be revisited more.

### 00:14:51 — Long-lived agents over workflows

My old approach. Particularly with like the fun Rosseri, right? Was very much leaning on like classical. Workflows to do things, and pretty much now with the most recent models. I mostly just rely on subagents that are like very long lived. Except for that initial part where you're like writing all the code all at once. And this, with the subagents, it works pretty well because. They keep all the context of the relevant code in their head, or like in the context window.

And. That's like less wasteful, and like they just keep.

### 00:15:35 — How the compiler works

Going, here's a little more about like. How the different parts of the compiler works. Generally, it's like there's. If we can confidently prove that. The value is like the types are the same; that they're monomorphic. Then it can become a field access. Otherwise, it has to check every single time. And it has like some inline caching, but not like a lot.

### 00:16:07 — Hourly updates and fuzzing

As with a project of this size. You really do need to. It's kind of hard to follow sometimes, like what everything what everything's happening, so. I think a lot on like, just having an hourly update, and where we post this work card. Comparing a bunch of metrics that we were prioritizing. Yeah. Usually, though, when it was posting in Slack, it would. Of like the previous and this version, so that way it was easy to see if numbers went up or down.

But it's like not helpful in the slide because the previous one is just legit. The important thing is like. None of these tests, for the most part, are things that are like made up. There are things that. Like pre predated the project, so that way we know that like the agent couldn't have messed with it. Fuseeley is like a JavaScript engine buzzer that EA uses. So, and we were already using that in one. But we also extended it to have.

Say like test for type group types, as well. And it's also important to check that the tests actually catch things. Because it's really easy to fool yourself that it's finding bugs when it's not finding bugs.

### 00:17:36 — Benchmarks

Some more numbers on the ahead-of-time compiler. It generally for most projects. Outperforms legit, not always. You can see in the UglifyJS case, and that's basically if it has to use the interpreter a lot. So if there's a lot of like eval or new function, then it's not faster. But most applications don't do that. And it's like. It's like make it like as close as possible as you can get to like a one-liner to like make an application run faster.

This is not 100 true because, as you can see, Amplify JS, and there are other cases as well. But it is often true. So like yeah, the other thing is object prototype. This is like a rare edge case, but basically. There's a lot of security vulnerabilities in. Job shop applications called like prototype creation, and this usually works by assigning properties onto object dot prototype. And the compiler grants that.

### 00:18:48 — What you actually do all day

So like, for a large project like this, what do you actually do all day? These are like the top messages that I send. Then continued a lot. Also, like my laptop kept dying. And then, like, but like more concretely, what you actually do is like. A bunch of leading questions, like why are we doing this? Can we do this? Also, I end up saying like, can you do this faster? Or like, what's taking so long?

Because it kind of like talks itself into making up rules. And also, it tends to not be. It tends to like. Underestimate what it can do. So I often end up saying things like this to get it to like. Try harder. Believe in. And the result is that JetStream three, which is one of the main benchmarks. That JavaScript engines use the bun outperforms both. JavaScript, and Node.js, in like V8, in most of them.

And the whole time, like, it's been using Clapto to like build the bun compile. Like to build Bun compile itself, and then using the build of code that was compiled with Bun compile.

### 00:20:35 — Takeaways

So, sort of how I think about this is like. Like the testability thing is super important when you're working on a large project with Claude. And to make sure that the tests actually test things. And if you're not actively remeasuring, then it's gonna like get worse because it's just. If there's so much stuff going on, it's really easy to lose track. And like, it's easier for large projects like this.

That haven't shipped yet to rewrite benefits factor. And if you act ambitiously, then the models will like. Start having like zero point one percent improvements instead of like ten percent improvements. So you kind of have to constantly nudge it to like. Hey! You can do really cool things if you try harder. You can try this now if you want by running bun upgrade deepfashionary if you have bun installed.

And then just bone compile. Thanks, everyone.
