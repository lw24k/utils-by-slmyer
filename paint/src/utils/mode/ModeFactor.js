/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:49:47
 * @LastEditTime: 2021-05-23 16:29:09
 */
import { MODE_TYPES } from './mode-types';
import CircleMode from './circle-mode';
import FreeMode from './free-mode';
import FreeBrushMode from './free-brush-mode';
import TextMode from './text-mode';

/**
 * @description:
 * 全局画图模式构造工厂 为模式实例创建 全局共享方法以及属性
 * @param {*}
 * @return {*}
 */
export default class {
  static setGlobalConfig({
    instance,
    control,
    tempDrawingObjects,
    eventEmitHandler,
    initiveSend,
    requestData,
  }) {
    this.instance = instance;
    this.control = control;
    this.tempDrawingObjects = tempDrawingObjects;
    this.eventEmitHandler = eventEmitHandler;
    this.initiveSend = initiveSend;
    this.requestData = requestData;
  }

  static excutor(mode) {
    switch (mode) {
      case MODE_TYPES.CIRCLE_MODE:
        return new CircleMode({
          instance: this.instance,
          control: this.control,
          mode,
          tempDrawingObjects: this.tempDrawingObjects,
          eventEmitHandler: this.eventEmitHandler,
          initiveSend: this.initiveSend,
        });

      case MODE_TYPES.FREE_MODE:
        return new FreeMode({
          instance: this.instance,
          control: this.control,
          mode,
          tempDrawingObjects: this.tempDrawingObjects,
          eventEmitHandler: this.eventEmitHandler,
          initiveSend: this.initiveSend,
        });
      case MODE_TYPES.FREE_BRUSH_MODE:
        return new FreeBrushMode({
          instance: this.instance,
          control: this.control,
          mode,
          tempDrawingObjects: this.tempDrawingObjects,
          eventEmitHandler: this.eventEmitHandler,
          initiveSend: this.initiveSend,
        });
      case MODE_TYPES.TEXT_MODE:
        return new TextMode({
          instance: this.instance,
          control: this.control,
          mode,
          tempDrawingObjects: this.tempDrawingObjects,
          eventEmitHandler: this.eventEmitHandler,
          initiveSend: this.initiveSend,
          requestData: this.requestData,
        });
    }
  }
}
