import { LANGUAGE } from '@/enums/language';
import { OPTION_TYPE } from '@/enums/quiz';

export const generateOptionLabel = (
  optionType: string,
  optionId: number,
  lang?: LANGUAGE,
  isCircle: boolean = false,
) => {
  const trueFalseLabelMap: Record<LANGUAGE, string[]> = {
    [LANGUAGE.EN]: ['T', 'F'],
    [LANGUAGE.ZH]: ['\u3007', '\u2715'],
  };

  const circleLabelMap: { [key: string]: string[] } = {
    [OPTION_TYPE.ALPHABET]: ['\u24B6', '\u24B7', '\u24B8', '\u24B9', '\u24BA', '\u24BB'],
    [OPTION_TYPE.NUMBER]: ['\u2460', '\u2461', '\u2462', '\u2463', '\u2464', '\u2465'],
  };

  switch (optionType) {
    case OPTION_TYPE.TRUE_FALSE: {
      // optionId: 1 is true, 2 is false
      const labelMap = trueFalseLabelMap[lang || LANGUAGE.EN];
      return labelMap[optionId - 1];
    }

    case OPTION_TYPE.ALPHABET:
      return isCircle
        ? circleLabelMap[OPTION_TYPE.ALPHABET][optionId - 1] // optionId: 1 is \u24B6(Ⓐ), 2 is \u24B7(Ⓑ)
        : String.fromCharCode(65 + optionId - 1); // optionId: 1 is A, 2 is B ... and 'A' ASCII code is 65

    case OPTION_TYPE.NUMBER:
      return isCircle ? circleLabelMap[OPTION_TYPE.NUMBER][optionId - 1] : `${optionId}`;

    default:
      return '';
  }
};

// Sorts items based on pin status, displaying pinned items first
export const sortByPinnedFirst = <T extends { pinned: boolean }>(list: T[]) =>
  [...list].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });
