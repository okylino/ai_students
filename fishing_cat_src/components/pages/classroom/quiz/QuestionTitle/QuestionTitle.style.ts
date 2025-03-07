import { styled } from '@mui/system';

import COLOR from '@fishing_cat/styles/color';

export const Wrapper = styled('div')<{ $canTranslate: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: ${(props) => (props.$canTranslate ? 6 : 40)}px;
  border-radius: 8px;
  background-color: ${COLOR.NEUTRAL[0]};
  gap: 10px;
`;

export const Title = styled('p')`
  color: #091f30;
  word-break: break-word;
  font-size: 20px;
`;

export const TranslatedTitle = styled('p')`
  color: ${COLOR.GRAY[600]};
  word-break: break-word;
  font-size: 20px;

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;
