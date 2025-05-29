import { createAction } from '@reduxjs/toolkit';
import { City, Offer, SortType } from '../types/state';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';
import { AxiosInstance } from 'axios';
import { AnyAction } from 'redux';

export const changeCity = createAction<City>('changeCity');
export const setOffers = createAction<Offer[]>('setOffers');
export const setSort = createAction<SortType>('setSort');
export const setActiveOffer = createAction<number | null>('setActiveOffer');
export const setOffersLoading = createAction<boolean>('setOffersLoading');
export const setOffersError = createAction<string | null>('setOffersError');

export const fetchOffers = (): ThunkAction<Promise<void>, RootState, AxiosInstance, AnyAction> =>
  async (dispatch, _getState, api) => {
    dispatch(setOffersLoading(true));
    dispatch(setOffersError(null));
    try {
      const { data } = await api.get<Offer[]>('/offers');
      dispatch(setOffers(data));
    } catch (e) {
      dispatch(setOffersError('Ошибка загрузки предложений. Попробуйте позже.'));
    } finally {
      dispatch(setOffersLoading(false));
    }
  };
