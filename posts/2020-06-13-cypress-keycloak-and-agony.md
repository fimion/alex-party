---
title: 'Cypress, Keycloak, and Agony'
excerpt: >-
  I've been fighting with an implementation of this at work for the last several
  days, and it has been a nightmare.
date: 2020-06-13T01:32:45.606Z
---
So let's start off with talking about the issues you have already run into:

* you are blocked from going to your keycloak server as it is a remote resource.
* you enable the option to allow you to navigate to remote resources in cypress, and it still doesn't work, because keycloak doesn't like being in an iframe
* you start getting weird errors and things randomly timing out
* your entire CI process is blocked because of this issue.

If this sounds familiar then you've likely run into this article: [Cypress.io Keycloak Integration](<https://vrockai.github.io/blog/2017/10/28/cypress-keycloak-intregration/﻿>)
