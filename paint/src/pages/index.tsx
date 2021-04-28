/*
 * @Descripttion:
 * @version:
 * @Author: slmyer
 * @Date: 2021-04-27 22:22:10
 * @LastEditTime: 2021-04-27 23:44:16
 */
import { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './index.scss';
import Paint from '../utils/paint.js';

export default function IndexPage() {
  const [state, setstate] = useState(false);
  useEffect(() => {
    console.log('render');
    const instance = new Paint({ id: 'canvas', width: 500, height: 500 });
    instance.init();
    setTimeout(() => {
      instance.enterMode('CIRCLE_MODE');
    });
  }, []);
  const handleClick = () => {
    setstate(true);
  };
  return (
    <div>
      <canvas id="canvas"></canvas>
    </div>
  );
}
