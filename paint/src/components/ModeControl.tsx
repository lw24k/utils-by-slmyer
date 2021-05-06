/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-29 20:54:34
 * @LastEditTime: 2021-05-06 17:32:25
 */
import classnames from 'classnames';
import React, { FC } from 'react';
import { MODE_MENU, Type } from 'utils/types/index.ts';
import style from './style/index.scss';
import { connect, ConnectProps, Dispatch, StateType } from 'umi';

interface PageProps extends ConnectProps {
  home: StateType;
  dispatch: Dispatch;
}
const ModeControl: FC<PageProps> = (props) => {
  const {
    home: { activeMode },
    dispatch,
  } = props;
  const changeMode = (value: string) => {
    dispatch({ type: 'home/enterMode', payload: value });
  };
  return (
    <div className={classnames(style.menu)}>
      {MODE_MENU.map((v: Type) => {
        return (
          <div
            className={classnames({
              [style.box]: true,
              [style.active]: v.value === activeMode,
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

export default connect(({ home }: PageProps) => {
  return { home };
})(ModeControl);
