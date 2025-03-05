import { createApi } from '@reduxjs/toolkit/query/react';

import {
  GetImageQuizTranslationReq,
  GetImageQuizTranslationResp,
} from '@fishing_cat/api/models/translation/getImageQuizTranslation';
import { GetLanguageListResp } from '@fishing_cat/api/models/translation/getLanguageList';
import {
  GetTextQuizTranslationReq,
  GetTextQuizTranslationResp,
} from '@fishing_cat/api/models/translation/getTextQuizTranslation';
import {
  GetTranslationSettingReq,
  GetTranslationSettingResp,
} from '@fishing_cat/api/models/translation/getTranslationSetting';
import { RESTFUL_METHOD } from '@fishing_cat/enums/restfulMethodEnum';
import { axiosBaseQuery } from '@fishing_cat/redux/slices/apiSlice';

export const translationApi = createApi({
  reducerPath: 'translationApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getLanguageList: build.query<GetLanguageListResp[], void>({
      query: () => ({
        url: `/translation_tool/lang_list`,
        method: RESTFUL_METHOD.GET,
      }),
    }),
    getTranslateSetting: build.query<GetTranslationSettingResp, GetTranslationSettingReq>({
      query: ({ quizId }) => ({
        url: `/translation_tool/quizzes/${quizId}/settings`,
        method: RESTFUL_METHOD.GET,
      }),
    }),
    getImageQuizTranslation: build.query<GetImageQuizTranslationResp, GetImageQuizTranslationReq>({
      query: ({ quizId, lang }) => ({
        url: `translation_tool/quizzes/${quizId}/image_translation/${lang}`,
        method: RESTFUL_METHOD.GET,
      }),
    }),
    getTextQuizTranslation: build.query<GetTextQuizTranslationResp, GetTextQuizTranslationReq>({
      query: ({ quizId, lang, textList }) => ({
        url: `translation_tool/quizzes/${quizId}/text_translation/${lang}`,
        method: RESTFUL_METHOD.POST,
        data: {
          text: textList,
        },
      }),
    }),
  }),
});

export const {
  useGetLanguageListQuery,
  useGetTranslateSettingQuery,
  useGetImageQuizTranslationQuery,
  useGetTextQuizTranslationQuery,
} = translationApi;
