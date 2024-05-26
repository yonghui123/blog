import { defineConfigWithTheme } from "vitepress";
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'
import { genFeed } from "./genFeed";
import { ThemeConfig } from "./theme/pageData/type";

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: "Yonghui Zhao",
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
    site: {
      author: "Yonghui Zhao",
    },
    showMusic: false,
    music: [],
  },
  markdown: {
    math: true,
    toc: {
      slugify: (str) => {
        console.log(str);
        return str
      },
      level: [2, 3],
    }
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
  },
  // async buildEnd() {
  //   const posts = await createContentLoader("**/*.md").load();
  //   console.log('posts: ', posts);
  // },
});
