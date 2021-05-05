<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <section>
      <article v-for="edge in $page.posts.edges" :key="edge.node.id">
        <h2>
          <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
        </h2>
        <div class="sans-serif">
          <p><date-display :datetime="edge.node.date" /></p>
          <div v-html="splitExcerpt(edge.node.content)"></div>
          <p><g-link :to="edge.node.path">Continue reading "{{ edge.node.title }}"</g-link></p>
        </div>
      </article>
    </section>
    <Pager :info="$page.posts.pageInfo" />
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
          content
        }
      }
    }
  }
</page-query>

<script>
import DateDisplay from "~/components/DateDisplay.vue"
export default {
  metaInfo: {
    title: "Hello, world!",
  },
  components:{DateDisplay},
  methods:{
    splitExcerpt(content){
      console.log(content.includes(`<!-- break -->`), content.split(`<!-- break -->`), content.match(/^\<p\>(.*)\<\/p\>/))
      if(content.includes(`<!-- break -->`)){
          return content.split(`<!-- break -->`)[0];
      }
      return content.match(/^\<p\>(.*)\<\/p\>/)[0];
    }
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
