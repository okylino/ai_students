import baseAxios from '@fishing_cat/api/axios';
import { AuthLoginReq } from '@fishing_cat/api/models/auth/authLogin';
import { AuthPkceResp } from '@fishing_cat/api/models/auth/authPkce';
import { formatSnakeObjToLowerCamel } from '@fishing_cat/utils/formatUtils';
import { AuthLoginResp } from '@/api/models/auth/authLogin';

/** [GET] get pkce code */
export const getAuthPkce = async (): Promise<AuthPkceResp> =>
  baseAxios.get<AuthPkceResp>(`/auth/pkce`).then((res) => res?.data);

export const postAuthLogin = async (data: AuthLoginReq): Promise<AuthLoginResp['data']> =>
  baseAxios.post<AuthLoginResp>(`/vs/auth/login`, data).then((res) => formatSnakeObjToLowerCamel(res?.data?.data));
