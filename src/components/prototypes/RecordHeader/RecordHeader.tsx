import { useTranslation } from 'react-i18next';

import AudioIcon from '@/assets/svgr/icons/audio.svg';
import UnPinnedIcon from '@/assets/svgr/icons/bookmark.svg';
import PinnedIcon from '@/assets/svgr/icons/bookmarkFilled.svg';
import MultipleChoiceIcon from '@/assets/svgr/icons/multipleChoice.svg';
import PollIcon from '@/assets/svgr/icons/poll.svg';
import PushIcon from '@/assets/svgr/icons/push.svg';
import ShortAnswerIcon from '@/assets/svgr/icons/shortAnswer.svg';
import TFIcon from '@/assets/svgr/icons/tureFalse.svg';

import * as $ from './RecordHeader.style';
import { IRecordHeader, ITypesDataMap, RECORD_HEADER_TYPE, TypeData } from './RecordHeader.type';

const typesDataMap: ITypesDataMap = {
  [RECORD_HEADER_TYPE.TRUE_FALSE]: {
    i18nKey: 'common:quizType.trueFalse',
    Icon: <TFIcon />,
  },
  [RECORD_HEADER_TYPE.MULTIPLE_CHOICES]: {
    i18nKey: 'common:quizType.multipleChoice',
    Icon: <MultipleChoiceIcon />,
  },
  [RECORD_HEADER_TYPE.SHORT_ANSWER]: {
    i18nKey: 'common:quizType.shortAnswer',
    Icon: <ShortAnswerIcon />,
  },
  [RECORD_HEADER_TYPE.AUDIO]: {
    i18nKey: 'common:quizType.audio',
    Icon: <AudioIcon />,
  },
  [RECORD_HEADER_TYPE.POLL]: {
    i18nKey: 'common:quizType.poll',
    Icon: <PollIcon />,
  },
  [RECORD_HEADER_TYPE.PUSH_IMAGE]: {
    i18nKey: 'common:taskType.image',
    Icon: <PushIcon />,
  },
  [RECORD_HEADER_TYPE.PUSH_LINK]: {
    i18nKey: 'common:taskType.link',
    Icon: <PushIcon />,
  },
  [RECORD_HEADER_TYPE.PUSH_AND_RESPOND]: {
    i18nKey: 'common:pushAndRespond',
    Icon: <PushIcon />,
  },
};

const RecordHeader = ({ isPinned, onPinToggle, tags, type, size = 'small', extraAction = null }: IRecordHeader) => {
  const { t } = useTranslation();
  const { i18nKey, Icon } = typesDataMap[type] || ({} as TypeData);

  const handlePinToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPinToggle) onPinToggle(!isPinned);
  };

  return (
    <$.RecordHeaderWrapper data-size={size}>
      <$.FlexRow>
        <$.Title>
          <$.Icon>{Icon}</$.Icon>
          {t(i18nKey)}
        </$.Title>
        {tags && tags.map((tag) => <$.Tag key={tag}>{tag}</$.Tag>)}
      </$.FlexRow>
      <$.ActionRow>
        {extraAction}
        {typeof isPinned !== 'undefined' && (
          <$.Icon onClick={handlePinToggle}>{isPinned ? <PinnedIcon /> : <UnPinnedIcon />}</$.Icon>
        )}
      </$.ActionRow>
    </$.RecordHeaderWrapper>
  );
};

export default RecordHeader;
