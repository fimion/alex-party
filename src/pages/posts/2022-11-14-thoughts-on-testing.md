---
layout: ../../layouts/BlogPost.astro
title: Thoughts on testing
pubDate: 2022-11-14T14:33:12.758-00:00
draft: false
---
Chris Coiyer had an [interesting post](https://chriscoyier.net/2022/11/11/the-difference-between-integration-testing-and-end-to-end-testing/) on integration vs end to end testing. I made a reply that I want to kinda dig into a little bit.

## The Testing Pyramid is Weird

I have always found the Unit, Integration, and End to End testing pyramid to be a bit... clunky? The names describe how much you are testing, which is great, but it doesn't give much perspective as to what you are actually trying to test.

I personally think testing should be thought about more as testing that an interface works as intended. An interface, in this case, is anything someone might interact with. I like to break this out into 3 categories: Developer, Consumer, and User interfaces.

## Developer Interface Tests

These tests are mostly Unit tests for the internal code of your code base. Only developers helping make your product will really get direct benefit from these tests. You want to focus on making your developer interface tests check that functions/classes/components all work as expected for a developer who is using them. You should not test HOW the interface gets its result, only that it does get the result you are looking for.

## Consumer Interface Tests

A Consumer is anyone who will be using your product as potentially a developer, or maybe an application, that is outside of the people developing it. A good example of this would be a public REST or GraphQL API that is used by outside developers. (maybe if you are a back-end developer, the consumer is your front-end team!) It can also be someone who is using your published library. This is still in a way a technical interface test. This is where you get more integration tests as well as unit tests depending on the situation. If you say your REST API will return a JSON object, gosh darn, make sure it does!

## User Interface Tests

User tests are often thought of as being only E2E tests, but I disagree. A User test is testing how a user (generally non technical, but sometimes not depending on what you make) will interact with a thing. E2E tests are very helpful here. but also, if you can atomically do unit tests on an interface, do it! same for integration tests. if you click a button and you want to make sure it displays data from an API, maybe you don't need the full app to check that functionality. that can be an integration test! User tests are a touch more fluid in my mind than most people make them out to be. 

## That's enough

Hopefully this might help you think about how you approach your tests and maybe next time you don't know how to write a test for a thing, you'll ask yourself "Who am I writing this test for?"
