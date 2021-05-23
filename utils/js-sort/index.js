/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-23 17:44:03
 * @LastEditTime: 2021-05-23 21:10:00
 */
const shufflely = require("shufflefy");

let arr = [];
let index = 1;

while (index <= 100) {
  arr.push(index);
  index++;
}

arr = shufflely(arr);

/**
 * @description: 交换数组索引位置
 * @param {*} arr
 * @param {*} i
 * @param {*} j
 * @return {*}
 */
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

/**
 * @description:  冒泡排序
 * @param {*}
 * @return {*}
 */
const popSort = (source) => {
  const length = source.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (source[j] > source[j + 1]) {
        swap(source, j, j + 1);
      }
    }
  }
  return source;
};

/**
 * @description:  选择排序
 * @param {*} source
 * @return {*}
 */
const selectSort = (source) => {
  const length = source.length;
  for (let i = 0; i < length; i++) {
    let index = i + 1;
    let min = source[i];
    while (index < length) {
      if (source[i] > source[index]) {
        swap(source, i, index);
      }
      index++;
    }
  }
  return source;
};

/**
 * @description:  插入排序
 * @param {*} source
 * @return {*}
 */
const insertSort = (source) => {
  const length = source.length;
  for (let i = 1; i < length; i++) {
    let index = i;
    while (index > 0) {
      if (source[index] < source[index - 1]) {
        swap(source, index - 1, index);
      }
      index--;
    }
  }
  return source;
};

const merge = (left, right) => {
  let result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }

  while (right.length) {
    result.push(right.shift());
  }

  return result;
};
/**
 * @description: 归并排序
 * @param {*} source
 * @return {*}
 */
const mergeSort = (source) => {
  const length = source.length;
  if (length < 2) {
    return source;
  }
  const middle = Math.floor(length / 2);
  const left = mergeSort(source.slice(0, middle));
  const right = mergeSort(source.slice(middle, length));
  return merge(left, right);
};

//

const partition = (arr, left, right) => {
  let pivot = arr[right - 1];
  let i = left;
  let j = right - 1;
  while (i !== j) {
    if (arr[i] < pivot) {
      i++;
    } else {
      swap(arr, i, --j);
    }
  }
  swap(arr, j, right - 1);
  return i;
};

/**
 * @description: 快排 以最后一个元素为基准点
 * @param {*} source
 * @return {*}
 */
const quickSort = (source, l, r) => {
  if (r - l <= 1) {
    return;
  }
  const p = partition(source, l, r);
  quickSort(source, l, p);
  quickSort(source, p + 1, r);
};
