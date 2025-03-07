interface TranslationItem {
  sourceText: string;
  translatedText: string;
}

export interface GetImageQuizTranslationResp {
  lang: string;
  translationList: TranslationItem[];
}
