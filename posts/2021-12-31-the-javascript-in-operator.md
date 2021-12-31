---
title: The JavaScript `in` Operator
date: 2021-12-31T13:19:24.921Z
---
I found out that the JavaScript `in` operator is more versatile than I thought while on stream a couple of weeks ago, so let's write a post about it so I can explain it for myself later.

## `for` Loops

Let's start with the place you might have seen the `in` operator before. There are 3 ways of doing `for` loops in JavaScript.

### Classic `for` Loop

<aiframe height="300" style="width: 100%;" scrolling="no" title="for ... of" src="https://codepen.io/fimion/embed/preview/VwMXvEd?default-tab=js%2Cresult&editable=true&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/fimion/pen/VwMXvEd">
  for loop</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>



In this example, we iterate over a list of things, setting the initial value of the index to 0, then incrementing it by one each time we go through the loop, until we reach the length of the array we are on. This gives us a lot of control over how we loop through things, since we control the step size. However, it's very verbose.

### `for ... of` Loop

<aiframe height="300" style="width: 100%;" scrolling="no" title="for ... of" src="https://codepen.io/fimion/embed/preview/zYEWvmw?default-tab=js%2Cresult&editable=true&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/fimion/pen/zYEWvmw">
  for ... of</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Here, we use the `of` keyword to get the value of each index available for iterating over. Less flexible, but it gets us straight to the content we probably want.

### `for ... in` Loop

<aiframe height="300" style="width: 100%;" scrolling="no" title="for ... in" src="https://codepen.io/fimion/embed/preview/rNGdOZj?default-tab=js%2Cresult&editable=true&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/fimion/pen/rNGdOZj">
  for ... in</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

The `for ... in` loop is a mixture of the last 2 examples. Rather than getting the value of an index, instead we get the index. This is less flexible than the classic for loop, but it removes some of the boilerplate.

## Okay, why?

