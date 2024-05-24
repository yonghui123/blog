<template>
  <img :src="withBase(props.imgLink)" alt="" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { withBase, useData } from "vitepress";
const props = defineProps<{ imgLink: string }>();

</script>
<style lang="scss" scoped></style>
