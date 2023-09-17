---
layout: ../../layouts/BlogPost.astro
title: "useFetch in Next 3: The Proper Way"
pubDate: 2023-09-17T09:32:17.740
draft: true
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
    // calling a compoasble like it's just a function
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
    fetchDatathing,
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
         
         refesh,
        } = await useFetch(
    // We can pass a function ass the url param so that we can get the current
    // value of dataThingId when fetch is called.
    ()=>`api/dataThing/${dataThingId.value}`,
    {
      // Don't call fetch immediately. Wait for us to trigger it.
      immediate:false,
    }
  );

  //create our own fetch handler
  async function fetchDataThing() {    
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
    fetchDatathing,
    isPending,
  };
};
```




