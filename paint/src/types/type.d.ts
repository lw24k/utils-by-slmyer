/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-07 20:35:09
 * @LastEditTime: 2021-05-10 20:21:13
 */

export interface HomeState {
  activeMode: string;
  panelVisible: boolean;
  instance: any;
  mode: string;
}

export interface GlobalState {
  instance: InstanceType | null;
}

export interface ConnectState {
  home: HomeState;,
  global: GlobalState
}

export interface InstanceType {
  init: Function;
  changeCanvasSize: Function;
  enterMode: Function;
  dispose: Function;
  [propName: string]: Function;
}
