import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Offer } from '../types/state';
import { SortType } from '../const';

export const citySelector = (state: RootState) => state.offers.city;
export const offersSelector = (state: RootState) => state.offers.offers;
export const sortSelector = (state: RootState) => state.offers.sort;

export const filteredOffersSelector = createSelector(
  [offersSelector, citySelector],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

function sortOffers(offers: Offer[], sort: string): Offer[] {
  if (sort === SortType.PriceLowToHigh) {
    return [...offers].sort((a, b) => a.price - b.price);
  }
  if (sort === SortType.PriceHighToLow) {
    return [...offers].sort((a, b) => b.price - a.price);
  }
  if (sort === SortType.TopRatedFirst) {
    return [...offers].sort((a, b) => b.rating - a.rating);
  }
  return offers;
}

export const sortedOffersSelector = createSelector(
  [filteredOffersSelector, sortSelector],
  (filteredOffers, sort) => sortOffers(filteredOffers, sort)
);

export const favoriteOffersSelector = createSelector(
  (state: RootState) => state.offers.favoriteOffers,
  (favoriteOffers) => favoriteOffers
);

export const reviewsSelector = (state: RootState) => state.reviews.reviews;

export const sortedReviewsSelector = createSelector(
  reviewsSelector,
  (reviews) => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);
