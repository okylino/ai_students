interface TranslationItem {
  sourceText: string;
  translatedText: string;
}

export interface GetTextQuizTranslationResp {
  lang: string;
  translationList: TranslationItem[];
}
