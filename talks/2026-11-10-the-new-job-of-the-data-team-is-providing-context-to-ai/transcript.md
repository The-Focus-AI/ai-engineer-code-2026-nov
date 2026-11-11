---
title: "The new job of the data team is providing context to AI"
speakers:
  - name: George Fraser
    affiliation: Fivetran
room: "Continental 1–3 (Workshop Room 1)"
starts_at: 2026-11-10T14:20:00-08:00
ends_at: 2026-11-10T14:45:00-08:00
format: talk
recording: 2026-11-10_1418_George-Fraser
duration: 1677.3
source: qwen3-asr-1.7b
---

> The recording starts during the MC's introduction.
>
> Transcribed locally with Qwen3-ASR 1.7B (timings per ~5 s segment), prompted with the
> speaker names of overlapping sessions. "At Composio" at 00:09:53 comes from that prompt,
> not the audio: Composio is another speaker's company. The Voice Memos transcript is kept
> beside it as `transcript.txt`.

### 00:00:00 — Introduction

Over the years of the MongoDB movement, under the leadership of its founder, the startup became a global. Enterprise value of 5.6 billion. Serving thousands of companies worldwide to automate data processing and drive. He holds a PhD in. Neurobiology from the University of Pittsburgh in a Bachelor of Science in Cognitive Science and Biology.

CMU. So the talk is going to be focusing on the new job of the data team. Is providing context to AI. So let's welcome. This talk will not be about neural style. It will be more about neural style.

I'm going to talk to you about the data team. So, five trillion sort of data teams, five trillion MDT labs. If you're in the data world, you like heard earlier this year that these merged. Move your data and transform it. And we do it for thousands of companies.

We've been doing it for over ten years. This is almost the only job I've ever had. It's the only job I've ever had as a scientist.

### 00:01:22 — Why context, why now

Worlds is in an era of rapid change, and it's an. But it is also a era of rapid change for engineers who work with. Data in any way, and for data teams in particular. AI agents are really good at writing simple queries. Charts and a lot of the activities that the data team are doing with the AIs.

But there is good news, which is that their team has a new job, which is. To connect that AI to context. So they're all about business intelligence. The business intelligence. Is yeah, we have artifacts now.

Sort of dashboards. And but this is not just about Google. Something really has changed. It's a lot of the dashboard work. That's something that I think really can be done by AIs now, and even more towards.

But those algorithms need to get correct answers, and not only do we need to build those algorithms, but we want to connect. A ton of AI to to data. And those autonomous AI agents have questions as well that they need data grounded answers to. And so we have to ask, how do we make this possible? How do we make it so that your head of sales?

When you go into their AI, it's a lot of GPT or.

### 00:02:56 — The head-of-sales question

Slack and asks you to bring best ideas for improving pipeline conversion. People love asking very open-ended questions of AI agents, and actually that's a good pattern. Let's try to see why encourage. How do we make sure that the lectures give real, high-quality answers to these kinds? Well, in the last.

### 00:03:18 — Companies already doing it

Six months, the pattern has started to emerge of how to do this well. And we've seen it in a bunch of different tech forward companies. So here are some examples. Rent. A lot of people I know they make. Corporate credit cards.

Cool. Connected to that, they have been out ahead on this area for a while. They started doing this. Last year, what they did is they made an interactive data analyst. That is connected to their data, which they they model with the EET. And they store it simply.

They made a data analyst. Stripe has done something similar. People like Gary Anlas, Comex, they call it Kai. And it's their knowledge AI agent. You know, I just realized that Kai is not.

Five seconds ago, I put that together. So Kai, similar to Ramp, it connects to their data in Stripe's data platform. Doradus was one they called Vera, which again connects. To model data, for example, actually big five ten customer five ten M D B T. They replicate their data, they model it, and then they connect AI to that model data, and it's not just.

OpenAI and Anthropic, both longtime FiveTen customers, since they set up their first data stack. They have both built in-house data agents that connect to their data platforms. And all of these, and they've written about it on their blog. I encourage you to go read about it. As a way to learn about best practices, what all these have in common?

Is that they are connecting their AIs? To the same data stack that they built for serving business intelligence. So the same data stack that has been serving humans for years, these companies. They are using as a source of truth for AI agents for questions about data. Looks kind of like this.

AI is, from this point of view, a new consumer.

### 00:05:23 — AI is a new consumer of the data stack

Of the data stack, you have all your business systems. You replicate the data into the data warehouse or data lake. And you used to connect your business intelligence tools for that data warehouse. You still do for a little while longer. And now you can hear AI.

That same data, and this turned out to work. Extremely well. One of the funny things about AIs is they are so anthropomorphic. They act a lot like people, and so the very same things that make data work. Well, for people, make data work well, or AI. You have to take the data from all the systems.

Business systems. You want to put it in one database. You do joins across systems. You want to model that data. You want to model that data in a way that is specific to your business. Modeling is fundamentally an exercise of simplification.

You're presenting a simplified view of what is probably some very messy and complicated data. That lives in the system's record. So all of the investments that you've been making. To organize your data as a human creators are the exact same ones that you want to build on. There are some new things you want to do.

AIs can traverse domains that previously were difficult for people.

### 00:06:38 — Unstructured data

Big one is unstructured data. You can actually do meaningful things with unstructured. Data with AI because their ability to speed read is so extraordinary. That they can actually go and read like a thousand transcripts. Calls of customers who meet certain characteristics and things like that.

So there's there's some new things that you need to do, but there's a lot of existing patterns that work well that you should build on.

### 00:07:04 — Don't wire AI to every system through MCP

When you want to connect AI to data, now what you should not do. Well, none of these companies that I just mentioned are doing. Is the MCP web approach? Where you connect your AI assistant via MCP connections to all of your different systems of record. This is a little counterintuitive, you might ask.

If I went next, I A I and my self-hosted data, shouldn't I connect it? That sounds like a good idea. I agree. This does not work well, and the reason it does not work well. Think about a person. If you told an analyst.

I want you to answer a question about what's happening in our business, and I want you to do it by just logging into all these different. Systems clicking around. They could do it. It would take them like a year, and they would make a lot of mistakes. It's a very error-prone process.

Trying to answer questions about data through MCP tools is kind of like that. You run into these problems. The data is very messy. In these source systems, if you do not have massive Salesforce, get the hell out of here. I am mad at you if you do not have a messy salesforce.

We have an especially messy salesforce platform. I would not claim to be the champion because that is a contest which has. So the data is very messy. The data in the data warehouse has been cleaned up and organized. According to the rules of your business, that's why we have headquarters, but it does not have to be.

This is the record. Also, the query languages are terrible. If you ask questions about data, who data and that data. Is connected to these N V servers. It's going to have to run local queries, which is.

Salesforce's dumb dialect of SQL. It's going to have to run JDBC libraries, which. Is so dumb it's not even a dialogue to the sequel. If you know JQL, I'm sorry. I know JQL because I wrote our original viewer connector long ago.

Or you know, if you connect to the Slack NLP server, all you have is the search. Terms that you type in the Slack bar. That's useful for searching through the data. Imagine. Trying to answer a data question with those query languages. And you can't even do joins across sources, right?

The data all lives in different systems. So even though it sounds like a good idea to use NLP to solve this problem of getting context for your AI. It's actually a terrible idea because it fails in practice. MCP tools are still useful. They're useful for taking action.

Or for retrieving individual records. That have just been updated. MCPs are federated, so they have no latency. So they have a role to play. They are not the way that you should gather context about the world in your business or your AI.

You should build it on a particular stack like all the companies do.

### 00:09:47 — How Fivetran does it

And this is how we do it at Fivetran. We've been doing it for a couple years. So this is a little diagram about how this actually looks. At Composio, we have several different clients that need the data. We have Slack actually.

We have a data bot in Slack, like a lot of those companies I mentioned earlier. We have cloud connected directly. So you can ask questions of Claude. Ask questions of Claude on the train on the way over here, and. The same infrastructure.

So at Fivetran, our autonomous support agents. Which will answer some of your questions. If you're a FiveTran user and you ask the right kind of question, where the the agent can be highly confident. That it knows the right answer, it will go ahead and answer your question. And the way it does that is it connects to this very same data stack, the same data stack we originally built to serve BI.

Now supports an autonomous support agent and it works great. They all connect through an MCP server because MCP is. At the bottom, a protocol that you just use for connecting external tools of any kind. There's nothing good or bad about SCP, even though I just said don't rely on SCP servers in the previous. Slides. Not actually the problem.

There. It's the tools, and they connect to our big data warehouse. Which has inside of it a giant DNN model that has been. Gradually evolved over the last ten years. That again is the same one that supports our AI tools.

### 00:11:18 — Giving the agent a map

There are a couple of problems you have to find solutions to. In order to bring in the unstructured domain. And in order to give the agent a map of the database, you do not just want to connect the agent. To the database, and then say, "Go look around and see what you find." You will not get good answers. We've tried it.

You will get better answers than you did six months ago because they are getting better at that. But in general, that is not a good approach. You have to give it some kind of map. Of the database, so the way that we recommend they solve this, there are a lot of vendors. That will sell you tools to give you some kind of context catalog to put in front of your database.

And I admire to tell you that you do not need any of them. It is a database. Metadata is a kind of data. You know where you could put that metadata about what's in your database. Also. In your database, and this is our modest proposal for solving it.

It has a website. It's standard. The world's single standard, kind of like it's agents. Md, but for databases. We. Suggests that a great way to solve this problem. The way that we solve this problem is you make a special schema in your database called agents.

And then you put it in a table called Root, which literally has a column of markdown blocks. That describe the rest of the tables in. In the agent schema, and the rest of the tables are going to be user dependent. I'm going to show you a demo here where it looks like this. But the Fivetran production instance actually has a bunch of metadata looker, so the.

The tables after the root table are. Are a representation of the lookup model because that's the best source of metadata at Fivetran right now. And this. This pattern works extremely well because agents and databases are just like this perfect combination. They have exactly the mirror image of each other's strengths and weaknesses. So agents, they are kind of crazy.

If you're used to deterministic software, interpretive open-ended questions is not really a thing that any other kind of software can do. They they can actually exhibit some kind of comprehension. Of ideas, and they can explain answers back to you in plain language. They're like the guy in Memento who has to write notes for himself. I don't know if you ever saw the movie.

Have a great movie. That's the right notes for it's kind of one of the most famous. There's lots of different Olympiad videos like that. It's not the one. There was another movie before it.

So. They just can't remember anything, and they are very non-deterministic. Databases are like the exact opposite. They only remember them. They don't remember anything else, and so they represent this perfect marriage. You can store the data about your business in there, and then you can also store a bunch of.

Local tables in a special schema, a map of the rest of the database that acts as a guide. For that interest, and you haven't even had to buy anything you didn't already have if you are a user of the minor data stack.

### 00:14:29 — One place for everything

So I'm going to show you a little demo. Oh, one last thing about infrastructure. Should we move to the slide? That structure domain is kind of new in the world of analytics. Usually, we didn't really bother.

With unstructured data, if we're just building dashboards, because dashboards can't do anything with unstructured data, but now you can because you just read it. You need a way to make that unstructured data searchable. And another thing that you do not need to buy. Is a separate database because all of the major data platforms. Are now offering built-in vector indexes, and they also work great.

And it's really convenient to have everything in one place. And again, even even if. There are other vector indexes that are slightly better. Having all of a single system, we write hybrid queries.

### 00:15:24 — Building the demo

It's really helpful, as you will see. So use the vector indexes of the database. So I'm going to give you a little demo. How we can actually put this together. And the we need a use case.

I'm not actually going to show you Fivetran's internal data, which is. All very large. It would take a long time to. Explain the onboarding of the company first. Instead, I'm going to give a demo of some data from F1.

Hopefully, there's some Apple fans in the audience. Asked questions. There we go. There's always a couple. And an F1 dataset is really nice because first of all, there's a great public data portal that has all of the F1 data. That's very detailed.

That's even things like the laundry and where your car is. So it's a size. It's like a medium structured data set. But then it also has an unstructured domain, so there's the the rules. Of F one and the glossary of all the terminology on the F one website, which we're also going to ingest to the database.

Fun fact: You can put unstructured text in simple databases. Unless you are in 1975 and you're using Oracle. Seem to think that they need to like anytime you have a file, a long string of text, you got to put it over an S3 or something. Not so. Text columns. So we're going to put that unsupervised data right in the same database, and we'll do the transfer.

So it's a nice mini dataset. But something everyone knows something. Everyone knows what cars are and what races are. So our sources are there on the left. We. We have the OpenAI API, which is all structured data.

We have the F1 website, which has all of the unstructured domain. All transcripts of all the post-meeting house conferences, and then we're going to use Vitrain. To write and run a couple of connectors that replicate all this data. So I buy I and my friend collects. Made two vectors using the last two matrices K, which is a way to write the capture portion.

A Python connector that you can then run on a Python platform. It reflects all the lessons that we've learned over the years about how to make great connectors in a nice Python API, and I recommend that you don't use it. I recommend that you just have your AI. Who said with our connector SDK skill, and it will bring you beautiful connectors to any data source you desire. And that lands all the data in BigQuery in this demo.

I use BigQuery. A bunch of source tables, and then we use DPT. To model that data, the data that comes out of the API in a little bit of a funky format. APIs are often kind of funky, and So we have to normalize the data. Some to make it easy for the agent to navigate and understand, and that's where we do our vectorization.

So we just use a regular DDT model in. The data warehouse to incrementally summarize. Structure going so that we can search it, and then we're going to use. A Gemini agent, just because it was convenient when I set this up. None of these components are really high stakes.

It's just a matter of how you put this things together. And the system prompt of that agent just says, go look at agents root, and you'll find out everything else you need to know there. So as the data in the database evolves, the agent automatically pick up those changes because it's. And then we're doing a little. All agentive systems need evals to become important benchmarks.

These are just questions that have no correct answers. They use to make sure you don't break it. How can you build it in the first place? So, a quick whirlwind tour of what these pieces look like. This is a little snippet of the actor.

It calls the APIs. It extracts the. It interprets the responses. It sends the rose into the destination. This is an example of what a deep learning model.

Looks like if you the user email is basically a SQL phrase with some little. Sort of a prangus in in ginger blocks. That tell things like how to turn this into a data pipeline. And you can see that what we're basically saying here is, I want to vectorize. The text of the this is of the F one plot.

I want to vectorize it into embeddings. And then another part of the BPT model says, please create a vector index so that I can search this thing. And then the emails look like this. They're just a bunch of questions in a Python in a simple. But if I've done code that runs in CI, that.

Have correct answers. I set it up as like a kind of options. And then one of them is correct because multiple ways people do evals, but this works well for this demonstration. And then the agent is going to write queries that look like this. So the queries.

This is a fun example of query because we're we're trying to find out. What do people say about tire problems in 2025? And like a lot of queries, it's hybrid. It has both structured and unstructured elements. A lot of the questions that people ask.

Agents ask, and they have got one predicate that's like a. A unstructured search looking for content about a topic. And that's what you see higher up there. In the vector search function, which is the big query function for me. Research and all major data platforms have this now.

And then at the bottom it says, okay, I want. Post post race transcripts. I want the class. That's the structure. That's a very common pattern.

One of the advantages. Everything in one database. It's great. This is what it looks like. Tables schemas are are reasonably large, so this is kind of a limited view of pieces. Schemas. So basically, you've got a source schema.

That's what comes out of the connectors. You've got a normalized EMA. DeepMind produces. That's the one that has. The vectorization and indexes on it. And then you have agent schema, which is just three tables in this example.

Tables joins the columns, which is basically descriptions of what's in the tables. This is the normalized tables that I described. Descriptions of what's in the columns. And how to join these things together. If you tell me those three things, it will take you a long way.

We're still experimenting with what is like the best amount of information to give. The agent, in order to make this work well, it's still kind of an open question, but it doesn't take much. And I think I spent about five hours in total building this thing. I spent about two hours building it without really looking at it. Then I gave the talk once.

And I went back and looked at the code, and I was like, "Oh man, this needs a little architecture," and I spent about three hours cleaning it up.

### 00:22:31 — Asking the agent

So, let's let's ask some questions of our friend. Today's agent here. So this is what it looks like in Gemini. This is just Google Google Gemini's basic interface. Like I said, you can do this with any.

Oops, come here. This is my little AI analyst agents. Is there conference Wi-Fi here? It's right there. On the sign to your right.

Yeah. For some reason, the query F1. Sorry, Gemini. Error messages today, but it is working. So let's say. Who is most improved driver this year? Right. Let's see what he's got.

So. You can see the thinking trace, and the first thing it does, because this is what we told it to do, it goes and looks at those thirty tables. It well looks at the three tables and that tells us about the thirty tables normalized and like. And then it's thinking about how to interpret that. Does a little reconnaissance query to understand what's in the database. That's what that was.

That was just a common thing. For it to do, it'll often do these little queries to kind of. Probe and find out what's in there, and let's say it wants to clarify the question. Let's say it's first condition. All right. Yeah, that's gonna be probably more complicated for you this time.

There's a longer query. Lots of joins in there. These look a lot like the famous human analysts, right? This happens in the big schema. Go. Is. But most improved, right?

Like that often is the worst. It's like your fastest growing. That was kind of a question of course, right? And that poor guy's gone way down. And I've got zillions more examples of questions here.

I have. Recently, so you know, I asked it like. What are the top scorers this season? And we'll go and we'll look at the actual crash data. And I asked him if the step one driver was very important. They first ever refused to answer.

Which I think is AI safety on lock, and then I would push it. Which we all know is pancreatic cancer.

### 00:26:44 — What data teams are already good at

So you can see, structured data, unstructured data. It's ultimately a very simple pattern, and as the AI models have gotten smarter. This pattern. Has worked better and better. This is a this layer connecting AI to data works better. The smarter the model, yeah, because you're really putting them in charge.

Rather than to hamstring them with some elaborate. Overengineered context assistant. My takeaway for you is that you should really think about this as a responsibility of your data team. The data team should own your context. The exact same skills that made them good at delivering analytics are going to make them good.

At delivering contents and keep use standard components to do this. Don't get locked into anyone's walled garden. Agents and databases are really. All you need, you can go a long way with that pattern. And keep keep your definitions in code, because then the agents can write code for you.
