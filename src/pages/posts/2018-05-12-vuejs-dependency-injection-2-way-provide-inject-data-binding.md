---
layout: ../../layouts/BlogPost.astro
title: "Vuejs Dependency Injection - 2 Way Provide/Inject Data Binding"
pubDate: 2018-05-12T00:00:00.000Z
draft: false
rssOnly: true
style: ""
---

***(This post was originally published on CodePen, but I'm putting it here. Enjoy!)***

This is a follow up post to [my previous post about Vuejs and Dependency Injection](/posts/2018-04-19-vuejs-and-dependency-injection)

In my previous post, I described a couple of ways to use `provide` and `inject` in Vue components. In this post I'm going to cover how to use `provide`/`inject` reactively. This method is not recommended, and we will go over some pros and cons of this method.

## Demo

First, let's make a property `thing` in a parent component have 2 way data binding to a nested child using `provide` and `inject`

<iframe height="300" style="width: 100%;" scrolling="no" title="VueJs - Provide and Inject - Dependency Injection - Getter and Setter" src="https://codepen.io/fimion/embed/BxxpxZ?default-tab=result&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/fimion/pen/BxxpxZ">
  VueJs - Provide and Inject - Dependency Injection - Getter and Setter</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Explanation

In the parent component we have a property called `thing`. Our `methods` and `provide` sections look like this:

```js
export default {
// ...
  methods: {
    getThing: function() {
      return this.thing;
    },
    setThing: function(data) {
      this.thing = data;
    },
  },
  provide: function() {
    return {
        getThing:this.getThing,
        setThing:this.setThing
    }
  },
// ...
}
```

When you type into either of the 2 text boxes in the above example, it updates. This is what we want.

In this example, our parent component is providing 2 functions to it's children. Because of the way that Javascript scoping works, when these functions are used, they will always refer to the values in the parent component.

To use this in our nested component, we need to make a computed property. Doing this, Vue will update the values on changes. Our nested components `computed` and `inject` sections are as follows:

```js
export default {
// ...
  computed:{
    thing:{
      get:function(){
        return this.getThing()
      },
      set:function(d){
        this.setThing(d)
      },
    }
  },
  inject: ["getThing","setThing"],
// ...
}
```
In our `computed` section, all we are doing is making calls to our injected functions.

If you attempt to directly bind the injected values to `get` and `set` this will only result in `thing` showing up as an object, and not as a computed value.

## Pros and Cons

There are some good and bad trade offs about this code pattern.

### Pros

- allows you to share state in all children components
- will update when you change the value of the parent
- doesn't require a full state management solution like vuex
- good for a component library where you need to keep things synced between children

### Cons
- if you allow children to set the value of the parent, you can cause some unexpected issues if things go out of order
- is not good practice to rely on injected values to be there. It is a better pattern to be explicit about what is available to and needed by a component through props.
- not recommended for most applications if you need to handle a lot of state based changes.

## Conclusion

`provide` and `inject` can be used for two way data binding, but it is not recommended for every day projects. However, there may come a time when you realize that you need this, and hopefully you will find this information useful.

***Edit:*** Thanks to [The official Vuejs Podcast](https://news.vuejs.org/issues/94) for the shout out. Watch my adventures as I try to make a blog over at [Alex.party](https://alex.party) or follow me on twitter: [@fimion](https://twitter.com/fimion)