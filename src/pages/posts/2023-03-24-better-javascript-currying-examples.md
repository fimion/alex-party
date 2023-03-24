---
layout: ../../layouts/BlogPost.astro
title: Better JavaScript Currying Examples
pubDate: 2023-03-24T14:36:53.039-04:00
draft: false
rssOnly: false
---
I'll admit I went on a bit of a rant the other day on this topic because I find the way people are taught about Currying functions is typically with the least useful examples ever. This is in part because of the push for the functional programming paradigm in JavaScript (which until we have [Records and Tuples](https://github.com/tc39/proposal-record-tuple) will continue to be laughable, in my opinion) but also because [a Currying Function is a mathematical concept.](https://en.wikipedia.org/wiki/Currying)

## What is a Currying Function?

It's a function that returns a function. Period. It's named after a mathematician (Haskell Curry) but he wasn't even the first to use this way of doing things.

The concept is extremely straightforward to explain, but the nuance as to **when** to use this is a bit more difficult to explain. This isn't something you will have to write all the time. Which is why the basic example that gets thrown around a bunch is very… not helpful.

```js
const addThreeNumbers = (a)=>(b)=>(c)=>a+b+c;

addThreeNumbers(1)(2)(3) // 6
```

If I saw this code show up in a code review, I would not only ask for changes, but I would probably ask to have a call with the developer to make sure they were okay.

This example shows up because it is the same as mathematical proofs. It's there for historical reasons, but not practical reasons.

## When to Make a Currying Function?

So “when” is the bigger thing as to why you want to write a curried function. Curried functions are great when you know want to provide a common value across a function call multiple times, but it may not be a static value.

So let's make a **practical** example of a Currying Function. The example that you have likely run into before is the authenticated fetch handler. 

```js
export const createAuthFetch = (token) =>{
  return (url, options = {}) =>{
    options.headers = {
      ...(options.headers||{}), 
      'Authorization':`Bearer ${token}`
    };
    return fetch(url, options)
  }
}
```

Now you would never use this function like this (even though you could):

```js
await createAuthFetch(token)(url)
```

The more likely scenario is that you would have another file that would do something like this:

```js
import {createAuthFetch} from './create-auth-fetch.js';
import {getToken} from './auth-provider.js';

const authFetch = createAuthFetch(getToken());
export default authFetch;
```

Now anywhere in our code base that we want to fetch from our authorized api endpoint, we don't have to pass a token around.

```js
import authFetch from './auth-fetch.js'

await authFetch('/api/that/needs/authorization');
```





This is a real world example. 





Please stop teaching people to add numbers with Currying Functions as your only example. There are so many more usefule ways to show this technique!
