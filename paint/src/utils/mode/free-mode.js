/*
 * @Descripttion:
There's also 2 properties available to customize free drawing — freeDrawingBrush.color and freeDrawingBrush.width. 
Both are available on Fabric canvas instances through freeDrawingBrush instance. freeDrawingBrush.color can be any regular color value and represents the color of a brush. 
freeDrawingBrush.width is a number in pixels, and represents brush thickness.
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 23:05:06
 * @LastEditTime: 2021-05-06 21:47:48
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
  updateControls(status) {
    if (!status) {
      this.clearCurrentModeDrawing();
    }
    this.instance.isDrawingMode = status;
    this.instance.freeDrawingBrush.color = this.baseStrokeColor;
    this.instance.freeDrawingBrush.width = this.baseStrokeWidth;
  }

  setDrawStyle({ color = this.baseStrokeColor, width = this.baseStrokeWidth }) {
    this.baseStrokeWidth = width;
    this.baseStrokeColor = color;
  }
}
