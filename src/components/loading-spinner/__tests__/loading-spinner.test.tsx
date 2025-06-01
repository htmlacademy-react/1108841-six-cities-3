import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import LoadingSpinner from '../loading-spinner';
import { AuthorizationStatus } from '../../../types/state';

const createMockStore = () => configureStore({
  reducer: {
    user: () => ({
      authorizationStatus: AuthorizationStatus.NoAuth,
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
    })
  }
});

describe('LoadingSpinner', () => {
  it('should render with default message', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoadingSpinner />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    const store = createMockStore();
    const customMessage = 'Загружаем данные...';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoadingSpinner message={customMessage} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('should render with header by default', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoadingSpinner />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should render without header when withHeader is false', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoadingSpinner withHeader={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByAltText('6 cities logo')).not.toBeInTheDocument();
  });
});
