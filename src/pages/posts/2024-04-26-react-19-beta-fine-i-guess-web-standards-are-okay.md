---
layout: ../../layouts/BlogPost.astro
title: "React 19 Beta: Fine I Guess Web Standards Are Okay"
pubDate: 2024-04-25T21:02:43
draft: false
rssOnly: false
style: ""
---
This post is gonna be salty, but after years and years of teaching developers to add click handlers to divs, add inputs with no labels, and generally insisting that they know better than you, react has released their [version 19 beta](https://react.dev/blog/2024/04/25/react-19) and it includes support for web components and form actions. 

React has had the ability to add support for custom elements for LITERALLY YEARS, as there has been a separate experimental branch that was kept up to date and ready to be merged, but never was. So 6 YEARS after custom elements are generally available in every modern browser the react team has decided to BLESS us with the ability to use a native browser feature. After years and years of damage to the ecosystem, and now that pretty much every library that wants to make something, makes things react first, they throw an olive branch to say “Alright peasants, we will support your silly little elements.”

Similarly, after years and years of saying “Bind a value to every input and don't worry about using forms” SUDDENLY, it's now going to be best practice to use forms. How many projects will never implement this? How many countless hours have people spent making pointless click handlers and extra event listeners so that they could replicate a form's functionality,or the react team to say “Ok, yeah, maybe this web standard is a good idea.”

The damage from React has already been done, and no amount of “Oh look at this thing we can do” will fix it.
