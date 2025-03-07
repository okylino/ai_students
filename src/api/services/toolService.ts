import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';
import defineEndpoints from '@/api/definedEndpoints';
import { LinkPreviewReq, LinkPreviewResp } from '@/api/models/tool/linkPreview';

export const toolApi = createApi({
  reducerPath: `toolApi`,
  baseQuery,
  endpoints: defineEndpoints(({ query }) => ({
    /** [GET] get link preview data */
    getLinkPreview: query.get<LinkPreviewResp, LinkPreviewReq>('/tools/link_preview'),
  })),
});

export const { useGetLinkPreviewQuery } = toolApi;
