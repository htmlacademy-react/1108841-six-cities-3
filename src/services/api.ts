import axios, { AxiosInstance } from 'axios';
import { Offer } from '../types/state';
import { getToken } from './token';

const API: AxiosInstance = axios.create({
  baseURL: 'https://16.design.htmlacademy.pro/six-cities',
  timeout: 5000,
});

API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }
    return config;
  }
);

export { API };
export const fetchOffers = () => API.get('/offers');
export const updateFavoriteStatus = (offerId: string, status: 0 | 1) => API.post<Offer>(`/favorite/${offerId}/${status}`);
export const getFavorites = () => API.get('/favorite');
