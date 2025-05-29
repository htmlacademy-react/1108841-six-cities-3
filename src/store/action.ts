import { createAction } from '@reduxjs/toolkit';
import { City, Offer, SortType } from '../types/state';

export const changeCity = createAction<City>('changeCity');
export const setOffers = createAction<Offer[]>('setOffers');
export const setSort = createAction<SortType>('setSort');
export const setActiveOffer = createAction<number | null>('setActiveOffer');
