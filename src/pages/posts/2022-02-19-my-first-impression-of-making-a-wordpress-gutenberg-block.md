---
title: My first impression of making a Wordpress Gutenberg block
layout: ../../layouts/BlogPost.astro
pubDate: 2022-02-19T16:23:44.195Z
---
This  week I had the opportunity to make a Gutenberg block and there are a few things I learned in The process.

## `@wordpress/scripts` is your friend

I was impressed by the energy and effort put into the build process for blocks. The automatic webpack 5 config, along with all the tooling also provided was very refreshing and gave a really great developer experience. Also, it was refreshing to see a setup that correctly uses preloaded global variables. Any time you import something from an `@wordpress/packagename` path, it actually rewrites it as a mapping to the global `window.wp` variable. 

Which leads me to my next point.

## You don't need `@wordpress/scripts`

All the tools to make a Gutenberg block are available in the admin area already. You can add a new block with no build step and using vanilla JavaScript. You don't get to use jsx at all, but if you are looking for no build step, you can do that!

As I dug more into writing blocks I was surprised by how easy it was to just plop a new block in. I was imagining I would need some complex hook in the backend to format things and maybe validate stuff or what have you, but the block system is really just a front end thing. As I get further into this, I would guess that there is a way to do backend validation, and it'll be interesting to see what that looks like.

## It works with custom elements

I've been on a big custom element kick lately, and I was super happy to see that you can use custom elements super easily with Gutenberg. There is some weird things with some of the attributes and stuff, but I think it is something that can be worked around.

## You can add extra loaders on top

Since `@wordpress/scripts` has a webpack config, you can add things on top of it. I wish the experience for this was a bit better, but you can't win everything. There may be a way to add some webpack chaining to make this happen better, I'll have to do more digging.

In my case I was able to get vue 3 components to compile into custom elements, and then load in the front end and admin as well. 

## Things I want to do

- Make some helpers for updating values in a block. There is a lot of boilerplate for edit components that could be very easily made into factory functions.
- Understand what the heck `block.json` Is actually doing. It seems to control a few things, but I don't know what exactly. So I need to find more info about it.
- WHY DOES JSX COMPILE TO REACT INSIDE A VUE SFC? I had made a small experiment to try and get everything into a single file, and you can, but it shouldn't be possible, but it works. I don't know why. So more research is needed.


## Final thoughts

Gutenberg blocks are neat, and you should definitely spend a couple of days looking into them if you work with Wordpress a lot. They can do quite a bit.
