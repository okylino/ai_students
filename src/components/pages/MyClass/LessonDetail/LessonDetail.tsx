import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import * as Styled from '@/components/pages/MyClass/LessonDetail/LessonDetail.style';
import { ButtonConfig, LessonDetailProps } from '@/components/pages/MyClass/LessonDetail/LessonDetail.type';
import CustomButton from '@/components/prototypes/CustomButton/CustomButton';
import { ROUTE_PATH } from '@/enums/routePath';
import useJoinRoom from '@/hooks/useJoinRoom';
import { fillPathParams } from '@/utils/routeUtils';

const LessonDetail = ({ lessonInfo, roomId }: LessonDetailProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { joinRoomById } = useJoinRoom();
  const { lessonId, points, startTime, endTime, availableJoin } = lessonInfo;

  const formatDateRange = (startTimestamp: number, endTimestamp: number) => {
    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString('en-US', {
        month: 'short', // 'Sep'
        day: '2-digit', // '30'
        year: 'numeric', // '2024'
      });
    };

    const formatTime = (timestamp: number) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24-hour format
      });
    };

    const actualStartTimestamp = startTimestamp || Math.floor(Date.now() / 1000);
    const formattedStart = `${formatDate(actualStartTimestamp)} ${formatTime(actualStartTimestamp)}`;
    const formattedEnd = endTimestamp ? formatTime(endTimestamp) : t('myClass:now');

    return `${formattedStart}-${formattedEnd}`;
  };

  const buttonConfig: ButtonConfig = availableJoin
    ? { variant: 'contained', onClick: () => joinRoomById(roomId), label: t('myClass:join') }
    : {
        variant: 'outlined',
        onClick: () => navigate(fillPathParams(ROUTE_PATH.LESSON, { lessonId })),
        label: t('myClass:review'),
      };

  return (
    <Styled.LessonWrapper>
      <Styled.LessonContent>
        {formatDateRange(startTime, endTime)}
        <Styled.Point>
          <Styled.StarIcon /> {points}
        </Styled.Point>
      </Styled.LessonContent>
      <Styled.ButtonWrapper>
        <CustomButton
          width='100%'
          height='48px'
          color='primary'
          variant={buttonConfig.variant}
          onClick={buttonConfig.onClick}
        >
          {buttonConfig.label}
        </CustomButton>
      </Styled.ButtonWrapper>
    </Styled.LessonWrapper>
  );
};

export default LessonDetail;
