import { useTranslation } from 'react-i18next';

import CustomButton from '@fishing_cat/components/customButton';
import BasicDialog from '@fishing_cat/components/dialog/basicDialog/BasicDialog';
import {
  BaseButtonWrapper,
  BaseCloseIcon,
  BaseContent,
} from '@fishing_cat/components/dialog/basicDialog/BasicDialog.style';
import * as $ from '@fishing_cat/components/dialog/sendTaskErrorDialog/SendTaskErrorDialog.style';
import { SendTaskErrorDialogProps } from '@fishing_cat/components/dialog/sendTaskErrorDialog/SendTaskErrorDialog.type';

const SendTaskErrorDialog = ({ isOpen, onClose }: SendTaskErrorDialogProps) => {
  const { t } = useTranslation();

  return (
    <BasicDialog width='312px' isOpen={isOpen} onClose={onClose}>
      <$.Title>
        {t('errorFailedSendTitle')}
        <BaseCloseIcon onClick={onClose} />
      </$.Title>

      <BaseContent>{t('errorFailedSendDescr')}</BaseContent>

      <BaseButtonWrapper $marginTop='24px'>
        <CustomButton onClick={onClose} style={{ padding: '10px 16px' }}>
          {t('gotIt')}
        </CustomButton>
      </BaseButtonWrapper>
    </BasicDialog>
  );
};

export default SendTaskErrorDialog;
