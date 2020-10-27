---
title: Vue-Solitaire Migration to Vue 3 - The unexpected challenge
date: 2020-10-26T14:41:36.880Z
excerpt: I upgraded an app to Vue 3 and I learned some things about it.
---
I've just finished upgrading [vue-solitaire](https://vue-solitaire.netlify.app) to use Vue 3. There are 3 main things I learned in this process that I wanted to let you (dear reader) know about. First, the way you add global components has changed a little. Next, the way apps mount has both syntactically changed, as well as how it ends up in the DOM has changed. Finally, Vue 3 has a new way of code-splitting and loading components asynchronously. 

### Vue Solitaire

As some background, [Vue Solitaire](https://github.com/fimion/vue-solitaire) is my pet project I made to demo a few concepts for others struggling with challenges similar to situations I've been in. Most notably it is 5 separate vue apps communicating with each other via a Vuex store. There are 4 areas (Deck, Flop, Play, and Final) that cards can appear. Each of these Areas is an individual Vue app that move cards around in Vuex modules. While this seems silly, it's a useful example that can be translated into other things. For instance, If we want a "Buy Now!" button that is a vue app and a "Cart Icon" that is also a Vue app, we can make these as separate instances on the page, but use Vuex to maintain the state of the cart that both reference. 

### Adding Global Components

In Vue 2, the syntax to add a component globally to Vue, we would write code like this:

```js
import Vue from 'vue';
import MyComponent from './MyComponent.vue';
import App from './App.vue';

Vue.component('my-component', MyComponent);

const myApp = new Vue(App).$mount('#app');
```

Well, In Vue 3, you no longer bind things to the global `Vue` object. Instead, we need to apply it to our Vue app instance. So now, in this codebase, the better pattern to use is to make a function that applies the component to our app instance.

```js
import { createApp } from 'vue';
import MyComponent from './MyComponent.vue';
import App from './App.vue';

function addGlobalComponent(app) {
    app.component('my-component', MyComponent);
}

const myApp = createApp(App);

addGlobalComponent(myApp);

app.mount('#app');
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

### Code Splitting