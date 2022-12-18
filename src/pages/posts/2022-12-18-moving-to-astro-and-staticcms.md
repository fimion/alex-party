---
layout: ../../layouts/BlogPost.astro
title: Moving to Astro and StaticCMS
pubDate: 2022-12-17T22:05:23.859-05:00
draft: false
---
Hey Y'all,





So I spent this past thursday feverishly working on moving my blog from Gridsome and Netlify CMS over to [Astro](https://astro.build/) and [StaticCMS](https://staticjscms.netlify.app/)  and let me tell you what: It has been extremely rewarding.





## Gridsome and Netlify-CMS are Dead, Long Live Astro and StaticCMS 





I am not one to try and constantly change out how things work. I try to find a system I like and stick with it (mostly out of laziness). At work lately we've been experimenting with some other systems outside of my normal routine, and Astro has been a big hit with both people at work, and many other people I know. I converted my (extremely simple) blog from gridsome over to astro in a couple of hours. It was really impressive.





Now, there has been a small amount of movement over the last 2 years at the gridsome project, and I hope they will eventually get things working in vue 3, but honestly, I'm tired of waiting. I also gave nuxt v3 a shot, and…. well… rss support was non existent, everything fel like it was in a state of “we will do that eventually” and I also feel like the end result SSG was a lot bigger than i wanted it to be (javascript wise).  





Astro seemed like a good compromise by allowing me to copy over my styles and vue components and vue pages, and what I found was that it is so much better than a compromise. It's enjoyable. It's delightful. I was dubious at first about the `.astro` components needed to be used as pages and how they have serverside javascript in… frontmatter tags? But when I started using them, it just clicked. It was so easy.





I also had been using netlify-cms as my backend and apparently the 2 people who had been maintaining it at netlify [are no longer working there](https://github.com/netlify/netlify-cms/discussions/6503) which really kinda kills it. There have been a lot of small bugs here and there for a while, and knowing that no one is going to fix them is frustrating.





However, StaticCMS is a fork that has been made, and HOPEFULLY, it will be maintained for a while. I'm using it currently. It also has some new and different bugs, but I am sure those will get ironed out.

## Alex.Party Going Forward

All of that being said I am super looking forward to being able to add some features more easily to this here ding dang site.

Y'all be good.




