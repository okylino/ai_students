import { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/query';
import { FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import camelcaseKeys from 'camelcase-keys';
import queryString from 'query-string';
import snakeCaseKeys from 'snakecase-keys';

import { RootState } from '@/redux/store';

import { handleHttpsStatusCode, setupRequestHeaders } from './httpRequestUtils';

const prepareHeaders = (
  headers: Headers,
  api: Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'>,
) => {
  const state = api?.getState() as RootState;
  const userInfo = state.userStore?.user;
  setupRequestHeaders(headers, userInfo);
};

const baseQuery: BaseQueryFn<string | FetchArgs, BaseQueryApi, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const newArgs = typeof args === 'object' ? { ...args } : args;
  if (typeof newArgs === 'object' && newArgs.body) newArgs.body = snakeCaseKeys(newArgs.body, { deep: true });

  const result: any = await fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_RESTFUL_API_DOMAIN}/v3/v3`,
    prepareHeaders,
    paramsSerializer: (params: Record<string, any>) => {
      const newParams = snakeCaseKeys(params, { deep: true });

      return queryString.stringify(newParams, { arrayFormat: 'none' });
    },
  })(newArgs, api, extraOptions);

  if (result.data) {
    const camelCasedData = camelcaseKeys(result.data, { deep: true });
    return { ...result, data: camelCasedData };
  }

  if (result.error) {
    handleHttpsStatusCode(result.meta?.response || {}, api.getState);

    result.error = {
      ...result.error,
      status: result.meta?.response?.status || result.status,
    };
  }

  return result;
};

export default baseQuery;
