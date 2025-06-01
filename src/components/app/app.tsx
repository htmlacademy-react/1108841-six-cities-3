import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { fetchOffersThunk, checkAuthThunk } from '../../store/api-actions';
import { getToken } from '../../services/token';
import { APP_ROUTE } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/404-page/404-page';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(checkAuthThunk());
    }
    dispatch(fetchOffersThunk());
  }, [dispatch]);
  return React.createElement(BrowserRouter, {},
    React.createElement(Routes, {},
      React.createElement(Route, { path: APP_ROUTE.MAIN, element: React.createElement(MainPage) }),
      React.createElement(Route, { path: APP_ROUTE.LOGIN, element: React.createElement(LoginPage) }),
      React.createElement(Route, { path: APP_ROUTE.FAVORITES, element: React.createElement(FavoritesPage) }),
      React.createElement(Route, { path: APP_ROUTE.OFFER, element: React.createElement(OfferPage) }),
      React.createElement(Route, { path: '*', element: React.createElement(NotFoundPage) })
    )
  );
}
export default App;
