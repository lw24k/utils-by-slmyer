/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-28 21:24:10
 * @LastEditTime: 2021-05-12 21:32:18
 */
import _ from 'lodash';
import classnames from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import style from './style/index.scss';

interface observerType {
  disconnect: Function;
  observe: Function;
}

export interface AttributeType {
  width: number;
  height: number;
  ratio?: number;
}
interface RenderProps {
  ratio: number;
  changeSize: Function;
  children: React.ReactNode;
}
const Ratio: FC<RenderProps> = (props) => {
  const { ratio, changeSize } = props;
  let observer: observerType;
  const _ref = useRef<HTMLDivElement | null>(null);
  const __bref = useRef<HTMLDivElement | null>(null);
  let attribute: AttributeType;
  useEffect(() => {
    console.log(ratio, 'ratioratio');
    createObserver();
  }, []);

  const createObserver = () => {
    observer = new ResizeObserver((entries: any) => {
      for (let entry of entries) {
        updateSize(entry.target);
      }
    });
    observer.observe(__bref.current);
  };

  const updateSize = ($el: HTMLElement) => {
    const { width, height } = $el.getBoundingClientRect();
    if (
      _.isEmpty(attribute) ||
      width !== attribute.width ||
      height !== attribute.height
    ) {
      attribute = { width, height };
      judeSize();
    }
  };

  const judeSize = () => {
    const { width, height } = attribute;
    const result: AttributeType = {
      width: 0,
      height: 0,
      ratio: ratio,
    };
    if (ratio && height > 0 && width > 0) {
      const _r = width / height;
      if (ratio > _r) {
        result.width = width;
        result.height = width / ratio;
      } else {
        result.width = height * ratio;
        result.height = height;
      }
      if (_ref.current) {
        _ref.current.style.width = result.width + 'px';
        _ref.current.style.height = result.height + 'px';
      }
    } else {
      result.width = width;
      result.height = height;
    }
    changeSize(result);
    return result;
  };

  return (
    <div className={classnames(style.full)} ref={__bref}>
      <div className={classnames(style.full)} ref={_ref}>
        {props.children}
      </div>
    </div>
  );
};

export default Ratio;
