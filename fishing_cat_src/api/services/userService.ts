import baseAxios from '@fishing_cat/api/axios';
import { formatSnakeObjToLowerCamel } from '@fishing_cat/utils/formatUtils';

import { UserAvatarReq, UserAvatarResp } from '../models/user/userAvatar';
import { UserAvatarListResp } from '../models/user/userAvatarList';

export const getUserAvatarList = async () =>
  baseAxios.get<UserAvatarListResp>(`/avatar/icons`).then((res) => res?.data);

export const getUserAvatar = async ({ userId }: { userId: string }) =>
  baseAxios.get<UserAvatarResp>(`/user/${userId}/avatar`).then((res) => res?.data.data);

export const putUserAvatar = async (data: UserAvatarReq): Promise<UserAvatarListResp['data']> =>
  baseAxios
    .put<UserAvatarListResp>(`/user/avatar`, { icon: data.icon, background: Number(data.background) })
    .then((res) => formatSnakeObjToLowerCamel(res?.data?.data));
