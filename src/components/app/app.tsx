import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CARDS } from '../../mock/offers-mocks';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/404-page/404-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import LoginPage from '../../pages/login-page/login-page';
import { APP_ROUTE } from '../../const';
import PrivateRoute from '../private/private';
import { useState } from 'react';
function App(): JSX.Element {
  const [isAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APP_ROUTE.MAIN}
          element={<MainPage offersCount={CARDS.length} />}
        />
        <Route path={APP_ROUTE.LOGIN} element={<LoginPage />} />
        <Route
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              redirectPath={APP_ROUTE.LOGIN}
            />
          }
        >
          <Route path={APP_ROUTE.FAVORITES} element={<FavoritesPage />} />
        </Route>
        <Route path={APP_ROUTE.OFFER} element={<OfferPage />} />
        <Route path={APP_ROUTE.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
