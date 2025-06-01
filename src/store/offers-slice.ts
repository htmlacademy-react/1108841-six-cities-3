import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/state';
import {
  fetchOffersThunk,
  fetchOfferThunk,
  fetchNearbyOffersThunk,
  toggleFavoriteThunk,
  fetchFavoritesThunk
} from './api-actions';
import { addToFavorites, removeFromFavorites, getFavoritesFromStorage } from '../services/token';

export type OffersState = {
  city: City;
  offers: Offer[];
  favoriteOffers: Offer[];
  sort: string;
  activeOfferId: string | null;
  isOffersLoading: boolean;
  offersError: string | null;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  isFavoritesLoading: boolean;
  isCurrentOfferLoading: boolean;
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
  favoriteOffers: [],
  sort: 'Popular',
  activeOfferId: null,
  isOffersLoading: false,
  offersError: null,
  currentOffer: null,
  nearbyOffers: [],
  isFavoritesLoading: false,
  isCurrentOfferLoading: false,
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
    setFavoritesLoading(state, action: PayloadAction<boolean>) {
      state.isFavoritesLoading = action.payload;
    },
    setCurrentOfferLoading(state, action: PayloadAction<boolean>) {
      state.isCurrentOfferLoading = action.payload;
    },
    setFavorite(state, action: PayloadAction<{ id: string; isFavorite: boolean }>) {
      const { id, isFavorite } = action.payload;
      const offer = state.offers.find((o) => o.id === id);
      if (offer) {
        offer.isFavorite = isFavorite;
      }
      if (state.currentOffer && state.currentOffer.id === id) {
        state.currentOffer.isFavorite = isFavorite;
      }
      state.nearbyOffers = state.nearbyOffers.map((o) =>
        o.id === id ? { ...o, isFavorite } : o
      );

      if (isFavorite) {
        addToFavorites(id);
        const favoriteOffer = state.offers.find((o) => o.id === id);
        if (favoriteOffer && state.favoriteOffers && !state.favoriteOffers.find((fo) => fo.id === id)) {
          state.favoriteOffers.push(favoriteOffer);
        }
      } else {
        removeFromFavorites(id);
        state.favoriteOffers = (state.favoriteOffers || []).filter((o) => o.id !== id);
      }
    },
    setFavoriteOffers(state, action: PayloadAction<Offer[]>) {
      state.favoriteOffers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersThunk.pending, (state) => {
        state.isOffersLoading = true;
        state.offersError = null;
      })
      .addCase(fetchOffersThunk.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        const favoriteIds = getFavoritesFromStorage();
        state.offers = action.payload.map((offer) => ({
          ...offer,
          isFavorite: favoriteIds.includes(offer.id)
        }));
        state.offersError = null;
      })
      .addCase(fetchOffersThunk.rejected, (state, action) => {
        state.isOffersLoading = false;
        state.offersError = action.error.message || 'Ошибка загрузки предложений';
      })
      .addCase(fetchOfferThunk.pending, (state) => {
        state.isCurrentOfferLoading = true;
        state.offersError = null;
      })
      .addCase(fetchOfferThunk.fulfilled, (state, action) => {
        state.isCurrentOfferLoading = false;
        const favoriteIds = getFavoritesFromStorage();
        state.currentOffer = {
          ...action.payload,
          isFavorite: favoriteIds.includes(action.payload.id)
        };
        state.offersError = null;
      })
      .addCase(fetchOfferThunk.rejected, (state, action) => {
        state.isCurrentOfferLoading = false;
        state.offersError = action.error.message || 'Ошибка загрузки предложения';
      })
      .addCase(fetchNearbyOffersThunk.fulfilled, (state, action) => {
        const favoriteIds = getFavoritesFromStorage();
        state.nearbyOffers = action.payload.map((offer) => ({
          ...offer,
          isFavorite: favoriteIds.includes(offer.id)
        }));
      })
      .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const { id, isFavorite } = updatedOffer;

        const offer = state.offers.find((o) => o.id === id);
        if (offer) {
          offer.isFavorite = isFavorite;
        }
        if (state.currentOffer && state.currentOffer.id === id) {
          state.currentOffer.isFavorite = isFavorite;
        }
        state.nearbyOffers = state.nearbyOffers.map((o) =>
          o.id === id ? { ...o, isFavorite } : o
        );

        if (isFavorite) {
          addToFavorites(id);
          const favoriteOffer = state.offers.find((o) => o.id === id);
          if (favoriteOffer && state.favoriteOffers && !state.favoriteOffers.find((fo) => fo.id === id)) {
            state.favoriteOffers.push(favoriteOffer);
          }
        } else {
          removeFromFavorites(id);
          state.favoriteOffers = (state.favoriteOffers || []).filter((o) => o.id !== id);
        }
      })
      .addCase(toggleFavoriteThunk.rejected, (state, action) => {
        state.offersError = action.error.message || 'Ошибка изменения избранного';
      })
      .addCase(fetchFavoritesThunk.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
        state.isFavoritesLoading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoritesThunk.rejected, (state) => {
        state.isFavoritesLoading = false;
      });
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
  setFavoritesLoading,
  setCurrentOfferLoading,
  setFavorite,
  setFavoriteOffers,
} = offersSlice.actions;

export default offersSlice.reducer;
