import { useTranslation } from 'react-i18next';

import CustomButton from '@fishing_cat/components/customButton';
import BasicDialog from '@fishing_cat/components/dialog/basicDialog/BasicDialog';
import {
  BaseButtonWrapper,
  BaseCloseIcon,
  BaseContent,
} from '@fishing_cat/components/dialog/basicDialog/BasicDialog.style';
import * as $ from '@fishing_cat/components/dialog/changeTaskDialog/ChangeTaskDialog.style';
import { ChangeTaskDialogProps } from '@fishing_cat/components/dialog/changeTaskDialog/ChangeTaskDialog.type';

const ChangeTaskDialog = ({ isOpen, setIsOpen, onChangeTask }: ChangeTaskDialogProps) => {
  const { t } = useTranslation();

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <BasicDialog width='312px' isOpen={isOpen} onClose={handleCloseDialog}>
      <$.Title>
        {t('responseNotSentTitle')}
        <BaseCloseIcon onClick={handleCloseDialog} />
      </$.Title>

      <BaseContent>{t('responseNotSentDescr')}</BaseContent>

      <BaseButtonWrapper $marginTop='24px'>
        <CustomButton onClick={handleCloseDialog} outlined style={{ padding: '10px 16px' }}>
          {t('cancelBtn')}
        </CustomButton>
        <CustomButton onClick={onChangeTask} style={{ padding: '10px 16px' }}>
          {t('switchTask')}
        </CustomButton>
      </BaseButtonWrapper>
    </BasicDialog>
  );
};

export default ChangeTaskDialog;
