export interface IRecordHeader {
  type: (typeof RECORD_HEADER_TYPE)[keyof typeof RECORD_HEADER_TYPE];
  isPinned?: boolean | undefined;
  onPinToggle?: (isPinned: boolean) => void;
  tags?: string[];
  size?: 'small' | 'large';
  extraAction?: React.ReactNode;
}

export enum RECORD_HEADER_TYPE {
  TRUE_FALSE = 'TRUE_FALSE',
  MULTIPLE_CHOICES = 'MULTIPLE_CHOICES',
  SHORT_ANSWER = 'SHORT_ANSWER',
  AUDIO = 'AUDIO',
  POLL = 'POLL',
  PUSH_IMAGE = 'PUSH_IMAGE',
  PUSH_LINK = 'PUSH_LINK',
  PUSH_AND_RESPOND = 'PUSH_AND_RESPOND'
}

export interface TypeData {
  i18nKey: string;
  Icon: React.ReactNode;
}

export type ITypesDataMap = Record<RECORD_HEADER_TYPE, TypeData>;
