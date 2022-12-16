---
title: The JavaScript `in` Operator
layout: ../../layouts/BlogPost.astro
pubDate: 2021-12-31T13:19:24.921-00:00
---
I found out that the JavaScript `in` operator is more versatile than I thought while on stream a couple of weeks ago, so let's write a post about it so I can explain it to myself later.

## `for` Loops

Let's start with the place you might have seen the `in` operator before. There are 3 ways of doing `for` loops in JavaScript.

### Classic `for` Loop

<iframe height="300" style="width: 100%;" scrolling="no" title="for ... of" src="https://codepen.io/fimion/embed/preview/VwMXvEd?default-tab=js%2Cresult&editable=true&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/fimion/pen/VwMXvEd">
  for loop</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

In this example, we iterate over a list of things, setting the initial value of the index to 0, then incrementing it by one each time we go through the loop, until we reach the length of the array we are on. This gives us a lot of control over how we loop through things, since we control the step size. However, it's very verbose.

### `for ... of` Loop

<iframe height="300" style="width: 100%;" scrolling="no" title="for ... of" src="https://codepen.io/fimion/embed/preview/zYEWvmw?default-tab=js%2Cresult&editable=true&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/fimion/pen/zYEWvmw">
  for ... of</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Here, we use the `of` keyword to get the value of each index available for iterating over. Less flexible, but it gets us straight to the content we probably want.

### `for ... in` Loop

<iframe height="300" style="width: 100%;" scrolling="no" title="for ... in" src="https://codepen.io/fimion/embed/preview/rNGdOZj?default-tab=js%2Cresult&editable=true&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/fimion/pen/rNGdOZj">
  for ... in</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

The `for ... in` loop is a mixture of the last 2 examples. Rather than getting the value of an index, instead we get the index. This is less flexible than the classic for loop, but it removes some of the boilerplate.

## Okay, why?

In the previous examples we used the `in` operator with a `for` loop to get the index of an item in a list. But `in` can do more. With the `in` keyword, you can also check to see if an array has a value at that position.

### what.

Just go with me here, this will get more useful further on.

```js
const things = ["bananas", "apples", "spinach", "eggs", "milk"];

1 in things; // true
10 in things; // false
```

So we can now see if an index is defined in an array. Technically though, `in` isn't just for indexes. It's for properties.

```js
'toString' in things; // true
```

This becomes incredibly handy if you want to see if an object has a certain property as the `in` keyword will also use anything the object inherits as well.

```js
class Animal {
  constructor(){
    this.isAlive = true;
  }
}

class Cat extends Animal{
  constructor(hairLength, color){
    super();
    this.hairLength = hairLength;
    this.color = color;
  }
}

const catCat = new Cat('medium', 'gray tabby');

'isAlive' in catCat; // true
```

This behavior differs from `Object.hasOwnProperty` which doesn't look at inherited properties.

## Summary

Use the `in` keyword to check if an object has a property. If you want more information, take a look at the [MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in).
