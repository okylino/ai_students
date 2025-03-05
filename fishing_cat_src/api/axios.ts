import axios from 'axios';

const baseAxios = axios.create({
  baseURL: `${import.meta.env.VITE_RESTFUL_API_DOMAIN}/api/v3`,
});

export default baseAxios;
