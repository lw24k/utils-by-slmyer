/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 23:05:06
 * @LastEditTime: 2021-04-29 00:01:44
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

    // 缓存记录相关位置信息
    this.position = {};
    this.startPoint = {};
    this.endPoint = {};
  }

  createCircle({ left, top, radius }) {}

  createDrawingCircle({ left, top, radius }) {
    console.log(left, top, radius, this.baseStrokeColor);
    const circle = new fabric.Circle({
      fill: 'transparent',
      strokeWidth: this.baseStrokeWidth,
      stroke: this.baseStrokeColor,
      strokeDashArray: [4, 2],
      objectCaching: false,
      radius,
      left,
      top,
    });

    return circle;
  }

  handleMouseDown(event) {
    if (!this.isModeActive()) {
      return false;
    }
    console.log(event, 111, this.instance);
    const point = this.instance.getPointer(event, false);
    console.log(point, 'pointpoint');
    if (!this.getDrawingObject()) {
      this.startPoint = point;
      const circle = this.createDrawingCircle({
        left: point.x,
        top: point.y,
        radius: 10,
      });
      this.setDrawingObject(circle);

      this.instance.add(circle);

      this.requestRender();
    }

    console.log('circle', event);
  }

  handleMouseMove(event) {
    if (!this.isModeActive()) {
      return;
    }
  }

  handleMouseMove(event) {
    console.log('circle', event);
  }

  handleDblClick(event) {
    console.log('circle', event);
    this.done();
  }

  done() {}
}
