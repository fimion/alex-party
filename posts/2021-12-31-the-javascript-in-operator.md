---
title: The JavaScript `in` Operator
date: 2021-12-31T13:19:24.921Z
---
I found out that the JavaScript `in` operator is more versatile than I thought while on stream a couple of weeks ago, so let's write a post about it so I can explain it for myself later.

## `for ... of` and `for ... in` Loops

Let's start with the place you might have seen the `in` operator before. There are 3 ways of doing `for` loops in JavaScript.

### Classic `for` Loop

<p class="codepen" data-height="300" data-theme-id="39521" data-default-tab="js,result" data-slug-hash="VwMXvEd" data-preview="true" data-editable="true" data-user="fimion" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/fimion/pen/VwMXvEd">
  for ... of</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

