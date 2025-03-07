import styled from 'styled-components';

export const Body = styled.div<{ $hasResponse: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  max-width: ${(props) => (props.$hasResponse ? 824 : 640)}px;
`;

export const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

export const RoomNameWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
