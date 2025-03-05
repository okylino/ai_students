import { styled } from '@mui/system';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 24px;
  color: #3a4d39;
  font-weight: 500;
`;

export const Button = styled('button')`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: 2px solid #3a4d39;
  background-color: #ece3ce;
  color: inherit;
  font-weight: inherit;

  &:hover {
    background-color: #739072;
  }
`;
