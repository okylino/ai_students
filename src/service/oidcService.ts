import axios from 'axios';

import { AuthLoginResp } from '@/api/models/auth/authLogin';
import { authApi } from '@/api/services/authService';
import { LOCAL_STORAGE_KEY } from '@/enums/localStorageKey';
import { SESSION_STORAGE_KEY } from '@/enums/sessionStorageKey';
import { store } from '@/redux/store';
import { localStorageUtils } from '@/utils/localStorageUtils';
import { sessionStorageUtils } from '@/utils/sessionStorageUtils';

const oidcConfig = {
  domain: import.meta.env.VITE_OIDC_DOMAIN,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI,
  response_type: 'code',
  scope: 'openid+email+profile+address',
  prompt: 'consent',
};

function getSubDomain() {
  return window.location.host.split('.')?.[0] ?? '';
}

const getConfiguration = async () => {
  const res = await axios
    .get(`${oidcConfig.domain}/auth/v1/oidc/.well-known/openid-configuration`)
    .then(({ data }) => data);
  return {
    authorizationEndpoint: res.authorization_endpoint,
    endSessionEndpoint: res.end_session_endpoint,
  };
};

const getPkceArgsString = async () => {
  const pkceResp: any = await store.dispatch(authApi.endpoints.getAuthPkce.initiate()).unwrap();
  sessionStorageUtils.setItem(SESSION_STORAGE_KEY.CODE_CHALLENGE, pkceResp.codeChallenge);
  return `code_challenge_method=${pkceResp.codeChallengeMethod}&code_challenge=${pkceResp.codeChallenge}`;
};

const loginArgsString = `client_id=${oidcConfig.client_id}&scope=${oidcConfig.scope}&response_type=${oidcConfig.response_type}&redirect_uri=${oidcConfig.redirect_uri}&prompt=${oidcConfig.prompt}`;

const signIn = async (state = {}) => {
  const stateString = state ? JSON.stringify({ ...state, subDomain: getSubDomain() }) : '';
  const [endpoint, pkceArgsString] = await Promise.all([getConfiguration(), getPkceArgsString()]);
  const target = `${endpoint.authorizationEndpoint}?${loginArgsString}&state=${stateString}&${pkceArgsString}`;
  window.location.href = target;
};

const signOut = async (state = {}, idTokenFromPage = '') => {
  const stateString = state ? JSON.stringify({ ...state, subDomain: getSubDomain() }) : '';
  const endpoint = await getConfiguration();
  const idToken = idTokenFromPage || localStorageUtils.getItem<AuthLoginResp['data']>(LOCAL_STORAGE_KEY.USER)?.idToken;
  if (!idToken) return;
  // required id_token_hint
  const target = `${endpoint.endSessionEndpoint}?post_logout_redirect_uri=${oidcConfig.post_logout_redirect_uri}&state=${stateString}&id_token_hint=${idToken}`;
  window.location.href = target;
};

/**
 * redirect to origin subdomain with dev/stg
 * @param {string} stateString  subDomain:string}
 * @returns {boolean} redirect result
 */
export const redirectOidcToMatchedDomain = (stateString: string | null, isSignIn = true): boolean => {
  try {
    if (!stateString) return false;
    const state = JSON.parse(stateString);

    if (state?.subDomain === getSubDomain()) return false;
    const domainEnvMap: { [x: string]: string } = {
      development: 'classswift-dev.com',
      staging: 'aps1.classswift-stg.com',
    };
    const page = isSignIn ? `callback` : `logout`;
    if (domainEnvMap[import.meta.env.VITE_NODE_ENV] && state?.subDomain) {
      window.location.replace(
        `https://${state.subDomain}.${domainEnvMap[import.meta.env.VITE_NODE_ENV]}/auth/${page}${window.location.search}`,
      );
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const oidcService = {
  signIn,
  signOut,
};
