---
title: Vue-Solitaire Migration to Vue 3 - The unexpected challenge
date: 2020-10-26T14:41:36.880Z
excerpt: I upgraded an app to Vue 3 and I learned some things about it.
---
I've just finished upgrading [vue-solitaire](https://vue-solitaire.netlify.app) to use Vue 3. There are 3 main things I learned in this process that I wanted to let you (dear reader) know about. First, the way you add global components has changed a little. Next, the way apps mount has both syntactically changed, as well as how it ends up in the DOM has changed. Finally, Vue 3 has a new way of code-splitting and loading components asynchronously. 

### Vue Solitaire

As some background, [Vue Solitaire](https://github.com/fimion/vue-solitaire) is my pet project I made to demo a few concepts for others struggling with challenges similar to situations I've been in. Most notably it is 5 separate vue apps communicating with each other via a Vuex store. There are 4 areas (Deck, Flop, Play, and Final) that cards can appear. Each of these Areas is an individual Vue App and the Vue apps move cards around by moving them around Vuex modules. While this seems silly, it's a useful exmple that can be translated into other things. For instance, If we want a "Buy Now!" button that is a vue app and a "Cart Icon" that is also a vue app, we can make these as separate instances on the page, but use Vuex to maintain the state of the cart that both reference. 

### Adding Global Components

### Mounting an App

### Code Splitting