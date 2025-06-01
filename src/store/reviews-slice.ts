import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../types/review-type';
import { fetchReviewsThunk, postReviewThunk } from './api-actions';

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsThunk.pending, (state) => {
        state.isReviewsLoading = true;
        state.reviewsError = null;
      })
      .addCase(fetchReviewsThunk.fulfilled, (state, action) => {
        state.isReviewsLoading = false;
        state.reviews = action.payload;
        state.reviewsError = null;
      })
      .addCase(fetchReviewsThunk.rejected, (state, action) => {
        state.isReviewsLoading = false;
        state.reviewsError = action.error.message || 'Ошибка загрузки отзывов';
      })
      .addCase(postReviewThunk.pending, (state) => {
        state.isReviewsLoading = true;
        state.reviewsError = null;
      })
      .addCase(postReviewThunk.fulfilled, (state, action) => {
        state.isReviewsLoading = false;
        state.reviews.push(action.payload);
        state.reviewsError = null;
      })
      .addCase(postReviewThunk.rejected, (state, action) => {
        state.isReviewsLoading = false;
        state.reviewsError = action.error.message || 'Ошибка отправки отзыва';
      });
  },
});

export const { setReviews, setReviewsLoading, setReviewsError } = reviewsSlice.actions;
export default reviewsSlice.reducer;
