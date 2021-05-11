/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-29 20:54:34
 * @LastEditTime: 2021-05-11 22:52:16
 */
import classnames from 'classnames';
import React, { FC } from 'react';
import { MODE_MENU, Type } from 'utils/types/index.ts';
import style from './style/index.scss';
import { connect, ConnectProps, Dispatch } from 'umi';
import { ConnectState, InstanceType, GlobalState } from '../../types/type';
import { Upload, message } from 'antd';

interface PageProps extends ConnectProps {
  dispatch: Dispatch;
  menu: string;
  setMenu: Function;
  setVisible: Function;
  global: GlobalState;
}
const toBaseUrl = (file) => {
  return new Promise((res, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      res(reader.result);
    };
    reader.readAsDataURL(file);

    reader.onerror = (e) => {
      reject(e);
    };
  });
};
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

  const upProps = {
    beforeUpload: (file: { type: string; name: any }) => {
      if (file.type !== 'image/png') {
        message.error(`${file.name} is not a png file`);
      }
      return false;
    },
    onChange: async (info: { fileList: any }) => {
      console.log(info.fileList);
      const file = info.fileList[0].originFileObj;
      const result = await toBaseUrl(file);
      instance.setBackgroundImage(result);
    },
    showUploadList: false,
  };
  return (
    <div className={classnames(style.menu)}>
      {MODE_MENU.map((v: Type) => {
        if (v.isUpload) {
          return (
            <Upload
              className={classnames({ [style.upload]: true })}
              {...upProps}
              key={v.value}
            >
              <div
                className={classnames({
                  [style.box]: true,
                  [style.active]: v.value === menu && v.isActiveFunc,
                })}
                onClick={() => changeMode(v.value)}
              >
                <img src={v.icon} alt="" />
                <span className={classnames(style.tip)}>{v.title}</span>
              </div>
            </Upload>
          );
        } else {
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
              <span className={classnames(style.tip)}>{v.title}</span>
            </div>
          );
        }
      })}
    </div>
  );
};

export default connect(({ global }: ConnectState) => {
  return {
    global,
  };
})(ModeControl);
