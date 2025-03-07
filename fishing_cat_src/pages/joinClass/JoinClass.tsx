import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ArrowLeftIcon from '@fishing_cat/assets/svgr/icons/arrow-left.svg';
import JoinModal from '@fishing_cat/components/pages/joinClass/JoinModal';
import HomePageWrapper from '@fishing_cat/layouts/homePage';
import * as $ from '@fishing_cat/pages/joinClass/JoinClass.style';

const JoinClass = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <HomePageWrapper>
      <$.Wrapper>
        <$.Modal>
          <$.Title>{t('guestJoin')}</$.Title>
          <JoinModal />
        </$.Modal>
        <$.BackButton
          onClick={() => {
            navigate('/');
          }}
        >
          <ArrowLeftIcon />
          Back
        </$.BackButton>
      </$.Wrapper>
    </HomePageWrapper>
  );
};
export default JoinClass;
