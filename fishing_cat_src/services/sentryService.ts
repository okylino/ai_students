import { captureException, setUser } from '@sentry/react';
import type { AxiosError } from 'axios';

type RemoveUserIdTags = {
  lessonId: string;
  componentName: string;
  reason: string;
};

export default abstract class SentryService {
  static roomName: string;

  static setUser(id: string) {
    setUser({ id });
  }

  static captureRemoveUserId({
    lessonId,
    componentName,
    reason,
    apiError,
  }: RemoveUserIdTags & { apiError?: AxiosError }) {
    const error = new Error('RemoveUserId');
    const deviceId = localStorage.getItem('deviceId');
    captureException(error, {
      level: 'warning',
      contexts: {
        error: {
          data: apiError?.response?.data,
        },
      },
      tags: {
        lessonId,
        componentName,
        reason,
        deviceId,
        roomName: SentryService.roomName,
      },
    });
  }
}
