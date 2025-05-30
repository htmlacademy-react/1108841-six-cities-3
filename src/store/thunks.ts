import { ThunkActionResult } from './action';
import { setAuthorizationStatus, setUser } from './user-slice';
import { setOffers, setOffersLoading, setOffersError, setCurrentOffer, setNearbyOffers, setFavorite } from './offers-slice';
import { setReviews, setReviewsLoading, setReviewsError } from './reviews-slice';
import { AuthorizationStatus, Offer } from '../types/state';
import { fetchOffer, fetchNearbyOffers, fetchReviews, postReview, fetchOffers as fetchOffersApi, getFavorites } from '../api';
import axios from 'axios';
import { Review } from '../types/review-type';

const API_URL = 'https://15.design.htmlacademy.pro/six-cities';

async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  const text = await response.text();
  return JSON.parse(text) as T;
}

export const fetchOffers = (): ThunkActionResult =>
  async (dispatch) => {
    dispatch(setOffersLoading(true));
    dispatch(setOffersError(null));
    try {
      const offers = await fetchOffersApi();
      dispatch(setOffers(offers));
    } catch {
      dispatch(setOffersError('Ошибка загрузки предложений. Попробуйте позже.'));
    } finally {
      dispatch(setOffersLoading(false));
    }
  };

export const fetchOfferById = (id: string): ThunkActionResult =>
  async (dispatch) => {
    try {
      const offer = await fetchOffer(id);
      dispatch(setCurrentOffer(offer));
    } catch {
      dispatch(setCurrentOffer(null));
    }
  };

export const fetchNearbyOffersById = (id: string): ThunkActionResult =>
  async (dispatch) => {
    try {
      const offers = await fetchNearbyOffers(id);
      dispatch(setNearbyOffers(offers));
    } catch {
      dispatch(setNearbyOffers([]));
    }
  };

export const fetchReviewsById = (id: string): ThunkActionResult =>
  async (dispatch) => {
    dispatch(setReviewsLoading(true));
    dispatch(setReviewsError(null));
    try {
      const reviews = await fetchReviews(id);
      dispatch(setReviews(reviews));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        dispatch(setReviews([] as Review[]));
      } else {
        dispatch(setReviewsError('Ошибка загрузки комментариев. Попробуйте позже.'));
      }
    } finally {
      dispatch(setReviewsLoading(false));
    }
  };

export const submitReview = (_id: string, review: { rating: number; comment: string }): ThunkActionResult =>
  async (dispatch, getState) => {
    try {
      const newReview = await postReview(_id, review);
      const currentReviews = getState().reviews.reviews;
      dispatch(setReviews([...currentReviews, newReview]));
    } catch {
      dispatch(setReviewsError('Ошибка отправки комментария. Попробуйте позже.'));
    }
  };

export const checkAuth = (): ThunkActionResult =>
  async (dispatch) => {
    await Promise.resolve();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  };

export const login = (email: string): ThunkActionResult =>
  async (dispatch) => {
    await Promise.resolve();
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser({
      id: 1,
      email,
      name: 'Mock User',
      avatarUrl: 'img/avatar.svg',
      isPro: false,
    }));
  };

export const logout = (): ThunkActionResult =>
  async (dispatch) => {
    await Promise.resolve();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  };

export const fetchFavorites = (): ThunkActionResult =>
  async (dispatch) => {
    try {
      const favorites = await getFavorites();
      dispatch(setOffers(favorites));
    } catch {
      // Ошибка загрузки избранного
    }
  };

export const toggleFavorite = (offerId: string, isFavorite: boolean): ThunkActionResult<void> =>
  async (dispatch) => {
    try {
      const updated = await fetchJson<Offer>(`${API_URL}/favorite/${offerId}/${isFavorite ? 0 : 1}`, {
        method: 'POST',
        credentials: 'include'
      });
      dispatch(setFavorite({ id: offerId, isFavorite: updated.isFavorite }));
    } catch {
      // Ошибка обработки избранного (можно добавить обработку)
    }
  };
