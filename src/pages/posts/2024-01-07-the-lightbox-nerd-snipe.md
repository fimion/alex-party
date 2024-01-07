---
layout: ../../layouts/BlogPost.astro
title: The LightBox Nerd Snipe
pubDate: 2024-01-07T17:20:03
draft: false
rssOnly: false
---
I've been [nerd sniped](https://xkcd.com/356/).

A few weeks ago, Raymond Camden posted about [An Image Dialog Web Component](https://www.raymondcamden.com/2023/12/13/an-image-dialog-web-component) and I read that article, added some discussion about how you'd style it, then promptly stopped thinking about it… ***consciously***. I think it's been floating around in the back of my brain because another colleague recently asked what [lightbox](https://lokeshdhakar.com/projects/lightbox2/) scripts people were using with astro and other SSGs. My immediate thought was “Well, that should be a web component…” completely forgetting that Raymond made a post about it nearly a month prior.

Anyway, I made my own version.





<iframe height="300" style="width: 100%;" scrolling="no" title="light-box" src="https://codepen.io/fimion/embed/GReZMMx?default-tab=html%2Cresult&theme-id=39521" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">

  See the Pen <a href="https://codepen.io/fimion/pen/GReZMMx">

  light-box</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)

  on <a href="https://codepen.io">CodePen</a>.

</iframe>





This version is a bit more forgiving than Raymond's. It looks for any link with an image inside of it. Which makes it easier to use it with a list, or whatever nested structure you want. It also allows for multiple images and then will give you previous and next buttons based on what is there, but will limit itself to the contents of the current light-box.





Anyway, You're welcome. Go use this for good. 

Or chaos.

Have fun.
