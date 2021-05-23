/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-29 20:55:41
 * @LastEditTime: 2021-05-23 16:06:02
 */
import { MODE_TYPES } from '../mode/mode-types';
import mode from 'icon/mode.png';
import clear from 'icon/clear.png';
import select from 'icon/select.png';
import _delete from 'icon/delete.png';
import upload from 'icon/upload.png';
import reback from 'icon/reback.png';
import revoke from 'icon/revoke.png';
import exportIcon from 'icon/export.png';

import circle from 'icon/circle.png';
import free from 'icon/free.png';
import mosaic from 'icon/mosaic.png';
import font from 'icon/font.png';
export interface SingleType {
  title: string;
  value: string;
  icon: any;
  mode?: string;
  isActiveFunc?: boolean;
  [propName: string]: any;
}

interface DrawType {
  title: string;
  value: string;
  icon: any;
  icons: Array<SingleType>;
}

interface ControlType {
  [propName: string]: DrawType;
}

const MODE_MENU: Array<SingleType> = [
  {
    title: '模式',
    value: 'mode',
    icon: mode,
    isActiveFunc: true,
  },
  {
    title: '选择',
    value: 'select',
    icon: select,
    isActiveFunc: true,
  },
  {
    title: '清空',
    value: 'clear',
    icon: clear,
  },
  {
    title: '删除',
    value: 'delete',
    icon: _delete,
  },
  {
    title: '上传',
    value: 'upload',
    icon: upload,
    isUpload: true,
  },
  {
    title: '回退',
    value: 'revoke',
    icon: revoke,
  },
  {
    title: '撤销',
    value: 'reback',
    icon: reback,
  },
  {
    title: '导出',
    value: 'export',
    icon: exportIcon,
  },
];

const MODE_CONTROL: ControlType = {
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
      {
        title: '文字',
        value: 'font',
        icon: font,
        mode: MODE_TYPES.TEXT_MODE,
      },
    ],
  },
};

export { MODE_MENU, MODE_CONTROL };
