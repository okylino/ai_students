import { useEffect, useState } from 'react';

import CheckCircleIcon from '@fishing_cat/assets/svgr/icons/check-circle-filled.svg';
import AlertIcon from '@fishing_cat/assets/svgr/icons/triangle-alert-filled.svg';
import { toastType } from '@fishing_cat/enums/toastType';
import { useAppDispatch, useAppSelector } from '@fishing_cat/redux/hook';
import { closeToast } from '@fishing_cat/redux/slices/globalSlice';
import COLOR from '@fishing_cat/styles/color';

import style from './toast.module.css';

const iconMap = {
  [toastType.SUCCESS]: <CheckCircleIcon style={{ color: COLOR.GREEN[500], width: '24px', height: '24px' }} />,
  [toastType.WARNING]: <AlertIcon style={{ color: COLOR.RED[200], width: '24px', height: '24px' }} />,
};

const border = {
  [toastType.SUCCESS]: `1px solid ${COLOR.GREEN[500]}`,
  [toastType.WARNING]: `1px solid ${COLOR.RED[200]}`,
};

const Toast = () => {
  const dispatch = useAppDispatch();
  const { openToast, message, duration, type } = useAppSelector((state) => state.globalStore.toastSettings);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (openToast) setShow(true);
  }, [openToast]);

  useEffect(() => {
    if (openToast) {
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);

      const timer2 = setTimeout(() => {
        dispatch(closeToast());
      }, duration + 500);

      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [dispatch, duration, openToast]);

  if (openToast)
    return (
      <div
        className={`${style.alertBox}
        ${show ? style.fadeIn : style.fadeOut}`}
        style={{ border: border[type] }}
      >
        {iconMap[type]}
        {message}
      </div>
    );
  return null;
};

export default Toast;
