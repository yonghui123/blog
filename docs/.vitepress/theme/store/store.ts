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
  const limit = 10;
  const setPage = (pageParams: number) => {
    page.value = pageParams;
  }

  return { page, limit, setPage };
})