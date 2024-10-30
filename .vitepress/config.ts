import { defineConfig } from 'vitepress';
import { tramsformHead } from './transform';
import basics from '../meta/basics.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh',
  srcDir: 'content',
  title: basics.name,
  titleTemplate: `:title | ${basics.name}`,
  description: basics.desc,
  transformPageData: (pageData) => {
    tramsformHead(pageData);
  },
});
