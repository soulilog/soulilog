import type {Theme} from 'vitepress'
import DefaultTheme from "vitepress/theme";
import Layout from './Layout.vue'

import './style.scss';

export default {
    extends: DefaultTheme,
    Layout,
    // enhanceApp({ app, router, siteData }) {},
} satisfies Theme;
