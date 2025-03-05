import { Skeleton } from '@mui/material';

import * as $ from './TranslationContentSkeleton.style';

const TranslationContentSkeleton = () => (
  <$.Wrapper>
    <Skeleton variant='rounded' width='100%' height={42} sx={{ borderRadius: '8px' }} />
    <Skeleton variant='rounded' width='100%' height={270} sx={{ borderRadius: '8px' }} />
  </$.Wrapper>
);

export default TranslationContentSkeleton;
