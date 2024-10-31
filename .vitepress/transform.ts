import { join } from 'path';
import { existsSync } from 'fs';
import { cwd } from 'process';
import { PageData } from 'vitepress';
import basics from '../meta/basics.json';
import assets from '../meta/assets.json';

export const tramsformHead = (pageData: PageData) => {
  if (!pageData.frontmatter.head) {
    pageData.frontmatter.head = [];
  }

  // 首页路径只有 index.md
  const isHome = pageData.relativePath === 'index.md';
  // 文章路径以 post/ 开头
  const isPost = pageData.relativePath.startsWith('post/');
  // 页面地址前缀
  const prefixPath = isHome ? '/' : pageData.relativePath.split('/index.md')[0];
  // 首页/文章标题不同处理
  const pageTitle = isHome
    ? pageData.title
    : `${pageData.title} | ${basics.name}`;
  // 在文件夹内且为 index.md 的说明有 banner 图
  const bannerPath = join(cwd(), 'content', prefixPath, 'index.webp');
  const bannerExist = existsSync(bannerPath);
  let opengraph = new URL(basics.opengraph, basics.baseURL);
  if (bannerExist) {
    opengraph = new URL(`${prefixPath}/index.webp`, basics.baseURL);
  }
  // 文章发布和更新时间
  const updateTime = pageData.frontmatter.date;
  const publishTime = pageData.frontmatter.pubdate || updateTime;

  // basics
  pageData.frontmatter.head.push([
    'meta',
    { name: 'author', content: basics.author },
  ]);
  if (Array.isArray(pageData.frontmatter.keywords)) {
    pageData.frontmatter.head.push([
      'meta',
      { name: 'keywords', content: pageData.frontmatter.keywords.join(',') },
    ]);
  }
  pageData.frontmatter.head.push([
    'link',
    { rel: 'icon', sizes: 'any', href: assets.favicon_icon },
  ]);
  pageData.frontmatter.head.push([
    'link',
    { rel: 'apple-touch-icon', sizes: '180x180', href: assets.favicon_apple },
  ]);

  // stylesheets
  pageData.frontmatter.head.push([
    'link',
    { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
  ]);
  pageData.frontmatter.head.push([
    'link',
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  ]);
  pageData.frontmatter.head.push([
    'link',
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
  ]);
  pageData.frontmatter.head.push([
    'link',
    { rel: 'stylesheet', href: assets.google_fonts },
  ]);

  // twitter
  pageData.frontmatter.head.push([
    'meta',
    { name: 'twitter:card', content: 'summary_large_image' },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    { name: 'twitter:site', content: basics.twitter_id },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    { name: 'twitter:title', content: pageTitle },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    { name: 'twitter:description', content: pageData.description },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    { name: 'twitter:image', content: `${opengraph}` },
  ]);

  // opengraph
  pageData.frontmatter.head.push([
    'meta',
    { property: 'og:type', content: isPost ? 'article' : 'website' },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    { property: 'og:title', content: pageTitle },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    { property: 'og:description', content: pageData.description },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    { property: 'og:image', content: `${opengraph}` },
  ]);
  pageData.frontmatter.head.push([
    'meta',
    { property: 'og:url', content: `${new URL(prefixPath, basics.baseURL)}` },
  ]);

  // seo meta
  if (publishTime) {
    pageData.frontmatter.head.push([
      'meta',
      { property: 'article:published_time', content: publishTime },
    ]);
  }
  if (updateTime) {
    pageData.frontmatter.head.push([
      'meta',
      { property: 'article:modified_time', content: updateTime },
    ]);
  }
};
