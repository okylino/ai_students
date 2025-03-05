import React, { useContext, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import InClassImage from '@fishing_cat/assets/svgr/classroom/in_class.svg';
import PostClassImage from '@fishing_cat/assets/svgr/classroom/post_class.svg';
import PreClassImage from '@fishing_cat/assets/svgr/classroom/pre_class.svg';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { LESSON_STATUS } from '@fishing_cat/enums/lessonStatus';
import { useAppSelector } from '@fishing_cat/redux/hook';
import { useGetLessonPerformanceQuery } from '@/api/services/lessonService';
import ReviewDialog from '@/components/pages/EndLesson/ReviewDialog';
import { ROUTE_PATH } from '@/enums/routePath';

import * as $ from './ClassStatus.style';
import { ClassStatusProps } from './ClassStatusType';

const ClassStatus = ({ isOnEndLesson, setIsOnEndLesson }: ClassStatusProps) => {
  // TODO: add type to LessonContext to avoid the type warning
  const { lessonStatus, lessonId } = useContext(LessonContext);
  const [seconds, setSeconds] = useState(10);
  const user = useAppSelector((state) => state.userStore.user);
  const navigate = useNavigate();
  const { data: reviewResp, error } = useGetLessonPerformanceQuery(
    { lessonId },
    {
      skip: seconds !== 0 || !user?.accessToken,
    },
  );

  const getTextAndImg = () => {
    let text1: string | React.ReactNode;
    let text2: string | React.ReactNode;
    let image: React.ReactNode;

    switch (lessonStatus) {
      case LESSON_STATUS.PRE_CLASS:
        text1 = <Trans i18nKey='preClassMain' />;
        image = <PreClassImage />;
        break;
      case LESSON_STATUS.IN_CLASS:
        text1 = <Trans i18nKey='inClassMain' />;
        text2 = <Trans i18nKey='inClassSub' />;
        image = <InClassImage />;
        break;
      default:
        text1 = <Trans i18nKey='postClassMain' />;
        if (isOnEndLesson) {
          text2 = (
            <Trans i18nKey='postClassSub' values={{ seconds }}>
              Class ends in {{ seconds }} seconds.
            </Trans>
          );
        }
        image = <PostClassImage />;
        break;
    }
    return { text1, text2, image };
  };

  const { text1, text2, image } = getTextAndImg();

  useEffect(() => {
    let intervalId: number = 0;
    if (isOnEndLesson) {
      intervalId = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isOnEndLesson]);

  useEffect(() => {
    if (seconds === 0) {
      setIsOnEndLesson(false);

      if (!user?.accessToken) {
        navigate('/joinClass');
        return;
      }
      if (error) {
        navigate(ROUTE_PATH.MY_CLASS);
      }
    }
  }, [error, navigate, seconds, user]);

  return (
    <$.ClassStatusWrapper>
      {image}
      <p>
        {text1}
        <br />
        {text2}
      </p>
      {reviewResp && lessonId && <ReviewDialog lessonId={lessonId} data={reviewResp.data} />}
    </$.ClassStatusWrapper>
  );
};
export default ClassStatus;
