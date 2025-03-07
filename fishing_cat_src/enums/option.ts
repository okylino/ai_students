import { LANGUAGE } from '@/enums/language';

export enum OPTION_TYPE {
  NO_OPTION = 'NO_OPTION',
  TRUE_FALSE = 'TRUE_FALSE',
  NUMBER = 'NUMBER',
  ALPHABET = 'ALPHABET',
}
export const CIRCLE_NUMBER_OPTION = {
  1: '\u2460',
  2: '\u2461',
  3: '\u2462',
  4: '\u2463',
  5: '\u2464',
  6: '\u2465',
};
export const CIRCLE_ALPHABET_OPTION = {
  1: '\u24b6',
  2: '\u24b7',
  3: '\u24b8',
  4: '\u24b9',
  5: '\u24ba',
  6: '\u24bb',
};
export const ALPHABET_OPTION = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'F',
};
export const trueFalseMap = {
  [LANGUAGE.EN]: {
    1: 'T',
    2: 'F',
  },
  [LANGUAGE.ZH]: {
    1: '\u3007',
    2: '\u2715',
  },
};
