import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Header from '../header';
import { AuthorizationStatus } from '../../../types/state';

const createMockStore = (authStatus: AuthorizationStatus, favoritesCount = 0) => configureStore({
  reducer: {
    user: () => ({
      authorizationStatus: authStatus,
      user: authStatus === AuthorizationStatus.Auth ? {
        id: 1,
        email: 'test@test.com',
        avatarUrl: 'test.jpg',
        name: 'Test User',
        isPro: true
      } : null
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
      offers: [],
      favoriteOffers: Array(favoritesCount).fill(null).map((_, index) => ({
        id: `${index + 1}`,
        title: `Favorite ${index + 1}`,
        isFavorite: true
      })),
      sort: 'Popular',
      activeOfferId: null,
      isOffersLoading: false,
      offersError: null,
      currentOffer: null,
      nearbyOffers: [],
      isFavoritesLoading: false,
      isCurrentOfferLoading: false,
    })
  }
});

describe('Header', () => {
  it('should render sign in link when user is not authorized', () => {
    const store = createMockStore(AuthorizationStatus.NoAuth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render user email and sign out link when user is authorized', () => {
    const store = createMockStore(AuthorizationStatus.Auth, 3);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should show 0 favorites when no favorites available', () => {
    const store = createMockStore(AuthorizationStatus.Auth, 0);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should render logo', () => {
    const mockStore = createMockStore(AuthorizationStatus.Unknown);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'img/logo.svg');
  });
});
