---
title: JavaScript Labels and Returning Early
date: 2021-04-02T13:00:00.000Z
excerpt: Every once in a while, you find a feature of JavaScript you never knew
  about and that has always been there. Labels are one of those odd vestigial
  bits of the language that make you go "But why?"
---
I have previously read about and experimented with labels on for loops in JavaScript and after seeing [Brendan Eich tweet about it](https://twitter.com/BrendanEich/status/1376912996748783616), I decided to experiment on if statements as well. I threw together a little [demo codepen](https://codepen.io/fimion/pen/NWddamo) and thought about why we don't use this style of syntax.

In a way, JavaScript labels are a callback to older languages and the GOTO command. Well, sort of. Traditionally, labels are used with the GOTO command to denote a place in the code to jump to. While you can still do this in C, it has fallen out of favor over the years as it is less readable and generally can be implemented with either a loop or an `if` statement.  JavaScript does not have a GOTO command, but we do have labels. And they are rarely used because typically, there is another way to write your code.

### Label Use Case

The ideal use case for a label is typically with a nested loop or conditional.

<iframe height="396" style="width: 100%;" scrolling="no" title="Using a Label in a nested for loop" src="https://codepen.io/fimion/embed/WNRpaaK?height=396&theme-id=39521&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fimion/pen/WNRpaaK'>Using a Label in a nested for loop</a> by Alex Riviere
  (<a href='https://codepen.io/fimion'>@fimion</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

In the above example, we can break out of the outer loop early by calling `break outer;` and it will immediately stop the outer loop. Brilliant! Similarly, you can do the same thing with `if` or `switch` statements, and leave those blocks early. 

You can also label just a plain block of code. This is terribly out of fashion and will only work in non strict mode. More importantly, since ES6 modules are strict mode by default, using a label on a code block will cause your code to break. Generally speaking, I don't recommend doing this.

```javascript
// You can do this.
// But you really shouldn't.
label: {
  console.log('this will run');
  break label;
  console.log('this will not');
};
```

### Returning Early

I mentioned earlier that the label pattern typically isn't seen in use because there are other ways of achieving the same code. A good example of this is to use functions to have the same outcome. This also allows the resulting code to be more testable and portable.

<iframe height="403" style="width: 100%;" scrolling="no" title="Returning early from a nested for loop" src="https://codepen.io/fimion/embed/gOgmQzQ?height=403&theme-id=39521&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fimion/pen/gOgmQzQ'>Returning early from a nested for loop</a> by Alex Riviere
  (<a href='https://codepen.io/fimion'>@fimion</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

In the above code we've broken the logic for both loops out into their own functions. The `outerLoop` function will call whatever callback we give it and the `innerLoop` function receives the value of `x` as an argument. We then call `outerLoop(innerLoop);` to kick off the whole thing. Both loops can escape early by returning before the loop is completed.

Code being broken into smaller pieces like this is why you do not see as much use of JavaScript labels. I love labels and the power they have, but I don't know that I'd want them in my code.