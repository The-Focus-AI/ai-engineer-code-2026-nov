---
title: "One team's path to trusting AI generated code"
speakers:
  - name: Ankit Jain
    affiliation: Aviator
room: "Continental 1–3 (Workshop Room 1)"
starts_at: 2026-11-10T09:30:00-08:00
ends_at: 2026-11-10T09:55:00-08:00
format: talk
recording: 2026-11-10_0933_Ankir-Jain
duration: 1350.6
source: voice-memos-transcript
---

> The recording starts after the talk had begun; the speaker's introduction is
> not in it. A 3½-minute recording from just before (`2026-11-10_0929_Ankit-Jain`)
> is indexed separately as `needs-review`.

### 00:00:00 — Opening

You shared your very close. So, here we went for exciting. So you're a very small team, you're 9 engineers. I knew I'm gonna be working 100 PRs per week. And now we're doing about 4, right?

So one of the main things which has changed each other already, so we were, we moved from human, redwood code with VI assistants, to now predominantly AI will concur with human assistance.

### 00:00:30 — What we tried first

So let's start with the barrel. So what did we try first? This is not like, I'm guessing, most of you are already using an air reviewer. We started kind of, you know, testing from the area of yours worth. You know, you see busters in the comics from the box, some from units.

The reality is a lot of coming from boys we've got were sort of like nice to have, as well. But it did find b, but whenever you find b, you excited, it's like, okay, this not be working. And in personal condition, we had was once we started to get a reviewer, most of the comments that humans are quite interacting not about bugs are correctness. It's about decisions. Then our 2nd one was, okay, let's just write space.

Let's make it over. This was in January. You know, we make the specs and then we could get separated by AI. We just reveal the specs in some of the discs. It kind of like releases creates one better proxy.

The reality was when you're writing specs, there's a lot of assumptions you make. Eventually, when things get implemented, a lot of this get still. But the bigger issue is now, if you stop it in the code, there are traits that reflects. And because of this, we ended up going back to tributes, the intent was written down, but nothing really checked whether we're actually still consistent with respect. And then our authority tech, this was probably the most interesting and useful one.

We actually created our own producing. So instead of us doing a very new African, our request, we has actually had a skill, which is like everyone, good, review our own code, before you even somebody has a phone request. And yeah it books and stuff that kind of like happened beforehand. So we found better findings than the what. Now, because it's actually very conventual, we could add in more comics coming to our put, basically, the skill.

But then the idea is we're still reading the list. But it was after the fact, which means obviously there were lesser bullets, there were lesser concerns, you move a little bit faster, but we still are, you know, how you need the death. And the other thing was, any timings that the agent found in this ruby skill, something like got lost in a session. We can't, like, really never even back to it. So it was a better reviewer, but we were still reading this.

So, but this kind of like provided us in a little bit of like, you know, sense of where we can go this.

### 00:02:56 — Code review is not about the code

But before we get into it, let's put people, what might we even do for it yesterday? This is a study journal like back in 2013, by Microsoft, 44% of people asked, why did they do good reviews? They said to find lots. But only 14% of analyzed comments actually were both. So this 30% gap is the real gap that we're going to talk about today.

Code review is not about the code. Code review is not about the code. It's not about finding bars. Eggs or bust to build, make them walks. Unless you buy quoting a single project by yourself, please don't care.

In that case you don't even need a photo view. But if you're working on teams, you want to build a better models. You need to understand how things work. Could be is about narrative. It is more mature.

It's not about 5 bucks. So human code reviews also find real issues. So they are still valuable. However, we are really, really bad at it. If you think you're a really good reviewer, please go back and check how many times and it's gonna happen because of the stomach.

And that's because beyond 400 lines, your quality of reduced drops significantly. This has not been saying this is our study done back in 2006. Long before I think in the case. And then we had all gener rating, every PR, a median PR is over 600 lines. So what does that mean for our data quality?

You know, even though we are remaining good today, when are you really able to do today? And the reason is this was always a bad place to the review. You have one reviewer reading from memory one time. But will it tell you what was changed, but never why? So what a review actually contains, this is sort of like another example where we provided hypoquatic summary, this is designed to meet it in your own and the right half of them from the bottom.

As you can see, what we started doing was like, let's try the categorize. What kind of review comes do we make? Not all Arabians are not an ordinary comics are the same. There are bugs, some of them are annoying, some of them are nice to have, but there are also rules, kind of like, okay, this is what our food standard standards are. And, you know, enforce those standards.

And there's also decisions, which is like, how do we really understand the concepts or are we actually doing architectural conversations? So in footy prints, 8 were, what price only, one was made by, 3 were rules that we have also repeated in the past, and 2 were after businesses. So, again, there are 2 kind of reviews product primarily. One is about the quality, the good quality, which is like, is it correct? Is it falling or sandwich?

And the 2nd is decision, which is an opinion of it all. If you automate the entire review, you mix up the 2nd part of the matter. The greater sort of thing, or?

### 00:05:51 — Six steps

Okay, so I'll show you a little bit about, you know, how to do about movies, take it or leave it. Everything I fear that you can actually do in yourself, don't need to use theater for any other car. So it's a lot. We have 6 steps. It was like, okay, we kill it one thing and we're creating six.

But hear me out. What we're trying to do here is like break it down into different parts of what a value would be provide and build it back up again. So when we 1st started an argue, argue is now you have multiple footing agents starting with each other. We have capture. By the way, all of these things will go in detail, so they don't need to, you know, take too many notes.

We have capture, which is about like actually being able to capture what's going on in Italy. Codifies about repeating, capturing, and everything that can be already, like, like, universe, protect more, prove this thing, actually, doing, and then the change it's supposed to do is working. And debate is where even part of it participate the most, which is like really seeing formulating by decisions. Are we able to do the right thing? And all is the ownership, you know, the models cannot really do anything.

So unfortunately even. Still responsible on the other line to when things go wrong.

### 00:07:11 — Argue

So let's start with arguing. Let the agents argue before here exists. This is part of like similar to some of the things I mentioned from my temporary, where we repeat our self remissive. Now we argue with our upper stages. So essentially we create a skill which worth energy also use a qu body model.

You don't have to use the same model. But as you're doing is creating this argument where according to you and the interview, they are arguing with each other with different goals. And this whole part is important. This is why kind of like having 2 different agents is useful. Because now the rules is for putting it into full experiment versus the review agent to find defense.

And this is the most important. Everything that they disagree about, they should write it down. Today, so in this case, here's what we disagree about it. It sounds like we started writing it down. In this case, you can see, you're not just writing down the decisions, but we're also writing down what was designed.

So for instance, if there are things where you're saying, this is an accepted risk. We won't fix it. And it's okay because agents will always go and try to fix them, but like, sometimes you don't need to fix it because you don't need that complexity. But there are also certain things where we say, oh, you're actually following a separate place. All of this information today gets lost in your sessions.

And what I'm closing is to be able to read these things.

### 00:08:37 — Capture

Which brings us to capture. We should capture the why and the how. A very common answer is that, you know, to try that. This is our attend number two. The problem it expects is it requires time.

I'm not saying space are wrong, but it requires a certain discipline. As I mentioned, one of the power failure in space was that we never went and corrected it when it was rooting. So what we are suggesting is if your specs are broken, you have to fix it. If you don't, then you're using a waterfall model. This is something we, you know, moved away from over 20 years ago.

So that's why it's important to have a discipline of space. In our case, we are not able to intend. So what kind of replacement? We talk about intent. Intent is why are we making a particular change?

I don't accept this criteria, which is how you can we take? Some of you might be familiar with behavior in involvedment and something like these other concepts taken from there It's nothing near. This was again 20 years old concepts. The beauty is it works for a single one change, and it works for a common right feature. You have to eat time for everything, you have the acceptance of behavior for everything.

And these are already given your sessions. You don't need to go and write it yourself. The intended 2025, but maybe it's interrupting it. Maybe it's something you need to be started working on. Maybe it's a sp and correct.

And accept this criteria every time you your agent t to make a decision, every time we kind of describe the, that a expectation. Do they need full these a bit?

### 00:10:17 — Codify

And the. Okay, codified. I'm going to go a little bit faster. I can go right a little time. To repeater comments into wolves. Yeah, yeah, yeah.

Doesn't mention there are like 2 different French comments. One is about correctness, one is about beginning. So what we did was in India, mining one year of our previous comments. And then started going to produce, and it was, okay, really under the comics, which are more useful, extracting, classifying them, other than chemical into rules, and eventually distilling it, which is merging similar rules to create these guidelines. Now, these become your invariants, essentially what came out of those is out of 200 candidates.

We got 64 rules automatically created. This was only one scan. Imagine if you start building this on a regular basis. So these are some of the examples of the rules you can see. Many of them are rules can imagine can be litters, but some things can get more complex.

The meaning of this is it creates one way to define the rules in English and you can mention that over time. Even if it would change. So what goes in an invariant? It's a rule which describes what it's supposed to check. That's cool, where it's like when does this rule apply?

Verified by it, it's like, how many not do you prove that this is working? Prominence, which is just tracking where this came from. So if you have to correct you kind of like the backin source. And owner. And this is the most important one. If you don't have an owner for a rule, this rule build becomes tail.

Since it's meant to make sure you only different membership of these things. And you know this is indorence at super over time. In you find it in very one time, there is a hierarchy. What an agent can now is take us to I want to do the script, which is kind detected and checked in themestically. You want this in?

I don't know, you're not like, why have you been mortal? And I'm getting into like, video music express. So what you've done here is essentially use AI to build more domestic systems to generations. I will pick a right. So here's an example of one of the rules I'm okay.

As you can see, this is an PSD print. If you focus on it, it's kind of like automatic detects, that could be requires calling it as a time out. So out of the 64 rules we had, we were even converted 19 on that. Did it domestic? And now it was predictably, it's easy to verify.

So every comment your team repeats is a gonorly younger. The very community repeats is a god of heart.

### 00:13:02 — Verify

Okay, how do we prove that the doctor works? So, this is kind of like, where some of our system comes in, we kind of like take these up and spread, you know, create a plan, spin up a server, and then drive the agent to capture the evidence. What ends up happening is based on the type of rule based on the type of behavior, you can have the difference. All you're doing here is sort of like somewhat similar to how we use the QA. But now you're giving a plan in Asia to find themselves.

And our goal now is to make sure that everything is correct. So in this, for example, you can see kind of forest perspective rule, there is like screenshot captures, request captures, responses. This is sort of like how engaging can convert a goal into automatic steps. And depending on what kind of criteria there is, you can also define different types of behavior or verification. You can take screenshots, you can request response, you can check your 1st response, network activity, DSD groups, as I mentioned, as well as test ones and creases.

### 00:14:10 — Debate

Okay, debate. This is where we come in. V, as in V. You know, this is something which I want, one thing to take away from here is that humans are always important in this room. Do not completely move that if you're working cheese. You will lose your knowledge.

And this is where of even say. Some good decisions come from. When you build, your agent is talking to you. Most cases, if you want dark factories, this might not be true. But most of you, if you worked on your class of sessions, you're working there, you're providing feedback with many corrections.

These are places where you're making these micro decisions. But agents are you, but generally mentioned, if you're running a coding agent and a review agent, this is something where the audience are coming. And then when a verification fails, which is like all these rules that you would bring down, all these criteria that you wrote down, specific films, your agent is making certain behavioral changes, but it's being required for being approaching. In most cases there are the same. And these are the things that they want.

So, here's an example, like one critter file, where, you know, under these decisions, under, as you can see, I only shared some of these examples, some things are decided, some things are faced. But some things may require new judgment as well. We're kind ofraid fun art. So it becomes something you need. So we cannot know these decisions of what they do.

We can skim what is settled. Suddenly, what we agent or not, we are, we have a... And you reopen any calls, you would make different names. So there's a decision that something maybe megamedi made or humanm. Now you can actually worry.

The meeting you're doing here is as a reviewer, you're having a discussion with the author. And this is where the collaboration becomes important. This is where you're learning about how system work. This is where they're actually arguing these decisions and not just in the podcast but also the humans who are acting off. So decisions out there, all records, true.

You can analyze weakly. Now you have all of these decisions, you can say, hey, for this particular feature, just give a per change. Give me all the decisions that were made for the seat. Maybe there were some things that you might see as a concern and go back and visit, why these decisions were made. You give it to your agent.

Now agent knows these past decision. This is sounds like the trial already talk about. Now you' need to have access to these micro decisions, sort of like calling context and continuous building on.. And follows become easier to try allergies for decisions that you make. I have to follow that, then do it in a separate food request.

Now it can be a business organizer track. And finally, this is very, very, very, very better in that rules, which now essentially becomes the standard of your approach.

### 00:17:18 — Own

Ownership, you know, models, unfortunately, still today cannot own the code for mistakes to make. So the responsibility has grouped, as authors, we used to open the code. It's like, okay, if you really, we are going to own it in the Pakistan. Know. And then we talk about the reviewvers, there are some like the gating factors. There are the code orders, they're the ones who, effectively still, though, they're like somebody else, outside the team.

But thinking about the mission from a team, now we can actually own the rules that verify whether the code works. So instead of thinking about owning the code, own the garbage, own the roofs, own these frameways. So as humans, now our response story is not the line by interview. You can't keep up. If you are still reading the code, I'm sure it still is working, but like imagine that one generation that is happening, more would be easy enough to do the day.

We have to now own the rules that I occur instead of only with health, alone, what is verifying the code? And maintain your understanding of the system. If you lose this understanding of the system, you don't know what we're doing. You don't know how things for it. This is where it creates our.

### 00:18:45 — Results

Okay, so a quick review of an ear error. And the numbers kind of like here we are. So, as I've already mentioned, kind of like we have 4 explorer changes, our immediate time to mortge has gone down drastically. It's 3.4 hours better used to be 2.one deals. And also proceeding the number of threads in their PRs have decreased.

Now you're kind of like not finding as many correction mistakes as an issue of the PR. So what we're doing is having these discussions in the decision you. So certainly are health test changers still discussing of these things. But they're having very different sorts of it's not online online code. And the number of rewards I.

So that means our lottery has now improved for it, even though it is different. So, don't even read all of this. I kind like already shared. This is an example of a request. It used to be open 5 days.

It's like 2.5 hours. I think the most important thing is now we also have all these crews. We have all of these screenshot, we have these requests cations, which means now we have better auditability than we had before. We can actually go to our auditors and show like all of these things will verify and we have enough evidence that this works. And one of the most important things is we've changed our surface from being to death to the UAD, and it's 2 religious things.

So there are a man goes down. We spent a lot of time refining these rules. We debate a lot of the decisions, and we figure try to learn more about how do we improve our verification systems. Everything that we manually use testing, QA, anything today, we always go back every week and try to figure out how we are. And this is not something you can do immediately.

There is something you have to do over time. First 90 days of the hottest. 1st one, we generally double work, we're company, the cover, we are regaining the rules. We're making sure everything is working. Yeah. The 2nd is kind of, like, really spicy, you know, the, the, the, the, the, the, the, making lesser lesson changes.

And finding of one, three, you know, 5 scenes are like the enchanted experience. It is actually more valuable and more useful.

### 00:21:08 — Start tomorrow

So, can you start tomorrow? One would ask 1000 a week comments, take the top 20 out of those and write those checks. You don't need to do a lot of this man you can just ask a agent to do all of it I'm sure it will come out the rules. The main thing is just pull out in our CI, let these rules want private change. So please stop reading the death.

Read these intent, instead. The intent is why we, why don't you exist, except this bacteria, is how you know it actually, how it's supposed to behave in various other garreos, or how, so difference between accepting studying and in variance or inverance or food, finding music, so different, and behavior, change. And decision is one of the most important things, which is your opinions, the trade-offs, all the things that you're doing. And other this is a group of music. Here's a principle of either verified experience.

So we are, we have to finish, I think, because the seasons, you know, let's go check out. And we're all doing this together. We can, outsource something, give you one of our sources.
