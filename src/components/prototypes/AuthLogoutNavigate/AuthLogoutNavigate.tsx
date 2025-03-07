import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CustomSpinner from '@fishing_cat/components/mui/CustomSpinner/CustomSpinner';
import { parseState } from '@fishing_cat/utils/formatUtils';
import { redirectOidcToMatchedDomain } from '@/service/oidcService';

import * as $ from './AuthLogoutNavigate.style';

interface LogoutState {
  [x: string]: string;
}

/** 處理 oidc 登出後跳轉 */
const AuthLogoutNavigate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /** handle back from vsAccount logout */
  useEffect(() => {
    if (redirectOidcToMatchedDomain(searchParams.get('state'), false)) return;

    const state: LogoutState = parseState(searchParams.get('state'));

    const queryParams = new URLSearchParams();

    Object.entries(state).forEach(([key, value]) => {
      if (key === 'subDomain' || !value) return; // filter subDomain (used for preview enviroment direction)
      queryParams.append(key, value);
    });

    navigate(`/?${queryParams.toString()}`, {
      replace: true,
    });
  }, [navigate, searchParams]);

  return (
    <$.Wrapper>
      <CustomSpinner />
    </$.Wrapper>
  );
};

export default AuthLogoutNavigate;
