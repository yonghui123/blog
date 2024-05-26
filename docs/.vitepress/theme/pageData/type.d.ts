import { DefaultTheme } from "vitepress"

export interface Post{
  frontmatter?: any
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
  site: SideInfo
  showMusic: boolean
  music: Music[]
}

type StringArrayKeys<T> = {
  [K in keyof T]: T[K] extends string[] ? K : never;
}[keyof T];

export type CategoryFieldType = StringArrayKeys<PageMeta>

export type CategoryType = Pick<PageMeta, CategoryFieldType>

export type CategoryValuesType = CategoryType[CategoryFieldType]

export type ListLayout = 'grid' | 'list';

export interface ThemeConfig extends DefaultTheme.Config {
  site: SideInfo
  showMusic?: boolean
  music?: Music[]
}

export interface SideInfo {
  author?: string
  authorLink?: string

}

export interface Music {
  title?: string
  id: number
  author?: string
  url: string
  pic?: string
}