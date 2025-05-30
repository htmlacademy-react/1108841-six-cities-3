import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { APP_ROUTE } from '../../const';
import MainPage from '../../pages/main-page';
import NotFoundPage from '../../pages/404-page';
import FavoritesPage from '../../pages/favorites-page';
import OfferPage from '../../pages/offer-page';
import LoginPage from '../../pages/login-page';
import PrivateRoute from '../private/private';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { checkAuth } from '../../store/thunks';
import { AuthorizationStatus } from '../../types/state';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

function App() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APP_ROUTE.MAIN}
          element={<MainPage />}
        />
        <Route path={APP_ROUTE.LOGIN} element={<LoginPage />} />
        <Route
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              redirectPath={APP_ROUTE.LOGIN}
            />
          }
        >
          <Route
            path={APP_ROUTE.FAVORITES}
            element={<FavoritesPage />}
          />
        </Route>
        <Route path={APP_ROUTE.OFFER} element={<OfferPage />} />
        <Route path={APP_ROUTE.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
