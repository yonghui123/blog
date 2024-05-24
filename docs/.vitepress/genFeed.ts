import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'

const baseUrl = `https://blog.vuejs.org`

export async function genFeed(config: SiteConfig) {
  console.log('config: ', config);
  const feed = new Feed({
    title: 'Yonghui Zhao',
    description: '技术分享博客',
    id: baseUrl,
    link: baseUrl,
    language: 'zh',
    image: 'https://vuejs.org/images/logo.png',
    favicon: `${baseUrl}/favicon.ico`,
    copyright:
    'Copyright (c) 2021-present, Yuxi (Evan) You and blog contributors'
  })
  console.log('feed: ', feed);
  
  const posts = await createContentLoader('**/*.md', {
    excerpt: true,
    render: true
  }).load()

  console.log('posts: ', posts);
  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string)
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      date: frontmatter.date
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}