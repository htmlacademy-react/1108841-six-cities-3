import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Card from '../offer-card';
import { AuthorizationStatus } from '../../../types/state';
import { CardType } from '../../../types/offer-type';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock('../../../store', () => ({
  useAppDispatch: () => mockDispatch,
}));

const mockCard: CardType = {
  id: '1',
  img: 'test.jpg',
  rating: 4.5,
  isPremium: true,
  price: 120,
  title: 'Test Offer',
  type: 'apartment',
  isFavorite: false,
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 8
  }
};

const createMockStore = (authStatus: AuthorizationStatus, cardId = '1', cardIsFavorite = false) => configureStore({
  reducer: {
    user: () => ({
      authorizationStatus: authStatus,
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
      offers: [{
        id: cardId,
        title: 'Test Offer',
        type: 'apartment',
        price: 120,
        rating: 4.5,
        previewImage: 'test.jpg',
        isPremium: true,
        isFavorite: cardIsFavorite,
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
      }],
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

describe('Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render card with all information', () => {
    const mockStore = createMockStore(AuthorizationStatus.Auth);

    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Card card={mockCard} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should handle favorite click when authorized', () => {
    const mockStore = createMockStore(AuthorizationStatus.Auth);

    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Card card={mockCard} />
        </Provider>
      </MemoryRouter>
    );

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should redirect to login when not authorized and favorite clicked', () => {
    const mockStore = createMockStore(AuthorizationStatus.NoAuth);

    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Card card={mockCard} />
        </Provider>
      </MemoryRouter>
    );

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should show active favorite button when card is favorite', () => {
    const mockStore = createMockStore(AuthorizationStatus.Auth, '1', true);
    const favoriteCard = { ...mockCard, isFavorite: true };

    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Card card={favoriteCard} />
        </Provider>
      </MemoryRouter>
    );

    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toHaveClass('place-card__bookmark-button--active');
  });
});
