/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-29 20:54:34
 * @LastEditTime: 2021-05-07 21:03:17
 */
import classnames from 'classnames';
import React, { FC } from 'react';
import { MODE_MENU, Type } from 'utils/types/index.ts';
import style from './style/index.scss';
import { connect, ConnectProps, Dispatch } from 'umi';
import { HomeState } from '../types/type';

interface PageProps extends ConnectProps {
  home: HomeState;
  dispatch: Dispatch;
}
const ModeControl: FC<PageProps> = (props) => {
  const {
    home: { activeMode, instance },
    dispatch,
  } = props;
  const changeMode = (value: string) => {
    if (value === 'mode') {
      dispatch({ type: 'home/enterMode', payload: { activeMode: value } });
      console.log(instance, '9988');
      instance.toggleSelectStatus(true);
    } else if (value === 'clear') {
      instance.clearInstance();
    } else if (value === 'select') {
      const _mode = activeMode !== 'select' ? 'select' : '';
      dispatch({ type: 'home/changeMode', payload: { activeMode: _mode } });
      dispatch({ type: 'home/setDrawMode', payload: { mode: '' } });
      instance.toggleSelectStatus();
    }
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
