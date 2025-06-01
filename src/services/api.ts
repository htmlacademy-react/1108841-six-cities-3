import axios from 'axios';

const API = axios.create({ baseURL: 'https://16.design.htmlacademy.pro/six-cities' });
export { API };
export const fetchOffers = () => API.get('/offers');
export const updateFavoriteStatus = (offerId: string, status: 0 | 1) => API.post('/favorite/' + offerId + '/' + status);
export const getFavorites = () => API.get('/favorite');
