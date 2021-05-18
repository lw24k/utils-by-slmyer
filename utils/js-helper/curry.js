/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-18 19:52:22
 * @LastEditTime: 2021-05-18 20:41:55
 */

const curry = function (fn, ...args) {
  let len = fn.length;
  return function _curry(...rest) {
    let _args = [...args, ...rest];
    const length = _args.length;
    if (length < len) {
      return curry.call(this, fn, ..._args);
    } else {
      return fn.apply(this, _args);
    }
  };
};
