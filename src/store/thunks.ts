import { ThunkActionResult } from './action';
import { setFavoritesLoading, setFavoriteOffers, setSort, setActiveOffer, setCurrentOffer } from './offers-slice';
import { getFavorites } from '../services/api';
import {
  fetchOffersThunk,
  fetchOfferThunk,
  fetchNearbyOffersThunk,
  fetchReviewsThunk,
  postReviewThunk,
  loginThunk,
  checkAuthThunk,
  logoutThunk,
  toggleFavoriteThunk
} from './api-actions';

export const fetchOffers = () => fetchOffersThunk();

export const fetchOfferById = (id: string) => fetchOfferThunk(id);

export const fetchNearbyOffersById = (id: string) => fetchNearbyOffersThunk(id);

export const fetchReviewsById = (id: string) => fetchReviewsThunk(id);

export const submitReview = (id: string, review: { rating: number; comment: string }) =>
  postReviewThunk({ id, rating: review.rating, comment: review.comment });

export const checkAuth = () => checkAuthThunk();

export const login = (email: string, password: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Promise.reject(new Error('Некорректный email'));
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!password || password.length < 1) {
    return Promise.reject(new Error('Пароль обязателен'));
  }

  if (!hasLetter || !hasNumber) {
    return Promise.reject(new Error('Пароль должен содержать минимум одну букву и одну цифру'));
  }

  return loginThunk({ email, password });
};

export const logout = () => logoutThunk();

export const fetchFavorites = (): ThunkActionResult =>
  async (dispatch) => {
    dispatch(setFavoritesLoading(true));
    try {
      const favorites = await getFavorites();
      dispatch(setFavoriteOffers(favorites));
    } catch {
      // Ошибка загрузки избранного обрабатывается молча
    } finally {
      dispatch(setFavoritesLoading(false));
    }
  };

export const toggleFavorite = (offerId: string, isFavorite: boolean) =>
  toggleFavoriteThunk({ offerId, status: isFavorite ? 0 : 1 });

export const changeSortType = (sortType: string): ThunkActionResult<void> =>
  (dispatch) => {
    dispatch(setSort(sortType));
  };

export const changeActiveOffer = (offerId: string | null): ThunkActionResult<void> =>
  (dispatch) => {
    dispatch(setActiveOffer(offerId));
  };

export const clearCurrentOffer = (): ThunkActionResult<void> =>
  (dispatch) => {
    dispatch(setCurrentOffer(null));
  };
