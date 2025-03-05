import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
import UserContext from '@fishing_cat/context/userContext/UserContext';
import { LESSON_STATUS } from '@fishing_cat/enums/lessonStatus';
import { LEAVE_REASON } from '@fishing_cat/enums/mixpanelReason';
import { sendLeaveToMixpanel } from '@fishing_cat/services/mixpanelService';
import { getUserIdByLessonId, removeUserIdByLessonId } from '@fishing_cat/utils/userIdUtils';

const ReselectNumberDialog = ({ isOpen, setIsOpen }: ControlDialogProps) => {
  const { t } = useTranslation();
  const { logout } = useContext(UserContext);
  const { lessonStatus, lessonId } = useContext(LessonContext);
  const [isLeaving, setIsLeaving] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const roomId = queryParams.get('roomId');
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleLeaveLesson = async () => {
    setIsLeaving(true);

    const userId = getUserIdByLessonId({ lessonId });

    if (!userId) return;
    await api.student.releaseSeat({ lesson_id: lessonId, student_id: userId });
    logout();

    localStorage.removeItem('accessToken');
    setIsLeaving(false);
    sendLeaveToMixpanel('by_student', lessonId, LEAVE_REASON.LEAVE_LESSON);
    setIsOpen(false);
    removeUserIdByLessonId({ lessonId, isForce: true });
    navigate(`/join?roomId=${roomId}`);
  };

  return (
    <BasicDialog width='408px' isOpen={isOpen} onClose={handleCloseDialog}>
      <BaseTitle>
        {t('reselectNumber')}
        <BaseCloseIcon onClick={handleCloseDialog} />
      </BaseTitle>

      <BaseContent>
        {t('checkLeaveLesson')}
        {lessonStatus !== LESSON_STATUS.POST_CLASS && <br />}
        {lessonStatus !== LESSON_STATUS.POST_CLASS && `${t('notRecordLearning')}`}
      </BaseContent>

      <BaseButtonWrapper $marginTop='48px'>
        <CustomButton width='120px' onClick={() => setIsOpen(false)} outlined color='grey'>
          {t('cancelBtn')}
        </CustomButton>
        <CustomButton width='120px' onClick={handleLeaveLesson} color='red' disabled={isLeaving}>
          {t('leaveBtn')}
        </CustomButton>
      </BaseButtonWrapper>
    </BasicDialog>
  );
};

export default ReselectNumberDialog;
