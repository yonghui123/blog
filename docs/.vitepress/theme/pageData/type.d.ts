export interface Post{
  frontmatter?: Record<string, any>
  relativePath?: string
}


export interface PageMeta {
  title: string
  date?: string | Date
  cover?: string
  categories?: string[]
  tags?: string[]
  description?: string
}