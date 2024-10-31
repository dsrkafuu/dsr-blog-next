import './styles/global.scss';
import './styles/fiximg.scss';
import { Theme } from 'vitepress';
import MainLayout from './MainLayout.vue';

// https://vitepress.dev/guide/custom-theme
export default {
  Layout: MainLayout,
} satisfies Theme;
