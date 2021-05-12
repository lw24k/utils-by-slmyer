/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:22:10
 * @LastEditTime: 2021-05-12 21:40:34
 */
import { useState, useEffect, FC } from 'react';
import classnames from 'classnames';
import styles from './index.scss';
import Paint from '@/utils/paint.js';
import RatioContainer, { AttributeType } from 'components/RatioContainer';
import { ConnectState, InstanceType } from '../../types/type';
import { message } from 'antd';

interface PageProps {
  setInstance: (v: InstanceType) => void;
}
interface MessageType {
  mType: string;
  msg: string;
}
let instance: InstanceType;
const IndexPage: FC<PageProps> = ({ setInstance }) => {
  const [state, setstate] = useState(false);
  const [ratio, setRatio] = useState(1.778);

  const messageHandle = ({ mType, msg }: MessageType) => {
    message.info(msg);
  };
  useEffect(() => {
    instance = new Paint({
      id: 'canvas',
      width: 1920,
      height: 1080,
      zoom: 1,
    });
    instance.init();
    instance.on('message', messageHandle);
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
