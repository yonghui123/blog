import type { Post, CategoryFieldType } from "./type";
import dayjs from "dayjs";
// 处理时间间隔的持续时间
import duration from "dayjs/plugin/duration";
// 处理相对时间的插件
import rTime from "dayjs/plugin/relativeTime";
/**
 * 将页面按照某种字段分类
 * @param pageData 页面分类数据
 * @param field 页面分类依据字段
 */
export function getPageClassifying(pageData: Post[], field: CategoryFieldType) {
  const data: Record<string, Post[]> = {};
  for (let i = 0; i < pageData.length; i++) {
    const el = pageData[i];
    const frontmatter = el?.frontmatter;
    let tag: string[] | undefined = undefined;
    if (frontmatter) {
      tag = frontmatter[field];
    }
    if (tag) {
      tag.forEach((item: string) => {
        if (!data[item]) {
          data[item] = [];
        }
        data[item].push(el);
      });
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
export function filterArticleWithField(articles: Post[], target: string, field: CategoryFieldType | ""): Post[] {
  return articles.filter((article) => {
    const frontmatter = article.frontmatter;
    if (frontmatter) {
      if (!frontmatter.title || frontmatter.index) {
        return false;
      }
      if (!target) {
        return true;
      }
      // 包含筛选条件
      let tag = frontmatter[field];
      if (tag) {
        return tag.includes(target);
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
}

// 全局使用中文
dayjs.locale("zh-cn");

// 对时间进行格式化
export function formatTime(data: any, type = "YYYY-MM-DD") {
  return dayjs(data).format(type);
}

dayjs.extend(rTime);
// 人性化时间格式
export const relativeTime = (value: any) => {
  return dayjs(value).fromNow();
};

dayjs.extend(duration)
// 人性化时间格式
export const durationTime = (value:any) => {
    return dayjs.duration(value)
}


const pattern
    = /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g
// 计算文章有多少个字
export function countWord(data: string) {
    const m = data.match(pattern)
    let count = 0
    if (!m) {
        return 0
    }
    for (let i = 0; i < m.length; i += 1) {
        if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length
        }
        else {
            count += 1
        }
    }
    return count
}
