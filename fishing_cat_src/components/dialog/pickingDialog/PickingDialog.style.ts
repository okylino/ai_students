import styled from 'styled-components';

import pickUpImage from '@fishing_cat/assets/svgr/tool/RandomPickerPicture.svg';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const Img = styled(pickUpImage)`
  width: 200px;
  flex: 0 0 40%;
`;

export const Text = styled.div`
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;

export const Content = styled.p`
  font-size: 24px;
  white-space: nowrap;
`;
