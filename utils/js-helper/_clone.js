/*
 * @Descripttion: js _cloneDeep
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-26 23:06:40
 * @LastEditTime: 2021-04-27 22:09:45
 */

/**
 * @description: cloneDeep
 * 判断类型以及解决是否循环引用问题
 * weakMap 弱引用
 * @param {*} target
 * @param {*} map
 * @return {*}
 */
const cloneArrayAndObject = (target, map = new WeakMap()) => {
  const cloneTarget = Array.isArray(target) ? [] : {};
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);
  for (const key in target) {
    cloneTarget[key] = _cloneDeep(target[key], map);
  }
  return cloneTarget;
};
/**
 * @description:
 * @param {*} target 拷贝对象
 * @param {*} map 弱引用map
 * @return {*} 深拷贝对象
 */
const _cloneDeep = (target, map = new WeakMap()) => {
  if (target instanceof Object) {
    let type = Object.prototype.toString
      .call(target)
      .split(" ")[1]
      .split("]")[0];
    switch (type) {
      case "Array":
        return cloneArrayAndObject(target, map);
      case "Object":
        return cloneArrayAndObject(target, map);
      case "Date":
        return new Date(target);
      case "RegExp":
        return new RegExp(target);
    }
  } else {
    return target;
  }
};
