import baseAxios from '../axios';
import { BackendVersionResp } from '../models/version';

export const getBackendVersion = async () =>
  baseAxios.get<BackendVersionResp>(import.meta.env.VITE_RESTFUL_API_DOMAIN).then((res) => res.data.version);
