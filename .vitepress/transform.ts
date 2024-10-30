import type { PageData } from 'vitepress';
import basics from '../meta/basics.json';
import assets from '../meta/assets.json';

export const tramsformHead = (pageData: PageData) => {
  if (!pageData.frontmatter.head) {
    pageData.frontmatter.head = [];
  }
  console.log(111, import.meta.env);

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
};
