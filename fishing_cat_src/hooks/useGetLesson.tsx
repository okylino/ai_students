import { useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import api from '@fishing_cat/api';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { LESSON_STATUS } from '@fishing_cat/enums/lessonStatus';
import { REMOVE_USER_ID_REASON } from '@fishing_cat/enums/mixpanelReason';
import { useAppSelector } from '@fishing_cat/redux/hook';
import { removeLocalStorage } from '@fishing_cat/utils/lessonUtils';
import { getUserIdByLessonId } from '@fishing_cat/utils/userIdUtils';
import { LESSON_FILTER } from '@/enums/lessonFilter';
import { ROUTE_PATH } from '@/enums/routePath';

export default function useGetLesson({ componentName }: { componentName: string }) {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const navigate = useNavigate();
  const { setLessonId, setLessonStatus, lessonId } = useContext(LessonContext);
  const user = useAppSelector((state) => state.userStore.user);
  const { pathname } = useLocation();
  const hasGotten = useRef(false);

  useEffect(() => {
    if (hasGotten.current) return;
    const getLesson = async ({ lessonRoomId }: { lessonRoomId: string }) => {
      const lesson = await api.lesson.getLatestLesson({ value: lessonRoomId, filter: LESSON_FILTER.ROOM_ID });
      const newLessonId = lesson?.lesson_id;

      if (newLessonId && lesson?.status !== LESSON_STATUS.POST_CLASS) {
        // lesson exist
        setLessonId(newLessonId);
        setLessonStatus(lesson.status);
        if (lessonId && newLessonId !== lessonId) {
          navigate(`/join?roomId=${lessonRoomId}`);
        }
      } else {
        // lesson not exist
        removeLocalStorage({
          lessonId,
          componentName,
          reason: REMOVE_USER_ID_REASON.LESSON_NOT_EXIST,
        });
        navigate(user?.userId ? ROUTE_PATH.MY_CLASS : '/joinClass');
      }
    };

    if (roomId) {
      getLesson({ lessonRoomId: roomId });
    } else {
      const userId = getUserIdByLessonId({ lessonId });
      if (userId) {
        removeLocalStorage({
          lessonId,
          pathname,
          reason: REMOVE_USER_ID_REASON.NO_ROOM_ID,
          componentName,
        });
      }
      navigate(user?.userId ? ROUTE_PATH.MY_CLASS : '/joinClass');
    }
    hasGotten.current = true;
  }, [componentName, lessonId, navigate, pathname, roomId, setLessonId, setLessonStatus, user?.userId]);

  return {
    hasGottenLesson: hasGotten.current,
  };
}
