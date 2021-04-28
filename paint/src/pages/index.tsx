/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:22:10
 * @LastEditTime: 2021-04-28 21:59:26
 */
import { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './index.scss';
import Paint from '../utils/paint.js';
import RatioContainer, { AttributeType } from 'components/RatioContainer';

interface InstanceType {
  init: Function;
  changeCanvasSize: Function;
  enterMode: Function;
  dispose: Function;
}
let instance: InstanceType;
export default function IndexPage() {
  const [state, setstate] = useState(false);
  const [ratio, setRatio] = useState(1);
  useEffect(() => {
    console.log('render');
    instance = new Paint({ id: 'canvas', width: 500, height: 500 });
    instance.init();
    setTimeout(() => {
      instance.enterMode('CIRCLE_MODE');
    });
    return () => {
      instance.dispose();
    };
  }, []);
  const handleClick = () => {
    setstate(true);
  };

  const changeSize = ({ width, height }: AttributeType) => {
    console.log('changeSize', width, height);
    instance.changeCanvasSize({ width, height });
  };
  return (
    <div>
      <div className={classnames(styles.ratio)}>
        <RatioContainer changeSize={changeSize} ratio={ratio}>
          <canvas id="canvas"></canvas>
        </RatioContainer>
      </div>
    </div>
  );
}
