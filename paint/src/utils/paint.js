/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:40:57
 * @LastEditTime: 2021-04-29 09:19:07
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
  constructor({ id, width, height, requestData, zoom = 1 }) {
    super();

    this._id = id;

    this.width = width;
    this.height = height;

    this.requestData = requestData;

    this.proxy = {};

    this.control = null; // 模式状态管理器

    this.excutor = []; // 模式执行器

    //临时绘制对象暂存
    this.tempDrawingObjects = new WeakMap();

    this.ready = false; // 画板实例构造标志位

    this.forbidden = true;

    this.zoom = zoom;
  }

  init() {
    fabric.Object.prototype.selectable = !this.forbidden; // 设定fabric默认不可选择
    fabric.Object.prototype.hasControls = false;
    fabric.Object.prototype.evented = false; // 禁止元素事件
    const instance = new fabric.Canvas(this._id, {
      width: this.width,
      height: this.height,
      allowTouchScrolling: false, // 允许移动端touch滚动
      selectionFullyContained: true,
      selection: this.forbidden ? false : true,
      hoverCursor: 'pointer',
    });

    this.instance = instance;

    this.instance.setZoom(this.zoom);

    //初始化模式管理器
    this.initModeManager();

    // 初始化事件注册
    this.registerEventsHandler();

    this.ready = true;

    this.emit('onReady', this.ready);
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

  //Sets dimensions (width, height) of this canvas instance
  //canvas 画布实例尺寸变化
  changeCanvasSize = ({ width, height, ratio }) => {
    if (this.ready) {
      this.instance.setDimensions({ width, height });
      this.instance.setZoom(this.zoom * ratio);
      this.instance.absolutePan({ x: 0, y: 0 });
    }
  };

  // 画布实例销毁
  dispose() {
    this.instance.dispose();
    this.instance = null;
  }

  registerEventsHandler = () => {
    this.instance.on({
      'mouse:down': this.handleMouseDown,
      'mouse:up': this.handleMouseUp,
      'mouse:move': this.handleMouseMove,
      'mouse:dblclick': this.handleDblClick,
    });
  };

  // 鼠标事件入口
  handleMouseDown = (event) => {
    console.log(event, this.instance.getPointer(event), 'ppp');
    Object.values(this.excutor).map((excutor) => {
      excutor.handleMouseDown(event);
    });
  };

  handleMouseUp = (event) => {
    Object.values(this.excutor).map((excutor) => {
      excutor.handleMouseUp(event);
    });
  };

  handleMouseMove = (event) => {
    Object.values(this.excutor).map((excutor) => {
      excutor.handleMouseMove(event);
    });
  };

  handleDblClick = (event) => {
    Object.values(this.excutor).map((excutor) => {
      excutor.handleDblClick(event);
    });
  };

  // 画布选中功能禁用
  toggleSelectStatus() {
    this.forbidden = !this.forbidden;
    if (this.forbidden) {
      this.instance.discardActiveObject();
    }
    fabric.Object.prototype.selectable = !this.forbidden;
    this.instance.selection = !this.forbidden;
    this.instance.requestRenderAll();
  }
}
