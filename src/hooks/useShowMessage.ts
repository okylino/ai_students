import { useTranslation } from 'react-i18next';

import { TOAST_TYPE } from '@/enums/toastType';
import { useAppDispatch } from '@/redux/hook';
import { openToastWithMessage } from '@/redux/slices/layoutSlice';

const useShowMessage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const showNoteMessage = (status: 'success' | 'error' = 'success') => {
    dispatch(
      openToastWithMessage({
        message: status === 'success' ? t('common:action.note.success') : t('common:action.note.failed'),
        type: status === 'success' ? TOAST_TYPE.SUCCESS : TOAST_TYPE.ERROR,
      }),
    );
  };

  const showPinFailMessage = (isPinned: boolean = true) => {
    dispatch(
      openToastWithMessage({
        message: isPinned ? t('common:action.pin.failed') : t('common:action.unpin.failed'),
        type: TOAST_TYPE.ERROR,
      }),
    );
  };

  return { showNoteMessage, showPinFailMessage };
};

export default useShowMessage;
