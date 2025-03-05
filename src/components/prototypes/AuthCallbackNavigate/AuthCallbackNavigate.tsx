import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import api from '@fishing_cat/api';
import { AuthLoginResp } from '@fishing_cat/api/models/auth/authLogin';
import CustomSpinner from '@fishing_cat/components/mui/CustomSpinner/CustomSpinner';
import { LOCAL_STORAGE_KEY } from '@fishing_cat/enums/localStorageKey';
import { SESSION_STORAGE_KEY } from '@fishing_cat/enums/sessionStorageKey';
import { parseState } from '@fishing_cat/utils/formatUtils';
import { localStorageUtils } from '@fishing_cat/utils/localStorageUtils';
import { sessionStorageUtils } from '@fishing_cat/utils/sessionStorageUtils';
import { ROUTE_PATH } from '@/enums/routePath';
import { setUser } from '@/redux/slices/userSlice';
import { oidcService, redirectOidcToMatchedDomain } from '@/service/oidcService';

import * as $ from './AuthCallBackNavigate.style';

interface LoginState {
  [x: string]: string;
}

const codeChallengeError = 'Invalid code challenge';

const getUserInfoWithCode = async (code: string) => {
  const codeChallenge = sessionStorageUtils.getItem(SESSION_STORAGE_KEY.CODE_CHALLENGE);
  if (!codeChallenge) {
    throw Error(codeChallengeError);
  }

  const userInfo = await api.auth.postAuthLogin({
    code,
    code_challenge: codeChallenge,
    client: 'PARTICIPANT',
    redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  });
  return userInfo;
};

const validateUserInfoCompleted = (userInfo: AuthLoginResp['data']): boolean =>
  (userInfo.isConsent && userInfo.isFilledInfo) ?? false;

/** 處理 oidc 登入後跳轉 */
const AuthCallbackNavigate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const called = useRef(false);
  const dispatch = useDispatch();

  /** handle back from vsAccount and get UserInfo */
  useEffect(() => {
    if (called.current) return;
    called.current = true;

    if (redirectOidcToMatchedDomain(searchParams.get('state'))) {
      return;
    }

    const directWithUserInfo = async () => {
      try {
        const code = searchParams.get('code');
        if (!code) {
          throw Error('Invalid code');
        }

        const userInfo = await getUserInfoWithCode(code);
        sessionStorageUtils.removeItem(SESSION_STORAGE_KEY.CODE_CHALLENGE);

        const state: LoginState = parseState(searchParams.get('state'));
        const roomId = state?.roomId;
        const queryParams = new URLSearchParams('');
        Object.entries(state).forEach(([key, value]) => {
          if (key === 'subDomain' || !value) return; // filter subDomain (used for preview environment direction)
          queryParams.append(key, value);
        });

        if (validateUserInfoCompleted(userInfo)) {
          // Only users who have completed their profile can access ClassSwift with their account.
          localStorageUtils.setItem(LOCAL_STORAGE_KEY.USER, userInfo);
          dispatch(setUser(userInfo));
          navigate(roomId ? `/join?${queryParams.toString()}` : ROUTE_PATH.MY_CLASS);
          return;
        }
        window.location.href = `${import.meta.env.VITE_APP_PRODUCT_PAGE}/information?from=participant&${queryParams.toString()}`;
      } catch (error: any) {
        sessionStorageUtils.removeItem(SESSION_STORAGE_KEY.CODE_CHALLENGE);
        switch (error.message) {
          case codeChallengeError: {
            oidcService.signIn();
            break;
          }
          default:
            navigate(`/`, { replace: true });
        }
      }
    };

    directWithUserInfo();
  }, [searchParams, navigate, dispatch]);

  return (
    <$.Wrapper>
      <CustomSpinner />
    </$.Wrapper>
  );
};

export default AuthCallbackNavigate;
