/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-29 17:16:30
 * @LastEditTime: 2021-05-06 21:02:52
 */
import React, { FC } from 'react';
import classnames from 'classnames';
import style from 'common/style/main-layout.scss';
import Tool from 'components/Tool';
import { connect, ConnectProps, StateType, Dispatch } from 'umi';
import { Drawer } from 'antd';
import { MODE_CONTROL } from '../utils/types/index';
interface RenderProps extends ConnectProps {
  children: React.ReactNode;
  dispatch: Dispatch;
  home: StateType;
}

const MainLayout: FC<RenderProps> = (props) => {
  const {
    home: { panelVisible, activeMode, instance, mode },
    dispatch,
  } = props;

  const onClose = () => {
    dispatch({ type: 'home/setVisible', payload: false });
    dispatch({ type: 'home/changeMode', payload: '' });
    instance.leaveMode(mode);
    dispatch({ type: 'home/setDrawMode', payload: '' });
  };

  const handleClick = (mode: string) => {
    instance.enterMode(mode);

    dispatch({ type: 'home/setVisible', payload: false });
    dispatch({ type: 'home/setDrawMode', payload: mode });
  };
  return (
    <div className={classnames(style.root)}>
      <div className={classnames(style.tool)}>
        <Tool></Tool>
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

export default connect(({ home }: RenderProps) => {
  return { home };
})(MainLayout);
