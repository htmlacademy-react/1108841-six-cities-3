import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../types/state';

export const changeCity = createAction<City>('changeCity');
export const setOffers = createAction<Offer[]>('setOffers');
