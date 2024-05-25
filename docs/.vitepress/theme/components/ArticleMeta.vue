<template>
  <div class="article-meta" :class="{ grid: articleLayout === 'grid', list: articleLayout === 'list' }">
    <h1 class="article-page-title" v-if="type === 'single'">{{ dataSource.frontmatter?.title }}</h1>
    <div class="meta-info">
      <p class="article-time" v-if="dataSource.frontmatter?.date">
        <svg class="article-time-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"
          ></path>
        </svg>
        <time class="article-time-text" :datetime="dataformat === 0 ? formatTime(dataSource.frontmatter.date) : relativeTime(dataSource.frontmatter.date)">
          {{ dataformat === 0 ? formatTime(dataSource.frontmatter.date) : relativeTime(dataSource.frontmatter.date) }}
        </time>
      </p>
      <div class="meta-info-tags" v-if="dataSource.frontmatter?.tags">
        <template v-if="type !== 'single'">
          <span class="meta-info-tag" v-for="(item, index) in dataSource.frontmatter.tags.slice(0, 2)" :key="index" @click="changeTag(item)">
            {{ "#" + item }}
          </span>
          <span class="meta-info-tag" v-if="dataSource.frontmatter.tags.length > 2">...</span>
        </template>
        <template v-else>
          <span class="meta-info-tag" v-for="(item, index) in dataSource.frontmatter.tags" :key="index" @click="changeTag(item)">
            {{ "#" + item }}
          </span>
        </template>
      </div>
    </div>
    <p class="readtime" v-if="type === 'single'">
      <span class="warning">全文共{{ wordCount }}字，{{ "预计阅读" + readTime + "分钟" }}</span>
    </p>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, onMounted, watch } from "vue";
import { useRouter } from "vitepress";
import { Post, CategoryFieldType } from "../pageData/type";
import { useCategory, useLayout } from "../pageData/storeToRefHook";
import { relativeTime, formatTime, countWord } from "../pageData/util";
const props = defineProps<{
  article?: Post;
  type?: string;
}>();
// 布局
const { articleLayout } = useLayout();
// 文章数据
const dataformat = ref(0);
const dataSource = computed(() => {
  let article = props.article;
  if (article?.frontmatter?.date) {
    if ((new Date().getTime() - new Date(article?.frontmatter?.date).getTime()) / (24 * 60 * 60 * 1000) < 365) {
      dataformat.value = 1; //判断发布日期距离现在365天以内则显示人性化时间
    } else {
      dataformat.value = 0;
    }
  }
  return article;
});

const wordCount = ref(0);
const imageCount = ref(0);
const wordTime = computed(() => {
  return (wordCount.value / 275) * 60;
});

const imageTime = computed(() => {
  const n = imageCount.value;
  if (imageCount.value <= 10) {
    // 等差数列求和
    return n * 13 + (n * (n - 1)) / 2;
  }
  return 175 + (n - 10) * 3;
});
const readTime = computed(() => {
  return Math.ceil((wordTime.value + imageTime.value) / 60);
});

function analyze() {
  document.querySelectorAll(".meta-des").forEach((v) => v.remove());
  const docDomContainer = window.document.querySelector("#VPContent");
  const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(".content-container .main img");
  imageCount.value = imgs?.length || 0;
  const words = docDomContainer?.querySelector(".content-container .main")?.textContent || "";
  wordCount.value = countWord(words);
}

const { categoryTarget, setCategory } = useCategory();
const router = useRouter();
function changeTag(key: string) {
  if (key == categoryTarget.value) {
    return;
  }
  setCategory("tags", key);
  if(router.route.path !== '/') {
    router.go("/")
  }
}

onMounted(() => {
  // 初始化时执行一次
  analyze();
});
</script>
<style scoped lang="scss">
.article-meta {
  padding-top: 12px;

  .article-page-title {
    font-size: 1.87rem;
    line-height: 2.25rem;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .meta-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;

    .article-time {
      font-size: 13px;
      line-height: 1.25rem;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      opacity: 0.5;
      margin: 0;
      margin-right: 10px;

      .article-time-icon {
        width: 14px;
        height: 14px;
        margin-right: 5px;
        flex-shrink: 0;
        fill: currentColor;
      }

      .article-time-text {
        flex-shrink: 0;
        margin-right: 10px;
      }
    }

    .meta-info-tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .meta-info-tag {
        margin-left: 10px;
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 0 8px;
        display: inline-block;
        background-color: rgba(123, 123, 123, 0.05);
        color: var(--vp-c-text-1);
        font-size: 12px;
        border-radius: 2px;
        cursor: pointer;
        /* .a {
          opacity: .6;
        } */
      }

      .meta-info-tag:first-child {
        margin-left: 0px;
      }
    }
  }
}

.article-meta.grid {
  .meta-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: nowrap;

    .meta-info-tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .meta-info-tag {
        margin-top: 5px;
        margin-bottom: 5px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical !important;
      }
    }
  }
}

.article-meta.list {
  padding-top: 12px;

  .meta-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .article-time {
      font-size: 13px;
      line-height: 1.25rem;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      opacity: 0.5;
      margin: 0;

      .article-time-icon {
        width: 14px;
        height: 14px;
        margin-right: 5px;
        flex-shrink: 0;
        fill: currentColor;
        display: none;
      }

      .article-time-text {
        flex-shrink: 0;
      }
    }
  }
}
.readtime {
  margin-top: 20px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .warning {
    display: block;
    margin-left: 2px;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 0 16px;
    line-height: 33px;
    font-size: 13px;
    font-weight: 500;
    border-color: var(--vp-badge-warning-border);
    color: var(--vp-badge-warning-text);
    background-color: var(--vp-badge-warning-bg);
  }
}

@media (max-width: 550px) {
  .article-meta.grid,
  .article-meta.list {
    .article-time {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

      .meta-info-tag {
        margin-left: 0px !important;
        margin-right: 10px;
      }
    }
  }
}
</style>
