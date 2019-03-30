<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <section>
      <article v-for="edge in $page.posts.edges" :key="edge.node.id">
        <h2><g-link :to="edge.node.path">{{ edge.node.title }}</g-link></h2>
        <p>{{ edge.node.date}}</p>
        <p>{{edge.node.excerpt}}</p>
        <div v-html="edge.node.content"></div>
      </article>
    </section>
    <Pager :info="$page.posts.pageInfo"/>
  </Layout>
</template>

<page-query>
  query Posts($page: Int) {
    posts: allPost(sortBy: "date", order: DESC, perPage: 10, page: $page) @paginate {
      edges {
        node {
          path
          id
          title
          date
          excerpt
          content
        }
      }
    }
  }
</page-query>

<script>
  export default {
    metaInfo: {
      title: 'Hello, world!',
    },
  }
</script>

<style>
  .home-links a {
    margin-right: 1rem;
  }
</style>
