---
title: "Post-Training Gemini 4 for Real Engineering Work"
speakers:
  - name: Melvin Johnson
    affiliation: Google DeepMind
room: "Continental 4–6 (Mainstage)"
starts_at: 2026-11-12T16:30:00-08:00
ends_at: 2026-11-12T16:50:00-08:00
format: talk
recording: 2026-11-12_1622_melvin
duration: 1098.6
source: qwen3-asr-1.7b
---

> The Mainstage ran ahead of the grid this afternoon, so the recording starts before the scheduled slot.
>
> The recording opens on the last words of the introduction ("Melvin Johnson."); the demo video
> is not transcribed beyond the speaker's remarks around it.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names and affiliations of overlapping sessions. "Melvin Johnson" at 00:00:00, "I'm Melvin" at 00:00:22,
> "DeepMind" at 00:00:44 and "Duckbill" at 00:04:01 may come from that prompt: the unprompted Voice
> Memos transcript has "Melvin Johnson.", "and I mean", "they might" and "vaccine is Wonder" there, so the
> benchmark at 00:04:01 is not the Duckbill Group's. Gemini, Carbon, Hydrogen and Ethan Mollick were not
> in it. Other names are kept as transcribed: Gemini 4 Argon is "Gemini for Argon", Hydrogen is once
> "Gemini for hydrogen", Antigravity is "anti gravity" and "anti-gravity", and writing code is "riding
> cord". The Voice Memos transcript is kept beside it as `transcript.txt`.

### 00:00:00 — Introduction: "not a frontier model"

Melvin Johnson. Hey everyone, good to be here. I'm Melvin, and I'm in post training for Gemini. So today I thought I'll take you through a little journey of how we post trained Gemini 4. And our journey begins. By people calling us not a frontier model. So here's an example. You know, people say Gemini is cooked, but GCP is cooking. For all intents and purposes, we believe DeepMind is no longer a Tier lab.

Ethan Mollick, who we respect a lot, he says. In his own nice way, pretty long gap between matches is what he calls us. And I'm here to tell you. We're not dead. We're here. And we have launched Gemini for Argon. We announced Carbon, and we launched Carbon all within the last. 28 days, so we're on a we're you know we're on a run here. And that's not it. In the process.

We actually garnered an apology from Dylan. You know, he says official apology to Google. They are absolutely cooked. They are not cooked. Ethan says, you know, one of the most significant aspects of Gemini four. Is the speed at which we're launching things? So we've gone. 236 days without having a frontier model. And we had two frontier models in 28 days. That's an excellent improvement in our speed of shipping.

And you know, people call us. Google kind of cooked, but Google is not cooked, so it's cooked. To see that sentiment, it's glad to be on the other end. It's. Also, good to be on the receiving end of the bad comments because it pushes you to do better.

### 00:02:10 — Demo video

I want to start by playing a little video of a bunch of things that Carbon has built. If we can show the video, please. So, bar there. Does that work? No. Nope. Let me see if Google can lock up this presentation. Yeah. Could also be a model for building that video.

### 00:03:22 — Gemini 4 Carbon results

So you saw great examples of. The model doing much better at 3D. Modeling assets using Blender. There's lots of games in the real world use cases, model processing, multimodal documents. But you know, it's not just. The demos, Carbon's actually number one on a bunch of real-world customer use cases. And one of the things that we're really excited about is. You know, it's not just really good on these benchmarks.

It's actually much cheaper, so on Cursor Bench. It's the number one model today, and it's 3.3 times cheaper than the second best model. On Duckbill, which is a benchmark for deep research queries. It's the best model. You know, you saw competitor models come out. Over nine x cheaper than the second best model there. And our automation bench, which is Zapier's. Benchmark again, won number one while being two times cheaper per task.

And that's not it. I mean, today.

### 00:04:28 — Gemini 4 Hydrogen

We announced a new element to our Gemini 4 series, and it's not surprise. It's hydrogen, so you know you might have seen the launch earlier today. Gemini 4 hydrogen is where we're trying to bring the Gemini 4 intelligence to everyone. It's past. It's dependable. It's launched on all surfaces, on anti gravity, on the Gemini API, in the Gemini app. And on search, and you know I have a graph that shows.

Was the A index, which many of you might be familiar with, and time on the x-axis. You can see it's one of the fastest models for that level of intelligence, and to give you a sense. Of how far you know Gemini has come. 3.8 flash on terminal bench four was about 20 percent. And hydrogen is about sixty percent. So we're three times better performing, while being three times faster.

Right. So that's no easy task, and we're you know really happy to bring that. To you, in your hands, so you can build things with it. And that completes, you know, our. Gemini 4 series. So we have Gemini 4 Carbon, a frontier model for deep frontier intelligence. Gemini for hydrogen, which is fast for everyday execution. And we'll have more elements. You know, of course, there are many elements left in the periodic table, and we have a lot of work to do to exhaust them.

But we're glad to put it out there for you all to test it and. So you all could play with it.

### 00:06:09 — Why post-training is hard

Now I think enough marketing with the models. I wanna. I was told it's a deeply technical audience, so. I want to talk a little bit about why post-training these frontier models is hard, and what goes into that. Let me start by saying, you know, AI writes about. 75 of Google's new code today, and this is up from. Less than 25 percent a few years ago. And there are hundred thousand people using anti-gravity riding cord inside Google.

Every single day. Now the complexity of the tasks that people do have also increased exponentially in the last couple of years. We started with. You know, models just completing chats, which took seconds. To writing small functions within the minutes, you can submit a PR and resolve an issue. Takes about an hour, let's say. But now people are doing days of real engineering tasks with the model. People have swarms of agents solving real open problems with the model.

We have engineers across Google using anti-gravity and our Gemini 4 models to solve tasks over multiple days. Now, how do we go about post-training? Gemini for real engineering tasks. We have to start with hard tasks, so we need really need to source hard problems for the model. Grading of these models is actually a very hard problem. So you want to grade. Like an experienced code reviewer would grade. You want to grade like an experienced engineer would grade a solution.

Last part of RL is how we train the models, and we want to dog food our models with our hundred thousand engineer community. And repeat the loop. So any failures in the dot become tasks for the next iteration of the loop. So I want to start by going into a little bit more detail of each of these sections.

### 00:07:56 — Hard tasks

So let's start with the hard tasks. Right. So you might have heard, you know, as models are getting better, lots of benchmarks are getting saturated. And it's not just the benchmarks that get saturated; our training data gets saturated too. So here is a graph. That shows for three different iterations of the Gemini 4 models. How much the share of learnable problems has gone? Let's say we had X percent of learnable problems for the first iteration.

By the time we finish and train the next one, the problems are too easy for the second one. We finished that and playing the third one. The forms are too easy for the third one. So, what's the problem with training on easy tasks? Easy tasks give you zero learning signal. Right. So you have a problem when all of your rollouts are going to be correct. There's no variance. There's no RL signal.

So you really need to focus on getting artists. And you really need to be faster at getting hard tasks, and the models are getting better, right? So how do we go about it? We first have to, you know, identify these easy tasks and prune them. So we cut these simple SwinN style tasks on the mixture that are too easy for the models. We expand into much harder, suite tasks. For example, that are multi-piley force.

We go from unit test or binary correctness. To rubric-based grading, and rubrics give you dense signal. They're not just zero one. They can be. More gradients within the within the criteria. Here are some examples of hard tasks that we train on. So, we look at multi-file repos. And we extract commits from them. From those commits, we have models automatically extract rule breaks. We don't actually necessitate unit tests being involved.

We can actually generate rubrics on the fly based on these reports. Another example, a great example of tasks. You try to teach the model to build CLI tools. From scratch, so you start with an empty folder and a specification. The specifications say you have to build this tool. It's called Grab. These are the parameters of curve. These are the plots. This is the functionality, and you let the model build the entire tool from.

And you know what the functionality for a graph is going to be, so you have a hidden. Test suite that you can evaluate the binary on. The last. Example is production code bases, so. You look at real usage of the model inside your production codebase, and extract useful tasks out of them.

### 00:10:35 — Graders

Now, let me talk a little bit about the graders. So agents, you know, they find any way. You're training them to pass the test, so they will find any way to pass the test. But if the test pass, that doesn't necessarily mean that they've solved the problem. There are examples where the agent will bypass the checker. There are examples where the agent will game the benchmark. There are examples where the agent will fake the evidence. You know. It writes the fake evidence into a temp file.

It will delete any evidence of it faking it, right? So you have to be smarter about how you judge these models, especially as they become more capable. Now, this is what I meant by grading like a reviewer. So, if you've done a code review, you have a very strict reviewer. You're going to know they're not just going to think about the correctness of the solution; they're actually going to think about the.

They're going to think about maintainability. They're going to think of many different aspects. So, what we do is we move from unit test based correctness. To rubric this, when these are generated from real comments. The rubrics also provide dense learning signal, not just zero-one signal. And we penalize any sort of solution that is looking for a workaround. Right. So here is an example of a rubric. Where the criteria is, you know, here are the edge cases that we need to pass.

This is an example of hygiene that needs to be maintained. These are constraints around verification that need to be satisfied.

### 00:12:09 — Hardening the graders

Now, it's not just about the rubrics needed for grading. We also need to be careful about the graders not being gamed. And you really need to harden the environment that the grader is in. So we think about putting the graders in an isolated sandbox. So we remove Git History and Git Remote. So the answer is don't leak. The test sets are held out. So only when the agent is done.

And submits the solution. Do we actually reveal this? We have instances where the agent will fake it and say, "Hey, I'm done." And the tests come into play, and they will look at the tests and re-submit the solution. We don't want that. We also want to be much more detailed with our scoring, so we take a full disk. And we look at the reference, and we look at multiple aspects. It's not just the correctness; we also want to look at the code quality.

We also want to look at the scope of the change that was done. And then finally, we want to penalize any sort of cheating attempt. By the agent, while being careful not to police the. So any you know cheating or hampering of the environment gets a very negative RL reward. And all of this is detected just based on the actions that the model is taking, not the thoughts. So. A good example of how we handle cheating is, you know, carbon, for instance.

Has zero percent cheating rate on terminal benchmark. Our previous models had a much higher cheating rate. And is about five x less adversarial than argon. So every generation of the model, we're trying to make it much more aligned, so it's not trying to cheat.

### 00:13:47 — Model honesty

Now, finally, I think I want to talk about model behavior a little bit. And modeling honesty, specifically. Now, agents they always want to be helpful, and sometimes they fake helpfulness. You might have seen this in your usage of the agents. So sometimes they'll claim that tests are passed. When they've obviously not passed, they'll declare done. But obviously, they're not done. They'll make edits that they'll claim to have made edits.

But they're not making those edits, or they'll invent facts and APIs and whatnot. Or they will give you a wall of text that has so many numbers that is going to be impossible for you to verify. We've gone through all of these examples. Now, here is an example of fabrication rights in Germany. Right. So, we on an internal eval started with eight percent fabrication in that hard eval.

We cut that down dramatically to about three percent for hydrogen and carbon. Is half of that is about 1.5 percent, but we're striving to get this down to zero. Like you don't want your agents fabricating anything. Right, but they try to fabricate because they want to be helpful, and when. You really have to try hard to align them to be helpful, but not by faking it. How do we reduce the fabrication? Believe it or not, you have to clean your data.

Right, so we've filled out lots of training trajectories where there's, you know, not just. Intended fabrication, but unintended fabrication. There are lots of claims that are not fully supported. They're not verified. We ground in the full projective. So if the agent says I complete the task and it has a final response. We actually look at that response and see all of the actions that the agent had taken in the trajectory to get to that final solution.

And we looked at the steps that were taken. So you really need to, when the agent says I'm done and gives you a summary. That needs to be grounded in the actions that were taken. And we want to reward honesty, so. If there's a hard problem, it's better for the agent to say, "Hey, this is my partial progress. It's a hard problem." I'm done here. This is my partial solution.

Rather than faking the last step and saying, "Hey, I solved the problem," you know, this is done.

### 00:16:07 — Shipping in weeks

Finally, shipping in weeks. So, how are we able to ship so rapidly? And the biggest reason for that is our internal team of hundred thousand plus engineers at Google. Using the model for realistic tasks, you know many of you might know Google is a mono repo. And what is a monorepo? The entire company is one codebase. Right, and I don't know how to measure this, but I think it might be one of the largest monorepos in the world.

Now that's a really complex codebase, and we have the best people in the world. Using a really complex board base to do really complex tasks. So every time we have a new candidate from post training, we actually serve that model. For our users, we run blind battles with them through multiple different candidates. We let users. You know, pick the best model that they want. We also run alleys where under the hood we're routing the routing people.

To experimental models and get signal and feedback from that. And we take all of these signals and friction back into training the next candidate. So this is a cycle that helps us, you know, rapidly iterate. Really train on hard problems, and as the models get better, the engineers are going to push the model in interesting ways. This is also why you know we've gone from releasing in weeks.

To releasing, to be releasing in quarters, to releasing in weeks. So in the three in the Gemini three era, we've had launches every two to three months. But now we've had six releases in the last sixteen weeks. Right, and we're very excited. To have you all try carbon and hydrogen. And Gemini 4, and we're excited for. For us to see what you all do with it, and we're not done. So we have a lot more elements.

To go through with that, you know. Thank you.
