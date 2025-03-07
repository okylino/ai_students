import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSocketContext } from '@fishing_cat/context/socketContext/SocketContext';
import SpinnerBorder from '@/components/prototypes/SpinnerBorder';

import { ErrorIcon, ToastWrapper } from './ReconnectHint.style';

const ReconnectHint = () => {
  const { isConnected } = useSocketContext();
  const [isReload, setIsReload] = useState(false);
  const { t } = useTranslation();

  const showHint = !isConnected && isReload;

  useEffect(() => {
    const navigationEntries = window.performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0 && navigationEntries[0] instanceof PerformanceNavigationTiming) {
      const navigationType = navigationEntries?.[0]?.type;
      if (navigationType === 'reload') {
        setIsReload(true);
      }
    }
  }, []);

  return showHint ? (
    <ToastWrapper>
      <ErrorIcon />
      {t('toastReconnecting')}
      <SpinnerBorder />
    </ToastWrapper>
  ) : null;
};

export default ReconnectHint;
