import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CustomButton from '@fishing_cat/components/customButton';
import BasicDialog from '@fishing_cat/components/dialog/basicDialog/BasicDialog';
import {
  BaseButtonWrapper,
  BaseCloseIcon,
  BaseContent,
  BaseTitle,
} from '@fishing_cat/components/dialog/basicDialog/BasicDialog.style';
import { ControlDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';
import CustomSelect from '@fishing_cat/components/mui/customSelect/CustomSelect';
import { LANGUAGE } from '@/enums/language';

const languageList = [
  { label: '中文', value: LANGUAGE.ZH },
  { label: 'English', value: LANGUAGE.EN },
];

const LanguageDialog = ({ isOpen, setIsOpen }: ControlDialogProps) => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleChangeLang = () => {
    i18n.changeLanguage(selectedLang);
    setIsOpen(false);
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
  };

  return (
    <BasicDialog width='408px' isOpen={isOpen} onClose={handleCloseDialog}>
      <BaseTitle>
        {t('headerLanguage')}
        <BaseCloseIcon onClick={handleCloseDialog} />
      </BaseTitle>

      <BaseContent>{t('selectLanguage')}</BaseContent>

      <CustomSelect value={selectedLang} list={languageList} handleValueChange={handleLanguageChange} />

      <BaseButtonWrapper $marginTop='95px'>
        <CustomButton width='120px' onClick={handleChangeLang}>
          {t('confirm')}
        </CustomButton>
      </BaseButtonWrapper>
    </BasicDialog>
  );
};

export default LanguageDialog;
