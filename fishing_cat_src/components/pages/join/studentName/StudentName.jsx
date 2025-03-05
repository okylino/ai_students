import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import api from '@fishing_cat/api';
import CustomButton from '@fishing_cat/components/customButton';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import UserContext from '@fishing_cat/context/userContext/UserContext';
import SentryService from '@fishing_cat/services/sentryService';
import { getUserIdByLessonId, removeUserIdByLessonId } from '@fishing_cat/utils/userIdUtils';

import * as $ from './studentName.style';

const DisplayName = ({ serialNumber, setIsEnterDisplayName, seatNumber }) => {
  const [nameCount, setNameCount] = useState(0);
  const nameRef = useRef();
  const queryParams = new URLSearchParams(window.location.search);
  const roomId = queryParams.get('roomId');
  const { lessonId } = useContext(LessonContext);
  const { login, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userId = getUserIdByLessonId({ lessonId });

  useEffect(() => {
    const handleBeforeUnload = () => {
      handleSetStudentName();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    // eslint-disable-next-line
  }, []);

  const countCharacters = (inputString) => {
    const characterRegex =
      /[\u4e00-\u9fa5A-Za-z0-9\u2000-\u206F\u2E00-\u2E7F\u3000-\u303F\uFF00-\uFFEF]|[^\u3105-\u3129\u02CA\u02C7\u02CB\u02D9\s]/g;
    const characters = inputString.match(characterRegex);
    return characters ? characters.length : 0;
  };

  const handleEditName = () => {
    const name = nameRef.current.value;
    const count = countCharacters(name);
    const bopomofoRegex = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/g;
    if (count > 16 || bopomofoRegex.test(name)) {
      nameRef.current.value = name.substr(0, 16);
    } else {
      setNameCount(count);
      console.log(count);
    }
  };

  const handleSetStudentName = async () => {
    const { display_name: displayName } = await api.student.getStudentSeat({ lesson_id: lessonId, student_id: userId });
    const studentName = displayName || nameRef.current.value;

    if (!displayName) {
      await api.student.putStudentName({ lesson_id: lessonId, student_id: userId, display_name: studentName });
    }
    SentryService.setUser(userId ?? 'unKnown');

    login(studentName, userId, seatNumber, serialNumber);
    navigate(`/classroom?roomId=${roomId}&lessonId=${lessonId}`);
  };

  const handlePrevious = async () => {
    await api.student.releaseSeat({ lesson_id: lessonId, student_id: userId });
    setIsEnterDisplayName(false);
    logout();
    removeUserIdByLessonId({ lessonId, isForce: true });
    localStorage.removeItem('accessToken');
    navigate(`/join?roomId=${roomId}`, {
      replace: true,
    });
  };

  return (
    <>
      <$.Title>{t('enterDisplayName')}</$.Title>

      <$.NameWrapper>
        <$.SerialNumber>{seatNumber && seatNumber.padStart(2, '0')}</$.SerialNumber>
        <$.InputWrapper>
          <$.NameInput
            type='text'
            placeholder={t('enterDisplayName')}
            ref={nameRef}
            onChange={handleEditName}
            $isActive={nameCount > 0}
          />
          <$.InputDescription>{nameCount}/16</$.InputDescription>
        </$.InputWrapper>
      </$.NameWrapper>

      <$.ButtonWrapper>
        <CustomButton onClick={handlePrevious} width='180px' outlined>
          {t('previousStep')}
        </CustomButton>
        <CustomButton onClick={handleSetStudentName} width='180px' disabled={!nameRef.current?.value}>
          {t('joinClassTitle')}
        </CustomButton>
      </$.ButtonWrapper>
    </>
  );
};

export default DisplayName;
