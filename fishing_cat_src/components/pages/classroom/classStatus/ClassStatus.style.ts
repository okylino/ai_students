import styled from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

export const ClassStatusWrapper = styled.div`
  border: 1px solid ${COLOR.GRAY[600]};
  border-radius: 16px;
  width: 640px;
  height: 360px;
  margin-top: 8px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  line-height: 360px;
  background-color: ${COLOR.NEUTRAL[0]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin-top: 24px;
    height: 40px;
  }
  img {
    width: 156px;
  }

  @media (max-width: 680px) {
    width: 90%;
  }

  @media (max-width: 375px) {
    width: 325px;
    height: 217px;

    img {
      width: 96px;
    }
  }
`;
