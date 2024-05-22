<template>
  <div class="sider-nav">
    <ul class="category-list">
      <li
        class="category-item"
        @click="choose('home')"
        :class="{ on: (page.relativePath == 'index.md' && selected === '' && !params.get('category') && !params.get('tag')) || selected === 'home' }"
      >
        <a class="category-item-link" :href="withBase(`/`)">首页</a>
      </li>

      <li class="li">
        <a href="" class="category-item-link">测试 <strong class="VPBadge tip strong mini">11</strong></a>
      </li>
      <!-- <li
        class="li"
        @click="choose(key.toString())"
        :class="{ on: (params.get('category') === key.toString() && selected === '') || selected === key.toString() }"
        v-for="(item, key) in data"
      >
        <a class="a" :href="withBase(`/?category=${key.toString()}`)"
          >{{ key }}<strong class="VPBadge tip strong mini">{{ data[key].length }}</strong></a
        >
      </li> -->
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useData, withBase } from "vitepress";

let url = window.location.href.split("?")[1];
let params = new URLSearchParams(url);
const { page } = useData();
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
