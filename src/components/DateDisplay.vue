<script setup lang="ts">
import {computed, defineOptions, defineProps} from "vue";
defineOptions({
  name: "DateDisplay",
})
interface Props {
  datetime: string|Date;
}
const props = defineProps<Props>()

const dateObject = computed(()=>new Date(props.datetime))
const displayDatetime = new Intl.DateTimeFormat().format(dateObject.value)
</script>
<template>
  <span :datetime="dateObject.toISOString()">{{displayDatetime}}</span>
</template>
<style scoped>

</style>
