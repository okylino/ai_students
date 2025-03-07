import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TranslationTool from '@fishing_cat/components/pages/classroom/TranslationTool';
import QuizContext from '@fishing_cat/context/quizContext/QuizContext';
import SpinnerBorder from '@/components/prototypes/SpinnerBorder';

import Image from './Image';
import QuestionTitle from './QuestionTitle';
import style from './quiz.module.css';
import { ButtonWrapper, FlexJustifyCenter } from './quiz.style';

const MAX_LINE = 5;

const ShortAnswer = ({ answerQuiz, isSubmit, setIsSubmit, isLoading, quiz }) => {
  const [isTextEmpty, setIsTextEmpty] = useState(true);
  const textRef = useRef();
  const [textCount, setTextCount] = useState(0);
  const { t } = useTranslation();
  const [previousValue, setPreviousValue] = useState('');
  const [isSended, setIsSended] = useState(false);

  const { enableTranslation } = useContext(QuizContext);

  const { imgUrl, status: quizStatus, studentAnswer, title, id: questionId } = quiz;

  useEffect(() => {
    if (studentAnswer && studentAnswer.length > 0) {
      setIsSubmit(true);
      textRef.current.value = studentAnswer;
      setPreviousValue(studentAnswer);
      setIsSended(true);
    } else if (studentAnswer && studentAnswer.length === 0) {
      setIsSubmit(false);
      textRef.current.value = '';
      setPreviousValue('');
      setIsSended(false);
    }
    editText();
    // eslint-disable-next-line
  }, [studentAnswer]);

  useEffect(() => {
    if (isSubmit && !isSended) {
      textRef.current.value = '';
      editText();
    }
  }, [isSubmit, isSended]);

  const sendAnswer = () => {
    const text = textRef.current.value;
    answerQuiz(text);
    setIsSended(true);
  };

  const editText = () => {
    const text = textRef.current.value;
    if (text) {
      setIsTextEmpty(false);
    } else {
      setIsTextEmpty(true);
    }

    const currentTextArray = text.split('\n');
    const validTextArray = currentTextArray.slice(0, MAX_LINE);
    const newText = validTextArray.join('\n');

    const previousValueArray = previousValue.split('\n');

    let count = newText.length;

    if (previousValueArray.length >= MAX_LINE) {
      if (currentTextArray.length > MAX_LINE) {
        textRef.current.value = previousValue;
        count = previousValue.length;
      } else {
        textRef.current.value = newText;
        setPreviousValue(newText);
      }
    } else {
      textRef.current.value = newText;
      setPreviousValue(newText);
    }

    setTextCount(count);
  };

  return (
    <>
      {title ? <QuestionTitle questionTitle={title} /> : <Image questionImg={imgUrl} />}

      {enableTranslation && <TranslationTool questionId={questionId} />}

      <div className={style.center_flex}>
        <textarea
          className={`${style.textarea} ${!isTextEmpty && quizStatus === 'OPEN' && !isSubmit && style.bordered}`}
          rows='6'
          ref={textRef}
          onInput={editText}
          placeholder={quizStatus === 'OPEN' ? t('answerStateWaitAnswer') : t('answerStateNotAnswer2')}
          disabled={quizStatus !== 'OPEN' || isSubmit}
          maxLength='100'
        />
        <div className={style.character_count}>{textCount}/100</div>
      </div>

      <ButtonWrapper>
        <button
          type='button'
          className={style.send}
          disabled={isTextEmpty || quizStatus !== 'OPEN' || isSubmit || isLoading}
          onClick={sendAnswer}
        >
          {isLoading ? (
            <FlexJustifyCenter>
              <SpinnerBorder />
            </FlexJustifyCenter>
          ) : isSubmit && isSended ? (
            t('toastSubmitSuccess')
          ) : (
            t('submitBtn')
          )}
        </button>
      </ButtonWrapper>
    </>
  );
};

export default ShortAnswer;
