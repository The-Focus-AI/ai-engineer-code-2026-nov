---
title: "Autocomplete for Actions: System One from the UI to the DB"
speakers:
  - name: Scott Roberts
    affiliation: Workday
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-11T15:24:00-08:00
ends_at: 2026-11-11T15:37:00-08:00
format: talk
recording: 2026-11-11_1525_Scott-Roberts
duration: 712.1
source: qwen3-asr-1.7b
---

> The recording opens mid-sentence, a few seconds into the talk; the MC's introduction and the
> speaker's opening are not captured.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names and affiliations of overlapping sessions. "Workday" at 00:04:00 may come from
> that prompt: the Voice Memos transcript has "one day" there (and "work day" at 00:00:06, where
> Qwen has "workday"). Other names are kept as transcribed: the model is "Jeff", "Jeb" and "Jim",
> and LLMs are once "LMS". The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Quick actions and deep work

To drive new innovations in HR, finance, tax. Exciting stuff! So that workday, we have over eleven thousand different organizations that use our. And a lot of the problems that we deal with break down into. Two different categories. So one is very quick actions they have to. I want to see my pay. I want to ask for a day off. The other ones are I have to dive into a ton of data.

We through it. Try to figure out what's going on. And like many of your companies as well, we're trying to put agentic workflows around this.

### 00:00:37 — Too much intelligence

And so, if we look at just a very simple. Agentic loop. You know we have a user request, and we try to decide what to do. Running tools, we're judging, doing a good job, and then over and over again until we finally get a result. Now, one of the problems here is that on each one of those, we're doing. LLM calls, and there's two major problems with that. So one is there's too much intelligence.

So if we look at the system one versus system two thinking. We're doing a lot of slow, deliberate, very expensive thought processes. At each one of those steps. Another problem is it's just the wrong tool for the job. So you know, LLMs a lot of times are just a hammer looking for a nail. And you know we want to figure out like what do we actually need because clearly LMS are not doing it.

So we want something that is fast. Smart, easy to use. It's generalized and it's very cheap.

### 00:01:42 — Decision primitives

So when we look at like from a code perspective, what are we really looking at from a From a gem-like model, it's really just a conditional. If this happens. This should happen. Which one of these cases are the ones that I want to explore? And you know you see it among many of these presentations already. But Jeb has the primitives to allow us to do this. There's the probability. Is it this or that? And what's the probability? What are the different categories that this?

Particular thing could fall into, and then you have the scoring mechanism, which is basically probability and sorting. So. Yeah, this has been brought up as well.

### 00:02:24 — Not just another classifier

You know, my first thought when I saw Jeff' models was, well. We already have classifiers. I've been doing this for a long time. How's it actually different? And as many of the speakers have talked about already, you know with classifiers. I need to figure out, you know, what's my data set. I have to train it. New data comes out. I've iterated over and over with Jeff. Just out of the box, it just.

Worked. We plugged in our question. We classified it. We didn't really have to do anything. It generalized to our question. And so we started using it for a lot of the use cases that you've seen from some of the. Presenters already, so we use it for routing. That's kind of the canonical example. You know, figuring out this step work. You know, as a judge. We looked at you know resumes, you know.

Is this person qualified?

### 00:03:17 — Is a fish a pet?

No. I want to do kind of an overly simplified example as well. So no one taught Jeff like what a fish is. And so this is actually a question we ask: like, is a fish a pet? Well, fifty-fifty. Might be pets sometimes. Might not be. And so, you know, if I ran into this, then I have to figure out. What do I do next? Maybe I can give it some more context. Oh, is a fish in a bowl a pet?

You know, after twenty milliseconds, I can ask this again. All right, that's great. Oh, is a fish on my plate a pet? Clearly not. So this is something that wasn't trained out of the box in seconds. It just worked.

### 00:04:00 — Demos: from autocomplete to actions

All right. So now on to some of the demos that we've done at Workday. So just a caveat on some of these: it's not real data, so we're not using any of your resumes or payroll data. These are also not in production now. It may or may not be in the future. So that's something our legal asked me to say. So let's get into some of the demos.

All right. So starting with why do So autocomplete starts to predict what you're trying to ask. It's just predicting the question. It's not helping you get to the answer. So as you start to type more, it's gonna guess like, oh, I want to figure out. If this person wants to take it down, great. Guess the question, but really, help me get to the answer. So what we want to do is move from just predicting the word or the next block of code.

And actually help you finish the task, and so this is best shown with a demo that. Where we go from predicting what you want to say. To predicting what you want to do, so hopefully the video plays. There we go. All right. So I need to take time off. Next week, and as I start to ask this, Jim is actually figuring out under the. Okay, what more context do I have?

How can I adjust this UI based on the information that I'm that I'm getting? This is not something that we could have done with an LLM. We're getting you know we're we're doing this you know in a loop. While someone's asking, the payslip. You should have to go in and ask an agent. Hey, can you go find out how much I was paid? What you can do is just in the search say, what was my pay last period?

Pops up an interface, allows you to unhide it. You know, see what your pay was in the last period. Very simple. Gets you to the action. Book a meeting. So I know that I want to book a meeting. And I'm gonna want to do it for next Friday. Let me do it at 2 p.m. Oh, I want to do with my boss. Make sure that I get my you know my boss on this.

Logan McNeil. There we go. Meetings booked. And then a final one that we have just for this example, but there's many more. Is finding a person. So in this one, I may have some semantic knowledge. Like, find the person who owns this part of. The organization, or just like Pusashanti, I want to contact her. Pop it up. Click on email. Good to go.

### 00:06:42 — Under the hood: picking the card

All right. So what's happening under the? So, because Gem is fast and cheap, just like a typeahead. We can start to render a UI on this on that same cadence. We can look at as the words are coming, do a prediction of intent, and start to render an interface. And you know we can do this at about twenty bucks for a million judgments. And the way that we're doing it is kind of twofold, or two parts, I should say.

So first, Jeb is picking the card, saying, "What's the intent? All right, there's a card that's going to help you out." And then the team that's responsible in that domain then can decide what are the questions to progressively fill out that card. And so there's sort of this two-step process. The first step is getting people in the front door. Getting the right. And then the second one is making sure that you fill in that card.

To help them accomplish the task that they're after. Now we have an email on here. Before we merge any card, we want to make sure that it doesn't collide with any other one. And in our initial experiments, you know, we've done seven cards or in just chat. It should, if there's no workaround to solve it, it should lie. We were able to get ninety-six percent accuracy on that.

### 00:08:03 — The recruiter problem

All right. So now on to the recruiter. So let's talk about the recruiter problem. All right. So this is not like a fast a task. It's something where. Recruiter has a pile of hundreds of resumes and has to figure out who is the best resume to accomplish the task. Now, I first want to look at like how we would have done this before. We would have done, you know, in embedding, put the vectors in a vector.

Then had a retrieval layer. Then had a word ranker. And then figure out based on the ranker which ones that we want to put in front of the recruiter. One interesting callout is the Quinn reranker. Looks surprisingly similar to the job process as well. And so that's kind of an interesting corollary if you've used that one before. But with Jeff, we basically take out all the embedding steps.

I don't have to train anything up. I don't have to do embedding. I don't have to put things in a vector database. What I can do is just do a function on my database to put all the resumes. Into a database, use natural language to query it. Iterate over every single one of them. And then just figure out which ones match my criteria.

### 00:09:24 — Demo: Jev inside a SQL query

So I'll go into you know an actual demo of this exact same one. So here we have a select statement. So this is against a DuckDB, where we have a function. That is going to call Jeff to figure out what's the probability that someone matches this criteria. We're going to get it a score, and then we're going to order by that score. Now I'm going to do about 20, and as I said, these are all fakes, and I'm going to resume the right now. I promise. And then here we see these are very ML focused synthetic data as well.

So it's not a surprise that we would have. Very high hit rates against someone who's worked in fraud, trust, safety problems. But let's look at it. Let's change this question. Let's be a little bit more adversarial on this one. So a lot of these resumes have the word pipeline in them. So whether it's a data pipeline or an AI pipeline, pipes gonna come out. So let's just ask: like, is this Wasn't qualified to do plumbing.

If you were going to just do a lexical search, it might pick up some of these. So we put it into Jeff and asked, you know, of all these ML resumes, let's. Yeah, trim it down to five here. Go and run it, and we can see you know that. Very low probability on these, so these are ones that we would almost definitely throw out. And you can see the speed. So we went over one hundred seventeen records.

We had 2.3 seconds of wall time and spent almost nothing on this query. Just iterate over everything.

### 00:10:57 — Summary

So, Jim really kind of changed the game for us because every. Every place where we're thinking is either this is too expensive or it's too. Slow. We thought of new places to inject Java into our pipeline. And so, just to summarize, you know the two areas that I went through. Are one, where can we decide very quickly and get to the intent? And get the person on their way. And then the second one is to cut down on some of the really deep.

How do we filter those out for our customers? And so I hope that this gave you a little bit of insight into the things that you could take back to. You know your own companies, and how, and you know, imagine the things that you can do when you have a decision model installed. And that's my time. Thank you very much.
