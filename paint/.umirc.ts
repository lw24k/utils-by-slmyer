/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:22:10
 * @LastEditTime: 2021-05-10 21:41:37
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  sass: {},
  routes: [
    {
      exact: true,
      path: '/',
      component: '@/pages/Paint',
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
