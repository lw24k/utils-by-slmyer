/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-29 20:55:41
 * @LastEditTime: 2021-05-07 21:09:03
 */
import { MODE_TYPES } from '../mode/mode-types';
import mode from 'icon/mode.png';
import clear from 'icon/clear.png';
import select from 'icon/select.png';

import circle from 'icon/circle.png';
import free from 'icon/free.png';
import mosaic from 'icon/mosaic.png';
export interface Type {
  title: string;
  value: string;
  icon: any;
}

const MODE_MENU: Array<Type> = [
  {
    title: '模式',
    value: 'mode',
    icon: mode,
  },
  {
    title: '选择',
    value: 'select',
    icon: select,
  },
  {
    title: '清空',
    value: 'clear',
    icon: clear,
  },
];

const MODE_CONTROL = {
  mode: {
    title: '模式选择',
    icons: [
      {
        title: '画圆',
        value: 'circle',
        icon: circle,
        mode: MODE_TYPES.CIRCLE_MODE,
      },
      {
        title: '涂鸦',
        value: 'free',
        icon: free,
        mode: MODE_TYPES.FREE_MODE,
      },
      {
        title: '马赛克',
        value: 'mosaic',
        icon: mosaic,
        mode: MODE_TYPES.FREE_BRUSH_MODE,
      },
    ],
  },
};

export { MODE_MENU, MODE_CONTROL };
