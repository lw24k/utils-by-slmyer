import { ConnectProps } from './../.umi/plugin-dva/connect';
/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-07 20:35:09
 * @LastEditTime: 2021-05-07 21:28:13
 */

export interface HomeState {
  activeMode: string;
  panelVisible: boolean;
  instance: any;
  mode: string;
}

export interface ConnectState {
  home: HomeState;
}

export interface InstanceType {
  init: Function;
  changeCanvasSize: Function;
  enterMode: Function;
  dispose: Function;
}
