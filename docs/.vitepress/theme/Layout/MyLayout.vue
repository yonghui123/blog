<template>
  <Layout :class="{ home: frontmatter?.index }">
    <template #not-found>
      <div class="page404">404</div>
    </template>
    <template #layout-top>
      <ClientOnly>
        <div class="snow" v-if="isDark"></div>
      </ClientOnly>
    </template>

    <template #nav-bar-content-after>
      <!-- 在导航 social后添加 -->
    </template>

    <template #nav-screen-content-after> </template>

    <template #nav-bar-content-before>
      <!-- 在导航搜索框💰添加 -->
      <ClientOnly> </ClientOnly>
    </template>

    <template #nav-bar-title-after>
      <!-- 在标题后添加 -->
    </template>

    <template #sidebar-nav-before>
      <SiderNav></SiderNav>
    </template>

    <template #doc-top>
      <ClientOnly>
        <!-- <PageSlider v-if="frontmatter?.index" :key="md5(page.relativePath)"></PageSlider> -->
      </ClientOnly>
    </template>

    <template #doc-before>
      <Home></Home>
    </template>

    <template #aside-bottom>
      <ClientOnly>
        <!-- <ArticleLink v-if="(frontmatter?.post)" :key="md5(page.relativePath)" /> -->
        <!-- <PageASide v-if="frontmatter.index" /> -->
      </ClientOnly>
      <!-- <Links v-if="(frontmatter.index)" /> -->
    </template>
    <template #doc-footer-before> </template>
    <template #doc-bottom> </template>
  </Layout>
</template>

<script lang="ts" setup>
import Home from "../components/Home.vue";
import SiderNav from "../components/SiderNav.vue";
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";

const { page, theme, frontmatter, isDark } = useData();
const { Layout } = DefaultTheme;
</script>
