const Instance = (target, source) => {
  if (!source || !target) {
    throw "error";
  }
  const _prototype = source.prototype;
  return _prototype.isPrototypeOf(target);
};

const InstanceBy = (target, source) => {
  if (!source || !target) {
    throw "error";
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
};
