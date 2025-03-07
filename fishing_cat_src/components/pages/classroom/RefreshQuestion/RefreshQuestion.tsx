import Popover from '@mui/material/Popover';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ArrowCounterClockWiseIcon from '@fishing_cat/assets/svgr/icons/arrow-counter-clockwise.svg';
import QuestionCircleIcon from '@fishing_cat/assets/svgr/icons/question-circle.svg';

import * as $ from './RefreshQuestion.style';
import { RefreshQuestionProps } from './RefreshQuestion.type';

const COUNTDOWN_SECOND = 5;

const RefreshQuestion = ({ getOpenedQuiz, getOpenedTask }: RefreshQuestionProps) => {
  const [isShowRefreshPopover, setShowRefreshPopover] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECOND);
  const [isCountdowning, setIsCountdowning] = useState(false);

  const questionIconRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    let timerId: number = 0;

    if (isCountdowning) {
      timerId = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isCountdowning]);

  useEffect(() => {
    if (countdown === 0) {
      setCountdown(COUNTDOWN_SECOND);
      setIsCountdowning(false);
    }
  }, [countdown]);

  const handleRefreshClick = () => {
    getOpenedQuiz();
    getOpenedTask();

    setShowRefreshPopover(false);
    setIsCountdowning(true);
  };

  return (
    <div>
      <$.QuestionIcon
        ref={questionIconRef}
        onClick={() => setShowRefreshPopover(!isShowRefreshPopover)}
        $isActived={isShowRefreshPopover}
      >
        <QuestionCircleIcon />
      </$.QuestionIcon>
      <Popover
        open={isShowRefreshPopover}
        anchorEl={questionIconRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{ paper: { sx: { marginTop: '8px' } } }}
        onClose={() => setShowRefreshPopover(false)}
      >
        <$.Wrapper>
          <$.Description>{t('refreshDescription')}</$.Description>
          <$.RefreshWrapper onClick={handleRefreshClick}>
            {!isCountdowning && (
              <>
                <$.RefreshIcon>
                  <ArrowCounterClockWiseIcon />
                </$.RefreshIcon>

                <$.Refresh>{t('refresh')}</$.Refresh>
              </>
            )}

            {isCountdowning && (
              <>
                <$.Spinner />
                <$.Countdown>{countdown}</$.Countdown>
              </>
            )}
          </$.RefreshWrapper>
        </$.Wrapper>
      </Popover>
    </div>
  );
};

export default RefreshQuestion;
