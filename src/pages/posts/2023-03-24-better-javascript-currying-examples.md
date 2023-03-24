---
layout: ../../layouts/BlogPost.astro
title: Better JavaScript Currying Examples
pubDate: 2023-03-24T14:36:53.039-04:00
draft: true
rssOnly: false
---
I'll admit I went on a bit of a rant the other day on this topic because I find the way people are taught about currying is typically with the least useful examples ever. This is in part because of the push for the functional programming paradigm in JavaScript (which until we have [Records and Tuples](https://github.com/tc39/proposal-record-tuple) will continue to be laughable, in my opinion)





## What is currying?

It's a function that returns a function. Period.

The concept is extremely straightforward to explain, but the nuance as to **when** to use this is a bit more difficult to explain. This isn't something you will have to write all the time. Which is why the basic example that gets thrown around a bunch is very… not helpful.

```js
const addThreeNumbers = (a)=>(b)=>(c)=>a+b+c;

addThreeNumbers(1)(2)(3) // 6
```

If I saw this code show up in a code review, I would not only ask for changes, but I would probably ask to have a call with the developer to make sure they were okay.

## Why is currying?

So the **why** is the bigger thing as to when you want to write a curried function.




