import { ThunkActionResult } from './action';
import { setAuthorizationStatus, setUser, setOffers, setOffersLoading, setOffersError } from './action';
import { AuthorizationStatus, AuthInfo, Offer } from '../types/state';
import { saveToken, dropToken } from '../services/token';

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
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<AuthInfo>('/login');
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
    }
  };

export const login = (email: string, password: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<AuthInfo & { token: string }>('/login', { email, password });
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  };

export const logout = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete('/logout');
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  };
