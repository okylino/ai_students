import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ALPHABET_OPTION,
  CIRCLE_ALPHABET_OPTION,
  CIRCLE_NUMBER_OPTION,
  OPTION_TYPE,
  trueFalseMap,
} from '@fishing_cat/enums/option';
import { QUIZ_TYPE } from '@fishing_cat/enums/quiz';
import { useAppSelector } from '@fishing_cat/redux/hook';
import SpinnerBorder from '@/components/prototypes/SpinnerBorder';

import style from './quiz.module.css';
import { AnswerTextWrapper, FlexJustifyCenter, SendBtnWrapper } from './quiz.style';

const mapToSpecialCharacters = (optionId, optionType, lan) => {
  switch (optionType) {
    case OPTION_TYPE.TRUE_FALSE:
      return trueFalseMap[lan][optionId];
    case OPTION_TYPE.ALPHABET:
      return CIRCLE_ALPHABET_OPTION[optionId];
    case OPTION_TYPE.NUMBER:
      return CIRCLE_NUMBER_OPTION[optionId];
  }
};

export const AnswerText = ({ optionType, quizAnswer, optionList, answer }) => {
  const { t, i18n } = useTranslation();
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);

  useEffect(() => {
    const sortedAnswer = JSON.stringify(
      answer
        .map((ans) => ans.option_id)
        .slice()
        .sort(),
    );
    const sortedQuizAnswer = JSON.stringify(quizAnswer.slice().sort());
    if (sortedAnswer === sortedQuizAnswer) {
      setIsCorrect(true);
    }
  }, [quizAnswer, answer]);

  useEffect(() => {
    const mappedOptionList = optionList.map((option) => ({
      ...option,
      label: mapToSpecialCharacters(option.option_id, optionType, i18n.language),
    }));
    setSelectedLabels(
      quizAnswer
        .slice()
        .sort()
        .map((answerId) => {
          const matchedOption = mappedOptionList.find((option) => option.option_id === answerId);
          return matchedOption ? matchedOption.label : '';
        }),
    );
  }, [quizAnswer, i18n.language, optionList, optionType]);

  const answerStateText =
    answer.length !== 0
      ? isCorrect
        ? t('answerStateCorrect')
        : t('answerStateIncorrect')
      : t('answerStateNotAnswered');

  return (
    <AnswerTextWrapper>
      <p>
        {answerStateText} {selectedLabels.join(' ')}
      </p>
    </AnswerTextWrapper>
  );
};

const combineButtonClassName = ({ option, answer, quizAnswer, isSubmit, isLoading }) => {
  const isActive = Array.isArray(answer) ? answer.some((ans) => ans.option_id === option.option_id) : false;
  const combineAnsweredClassName = (option) => {
    const buttonClassNames = [];
    const isCorrect = Array.isArray(quizAnswer) ? quizAnswer.includes(option.option_id) : false;
    buttonClassNames.push(isCorrect ? style.green : isActive ? style.red : style.gray);
    return buttonClassNames;
  };
  const combineDefaultClassName = () => {
    const buttonClassNames = [];
    if (isSubmit || isLoading) {
      buttonClassNames.push(style.gray);
    } else {
      buttonClassNames.push(style.blue);
    }
    if (isActive) {
      buttonClassNames.push(style.active);
    }
    return buttonClassNames;
  };
  const classNameList = quizAnswer?.length > 0 ? combineAnsweredClassName(option) : combineDefaultClassName();
  return classNameList.join(' ');
};

export const ButtonWithOptions = ({
  optionList,
  answer,
  quizAnswer,
  isSubmit,
  addAnswer,
  quizStudentAnswer,
  setIsSubmit,
  questionType,
  optionType,
  isLoading,
}) => {
  const { i18n } = useTranslation();
  const [normalMap, setNormalMap] = useState({});
  const [circleMap, setCircleMap] = useState({});

  const { translatedContent, isTextTranslationFetching, showTranslate } = useAppSelector(
    (state) => state.translationStore,
  );

  useEffect(() => {
    if (quizStudentAnswer && quizStudentAnswer.length > 0) {
      const studentAnswerList = optionList.filter((option) => quizStudentAnswer.includes(option.option_id));
      if (studentAnswerList.length > 0) {
        studentAnswerList.map((studentAnswer) => addAnswer(studentAnswer));
        setIsSubmit(true);
      }
    }
    // eslint-disable-next-line
  }, [quizStudentAnswer]);

  useEffect(() => {
    const optionMap = (optionType, lan) => {
      switch (optionType) {
        case OPTION_TYPE.TRUE_FALSE:
          setNormalMap(trueFalseMap[lan]);
          setCircleMap(trueFalseMap[lan]);
          break;
        case OPTION_TYPE.ALPHABET:
          setNormalMap(ALPHABET_OPTION);
          setCircleMap(CIRCLE_ALPHABET_OPTION);
          break;
        case OPTION_TYPE.NUMBER:
          setCircleMap(CIRCLE_NUMBER_OPTION);
          break;
      }
    };
    optionMap(optionType, i18n.language);
  }, [optionType, i18n.language]);

  const newOptionsList = optionList.map((item, index) => ({
    ...item,
    translatedText: translatedContent[index],
  }));

  const options = newOptionsList.map((option, i) => {
    const optionButtonClassName = combineButtonClassName({ option, answer, quizAnswer, isSubmit, isLoading });

    const typeWithContent = [QUIZ_TYPE.SINGLE_SELECT, QUIZ_TYPE.MULTIPLE_SELECT];

    const handleClick = (option) => {
      quizAnswer?.length > 0 ? {} : addAnswer(option);
    };

    return option.content && typeWithContent.includes(questionType) ? (
      circleMap && (
        <div className={style.content_row} key={i}>
          <p className={style.option_icon}>{circleMap[option.option_id]}</p>
          <button
            type='button'
            className={`${optionButtonClassName} ${style.content}`}
            onClick={() => handleClick(option)}
            disabled={isSubmit || isLoading}
          >
            {option.content}

            {isTextTranslationFetching && <Skeleton variant='rounded' width='50%' height={28} />}
            {!isTextTranslationFetching && showTranslate && (
              <span className={style.content_translated}> {option.translatedText}</span>
            )}
          </button>
        </div>
      )
    ) : (
      <button
        type='button'
        className={optionButtonClassName}
        onClick={() => handleClick(option)}
        key={i}
        disabled={isSubmit || isLoading}
      >
        <p>{optionType === OPTION_TYPE.NUMBER ? option.option_id : normalMap && normalMap[option.option_id]}</p>
      </button>
    );
  });

  return options;
};

export const SendButton = ({ answer, sendAnswer, quizAnswer, isLoading, isSubmit, text }) => {
  const { t } = useTranslation();

  return (
    quizAnswer?.length <= 0 && (
      <SendBtnWrapper>
        <button
          type='button'
          className={`${style.send} ${isLoading ? style.loading : ''}`}
          disabled={answer?.length === 0 || isSubmit || isLoading}
          onClick={sendAnswer}
        >
          {isLoading ? (
            <FlexJustifyCenter>
              <SpinnerBorder />
            </FlexJustifyCenter>
          ) : (
            <span>{isSubmit ? t(text) || t('waitingState') : t('submitBtn')}</span>
          )}
        </button>
      </SendBtnWrapper>
    )
  );
};
