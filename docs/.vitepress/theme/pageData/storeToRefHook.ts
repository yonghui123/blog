import { useArticlePagnationStore, useCategoryStore, useLayoutStore } from "../store/store";
import { storeToRefs } from "pinia";

export const useCategory = () => {
  const categoryStore = useCategoryStore();
  const { setCategory } = categoryStore;
  const { field, categoryTarget } = storeToRefs(categoryStore);

  return { categoryTarget, field, setCategory };
};

export const useLayout = () => {
  const layoutStore = useLayoutStore();
  const { setArticleLayout } = layoutStore;
  const { articleLayout } = storeToRefs(layoutStore);

  return { articleLayout, setArticleLayout };
};

export const useArticlePagnation = () => {
  const pagnationStore = useArticlePagnationStore();
  const { setPage } = pagnationStore;
  const { page } = storeToRefs(pagnationStore);
  return { page, limit: pagnationStore.limit, setPage };
};
