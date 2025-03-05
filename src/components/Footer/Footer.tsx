import { FC } from 'react';
import { FooterWrapper, Version, Links, Link } from './Footer.style';

export const Footer: FC = () => {
  return (
    <FooterWrapper>
      <Version>Version: 1.9.0</Version>
      <Links>
        <Link href="/terms">Term of Service</Link>
        <Link href="/privacy">Privacy Policy</Link>
      </Links>
    </FooterWrapper>
  );
}; 