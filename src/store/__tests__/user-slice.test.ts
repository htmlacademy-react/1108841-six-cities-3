import userSlice, { UserState } from '../user-slice';
import { AuthorizationStatus, AuthInfo } from '../../types/state';

const mockUser: AuthInfo = {
  id: 1,
  email: 'test@test.com',
  avatarUrl: 'test.jpg',
  name: 'Test User',
  isPro: true
};

describe('userSlice', () => {
  const initialState: UserState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null
  };

  it('should set authorization status', () => {
    const action = { type: 'user/setAuthorizationStatus', payload: AuthorizationStatus.Auth };
    const newState = userSlice(initialState, action);
    expect(newState.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set user', () => {
    const action = { type: 'user/setUser', payload: mockUser };
    const newState = userSlice(initialState, action);
    expect(newState.user).toEqual(mockUser);
  });

  it('should clear user', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser
    };

    const action = { type: 'user/setUser', payload: null };
    const newState = userSlice(stateWithUser, action);
    expect(newState.user).toBeNull();
  });
});
