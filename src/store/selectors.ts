import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Offer, SortType } from '../types/state';

export const citySelector = (state: RootState) => state.offers.city;
export const offersSelector = (state: RootState) => state.offers.offers;
export const sortSelector = (state: RootState) => state.offers.sort;

export const filteredOffersSelector = createSelector(
  [offersSelector, citySelector],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

function sortOffers(offers: Offer[], sort: SortType): Offer[] {
  if (sort === 'PriceLowToHigh') {
    return [...offers].sort((a, b) => a.price - b.price);
  }
  if (sort === 'PriceHighToLow') {
    return [...offers].sort((a, b) => b.price - a.price);
  }
  if (sort === 'TopRated') {
    return [...offers].sort((a, b) => b.rating - a.rating);
  }
  return offers;
}

export const sortedOffersSelector = createSelector(
  [filteredOffersSelector, sortSelector],
  (filteredOffers, sort) => sortOffers(filteredOffers, sort as SortType)
);

export const favoriteOffersSelector = createSelector(
  offersSelector,
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const reviewsSelector = (state: RootState) => state.reviews.reviews;

export const sortedReviewsSelector = createSelector(
  reviewsSelector,
  (reviews) => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);
