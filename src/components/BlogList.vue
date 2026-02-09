<script setup lang="ts">
import DateDisplay from "./DateDisplay.vue"
import splitExcerpt from "../functions/splitExcerpt.js"
import {reactive} from "vue"
import {type CollectionEntry, render, } from "astro:content";

defineOptions({
  metaInfo:{
    title: "Alex.party",
  },
});
interface Props {
  posts: CollectionEntry<"posts">[];
}

const props = defineProps<Props>();

const previews = reactive({});
for(let post of props.posts){
    previews[post.id] = splitExcerpt(post.rendered?.html ?? "")
}

</script>
<template>

  <article v-for="post in posts" :key="post.id" class="article">
    <h2>
      <a :href="'/posts/'+post.id">{{ post.data.title }}</a>
    </h2>
    <p>
      <date-display :datetime="post.data.pubDate.toISOString()" />
    </p>
    <div class="sans-serif">
      <div v-html="previews[post.id]"></div>
      <p><a :href="'/posts/'+post.id">Continue reading "{{ post.data.title }}"</a></p>
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
