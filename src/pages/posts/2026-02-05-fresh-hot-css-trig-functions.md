---
layout: ../../layouts/FreshHotCss.astro
title: 'Fresh Hot CSS: Trig Functions'
pubDate: 2026-02-05T05:30:25
draft: false
rssOnly: false
style: ""
---

Today's topic is Trig Functions. I feel like Trig Functions don't get a lot of love because nobody seems to know what
you would actually use them for. I don't get to go over it in the talk very much. Let's actually show a
demo of where you might want to use something like this.

<!-- break -->

### Trig Functions

The Trig functions that are now available are as follows:

- [`sin()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sin)
- [`cos()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/cos)
- [`tan()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/tan)
- [`asin()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/asin)
- [`acos()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/acos)
- [`atan()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/atan)
- [`atan2()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/atan2)


If you have ever studied Trigonometry, then these do exactly what you think they do. If you didn't, this is all 
extremely helpful for calculating angles and lengths of sides of triangles. Math stuff. 

Let's talk about where you'd use them.

### Placing things in a circle

This is the classic example that shows off being able to calculate the placement of multiple items based on their angle relative to each other.

<iframe height="300" style="width: 100%;" scrolling="no" title="CSS Wrapped 2023: Trig Functions" src="https://codepen.io/bramus/embed/YzBEXJy?default-tab=result&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/bramus/pen/YzBEXJy">
  CSS Wrapped 2023: Trig Functions</a> by Bramus (<a href="https://codepen.io/bramus">@bramus</a>)
  on <a href="https://codepen.io">CodePen</a>.
      </iframe>


### CLOCKS!!

You can now easily make a clock that will have hands that are correct

<iframe height="300" style="width: 100%;" scrolling="no" title="CSS sin() and cos() Demo 4" src="https://codepen.io/stoumann/embed/wvxOQKo?default-tab=result&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/stoumann/pen/wvxOQKo">
  CSS sin() and cos() Demo 4</a> by Mads Stoumann (<a href="https://codepen.io/stoumann">@stoumann</a>)
  on <a href="https://codepen.io">CodePen</a>.
      </iframe>


### Browser Support

These functions are well supported, and can absolutely be used, today!

<baseline-status featureId="trig-functions"></baseline-status>

### More Resources

- [Web.dev](https://web.dev/articles/css-trig-functions)
