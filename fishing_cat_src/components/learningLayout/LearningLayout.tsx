import { Outlet, Navigate } from 'react-router-dom';

import * as Styled from '@fishing_cat/components/learningLayout/LearningLayout.style';
import LegalAndVersionInfo from '@fishing_cat/layouts/legalAndVersionInfo';
import { useAppSelector } from '@fishing_cat/redux/hook';

const LearningLayout = () => {
  const user = useAppSelector((state) => state.userStore.user);

  if (!user?.userId) return <Navigate to='/' replace />;

  return (
    <>
      <Outlet />
      <Styled.LegalVersionWrapper>
        <LegalAndVersionInfo />
      </Styled.LegalVersionWrapper>
    </>
  );
};
export default LearningLayout;
