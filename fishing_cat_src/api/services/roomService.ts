import baseAxios from '@fishing_cat/api/axios';
import { RoomInfoReq, RoomInfoResp } from '@fishing_cat/api/models/room/roomInfo';

export const getRoomInfo = async (data: RoomInfoReq) =>
  baseAxios.get<RoomInfoResp>(`/rooms/${data.roomId}`).then((res) => res.data.data);
