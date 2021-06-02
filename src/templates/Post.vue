<template>
  <layout :title="$page.post.title">
    <article>
      <h2><g-link :to="$page.post.path">{{ $page.post.title }}</g-link></h2>
      <div class="sans-serif">
        <p><date-display :datetime="$page.post.date"/></p>
        <div v-html="$page.post.content"></div>
      </div>
      <div ref="comments"/>
    </article>
  </layout>
</template>

<page-query>
  query Post ($path: String!) {
    post: post (path: $path) {
      path
      title
      id
      date
      content
    }
  }
</page-query>
<script>
  import Layout from '~/layouts/Default.vue'
  import DateDisplay from "~/components/DateDisplay.vue"
  import getPostPreview from "~/functions/getPostPreview.js"
  export default {
    name: "Post",
    components:{Layout, DateDisplay},
    metaInfo () {
      return {
        title: this.$page.post.title,
        meta:[
          {name:"image",content:this.previewImg},
          {property:"og:type", content:"article"},
          {property:"og:url", content: `https://alex.party${this.$page.post.path}`},
          {property:"og:title", content:this.$page.post.title},
          {property:"og:description", content:this.$page.post.date},
          {property:"og:image", content:this.previewImg},
          {name:"twitter:dnt", content:"on"},
          {name:"twitter:card", content:"summary_large_image"},
          {name:"twitter:creator", content:"@fimion"},
          {name:"twitter:title", content:this.$page.post.title},
          {name:"twitter:description", content:this.$page.post.date},
          {name:"twitter:image", content:this.previewImg},
        ]
      }
    },
    computed:{
      previewImg(){
        return getPostPreview({title:this.$page.post.title});
      }
    },
    mounted(){
      if(window){
          const utterances = document.createElement('script');
          utterances.src="https://utteranc.es/client.js";
          utterances.setAttribute('repo',"fimion/alex-party");
          utterances.setAttribute("issue-term","pathname");
          utterances.setAttribute("label","comments");
          utterances.setAttribute("theme","github-light");
          utterances.setAttribute("crossorigin","anonymous");
          utterances.setAttribute("async","async");
          this.$nextTick(()=>{
            this.$refs.comments.append(utterances);
          })
      }
    }
  }
</script>

<style scoped>

</style>
