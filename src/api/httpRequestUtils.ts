import { BaseQueryApi } from '@reduxjs/toolkit/query';
import { AxiosHeaders } from 'axios';

import i18nInstance from '@/i18n/i18n';
import { RootState } from '@/redux/store';
import { oidcService } from '@/service/oidcService';
import { clearLoginData } from '@/utils/authUtils';

import { AuthLogin } from './models/auth/authLogin';

export const setupRequestHeaders = (headers: AxiosHeaders | Headers, userInfo: AuthLogin | Record<string, never>) => {
  if (userInfo.accessToken) {
    headers.set('authorization', `Bearer ${userInfo.accessToken}`);
    headers.set('token', userInfo.accessToken); // Add token for non-login APIs
    headers.set('country', userInfo.country);
  }
  headers.set('lang', i18nInstance.resolvedLanguage || i18nInstance.language || 'en');
  headers.set('timezone', `${new Date().getTimezoneOffset()}`);
};

export const handleHttpsStatusCode = <T extends { status: number }>(
  response: T | Response,
  getStoreState: BaseQueryApi['getState'],
) => {
  const state = getStoreState() as RootState;
  switch (response?.status) {
    case 401: {
      const user = state.userStore?.user;
      if (user?.idToken) {
        oidcService.signOut({ force: true }, user.idToken);
        clearLoginData();
        break;
      }
      clearLoginData();
      window.location.href = '/';
      break;
    }
    case 400:
    case 403:
    case 404:
    default:
      console.error(
        `%c API 請求發生錯誤。 ${response?.status ? `Status Code [${response.status}]` : ''}`,
        'color: #CC5A71; font-weight: bold;',
      );
      break;
  }
};
