/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-05 13:50:04
 * @LastEditTime: 2021-05-06 21:05:49
 */
import { Effect, ImmerReducer, Reducer, Subscription, Action } from 'umi';
export interface StateType {
  activeMode: string;
  panelVisible: boolean;
  instance: any;
  mode: string;
}
export default {
  namespace: 'home',
  state: {
    activeMode: '',
    instace: null,
    panelVisible: false,
    mode: '',
  },
  effects: {
    *enterMode({ payload }, { call, put }) {
      yield put({ type: 'changeMode', payload });
      yield put({ type: 'setVisible', payload: true });
      // instance.enterMode(payload);
    },
  },
  reducers: {
    changeMode: (state: StateType, { payload, action }) => {
      return {
        ...state,
        activeMode: payload,
      };
    },
    setInstance: (state: StateType, { payload }) => {
      console.log(payload, '---');
      return {
        ...state,
        instance: payload,
      };
    },
    setVisible: (state: StateType, { payload }) => {
      return {
        ...state,
        panelVisible: payload,
      };
    },
    setDrawMode: (state: StateType, { payload }) => {
      return {
        ...state,
        mode: payload,
      };
    },
  },
};
