import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getLessonByRoom } from '@fishing_cat/api/services/studentService';
import * as $ from '@fishing_cat/components/enterClassId/EnterClassId.style';
import LessonContext from '@fishing_cat/context/lessonContext/LessonContext';
import { ERROR_STATUS } from '@fishing_cat/enums/enterClassIdEnum';
import { LessonByRoomFilter } from '@fishing_cat/enums/lessonByRoomFilterEnum';
import { LESSON_STATUS } from '@fishing_cat/enums/lessonStatus';
import COLOR from '@fishing_cat/styles/color';

import CustomButton from '../customButton';
import { colorMap } from '../customButton/CustomBtn';
import { EnterClassIdProps } from './EnterClassId.type';

const inputColorMap = {
  green: COLOR.TEAL[500],
  grey: COLOR.GRAY[800],
  blue: COLOR.BLUE[600],
  red: COLOR.RED[600],
};

const EnterClassId: React.FC<EnterClassIdProps<keyof typeof colorMap>> = ({
  color,
  horizontal,
  buttonText,
  buttonWidth,
}) => {
  const [disabled, setDisabled] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<ERROR_STATUS>(ERROR_STATUS.NULL);
  const { t } = useTranslation();
  // TODO add type to LessonContext
  const { setLessonId } = useContext(LessonContext);
  const navigate = useNavigate();

  useEffect(() => {
    inputValue == '' ? setDisabled(true) : setDisabled(false);
  }, [inputValue]);

  const getLesson = async (inputValue: string) =>
    getLessonByRoom({ value: inputValue, filter: LessonByRoomFilter.ROOM_NUMBER })
      .then(async (res) => {
        if (res.status === 200) {
          const { room_id, lesson_id, status } = res.data.data;
          if (room_id && lesson_id && status !== LESSON_STATUS.POST_CLASS) {
            setLessonId(lesson_id);
            localStorage.setItem('lessonId', lesson_id);
            navigate(`/join?roomId=${room_id}`);
          } else {
            setError(ERROR_STATUS.NOT_START);
          }
        }
      })
      .catch((e) => {
        console.log('getLessonByRoom', e);
        if (e.response.status === 404) {
          console.log('404');
          setError(ERROR_STATUS.NOT_EXIST);
        }
        throw e;
      });
  const isNumeric = (value: string) => /^\d+$/.test(value);
  const joinClass = async () => {
    if (!isNumeric(inputValue)) {
      setError(ERROR_STATUS.NOT_EXIST);
      return;
    }
    await getLesson(inputValue);
  };
  const ButtonComponent = (
    <CustomButton width={buttonWidth || '100%'} color={color} disabled={disabled} onClick={() => joinClass()}>
      {buttonText}
    </CustomButton>
  );

  const InputComponent = (
    <$.InputWrapper>
      <$.Input
        $warn={error !== ERROR_STATUS.NULL}
        $color={color && inputColorMap[color]}
        autoComplete='on'
        type='text'
        maxLength={8}
        value={inputValue}
        placeholder={t('enterRoomID')}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <$.ShowCount>{inputValue.length}/8</$.ShowCount>
    </$.InputWrapper>
  );
  const verticalGroup = (
    <$.VerticalInputWrapper>
      <$.VerticalContainer>
        <$.ClassId>{t('roomId')}</$.ClassId>
        {InputComponent}
        {error && (
          <$.WarningText>{error === ERROR_STATUS.NOT_EXIST ? t('roomNotFound') : t('lessonNotStart')}</$.WarningText>
        )}
        {/* {notStart && <$.WarningText> {t('lessonNotStart')}</$.WarningText>} */}
      </$.VerticalContainer>
      {ButtonComponent}
    </$.VerticalInputWrapper>
  );
  const horizontalGroup = (
    <>
      <$.HorizontalContainer>
        <$.ClassId>{t('roomId')}</$.ClassId>
        <$.InputBox>{InputComponent}</$.InputBox>
        {ButtonComponent}
      </$.HorizontalContainer>
      {error && (
        <$.MoveRight>
          <$.WarningText>{error === ERROR_STATUS.NOT_EXIST ? t('roomNotFound') : t('lessonNotStart')}</$.WarningText>
        </$.MoveRight>
      )}
    </>
  );
  return <>{horizontal ? horizontalGroup : verticalGroup}</>;
};
export default EnterClassId;
