<template>
  <div>page aside</div>
</template>

<script lang="ts" setup>
import { useData, withBase } from "vitepress";
import { computed, ref, watch } from "vue";
import { getPageClassifying } from "../pageData/util";
import { data } from "../pageData/posts.data";

// let url = window.location.href.split("?")[1];
// let params = new URLSearchParams(url);
const { page, frontmatter } = useData();

const categoryData = computed(() => {
  console.log("createContentLoader:", data);
  return getPageClassifying(data, "category");
});
</script>
