/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:51:00
 * @LastEditTime: 2021-04-29 17:04:09
 */

const BASE_FILL_COLOR = 'red';
const BASE_STROKE_COLOR = 'red';
const BASE_STROKE_WIDTH = 2;

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

    this.baseFillColor = BASE_FILL_COLOR;
    this.baseStrokeColor = BASE_STROKE_COLOR;
    this.baseStrokeWidth = BASE_STROKE_WIDTH;

    this.Symbolkey = new Object(Symbol.for(this.mode));
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

  // 刷新画布
  requestRender() {
    this.instance.requestRenderAll();
  }

  //获取当前绘制对象
  getDrawingObject() {
    const key = this.Symbolkey;
    return this.tempDrawingObjects.get(key);
  }

  // 设置绘制对象 提供缓存
  setDrawingObject(obj) {
    const key = this.Symbolkey;
    this.tempDrawingObjects.set(key, obj);
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

  handleMouseDown(event) {
    console.log('base', event, '---');
  }

  handleMouseUp = (event) => {
    console.log(event, 'e');
  };

  handleMouseMove = (event) => {};

  handleDblClick = (event) => {
    console.log(event, 'dbl');
  };
}
