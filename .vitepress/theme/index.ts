import './styles/global.scss';
import './styles/fiximg.scss';

import { Theme } from 'vitepress';
import Layout from './Layout.vue';

/**
 * https://vitepress.dev/guide/custom-theme
 */
export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme;
