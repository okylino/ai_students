export interface AuthLoginReq {
  code: string;
  code_challenge: string;
  redirect_uri: string;
  client: 'PARTICIPANT';
}
