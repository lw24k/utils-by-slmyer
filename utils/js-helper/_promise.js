/*
 * @Descripttion:
  接受一个可迭代类型 、 返回一个promise实例 同时当出现一个为rejected 则立即中断返回reject
  当可迭代对象中包含不是promise的元素是直接resolve
  限制并发数量 limit
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-09 20:32:43
 * @LastEditTime: 2021-05-09 22:09:32
 */
const _myAll = (args, limit = 1) => {
  if (typeof args[Symbol.iterator] !== "function") {
    throw new Error("not an iterator object");
    return false;
  }
  return new Promise((resolve, reject) => {
    let stack = [...args];
    const result = [];
    let temp = 0;
    let _count = 1;
    const checkHandle = () => {
      return temp === args.length;
    };

    const next = () => {
      while (_count > 0 && _count <= limit && stack.length) {
        let v = stack.shift();
        _count++;
        if (v instanceof Promise) {
          v.then((res) => {
            result[temp] = res;
            temp++;
            _count--;
            checkHandle() && resolve(result);
            next();
          }).catch((e) => {
            _count--;
            result.push(reject);
            reject(e);
          });
        } else {
          temp++;
          _count--;
          result[temp] = res;
          checkHandle() && resolve(result);
          next();
        }
      }
    };
    next();
  });
};
