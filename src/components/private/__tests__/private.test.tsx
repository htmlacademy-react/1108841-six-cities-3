import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private';
import { AuthorizationStatus } from '../../../types/state';

describe('PrivateRoute', () => {
  it('should render children when user is authorized', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
                redirectPath="/login"
              />
            }
          >
            <Route path="/private" element={<div>Private Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authorized', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
                redirectPath="/login"
              />
            }
          >
            <Route path="/private" element={<div>Private Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
  });

  it('should redirect when authorization status is unknown', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Unknown}
                redirectPath="/login"
              />
            }
          >
            <Route path="/private" element={<div>Private Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
  });
});
