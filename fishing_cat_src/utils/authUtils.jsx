import api from '@fishing_cat/api';
import { LOCAL_STORAGE_KEY } from '@fishing_cat/enums/localStorageKey';
import { REMOVE_USER_ID_REASON } from '@fishing_cat/enums/mixpanelReason';
import { sendRemoveUserIdEventToMixpanel } from '@fishing_cat/services/mixpanelService';
import SentryService from '@fishing_cat/services/sentryService';
import { localStorageUtils } from '@fishing_cat/utils/localStorageUtils';
import { removeUserIdByLessonId } from '@fishing_cat/utils/userIdUtils';

const chooseSeat = async (seat, lessonId, sid, userId) => {
  const detail = localStorageUtils.getItem(LOCAL_STORAGE_KEY.USER);
  if (!detail) return;
  try {
    await api.student.chooseSeat({
      serial_number: seat.serial_number,
      lesson_id: lessonId,
      sid,
      user_id: userId,
      device_id: window.localStorage.getItem('deviceId'),
    });
  } catch (e) {
    console.log(e);
  }
};

const getStudentInfoAndNavigate = async (
  navigate,
  login,
  logout,
  joinLesson,
  lessonId,
  email,
  sid,
  userId,
  componentName,
  isOnJoinPage = false,
) => {
  const queryParams = new URLSearchParams(window.location.search);
  const roomId = queryParams.get('roomId');

  const navigateToJoinPage = async (reason) => {
    const REASON_PREFIX = 'getStudentInfoAndNavigate';
    const finalReason = `${REASON_PREFIX}: ${reason}`;
    sendRemoveUserIdEventToMixpanel({ lessonId, component: componentName, reason: finalReason });
    SentryService.captureRemoveUserId({
      lessonId,
      componentName,
      reason: finalReason,
    });
    await removeUserIdByLessonId({ lessonId });
    logout();
    navigate(`/join?${queryParams}`, { state: { hasRemovedUserId: true } });
  };

  if (!lessonId) return;

  if (!userId) {
    localStorage.removeItem('accessToken');
    navigateToJoinPage(REMOVE_USER_ID_REASON.NO_USER_ID);
    return;
  }

  const seat = await api.student.getStudentSeat({ lesson_id: lessonId, student_id: userId, email }).catch(() => {
    localStorage.removeItem('accessToken');
    if (!isOnJoinPage) {
      navigateToJoinPage(REMOVE_USER_ID_REASON.GET_STUDENT_SEAT_API_ERROR);
    }

    return null;
  });

  if (!seat) return;

  if (!seat?.is_joined) {
    localStorage.removeItem('accessToken');
    if (!isOnJoinPage) {
      navigateToJoinPage(REMOVE_USER_ID_REASON.STUDENT_HAS_NOT_JOINED);
    }
    return seat;
  }

  await chooseSeat(seat, lessonId, sid, userId);

  localStorage.setItem('accessToken', seat.socket_access_token);
  joinLesson(seat.socket_access_token);
  login(seat.display_name, userId, seat.seat_number, seat.serial_number);

  if (seat.display_name) {
    queryParams.set('roomId', roomId);
    queryParams.set('lessonId', lessonId);

    const newSearch = queryParams.toString();

    navigate(`/classroom?${newSearch}`);

    return seat;
  }

  navigate(`/join?roomId=${roomId}`, {
    replace: true,
    state: { unsetNameStudent: { serialNumber: seat.serial_number, seatNumber: seat.seat_number } },
  });
  return {};
};

export default getStudentInfoAndNavigate;
