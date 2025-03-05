import COLOR from '@fishing_cat/styles/color';

import style from './circularProgress.module.css';

const BackgroundCircle = ({ radius, location, strokeWidth }) => (
  <circle
    r={radius}
    cx={location}
    cy={location}
    fill='transparent'
    strokeDasharray={2 * radius * Math.PI}
    strokeDashoffset='0'
    strokeWidth={strokeWidth}
    stroke={COLOR.NEUTRAL[0]}
  />
);

const CircularBar = ({ radius, location, rate, strokeWidth, color }) => (
  <circle
    r={radius}
    cx={location}
    cy={location}
    fill='transparent'
    strokeDasharray={2 * radius * Math.PI}
    strokeDashoffset={2 * (1 - rate) * radius * Math.PI}
    transform={`rotate(-90, ${location}, ${location})`}
    strokeWidth={strokeWidth}
    stroke={color}
  />
);
const CircularProgress = ({ radius, length, rate, strokeWidth, color, children }) => (
  <div className={style.wrapper}>
    <svg id='svg' width={length} height={length} xmlns='http://www.w3.org/2000/svg'>
      <BackgroundCircle radius={radius} location={length / 2} strokeWidth={strokeWidth} />
      <CircularBar radius={radius} location={length / 2} rate={rate} strokeWidth={strokeWidth} color={color} />
    </svg>
    <div style={{ position: 'absolute' }}>{children}</div>
  </div>
);

export default CircularProgress;
