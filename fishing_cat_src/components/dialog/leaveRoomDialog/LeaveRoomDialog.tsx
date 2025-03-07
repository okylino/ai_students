import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import api from '@fishing_cat/api';
import CustomButton from '@fishing_cat/components/customButton';
import BasicDialog from '@fishing_cat/components/dialog/basicDialog/BasicDialog';
import {
  BaseButtonWrapper,
  BaseCloseIcon,
  BaseContent,
  BaseTitle,
} from '@fishing_cat/components/dialog/basicDialog/BasicDialog.style';
import { ControlDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { STUDENT_STATUS } from '@fishing_cat/enums/studentStatus';
import { useAppSelector } from '@fishing_cat/redux/hook';
import { ROUTE_PATH } from '@/enums/routePath';

const LeaveRoomDialog = ({ isOpen, setIsOpen }: ControlDialogProps) => {
  const { t } = useTranslation();
  const { lessonId } = useContext(LessonContext);
  const loginUser = useAppSelector((state) => state.userStore.user);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleLeaveRoom = async () => {
    if (!loginUser.userId) return;
    await api.student.putStudentStatus({ lessonId, studentId: loginUser.userId, status: STUDENT_STATUS.ABSENT });
    window.location.href = ROUTE_PATH.MY_CLASS;
  };

  return (
    <BasicDialog width='408px' isOpen={isOpen} onClose={handleCloseDialog}>
      <BaseTitle>
        {t('headerLeaveClass')}
        <BaseCloseIcon onClick={handleCloseDialog} />
      </BaseTitle>

      <BaseContent>{t('leaveClassText')}</BaseContent>

      <BaseButtonWrapper $marginTop='48px'>
        <CustomButton width='120px' onClick={handleCloseDialog} outlined>
          {t('cancelBtn')}
        </CustomButton>

        <CustomButton width='120px' onClick={handleLeaveRoom}>
          {t('leaveBtn')}
        </CustomButton>
      </BaseButtonWrapper>
    </BasicDialog>
  );
};

export default LeaveRoomDialog;
