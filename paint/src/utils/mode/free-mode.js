/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 23:05:06
 * @LastEditTime: 2021-04-28 21:22:43
 */
import BaseMode from './BaseMode';
export default class extends BaseMode {
  constructor({
    instance,
    mode,
    control,
    tempDrawingObjects,
    eventEmitHandler,
  }) {
    super({ instance, mode, control, tempDrawingObjects, eventEmitHandler });
  }
}
