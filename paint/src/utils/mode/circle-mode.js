/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 23:05:06
 * @LastEditTime: 2021-05-10 22:44:53
 */
import Color from 'color';
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

  createCircle({ left, top, radius }) {
    if (radius < 2) {
      radius = 5;
    }
    const circle = new fabric.Circle({
      fill: Color(this.baseFillColor).fade(0.9),
      fillColor: this.baseFillColor,
      strokeWidth: this.baseStrokeWidth,
      stroke: this.baseStrokeColor,
      objectCaching: false,
      evented: true,
      perPixelTargetFind: true,
      radius,
      left,
      top,
      custom: {
        mode: this.name,
        extend: this.extend,
        fillColor: this.baseFillColor,
        strokeWidth: this.baseStrokeWidth,
        stroke: this.baseStrokeColor,
        _unique: JSON.stringify(this.positionAttribute),
      },
    });
    return circle;
  }

  createDrawingCircle({ left, top, radius }) {
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
    const point = this.instance.getPointer(event, false);
    const circle = this.getDrawingObject();
    if (!circle) {
      this.startPoint = point;
      const circle = this.createDrawingCircle({
        left: point.x,
        top: point.y,
        radius: 1,
      });
      this.setDrawingObject(circle);

      this.instance.add(circle);

      this.requestRender();
    }
  }

  handleMouseMove(event) {
    if (!this.isModeActive()) {
      return false;
    }
    const circle = this.getDrawingObject();
    if (circle) {
      const pointer = this.instance.getPointer(event, false);
      let x = pointer.x - this.startPoint.x;
      let y = pointer.y - this.startPoint.y;
      let midx = (this.startPoint.x + pointer.x) / 2;
      let midy = (this.startPoint.y + pointer.y) / 2;
      let radius = Math.sqrt(x * x + y * y) / 2;
      circle
        .set('radius', Math.sqrt(x * x + y * y) / 2)
        .set('top', midy - radius)
        .set('left', midx - radius);

      this.positionAttribute = {
        radius: Math.sqrt(x * x + y * y) / 2,
        top: midy - radius,
        left: midx - radius,
      };
      this.requestRender();
    }
  }

  handleDblClick(event) {
    this.done();
  }

  done() {
    const _circle = this.getDrawingObject();
    if (_circle) {
      const circle = this.createCircle({ ...this.positionAttribute });
      this.clearCurrentModeDrawing();
      this.instance.add(circle);
      this.requestRender();
    }
  }
}
