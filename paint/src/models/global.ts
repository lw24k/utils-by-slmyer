/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-10 20:01:50
 * @LastEditTime: 2021-05-10 21:59:39
 */
import { Effect, Reducer, Subscription, Action } from 'umi';
import { GlobalState } from './../types/type.d';

interface globalStateType {
  namespace: 'global';
  state: GlobalState;
  effects: {};
  reducers: {
    setInstance: Reducer<GlobalState>;
  };
}
const globalState: globalStateType = {
  namespace: 'global',
  state: {
    instance: null,
  },
  effects: {},
  reducers: {
    setInstance: (state, { payload, action }) => {
      console.log(payload, 'payloadpayload');
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default globalState;
