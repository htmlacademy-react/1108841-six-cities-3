import * as api from '../../api';
import { Offer } from '../../types/state';
import { Review } from '../../types/review-type';
import { vi } from 'vitest';

vi.mock('../../api');

const mockedApi = vi.mocked(api);

describe('API operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch offers', async () => {
    const mockOffers: Offer[] = [
      {
        id: '1',
        title: 'Test offer',
        type: 'apartment',
        price: 100,
        city: {
          name: 'Paris',
          location: {
            latitude: 48.8566,
            longitude: 2.3522,
            zoom: 12
          }
        },
        location: {
          latitude: 48.8566,
          longitude: 2.3522,
          zoom: 12
        },
        isFavorite: false,
        isPremium: false,
        rating: 4.5,
        previewImage: 'test.jpg',
        bedrooms: 2,
        description: 'Test description',
        goods: ['wifi'],
        host: {
          name: 'Test host',
          avatarUrl: 'test.jpg',
          isPro: true
        },
        images: ['test.jpg'],
        maxAdults: 2
      }
    ];

    mockedApi.fetchOffers.mockResolvedValue(mockOffers);

    const result = await api.fetchOffers();
    expect(result).toEqual(mockOffers);
    expect(api.fetchOffers).toHaveBeenCalled();
  });

  it('should fetch offer by id', async () => {
    const mockOffer: Offer = {
      id: '1',
      title: 'Test offer',
      type: 'apartment',
      price: 100,
      city: {
        name: 'Paris',
        location: {
          latitude: 48.8566,
          longitude: 2.3522,
          zoom: 12
        }
      },
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 12
      },
      isFavorite: false,
      isPremium: false,
      rating: 4.5,
      previewImage: 'test.jpg',
      bedrooms: 2,
      description: 'Test description',
      goods: ['wifi'],
      host: {
        name: 'Test host',
        avatarUrl: 'test.jpg',
        isPro: true
      },
      images: ['test.jpg'],
      maxAdults: 2
    };

    mockedApi.fetchOffer.mockResolvedValue(mockOffer);

    const result = await api.fetchOffer('1');
    expect(result).toEqual(mockOffer);
    expect(api.fetchOffer).toHaveBeenCalledWith('1');
  });

  it('should fetch nearby offers', async () => {
    const mockOffers: Offer[] = [
      {
        id: '1',
        title: 'Test offer',
        type: 'apartment',
        price: 100,
        city: {
          name: 'Paris',
          location: {
            latitude: 48.8566,
            longitude: 2.3522,
            zoom: 12
          }
        },
        location: {
          latitude: 48.8566,
          longitude: 2.3522,
          zoom: 12
        },
        isFavorite: false,
        isPremium: false,
        rating: 4.5,
        previewImage: 'test.jpg',
        bedrooms: 2,
        description: 'Test description',
        goods: ['wifi'],
        host: {
          name: 'Test host',
          avatarUrl: 'test.jpg',
          isPro: true
        },
        images: ['test.jpg'],
        maxAdults: 2
      }
    ];

    mockedApi.fetchNearbyOffers.mockResolvedValue(mockOffers);

    const result = await api.fetchNearbyOffers('1');
    expect(result).toEqual(mockOffers);
    expect(api.fetchNearbyOffers).toHaveBeenCalledWith('1');
  });

  it('should fetch reviews', async () => {
    const mockReviews: Review[] = [
      {
        id: 1,
        date: '2024-01-01',
        user: {
          name: 'Test User',
          avatarUrl: 'test.jpg',
          isPro: true
        },
        comment: 'Test comment',
        rating: 5
      }
    ];

    mockedApi.fetchReviews.mockResolvedValue(mockReviews);

    const result = await api.fetchReviews('1');
    expect(result).toEqual(mockReviews);
    expect(api.fetchReviews).toHaveBeenCalledWith('1');
  });

  it('should post review', async () => {
    const mockReview: Review = {
      id: 1,
      date: '2024-01-01',
      user: {
        name: 'Test User',
        avatarUrl: 'test.jpg',
        isPro: true
      },
      comment: 'Test comment',
      rating: 5
    };

    const reviewData = {
      comment: 'Test comment',
      rating: 5
    };

    mockedApi.postReview.mockResolvedValue(mockReview);

    const result = await api.postReview('1', reviewData);
    expect(result).toEqual(mockReview);
    expect(api.postReview).toHaveBeenCalledWith('1', reviewData);
  });
});
