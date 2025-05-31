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

const MAIN_ROUTE = APP_ROUTE.MAIN as string;
const LOGIN_ROUTE = APP_ROUTE.LOGIN as string;
const FAVORITES_ROUTE = APP_ROUTE.FAVORITES as string;
const OFFER_ROUTE = APP_ROUTE.OFFER as string;
const NOT_FOUND_ROUTE = APP_ROUTE.NOT_FOUND as string;

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
          path={MAIN_ROUTE}
          element={<MainPage />}
        />
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              redirectPath={LOGIN_ROUTE}
            />
          }
        >
          <Route
            path={FAVORITES_ROUTE}
            element={<FavoritesPage />}
          />
        </Route>
        <Route path={OFFER_ROUTE} element={<OfferPage />} />
        <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
