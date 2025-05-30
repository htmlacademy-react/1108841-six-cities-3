import { combineReducers } from '@reduxjs/toolkit';
import offersReducer from './offers-slice';
import userReducer from './user-slice';
import reviewsReducer from './reviews-slice';

export const rootReducer = combineReducers({
  offers: offersReducer,
  user: userReducer,
  reviews: reviewsReducer,
});
