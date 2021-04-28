/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:22:10
 * @LastEditTime: 2021-04-27 22:30:02
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  sass: {},
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
