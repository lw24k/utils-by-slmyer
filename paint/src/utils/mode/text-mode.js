/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-23 16:03:10
 * @LastEditTime: 2021-05-23 17:37:16
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
    initiveSend,
    requestData,
  }) {
    super({
      instance,
      mode,
      control,
      tempDrawingObjects,
      eventEmitHandler,
      initiveSend,
    });

    this.requestData = requestData;
  }

  async handleMouseDown(event) {
    if (!this.isModeActive()) {
      return false;
    }

    const pointer = this.instance.getPointer(event, false);
    console.log(pointer);
    const text = await this.requestData(this.mode);
    if (text) {
      const _text = this.createText(text, pointer);
      this.instance.add(_text);
      this.requestRender();
    }
  }

  createText(text, pointer) {
    const _text = new fabric.IText(text, {
      fontSize: this.baseTextSize,
      fontFamily: 'PingFang SC Regular',
      objectCaching: false,
      isWrapping: true,
      splitByGrapheme: true,
      shadow: 'rgb(0,0,0) 1px 1px 1px',
      fill: this.baseTextFillColor,
      top: pointer.y,
      left: pointer.x,
    });
    return _text;
  }
}
