<template>
  <time :datetime="datetime">{{displayDatetime}}</time>
</template>

<script>
export default {
name: "DateDisplay",
  props:{
    datetime:{
      type: String,
      required: true,
    }
  },
  computed:{
    dateObject(){
      return new Date(this.datetime);
    },
    displayDatetime(){
      return new Intl.DateTimeFormat().format(this.dateObject);
    }
  },
}
</script>

<style scoped>

</style>
