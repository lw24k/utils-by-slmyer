/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:51:00
 * @LastEditTime: 2021-04-27 23:28:43
 */

/**
 * @description:
 * 基础绘制模式类 提供通用共享方法
 * @param {
 * instance canvas 画布实例
 * mode 当前模式
 * control 模式管理器
 * }
 * @return {*}
 */
export default class {
  constructor({ instance, mode, control }) {
    this.instance = instance;
    this.mode = mode;
    this.control = control;
  }

  updateControls(status) {
    console.log(status, this.mode);
  }

  enterMode() {
    console.log(this.mode);
    this.control.updateStatus(this.mode, true);
  }
}
