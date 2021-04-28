/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:40:57
 * @LastEditTime: 2021-04-27 23:52:15
 */
import { fabric } from 'fabric';
import EventBus from 'events';
import ModeManager from '../../../utils/group-manager/manager-helper';
import ModeFactor from './mode/ModeFactor';
import { MODE_TYPES } from './mode/mode-types';
/**
 * @description:
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

    this.control = null;

    this.excutor = [];
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
    });
    Object.keys(MODE_TYPES).map((v) => {
      const mode = ModeFactor.excutor(v);
      this.excutor[v] = mode;
      console.log(v);
      this.proxy[v] = {
        active: false,
        exclude: ['*'],
        update: function (status) {
          mode.updateControls(status);
        },
      };
      console.log(this.proxy[v], '0');
    });
  }

  changeProxy = (name, status) => {
    if (this.proxy[name]) {
      this.proxy[name] = status;
    }
  };

  enterMode = (mode) => {
    this.excutor[mode].enterMode();
  };
}
