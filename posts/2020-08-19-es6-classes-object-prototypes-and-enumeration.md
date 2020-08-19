---
title: ES6 Classes, Object Prototypes, and Enumeration
excerpt: ES6 classes have been around for a little now, so let's talk about a
  key difference between using them and using a more traditional object
  prototype extending method of creating JavaScript classes.
date: 2020-08-19T00:04:41.323Z
---
At work the other day i ran into a bit of code I was trying to test that relied on [@google/markerclustererplus](https://github.com/googlemaps/v3-utility-library/tree/master/packages/markerclustererplus) and google maps. Google has released [@googlemaps/jest-mocks](https://github.com/googlemaps/v3-utility-library/tree/master/packages/jest-mocks) which helps some with the problems i was running into, but they do not appear to be using their own mocks library to test markerclustererplus.

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