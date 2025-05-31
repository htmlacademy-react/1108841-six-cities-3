import reviewsSlice from '../reviews-slice';
import { ReviewsState } from '../reviews-slice';
import { Review } from '../../types/review-type';

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

describe('reviewsSlice', () => {
  const initialState: ReviewsState = {
    reviews: [],
    isReviewsLoading: false,
    reviewsError: null
  };

  it('should set reviews', () => {
    const action = { type: 'reviews/setReviews', payload: [mockReview] };
    const newState = reviewsSlice(initialState, action);
    expect(newState.reviews).toEqual([mockReview]);
  });

  it('should set loading state', () => {
    const action = { type: 'reviews/setReviewsLoading', payload: true };
    const newState = reviewsSlice(initialState, action);
    expect(newState.isReviewsLoading).toBe(true);
  });

  it('should set error', () => {
    const error = 'Test error';
    const action = { type: 'reviews/setReviewsError', payload: error };
    const newState = reviewsSlice(initialState, action);
    expect(newState.reviewsError).toBe(error);
  });

  it('should clear error', () => {
    const stateWithError = {
      ...initialState,
      reviewsError: 'Test error'
    };

    const action = { type: 'reviews/setReviewsError', payload: null };
    const newState = reviewsSlice(stateWithError, action);
    expect(newState.reviewsError).toBeNull();
  });
});
