/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:22:59
 * @LastEditTime: 2021-05-07 22:00:49
 */
export default class {
  constructor(proxy, changeProxy) {
    this.proxy = proxy;
    this.changeProxy = changeProxy;
  }

  updateControls(mode, status) {
    if (this.proxy[mode]) {
      this.proxy[mode].update(status);
    }
  }

  /**
   *
   * @param {*} mode  模式名称
   * @param {*} status 状态
   * 对include 进行关联操作
   * exclude 取反操作
   * 匹配 * 字符
   */
  updateStatus(mode, status) {
    const control = this.proxy[mode];
    if (control) {
      const names = Object.keys(this.proxy).filter((name) => name !== mode);
      const { include, exclude } = control;
      if (status) {
        control.active = status;
        if (Array.isArray(exclude)) {
          if (exclude.includes("*")) {
            names.map((key) => {
              this.changeProxy(key, false);
              this.updateControls(key, false);
            });
          } else {
            exclude.map((key) => {
              this.changeProxy(key, false);
              this.updateControls(key, false);
            });
          }
        }
        if (Array.isArray(include)) {
          if (include.includes("*")) {
            names.map((key) => {
              this.changeProxy(key, true);
              this.updateControls(key, true);
            });
          } else {
            include.map((key) => {
              this.changeProxy(key, true);
              this.updateControls(key, true);
            });
          }
        }
      } else {
        control.active = status;
        if (Array.isArray(exclude)) {
          if (exclude.includes("*")) {
            names.map((key) => {
              this.changeProxy(key, false);
              this.updateControls(key, false);
            });
          } else {
            exclude.map((key) => {
              this.changeProxy(key, false);
              this.updateControls(key, false);
            });
          }
        }
        if (Array.isArray(include)) {
          if (include.includes("*")) {
            names.map((key) => {
              this.changeProxy(key, false);
              this.updateControls(key, false);
            });
          } else {
            include.map((key) => {
              this.changeProxy(key, false);
              this.updateControls(key, false);
            });
          }
        }
      }
    }
    this.changeProxy(mode, status);
    this.updateControls(mode, status);
  }

  resetMode() {
    Object.keys(this.proxy).map((key) => {
      this.changeProxy(key, false);
      this.updateControls(key, false);
    });
  }
}
