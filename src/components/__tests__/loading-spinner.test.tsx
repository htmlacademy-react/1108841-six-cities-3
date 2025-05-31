import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import LoadingSpinner from '../loading-spinner';
import { AuthorizationStatus } from '../../types/state';

const createMockStore = () => configureStore({
  reducer: {
    user: () => ({
      authorizationStatus: AuthorizationStatus.Auth,
      user: {
        id: 1,
        email: 'test@test.com',
        avatarUrl: 'test.jpg',
        name: 'Test User',
        isPro: true
      }
    })
  }
});

describe('LoadingSpinner', () => {
  it('should render with default message and header', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <LoadingSpinner />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <LoadingSpinner message="Загружаем данные..." />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Загружаем данные...')).toBeInTheDocument();
  });

  it('should render header when withHeader is true', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <LoadingSpinner withHeader />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should not render header when withHeader is false', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <LoadingSpinner withHeader={false} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
  });
});
