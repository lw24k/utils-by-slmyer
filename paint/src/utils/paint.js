/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:40:57
 * @LastEditTime: 2021-04-28 21:21:45
 */
import { fabric } from 'fabric';
import EventBus from 'events';
import ModeManager from '../../../utils/group-manager/manager-helper';
import ModeFactor from './mode/ModeFactor';
import { MODE_TYPES } from './mode/mode-types';
/**
 * @description:
 * 引入模式管理器 ， 并不关心模式的外的逻辑 ，只处理内部状态的更新以及调用更新函数指令
 * base基类 提供通用 绘制模式的方法
 * @param {*}
 * id canvasid
 * width
 * height
 * requestData // 异步获取数据方法
 * @return {*}
 */
export default class extends EventBus {
  constructor({ id, width, height, requestData }) {
    super();

    this._id = id;

    this.width = width;
    this.height = height;

    this.requestData = requestData;

    this.proxy = {};

    this.control = null; // 模式状态管理器

    this.excutor = []; // 模式执行器

    this.tempDrawingObjects = new WeakMap();
  }

  init() {
    const instance = new fabric.Canvas(this._id, {
      width: this.width,
      height: this.height,
    });

    this.instance = instance;

    this.initModeManager();
  }

  initModeManager() {
    this.control = new ModeManager(this.proxy, this.changeProxy);
    ModeFactor.setGlobalConfig({
      instance: this.instance,
      control: this.control,
      tempDrawingObjects: this.tempDrawingObjects,
      eventEmitHandler: this.eventEmitHandler,
    });
    Object.keys(MODE_TYPES).map((v) => {
      const mode = ModeFactor.excutor(v);
      this.excutor[v] = mode;
      console.log(v);
      this.proxy[v] = {
        active: false,
        name: v,
        exclude: ['*'],
        update: (status) => mode.updateControls(status),
      };
    });
  }

  changeProxy = (name, status) => {
    if (this.proxy[name]) {
      this.proxy[name].active = status;
    }
  };

  enterMode = (mode) => {
    this.excutor[mode].enterMode();
  };

  clearAllDrawingObject() {
    this.tempDrawingObjects = new WeakMap();
  }

  //模式事件处理器 暴露为全局方法
  eventEmitHandler = (type, msg) => {
    console.log(type, msg);
    switch (type) {
      case 'message':
        this.emit('message', msg);
        break;
    }
  };
}
