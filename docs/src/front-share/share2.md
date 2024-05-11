# vitepress 使用

基础架子搭建

```typescript
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Yonghui Zhao",
  description: "Yonghui Zhao's Personal Page",
  srcDir: "src",
  base: process.env.NODE_ENV === "production" ? "./" : "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/articles/" },
      { text: "前端分享", link: "/front-share/" },
    ],

    sidebar: {
      "/articles": [
        {
          text: "文章",
          items: [
            { text: "文章1", link: "/articles/article1" },
            { text: "文章2", link: "/articles/article2" },
          ],
        },
      ],
      "/front-share": [
        {
          text: "前端分享",
          items: [
            { text: "分享1", link: "/front-share/share1" },
            { text: "分享2", link: "/front-share/share2" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
```