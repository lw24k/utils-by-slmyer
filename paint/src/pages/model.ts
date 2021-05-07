/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-05 13:50:04
 * @LastEditTime: 2021-05-07 21:04:41
 */
import { Effect, Reducer, Subscription, Action } from 'umi';
import { HomeState } from '../types/type';
export interface HomeModelType {
  namespace: 'home';
  state: HomeState;
  effects: {
    enterMode: Effect;
  };
  reducers: {
    changeMode: Reducer<HomeState>;
    setInstance: Reducer<HomeState>;
    setVisible: Reducer<HomeState>;
    setDrawMode: Reducer<HomeState>;
  };
}
const homeModel: HomeModelType = {
  namespace: 'home',
  state: {
    activeMode: '',
    instance: null,
    panelVisible: false,
    mode: '',
  },
  effects: {
    *enterMode({ payload }, { call, put }) {
      yield put({ type: 'changeMode', payload });
      yield put({ type: 'setVisible', payload: { panelVisible: true } });
      // instance.enterMode(payload);
    },
  },
  reducers: {
    changeMode: (state, { payload, action }) => {
      return {
        ...state,
        ...payload,
      };
    },
    setInstance: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    setVisible: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
    setDrawMode: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default homeModel;
