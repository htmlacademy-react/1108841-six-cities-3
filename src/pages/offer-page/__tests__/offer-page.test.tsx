import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import OfferPage from '../offer-page';
import { AuthorizationStatus } from '../../../types/state';
import { RootState } from '../../../store';

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: 'test-offer-id' })
  };
});

vi.mock('../../../store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: RootState) => unknown) => {
    const mockState = {
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null
      },
      offers: {
        currentOffer: null,
        nearbyOffers: [],
        isCurrentOfferLoading: false,
        offersError: null
      },
      reviews: {
        reviews: [],
        isReviewsLoading: false,
        reviewsError: null
      }
    } as RootState;
    return selector(mockState);
  }
}));

vi.mock('../../../store/selectors', () => ({
  sortedReviewsSelector: () => []
}));

const createMockStore = (hasOffer = false, isLoading = false, isReviewsLoading = false) => configureStore({
  reducer: {
    user: () => ({
      authorizationStatus: AuthorizationStatus.Auth,
      user: null
    }),
    offers: () => ({
      currentOffer: hasOffer ? {
        id: 'test-offer-id',
        title: 'Test Offer',
        type: 'apartment',
        price: 120,
        rating: 4.5,
        previewImage: 'test.jpg',
        isPremium: true,
        isFavorite: false,
        city: {
          name: 'Paris',
          location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
        },
        location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
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
      } : null,
      nearbyOffers: [],
      isCurrentOfferLoading: isLoading,
      offersError: null
    }),
    reviews: () => ({
      reviews: [],
      isReviewsLoading: isReviewsLoading,
      reviewsError: null
    })
  }
});

describe('OfferPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading spinner when offer is loading', () => {
    render(
      <MemoryRouter initialEntries={['/offer/test-offer-id']}>
        <Provider store={createMockStore(false, true, false)}>
          <OfferPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Загружаем детали предложения...')).toBeInTheDocument();
  });

  it('should render offer when loaded', () => {
    render(
      <MemoryRouter initialEntries={['/offer/test-offer-id']}>
        <Provider store={createMockStore(true, false, false)}>
          <OfferPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Offer')).toBeInTheDocument();
  });

  it('should show loading when offer not found', () => {
    render(
      <MemoryRouter initialEntries={['/offer/test-offer-id']}>
        <Provider store={createMockStore(false, false, false)}>
          <OfferPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Загружаем предложение...')).toBeInTheDocument();
  });

  it('should handle favorite button click', () => {
    render(
      <MemoryRouter initialEntries={['/offer/test-offer-id']}>
        <Provider store={createMockStore(true, false, false)}>
          <OfferPage />
        </Provider>
      </MemoryRouter>
    );

    const favoriteButton = screen.getByRole('button', { name: /to bookmarks/i });
    fireEvent.click(favoriteButton);

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
