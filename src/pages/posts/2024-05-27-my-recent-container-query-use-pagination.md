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

Our “Big” mode is when you have multiple page links (think like 10+) and you want to have the pattern display each page link. We use a list of links and also need a “previous” and “next” button at the end. The “Little” mode is what you might think of as “mobile mode" where rather than a list of links, we use a form that has a drop down with the page options. This isn't just for mobile but can also be used for small paginated lists.

## CSS Example

```css
.pagination-container {
  /* create a pagination container based on the inline size*/
  container: pagination / inline-size;
  /* apply some good styling */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1ch;
  font-size: 1.4rem;
  border: 2px solid hotpink;
}

.page-links {
  /* hide "Big" mode by default */
  display: none;
  list-style: none;
  gap: 1ch;
  margin: 0;
  padding: 0;

  /* when it is wider than 30ch, display it*/
  @container pagination (min-width: 30ch) {
    display: flex;
  }
}

.page-form {
  /* display "Little" mode by default */
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  /* Hide it when it reached 30ch wide */
  @container pagination (min-width: 30ch) {
    display: none;
  }
}
```

## Codepen Demo

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/fimion/embed/WNBoQdJ?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">

  See the Pen <a href="https://codepen.io/fimion/pen/WNBoQdJ">

  Untitled</a> by Alex Riviere (<a href="https://codepen.io/fimion">@fimion</a>)

  on <a href="https://codepen.io">CodePen</a>.

</iframe>
