<template>
  <div class="article-pagination" v-show="isShow">
    <ul class="page_ul">
      <li class="li unmo" v-if="showTotal">
        <span class="gong">共&ensp;{{ countPages }}&ensp;页</span>
      </li>
      <li class="li unmo" v-if="showSide">
        <a class="pa" :class="curPage == 1 ? 'disable' : ''" @click="goPage(1)">首页</a>
      </li>
      <li class="li">
        <a class="pa" :class="curPage == 1 ? 'disable' : ''" @click="goPage(curPage - 1)">上一页</a>
      </li>
      <li class="li" v-for="(page, index) in pages" :key="index">
        <a class="pa" :class="{ active: curPage == page }" @click="goPage(page)">{{ page }}</a>
      </li>
      <li class="li">
        <a class="pa" :class="{ disable: curPage == countPages }" @click="goPage(curPage + 1)">下一页</a>
      </li>
      <li class="li unmo" v-if="showSide">
        <a class="pa" :class="{ disable: curPage == countPages }" @click="goPage(countPages)">尾页</a>
      </li>
      <li class="li unmo" v-if="false">
        <span class="gopa">
          前往
          <input type="text" v-model.number="inputPage" @input="inputVal" />
          页
          <button @click="jumpPage(inputPage)">Go</button>
        </span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, toRef } from "vue";
const props = defineProps({
  limit: {
    // 每页数量限制
    type: Number,
    default: 10,
  },
  page: {
    // 当前页
    type: Number,
    default: 1,
  },
  total: {
    // 总条数
    type: Number,
    default: 0,
  },
  showTotal: {
    // 是否显示总数
    type: Boolean,
    default: true,
  },
  showJump: {
    // 显示跳转
    type: Boolean,
    default: false,
  },
  showSinglePage: {
    // 只有一页时是否显示
    type: Boolean,
    default: false,
  },
  position: {
    //分页显示位置，左对齐、右对齐、居中
    type: String,
    default: "center",
  },
  showSide: {
    type: Boolean,
    default: true,
  },
});

const curPage = toRef(props.page);
const inputPage = ref(props.page); //input框里的值

const countPages = computed(() => {
  return Math.ceil(Number(props.total) / Number(props.limit));
});
const isShow = computed(() => {
  if (props.showSinglePage) {
    return true;
  }
  return countPages.value !== 1;
});

const pages = computed(() => {
  let res: number[] = [];
  for (let i = 0; i < countPages.value; i++) {
    res.push(i + 1);
  }
  return res;
});

const emit = defineEmits(["update:page", "onChangePage"]);

const clamp = (value, min, max) => {
  return Math.min(max, Math.max(value, min));
};

const goPage = (pageNum: number) => {
  curPage.value = clamp(pageNum, 1, countPages.value);
  emit("update:page", curPage.value);
  emit("onChangePage", curPage.value);
};
</script>
<style scoped lang="scss">
.article-pagination {
  margin-top: 32px;
  text-align: center;
}
.page_ul {
  display: inline-flex;
  flex-wrap: wrap;
  font-size: 13px;

  .li {
    margin: 5px;
    line-height: 24px;
  }

  .pa {
    display: inline-block;
    min-width: 24px;
    text-align: center;
    border: 1px var(--vp-c-divider-light) solid;
    border-radius: 3px;
    cursor: pointer;
    padding: 0 5px;
    user-select: none;
    transition: all 0.3s;

    &.active {
      background: var(--vp-c-text-1);
      color: var(--vp-c-neutral-inverse);
      border: 1px solid var(--vp-c-text-1) !important;
      pointer-events: none;
    }

    &:not(.disable):hover,
    &:not(.disable):active {
      color: var(--vp-c-brand);
    }

    &.disable {
      opacity: 0.4;
      pointer-events: none;
    }
  }

  .gopa {
    padding-left: 5px;

    & > input {
      width: 40px;
      text-align: center;
      height: 26px;
      outline: 0;
      border: 1px solid #ccc;
      border-radius: 3px;

      &:focus {
        border-color: #409eff;
      }
    }

    & > button {
      height: 30px;
      border: 0;
      min-width: 32px;
      background: #f1f1f1;
      cursor: pointer;
      border-radius: 3px;

      &:hover {
        color: #409eff;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .page_ul li {
    .pa:not(.active):hover {
      border-color: #f1f1f1;
      background-color: #f1f1f1;
      color: inherit;
    }
  }
}
</style>
