import axios, { AxiosInstance } from 'axios';
import { Offer } from '../types/state';

const API: AxiosInstance = axios.create({
  baseURL: 'https://16.design.htmlacademy.pro/six-cities',
  timeout: 5000,
});

export { API };
export const fetchOffers = () => API.get('/offers');
export const updateFavoriteStatus = (offerId: string, status: 0 | 1) => API.post<Offer>(`/favorite/${offerId}/${status}`);
export const getFavorites = () => API.get('/favorite');
