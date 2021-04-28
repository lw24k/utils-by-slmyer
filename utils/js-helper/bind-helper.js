/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 21:08:43
 * @LastEditTime: 2021-04-28 20:38:51
 */

/**
 * @description:
 * bind  改变this指向问题以及不会影响原函数返回
 * 当bind后的函数 使用new 进行构造时 之前的bind this会丢失 但是传入的参数不会丢失
 * 同时当我们对bind 之后的函数进行原型对象操作不会影响到本身的函数
 * @param {*}
 * @return {*}
 */

const _uniqueKey = Symbol();
Function.prototype.myBind = function () {
  const self = this;
  const context = Array.prototype.shift.call(arguments);
  const args = Array.prototype.slice.call(arguments);
  let _bindFunc = function () {
    const _args = Array.prototype.slice.call(arguments);
    context[_uniqueKey] = self;
    return context[_uniqueKey](args.concat(_args));
  };
  _bindFunc.prototype = Object.create(this.prototype);
  return _bindFunc;
};
