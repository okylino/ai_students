import { useEffect, useState } from 'react';

import COLOR from '@fishing_cat/styles/color';

import CircularProgress from './CircularProgress';
import style from './circularProgress.module.css';

let interval;
const CustomCircularProgress = ({ start, done }) => {
  const radius = window.innerWidth <= 375 ? 18 : 36;
  const length = window.innerWidth <= 375 ? 72 : 96;
  const strokeWidth = window.innerWidth <= 375 ? '0.3em' : '0.6em';
  const [progress, setProgress] = useState(5);
  const [running, setRunning] = useState(start);

  useEffect(() => {
    if (running) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 10);
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }, [running]);

  useEffect(() => {
    if (progress === 95) {
      clearInterval(interval);
    }
    if (progress === 65) {
      // setRunning(false);
      clearInterval(interval);
      interval = setInterval(() => {
        setProgress((prev) => prev + 10);
      }, 4000);
    }
  }, [progress]);
  useEffect(() => {
    if (done) {
      setProgress(100);
      clearInterval(interval);
      setRunning(false);
    }
  }, [done]);

  const Child = <div className={window.innerWidth <= 375 ? style.mobile_text : style.text}>{progress}%</div>;
  return (
    <CircularProgress
      radius={radius}
      length={length}
      rate={progress / 100}
      strokeWidth={strokeWidth}
      color={COLOR.BLUE[600]}
    >
      {Child}
    </CircularProgress>
  );
};

export default CustomCircularProgress;
