---
layout: ../../layouts/BlogPost.astro
title: Why I Find LLMs Frustrating
pubDate: 2024-01-28T16:38:21-05:00
draft: false
rssOnly: false
style: ""
---
LLMs are a great tool if they are used responsibly. However when you blindly copy and paste the results, it will make your life hell.

### Don't Trust The AI

We're currently having to rewrite large portions of our code at work because of a pattern introduced by an LLM that was 100% wrong. It's not some small part of the codebase either. It's the data layer.  In no way is this code close to being good or correct.

Now this being said, the code in question is misusing the `useFetch` composable in Nuxt 3. I'll be honest, I find `useFetch` to be very backwards in how it works. Essentially, you declare all your dependencies up front, and then it can automatically update based on reactive values. I know why they went this way, but it's confusing as heck. Add on top of this an automatic caching mechanism you can't turn off, and you're gonna have headaches.

But when I discovered that the bad code generated is from ChatGPT, I was furious. You cannot blindly accept what an LLM spits out. LLMs spit out something that **approximates what a reasonable response would look like.** It does not, cannot, and will not attempt to fact check itself, and even when you attempt to correct it, your results will only be technically correct on a good day. So when you copy and paste the first code example you are given, and then copy and paste it all over the code base…. The result isn't great.

### On The Other Hand…

I have dysgraphia. It's like dyslexia, but for writing words and communicating ideas. It gets in the way at work very often. I'm regularly having to write issues and communicate technical stuff to multiple other people in a way that isn't just [sci-fi technobabble](https://www.youtube.com/watch?v=RXJKdh1KZ0w).  I fall short of this frequently. My brain goes faster than my fingers can write (on paper, typing, or speaking sometimes) and I will skip 8 steps when I really need to slow down and connect the dots.

I was talking to my sister (who specializes in education and communication) after a particularly rough patch, and was explaining all of these woes, my sister just looked at me and said,

> “Alex, you know that's what ChatGPT is good at…”

She was right.

I needed something that can take my weird jargon and break it out into a more usable format. ChatGPT is great at taking text written and rewriting it into another tone or format.

**So, I caved.**

I made a little ChatGPT prompt that understands what technology we're using, I told it to NOT give code examples (I do not have time to correct that nonsense), and I told it to format it in markdown as a github issue with steps to do. I can then ***edit*** the output as needed to correct its mistakes. It gives me the needed framework to make communication with my team more successful.

It's been a mixed success. It's fixed a lot of the pain points we were having. It's saved me time. It helps me get around the thing my brain cannot do.

### A Tale of Two AIs

I cannot say that I fully endorse using LLMs for everyone. You cannot tell ChatGPT to write your essay homework and expect it to be correct. But, maybe it can help you reword that sentence you're messing with to make it be better. Maybe if you struggle communicating your thoughts, it can help you put them out in a useful way.

While I'm not always great at communicating, I don't always need help. Sometimes I can word vomit an entire page long thing about a topic that I have a mild amount of experience with and hopefully help others without any assitance.

**Like this.**
