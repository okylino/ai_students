import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import LogoutNotifyDialog from '@fishing_cat/components/dialog/logoutNotifyDialog/LogoutNotifyDialog';
import JoinContainer from '@fishing_cat/components/pages/home/joinContainer';
import HomePageWrapper from '@fishing_cat/layouts/homePage';

import * as $ from './Home.style';

const Home = () => {
  const { t } = useTranslation();
  const params = new URLSearchParams(window.location.search);
  const stateValue = params.get('force');
  const [isOpen, setIsOpen] = useState(stateValue === 'true');

  return (
    <HomePageWrapper>
      <$.Title>{t('joinClassTitle')}</$.Title>
      <JoinContainer />
      <LogoutNotifyDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </HomePageWrapper>
  );
};

export default Home;
