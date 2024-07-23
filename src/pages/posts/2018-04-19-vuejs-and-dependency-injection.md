---
layout: ../../layouts/BlogPost.astro
title: "VueJS and Dependency Injection"
pubDate: 2018-04-19T00:00:00.000Z
draft: false
rssOnly: true
style: ""
---

***(This post was originally published on CodePen, but I'm putting it here. Enjoy!)***

I was reading the recently updated [Vue docs](https://vuejs.org/v2/guide/components-registration.html) and saw a bit about [Dependency Injection](https://vuejs.org/v2/guide/components-edge-cases.html#Dependency-Injection), `provide`, and `inject`. I hadn't ever noticed these features before. The docs give an example of utilizing this for google maps, but don't really give examples of it otherwise. I felt I should experiment with it some.

First off, what are `provide` and `inject`? `provide` is an API in Vue that lets you specify values that'll get passed down into components nested within this top level component. `inject` is the API for getting the values in a nested component. It's a way to not have to pass `props` to every component or go looking for attributes on `$parent`. The downside to `provide` is that it isn't reactive. Here's a simple example:

<iframe height="300" style="width: 100%;" scrolling="no" title="VueJs - Provide and Inject - Dependency Injection - No Update" src="https://codepen.io/fimion/embed/mLymma?default-tab=result&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/fimion/pen/mLymma">
  VueJs - Provide and Inject - Dependency Injection - No Update</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

In this pen you can see, that while the `app` instance can change its `thing` value, the nested component doesn't receive those updates.

Well, this feature seems less useful, right? Well... Sort of... Let's see if we can use `provide` to update a nested value later...

<iframe height="300" style="width: 100%;" scrolling="no" title="VueJs - Provide and Inject - Dependency Injection - Promise" src="https://codepen.io/fimion/embed/wjBdqw?default-tab=result&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/fimion/pen/wjBdqw">
  VueJs - Provide and Inject - Dependency Injection - Promise</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

In this example, I've made `provide` pass a `Promise` that is resolved by a Vue event. That event is triggered when you push the update button at which point it resolves the `Promise` and passes the value of `thing` to the nested component. This isn't very useful in this fashion, but let's say you have a `fetch` statement that should resolve and you want your nested components to change from their loading state. This would be a way to do that.

While this is a neat trick, you probably want to end up using a state management library, like vuex, to handle situations like this however, and these keywords are really meant to be used sparingly.