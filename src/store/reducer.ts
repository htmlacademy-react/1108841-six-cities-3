import { createReducer } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { changeCity, setOffers, setSort, setActiveOffer } from './action';

const initialState: State = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  offers: [],
  sort: 'Popular',
  activeOfferId: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSort, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(setActiveOffer, (state, action) => {
      state.activeOfferId = action.payload;
    });
});
