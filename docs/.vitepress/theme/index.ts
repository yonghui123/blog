// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import MyLayout from "./Layout/MyLayout.vue";
import Image from "./mdComponents/Image.vue";
import "./styles/default.css";

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component("Image", Image);
  },
} satisfies Theme;
