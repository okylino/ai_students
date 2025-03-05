import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import CustomButton from '@fishing_cat/components/customButton';
import BasicDialog from '@fishing_cat/components/dialog/basicDialog/BasicDialog';
import {
  BaseButtonWrapper,
  BaseCloseIcon,
  BaseTitle,
} from '@fishing_cat/components/dialog/basicDialog/BasicDialog.style';
import CustomSelect from '@fishing_cat/components/mui/customSelect/CustomSelect';

import { TranslationLanguageDialogProps } from './TranslationLanguageDialog.type';

const TranslationLanguageDialog = ({
  isOpen,
  setIsOpen,
  setCurrentLanguage,
  translationLanguageList,
  defaultLang,
}: TranslationLanguageDialogProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState('');

  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    setSelectedLanguage(defaultLang);
  }, [defaultLang]);

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleDialogConfirm = () => {
    queryParams.set('lang', selectedLanguage);

    const newSearch = queryParams.toString();

    navigate(`/classroom?${newSearch}`);

    setCurrentLanguage(selectedLanguage);
    handleDialogClose();
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
  };

  return (
    <BasicDialog width='328px' isOpen={isOpen} onClose={handleDialogClose}>
      <BaseTitle>
        {t('headerLanguage')}
        <BaseCloseIcon onClick={handleDialogClose} alt='close_icon' />
      </BaseTitle>

      <CustomSelect value={selectedLanguage} list={translationLanguageList} handleValueChange={handleLanguageChange} />

      <BaseButtonWrapper $marginTop='24px'>
        <CustomButton width='120px' onClick={handleDialogConfirm}>
          {t('confirm')}
        </CustomButton>
      </BaseButtonWrapper>
    </BasicDialog>
  );
};

export default TranslationLanguageDialog;
