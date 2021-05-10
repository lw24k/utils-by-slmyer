/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:22:10
 * @LastEditTime: 2021-05-10 21:58:01
 */
import { useState, useEffect, FC } from 'react';
import classnames from 'classnames';
import styles from './index.scss';
import Paint from '@/utils/paint.js';
import RatioContainer, { AttributeType } from 'components/RatioContainer';
import { ConnectState, InstanceType } from '../../types/type';

interface PageProps {
  setInstance: (v: InstanceType) => void;
}
let instance: InstanceType;
const IndexPage: FC<PageProps> = ({ setInstance }) => {
  const [state, setstate] = useState(false);
  const [ratio, setRatio] = useState(1.778);
  useEffect(() => {
    instance = new Paint({ id: 'canvas' });
    instance.init();
    setInstance(instance);
    return () => {
      instance.dispose();
    };
  }, []);
  const handleClick = () => {
    setstate(true);
  };

  const changeSize = ({ width, height, ratio }: AttributeType) => {
    instance.changeCanvasSize({ width, height, ratio });
  };
  return (
    <div className={classnames(styles.ratio)}>
      <RatioContainer changeSize={changeSize} ratio={ratio}>
        <canvas id="canvas"></canvas>
      </RatioContainer>
    </div>
  );
};

export default IndexPage;
