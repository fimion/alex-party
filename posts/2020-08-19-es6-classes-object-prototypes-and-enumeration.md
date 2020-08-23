---
title: ES6 Classes, Object Prototypes, and Enumeration
excerpt: ES6 classes have been around for a little while now, so let's talk
  about a key difference between using them and using a more traditional object
  prototype extending method of creating JavaScript classes.
date: 2020-08-19T00:04:41.323Z
---
At work the other day I ran into a bit of code I was trying to test that relied on [@google/markerclustererplus](https://github.com/googlemaps/v3-utility-library/tree/master/packages/markerclustererplus) and google maps. Google has released [@googlemaps/jest-mocks](https://github.com/googlemaps/v3-utility-library/tree/master/packages/jest-mocks) which helps some with the problems I was running into, but they do not appear to be using their own mocks library to test markerclustererplus.

## The Issue

The specific lines of code I was getting hung up on were the following lines:

### From [overlay-view-safe.ts](https://github.com/googlemaps/v3-utility-library/blob/c6b74da7eb6748b404c0174e35d217d973560b09/packages/markerclustererplus/src/overlay-view-safe.ts#L28-L33)

```typescript
function extend(type1: any, type2: any): void {
  // eslint-disable-next-line prefer-const
  for (let property in type2.prototype) {
    type1.prototype[property] = type2.prototype[property];
  }
}
```

The error I was encountering was that it couldn't find method that I knew was mocked out. This is where I discovered a difference between using ES6 classes and an binding to the Object prototype. ES6 Classes do not allow their public properties on their prototype be enumerated by default.

## WAT

So let me back up and explain a couple of things first. `Object.defineProperty` allows you to define new properties on an object. When doing this, you can define a few things about the new property: `writable`, `configurable`, and `enumerable`.

```js
const o = {};

Object.defineProperty(o, 'a', {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true
});

console.log(o.a) // prints: 1
```

`writable` is whether the value can be reassigned or not. `configurable` is whether you can redefine things about the property. `enumerable` is whether or not you can loop over it or not. (This is an oversimplification and you should definitely [read more about this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).)

When you define an ES6 class using the `class` keyword, any method you define for the class is defined on its prototype and the `enumerable` property is set to `false`. This is different than just simply adding a new method or property to the prototype, where `enumerable` is set to `true`

## Examples

So what does this mean and how does this relate to my problem? Well, let's talk about some examples of this. 

If I use the older style syntax for creating a new Class called `MyType` by adding methods to the prototype, then we have this lovely syntax here:

```javascript
function MyType(){
  // Do constructor stuff...
  return this;
}

MyType.prototype.myMethod = function(){
  // Do some stuff...
};

for( let key in MyType.prototype ){
  console.log(key);
}
// prints 'myMethod'

console.log(MyType.prototype.myMethod) // [Function]

```
This is expected and absolutely what we want in the case of what `MarkerClustererPlus` is doing. We want to iterate over the keys of the prototype and rebind them.

Let's look at making the same thing but with ES6 Class syntax:

```javascript
class MyType{
    constructor(){
        // Do constructor stuff...
    }

    myMethod(){
        // Do some stuff...
    }
}

for( let key in MyType.prototype ){
  console.log(key);
}
// Nothing happens

console.log(MyType.prototype.myMethod) // [Function: myMethod]
```
So with this example, even though we have `myMethod` on the prototype, it isn't accessible via enumeration.

So looking back at our original code we were trying to debug:

```typescript
function extend(type1: any, type2: any): void {
  // eslint-disable-next-line prefer-const
  for (let property in type2.prototype) {
    type1.prototype[property] = type2.prototype[property];
  }
}
```


The problem I was having was that code being used to add the 2 methods that this library needs expects the prototype to be enumerable. However, I had made the mistake in adding a Mock class using ES6 Class syntax. the methods were not found, and it took me a bit to figure out why that was happening.

So I rewrote our mock to use the classic prototype binding style, and the tests passed.

All of this is to say, JavaScript is weird sometimes.
