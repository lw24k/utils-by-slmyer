/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-05 13:50:04
 * @LastEditTime: 2021-05-06 17:34:46
 */
import { Effect, ImmerReducer, Reducer, Subscription, Action } from 'umi';
export interface StateType {
  activeMode: string;
}
export default {
  namespace: 'home',
  state: {
    activeMode: '',
    instace: null,
  },
  effects: {
    *enterMode({ payload }, { call, put }) {
      yield put({ type: 'changeMode', payload });
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
  },
};
