import { AuthLogin } from '@fishing_cat/api/models/auth/authLogin';
import { studentApi } from '@fishing_cat/api/services/studentService';
import { LOCAL_STORAGE_KEY } from '@fishing_cat/enums/localStorageKey';
import { store } from '@fishing_cat/redux/store';
import { sendGetUserIdByDeviceIdEventToMixpanel } from '@fishing_cat/services/mixpanelService';
import { localStorageUtils } from '@fishing_cat/utils/localStorageUtils';

import Logger from './Logger';

const USER_ID_PREFIX = 'cs-user-';

const REMOVE_TIME = 60 * 60 * 24 * 1000; // 設定超過一天的 userId 要清掉

const removeExpiredUserId = () => {
  const localStorageLength = localStorage.length;

  for (let i = 0; i <= localStorageLength; i += 1) {
    if (localStorage.key(i)?.startsWith(USER_ID_PREFIX)) {
      const userIdKey = localStorage.key(i) as string;

      const userIdData = JSON.parse(localStorage.getItem(userIdKey) || '{}');

      const userIdTimestamp = userIdData.timestamp;
      const currentTimestamp = new Date().getTime();

      if (currentTimestamp - userIdTimestamp >= REMOVE_TIME) {
        localStorage.removeItem(userIdKey);
      }
    }
  }
};

const setUserIdWithLessonId = ({ userId, lessonId }: { userId: string; lessonId: string }) => {
  removeExpiredUserId();

  const userIdData = {
    userId,
    timestamp: new Date().getTime(),
  };

  localStorage.setItem(`${USER_ID_PREFIX}${lessonId}`, JSON.stringify(userIdData));
};

const getUserIdByLessonId = ({ lessonId }: { lessonId: string }) => {
  const loginUser: AuthLogin | null = localStorageUtils.getItem(LOCAL_STORAGE_KEY.USER);

  if (loginUser?.userId) return loginUser?.userId;

  // if lessonId from Context is empty string, will get undefined
  const notLoggedInUserData: { userId?: string; timestamp?: number } = JSON.parse(
    localStorage.getItem(`cs-user-${lessonId}`) || '{}',
  );

  return notLoggedInUserData?.userId;
};

// This function should be called after others mixpanel event, otherwise the event will lost user ID
const removeUserIdByLessonId = async ({ lessonId, isForce = false }: { lessonId: string; isForce?: boolean }) => {
  if (!lessonId) return; // 理論上沒有 lessonId 就不會走到這 function，但要再盤呼叫這 function 的地方的邏輯，目前先在這處理沒有 lessonId 就直接 return

  // 正流程的 removeUserIdByLessonId 都視為 isForce
  // 理論上正流程就算 call getUserIdByDeviceId api 也會拿不到 userId 然後走 removeItem
  // 但為了避免後端該刪的時候沒刪，只要是正流程前端都一律 removeItem
  if (isForce) {
    localStorage.removeItem(`cs-user-${lessonId}`);
    Logger.resetUser();

    return;
  }

  const deviceId = window.localStorage.getItem('deviceId') || '';

  const result = await store.dispatch(studentApi.endpoints.getUserIdByDeviceId.initiate({ lessonId, deviceId }));

  const userId = result?.data?.studentId || '';

  sendGetUserIdByDeviceIdEventToMixpanel({ lessonId, userId });

  if (userId) {
    setUserIdWithLessonId({ userId, lessonId });
  } else {
    localStorage.removeItem(`cs-user-${lessonId}`);
    Logger.resetUser();
  }
};

export { getUserIdByLessonId, removeExpiredUserId, removeUserIdByLessonId, setUserIdWithLessonId };
