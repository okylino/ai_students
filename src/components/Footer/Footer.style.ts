import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 8px;
`;

export const Version = styled.span`
  color: #666;
  font-size: 14px;
`;

export const Links = styled.div`
  display: flex;
  gap: 16px;
`;

export const Link = styled.a`
  color: #333;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`; 