/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-10 21:03:01
 * @LastEditTime: 2021-05-12 22:40:54
 */
import React, { FC, useState } from 'react';
import classnames from 'classnames';
import style from 'common/style/main-layout.scss';
import { Drawer } from 'antd';
import Tool from 'components/Tool';
import CanvasContent from './canvas/CanvasContent';
import { connect, ConnectProps, Dispatch, SingleType } from 'umi';
import { ConnectState, InstanceType, GlobalState } from '../../types/type';
import { MODE_CONTROL } from '@/utils/types/index';

interface RenderProps extends ConnectProps {
  global: GlobalState;
  children: React.ReactChild;
  dispatch: Dispatch;
}

const Paint: FC<RenderProps> = (props) => {
  const {
    dispatch,
    global: { instance },
  } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [menu, setMenu] = useState<string>('');
  const [mode, setMode] = useState<string>('');

  const onClose = () => {
    setVisible(false);
  };

  const handleExport = () => {
    const res = instance.exportCanvas();
    const a = document.createElement('a'); // 创建a标签
    a.setAttribute('download', '默认导出.png'); // download属性
    a.setAttribute('href', res.dataurl); // href链接
    a.click(); // 自执行点击事件
  };

  const changeMenu = (menu: string) => {
    setMenu(menu);
    switch (menu) {
      case 'select':
        instance.leaveMode(mode);
        instance.toggleSelectStatus();
        setMode('');
        break;
      case 'mode':
        instance.toggleSelectStatus(true);
        instance.enterMode(mode);
        setVisible(true);
        break;
      case 'clear':
        instance.clearInstance();
        break;
      case 'delete':
        instance.deleteObject();
        break;
      case 'revoke':
        instance.revokeObject();
        break;
      case 'reback':
        instance.rebackObject();
        break;
      case 'export':
        handleExport();
        break;
    }
  };

  const setInstance = (instance: InstanceType) => {
    dispatch({ type: 'global/setInstance', payload: { instance: instance } });
  };

  const openPanel = () => {
    setVisible(true);
  };

  const handleClick = (item: SingleType) => {
    instance.leaveMode(mode);
    setMode(item.mode);
    instance.enterMode(item.mode);
  };
  return (
    <div className={classnames(style.root)}>
      <div className={classnames(style.tool)}>
        <Tool menu={menu} setMenu={changeMenu} setVisible={openPanel}></Tool>
      </div>
      <div className={classnames(style.canvas)}>
        <CanvasContent setInstance={setInstance}></CanvasContent>
      </div>
      <Drawer
        title={(menu && MODE_CONTROL[menu]?.title) || ''}
        visible={visible}
        closable={false}
        onClose={onClose}
        getContainer={false}
      >
        <div className={classnames(style.drawer)}>
          {menu &&
            MODE_CONTROL[menu]?.icons.map((v) => {
              return (
                <div
                  title={v.title}
                  key={v.title}
                  onClick={() => handleClick(v)}
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

export default connect(({ global }: ConnectState) => {
  return {
    global,
  };
})(Paint);
