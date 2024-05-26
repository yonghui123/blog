import { defineStore } from "pinia";
import { ref } from "vue";
import { ListLayout, CategoryFieldType } from "../pageData/type";

export const useCategoryStore = defineStore("category", () => {
  const categoryTarget = ref("");
  const field = ref<CategoryFieldType>();

  const setCategory = (fields: CategoryFieldType, categorys: string) => {
    field.value = fields;
    categoryTarget.value = categorys;
  };

  return { categoryTarget, field, setCategory };
});

export const useLayoutStore = defineStore("layout", () => {
  const articleLayout = ref<ListLayout>("grid");
  function setArticleLayout(layout: ListLayout) {
    articleLayout.value = layout;
  }
  return { articleLayout, setArticleLayout };
});

export const useArticlePagnationStore = defineStore("articlepagnation", () => {
  const page = ref(1);
  const limit = 12;
  const setPage = (pageParams: number) => {
    page.value = pageParams;
  };

  return { page, limit, setPage };
});

export const useMusicStore = defineStore("music", () => {
  // 进来默认是关闭的
  const isPause = ref<boolean>(true);
  const autio = new Audio();
  // 当前播放的歌曲id， -1代表没有歌曲播放
  const curPlayId = ref<number>(-1);

  const setMusicStatus = (status: boolean) => {
    isPause.value = status;
  };

  return { isPause, setMusicStatus };
});
