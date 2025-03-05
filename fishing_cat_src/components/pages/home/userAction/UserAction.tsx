import * as $ from './UserAction.style';
import { UserActionProps } from './UserAction.type';

const UserAction = ({ title, content, img, onClick }: UserActionProps) => (
  <$.Action onClick={() => onClick()}>
    {img}
    <$.TextWrapper>
      <$.Title>{title}</$.Title>
      <$.Content>{content}</$.Content>
    </$.TextWrapper>
    <$.Arrow />
  </$.Action>
);
export default UserAction;
