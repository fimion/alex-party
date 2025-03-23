<script>
import DateDisplay from "./DateDisplay.vue"
import splitExcerpt from "../functions/splitExcerpt.js"
import {reactive} from "vue"

export default {
  metaInfo: {
    title: "Alex.party",
  },
  props: {
    posts: {
      type: Array,
    },
  },
  async setup(props) {
    const previews = reactive({});
    for(let post of props.posts){
      previews[post.url] = splitExcerpt(await post.compiledContent())
    }

    return {previews}
  },
  components: {DateDisplay},
}
</script>
<template>

  <article v-for="post in posts" :key="post.id" class="article">
    <h2>
      <a :href="post.url">{{ post.frontmatter.title }}</a>
    </h2>
    <p>
      <date-display :datetime="post.frontmatter.pubDate"/>
    </p>
    <div class="sans-serif">
      <div v-html="previews[post.url]"></div>
      <p><a :href="post.url">Continue reading "{{ post.frontmatter.title }}"</a></p>
    </div>
  </article>

</template>
<style scoped>
article.article{
  margin-block-end: 0.5rem;
  border-block: var(--main-border);
  border-radius: var(--main-border-radius);
}
</style>
<style>
.home-links a {
  margin-right: 1rem;
}
</style>
