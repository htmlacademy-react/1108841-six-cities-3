import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { fetchOffersThunk, checkAuthThunk } from '../../store/api-actions';
import { APP_ROUTE } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/404-page/404-page';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthThunk());
    dispatch(fetchOffersThunk());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTE.MAIN} element={<MainPage />} />
        <Route path={APP_ROUTE.LOGIN} element={<LoginPage />} />
        <Route path={APP_ROUTE.FAVORITES} element={<FavoritesPage />} />
        <Route path={APP_ROUTE.OFFER} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
