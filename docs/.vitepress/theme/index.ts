// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import MyLayout from "./Layout/MyLayout.vue";
import Image from "./mdComponents/Image.vue";
import FloatingVue from "floating-vue"; //使用 tooltip库。用于hover提示、悬浮框等。教程见https://floating-vue.starpad.dev/
import { createPinia } from "pinia";
import "floating-vue/dist/style.css";
import "./styles/default.css";

const pinia = createPinia();

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component("Image", Image);
    app.use(FloatingVue, {
      themes: {
        tooltip: {
          distance: 8,
          delay: { show: 500, hide: 0 },
        },
      },
    });
    app.use(pinia);
  },
} satisfies Theme;
