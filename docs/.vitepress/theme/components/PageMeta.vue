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
</script>

<style lang="scss" scoped></style>
