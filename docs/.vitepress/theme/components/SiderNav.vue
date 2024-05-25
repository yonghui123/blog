<template>
  <div class="sider-nav">
    <ul class="category-list">
      <li class="category-item" @click="onChangeCategory('')" :class="{ on: selected === '' }">
        <span class="category-item-link">全部</span>
      </li>

      <li class="category-item" @click="onChangeCategory(key.toString())" :class="{ on: selected === key.toString() }" v-for="(item, key) in categoryData">
        <span class="category-item-link">
          {{ key }}
          <strong class="VPBadge tip strong mini">
            {{ categoryData[key].length }}
          </strong>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vitepress";
import { computed } from "vue";
import { getPageClassifying } from "../pageData/util";
import { data } from "../pageData/posts.data";
import { useCategory } from "../pageData/storeToRefHook";

const { categoryTarget, field, setCategory } = useCategory();
const selected = computed(() => {
  if (field.value == "categories" && categoryTarget.value) {
    return categoryTarget.value;
  }
});

const categoryData = computed(() => {
  return getPageClassifying(data, "categories");
});

const router = useRouter();
const onChangeCategory = (key) => {
  if (key == categoryTarget) {
    return;
  }
  setCategory("categories", key);
  if(router.route.path !== '/') {
    router.go('/')
  }
};
</script>

<style scoped lang="scss">
.tags,
.archives {
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  line-height: 1;
  transform: translateX(0px);
  transition: 0.3s;
}

.sider-nav {
  position: relative;
  margin-top: 20px;
  width: 80%;
  border-radius: 16px;
  font-size: 14px;
  z-index: 1000;
  min-height: calc(100vh - 200px);

  .category-list {
    display: flex;
    flex-direction: column;
    padding: 10px 0;

    .category-item {
      .category-item-link {
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 44px;
        font-size: 14px;
        line-height: 1;
        transform: translateX(0px);
        transition: 0.3s;
        width: 100%;
        cursor: pointer;
      }

      .svg {
        width: 16px;
        height: 16px;
        margin-right: 5px;
        fill: currentColor;
      }

      .category-item-link:hover {
        /* color: #ffffff; */
        transform: translateX(10px);
        transition: 0.3s;
      }
    }

    .category-item.pc {
      display: none;
    }

    .category-item.h5 {
      display: block;
    }

    .category-item.on .category-item-link {
      font-weight: bold;
    }
  }
}

@media (min-width: 960px) {
  .sider-nav {
    .category-list {
      .category-item.pc {
        display: block;

        background: var(--vp-c-bg-alt);
        border-radius: 40px;
        padding: 0 20px;
      }

      .category-item.h5 {
        display: none;
      }
    }
  }
}
</style>
