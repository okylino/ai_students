import { useTranslation } from 'react-i18next';

import CustomButton from '@fishing_cat/components/customButton';
import BasicDialog from '@fishing_cat/components/dialog/basicDialog/BasicDialog';
import {
  BaseButtonWrapper,
  BaseCloseIcon,
  BaseContent,
} from '@fishing_cat/components/dialog/basicDialog/BasicDialog.style';
import * as $ from '@fishing_cat/components/dialog/uploadImgErrorDialog/UploadImgErrorDialog.style';
import { UploadImgErrorDialogProps } from '@fishing_cat/components/dialog/uploadImgErrorDialog/UploadImgErrorDialog.type';

const UploadImgErrorDialog = ({ isOpen, setIsOpen, fileName }: UploadImgErrorDialogProps) => {
  const { t } = useTranslation();

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  return (
    <BasicDialog width='312px' isOpen={isOpen} onClose={handleCloseDialog}>
      <$.Title>
        {t('errorImageFormatTitle')}
        <BaseCloseIcon onClick={handleCloseDialog} />
      </$.Title>

      <BaseContent>{t('errorImageFormatDescr')}</BaseContent>
      <ul>
        <li>{fileName}</li>
      </ul>

      <BaseButtonWrapper $marginTop='24px'>
        <CustomButton onClick={handleCloseDialog} style={{ padding: '10px 16px' }}>
          {t('gotIt')}
        </CustomButton>
      </BaseButtonWrapper>
    </BasicDialog>
  );
};

export default UploadImgErrorDialog;
