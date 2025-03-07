import { sendRemoveUserIdEventToMixpanel } from '@fishing_cat/services/mixpanelService';
import SentryService from '@fishing_cat/services/sentryService';

import { removeUserIdByLessonId } from './userIdUtils';

type RemoveLocalStorageParams = {
  lessonId: string;
  componentName: string;
  reason?: string;
  pathname?: string;
};

export const removeLocalStorage = async ({ lessonId, reason, pathname, componentName }: RemoveLocalStorageParams) => {
  localStorage.removeItem('lessonId');
  await removeUserIdByLessonId({ lessonId, isForce: !reason });

  if (reason && pathname) {
    sendRemoveUserIdEventToMixpanel({ lessonId, component: componentName, reason, pathname });
    SentryService.captureRemoveUserId({
      lessonId,
      componentName,
      reason,
    });
  }
};
