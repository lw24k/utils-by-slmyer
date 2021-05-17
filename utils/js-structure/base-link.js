/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-17 21:07:45
 * @LastEditTime: 2021-05-17 23:02:02
 */

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // 向链表尾部推入元素
  push(element) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  //根据位置插入元素
  insert(element, position) {
    const node = new Node(element);
    if (position > -1 && position <= this.length) {
      if (position === 0) {
        let next = this.head;
        this.head = node;
        this.head.next = next;
      } else {
        let previous = null;
        let current = this.head;
        let index = 0;
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = node;
        node.next = current;
      }
      this.length++;
    }
  }

  //查找元素
  indexOf(element) {
    if (!this.head) {
      return -1;
    } else {
      let current = this.head;
      let index = 0;
      while (current) {
        if (current.element === element) {
          return index;
        }
        current = current.next;
        index++;
      }
      return -1;
    }
  }

  //removeAt
  removeAt(position) {
    if (position > -1 && position < this.length) {
      if (position === 0) {
        this.head = this.head.next;
      } else {
        let previous = null;
        let current = this.head;
        let index = 0;
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = current.next;
      }
      this.length--;
    }
  }

  remove(element) {
    const index = this.indexOf(element);
    if (index > -1) {
      this.removeAt(index);
    }
  }

  //获取元素位置
  getElementAt(element) {
    let previous = null;
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.element === element) {
        return index;
      }
      previous = current;
      current = current.next;
      index++;
    }
    return undefined;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  getHead() {
    return this.head;
  }
}

class DoublyNode extends Node {
  constructor(element) {
    super(element);
    this.prev = null;
  }
}

//双向链表
class DoublyLink {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  push(element) {
    this.insert(element, this.length);
  }

  insert(element, position) {
    const node = new DoublyNode(element);
    if (position > -1 && position <= this.length) {
      if (position === 0) {
        let next = this.head;
        this.head = node;
        this.head.next = next;
        if (next) {
          next.prev = this.head;
        }
      } else {
        let previous = null;
        let current = this.head;
        let index = 0;
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = node;
        node.prev = previous;
        if (current) {
          node.next = current;
          current.prev = node;
        }
      }
      this.length++;
    }
  }

  removeAt(position) {
    if (position > -1 && position < this.length) {
      if (position === 0) {
        if (this.head) {
          let next = this.head.next;
          this.head = next;
          if (next) {
            this.head.prev = null;
          }
        }
      } else {
        let previous = null;
        let current = this.head;
        let index = 0;
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = current.next;
        if (current.next) {
          current.next.prev = previous;
        }
      }
      this.length--;
    }
  }
}

//双向循环链表
class CircleLink {
  constructor() {
    this.head = null;
    this.tail = null; // 尾部引用
    this.length = 0;
  }

  push(element) {
    this.insert(element, this.length);
  }

  insert(element, position) {
    const node = new DoublyNode(element);
    if (position > -1 && position <= this.length) {
      if (position === 0) {
        let current = this.head;
        if (!current) {
          this.head = node;
          this.tail = node;
          this.head.prev = this.tail;
          this.tail.next = this.head;
        } else {
          this.head = node;
          this.head.next = current;
          current.prev = this.head;
          this.head.prev = this.tail;
        }
        this.tail.next = this.head;
      } else {
        let previous = null;
        let current = this.head;
        let index = 0;
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = node;
        node.prev = previous;
        node.next = current;
        if (current === this.head) {
          this.tail = node;
        }
      }
      this.length++;
    }
  }

  removeAt(position) {
    if (position > -1 && position < this.length) {
      if (position === 0) {
        if (this.head === this.tail) {
          this.tail = null;
          this.head = null;
        } else {
          let next = this.head.next;
          this.head = next;
          this.head.prev = this.tail;
          this.tail.next = this.head;
        }
      } else {
        let previous = null;
        let current = this.head;
        let index = 0;
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = current.next;
        current.next.prev = previous;
        if (current.next === this.head) {
          this.tail = previous;
        }
      }
      this.length--;
    }
  }
}
