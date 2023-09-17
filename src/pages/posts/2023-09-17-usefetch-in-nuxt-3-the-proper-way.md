---
layout: ../../layouts/BlogPost.astro
title: "useFetch in Nuxt 3: The Proper Way"
pubDate: 2023-09-17T10:33:29.688-04:00
draft: false
rssOnly: false
---
I have recently seen at least 2 people make a wrapper around `useFetch` in Nuxt 3 incorrectly by trying to call `useFetch` as though it were `fetch`. While the approach they take will usually work (in general), it will very quickly cause you to have multiple errors and weird side effects.

Generally, the example i have seen is something like this:

```js
export const useDataThing = () => {
  // grabing some globally available data via pinia, useStorage, vuex, useState, etc
  const dataThing = useGlobalDataThing();
  const dataThingId = useGlobalDataThingId();

  const isPending = ref();

  //create our own fetch handler
  async function fetchDataThing() {
    // calling a composable like it's just a function
    const { data, pending } = await useFetch(`api/dataThing/${dataThingId.value}`);
    console.log(pending.value);
    isPending.value = pending.value;
    dataThing.value = data.value;
  }
  if (!dataThing.value) {
    fetchDataThing();
  }
  return {
    dataThing,
    dataThingId,
    fetchDataThing,
    isPending,
  };
};
```

There is a whole bunch of bad errors you're gonna get from this, mostly stemming from the fact that you're not calling `useFetch` in the root of your composable function. So let's fix that.

### A Better Way

`useFetch` is a composable and should be called in essentially the context of the setup method. It provides a way to trigger fetch calls.

Let's rewrite this in a better way.

```js
export const async useDataThing = () => {
  // grabing some globally available data via pinia, useStorage, vuex, useState, etc
  const dataThing = useGlobalDataThing();
  const dataThingId = useGlobalDataThingId();

  const { 
         // Our Data result
         data,
         // if the call is pending
         pending:isPending,
         // 2 ways to trigger the fetch call, they both work the same
         refesh, execute,
         // Let's make all the other stuff available too: status, errors, etc
         ...theRest
        } = await useFetch(
    // We can pass a function as the url param so that we can get the current
    // value of dataThingId when fetch is called.
    ()=>`api/dataThing/${dataThingId.value}`,
    {
      // Don't call fetch immediately. Wait for us to trigger it.
      immediate:false,
      // Create a key for caching/correct storage
      key: "getDataThingById"
    }
  );

  //create our own fetch handler
  async function fetchDataThing(...args) {
    await refresh(...args);
    dataThing.value = data.value;
  }
  if (!dataThing.value) {
    fetchDataThing();
  }
  return {
    dataThing,
    dataThingId,
    fetchDataThing,
    isPending,
    ...theRest
  };
};
```

Doing it this way will Make it way more consistent for you. You can now fetch a different piece of data by doing:



```js
const {dataThing, dataThingId, fetchDataThing} = await useDataThing();

dataThingId.value = 10;
await fetchDataThing();

console.log(datathing.value); // will have the updated values.


```

Hopefully this will save others with a lot of pain.
