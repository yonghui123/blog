import { createContentLoader } from "vitepress";
import type { Post } from "./type";

declare const data: Post[];
export { data };

export default createContentLoader("src/**/*.md", {
  excerpt: true,
  transform(rowData): Post[] {
    return rowData.map(({url, frontmatter}) => {
      frontmatter.readTime = 0
      return {
        frontmatter: frontmatter,
        relativePath: url,
      }
    })
  }
})