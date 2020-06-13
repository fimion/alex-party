---
title: Cypress, Keycloak, and Agony
excerpt: I've been fighting with an implementation of this at work for the last
  several days, and it has been a nightmare.
date: 2020-06-13T01:32:45.606Z
---
So let's start off with talking about the issues you have already run into:

* you are blocked from going to your keycloak server as it is a remote resource.
* you have enabled the option to allow you to navigate to remote resources in cypress, and it still doesn't work, because keycloak doesn't like being in an iframe
* you start getting weird errors and things randomly timing out
* your entire CI process is blocked because of this issue.

If this sounds familiar then you've likely run into this article: [Cypress.io Keycloak Integration](<https://vrockai.github.io/blog/2017/10/28/cypress-keycloak-intregration/﻿>)

This article is fantastic because it gets us 90% of the way to where we want to be.

Here are some assumptions with that implementation however:

- that you are using the auth code flow (not implicit or hybrid)
- that you want to log in and out before/after each test
- that your site will function without a login
- that you can do all of the above as fast as possible

I am currently working with a code base where that is not correct at all.

## `keycloak-js` is frustrating

I'm gonna take a little bit and go over some of the reasons why keycloak-js is the way it is. 

First, the current oidc token is stored in localStorage only when you are not on the page. On `window.onload`, it pulls the value from `localStorage`, and deletes it, storing it only in the keycloak instance. Similarly, on `window.onbeforeunload` it puts it back into `localStorage` so it'll be there when you come back.

For running an application this is fine, but in the world of testing it is a nightmare to get around. We can't easily inpect the token and then fake the `localStorage` so keycloak will like it. Similarly (in the small amount of testing I have done with this) it may also be looking at your cookies to ensure your token is good. Honestly the adapter code is all over the place, so I have a hard time figuring it out sometimes.

Since I'm also requiring the login before my application is even instantiated,If I load my homepage without having logged in, then keycloak tries to redirect me to a remote url. and then everything is angry.

## `cy.request` and cookies

As of version 3.8.3 of cypress, it seems like `cy.request` has an odd behavior in that it will forget about cookies after every test. This is why before each test you need to log in to keycloak. so, that's a get request, and a post, and a redirect, that then takes you to the page you wanted to be at. Also, in all of this, `cy.visit` will break if you are not where it thinks you are. For instance, if i go to `http://localhost/` and get redirected to `http://auth.keycloak/auth/....`, I end up either at `chrome://chromeerror/` OR `data:,` depending on if I'm headless or not.

That said, I don't think this is actually a cypress issue (it kind of is, but I don't have a good suggestion for them on how to fix it.) This goes back to keycloak being very secure about things. Which is what we want from our login server. Sadly.

## So how do we fix all of this?

We're going to track our keycloak cookies ourselves. like I said, the previous post got us 90% of the way there. So let's build off of that.