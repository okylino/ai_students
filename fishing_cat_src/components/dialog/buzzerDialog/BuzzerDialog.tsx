import { Trans, useTranslation } from 'react-i18next';

import BasicDialog from '@fishing_cat/components/dialog/basicDialog/BasicDialog';
import * as $ from '@fishing_cat/components/dialog/buzzerDialog/BuzzerDialog.style';
import { BuzzerDialogProps } from '@fishing_cat/components/dialog/buzzerDialog/BuzzerDialog.type';
import { BUZZER_STATUS } from '@fishing_cat/enums/buzzerStatus';

const BuzzerDialog = ({ isOpen, status, successNumber, onBuzzer, onClose }: BuzzerDialogProps) => {
  const { t } = useTranslation();
  let title;
  let text;
  let primaryColor = '';
  let secondaryColor = '';

  switch (status) {
    case BUZZER_STATUS.START:
      title = t('buzzStart');
      primaryColor = '#FF4248';
      secondaryColor = '#E34061';
      text = t('buzz');
      break;
    case BUZZER_STATUS.SUCCESS:
      title = t('congratulationsMessage');
      primaryColor = '#0A8CF0';
      secondaryColor = '#0075DB';
      text = t('youWinMessage');
      break;
    case BUZZER_STATUS.FAIL:
      title = (
        <Trans i18nKey='someoneGotIt' values={{ successNumber }}>
          由 <$.Number>{successNumber}號</$.Number> 搶答成功!
        </Trans>
      );
      primaryColor = '#5c6266';
      secondaryColor = '#737575';
      text = t('buzzFailed');
      break;
    default:
      break;
  }

  return (
    <BasicDialog width='704px' height='464px' isOpen={isOpen} isCloseOnBackdropClick={false}>
      {status !== BUZZER_STATUS.START && <$.CloseIcon onClick={onClose} />}
      <$.Wrapper>
        <$.Title>{title}</$.Title>
        <$.Circle
          $primaryColor={primaryColor}
          $secondaryColor={secondaryColor}
          onClick={onBuzzer}
          disabled={status !== BUZZER_STATUS.START}
        >
          <$.Text>{text}</$.Text>
        </$.Circle>
      </$.Wrapper>
    </BasicDialog>
  );
};

export default BuzzerDialog;
