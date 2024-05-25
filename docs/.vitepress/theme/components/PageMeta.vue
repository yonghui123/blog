<template>
  <div>
    <ArticleMeta type="single" :article="props.article"/>
  </div>
</template>

<script lang="ts" setup>
import ArticleMeta from "./ArticleMeta.vue";
import { Post } from "../pageData/type";
const props = defineProps<{
  article: Post;
}>();
console.log("props single")
</script>

<style lang="scss" scoped></style>
