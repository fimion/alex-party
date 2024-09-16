---
layout: ../../layouts/BlogPost.astro
title: "Recent Container Query Use: Content next to navigation"
pubDate: 2024-09-16T14:33:19
draft: false
rssOnly: false
style: ""
---
At work we have a standard layout we are using where there is a nav bar on the left hand side of the screen and content on the right hand side of the screen (this gets flipped for RTL languages). The nav bar can be in an expanded or collapsed state.

Rather than trying to have multiple media queries for the content area to the right based on whether the nav bar is expanded or collapsed, we're making the right hand side content be a container. Now within that area, pages can style things with container queries based on the inline-size of the content container without having to track the current state of the sidebar.
