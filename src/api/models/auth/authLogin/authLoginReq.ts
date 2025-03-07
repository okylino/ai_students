export type AuthLoginReq = {
  code: string;
  codeChallenge: string;
  redirectUri: string;
  client: 'PARTICIPANT';
};
