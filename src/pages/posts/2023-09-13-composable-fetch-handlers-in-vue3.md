---
layout: ../../layouts/BlogPost.astro
title: Composable Fetch Handlers in Vue3
pubDate: 2023-09-13T19:17:45.763
draft: true
rssOnly: false
---
I work on a new project at my new job, I am reminded that I really need to write up my thoughts about how to write a fetch handler that gives you a reactive set of objects that will automatically track data and errors, but is also flexible enough to allow for adding in extra functionality.

### Prior Art

Now, if you want to skip to using an implementation that is pretty close to what i recommend, then take a look at [useFetch from VueUse](https://vueuse.org/core/useFetch/)  which is a fantastic way of doing exactly what this article is about. If you are already using VueUse in your project and you're happy with it, then you can stop reading here.





### … Okay… the normies are gone…

Alright adventurer, let's dig in to what I'm talking about.





So ultimately, there are 3 things we want to track when we are handling a fetch call: the returned `data`, any `errors`, and the current `status`. (we might also want to track the response headers, so we'll put that in a `meta` object)
