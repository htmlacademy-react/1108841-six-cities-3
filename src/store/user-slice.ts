import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, AuthInfo } from '../types/state';
import { loginThunk, checkAuthThunk, logoutThunk } from './api-actions';
import { saveToken, dropToken } from '../services/token';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUser(state, action: PayloadAction<AuthInfo | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = {
          id: 1,
          email: action.payload.email,
          avatarUrl: 'img/avatar.svg',
          name: action.payload.email.split('@')[0],
          isPro: false
        };
        saveToken(action.payload.token);
      })
      .addCase(loginThunk.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = {
          id: 1,
          email: action.payload.email,
          avatarUrl: 'img/avatar.svg',
          name: action.payload.email.split('@')[0],
          isPro: false
        };
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        dropToken();
      });
  },
});

export const { setAuthorizationStatus, setUser } = userSlice.actions;
export default userSlice.reducer;
