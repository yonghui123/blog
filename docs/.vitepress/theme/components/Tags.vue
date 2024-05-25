<template>
  <!-- 标签页 -->
  <div class="pop-tags-wrapper">
    <div class="pop-tags-list">
      <div class="pop-tag" v-for="(item, key) in data">
        <div class="pop-tag-link" @click="onChangeTag(key.toString())">
          <span class="pop-tag-label">{{ "#" + key }}</span>
          <strong class="pop-tag-badge">{{ data[key].length }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { withBase } from "vitepress";
import { getPageClassifying } from "../pageData/util";
import { data as themeposts } from "../pageData/posts.data";
import { CategoryFieldType } from "../pageData/type";
import { useCategory } from "../pageData/storeToRefHook";

const { categoryField } = defineProps<{
  categoryField: CategoryFieldType;
}>();

const { field, categoryTarget, setCategory } = useCategory();

const data = computed(() => getPageClassifying(themeposts, categoryField));

const onChangeTag = (key: string) => {
  if (key == categoryTarget.value && categoryField == field.value) {
    return;
  }
  setCategory(categoryField, key);
};
</script>

<style scoped lang="scss">
.pop-tags-wrapper {
  min-width: 300px;
  min-height: 100px;
  max-height: 40vh;
  max-width: 40vw;
  overflow-y: auto;
  padding: 20px 14px;
}

.pop-tags-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  line-height: 24px;
}

.pop-tag {
  margin: 5px;
  padding: 6px 12px;
  display: inline-block;
  background-color: rgba(123, 123, 123, 0.05);
  color: var(--vp-c-text-1);
  font-size: 16px;
  border-radius: 2px;
  cursor: pointer;

  .pop-tag-link {
    color: var(--vp-c-text-1);
    font-weight: 500;
    text-decoration: none;
    display: flex;
    align-items: center;
    line-height: 1;
    .pop-tag-badge {
      margin-left: 4px;
      border-radius: 10px;
      padding: 6px 10px 4px;
      font-size: 12px;
      font-weight: 500;
      color: var(--vp-badge-tip-text);
      background-color: var(--vp-badge-tip-bg);
      line-height: 1;
    }
  }

  .pop-tag-link:hover {
    color: var(--vp-c-brand);
  }
}
</style>
