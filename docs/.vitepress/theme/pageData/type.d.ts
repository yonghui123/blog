export interface Post{
  frontmatter?: PageMeta
  relativePath?: string
}


export interface PageMeta {
  index: boolean
  title: string
  date: string | Date
  cover: string
  categories: string[]
  tags: string[]
  description: string
}

type StringArrayKeys<T> = {
  [K in keyof T]: T[K] extends string[] ? K : never;
}[keyof T];

export type CategoryFieldType = StringArrayKeys<PageMeta>

export type CategoryType = Pick<PageMeta, CategoryFieldType>

export type CategoryValuesType = CategoryType[CategoryFieldType]

export type ListLayout = 'grid' | 'list';