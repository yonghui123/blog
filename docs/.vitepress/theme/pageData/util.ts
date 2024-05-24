import type { Post } from "./type";

/**
 * 将页面按照某种字段分类
 * @param pageData 页面分类数据
 * @param field 页面分类依据字段
 */
export function getPageClassifying(pageData: Post[], field: string) {
  const data: Record<string, Post[]> = {};
  for(let i = 0; i < pageData.length; i++) {
    const el = pageData[i];
    const frontmatter = el?.frontmatter;
    let tag: string[] | undefined = undefined;
    if(frontmatter) {
      tag = frontmatter[field];
    }
    if(tag) {
      tag.forEach((item: string) => {
        if(!data[item]) {
          data[item] = []
        }
        data[item].push(el);
      })
    }
  }

  return data;
}


/**
 * @description: 根据字段筛选符合target的文章
 * @param {Post[]} articles 文章列表
 * @param {string} target 筛选条件
 * @param {string} field 筛选的字段
 * @return {Post[]} 筛选过后的文章
 */
export function filterArticleWithField(articles: Post[], target: string, field: string): Post[] {
  return articles.filter((article) => {
    const frontmatter = article.frontmatter;
    if(frontmatter) {
      return frontmatter[field] === target;
    } else {
      return false;
    }
  })
}
