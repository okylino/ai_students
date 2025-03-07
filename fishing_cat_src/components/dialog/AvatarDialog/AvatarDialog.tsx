import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import CustomButton from '@fishing_cat/components/customButton';
import BasicDialog from '@fishing_cat/components/dialog/basicDialog/BasicDialog';
import {
  BaseButtonWrapper,
  BaseCloseIcon,
  BaseContent,
  BaseTitle,
} from '@fishing_cat/components/dialog/basicDialog/BasicDialog.style';
import { ControlDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';

const AvatarDialog = ({ isOpen, setIsOpen }: ControlDialogProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleDialogClose = () => setIsOpen(false);

  const handleDialogConfirm = () => {
    navigate('/avatar', { state: { pathName: window.location.pathname, params: window.location.search } });
    handleDialogClose();
  };

  return (
    <BasicDialog width='408px' isOpen={isOpen} onClose={handleDialogClose}>
      <BaseTitle>
        {t('avatarDialogTitle')}
        <BaseCloseIcon onClick={handleDialogClose} alt='close_icon' />
      </BaseTitle>

      <BaseContent>{t('avatarDialogContent')}</BaseContent>

      <BaseButtonWrapper $marginTop='95px'>
        <CustomButton outlined width='120px' onClick={handleDialogClose}>
          {t('cancelBtn')}
        </CustomButton>
        <CustomButton width='120px' onClick={handleDialogConfirm}>
          {t('leaveBtn')}
        </CustomButton>
      </BaseButtonWrapper>
    </BasicDialog>
  );
};

export default AvatarDialog;
