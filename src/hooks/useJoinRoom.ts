import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useLazyGetLatestLessonQuery } from '@/api/services/roomService';
import { LESSON_FILTER } from '@/enums/lessonFilter';
import { LESSON_STATUS } from '@/enums/lessonStatus';
import { TOAST_TYPE } from '@/enums/toastType';
import { useAppDispatch } from '@/redux/hook';
import { openToastWithMessage } from '@/redux/slices/layoutSlice';

const useJoinRoom = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [getLatestLesson] = useLazyGetLatestLessonQuery();

  const getLessonStatus = async (value: number | string, filter: LESSON_FILTER) => {
    try {
      const { data: latestLesson } = await getLatestLesson({ value, filter });
      const lessonData = latestLesson?.data;

      if (!lessonData) {
        return { isFound: false };
      }

      const { status, roomId } = lessonData;
      const isActive = status === LESSON_STATUS.PRE_CLASS || status === LESSON_STATUS.IN_CLASS;
      return { isFound: true, isActive, roomId };
    } catch {
      return { isFound: false };
    }
  };

  const joinRoomByNumber = async (roomNumber: string | undefined) => {
    if (!roomNumber) return '';

    const { isFound, isActive, roomId } = await getLessonStatus(roomNumber, LESSON_FILTER.ROOM_NUMBER);

    if (!isFound) {
      return t('myClass:classNotFound');
    }

    if (!isActive) {
      return t('myClass:classNotStart');
    }

    if (roomId) {
      navigate(`/join?roomId=${roomId}`);
      return '';
    }
    return '';
  };

  const joinRoomById = async (roomId: string) => {
    const { isFound, isActive } = await getLessonStatus(roomId, LESSON_FILTER.ROOM_ID);

    if (isFound && isActive) {
      navigate(`/join?roomId=${roomId}`);
    } else {
      dispatch(
        openToastWithMessage({
          message: t('myClass:lessonEnded'),
          type: TOAST_TYPE.ERROR,
          duration: 3000,
        }),
      );
    }
  };

  return {
    joinRoomById,
    joinRoomByNumber,
  };
};

export default useJoinRoom;
