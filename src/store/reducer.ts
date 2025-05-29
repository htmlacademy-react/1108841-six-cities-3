import { createReducer } from '@reduxjs/toolkit';
import { State, AuthorizationStatus } from '../types/state';
import { changeCity, setOffers, setSort, setActiveOffer, setOffersLoading, setOffersError, setAuthorizationStatus, setUser } from './action';

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
  activeOfferId: null as string | null,
  isOffersLoading: false,
  offersError: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

export const rootReducer = createReducer(initialState, (builder) => {
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
    })
    .addCase(setOffersLoading, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setOffersError, (state, action) => {
      state.offersError = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});
