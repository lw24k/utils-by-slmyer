const NewConstructor = function (fn, ...args) {
  if (typeof fn !== "function") {
    throw "not function";
  }
  let obj = new Object();
  obj.__proto__ = Object.create(fn.prototype);
  const result = fn.apply(obj, args);
  return typeof result === "object" && result !== null ? result : obj;
};
