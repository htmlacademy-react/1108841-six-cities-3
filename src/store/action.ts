import { createAction } from '@reduxjs/toolkit';
import { City, Offer, SortType, AuthorizationStatus, AuthInfo } from '../types/state';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';
import { AxiosInstance } from 'axios';
import { AnyAction } from 'redux';

export const changeCity = createAction<City>('changeCity');
export const setOffers = createAction<Offer[]>('setOffers');
export const setSort = createAction<SortType>('setSort');
export const setActiveOffer = createAction<string | null>('setActiveOffer');
export const setOffersLoading = createAction<boolean>('setOffersLoading');
export const setOffersError = createAction<string | null>('setOffersError');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('setAuthorizationStatus');
export const setUser = createAction<AuthInfo | null>('setUser');

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, AnyAction>;
