<template>
  <div class="article-list" :class="{ grid: articleLayout === 'grid', list: articleLayout === 'list' }">
    <div class="article-item-wrapper" v-for="(article, index) in articles" :key="index">
      <div class="article-item">
        <div class="article-item-cover">
          <a :href="withBase(article.relativePath)" class="article-item-link">
            <img class="article-item-cover-img bgimg" :src="article.frontmatter?.cover" />
          </a>
        </div>
        <div class="article-info">
          <div class="article-title">
            <a :href="withBase(article.relativePath)" class="article-info-link">
              <span class="categorie-list" v-if="article.frontmatter?.categories">
                <span class="categorie-item" v-for="item in article.frontmatter.categories.slice(0, 2)">{{ item }}</span>
                <span class="categorie-item" v-if="article.frontmatter.categories.length > 2">...</span>
              </span>
              {{ article.frontmatter.title }}
            </a>
          </div>
          <div class="desc" v-html="article.frontmatter?.description"></div>
          <div class="meta">
            <ClientOnly>
              <ArticleMeta :article="article" />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { withBase } from "vitepress";
import ArticleMeta from "./ArticleMeta.vue";
import { data as allArticle } from "../pageData/posts.data";
import { filterArticleWithField } from "../pageData/util";
import { Post, CategoryFieldType } from "../pageData/type";
import { useCategory, useLayout, useArticlePagnation } from "../pageData/storeToRefHook";

const { categoryTarget, field } = useCategory();
const { articleLayout } = useLayout();
const { page, limit } = useArticlePagnation();
const articles = computed(() => {
  let fields: CategoryFieldType | "" = "";
  if (field.value) {
    fields = field.value;
  }
  let afterCategoryArticles: Post[] = filterArticleWithField(allArticle, categoryTarget.value, fields);
  afterCategoryArticles = afterCategoryArticles.slice((page.value - 1) * limit, page.value * limit);
  return afterCategoryArticles;
});
</script>

<style lang="scss" scoped>
.article-list.list {
  border-bottom: 1px dashed var(--vp-c-divider-light);
  padding: 14px 0 14px 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  .article-item {
    display: flex;
    flex-direction: row;
    margin-top: 10px;

    .article-item-cover {
      width: 30%;
      max-width: 220px;
      display: flex;
      /* height: 110px; */
      overflow: hidden;
      position: relative;
      margin-right: 20px;
      /* margin-top: -30px; */
      border-radius: 8px;
      border: 1px solid var(--vp-c-gray-3);
      overflow: hidden;
      box-shadow: rgba(61, 72, 83, 0.36) 0px 0px 1px, rgba(61, 72, 83, 0.06) 0px 2px 6px;

      .article-item-cover-img {
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
        transition-duration: 0.3s;
        object-fit: cover;
        width: 100%;
        height: auto;
      }

      .article-item-cover-img:hover {
        transform: scaleX(var(1.05)) scaleY(1.05);
      }
    }

    .article-info {
      flex: 1;

      .article-title {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        -webkit-font-smoothing: antialiased;
        font-weight: 500;
        overflow-wrap: normal;
        word-break: normal;

        .categorie-list {
          .categorie-item {
            background-color: var(--vp-c-brand);
            color: #ffffff;
            font-size: 12px;
            padding: 2px 5px;
            margin-right: 5px;
            border-radius: 2px;
          }
        }
      }

      .desc {
        color: var(--vp-c-text-1);
        font-size: 13px;
        margin-top: 10px;
        opacity: 0.6;
        font-weight: normal;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        -webkit-font-smoothing: antialiased;
      }
    }
  }
}

.article-list.grid {
  .article-item {
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    flex-grow: 1;
    border-radius: 8px;
    border: 0.5px solid var(--vp-c-gray-soft);
    background: var(--vp-c-bg-elv);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.3s;
    transition-property: box-shadow;
    overflow: hidden;
    box-shadow: var(--vp-shadow-1);

    .article-item-cover {
      /* height: 12rem; */
      padding-top: 66%;
      width: 100%;
      overflow: hidden;
      position: relative;

      .article-item-cover-img {
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
        transition-duration: 0.3s;
        object-fit: cover;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }

      .article-item-cover-img:hover {
        transform: scaleX(1.05) scaleY(1.05);
      }
    }

    .article-info {
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 8px;
      width: 100%;
      margin-top: 1.25rem;

      .article-title {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        height: 3rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        -webkit-font-smoothing: antialiased;
        font-weight: 500;
        overflow-wrap: normal;
        word-break: normal;

        .categorie-list {
          .categorie-item {
            background-color: var(--vp-c-brand);
            color: #ffffff;
            font-size: 12px;
            padding: 2px 5px;
            margin-right: 5px;
            border-radius: 2px;
          }
        }
      }

      .desc {
        display: none;
      }
    }
  }
}

.article-list.grid .article-item:hover {
  box-shadow: var(--vp-shadow-3);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.3s;
  transition-property: box-shadow;
  background-color: var(--vp-c-bg-elv);
  overflow: hidden;
}
</style>
