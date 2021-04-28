/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:49:47
 * @LastEditTime: 2021-04-27 23:41:39
 */
import { MODE_TYPES } from './mode-types';
import CircleMode from './circle-mode';
import FreeMode from './free-mode';
/**
 * @description:
 * 全局画图模式构造工厂 为模式实例创建 全局共享方法以及属性
 * @param {*}
 * @return {*}
 */
export default class {
  static setGlobalConfig({ instance, control }) {
    this.instance = instance;
    this.control = control;
  }

  static excutor(mode) {
    switch (mode) {
      case MODE_TYPES.CIRCLE_MODE:
        return new CircleMode({
          instance: this.instance,
          control: this.control,
          mode,
        });

      case MODE_TYPES.FREE_MODE:
        return new FreeMode({
          instance: this.instance,
          control: this.control,
          mode,
        });
    }
  }
}
