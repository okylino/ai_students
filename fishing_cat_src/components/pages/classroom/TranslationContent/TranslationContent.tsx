import { useTranslation } from 'react-i18next';

import * as $ from './TranslationContent.style';

interface TranslationContentProps {
  translationList: {
    sourceText: string;
    translatedText: string;
  }[];
}

const TranslationContent = ({ translationList }: TranslationContentProps) => {
  const { t } = useTranslation();

  const hasData = translationList.length > 0;

  return (
    <$.Wrapper>
      <$.Content>
        {hasData &&
          translationList.map((item, index) => (
            <$.Item key={index}>
              <$.Origin>{item.sourceText}</$.Origin>
              <$.ResultText>{item.translatedText}</$.ResultText>
            </$.Item>
          ))}

        {!hasData && <$.ResultText>{t('translateNoData')}</$.ResultText>}
      </$.Content>
    </$.Wrapper>
  );
};

export default TranslationContent;
