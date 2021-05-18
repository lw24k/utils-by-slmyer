/*
 * @Descripttion:
 * @version:  compose 函数 后一个参数是前一个参数的入参 redux applymiddleware
 * @Author: slmyer
 * @Date: 2021-05-07 22:29:02
 * @LastEditTime: 2021-05-18 20:41:39
 */

const compose = (...fns) => {
  if (fns.length === 0) {
    return (arg) => arg;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduce((a, c) => (...args) => a(c(...args)));
};

const _compose = (...fns) => {
  let index = fns.length - 1;
  return (...args) => {
    let result = fns.length > 0 ? fns[index].apply(this, args) : args;
    while (index-- > 0) {
      result = fns[index].call(this, result);
    }
    return result;
  };
};
