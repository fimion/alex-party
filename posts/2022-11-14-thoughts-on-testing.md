---
title: Thoughts on testing
date: 2022-11-14T14:33:12.758Z
---
C﻿hris Coiyer had an [interesting post](https://chriscoyier.net/2022/11/11/the-difference-between-integration-testing-and-end-to-end-testing/) on integration vs end to end testing. I made a reply that I want to kinda dig into a little bit.

## The Testing Pyramid is Weird

I﻿ have always found the Unit, Integration, and End to End testing pyramid to be a bit... clunky? The names describe how much you are testing, which is great, but it doesn't give much perspective as to what you are actually trying to test.

I﻿ personally think testing should be thought about more as testing that an interface works as intended. An interface, in this case, is anything someone might interact with. I like to break this out into 3 categories: Developer, Consumer, and User interfaces.

#﻿# Developer Interface Tests

T﻿hese tests are mostly Unit tests for the internal code of your code base. Only developers helping make your product will really get direct benefit from these tests. You want to focus on making your developer interface tests check that functions/classes/components all work as expected for a developer who is using them. You should not test HOW the interface gets its result, only that it does get the result you are looking for.

#﻿# Consumer Interface Tests

﻿A Consumer is anyone who will be using your product as potentially a developer, or maybe an application, that is outside of the people developing it. A good example of this would be a public REST or GraphQL API that is used by outside developers. (maybe if you are a back-end developer, the consumer is your front-end team!)