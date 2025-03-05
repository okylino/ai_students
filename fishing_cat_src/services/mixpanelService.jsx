import Logger from '@fishing_cat/utils/Logger';

// just for frontend trace event use (not for BI)
const EVENT_PREFIX = 'PARTICIPANT_';

export const sendJoinToMixpanel = (triggerType, lessonId, reason) => {
  Logger.trackEvent('StudentJoin', {
    trigger_type: triggerType,
    lesson_id: lessonId,
    reason,
  });
};

export const sendLeaveToMixpanel = (triggerType, lessonId, reason) => {
  Logger.trackEvent('StudentLeave', {
    trigger_type: triggerType,
    lesson_id: lessonId,
    reason,
  });
};

export const sendFocusToMixpanel = (lessonId) => {
  Logger.trackEvent('StudentFocus', {
    lesson_id: lessonId,
  });
};

export const sendUnfocusToMixpanel = (lessonId) => {
  Logger.trackEvent('StudentUnfocus', {
    lesson_id: lessonId,
  });
};

export const sendRemoveUserIdEventToMixpanel = ({ lessonId, component, reason, pathname = '' }) => {
  const eventProperties = {
    component,
    reason,
    lesson_id: lessonId,
  };

  if (pathname) {
    Object.assign(eventProperties, { pathname });
  }
  Logger.trackEvent(`${EVENT_PREFIX}RemoveUserId`, eventProperties);
};

export const sendGetUserIdByDeviceIdEventToMixpanel = ({ lessonId, userId }) => {
  Logger.trackEvent(`${EVENT_PREFIX}GetUserIdByDeviceId`, { lesson_id: lessonId, res_user_id: userId });
};

export const sendEndLessonEventToMixpanel = () => {
  Logger.trackEvent(`${EVENT_PREFIX}EndLesson`);
};
