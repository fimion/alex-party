---
layout: ../../layouts/BlogPost.astro
title: "My Recent Container Query Use: Pagination"
pubDate: 2024-05-27T06:08:44
draft: true
rssOnly: false
style: ""
---
I recently read the post [We’ve Got Container Queries Now, But Are We Actually Using Them?](https://frontendmasters.com/blog/weve-got-container-queries-now-but-are-we-actually-using-them/) over at Frontend Masters Boost, and I realized that it would probably be helpful for me to document real world uses for container queries.

Today's example: A Pagination Component.

We recently rewrote pagination at work, and I decided  this is an excellent use for container queries. The pagination component has 2 modes: “Big” mode and “Little” mode which really only care about how much horizontal space they have. In most applications this can be done with media queries as your pagination is a top level thing, but we have a lot of content that gets paginated inside of modals, which may or may not take up the full screen.

Our “Big” mode is when you have multiple page links (think like 10+) and you want to have the pattern 
