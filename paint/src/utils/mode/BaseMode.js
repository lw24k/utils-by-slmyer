/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:51:00
 * @LastEditTime: 2021-04-28 21:21:36
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
  constructor({
    instance,
    mode,
    control,
    tempDrawingObjects,
    eventEmitHandler,
  }) {
    this.instance = instance;
    this.mode = mode;
    this.control = control;
    this.tempDrawingObjects = tempDrawingObjects;
    this.eventEmitHandler = eventEmitHandler;
  }

  // 模式状态切换 更新指令
  updateControls(status) {
    this.eventEmitHandler('message', 'gengxin');
    if (!status) {
      this.clearCurrentModeDrawing();
    }
  }

  //进入模式
  enterMode() {
    this.control.updateStatus(this.mode, true);
  }

  //获取当前绘制对象
  getDrawingObject() {
    return this.tempDrawingObjects.get(this.mode);
  }

  // 设置绘制对象 提供缓存
  setDrawingObject(obj) {
    this.tempDrawingObjects.set(this.name, obj);
  }

  // 判断模式是否开启
  isModeActive() {
    return this.control.proxy[this.mode].active || false;
  }

  //清空临时绘制对象 用于模式切换时
  clearCurrentModeDrawing() {
    const _obj = this.tempDrawingObjects.get(this.mode);
    if (_obj) {
      this.instance.remove(_obj);
      this.tempDrawingObjects.delete(this.mode);
    }
  }
}
