import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/state';

export type OffersState = {
  city: City;
  offers: Offer[];
  sort: string;
  activeOfferId: string | null;
  isOffersLoading: boolean;
  offersError: string | null;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
};

const initialState: OffersState = {
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
  activeOfferId: null,
  isOffersLoading: false,
  offersError: null,
  currentOffer: null,
  nearbyOffers: [],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    },
    setOffers(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setActiveOffer(state, action: PayloadAction<string | null>) {
      state.activeOfferId = action.payload;
    },
    setOffersLoading(state, action: PayloadAction<boolean>) {
      state.isOffersLoading = action.payload;
    },
    setOffersError(state, action: PayloadAction<string | null>) {
      state.offersError = action.payload;
    },
    setCurrentOffer(state, action: PayloadAction<Offer | null>) {
      state.currentOffer = action.payload;
    },
    setNearbyOffers(state, action: PayloadAction<Offer[]>) {
      state.nearbyOffers = action.payload;
    },
  },
});

export const {
  changeCity,
  setOffers,
  setSort,
  setActiveOffer,
  setOffersLoading,
  setOffersError,
  setCurrentOffer,
  setNearbyOffers,
} = offersSlice.actions;

export default offersSlice.reducer;
