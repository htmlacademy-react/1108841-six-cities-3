import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/state';
import { Review } from '../types/review-type';

type ThunkConfig = {
  extra: AxiosInstance;
};

export const fetchOffersThunk = createAsyncThunk<
  Offer[],
  void,
  ThunkConfig
>('offers/fetchOffers', async (_, { extra: api }) => {
  const { data } = await api.get<Offer[]>('/offers');
  return data;
});

export const fetchOfferThunk = createAsyncThunk<
  Offer,
  string,
  ThunkConfig
>('offers/fetchOffer', async (id, { extra: api }) => {
  const { data } = await api.get<Offer>(`/offers/${id}`);
  return data;
});

export const fetchNearbyOffersThunk = createAsyncThunk<
  Offer[],
  string,
  ThunkConfig
>('offers/fetchNearbyOffers', async (id, { extra: api }) => {
  const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);
  return data;
});

export const fetchReviewsThunk = createAsyncThunk<
  Review[],
  string,
  ThunkConfig
>('reviews/fetchReviews', async (id, { extra: api }) => {
  const { data } = await api.get<Review[]>(`/comments/${id}`);
  return data;
});

export const postReviewThunk = createAsyncThunk<
  Review,
  { id: string; rating: number; comment: string },
  ThunkConfig
>('reviews/postReview', async ({ id, rating, comment }, { extra: api }) => {
  const { data } = await api.post<Review>(`/comments/${id}`, { rating, comment });
  return data;
});

export const loginThunk = createAsyncThunk<
  { email: string; token: string },
  { email: string; password: string },
  ThunkConfig
>('user/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<{ email: string; token: string }>('/login', { email, password });
  return data;
});

export const checkAuthThunk = createAsyncThunk<
  { email: string },
  void,
  ThunkConfig
>('user/checkAuth', async (_, { extra: api }) => {
  const { data } = await api.get<{ email: string }>('/login');
  return data;
});

export const logoutThunk = createAsyncThunk<
  void,
  void,
  ThunkConfig
>('user/logout', async (_, { extra: api }) => {
  await api.delete('/logout');
});

export const toggleFavoriteThunk = createAsyncThunk<
  Offer,
  { offerId: string; status: 0 | 1 },
  ThunkConfig
>('offers/toggleFavorite', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(`/favorite/${offerId}/${status}`);
  return data;
});
