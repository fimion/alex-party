---
title: JavaScript Labels and Returning Early
date: 2021-04-02T13:00:00.000Z
excerpt: Every once in a while, you find a feature of JavaScript you never knew
  about and that has always been there. Labels are one of those odd vestigial
  bits of the language that make you go "But why?"
---
I have previously read about and experimented with labels on for loops in JavaScript and after seeing [Brendan Eich tweet about it](https://twitter.com/BrendanEich/status/1376912996748783616), I decided to experiment on if statements as well. I threw together a little [demo codepen](https://codepen.io/fimion/pen/NWddamo) and thought about why we don't use this style of syntax.

In a way, JavaScript labels are a callback to older languages and the GOTO command. Well, sort of. Traditionally, labels are used with the GOTO command to denote a place in the code to jump to. While you can still do this in C, it has fallen out of favor over the years as it is less readable and generally can be implemented with either a loop or an `if` statement.  JavaScript does not have a GOTO command, but we do have labels. And they are rarely used because typically, there is another way to write your code.

The ideal use case for a label is typically with a nested loop or conditional.


<iframe height="396" style="width: 100%;" scrolling="no" title="Using a Label in a nested for loop" src="https://codepen.io/fimion/embed/WNRpaaK?height=396&theme-id=39521&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fimion/pen/WNRpaaK'>Using a Label in a nested for loop</a> by Alex Riviere
  (<a href='https://codepen.io/fimion'>@fimion</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
