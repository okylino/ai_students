import baseAxios from '../axios';
import { BuzzReq, BuzzResp } from '../models/tools/buzz';
import { ConvertImgResp } from '../models/tools/convertImg/convertImgResp';

// TODO add req interface
export const postConvertImg = async (data) => {
  const formData = new FormData();
  formData.append('file', data);
  return baseAxios.post<ConvertImgResp>(`/tools/convert_image`, formData).then((res) => res.data);
};

export const postBuzzer = async (data: BuzzReq) =>
  baseAxios.post<BuzzResp>(`/lessons/${data.lessonId}/student/${data.userId}/buzz`).then((res) => res.data);
