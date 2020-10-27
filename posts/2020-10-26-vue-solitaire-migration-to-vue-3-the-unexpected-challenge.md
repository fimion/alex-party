---
title: Vue-Solitaire Migration to Vue 3 - The unexpected challenge
date: 2020-10-27T21:37:09.362Z
excerpt: I upgraded an app to Vue 3 and I learned some things about it.
---
I've just finished upgrading [vue-solitaire](https://vue-solitaire.netlify.app) to use Vue 3. There are 3 main things I learned in this process that I wanted to let you (dear reader) know about. 

* First, the way you add global components has changed a little. 
* Next, the way apps mount has both syntactically changed, as well as how it ends up in the DOM has changed. 
* Finally, Vue 3 has a new way of code-splitting and loading components asynchronously but throws a very unhelpful error: `Invalid VNode type: undefined`. 

### Vue Solitaire

As some background, [Vue Solitaire](https://github.com/fimion/vue-solitaire) is my pet project I made to demo a few concepts for others struggling with challenges similar to situations I've been in. Most notably it is 5 separate vue apps communicating with each other via a Vuex store. There are 4 areas (Deck, Flop, Play, and Final) that cards can appear. Each of these Areas is an individual Vue app that move cards around in Vuex modules. While this seems silly, it's a useful example that can be translated into other things. For instance, If we want a "Buy Now!" button that is a vue app and a "Cart Icon" that is also a Vue app, we can make these as separate instances on the page, but use Vuex to maintain the state of the cart that both reference. 

### Adding Global Components

In Vue 2, the syntax to add a component globally to Vue, we would write code like this:

```javascript
import Vue from 'vue';
import MyComponent from './MyComponent.vue';
import App from './App.vue';

Vue.component('my-component', MyComponent);

const myApp = new Vue(App).$mount('#app');
```

Well, In Vue 3, you no longer bind things to the global `Vue` object. Instead, we need to apply it to our Vue app instance. This will feel very familiar however.

```javascript
import { createApp } from 'vue';
import MyComponent from './MyComponent.vue';
import App from './App.vue';

const myApp = createApp(App);

myApp.component('my-component', MyComponent);

myApp.mount('#app');
```

The same thing applies to plugins, directives, and mixins. Anything you want to apply globally to a Vue application now needs to be applied to the application instance and not the global `Vue` object.

In this codebase, I have multiple applications. Rather than manually applying multiple global components to each application, the better pattern to use is to make a function that applies the component to our app instance.

```javascript
import { createApp } from 'vue';

// our Global components
import MyComponent from './MyComponent.vue';
// ... imagine 6 or 7 of these

// our applications
import PlayArea from './PlayArea.vue';
import DeckArea from './DeckArea.vue';
import FlopArea from './FlopArea.vue';
import FinalArea from './FinalArea.vue';


function addGlobalComponents(app) {
    app.component('my-component', MyComponent);
    // Imagine 6 or 7 components being added here
}

const apps = {
  '#play': PlayArea,
  '#deck': DeckArea,
  '#flop': FlopArea,
  '#final': FinalArea,
};

for(const el in apps) {
  const app = createApp(apps[el]);
  addGlobalComponents(app);
  app.mount(el);
}
```

This pattern allows us to apply components to multiple Vue app instances and also allows us to define our global components in a separate file if we would like. If you are applying a global set of components, I highly recommend this pattern.

### Mounting an App

As you likely noticed in the previous example, initializing a Vue app has changed a smidge. But there is another change as well. Previously, when you mounted a Vue app, it would replace the DOM element it was binding to. Now with Vue 3, it places the app instance inside that DOM element. This causes some slight weirdness that you can quickly fix.

###### App.vue

```html
<template>
  <div id="app">
    <h1>Hello World</h1>
    <p>This is our app!</p>
  </div>
</template>
<script>
  export default {
    name: 'App',
  };
</script>
```

###### Rendered DOM

```html
<!-- Previously in Vue 2 -->
<div id="app">
  <h1>Hello World</h1>
  <p>This is our app!</p>
</div>

<!-- That same component mounted with Vue 3 -->
<div id="app">
  <div id="app">
    <h1>Hello World</h1>
    <p>This is our app!</p>
  </div>
</div>
```

We now have an extra div wrapping things! Fortunately with Vue 3, we can have multiple root elements in our components templates. Here's how we fix this:

###### App.vue

```html
<template>
  <h1>Hello World</h1>
  <p>This is our app!</p>
</template>
<script>
  export default {
    name: 'App',
  };
</script>
```

This will now render the way we expect it to. I have not done enough exploring to find out what is needed to be able to modify the element that you have mounted to, and that is outside the scope of this post.  Maybe I'll look into it in another post.

### Code Splitting

The last major hurdle I had to overcome was the least helpful error I've run into.

```
[Vue warn]: Invalid VNode type: undefined (undefined)
```

This error message is excessively unhelpful and If I had not been aware of some changes between Vue 2 and Vue 3, I likely would have given up with this endeavor. Fortunately, I was aware of this this bit of information:

From [Async Components:](https://v3.vuejs.org/guide/migration/async-components.html#introduction)

> Now, in Vue 3, since functional components are defined as pure functions, async components definitions need to be explicitly defined by wrapping it in a new `defineAsyncComponent` helper

What does this mean for us? Let's look at how I had previously code split my solitaire game:

```javascript
const DeckArea = ()=>import("@components/DeckArea.vue");
const FlopArea = ()=>import("@components/FlopArea.vue");
const FinalArea = ()=>import("@components/FinalArea.vue");
const PlayArea = ()=>import("@components/PlayArea.vue");
```

This was the problematic code that was throwing the extremely vague error. Vue will no longer render a function that returns a promise to a component without some help due to how the underlying system works. (I've gone ahead and filed an issue [here](https://github.com/vuejs/vue-next/issues/2497) to make the message a bit more helpful.) You now need to pass this function to a helper function from vue first:

```javascript
import {defineAsyncComponent} from "vue";

const DeckApp = defineAsyncComponent(()=>import("@components/DeckArea.vue"))
const FlopApp = defineAsyncComponent(()=>import("@components/FlopArea.vue"))
const FinalApp = defineAsyncComponent(()=>import("@components/FinalArea.vue"))
const PlayApp = defineAsyncComponent(()=>import("@components/PlayArea.vue"))
```

`defineAsyncComponent` wraps our function call in an object that has some extra helpers to handle loading and error states, and once I figured this out, then everything worked exactly as I was expecting it to!

### Conclusion

Updating vue-solitaire from Vue 2 to Vue 3 surprisingly only took me a couple of hours. I had been ready to dedicate half a day or more to updating this small application, and was pleasantly surprised at how easy it was to do. There were a few more things I knew I was going to run into and quickly fixed, but these were the 3 that caught me off guard. I hope this helps someone else!