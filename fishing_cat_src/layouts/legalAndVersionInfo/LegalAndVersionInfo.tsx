import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getBackendVersion } from '@fishing_cat/api/services/versionService';
import * as $ from '@fishing_cat/layouts/legalAndVersionInfo/LegalAndVersionInfo.style';

let apiVersion = '';
const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
if (typeof window !== 'undefined' && !isProduction) {
  const getVersion = async () => (apiVersion = await getBackendVersion());
  getVersion();
}
const LegalLink = () => {
  const { t } = useTranslation();
  return (
    <$.LinkWrapper>
      <$.Link
        href='https://www.viewsonic.com/global/legal/?utm_source=UNIVERSE+website&utm_medium=UNIVERSE+website+Footer&utm_campaign=Always+on&utm_id=UNIVERSE+Traffic'
        target='_blank'
        rel='noreferrer noopener'
      >
        {t('termsOfService')}
      </$.Link>
      <$.Line />
      <$.Link href='https://www.classswift.viewsonic.io/policy' target='_blank' rel='noreferrer noopener'>
        {t('privacyPolicy')}
      </$.Link>
    </$.LinkWrapper>
  );
};
const LegalAndVersionInfo = () => {
  const { t } = useTranslation();
  const [showProductionVersion, setShowProductionVersion] = useState(true);

  const handleToggleVersion = () => {
    if (isProduction) return;
    setShowProductionVersion(!showProductionVersion);
  };
  return (
    <$.Wrapper onClick={handleToggleVersion}>
      {showProductionVersion ? (
        <$.VersionText>{`${t('version')} ${import.meta.env.VITE_APP_VERSION.split('-')[0]}`}</$.VersionText>
      ) : (
        <>
          <$.VersionText>Version: {import.meta.env.VITE_APP_VERSION}</$.VersionText>
          <$.VersionText>API Version: {apiVersion}</$.VersionText>
        </>
      )}

      <LegalLink />
    </$.Wrapper>
  );
};

export default LegalAndVersionInfo;
