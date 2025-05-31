import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import ReviewForm from '../review-form';
import { AuthorizationStatus } from '../../../types/state';

const mockDispatch = vi.fn();

vi.mock('../../store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: { user: { authorizationStatus: AuthorizationStatus }; reviews: { reviewsError: string | null } }) => unknown) => {
    const state = {
      user: { authorizationStatus: AuthorizationStatus.Auth },
      reviews: { reviewsError: null }
    };
    return selector(state);
  }
}));

const createMockStore = (authStatus: AuthorizationStatus, error: string | null = null) => configureStore({
  reducer: {
    user: () => ({
      authorizationStatus: authStatus,
      user: null
    }),
    reviews: () => ({
      reviewsError: error
    })
  }
});

describe('ReviewForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when user is not authorized', () => {
    render(
      <Provider store={createMockStore(AuthorizationStatus.NoAuth)}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.queryByText('Your review')).not.toBeInTheDocument();
  });

  it('should render form when user is authorized', () => {
    render(
      <Provider store={createMockStore(AuthorizationStatus.Auth)}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/ })).toBeInTheDocument();
  });

  it('should disable submit button when form is invalid', () => {
    render(
      <Provider store={createMockStore(AuthorizationStatus.Auth)}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /Submit/ });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid', () => {
    render(
      <Provider store={createMockStore(AuthorizationStatus.Auth)}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const ratingInput = screen.getByDisplayValue('5');
    const commentTextarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const submitButton = screen.getByRole('button', { name: /Submit/ });

    fireEvent.click(ratingInput);
    fireEvent.change(commentTextarea, {
      target: { value: 'This is a great place to stay. I really enjoyed my time here and would recommend it to everyone!' }
    });

    expect(submitButton).not.toBeDisabled();
  });

  it('should handle rating change', () => {
    render(
      <Provider store={createMockStore(AuthorizationStatus.Auth)}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const ratingInput = screen.getByDisplayValue('4');
    fireEvent.click(ratingInput);

    expect(ratingInput).toBeChecked();
  });

  it('should handle comment change', () => {
    render(
      <Provider store={createMockStore(AuthorizationStatus.Auth)}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const commentTextarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const testComment = 'This is a test comment';

    fireEvent.change(commentTextarea, { target: { value: testComment } });

    expect(commentTextarea).toHaveValue(testComment);
  });

  it('should show error message when there is an error', () => {
    render(
      <Provider store={createMockStore(AuthorizationStatus.Auth, 'Network error')}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('should disable form elements while submitting', async () => {
    mockDispatch.mockReturnValue(Promise.resolve());

    render(
      <Provider store={createMockStore(AuthorizationStatus.Auth)}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const ratingInput = screen.getByDisplayValue('5');
    const commentTextarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const submitButton = screen.getByRole('button', { name: /Submit/ });

    fireEvent.click(ratingInput);
    fireEvent.change(commentTextarea, {
      target: { value: 'This is a great place with enough characters to meet minimum requirement for submission' }
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Submitting...')).toBeInTheDocument();
    });
  });
});
