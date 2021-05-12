/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-12 23:04:08
 * @LastEditTime: 2021-05-12 23:21:46
 */

//模拟栈操作 先进后出
class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  //推入方法
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  // 弹出方法
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    const index = --this.count;
    const result = this.items[index];
    delete this.items[index];
    return result;
  }
  //校验是否为空
  isEmpty() {
    return this.count === 0;
  }

  //返回长度
  size() {
    return this.count;
  }

  clear() {
    this.items = {};
    this.count = 0;
  }

  //返回栈顶元素
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let str = "";
    for (let i = 0; i < this.count; i++) {
      str += this.items[i] + (i !== this.count - 1 ? "," : "");
    }
    return str;
  }
}
