---
layout: ../../layouts/BlogPost.astro
title: Why I like the JSON:API format more than GraphQL
pubDate: 2023-02-17T16:53:10.758-05:00
draft: false
rssOnly: false
---
Dave Rupert saw me on stream talk about [JSON:API](https://jsonapi.org) and suggested I write a blog about it. So here we are with a clickbait title, and lots of opinions.

### What is JSON:API?

Let's start with this. JSON:API is a specification for how to format the data for your REST API. It has a standard interface, a standard way of handling filtering, sorting, paging, and relationships. It is a fantastic tool when a backend developer says “How would you like your data formatted?” and you can say “Do it like this.” and then you don't have to argue about it and can just get to work.

Here's an example of a response from the JSON:API home page:

```js
{
  "links": {
    "self": "http://example.com/articles",
    "next": "http://example.com/articles?page[offset]=2",
    "last": "http://example.com/articles?page[offset]=10"
  },
  "data": [{
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON:API paints my bikeshed!"
    },
    "relationships": {
      "author": {
        "links": {
          "self": "http://example.com/articles/1/relationships/author",
          "related": "http://example.com/articles/1/author"
        },
        "data": { "type": "people", "id": "9" }
      },
      "comments": {
        "links": {
          "self": "http://example.com/articles/1/relationships/comments",
          "related": "http://example.com/articles/1/comments"
        },
        "data": [
          { "type": "comments", "id": "5" },
          { "type": "comments", "id": "12" }
        ]
      }
    },
    "links": {
      "self": "http://example.com/articles/1"
    }
  }],
  "included": [{
    "type": "people",
    "id": "9",
    "attributes": {
      "firstName": "Dan",
      "lastName": "Gebhardt",
      "twitter": "dgeb"
    },
    "links": {
      "self": "http://example.com/people/9"
    }
  }, {
    "type": "comments",
    "id": "5",
    "attributes": {
      "body": "First!"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "2" }
      }
    },
    "links": {
      "self": "http://example.com/comments/5"
    }
  }, {
    "type": "comments",
    "id": "12",
    "attributes": {
      "body": "I like XML better"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "9" }
      }
    },
    "links": {
      "self": "http://example.com/comments/12"
    }
  }]
}
```

### Whoa, that example seems really verbose!

Yep. and I'm totally okay with that. each thing in there has a specific purpose, and it makes my heart sing each time I see something formatted this way, because I know how to find everything. Every data object has a type (for all you typescript nerds). Every object or relation has links for how to get more of a thing.

### But Alex, GraphQL-

Nope. GraphQL requires me to dig through a lot of documentation to figure out what objects are available, how they relate, and then how to write a query to get that data. I have to learn an entire query language to fetch data. With JSON:API, I can hit an endpoint and get well formatted and descriptive data immediately. JSON:API also allows for me to query for related objects in my fetch query. not only that, I don't have to know some arcane weird syntax to update things. It's a REST API.

### You're being unkind to GraphQL

Nope. Really not. I'm sure that there are places where GQL can do really well that I can't think of (maybe if you are using a graph database?) but honestly, Those tend to not be things I work on. If you like using GraphQL, great! I'm not gonna yuck your yum. But I prefer REST APIs. They just make more sense to me.

You're welcome Dave.
