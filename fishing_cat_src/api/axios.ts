import axios from 'axios';

const baseAxios = axios.create({
      baseURL: `${import.meta.env.VITE_RESTFUL_API_DOMAIN}/v3/v3`,
});

export default baseAxios;
