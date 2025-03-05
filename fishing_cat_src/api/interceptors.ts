import { AxiosResponse } from 'axios';

import { handleHttpsStatusCode, setupRequestHeaders } from '@/api/httpRequestUtils';
import { store } from '@/redux/store';

import baseAxios from './axios';

/**
 * @description 設定 baseAxios Request 攔截器 (interceptor)
 */
baseAxios.interceptors.request.use(
  (config) => {
    const { user } = store.getState().userStore;
    setupRequestHeaders(config.headers, user);
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * @description 設定 baseAxios Response 攔截器 (interceptor)
 */
baseAxios.interceptors.response.use(
  (response) =>
    // status code 2xx
    response,
  (error: { response: AxiosResponse }) => {
    // status code outside 2xx
    handleHttpsStatusCode(error.response, store.getState);
    return Promise.reject(error);
  },
);
