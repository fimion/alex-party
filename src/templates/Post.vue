<template>
  <layout :title="$page.post.title">
    <h2><a :href="$page.post.path">{{ $page.post.title }}</a></h2>
    <p>{{ $page.post.date }}</p>
    <p>{{ $page.post.excerpt }}</p>
    <div v-html="$page.post.content"></div>
  </layout>
</template>

<page-query>
  query Post ($path: String!) {
    post: post (path: $path) {
      path
      title
      id
      date
      excerpt
      content
    }
  }
</page-query>
<script>
  import Layout from '~/layouts/Default.vue'
  export default {
    name: "Post",
    components:{Layout},
    metaInfo () {
      return {
        title: this.$page.post.title
      }
    }
  }
</script>

<style scoped>

</style>
