import styled from 'styled-components';

import arrowRightIcon from '@fishing_cat/assets/svgr/icons/arrow-right.svg';
import COLOR from '@fishing_cat/styles/color';

const mobileBreakPoint = '620px';

export const Action = styled.div`
  width: 615px;
  height: 136px;
  border-radius: 12px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.16);
  display: flex;
  margin-bottom: 24px;
  padding: 20px;
  align-items: center;
  background-color: ${COLOR.NEUTRAL[0]};
  cursor: pointer;

  @media (max-width: ${mobileBreakPoint}) {
    width: 335px;
    height: 284px;
    flex-direction: column;
  }

  @media (max-width: 340px) {
    height: auto;
    width: 98%;
  }

  svg:first-of-type {
    width: 96px;
    height: 96px;
    margin-inline-end: 20px;

    @media (max-width: ${mobileBreakPoint}) {
      margin-inline-end: 0;
    }
  }
`;

export const Arrow = styled(arrowRightIcon)`
  width: 48px;
  height: 48px;
  margin: 0 18px 0 auto;
  color: ${COLOR.TEAL[500]};

  @media (max-width: ${mobileBreakPoint}) {
    margin: 0;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${mobileBreakPoint}) {
    text-align: center;
    margin: 16px 0 20px 0;
    gap: 10px;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 24px;

  @media (max-width: ${mobileBreakPoint}) {
    font-size: 20px;
  }
`;

export const Content = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
