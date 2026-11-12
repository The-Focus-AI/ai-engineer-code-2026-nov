---
title: "Exploring Claude’s frontier"
speakers:
  - name: Lance Martin
    affiliation: Anthropic
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-12T12:35:00-08:00
ends_at: 2026-11-12T12:55:00-08:00
format: talk
recording: 2026-11-12_1235_lance-martin
duration: 1098.3
source: qwen3-asr-1.7b
---

> The recording opens as the speaker begins; the MC's introduction is not captured.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names and affiliations of overlapping sessions. "I'm Lance from Anthropic." at 00:00:00 may
> come from that prompt: the Voice Memos transcript has "I'm Lance Strom and dropping." there.
> Claude and Kierkegaard were not in the prompt. Other names are kept as transcribed: the model
> is "Fable Five Two", "able-to" and "Fable Five", Claude is also "Claus", "Clauson", "clock" and
> "cloud", Wiles is "Andrew Wild", the proof platform is "ProofTino" and "proof to me", the
> benchmark is "CL Bench" and "CLH benchmark", reads and writes are "reeds" and "rice", dreaming
> is once "reaming", and wikis are once "white keys". The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Introduction

The clicker works. The computer works. I'm Lance from Anthropic. I know we've had some issues with the. When the prior keynote, so. We're set to go. I'm going to tell two stories about attending the most out of Claude and exploring Claude's frontier capabilities.

### 00:00:13 — Formalizing Fermat's Last Theorem

So the first is multi-agent. This is a blog I wrote with the Fable Five Two launch. And I want to kind of tell the story of what happened here. So Fermat's Last Theorem is one of the more famous claims in mathematics. It stood unproven for about three hundred fifty years. And it's actually a very simple statement. Just a to the end. B to the end, C to the end has no solution for any positive whole number greater than two.

Now, this deceptively simple kind of statement. Has proven to be quite difficult to actually prove in the mid ninety s. Sir Andrew Wild did prove it. He put out a proof, and it took him seven years of work. It was extremely painstaking. And since that time, a major effort and interest in mathematics has been formalizing that proof, or basically computationally checking every step. So proofs are kind of long chains of logic. You actually can.

Computational check proofs using different systems. We'll talk about, for example, using Lean. This is just kind of a visual, kind of explaining. There's a very interesting video showing the effort that we went through. Extremely painstaking process to establish this proof and. In September, we published that we use Claude to. Formalize it. This is like a first, very important result that we kind of share all along these lines.

And we use Lean to do it. So Lean allows you to computationally verify every step of a proof. Now, doing this though is extremely painstaking. We started with a team of about a dozen agents. And this is kind of just showing a schematic of that team. Very early on, that team didn't work very effectively. We had to give it something called ProofTino. This is a kind of platform for orchestrating mathematics proofs.

And it helped the agent significantly manage the state of the project. We you can think about as a harness, so basically provides agents with a graph that they can query, so it. It's basically lots of scaffolding around this problem statement. Think about it as like a very domain-specific harness.

### 00:02:06 — A thousand agents, no domain harness

Okay. Now this is all setting up what we actually did. We reported this was back in September. The formalization. Now, what I want to do for five. Two is show can we have a much larger team of agents? So going from a dozen to a thousand. Due to formalization with no domain-specific knowledge, so without group teammates. And with no human steering, with respect to the solution. So the report we talked about in September had both extensive analysis, proof to me, and a lot of support from researchers.

This is testing whether or not a large team of able-to agents. Can autonomously develop this normalization themselves. So this is just giving you a sense for the harness. It looks kind of complicated, but it's actually pretty simple. Each of the thousand agents has its own sandbox. With restricted network access, most of this is directed on safety and security. So we have a thousand agents, each have their own sandbox. They can connect.

Two different things: Git and a SQL database. That's That's the only. Those are the core principles we give this team, and we have real-time monitoring. We'll have another tool call for things like. We also have offline monitoring, looking at runs of agents every 10 minutes. This is kind of setup. Thousand agent team, very simple primitive. Just get a database. The prompting is pretty simple. It establishes one lead agent, 999 helper agents. It gives them awareness of get.

And the database and the problem statement. That's really it. We want to see if this team could then do this formalization.

### 00:03:46 — Agents build their own coordination tables

What's interesting is this kind of story. What the team did, the lead very early on. Five minutes in the run, basically created these database tables. So agents now are sufficiently advanced that they can actually build primitives if they need to solve hard problems. We didn't tell them to. These are the tables that the agent actually just kind of fills. A table where the lead can announce things, assign roles to workers.

Everyone can know. Post note to subtask table. A table indicates what other things will happen. So the lead just creates these tables to orchestrate the team. And this is a visualization showing. How the agents wrote to and read from these tables over the course of this run. Now, red on the top is showing rice to the tables. Green is showing reeds. What's really interesting is you can see occasionally the lead right at the announce table.

This kind of announces major global, like kind of announcements about the problem. It also signs. Workers, these helpers, different statements in this theorem as they proceed. Nodes are where they communicate and share context. Progress land is where they kind of actually write the lean code as part of the proof. And so the agents all autonomously, without prompting, you. Use the database in this way to coordinate their work on this extremely hard, long horizon task. This ran for around 30 hours.

And for particularly challenging parts of this proof. They actually developed their own abstraction. This is actually a task tree for this Löb-Ryan's tunnel. This is one of the harder statements in the proof. And this is actually showing the different dependencies of the tasks within this tree, and this is actually showing over. Time, how you know the progress from like in progress to done in red.

### 00:05:27 — Long-horizon work from simple primitives

So the point of all this is really just to kind of highlight: agents can solve very long horizon problems without much. Scaffolding. This is showing kind of the overall kind of. Allocation of the agents across these different tasks over the course of this run. And this kind of shows how the lead and the agents themselves kind of reallocate themselves. And kind of reassign themselves to different parts of the problem.

As it progresses, and as these statements—there are sixty statements in this proof—are all. Solved. So the agents using simple primitives get, and the database can coordinate themselves. Across this very hard problem, to solve it progressively over time. That's really the key point. You can see time progressing here. This from one of our runs. This is one of the notes that the agents left, basically saying to freeze at the origin, effective now.

Magnificent work all night. So basically, what is really interesting about this? Is we were able to show. This formalization, which was expected to take many years. Back in September, we showed initially you can do it with twelve, with like a dozen agents with a lot of scaffolding. This proved to be harness. And a lot of poking and support from researcher. This new result is showing. We provide a lot of structure in terms of safety monitoring, but the agent team was able to.

Accomplishes task with very simple primitives, without a domain-specific harness. In this particular case. And agents are getting increasingly good at orchestrating themselves. And knowing how to coordinate using these simple primitives for very challenging, long horizon tasks—that's really the key kind of observation, which is very interesting. This work now.

### 00:07:06 — Memory: understood backwards, lived forwards

I want to shift gears and talk about memory, which is. Entirely different when I talk about in terms of multi-agent, but it's highlighting in another area we're seeing Claude gaining significant capabilities. So previously we talked kind of about Claude's ability to orchestrate large. Teams to solve very long range problems. Memory is a different capability. Showing that Claude is increasingly capable to organize its context. To help solve enterprise problems.

So, I published an end blog on this. Fairly recently, and this is actually the lead line of the blog. I think this actually encapsulates the idea of the blog. Like one of the central ideas in our memory, I think, is very interesting. And this is from the philosopher Kierkegaard. So life can only be understood backwards, but it must be lived forwards. This is a fundamental paradox of agent memory because agents write memory typically as they go about a task.

They encounter something weird or interesting that breaks memory. But memory needs to be a coherent, a map of nature's knowledge that agents can look back on and reflect on. So when they're writing to memory, they're writing kind of myopically. They're looking greedily within a session, saying, "Ah, this seems important for this task at hand." But memory needs to be something that's globally coherent and not redundant. So this is like a very Tricky paradox in memory, and frankly, we as humans have the same kind of challenge.

We go about our day. We write short-term memories. Believe that the hippocampus kind of is the place that's orchestrated. At night, it's believed that the hippocampus replays. To the neocortex, to where long-term knowledge is stored. So it's believed that actually this dreaming process for humans helps consolidate the. Fragments are like the most important aspects of our daily experience into long-term knowledge. There's just decomposition between. Daily memory and have long-term knowledge.

And we found agents can benefit from the same decomposition. That's really the key point of the post.

### 00:08:54 — Better models use memory better

Now here's some results, kind of telling the story. So this is actually. At Open Source, continue learning benchmark called CL Bench. And this is showing that different models, as you go from like Sonnet up to like OpenAI Five. Get increasingly good at using memory. Now, this task is a very simple setup. It asked us to ask to solve 40 questions about a database. In between each question, it's a fresh session, and Claude can write to notes like a memory directory.

Between each session, so it's kind of like a set of sequential questions, and clock and write memories to help with future questions, right? So what happens is, the dark bars are showing when you give Claude the message. And then the hashed is like without memory. Okay. Now what's interesting is with Sonnet Four Six. Giving Sun at memory, you can see in the dark blue. That's very little benefit. Can't really use memory.

And we looked at the results, and we found Sonnet doesn't doesn't reliably know when to write to memory. It also doesn't really naturally read from memory. Okay, it's also worth noting. That these experiments are done with no specific memory prompting. It just tells the agent the directory is available. Use memory if you want. That's really it. So, Sonnet Four Six doesn't need to use memory effectively. Sonnet five does be better, Obis and so on, and so basically.

The models get better and better with the same simple instruction, and using memory, and really the key idea here is that. What happens is with stronger models. They know intrinsically when to write to memory, and they kind of know intrinsically when to read from memory to retrieve information. Their memories are also better. They're like they're highly verified statements or predictions about kind of. The state of the day of the day, or what may happen next, versus earlier models.

Tend to write lower quality memories.

### 00:10:40 — Pokémon memory directories

I'll show you a very fun example of this from a different game. This is from Pokemon. So this is showing you. Claude three seven's memory directory from Pokemon versus Fable five. Here's the key point. The size of each box indicates the number of memory files in each of these directories. Okay, so when we have Claude play Pokemon, we give Claude a memory directory just like I did in that prior benchmark, right?

Claude can write whatever it wants. That director while plays the game. What's really interesting is, on three seven, we see it writes a huge amount to memory. And when you look at the memories, it's indiscriminate. It's basically writing down all sort of experience. It creates this huge, unwieldy, just disgusting memory directory of things that are not really relevant or. Strategic for gameplay, and it proceeds much worse in the game.

Then Fable Five. Fable Five's membership is much tighter. It's really strategic insights, tactical knowledge, things you can't just get from game state very easily. So what we see is better models are much have much better instincts for salience. And like what to write to memory, and you can see this reflected in. The memory directories is much tighter. It's much more strategic and gameplay. Indeed, within five, it's much further than seven.

So it gives another intuition around the fact that Claude is much better at writing to memory, knowing. Kind of what's right and salient, and what's salient, and. And also, kind of using and reading from memory. So models are getting more and more kind of effective at kind of knowing salience and know which to write. And also reading.

### 00:12:13 — Dreaming

Now, both of these represent what I would consider in my initial framing. Of like writing to memory during experience. So basically, both these tasks. We let Claude write to memory while it plays the game. We let Claude write to memory while it does the CLH benchmark. But as I mentioned, there's also the dreaming side of memories. This is allowing Claude to. To reflect over memories, to fix things, and I'll show some interesting examples of that.

This is kind of a framing of dreaming, and so we can think about memory in terms of. There are transcripts. Transcripts you think about as kind of foundational. So imagine a member system could very simply be just transcript search, cloud-based transcript. As it goes about a task, future sessions can read from the transcript. Of course, transcripts are large. It's very unwieldy. We talk a lot about in the blog posts the fact that transcripts often contain information that you know a very small amount of information. Transcripts actually. Salient matters.

So we also allow Claude to do things like writing memory notes, as I just talked about, as it goes and writes notes to memory. Dreaming lets you do more. Dreaming lets you reflect over transcripts and these written notes, and re-represent them. Build member representations like white keys as an example. Actually, promote certain memories to injected context and load them preemptively into every future session. So memory is this. Dreaming is this mechanism where we can kind of.

Process existing transcripts or existing memory notes, and build new things from them, including representing.

### 00:13:42 — Dreaming corrects mistakes

So some fun examples of this. This is from Pokemon gameplay. Dreaming is an effective way to correct mistakes in memory. So as I talked about. When Claus is going about a task, it can write incorrect notes to memory. Just it makes a mistake. This happened. This is, and it's pretty lame. Claude wrote incorrectly. Wrote the location. Of a particular landmark in the game. Now what happened is with this incorrectly written memory, Claude got trapped in a loop.

Where basically it would mislocalize itself. Fall down this trapdoor and it would basically send it back to the ground level. That's like the high-level intuition. The details aren't that interesting. The key idea is a poison memory is injected and it's stuck there. Dreaming can rescue that. That's really the intuition of my dreaming is extremely powerful for reflecting over memories and correcting them. So this is showing some trajectories in the game where orange is memory and dreams.

Up is good, so basically up represents game progress, and down represents kind of game regression. What's interesting is. Raw memory, basically without dreaming, we can see crashes out. A incorrect message was sent. And Clauson continues to basically progress. In the game, when it hits that particular point, we're dreaming it rescues a mistake. Offers need for the next level. That's really the key observation, and this is a very general principle.

That cloud can use reaming to correct mistakes in memory that are otherwise stuck there. It's a very important way you can kind of correct errors.

### 00:15:15 — Building a wiki from a corpus

Now this is another fun example of building representations. So there's been a lot of interest in wikis as kind of general kind of ways that people organize knowledge. This is a really fun example from. We acquired a company, Stainless, back in May. And we had access to the company corpus, all its documents. Slack messages and so forth, and we anonymize things, and we built kind of a.

A data set from it, which allowed us to test dreaming. So what we did was we created kind of an email set up. 25 questions about the company that can only be answered from this corpus. We allow Claude to build a wiki. From this information, help it answer questions. What you see is we compare a raw search tool that's just like some kind of semantic search over this documentation.

We compared that as a baseline, which does reasonably well. You can see it's like 53 percent, just for search. We also test letting Claude build a wiki over this knowledge. You can see as you push, you add more and more dreaming tokens. The wiki gets better and better and better, allowing Claude answers questions. So Claude natively can kind of build up over time. A representation of this of this kind of corpus of knowledge through a wiki.

And as you add more dreaming capability, that we get more and more useful. We think this is a really nice mental model to think about. How agents can kind of build knowledge over time. They can give an access to kind of raw corpora,s of text, transcripts, and they can kind of build these representations that. Allow them to search those contexts much more easily to answer questions and to connect their knowledge in effective ways.

We also find that adding the wiki and the search tool together actually bumps further beyond just raw. That's kind of another intuition that basically Claude can also build representations like wikis. In its kind of memory, in order to help it solve problems.

### 00:17:09 — Filling gaps

And a final example. This from a different benchmark, but this is showing. Two different wikis that Claude built. This is prior to dreaming and after dreaming. What we saw is when Claude was building wikis in this particular case, there were some gaps. And for example, this initial wiki had a bunch of placeholders for pages that didn't exist. This can happen with Claude, kind of building different member directions.

And without dreaming, compute there may not be opportunities to rescue or fix those errors. What we saw is when we ran dreaming, dreaming can look over Claude's existing representation for. A wiki and can fill in mistakes. In this case, it fills in a lot of missing gaps. It creates an index, and so. Again, Dream is a way that Claude can reflect and kind of apply compute across its memory to improve it.

By correcting mistakes, like I talked about, by filling in gaps in its knowledge, like we see here. Or, for example, by creating new representations, like.

### 00:18:04 — Thanks

So with that, I thank you all for listening. And I'll be at the. Tom Russo, please continue having a conversation.
