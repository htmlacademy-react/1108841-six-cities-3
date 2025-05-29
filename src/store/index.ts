import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import { createAPI } from '../api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
