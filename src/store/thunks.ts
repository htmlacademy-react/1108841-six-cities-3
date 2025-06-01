import { ThunkActionResult } from './action';
import { setAuthorizationStatus, setUser } from './user-slice';
import { setOffers, setOffersLoading, setOffersError, setCurrentOffer, setNearbyOffers, setFavoritesLoading, setFavorite, setCurrentOfferLoading, setFavoriteOffers } from './offers-slice';
import { setReviews, setReviewsLoading, setReviewsError } from './reviews-slice';
import { AuthorizationStatus } from '../types/state';
import { fetchOffer, fetchNearbyOffers, fetchReviews, postReview, fetchOffers as fetchOffersApi, getFavorites } from '../api';
import { saveToken, dropToken, getToken, addToFavorites, removeFromFavorites, getFavoritesFromStorage } from '../token';
import axios from 'axios';
import { Review } from '../types/review-type';

export const fetchOffers = (): ThunkActionResult =>
  async (dispatch) => {
    dispatch(setOffersLoading(true));
    dispatch(setOffersError(null));
    try {
      const offers = await fetchOffersApi();
      const favoriteIds = getFavoritesFromStorage();
      const offersWithFavorites = offers.map((offer) => ({
        ...offer,
        isFavorite: favoriteIds.includes(offer.id)
      }));
      dispatch(setOffers(offersWithFavorites));
    } catch {
      dispatch(setOffersError('Ошибка загрузки предложений. Попробуйте позже.'));
    } finally {
      dispatch(setOffersLoading(false));
    }
  };

export const fetchOfferById = (id: string): ThunkActionResult =>
  async (dispatch) => {
    dispatch(setCurrentOfferLoading(true));
    try {
      const offer = await fetchOffer(id);
      const favoriteIds = getFavoritesFromStorage();
      const offerWithFavorite = {
        ...offer,
        isFavorite: favoriteIds.includes(offer.id)
      };
      dispatch(setCurrentOffer(offerWithFavorite));
      dispatch(setOffersError(null));
    } catch (error) {
      dispatch(setCurrentOffer(null));
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        dispatch(setOffersError(`Предложение с ID ${id} не найдено.`));
      } else {
        dispatch(setOffersError('Ошибка загрузки предложения. Попробуйте позже.'));
      }
    } finally {
      dispatch(setCurrentOfferLoading(false));
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
  (dispatch) => {
    const token = getToken();
    if (token) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser({
        id: 1,
        email: 'mock@user.com',
        name: 'Mock User',
        avatarUrl: 'img/avatar.svg',
        isPro: false,
      }));
    } else {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
    }
    return Promise.resolve();
  };

export const login = (email: string, password: string): ThunkActionResult =>
  (dispatch) => {
    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Promise.reject(new Error('Некорректный email'));
    }

    // Валидация пароля (минимум одна буква и одна цифра)
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!password || password.length < 1) {
      return Promise.reject(new Error('Пароль обязателен'));
    }

    if (!hasLetter || !hasNumber) {
      return Promise.reject(new Error('Пароль должен содержать минимум одну букву и одну цифру'));
    }

    const mockToken = `mock-token-${Date.now()}`;
    saveToken(mockToken);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser({
      id: 1,
      email,
      name: 'Mock User',
      avatarUrl: 'img/avatar.svg',
      isPro: false,
    }));
    return Promise.resolve();
  };

export const logout = (): ThunkActionResult =>
  (dispatch) => {
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
    return Promise.resolve();
  };

export const fetchFavorites = (): ThunkActionResult =>
  async (dispatch) => {
    dispatch(setFavoritesLoading(true));
    try {
      const favorites = await getFavorites();
      dispatch(setFavoriteOffers(favorites));
    } catch {
      // Ошибка загрузки избранного
    } finally {
      dispatch(setFavoritesLoading(false));
    }
  };

export const toggleFavorite = (offerId: string, isFavorite: boolean): ThunkActionResult<void> =>
  (dispatch, getState) => {
    const newIsFavorite = !isFavorite;

    if (newIsFavorite) {
      addToFavorites(offerId);
    } else {
      removeFromFavorites(offerId);
    }

    dispatch(setFavorite({ id: offerId, isFavorite: newIsFavorite }));

    if (newIsFavorite) {
      const currentOffers = getState().offers.offers;
      const offerToAdd = currentOffers.find((offer) => offer.id === offerId);
      if (offerToAdd) {
        const currentFavorites = getState().offers.favoriteOffers;
        if (!currentFavorites.find((fav) => fav.id === offerId)) {
          dispatch(setFavoriteOffers([...currentFavorites, { ...offerToAdd, isFavorite: true }]));
        }
      }
    } else {
      const currentFavorites = getState().offers.favoriteOffers;
      dispatch(setFavoriteOffers(currentFavorites.filter((offer) => offer.id !== offerId)));
    }
  };
