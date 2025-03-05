import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetTextQuizTranslationQuery } from '@fishing_cat/api/services/translationService';
import { toastType } from '@fishing_cat/enums/toastType';
import { useAppDispatch } from '@fishing_cat/redux/hook';
import { openToastWithMessage } from '@fishing_cat/redux/slices/globalSlice';
import { setIsTextTranslationFetching, setTextTranslation } from '@fishing_cat/redux/slices/translationSlice';

const useTextQuizTranslation = ({
  quizId,
  lang,
  showTranslate,
  isTextBasedQuiz,
  textList,
}: {
  quizId: string;
  lang: string;
  showTranslate: boolean;
  isTextBasedQuiz: boolean;
  textList: string[];
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { data, isFetching, isError } = useGetTextQuizTranslationQuery(
    { quizId, lang, textList },
    { skip: !showTranslate || !quizId || !lang || !isTextBasedQuiz },
  );

  useEffect(() => {
    // 因為 translate api 只收 string array，不會知道哪個是題目哪個是選項，目前 call api 時把題目擺在第一個
    // 翻譯回來的資料也將第一筆當成題目的翻譯，其他的則都是選項的翻譯
    const newData = {
      lang: data?.lang ?? '',
      translatedQuestionTitle: data?.translationList.slice(0, 1)[0].translatedText ?? '',
      translatedContent:
        data?.translationList.slice(1, data.translationList.length).map((item) => item.translatedText) ?? [],
    };

    dispatch(setTextTranslation(newData));
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setIsTextTranslationFetching(isFetching));
  }, [isFetching, dispatch]);

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

  return {
    textCodeFromData: data?.lang ?? '',
  };
};

export default useTextQuizTranslation;
