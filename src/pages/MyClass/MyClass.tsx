import { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RoomLessonList } from '@/api/models/room/roomLessonList';
import { useGetRoomLessonListQuery } from '@/api/services/roomService';
import CaretDown from '@/assets/svgr/icons/caret-down-small.svg';
import ClassImage from '@/assets/svgr/myClass/Class.svg';
import MainImage from '@/assets/svgr/myClass/Illustration.svg';
import LessonDetail from '@/components/pages/MyClass/LessonDetail';
import CustomButton from '@/components/prototypes/CustomButton/CustomButton';
import { ROUTE_PATH } from '@/enums/routePath';
import useJoinRoom from '@/hooks/useJoinRoom';
import * as Styled from '@/pages/MyClass/MyClass.style';
import { useAppSelector } from '@/redux/hook';
import { fillPathParams } from '@/utils/routeUtils';

const MyClass = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userStore.user);

  const inputRoomRef = useRef<HTMLInputElement>(null);
  const [joinErrorMessage, setJoinErrorMessage] = useState('');

  const { joinRoomById, joinRoomByNumber } = useJoinRoom();
  const { data } = useGetRoomLessonListQuery();
  const roomLessonList: RoomLessonList[] = data?.data || [];
  const ongoingRooms =
    roomLessonList?.filter((room) =>
      room.lessonsInfo.some((lesson) => lesson.availableJoin === true && lesson.startTime),
    ) || [];

  const handleJoinRoomIfValid = async () => {
    const error = await joinRoomByNumber(inputRoomRef.current?.value);
    if (error) setJoinErrorMessage(error);
  };

  const getTimeDifferenceText = (startTime: number): React.ReactNode => {
    const now = Math.floor(Date.now() / 1000);
    const timeDiff = now - startTime;

    if (startTime === 0 || timeDiff < 10) {
      return t('myClass:startNow');
    }

    switch (true) {
      case timeDiff < 60:
        return <Trans i18nKey='myClass:startSeconds' values={{ time: timeDiff }} />;
      case timeDiff < 120:
        return t('myClass:startMinute');
      case timeDiff < 3600:
        return <Trans i18nKey='myClass:startMinutes' values={{ time: Math.floor(timeDiff / 60) }} />;
      case timeDiff < 7200:
        return t('myClass:startHour');
      default:
        return <Trans i18nKey='myClass:startHours' values={{ time: Math.floor(timeDiff / 3600) }} />;
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.ImageWrapper>
        <MainImage />
        <Styled.ImageContent>
          <Styled.ImageTitle>
            <Trans i18nKey='myClass:heroTitle' values={{ name: user?.defaultDisplayName }} />
          </Styled.ImageTitle>
          <Styled.ImageSubTitle>{t('myClass:heroText')}</Styled.ImageSubTitle>
        </Styled.ImageContent>
      </Styled.ImageWrapper>

      <Styled.ClassWrapper>
        <Styled.ClassCard>
          <Styled.InputTitle>{t('myClass:classId')}</Styled.InputTitle>
          <Styled.Input
            placeholder={t('myClass:enterClassId')}
            inputRef={inputRoomRef}
            inputProps={{ maxLength: 8 }}
            error={Boolean(joinErrorMessage)}
          />
          <Styled.InputErrorText>{joinErrorMessage}</Styled.InputErrorText>
          <Styled.InputButtonWrapper>
            <CustomButton
              width='100%'
              height='48px'
              color='secondary'
              variant='contained'
              onClick={handleJoinRoomIfValid}
              sx={{ padding: 0 }}
            >
              {t('myClass:quickJoin')}
            </CustomButton>
          </Styled.InputButtonWrapper>
        </Styled.ClassCard>

        {ongoingRooms.length > 0 && (
          <>
            <Styled.SectionTitle>{t('myClass:ongoingClass')}</Styled.SectionTitle>
            <Styled.CardWrapper>
              {ongoingRooms.map((room) => {
                const availableLesson = room.lessonsInfo.find((lesson) => lesson.availableJoin === true);

                return (
                  <Styled.OngoingCard key={room.roomId}>
                    <Styled.CardTitle>{room.roomDisplayName}</Styled.CardTitle>
                    <Styled.CardSubTitle>
                      {t('myClass:classId')}: {room.roomNumber}
                    </Styled.CardSubTitle>
                    <Styled.Time>{getTimeDifferenceText(availableLesson?.startTime || 0)}</Styled.Time>
                    <Styled.ButtonWrapper>
                      <CustomButton
                        width='100%'
                        height='48px'
                        color='primary'
                        variant='contained'
                        onClick={() => joinRoomById(room.roomId)}
                      >
                        {t('myClass:join')}
                      </CustomButton>
                    </Styled.ButtonWrapper>
                  </Styled.OngoingCard>
                );
              })}
            </Styled.CardWrapper>
          </>
        )}

        <Styled.SectionTitle>{t('myClass:allClass')}</Styled.SectionTitle>
        {roomLessonList.length > 0 ? (
          <Styled.CardWrapper>
            {roomLessonList.map((room) => {
              const isDisabled = room.lessonCount <= 0;

              return (
                <Styled.ClassAccordion key={room.roomId} elevation={0} disableGutters disabled={isDisabled}>
                  <Styled.ClassAccordionSummary
                    expandIcon={
                      <Styled.DropdownButton disabled={isDisabled}>
                        <CaretDown />
                      </Styled.DropdownButton>
                    }
                  >
                    <div>
                      <Styled.CardTitle>{room.roomDisplayName}</Styled.CardTitle>
                      <Styled.CardSubTitle>
                        {t('myClass:classId')}: {room.roomNumber}
                      </Styled.CardSubTitle>
                    </div>
                  </Styled.ClassAccordionSummary>

                  <Styled.Line />
                  {room.lessonsInfo.map((lesson) => (
                    <LessonDetail key={lesson.lessonId} lessonInfo={lesson} roomId={room.roomId} />
                  ))}
                  {room.lessonCount > 3 && (
                    <Styled.SeeLessonsLink
                      onClick={() => navigate(fillPathParams(ROUTE_PATH.CLASS, { id: room.roomId }))}
                    >
                      <Trans i18nKey='myClass:seeAllLesson' values={{ lessonCount: room.lessonCount }} />
                    </Styled.SeeLessonsLink>
                  )}
                </Styled.ClassAccordion>
              );
            })}
          </Styled.CardWrapper>
        ) : (
          <Styled.NoClassWrapper>
            <ClassImage />
            <Styled.NoClassText> {t('myClass:noClass')}</Styled.NoClassText>
          </Styled.NoClassWrapper>
        )}
      </Styled.ClassWrapper>
    </Styled.Wrapper>
  );
};

export default MyClass;
