import styled from 'styled-components';

import COLOR from '@fishing_cat/styles/color';

export const VersionText = styled.p`
  color: ${COLOR.GRAY[600]};
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;
export const LinkWrapper = styled.div`
  display: flex;
  gap: 16px;
`;
export const Link = styled.a`
  color: ${COLOR.GRAY[900]};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  width: auto;
`;
export const Line = styled.div`
  border-right: 1px solid ${COLOR.NEUTRAL[600]};
  height: 19px;
  width: 1px;
  border-radius: 8px;
`;
export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
  gap: 16px;
`;
