import React from 'react';

import * as $ from '@fishing_cat/layouts/homePage/HomePageWrapper.style';
import { HomePageWrapperProps } from '@fishing_cat/layouts/homePage/HomePageWrapper.type';
import LegalAndVersionInfo from '@fishing_cat/layouts/legalAndVersionInfo/LegalAndVersionInfo';

const HomePageWrapper: React.FC<HomePageWrapperProps> = (props) => (
  <$.Wrapper>
    <$.Body>{props.children}</$.Body>
    <LegalAndVersionInfo />
  </$.Wrapper>
);
export default HomePageWrapper;
