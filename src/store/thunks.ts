import { ThunkActionResult } from './action';
import { setAuthorizationStatus, setUser, setOffers, setOffersLoading, setOffersError } from './action';
import { AuthorizationStatus, Offer } from '../types/state';

export const fetchOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(setOffersLoading(true));
    dispatch(setOffersError(null));
    try {
      const { data } = await api.get<Offer[]>('/offers');
      dispatch(setOffers(data));
    } catch {
      dispatch(setOffersError('Ошибка загрузки предложений. Попробуйте позже.'));
    } finally {
      dispatch(setOffersLoading(false));
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
