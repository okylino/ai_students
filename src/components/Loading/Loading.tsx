import { FC } from 'react';
import loadingGif from '@/assets/loading/loading.gif';
import { LoadingWrapper, LoadingContent } from './Loading.styles';

export const Loading: FC = () => {
  return (
    <LoadingWrapper>
      <LoadingContent>
        <img src={loadingGif} alt="loading" style={{ width: '40px', height: '40px' }} />
      </LoadingContent>
    </LoadingWrapper>
  );
}; 