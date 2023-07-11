---
layout: ../../layouts/BlogPost.astro
title: Classes, Super, and You
pubDate: 2023-07-10T19:11:09.359-04:00
draft: true
rssOnly: false
---
This week [Chris and Dave mentioned](https://shoptalkshow.com/573/#t=30:21) that they don't get why you have to call `super` when you're in a class. 

### Let's learn you a thing

So first let's just cover what I'm gonna be talking about here. We're talking about the [`super`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) keyword that can be used in JS classes. This keyword is most commonly used in the constructor of a class, and Dave asks: 

> “Why doesn't `class` auto-imply `super`?”

The answer is: Function Signatures.


