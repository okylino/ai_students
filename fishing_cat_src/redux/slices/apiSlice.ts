import { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import baseAxios from '@fishing_cat/api/axios';

// eslint-disable-next-line import/prefer-default-export
export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    FetchBaseQueryError
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await baseAxios({
        url,
        method,
        data: data && snakecaseKeys(data),
        params: params && snakecaseKeys(params),
        headers,
      });
      return { data: camelcaseKeys(result.data.data, { deep: true }) };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        } as FetchBaseQueryError,
      };
    }
  };
