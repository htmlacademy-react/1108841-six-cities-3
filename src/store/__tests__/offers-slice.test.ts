import offersSlice from '../offers-slice';
import { OffersState } from '../offers-slice';
import { Offer, City } from '../../types/state';

const mockCity: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.37403,
    longitude: 4.89518,
    zoom: 12
  }
};

const mockOffer: Offer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  city: mockCity,
  location: mockCity.location,
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: 'test.jpg',
  description: 'Test description',
  bedrooms: 2,
  goods: ['wifi'],
  host: {
    name: 'Test Host',
    avatarUrl: 'test.jpg',
    isPro: true
  },
  images: ['test.jpg'],
  maxAdults: 2
};

describe('offersSlice', () => {
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
    nearbyOffers: []
  };

  it('should change city', () => {
    const action = { type: 'offers/changeCity', payload: mockCity };
    const newState = offersSlice(initialState, action);
    expect(newState.city).toEqual(mockCity);
  });

  it('should set offers', () => {
    const offers = [mockOffer];
    const action = { type: 'offers/setOffers', payload: offers };
    const newState = offersSlice(initialState, action);
    expect(newState.offers).toEqual(offers);
  });

  it('should set sort', () => {
    const sort = 'Price: low to high';
    const action = { type: 'offers/setSort', payload: sort };
    const newState = offersSlice(initialState, action);
    expect(newState.sort).toBe(sort);
  });

  it('should set active offer', () => {
    const offerId = '1';
    const action = { type: 'offers/setActiveOffer', payload: offerId };
    const newState = offersSlice(initialState, action);
    expect(newState.activeOfferId).toBe(offerId);
  });

  it('should set offers loading state', () => {
    const action = { type: 'offers/setOffersLoading', payload: true };
    const newState = offersSlice(initialState, action);
    expect(newState.isOffersLoading).toBe(true);
  });

  it('should set offers error', () => {
    const error = 'Test error';
    const action = { type: 'offers/setOffersError', payload: error };
    const newState = offersSlice(initialState, action);
    expect(newState.offersError).toBe(error);
  });

  it('should set current offer', () => {
    const action = { type: 'offers/setCurrentOffer', payload: mockOffer };
    const newState = offersSlice(initialState, action);
    expect(newState.currentOffer).toEqual(mockOffer);
  });

  it('should set nearby offers', () => {
    const nearbyOffers = [mockOffer];
    const action = { type: 'offers/setNearbyOffers', payload: nearbyOffers };
    const newState = offersSlice(initialState, action);
    expect(newState.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should set favorite status', () => {
    const stateWithOffer = {
      ...initialState,
      offers: [mockOffer],
      currentOffer: mockOffer,
      nearbyOffers: [mockOffer]
    };

    const action = { type: 'offers/setFavorite', payload: { id: '1', isFavorite: true } };
    const newState = offersSlice(stateWithOffer, action);

    expect(newState.offers[0].isFavorite).toBe(true);
    expect(newState.currentOffer?.isFavorite).toBe(true);
    expect(newState.nearbyOffers[0].isFavorite).toBe(true);
  });
});
