/*
 * @Descripttion: verityCode
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-26 22:52:52
 * @LastEditTime: 2021-04-26 23:03:00
 */

import _ from "loadsh";
const CodeTypes =
  "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5,6,7,8,9,0";

const canvasWidth = 121;
const canvasHeight = 42;
const codeLength = 4;
const codeFont = [
  "bold 20px Source Han Sans Regular",
  "bold 22px Source Han Sans Regular",
  "bold 24px Source Han Sans Regular",
];
/**
 * @description:
 *
 * @param {*}
 * id canvas id
 * height canvas height
 * width canvas width
 * @return {*}
 */
class VertifyCodes {
  constructor({
    id,
    width = canvasWidth,
    height = canvasHeight,
    isCase = true,
  }) {
    this.id = id;
    this.width = width;
    this.height = height;

    this.instance = null; // canvas instance
    this.context = null;

    this.codes = []; // code 缓存
    this.isCase = isCase; // 是否区分大小写
  }
  initDraw() {
    this.codes = [];
    this.instance = document.getElementById(this.id);
    this.instance.width = this.width;
    this.instance.height = this.height;
    this.context = this.instance.getContext("2d");
    const codeArry = CodeTypes.split(",");
    for (let i = 0; i < codeLength; i++) {
      let x = 20 + i * 25;
      let y = 20 + Math.random() * 8;
      let txt = this.randomUpperCase(_.sample(codeArry));
      this.codes.push(txt);
      this.context.font = _.sample(codeFont);
      let deg = (Math.random() * 30 * Math.PI) / 180;
      this.context.translate(x, y);
      this.context.rotate(deg);
      this.context.fillStyle = this.randomColor();
      this.context.fillText(txt, 0, 0);
      this.context.rotate(-deg);
      this.context.translate(-x, -y);
    }
    this.randomLine();
    this.randomPoint();

    //事件注册
    this.registerEvents();
  }
  // 随机色
  randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  // 随机画线
  randomLine() {
    for (let i = 0; i < 6; i++) {
      this.context.strokeStyle = this.randomColor();
      this.context.beginPath();
      this.context.moveTo(
        Math.random() * canvasWidth,
        Math.random() * canvasHeight
      );
      this.context.lineTo(
        Math.random() * canvasWidth,
        Math.random() * canvasHeight
      );
      this.context.stroke();
    }
  }
  //随即大写
  randomUpperCase(str) {
    if (isNaN(str)) {
      return Math.random() < 0.5 ? str : str.toUpperCase();
    } else {
      return str;
    }
  }

  randomPoint() {
    for (let i = 0; i <= 30; i++) {
      //验证码上显示小点
      this.context.strokeStyle = this.randomColor();
      this.context.beginPath();
      let x = Math.random() * canvasWidth;
      let y = Math.random() * canvasHeight;
      this.context.moveTo(x, y);
      this.context.lineTo(x + 1, y + 1);
      this.context.stroke();
    }
  }

  // 校验
  vertify(code) {
    if (this.isCase) {
      return code === this.codes.join("");
    } else {
      return code.toUpperCase() === this.codes.join("").toUpperCase();
    }
  }

  registerEvents() {
    //注册以及销毁点击事件
    this.instance.removeEventListener("click", this.handleClick);
    this.instance.addEventListener("click", this.handleClick);
  }

  handleClick = () => {
    // 清空画布 以及 重新生成
    this.context.clearRect(0, 0, this.width, this.height);
    this.initDraw();
  };
}
export default VertifyCodes;
