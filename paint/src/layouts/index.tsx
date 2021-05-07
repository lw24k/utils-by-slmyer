/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-29 17:16:30
 * @LastEditTime: 2021-05-07 21:26:35
 */
import React, { FC } from 'react';
import classnames from 'classnames';
import style from 'common/style/main-layout.scss';
import Tool from 'components/Tool';
import { connect, Dispatch } from 'umi';
import { Drawer } from 'antd';
import { MODE_CONTROL } from '../utils/types/index';
import { ConnectState, HomeState } from '../types/type';
interface RenderProps extends ConnectState {
  children: React.ReactNode;
  dispatch: Dispatch;
}

const MainLayout: FC<RenderProps> = (props) => {
  const {
    home: { panelVisible, activeMode, instance, mode },
    dispatch,
  } = props;

  const onClose = () => {
    dispatch({ type: 'home/setVisible', payload: { panelVisible: false } });
    dispatch({ type: 'home/changeMode', payload: { mode: '' } });
    instance.leaveMode(mode);
    dispatch({ type: 'home/setDrawMode', payload: { mode: '' } });
  };

  const handleClick = (mode: string) => {
    console.log(mode, '989879');
    instance.enterMode(mode);
    dispatch({ type: 'home/setVisible', payload: { panelVisible: false } });
    dispatch({ type: 'home/setDrawMode', payload: { mode } });
  };
  return (
    <div className={classnames(style.root)}>
      <div className={classnames(style.tool)}>
        <Tool {...props}></Tool>
      </div>
      <div className={classnames(style.canvas)}>{props.children}</div>
      <Drawer
        title={MODE_CONTROL[activeMode]?.title || ''}
        visible={panelVisible}
        closable={false}
        onClose={onClose}
        getContainer={false}
      >
        <div className={classnames(style.drawer)}>
          {MODE_CONTROL[activeMode]?.icons.map((v) => {
            return (
              <div
                title={v.title}
                key={v.title}
                onClick={() => handleClick(v.mode)}
                className={classnames({ [style.active]: v.mode === mode })}
              >
                <img
                  src={v.icon}
                  alt=""
                  className={classnames({
                    [style.img]: true,
                  })}
                />
                <span>{v.title}</span>
              </div>
            );
          })}
        </div>
      </Drawer>
    </div>
  );
};

export default connect(({ home }: ConnectState) => {
  return { home };
})(MainLayout);
