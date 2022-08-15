---
title: The Tooltip Pattern and Vue
date: 2022-08-15T17:49:12.413Z
---
I recently found myself helping someone who wanted to make a tooltip component in Vue, and I found myself needing to explain `scoped-slots`, `v-on=`, `v-bind=`, `$attrs` and `$listeners`. They lamented that this wasn't really written out anywhere, and I agree that this isn't really covered very well in the Vue docs. I'm aiming to cover how to do this for both Vue 2 and 3 in this article.

### A Tooltip Component

