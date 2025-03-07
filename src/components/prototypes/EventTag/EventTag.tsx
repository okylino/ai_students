import * as $ from '@/components/prototypes/EventTag/EventTag.style';
import { EventTagProps } from '@/components/prototypes/EventTag/EventTag.type';

const EventTag = ({ color = 'primary', icon, eventTitle, currentCount, description }: EventTagProps) => (
  <$.EventTag>
    <$.EventChip color={color} icon={icon} label={eventTitle} />
    <$.Content>
      <$.CurrentCount>{currentCount}</$.CurrentCount>
      {description && <$.Description> {description}</$.Description>}
    </$.Content>
  </$.EventTag>
);

export default EventTag;
