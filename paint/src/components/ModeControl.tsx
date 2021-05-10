/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-29 20:54:34
 * @LastEditTime: 2021-05-10 22:41:30
 */
import classnames from 'classnames';
import React, { FC } from 'react';
import { MODE_MENU, Type } from 'utils/types/index.ts';
import style from './style/index.scss';
import { connect, ConnectProps, Dispatch } from 'umi';
import { ConnectState, InstanceType, GlobalState } from '../../types/type';

interface PageProps extends ConnectProps {
  dispatch: Dispatch;
  menu: string;
  setMenu: Function;
  setVisible: Function;
  global: GlobalState;
}
const ModeControl: FC<PageProps> = (props) => {
  const {
    menu,
    setMenu,
    dispatch,
    global: { instance },
    setVisible,
  } = props;
  const changeMode = (value: string) => {
    setMenu(value);
  };
  return (
    <div className={classnames(style.menu)}>
      {MODE_MENU.map((v: Type) => {
        return (
          <div
            className={classnames({
              [style.box]: true,
              [style.active]: v.value === menu && v.isActiveFunc,
            })}
            key={v.value}
            onClick={() => changeMode(v.value)}
          >
            <img src={v.icon} alt="" />
            <span>{v.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default connect(({ global }: ConnectState) => {
  return {
    global,
  };
})(ModeControl);
