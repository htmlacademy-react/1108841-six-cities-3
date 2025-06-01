import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import LoginPage from '../login-page';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

const createMockStore = () => configureStore({
  reducer: {
    user: () => ({
      authorizationStatus: 'NO_AUTH',
      user: null
    })
  }
});

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/ })).toBeInTheDocument();
  });

  it('should handle email input change', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should handle password input change', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput).toHaveValue('password123');
  });

  it('should submit form with email and password', () => {
    mockDispatch.mockResolvedValue({});

    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /Sign in/ });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should navigate to main page on successful login', async () => {
    mockDispatch.mockResolvedValue({});

    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /Sign in/ });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should have required email and password fields', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should render random city location button', () => {
    render(
      <MemoryRouter>
        <Provider store={createMockStore()}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    );

    const cityButton = screen.getByRole('button', { name: /Paris|Cologne|Brussels|Amsterdam|Hamburg|Dusseldorf/ });
    expect(cityButton).toBeInTheDocument();
    expect(cityButton).toHaveStyle('cursor: pointer');

    const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
    const cityText = cityButton.textContent;
    expect(cityNames).toContain(cityText);
  });
});
