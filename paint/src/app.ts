/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-06 17:35:21
 * @LastEditTime: 2021-05-06 17:35:21
 */
export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      console.error(e.message);
    },
  },
};
