<template>
    <h2><a href="post.url">{{ post.frontmatter.title }}</a></h2>
    <div class="sans-serif">
      <p><date-display :datetime="post.frontmatter.pubDate"/></p>
      <div v-html="post.content()"></div>
    </div>
</template>

<script>
  import DateDisplay from "./DateDisplay.vue"
  import getPostPreview from "~/functions/generateSocialImage.js"
  export default {
    name: "Post",
    components:{DateDisplay},
    props:{
      post:{
        type:Object,
      }
    },
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
