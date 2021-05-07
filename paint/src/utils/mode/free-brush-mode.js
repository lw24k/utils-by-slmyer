/*
 * @Descripttion: 
  base http://fabricjs.com/freedrawing
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-07 21:09:41
 * @LastEditTime: 2021-05-07 22:01:03
 */
import { fabric } from 'fabric';
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
    this.baseMargin = 2;
  }
  updateControls(status) {
    if (!status) {
      this.clearCurrentModeDrawing();
    }
    this.instance.isDrawingMode = status;
    this.initBrush();
  }
  // 设置模式样式
  setDrawStyle({
    color = this.baseStrokeColor,
    width = this.baseStrokeWidth,
    margin = this.baseMargin,
  }) {
    this.baseStrokeWidth = width;
    this.baseFillColor = color;
    this.baseMargin = margin;
  }
  // 初始化 画笔 -- 画笔成块状
  initBrush() {
    let _brush = new fabric.PatternBrush(this.instance);
    _brush.getPatternSrc = () => {
      let _canvas = fabric.document.createElement('canvas');
      _canvas.width = _canvas.height = this.baseStrokeWidth + this.baseMargin;
      var ctx = _canvas.getContext('2d');
      ctx.fillStyle = this.baseFillColor;
      ctx.fillRect(0, 0, this.baseStrokeWidth, this.baseStrokeWidth);
      return _canvas;
    };

    this.instance.freeDrawingBrush = _brush;
    this.instance.freeDrawingBrush.source = _brush.getPatternSrc.call(
      this.instance,
    );
    this.instance.freeDrawingBrush.width = this.baseStrokeWidth;
  }
}
