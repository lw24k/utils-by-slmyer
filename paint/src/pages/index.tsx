/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:22:10
 * @LastEditTime: 2021-05-06 17:27:53
 */
import { useState, useEffect, FC } from 'react';
import classnames from 'classnames';
import styles from './index.scss';
import Paint from '../utils/paint.js';
import RatioContainer, { AttributeType } from 'components/RatioContainer';
import { ConnectProps, Loading, connect } from 'umi';
interface InstanceType {
  init: Function;
  changeCanvasSize: Function;
  enterMode: Function;
  dispose: Function;
}

interface PageProps extends ConnectProps {}
let instance: InstanceType;
const IndexPage: FC<PageProps> = (props) => {
  const { dispatch } = props;
  const [state, setstate] = useState(false);
  const [ratio, setRatio] = useState(1.778);
  useEffect(() => {
    instance = new Paint({ id: 'canvas' });
    dispatch({ type: 'home/setInstance', payload: instance });
    instance.init();
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

export default connect(({ home }: ConnectProps) => {
  return {
    home,
  };
})(IndexPage);
