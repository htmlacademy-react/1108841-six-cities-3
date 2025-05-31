import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import FavoritePage from '../favorites-page';
import { AuthorizationStatus } from '../../../types/state';

const createMockStore = (isLoading = false, hasFavorites = false) => configureStore({
  reducer: {
    user: () => ({
      authorizationStatus: AuthorizationStatus.Auth,
      user: {
        id: 1,
        email: 'test@test.com',
        avatarUrl: 'test.jpg',
        name: 'Test User',
        isPro: true
      }
    }),
    offers: () => ({
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13
        }
      },
      offers: hasFavorites ? [{
        id: '1',
        title: 'Test Favorite Offer',
        type: 'apartment',
        price: 120,
        rating: 4.5,
        previewImage: 'test.jpg',
        isPremium: true,
        isFavorite: true,
        city: {
          name: 'Amsterdam',
          location: {
            latitude: 52.3909553943508,
            longitude: 4.85309666406198,
            zoom: 8
          }
        },
        location: {
          latitude: 52.3909553943508,
          longitude: 4.85309666406198,
          zoom: 8
        },
        bedrooms: 2,
        maxAdults: 3,
        goods: ['WiFi'],
        host: {
          name: 'Host',
          avatarUrl: 'host.jpg',
          isPro: true
        },
        description: 'Description',
        images: ['image1.jpg']
      }] : [],
      sort: 'Popular',
      activeOfferId: null,
      isOffersLoading: false,
      offersError: null,
      currentOffer: null,
      nearbyOffers: [],
      isFavoritesLoading: isLoading,
    })
  }
});

describe('FavoritePage', () => {
  it('should show loading spinner when favorites are loading', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore(true)}>
          <FavoritePage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Загружаем избранное...')).toBeInTheDocument();
  });

  it('should show empty state when no favorites available', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore(false, false)}>
          <FavoritePage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should show favorites when available', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore(false, true)}>
          <FavoritePage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Test Favorite Offer')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });
});
