import { useEffect } from 'react';

import AlertIcon from '@/assets/svgr/icons/alert-circle.svg';
import CheckIcon from '@/assets/svgr/icons/check-circle-filled.svg';
import * as Styled from '@/components/prototypes/Toast/Toast.style';
import { TOAST_TYPE } from '@/enums/toastType';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { closeToast } from '@/redux/slices/layoutSlice';
import { INVALID, VALID, YELLOW } from '@/styles/colors';

const iconMap = {
  [TOAST_TYPE.SUCCESS]: CheckIcon,
  [TOAST_TYPE.ERROR]: AlertIcon,
  [TOAST_TYPE.WARNING]: AlertIcon,
};

const colorMap = {
  [TOAST_TYPE.SUCCESS]: VALID.DEFAULT,
  [TOAST_TYPE.ERROR]: INVALID[600],
  [TOAST_TYPE.WARNING]: YELLOW[500],
};

const Toast = () => {
  const dispatch = useAppDispatch();
  const { openToast, message, duration, type } = useAppSelector((state) => state.layout.toastSettings);

  useEffect(() => {
    if (openToast) {
      const timer = setTimeout(() => {
        dispatch(closeToast());
      }, duration + 500);

      return () => {
        clearTimeout(timer);
      };
    }
    return () => {};
  }, [dispatch, duration, openToast]);

  if (openToast)
    return (
      <Styled.AlertBox color={colorMap[type]}>
        <Styled.AlertIcon as={iconMap[type]} color={colorMap[type]} />
        <div>{message}</div>
      </Styled.AlertBox>
    );
  return null;
};

export default Toast;
