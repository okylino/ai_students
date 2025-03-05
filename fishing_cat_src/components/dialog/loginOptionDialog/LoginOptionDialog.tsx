import { useTranslation } from 'react-i18next';

import CustomButton from '@fishing_cat/components/customButton';
import BasicDialog from '@fishing_cat/components/dialog/basicDialog/BasicDialog';
import {
  BaseButtonWrapper,
  BaseCloseIcon,
  BaseContent,
  BaseTitle,
} from '@fishing_cat/components/dialog/basicDialog/BasicDialog.style';
import { LoginOptionDialogProps } from '@fishing_cat/components/dialog/loginOptionDialog/LoginOptionDialog.type';
import { oidcService } from '@/service/oidcService';

const LoginOptionDialog = ({ isOpen, setIsOpen, onGuestJoin }: LoginOptionDialogProps) => {
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(window.location.search);
  const roomId = queryParams.get('roomId');

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleSignIn = () => {
    oidcService.signIn({ roomId });
    setIsOpen(false);
  };

  const handleGuestJoin = () => {
    onGuestJoin();
    setIsOpen(false);
  };

  return (
    <BasicDialog width='408px' isOpen={isOpen} onClose={handleCloseDialog}>
      <BaseTitle>
        {t('signIn')}
        <BaseCloseIcon onClick={handleCloseDialog} />
      </BaseTitle>

      <BaseContent>{t('signInText')}</BaseContent>

      <BaseButtonWrapper $marginTop='48px'>
        <CustomButton width='120px' onClick={handleSignIn} outlined>
          {t('signIn')}
        </CustomButton>
        <CustomButton width='166px' onClick={handleGuestJoin}>
          {t('continueGuest')}
        </CustomButton>
      </BaseButtonWrapper>
    </BasicDialog>
  );
};

export default LoginOptionDialog;
