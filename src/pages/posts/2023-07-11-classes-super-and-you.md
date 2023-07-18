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

> “Why doesn't class auto-imply super?”

The answer is: **Function Signatures.**

### I Don't Autograph My Functions

Function signatures tend to be talked about more in other languages more, but the general idea is that a function signature is the name of the function, the arguments and their types, and the return type. this creates a unique identifier for the function you have written also known as its signature.

That definition is probably an over simplification, but in other languages with types, you can [overload a function/method definition](https://en.wikipedia.org/wiki/Function_overloading) by redefining it with a different signature, and it can be used multiple ways. Since JavaScript doesn't have this concept built in (and typescript won't do this either) We tend to not talk about it… Until you need to extend a class.

### Extending classes

when you extend a class, the original class will have a constructor definition. We'll use this example from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super#using_super_in_classes) as our basis:



```js
class Rectangle {
  constructor(height, width) {
    this.name = "Rectangle";
    this.height = height;
    this.width = width;
  }
  sayName() {
    console.log(`Hi, I am a ${this.name}.`);
  }
  get area() {
    return this.height * this.width;
  }
  set area(value) {
    this._area = value;
  }
}
```

Our `Rectangle` class has a constructor that takes in a width and a height. This makes sense because a rectangle can have a width that is different from its height.

So what happens when we do this?

```js
class Square extends Rectangle {
  constructor(length) {}
}
```

The JavaScript engine doesn't know how to “auto-imply” a super call. There is 1 argument. the extended class' constructor needs 2.

### Enter `super`

The fix for this is that the developer must be explicit in how the extended class is constructed. 



```js
class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}
```

Rather than trying to add some AI LLM to every JavaScript engine to try and figure out what your auto implied constructor signature is, you as the developer need to say what the call will be.





### Conclusion

Dave, Chris, you have to call super because the engine cannot guess what you are trying to do. I hope this helps.




