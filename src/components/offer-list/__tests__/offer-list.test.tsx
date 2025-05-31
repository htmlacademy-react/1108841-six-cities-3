import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Offer } from '../../../types/state';
import CardListMain from '../offer-list';

const mockDispatch = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch
  };
});

const mockOffer: Offer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 120,
  rating: 4.5,
  previewImage: 'test.jpg',
  isPremium: true,
  isFavorite: false,
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
};

const createMockStore = () => configureStore({
  reducer: {
    user: () => ({
      authorizationStatus: 'AUTH',
      user: null
    })
  }
});

describe('CardListMain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render list of offers', () => {
    const offers = [mockOffer];

    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <CardListMain offers={offers} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('€120')).toBeInTheDocument();
  });

  it('should render multiple offers', () => {
    const offers = [
      { ...mockOffer, id: '1', title: 'First Offer' },
      { ...mockOffer, id: '2', title: 'Second Offer' }
    ];

    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <CardListMain offers={offers} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('First Offer')).toBeInTheDocument();
    expect(screen.getByText('Second Offer')).toBeInTheDocument();
  });

  it('should handle mouse events on offer cards', () => {
    const offers = [mockOffer];

    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <CardListMain offers={offers} />
        </Provider>
      </MemoryRouter>
    );

    const cardContainer = screen.getByText('Test Offer').closest('div');

    fireEvent.mouseEnter(cardContainer as Element);
    fireEvent.mouseLeave(cardContainer as Element);

    expect(cardContainer).toBeInTheDocument();
  });

  it('should render empty list when no offers provided', () => {
    const { container } = render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <CardListMain offers={[]} />
        </Provider>
      </MemoryRouter>
    );

    const listContainer = container.querySelector('.cities__places-list');
    expect(listContainer).toBeInTheDocument();
  });
});
