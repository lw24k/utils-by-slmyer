/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:22:10
 * @LastEditTime: 2021-04-29 21:18:48
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  sass: {},
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [{ exact: true, path: '/', component: '@/pages/index' }],
    },
  ],
  fastRefresh: {},
  alias: {
    components: '/src/components',
    common: '/src/common',
    icon: '/src/assets/icon',
    utils: '/src/utils',
  },
});
