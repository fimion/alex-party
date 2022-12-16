---
title: Vue 2 to Vue 3 - 8 months on
layout: ../../layouts/BlogPost.astro
pubDate: 2021-05-05T21:31:45.094-00:00
excerpt: Vue 3 has been out for almost 8 months now. Adoption is slow. This is
  feeling a little like another major version bump I've lived through. Is Vue
  the new python?
---
Vue 3 has been out for almost 8 months now. Adoption is slow. This is feeling a little like another major version bump I've lived through. Is Vue the new Python?

When I started developing this go around, I was getting into Python and I was confused about Python 2 vs Python 3 and what I should be using. This was back in 2015, and the support for Python 3 was very low. Similarly, Vue 3 has been released for 8 months now and it is still considered the `@next` version. Articles and talks all point to using Vue 3, but to a new user, everything still points to Vue 2. This creates confusion and bad messaging.

Recently, [Vue.js announced that version 3.1 would be a migration build](https://twitter.com/vuejs/status/1388144585600274433) to help people move from version 2 to version 3. Realistically, the move from version 2 to 3 will take more than just a migration build. The ecosystem has not really caught up, though [several](https://twitter.com/Atinux/status/1365324549215186951) [major](https://twitter.com/vuetifyjs/status/1387437816813080581) [players](https://twitter.com/quasarframework/status/1389523264482029573) are close to having or already have Vue 3 compatible versions.

As we move closer and closer to a full year of Vue 3 having been released, I worry that we are starting to veer into the quagmire the Python community experienced when they released Python 3. It took them [14 years to sunset Python 2](https://www.python.org/doc/sunset-python-2/), and it is still being used by many operating systems [all the while having a tool that will help you move from Python 2 to 3](https://docs.python.org/3/library/2to3.html) (it still couldn't fix all the issues). When I was learning Python in 2015, Python 2 was still the main version being used primarily and it took another 3 years before Python 3 was the majority version.

Learning Python, I was constantly confused as to why the example I was trying to use wasn't working. Either I would be in a Python 2 tutorial and a Python 3 interpreter or visa-versa. The older tutorials wouldn't mention Python 3 as they were not updated, and the new tutorials were not good about explaining that you needed to make sure you were using the right version.

I love Vue (much as I still love Python) but we as a community need to recognize that the current messaging needs to not be "NEW COOL SHINY VUE 3" but we need to focus on "Here's how you can move from 2 to 3". The Python ecosystem spun their wheels for years because there was not a good path to move up a major version. If we as a community do not focus on helping people move from Vue 2 to Vue 3 now, then we will spend years having to support both.
