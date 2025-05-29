import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { APP_ROUTE } from '../../const';
import MainPage from '../../pages/main-page';
import NotFoundPage from '../../pages/404-page';
import FavoritesPage from '../../pages/favorites-page';
import OfferPage from '../../pages/offer-page';
import LoginPage from '../../pages/login-page';
import PrivateRoute from '../private/private';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function App() {
  const [isAuthenticated] = useState(false);
  const offers = useSelector((state: RootState) => state.offers);

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
              isAuthenticated={isAuthenticated}
              redirectPath={APP_ROUTE.LOGIN}
            />
          }
        >
          <Route
            path={APP_ROUTE.FAVORITES}
            element={<FavoritesPage offers={offers.filter((offer) => offer.isFavorite)} />}
          />
        </Route>
        <Route path={APP_ROUTE.OFFER} element={<OfferPage offers={offers} />} />
        <Route path={APP_ROUTE.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
