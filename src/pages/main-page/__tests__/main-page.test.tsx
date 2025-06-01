import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../main-page';
import { AuthorizationStatus } from '../../../types/state';

const createMockStore = (isLoading = false, hasError = false, hasOffers = false) => configureStore({
  reducer: {
    user: () => ({
      authorizationStatus: AuthorizationStatus.Auth,
      user: null
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
      offers: hasOffers ? [{
        id: '1',
        title: 'Test Offer',
        type: 'apartment',
        price: 120,
        rating: 4.5,
        previewImage: 'test.jpg',
        isPremium: true,
        isFavorite: false,
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13
          }
        },
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13
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
      isOffersLoading: isLoading,
      offersError: hasError ? 'Test error' : null,
      currentOffer: null,
      nearbyOffers: [],
      isFavoritesLoading: false,
    })
  }
});

describe('MainPage', () => {
  it('should show loading spinner when offers are loading', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore(true)}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Загружаем предложения...')).toBeInTheDocument();
  });

  it('should show error message when there is an error', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore(false, true)}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Ошибка')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('should show empty state when no offers available', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore(false, false, false)}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should show offers when available', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore(false, false, true)}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/place to stay in Paris/)).toBeInTheDocument();
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
