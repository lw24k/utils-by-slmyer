/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-05-18 20:48:03
 * @LastEditTime: 2021-05-23 17:04:01
 */
import React, { FC, useRef, useState, useImperativeHandle } from 'react';
import { Modal } from 'antd';
interface RenderProps {
  children: React.ReactNode;
  title: string;
  visible: boolean;
  setVisible: Function;
  handleClose: Function;
  onSubmit: Function;
}
const GlobalModal: FC<RenderProps> = (props) => {
  const { title, visible, setVisible, handleClose, onSubmit } = props;
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={() => handleSubmit()}
      onCancel={() => handleClose()}
    >
      {props.children}
    </Modal>
  );
};

export default GlobalModal;
