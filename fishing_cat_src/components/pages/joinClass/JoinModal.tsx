import { useTranslation } from 'react-i18next';

import EnterClassId from '@fishing_cat/components/enterClassId/EnterClassId';
// import CustomBtn from '@fishing_cat/components/customButton';
import * as $ from '@fishing_cat/components/pages/joinClass/JoinModal.style';

const JoinModal = () => {
  const { t } = useTranslation();

  return (
    <$.Container>
      <EnterClassId color='green' buttonText={t('joinClass')} />
      {/* //TODO will update to next version */}
      {/* <$.LineContainer>
				<$.Line />
				<span>or</span>
				<$.Line />
			</$.LineContainer> */}
      {/* <CustomBtn color='green' onClick={() => {}}>
				{t('scanQRCode')}
			</CustomBtn> */}
    </$.Container>
  );
};
export default JoinModal;
