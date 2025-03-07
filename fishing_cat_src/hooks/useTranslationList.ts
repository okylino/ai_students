import { useGetLanguageListQuery } from '@fishing_cat/api/services/translationService';

const useTranslationList = () => {
  const { data } = useGetLanguageListQuery();

  const queryParams = new URLSearchParams(window.location.search);
  const queryLang = queryParams.get('lang') || '';

  const translationLanguageList = data?.map((item) => ({
    label: item.lang,
    value: item.code,
  }));

  const browserLang = translationLanguageList?.find((item) => item.value === window.navigator.language)?.value || 'en';

  return { translationLanguageList, defaultLang: queryLang || browserLang };
};

export default useTranslationList;
