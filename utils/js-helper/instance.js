/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-26 21:03:06
 * @LastEditTime: 2021-04-27 21:07:17
 */
const Instance = (target, source) => {
  try {
    const _prototype = source.prototype;
    return _prototype.isPrototypeOf(target);
  } catch (e) {
    throw new Error(e);
  }
};

const InstanceBy = (target, source) => {
  try {
    if (target === null) {
      return false;
    }
    const baseType = ["string", "number", "boolean", "undefined", "symbol"];
    if (baseType.includes(typeof target)) {
      return false;
    }
    let _p = Object.getPrototypeOf(target);

    while (true) {
      if (_p === null) {
        return false;
      }
      if (_p === source.prototype) {
        return true;
      }
      _p = Object.getPrototypeOf(_p);
    }
  } catch (e) {
    throw new Error(e);
  }
};
