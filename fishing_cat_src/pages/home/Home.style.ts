import styled from 'styled-components';

const mobileBreakPoint = '620px';

export const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin: 30px 0 36px 0;

  @media (max-width: ${mobileBreakPoint}) {
    margin: 0 0 24px 0;
  }
`;
