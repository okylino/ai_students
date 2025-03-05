import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Option } from '@fishing_cat/api/models/lesson/quiz';
import { GetImageQuizTranslationResp } from '@fishing_cat/api/models/translation/getImageQuizTranslation';
import { useGetImageQuizTranslationQuery } from '@fishing_cat/api/services/translationService';
import SettingHubIcon from '@fishing_cat/assets/svgr/icons/settings-hub.svg';
import TranslationLanguageDialog from '@fishing_cat/components/dialog/TranslationLanguageDialog';
import TranslationBar from '@fishing_cat/components/pages/classroom/TranslationBar';
import TranslationContent from '@fishing_cat/components/pages/classroom/TranslationContent';
import TranslationContentSkeleton from '@fishing_cat/components/pages/classroom/TranslationContentSkeleton';
import QuizContext from '@fishing_cat/context/quizContext/QuizContext';
import { QUIZ_SOURCE_TYPE } from '@fishing_cat/enums/quiz';
import { toastType } from '@fishing_cat/enums/toastType';
import useTextQuizTranslation from '@fishing_cat/hooks/useTextQuizTranslation';
import useTranslationList from '@fishing_cat/hooks/useTranslationList';
import { useAppDispatch, useAppSelector } from '@fishing_cat/redux/hook';
import { openToastWithMessage } from '@fishing_cat/redux/slices/globalSlice';
import { setShowTranslate } from '@fishing_cat/redux/slices/translationSlice';
import { CreateQuizOption } from '@fishing_cat/socket/models/quiz';

import * as $ from './TranslationTool.style';

interface TranslationToolProps {
  questionId: string;
}

const TranslationTool = ({ questionId }: TranslationToolProps) => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);

  const showTranslate = useAppSelector((state) => state.translationStore.showTranslate);

  const dispatch = useAppDispatch();

  const { sourceType, questionTitle, optionList } = useContext(QuizContext);

  const optionContentList = optionList.map((item: Option | CreateQuizOption) => item.content);

  const isTextBasedQuiz = sourceType === QUIZ_SOURCE_TYPE.QUIZ_GENERATOR;
  const textList = isTextBasedQuiz && questionTitle ? [questionTitle, ...optionContentList] : [];

  const { translationLanguageList = [], defaultLang } = useTranslationList();

  const handleSettingClick = () => setIsLanguageDialogOpen(true);

  const handleTranslate = () => {
    dispatch(setShowTranslate(!showTranslate));
  };

  const lang = currentLanguage || defaultLang;

  const {
    data: imageTranslationData = {} as GetImageQuizTranslationResp,
    isFetching: isImageTranslationFetching,
    isError,
  } = useGetImageQuizTranslationQuery(
    { quizId: questionId, lang },
    { skip: !showTranslate || !questionId || !lang || isTextBasedQuiz },
  );

  useEffect(() => {
    if (isError) {
      dispatch(
        openToastWithMessage({
          message: t('translateFailed'),
          type: toastType.WARNING,
        }),
      );
    }
  }, [isError, dispatch, t]);

  const imageCodeFromData = imageTranslationData?.lang ?? '';
  const imageTranslationList = imageTranslationData?.translationList ?? [];

  const { textCodeFromData } = useTextQuizTranslation({
    quizId: questionId,
    lang,
    showTranslate,
    isTextBasedQuiz,
    textList,
  });

  const codeFromData = isTextBasedQuiz ? textCodeFromData : imageCodeFromData;

  const languageFromData = translationLanguageList.find((item) => item.value === codeFromData)?.label ?? '';

  return (
    <$.Wrapper>
      <$.TranslationAction>
        <$.Text onClick={handleTranslate}>{showTranslate ? t('translateInactivate') : t('translateActivate')}</$.Text>
        {isLanguageDialogOpen && (
          <TranslationLanguageDialog
            isOpen={isLanguageDialogOpen}
            setIsOpen={setIsLanguageDialogOpen}
            setCurrentLanguage={setCurrentLanguage}
            translationLanguageList={translationLanguageList}
            defaultLang={defaultLang}
          />
        )}
        <$.Icon onClick={handleSettingClick}>
          <SettingHubIcon />
        </$.Icon>
      </$.TranslationAction>

      {isImageTranslationFetching && !isTextBasedQuiz && <TranslationContentSkeleton />}

      {!isImageTranslationFetching && !isTextBasedQuiz && showTranslate && !isError && (
        <>
          <TranslationBar translatedLanguage={languageFromData} handleSettingClick={handleSettingClick} />
          <TranslationContent translationList={imageTranslationList} />
        </>
      )}
    </$.Wrapper>
  );
};

export default TranslationTool;
