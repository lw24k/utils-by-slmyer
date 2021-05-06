/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-29 20:55:41
 * @LastEditTime: 2021-04-29 21:10:55
 */
import mode from 'icon/mode.png';
import clear from 'icon/clear.png';
import select from 'icon/select.png';

// import circle from 'icon/circle.png';
// import free from 'icon/free.png';
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

export { MODE_MENU };
