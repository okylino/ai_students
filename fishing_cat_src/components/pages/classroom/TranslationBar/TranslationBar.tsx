import { useTranslation } from 'react-i18next';

import ArrowLeftRightIcon from '@fishing_cat/assets/svgr/icons/arrow-left-right.svg';

import * as $ from './TranslationBar.style';

interface TranslationBarProps {
  translatedLanguage: string;
  handleSettingClick: () => void;
}

const TranslationBar = ({ translatedLanguage, handleSettingClick }: TranslationBarProps) => {
  const { t } = useTranslation();

  return (
    <$.Bar>
      <span>{`${t('translateTranslated')}: ${translatedLanguage}`}</span>
      <$.Icon onClick={handleSettingClick}>
        <ArrowLeftRightIcon />
      </$.Icon>
    </$.Bar>
  );
};

export default TranslationBar;
