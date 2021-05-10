/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-29 17:32:42
 * @LastEditTime: 2021-05-10 22:04:26
 */
import React, { FC } from 'react';
import classnames from 'classnames';
import style from './style/index.scss';
import ModeControl from './ModeControl';
import { ConnectProps } from 'umi';
interface RenderProps extends ConnectProps {
  children: React.ReactNode;
}

const Tool: FC<RenderProps> = (props) => {
  return (
    <div className={classnames(style.tool)}>
      <ModeControl {...props}></ModeControl>
    </div>
  );
};

export default Tool;
