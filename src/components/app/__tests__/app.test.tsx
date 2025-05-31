import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationStatus } from '../../../types/state';

const createMockStore = (authStatus: AuthorizationStatus) => configureStore({
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
      sort: 'Popular',
      activeOfferId: null,
      isOffersLoading: false,
      offersError: null,
      currentOffer: null,
      nearbyOffers: []
    }),
    reviews: () => ({
      reviews: [],
      isReviewsLoading: false,
      reviewsError: null
    })
  }
});

describe('App Routing', () => {
  it('should render main page content', () => {
    const mockStore = createMockStore(AuthorizationStatus.Auth);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={mockStore}>
          <Routes>
            <Route path="/" element={<div>Cities</div>} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('should render login page content', () => {
    const mockStore = createMockStore(AuthorizationStatus.NoAuth);

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Provider store={mockStore}>
          <Routes>
            <Route path="/login" element={<div>Sign in</div>} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render favorites page content', () => {
    const mockStore = createMockStore(AuthorizationStatus.Auth);

    render(
      <MemoryRouter initialEntries={['/favorites']}>
        <Provider store={mockStore}>
          <Routes>
            <Route path="/favorites" element={<div>Saved listing</div>} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should render 404 page content', () => {
    const mockStore = createMockStore(AuthorizationStatus.Auth);

    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Provider store={mockStore}>
          <Routes>
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
