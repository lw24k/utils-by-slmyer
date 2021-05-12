/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:40:57
 * @LastEditTime: 2021-05-12 22:41:28
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

    this.revokeObjects = [];
  }

  init() {
    fabric.Object.prototype.selectable = !this.forbidden; // 设定fabric默认不可选择
    fabric.Object.prototype.hasControls = false;
    // fabric.Object.prototype.evented = false; // 禁止元素事件
    const instance = new fabric.Canvas(this._id, {
      width: this.width,
      height: this.height,
      allowTouchScrolling: false, // 允许移动端touch滚动
      selectionFullyContained: true,
      selection: this.forbidden ? false : true,
      hoverCursor: 'pointer',
      perPixelTargetFind: true,
      evented: true,
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
      initiveSend: this.initiveSend,
    });
    Object.keys(MODE_TYPES).map((v) => {
      const mode = ModeFactor.excutor(v);
      this.excutor[v] = mode;
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
    if (mode) {
      this.toggleSelectStatus(true);
      this.excutor[mode].enterMode();
      this.emit('enterMode', true);
      return true;
    }
    return false;
  };

  clearAllDrawingObject() {
    this.tempDrawingObjects = new WeakMap();
  }

  //模式事件处理器 暴露为全局方法
  eventEmitHandler = (type, { mType, msg }) => {
    console.log(type, msg);
    switch (type) {
      case 'message':
        this.emit('message', {
          mType,
          msg,
        });
        break;
    }
  };

  //Sets dimensions (width, height) of this canvas instance
  //canvas 画布实例尺寸变化
  changeCanvasSize = ({ width, height, ratio }) => {
    console.log(ratio, this.zoom);
    if (this.ready) {
      this.instance.setDimensions({ width, height });
      this.instance.setZoom(this.zoom * (width / this.width));
      this.instance.absolutePan({ x: 0, y: 0 });
      // this.width = width;
      // this.height = height;
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

  // 画布选中功能禁用/ 开启
  toggleSelectStatus(flag) {
    this.forbidden = flag || !this.forbidden;
    if (this.forbidden) {
      this.instance.discardActiveObject();
    }
    fabric.Object.prototype.selectable = !this.forbidden;
    this.instance.selection = !this.forbidden;
    this.resetMode();
    this.instance.requestRenderAll();
  }

  leaveMode = (mode) => {
    if (mode) {
      this.excutor[mode].leaveMode();
      this.emit('leaveMode', true);
      return true;
    }
    return false;
  };

  // 清空画布
  clearInstance() {
    this.clearAllDrawingObject();
    // this.instance.remove(...this.instance.getObjects());
    this.instance.clear();
    this.instance.requestRenderAll();
    return true;
  }

  //重置模式
  resetMode() {
    this.control.resetMode();
  }

  // 删除单个选中
  deleteObject() {
    const target = this.instance.getActiveObject();
    if (target) {
      this.instance.remove(target);
      this.instance.requestRenderAll();
      return true;
    }
    return false;
  }

  // 回退上一步操作
  revokeObject() {
    const len = this.instance.getObjects().length;
    if (len === 0) {
      this.eventEmitHandler('message', {
        mType: 'warn',
        msg: '暂无可回退操作',
      });
      return;
    } else {
      const _target = this.instance.getObjects()[len - 1];
      this.revokeObjects.push(_target);
      this.instance.remove(_target);
      this.instance.requestRenderAll();
    }
  }

  // 撤销上一步操作
  rebackObject() {
    const len = this.revokeObjects.length;
    if (len === 0) {
      this.eventEmitHandler('message', {
        mType: 'warn',
        msg: '暂无可撤销操作',
      });
      return;
    } else {
      const _target = this.revokeObjects.pop();
      this.instance.add(_target);
      this.instance.requestRenderAll();
    }
  }

  //h绘制结束事件以及主动推送入口
  initiveSend = () => {
    this.revokeObjects = [];
  };

  setBackgroundImage(file) {
    fabric.Image.fromURL(file, (oImg) => {
      // scale image down, and flip it, before adding it onto canvas
      if (oImg) {
        let width = oImg.width;
        let height = oImg.height;
        const _wratio = this.width / width;
        const _hratio = this.height / height;
        let scaleY = 1;
        let scaleX = 1;
        let left = 0;
        let top = 0;
        if (oImg.width > this.width || oImg.height > this.height) {
          if (_wratio > _hratio) {
            scaleX = _hratio;
            scaleY = _hratio;
            left = (this.width - width * scaleY) / 2;
          } else {
            scaleX = _wratio;
            scaleY = _wratio;
            left = (this.height - height * scaleX) / 2;
          }
        } else {
          left = (this.width - width) / 2;
          top = (this.height - height) / 2;
        }
        this.instance.setBackgroundImage(
          oImg,
          this.instance.renderAll.bind(this.instance),
          {
            imageSmoothing: true,
            left,
            top,
            objectCaching: false,
            scaleX,
            scaleY,
          },
        );
      } else {
        this.eventEmitHandler('message', {
          mType: 'warn',
          msg: '导入图片失败',
        });
        return;
      }
    });
  }

  //export canvas
  exportCanvas(format = 'png', quality = 1, width = 1920, height = 1080) {
    //默认按画布比例导出
    const target = this.instance.toDataURL({
      format,
      quality,
      width: width * this.instance.getZoom(),
      height: height * this.instance.getZoom(),
    });
    const transitionToBlob = (dataurl) => {
      const minestr = atob(dataurl.split(',')[1]);
      const minetype = dataurl.split(',')[0].split(':')[1].split(';')[0];

      // create ArrayBuffer
      const ab = new ArrayBuffer(minestr.length);

      // create an array of 8-bit unsigned integers
      const ua = new Uint8Array(ab);

      for (let i = 0; i < minestr.length; i++) {
        ua[i] = minestr.charCodeAt(i);
      }

      return new Blob([ua], { type: minetype });
    };
    const res = transitionToBlob(target);
    return {
      dataurl: target,
      blob: res,
    };
  }
}
