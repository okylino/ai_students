import { ControlDialogProps } from '@fishing_cat/components/dialog/basicDialog/BasicDialog.type';

export interface TranslationLanguageDialogProps extends ControlDialogProps {
  setCurrentLanguage: (lang: string) => void;
  translationLanguageList: { label: string; value: string }[];
  defaultLang: string;
}
