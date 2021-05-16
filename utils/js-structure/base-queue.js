/*
 * @Descripttion:
   基于对象的队列
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-16 16:05:29
 * @LastEditTime: 2021-05-16 16:30:38
 */
class Queue {
  constructor() {
    this.items = {};
    this.count = 0;
    this.lowCount = 0;
  }
  //推入队列
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  isEmpty() {
    return this.count - this.lowCount === 0;
  }

  //队列从头删除元素
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    let index = this.lowCount;
    let res = this.items[index];
    this.lowCount++;
    delete this.items[index];
    return res;
  }
  //队头元素
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowCount];
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowCount = 0;
  }
}

/**
 * @description: 双端队列 同时遵循队列与栈的原则 先进先出 以及后进先出
 * @param {*}
 * @return {*}
 */
class Dqueue {
  constructor() {
    this.items = {};
    this.count = 0;
    this.lowCount = 0;
  }
  isEmpty() {
    return this.count - this.lowCount === 0;
  }

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else {
      for (let i = this.count; i > this.lowCount; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.items[this.lowCount] = element;
      this.count++;
    }
  }

  //与Queue一致
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    let index = this.lowCount;
    let res = this.items[index];
    this.lowCount++;
    delete this.items[index];
    return res;
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    let index = this.count;
    let res = this.items[index];
    this.lowCount--;
    delete this.items[index];
    return res;
  }

  size() {
    return this.count - this.lowCount;
  }
}
