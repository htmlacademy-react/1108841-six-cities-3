import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../types/review-type';

export type ReviewsState = {
  reviews: Review[];
  isReviewsLoading: boolean;
  reviewsError: string | null;
};

const initialState: ReviewsState = {
  reviews: [],
  isReviewsLoading: false,
  reviewsError: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews(state, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
    },
    setReviewsLoading(state, action: PayloadAction<boolean>) {
      state.isReviewsLoading = action.payload;
    },
    setReviewsError(state, action: PayloadAction<string | null>) {
      state.reviewsError = action.payload;
    },
  },
});

export const { setReviews, setReviewsLoading, setReviewsError } = reviewsSlice.actions;
export default reviewsSlice.reducer;
