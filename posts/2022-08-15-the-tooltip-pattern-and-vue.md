---
title: The Tooltip Pattern and Vue
date: 2022-08-15T17:49:12.413Z
---
I recently found myself helping someone who wanted to make a tooltip component in Vue, and I found myself needing to explain `scoped-slots`, `v-on=`, `v-bind=`, `$attrs` and `$listeners`. They lamented that this wasn't really written out anywhere, and I agree that this isn't really covered very well in the Vue docs. I'm aiming to cover how to do this for both Vue 2 and 3 in this article.

### A Tooltip Component

Now I want to state this here, before we begin:

<div style="font-size: 3em">

***this article does not cover how to make a fully accessible tooltip.***

</div>

There are [many](https://sarahmhigley.com/writing/tooltips-in-wcag-21/) [other](https://dequeuniversity.com/library/aria/tooltip) [resources](https://inclusive-components.design/tooltips-toggletips/) [about](https://www.sarasoueidan.com/blog/accessible-tooltips/) [this](https://www.accessibility-developer-guide.com/examples/widgets/tooltips/). I am not an expert on that topic. If you want to make a tooltip component for production, you should 100% look at the resources I've provided on good approaches.

This post aims to cover certain patterns that will make your life easier trying to do this in Vue. We're gonna dig deep into some advanced techniques to do this, but it will make your life better for knowing about them in Vue.

