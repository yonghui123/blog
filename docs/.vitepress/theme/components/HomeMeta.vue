<template>
  <div class="home-meta">
    <!-- 制作一个首页页面分类的组件 -->
    <div class="home-article-category">
      <ul class="category-list">
        <li class="category-item category-tag-item pc">
          <VDropdown :distance="6" placement="bottom">
            <button class="category-tag-btn category-item-link">
              <svg class="category-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M10.9042 2.10025L20.8037 3.51446L22.2179 13.414L13.0255 22.6063C12.635 22.9969 12.0019 22.9969 11.6113 22.6063L1.71184 12.7069C1.32131 12.3163 1.32131 11.6832 1.71184 11.2926L10.9042 2.10025ZM13.7327 10.5855C14.5137 11.3666 15.78 11.3666 16.5611 10.5855C17.3421 9.80448 17.3421 8.53815 16.5611 7.7571C15.78 6.97606 14.5137 6.97606 13.7327 7.7571C12.9516 8.53815 12.9516 9.80448 13.7327 10.5855Z"
                  fill="currentColor"
                ></path>
              </svg>
              标签
            </button>
            <template #popper>
              <Tags categoryField="tags" />
            </template>
          </VDropdown>
        </li>
        <!-- 有其他分类类型可以列举 -->
        <!-- <li class="category-item category-archives-item pc">
          <VDropdown :distance="6" :placement="'bottom'">
            <button class="archives category-item-link">
              <svg class="category-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M3 10H21V20.0044C21 20.5543 20.5551 21 20.0066 21H3.9934C3.44476 21 3 20.5552 3 20.0044V10ZM9 12V14H15V12H9ZM2 3.99981C2 3.44763 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44372 22 3.99981V8H2V3.99981Z"
                  fill="currentColor"
                ></path>
              </svg>
              存档
            </button>
            <template #popper>
              <Archives />
            </template>
          </VDropdown>
        </li> -->
        <li class="category-item mobile" @click="choose('tags')" :class="{ on: field === 'tags' }">
          <a class="category-item-link" :href="withBase(`/pages/tags`)">
            <svg class="category-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M10.9042 2.10025L20.8037 3.51446L22.2179 13.414L13.0255 22.6063C12.635 22.9969 12.0019 22.9969 11.6113 22.6063L1.71184 12.7069C1.32131 12.3163 1.32131 11.6832 1.71184 11.2926L10.9042 2.10025ZM13.7327 10.5855C14.5137 11.3666 15.78 11.3666 16.5611 10.5855C17.3421 9.80448 17.3421 8.53815 16.5611 7.7571C15.78 6.97606 14.5137 6.97606 13.7327 7.7571C12.9516 8.53815 12.9516 9.80448 13.7327 10.5855Z"
                fill="currentColor"
              ></path>
            </svg>
            标签
          </a>
        </li>
        <!-- <li class="li mobile" @click="choose('archives')" :class="{ on: (page.relativePath == 'pages/archives.md' && selected === '') || selected === 'archives' }">
          <a class="a" :href="withBase(`/pages/archives`)">
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M3 10H21V20.0044C21 20.5543 20.5551 21 20.0066 21H3.9934C3.44476 21 3 20.5552 3 20.0044V10ZM9 12V14H15V12H9ZM2 3.99981C2 3.44763 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44372 22 3.99981V8H2V3.99981Z"
                fill="currentColor"
              ></path>
            </svg>
            存档
          </a>
        </li> -->
      </ul>
    </div>

    <div class="page-control">
      <div class="page-category">
        <span class="page-category-label filter">
          <svg class="page-category-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C10.0224 20.3135 4.91625 17.5626 2.8685 13L7.56619 13L8.5 11.4437L11.5 16.4437L13.5662 13H17V11H12.4338L11.5 12.5563L8.5 7.55635L6.43381 11L2.21024 10.9999C2.07418 10.3626 2 9.69615 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"
              fill="rgba(255,99,71,1)"
            ></path>
          </svg>
          <span>
            <strong class="ca"> {{ filterLabel }} </strong>
            {{ " 共" + count + "篇" }}
          </span>
        </span>
      </div>
      <div class="page-layout-btns">
        <div class="page-layout-option" :class="{ on: articleLayout === 'grid' }" @click="changeLayout('grid')">
          <svg class="page-layout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM4 5V19H20V5H4ZM6 7H11V11H6V7ZM11 13H6V17H11V13ZM13 7H18V11H13V7ZM18 13H13V17H18V13Z"
              fill="currentColor"
            ></path>
          </svg>
          <span class="page-layout-text">网格</span>
        </div>
        <div class="page-layout-option" :class="{ on: articleLayout === 'list' }" @click="changeLayout('list')">
          <svg class="page-layout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM4 5V19H20V5H4ZM6 7H8V9H6V7ZM8 11H6V13H8V11ZM6 15H8V17H6V15ZM18 7H10V9H18V7ZM10 15H18V17H10V15ZM18 11H10V13H18V11Z"
              fill="currentColor"
            ></path>
          </svg>
          <span class="page-layout-text">列表</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 制作首页文章列表布局 -->
  <ArticleList></ArticleList>
  <!-- 分页 -->
  <ArticlePagination :limit="limit" :page="page" :total="count" @onChangePage="changePage"></ArticlePagination>
</template>

<script lang="ts" setup>
import { CategoryFieldType, ListLayout, Post } from "../pageData/type";
import ArticleList from "./ArticleList.vue";
import Tags from "./Tags.vue";
import { computed, ref } from "vue";
import { withBase } from "vitepress";
import { filterArticleWithField } from "../pageData/util";
import { data as allArticle } from "../pageData/posts.data";
import { useCategory, useLayout, useArticlePagnation } from "../pageData/storeToRefHook";
import ArticlePagination from "./ArticlePagination.vue";

const filterLabelMap: Record<CategoryFieldType, string> = {
  categories: "分类",
  tags: "标签分类",
};

const { categoryTarget, field } = useCategory();
const { articleLayout, setArticleLayout } = useLayout();
const filterLabel = computed(() => {
  if (!field.value) return "";
  let label = filterLabelMap[field.value] + ": " + categoryTarget.value;
  return label;
});
const count = computed<number>(() => {
  let fields: CategoryFieldType | "" = "";
  if (field.value) {
    fields = field.value;
  }
  let afterCategoryArticles: Post[] = filterArticleWithField(allArticle, categoryTarget.value, fields);
  return afterCategoryArticles.length;
});

const changeLayout = (layout: ListLayout) => {
  setArticleLayout(layout);
};

// 分页
const { page, limit, setPage } = useArticlePagnation();
const changePage = (page: number) => {
  setPage(page);
};
</script>

<style lang="scss" scoped>
.home-article-category {
  margin-bottom: 32px;
  width: 100%;
  border-radius: 16px;
  font-size: 14px;

  display: flex;
  flex-direction: row;
  justify-content: center;

  .category-list {
    display: flex;
    flex-direction: row;
    padding: 10px 0;

    .category-item {
      padding: 0 10px;
      margin: 0 10px;

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
      }

      .category-icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
        fill: currentColor;
      }

      .category-item-link:hover {
        transition: 0.3s;
        color: var(--vp-c-brand);
      }
    }

    .category-item.pc {
      display: none;
    }

    .category-item.mobile {
      display: block;

      background: var(--vp-c-bg-alt);
      border-radius: 40px;
      padding: 0 20px;
    }

    .category-item:last-child {
      border-bottom: none;
    }

    .category-item.on .category-item-link {
      font-weight: bold;
      color: var(--vp-c-brand);
    }
  }
}

@media (min-width: 960px) {
  .home-article-category {
    .category-list {
      .category-item.pc {
        display: block;

        background: var(--vp-c-bg-alt);
        border-radius: 40px;
        padding: 0 20px;
      }

      .category-item.mobile {
        display: none;
      }
    }
  }
}

.page-control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 20px;

  .page-category {
    display: flex;
    flex-direction: row;

    .page-category-label {
      background-color: var(--vp-c-bg-alt);
      border-radius: 4px;
      padding: 2px 10px;
      display: flex;
      flex-direction: row;
      margin-right: 8px;

      .page-category-icon {
        width: 16px;
        object-fit: fill;
        fill: currentColor;
        margin-right: 5px;
      }
    }
  }

  .page-layout-btns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .page-layout-option {
      margin-left: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 1px;
      opacity: 0.5;
      cursor: pointer;

      .page-layout-icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }

      .page-layout-text {
        font-size: 14px;
        line-height: 1;
        margin-bottom: -1px;
      }
    }

    .page-layout-option.on {
      opacity: 1;
    }
  }
}

@media (max-width: 550px) {
  .page-control {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;

    .page-layout-btns {
      margin-bottom: 14px;

      .page-layout-option {
        margin-left: 0px;
        margin-right: 20px;
      }
    }
  }
}
</style>
