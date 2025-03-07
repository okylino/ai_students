import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';
import defineEndpoints from '@/api/definedEndpoints';
import { AuthLoginReq, AuthLoginResp } from '@/api/models/auth/authLogin';
import { IAuthPkceResp } from '@/api/models/auth/authPkce';

export const authApi = createApi({
  reducerPath: `authApi`,
  baseQuery,
  endpoints: defineEndpoints(({ query, mutation }) => ({
    /** [GET] get pkce code */
    getAuthPkce: query.get<IAuthPkceResp>('/auth/pkce'),
    /** [POST] authLogin */
    postAuthLogin: mutation.post<AuthLoginResp, AuthLoginReq>('/vs/auth/login'),
  })),
});

export const { usePrefetch, useGetAuthPkceQuery, usePostAuthLoginMutation } = authApi;
