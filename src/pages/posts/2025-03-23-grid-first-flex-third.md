---
layout: ../../layouts/BlogPost.astro
title: Grid First, Flex Third
pubDate: 2025-03-23T11:55:29
draft: false
rssOnly: false
style: ""
---
I've been mulling this topic for months now, and I'm pretty firmly of the opinion if you are attempting to do some layout in CSS, you should reach for `display:grid` first, followed by `display:block`, followed by `display:flex`.  Grid allows the layout element to be in control of how things get placed, where as flex really relies on the children to define their widths, which most of the time is not how layout should function at all.

### Grid First

I've been working in a very flex heavy codebase the last couple of years, and there are multiple instances where I have needed to rework multiple components that have used a combination of nested flexbox, position relative/absolute, and lots of growing, shrinking, and hardcoded sizes. Most of these issues have been resolved by deleting those styles and turning the layout portion into a grid.

An example of this would be a text input component. Within this text input component, we had a flexbox layout for the input, that would optionally add margins to the input if there was an icon prop for the start or end, the icons would then be positioned absolute to make sure they ended up at the correct end. This got weird when you started to use `ltr` vs `rtl` languages, and there was a whole lot of javascript logic just to figure out where an icon needed to go, and which margin needed to be applied.

Now I recognize not everyone has this problem, but honestly, it was solved pretty much instantly with a single grid definition.

```css
.input-wrapper{
  display: inline-grid;
  grid-template-areas: "front-icon input back-icon";
  grid-template-columns: auto 1fr auto;
}
```

This definition will let us assign the starting icon to the “front-icon” grid area, the ending icon to the “back-icon” area, and those will only have width if there is content in there. Done.

I have more examples of patterns like this where flex box just gets in the way more than helps.

### Block Second

So this might be a hot take, but i have a lot of places in my work code base that still have the following style:

```css
.descriptive-class-name{
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: start;
}
```

Congratulations! You've made a bunch of blocks! You have successfully created the least useful css statement. This is pretty much the equivalent of this:

```css
.descriptive-class-name>*{
  display:block;
}
```

Now I can hear some of you saying, “But Alex, what if you want to flip it from being a column to a row?” If this were the case, we wouldn't be having this conversation. But it isn't. This is extra code for the sake of “being in control”. Stop it.

A lot of times, you don't need flex for the thing that you are doing, you need something else. This is one of those cases.

### Flex Third

Sometimes, you do actually need/want flexbox.  Displaying a grid of cards is a great time to use flexbox (Until you need the contents inside the cards to line up, then you probably want grid and subgrid). Quickly centering something, flexbox is a great option (but so is grid, thus negating this point).

We have better more powerful tools for layout. Reaching for `display:flex` because you are more comfortable with it does not make it the best choice. If we only reached for what we were comfortable with we would all be doing layout with table elements still, and no one wants that (looking at you, MS Outlook).
