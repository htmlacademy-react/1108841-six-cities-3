import axios, { AxiosInstance } from 'axios';
import { Offer } from './types/state';
import { Review } from './types/review-type';
import { getToken, getFavoritesFromStorage } from './token';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;

function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
}

export const API = createAPI();

export const fetchOffers = async (): Promise<Offer[]> => {
  const { data } = await API.get<Offer[]>('/offers');
  return data;
};

export const fetchOffer = async (id: string): Promise<Offer> => {
  const { data } = await API.get<Offer>(`/offers/${id}`);
  return data;
};

export const fetchNearbyOffers = async (id: string): Promise<Offer[]> => {
  const { data } = await API.get<Offer[]>(`/offers/${id}/nearby`);
  return data;
};

export const fetchReviews = async (id: string): Promise<Review[]> => {
  const { data } = await API.get<Review[]>(`/comments/${id}`);
  return data;
};

export const postReview = async (id: string, review: { rating: number; comment: string }): Promise<Review> => {
  const { data } = await API.post<Review>(`/comments/${id}`, review);
  return data;
};

export const getFavorites = async (): Promise<Offer[]> => {
  const favoriteIds = getFavoritesFromStorage();
  const allOffers = await fetchOffers();
  const favoriteOffers = allOffers.filter((offer) => favoriteIds.includes(offer.id));
  return favoriteOffers.map((offer) => ({ ...offer, isFavorite: true }));
};

export const updateFavoriteStatus = async (offerId: string, status: 0 | 1): Promise<Offer> =>
  Promise.resolve({
    id: offerId,
    title: 'Mock Offer',
    type: 'apartment',
    price: 120,
    rating: 4.5,
    previewImage: 'img/apartment-01.jpg',
    isPremium: false,
    isFavorite: status === 1,
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
    },
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
    bedrooms: 2,
    maxAdults: 3,
    goods: ['WiFi'],
    host: {
      name: 'Mock Host',
      avatarUrl: 'img/avatar.svg',
      isPro: false
    },
    description: 'Mock description',
    images: ['img/apartment-01.jpg']
  } as Offer);
