import { defineConfig } from "vitepress";
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Yonghui Zhao",
  description: "Yonghui Zhao's Personal Page",
  srcDir: "src",
  base: process.env.NODE_ENV === "production" ? "/blog/" : "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [],

    sidebar: [{}],

    outline: {
      label: "页面导航",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
  markdown: {
    math: true,
  },
  vite: {
    plugins: [
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        btnPlaceholder: "搜索文档",
        placeholder: "搜索文档",
        emptyText: "没有内容",
        heading: "共{{searchResult}}条搜索结果"
      })
    ]
  }
});
