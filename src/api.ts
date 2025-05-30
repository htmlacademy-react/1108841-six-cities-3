import axios from 'axios';
import { Offer } from './types/state';
import { Review } from './types/review-type';

const API_URL = 'https://15.design.htmlacademy.pro/six-cities';

export const fetchOffers = async (): Promise<Offer[]> => {
  const { data } = await axios.get<Offer[]>(`${API_URL}/offers`);
  return data;
};

export const fetchOffer = async (id: string): Promise<Offer> => {
  const { data } = await axios.get<Offer>(`${API_URL}/offers/${id}`);
  return data;
};

export const fetchNearbyOffers = async (id: string): Promise<Offer[]> => {
  const { data } = await axios.get<Offer[]>(`${API_URL}/offers/${id}/nearby`);
  return data;
};

export const fetchReviews = async (id: string): Promise<Review[]> => {
  const { data } = await axios.get<Review[]>(`${API_URL}/comments/${id}`);
  return data;
};

export const postReview = async (id: string, review: { rating: number; comment: string }): Promise<Review> => {
  const { data } = await axios.post<Review>(`${API_URL}/comments/${id}`, review);
  return data;
};
