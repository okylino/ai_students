import styled from 'styled-components';

import blueHair from '@fishing_cat/assets/homepage/blue_hair.svg';
import cloud from '@fishing_cat/assets/homepage/cloud.svg';
import mobileCloud from '@fishing_cat/assets/homepage/mobile_cloud.svg';
import yellowHair from '@fishing_cat/assets/homepage/yellow_hair.svg';
import COLOR from '@fishing_cat/styles/color';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;

  padding: 36px 20px 0px;

  background-image: url(${mobileCloud});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-color: ${COLOR.NEUTRAL[0]};

  @media only screen and (min-width: 620px) {
    padding: 18px 18px 0px;

    background-image: url(${yellowHair}), url(${blueHair}), url(${cloud});
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-position:
      top 20px right,
      bottom left,
      bottom right;
  }
`;
export const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
