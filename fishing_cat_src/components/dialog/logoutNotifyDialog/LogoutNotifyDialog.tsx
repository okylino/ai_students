import { useTranslation } from 'react-i18next';

import CustomButton from '@fishing_cat/components/customButton';
import BasicDialog from '@fishing_cat/components/dialog/basicDialog/BasicDialog';
import {
  BaseButtonWrapper,
  BaseCloseIcon,
  BaseContent,
  BaseTitle,
} from '@fishing_cat/components/dialog/basicDialog/BasicDialog.style';
import { ControlDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';

const LogoutNotifyDialog = ({ isOpen, setIsOpen }: ControlDialogProps) => {
  const { t } = useTranslation();

  const handleCloseDialog = () => {
    setIsOpen(false);
    window.location.replace('/');
  };

  return (
    <BasicDialog width='408px' isOpen={isOpen} onClose={handleCloseDialog}>
      <BaseTitle>
        {t('signOutNotify')}
        <BaseCloseIcon onClick={handleCloseDialog} />
      </BaseTitle>

      <BaseContent>{t('signOutNotifyText')}</BaseContent>

      <BaseButtonWrapper $marginTop='48px'>
        <CustomButton width='120px' onClick={handleCloseDialog}>
          {t('confirm')}
        </CustomButton>
      </BaseButtonWrapper>
    </BasicDialog>
  );
};

export default LogoutNotifyDialog;
