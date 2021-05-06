/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-29 17:16:30
 * @LastEditTime: 2021-04-29 20:50:49
 */
import React, { FC } from 'react';
import classnames from 'classnames';
import style from 'common/style/main-layout.scss';
import Tool from 'components/Tool';
interface RenderProps {
  children: React.ReactNode;
}

const MainLayout: FC<RenderProps> = (props) => {
  return (
    <div className={classnames(style.root)}>
      <div className={classnames(style.tool)}>
        <Tool></Tool>
      </div>
      <div className={classnames(style.canvas)}>{props.children}</div>
    </div>
  );
};

export default MainLayout;
