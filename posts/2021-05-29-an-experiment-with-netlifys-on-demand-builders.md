---
title: "CSS-Trickz: An Experiment with Netlify's On-Demand Builders"
date: 2021-05-29T16:54:27.392Z
---
At the behest of [Dave Rupert](https://daverupert.com/) in the [Shop Talk Show D-D-D-Discord](https://www.patreon.com/shoptalkshow), I'm going to talk about my adventures in making an efficient and poorly designed typo-squatting knock-off of CSS-Tricks.com called CSS-Trickz.com, which turned into an experiment in how to make a cached and auto building site on Netlify, using their new [On-Demand Builders](https://docs.netlify.com/configure-builds/on-demand-builders/).

Note: I want to make it clear here, [Chris Coyier](https://chriscoyier.net/) knows I made this, and was okay with it. However, this is essentially an article about how to create a CSS-Tricks clone by scraping the information from their API. Don't use this information for evil. **Do not try to monetize your own clone of another person's content.** This has been a fun experiment, and should be regarded as such. For that reason, I've removed some of the information of how to access the API directly as I don't feel comfortable telling people how to clone CSS-Tricks.

## How it Began: The Naïve Approach

I was nerd-sniped by someone suggesting a typo. Someone suggested that there should be CSS-Trickz and I bought the domain. That said, I realized that since CSS-Tricks is built on WordPress, I could actually make a bad clone that just points back to CSS-Tricks. I started off with a naïve implementation that I threw up on Netlify using the [WordPress API `_jsonp` callback method](https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/#_jsonp). (If you need to get data from a remote WordPress site, this will remove most CORS issues)

It looked something like this:

```html
<section id="articles"></section>
<script>
  startApp(articles){
    // add articles to our section#articles
  }
</script>
<script src="https://css-tricks.com/{path to api for posts}/?_jsonp=startApp"></script>
```

This is a quick way to implement adding a feed of most recent articles. It's great! But, well, Chris did have some feedback:

> uhm google says client side rendering is bad mmkay
>
> \--[ Chris Coyier](https://github.com/fimion/css-trickz/issues/1)

## Second Pass: SSR Function!

Alright, Chris had a point. Every time a person would visit the site, it relied on the browser to be able to fetch the data and would (potentially) take a second to render the excerpts of the articles. It would be better if the html was just served straight to the browser with the article excerpts and links all in there already. Netlify Functions to the rescue!

```javascript
function getArticles(articles){
    const result = ""
    // add all the articles we get to result
    return result;
}

function createHTMLDoc(response){
    const indexBody = `
      <!DOCTYPE html>
      <html>
        <body>
        <section>{{addArticles}}</section>
        </body>
      </html>
    `;
    const articles = JSON.parse(response.body);

    return indexBody.replace('{{addArticles}}', getArticles(articles));
}


exports.handler = async function (){
    const requestOpts = new URL("https://css-tricks.com/{path to api for posts}");
    try {
        const cssTricksResponse = await request(requestOpts);
        return {
          statusCode:200, 
          headers:{"content-type":'text/html'}, 
          body: createHTMLDoc(cssTricksResponse),
        };
    } catch(e) {
        console.log(e);
        return { statusCode: 500, body: JSON.stringify(e)};
    }
}
```

This gives us an HTML response, and the articles get embedded into it! 

Excellent! Problem fixed. Well, kind of.

This actually gives us a new problem that the function runs on MY dime every time someone comes to the site. while there is a free tier of Netlify Functions, I'd rather not become a victim of internet popularity. Fortunately, Netlify has recently release "On Demand Builders" which allows you to  generate server side rendered pages on-demand when first requested and then use a cached value for every subsequent call. This means, I could run this function once and then it would use that version of the output every single time afterwards.

## Version 3: Let's Get Caching!