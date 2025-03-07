import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import BasicDialog from '@fishing_cat/components/dialog/basicDialog/BasicDialog';
import { ControlDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';
import * as $ from '@fishing_cat/components/dialog/pickingDialog/PickingDialog.style';

const PickingDialog = ({ isOpen, setIsOpen }: ControlDialogProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, setIsOpen]);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <BasicDialog width='528px' height='304px' isOpen={isOpen} onClose={handleCloseDialog} isVerticalCenter>
      <$.Wrapper>
        <$.Img />
        <$.Text>
          <$.Title>{t('randomLuckyTitle')}</$.Title>
          <$.Content>{t('randomLuckyContent')}</$.Content>
        </$.Text>
      </$.Wrapper>
    </BasicDialog>
  );
};

export default PickingDialog;
