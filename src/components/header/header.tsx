import { Link, useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTE } from '../../const';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { checkAuthThunk } from '../../store/api-actions';
import { AuthorizationStatus } from '../../types/state';
import { logoutThunk } from '../../store/api-actions';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );
  const user = useSelector((state: RootState) => state.user.user);
  const favoriteOffers = useSelector((state: RootState) => state.offers.favoriteOffers);

  const favoritesCount = favoriteOffers ? favoriteOffers.length : 0;

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      dispatch(checkAuthThunk());
    }
  }, [authorizationStatus, dispatch]);

  const shouldRenderUser = pathname !== APP_ROUTE.LOGIN;
  const linkClassName = pathname === APP_ROUTE.MAIN ? ' header__logo-link--active' : '';

  const handleSignOut = () => {
    dispatch(logoutThunk());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={`header__logo-link${linkClassName}`}
              to={APP_ROUTE.MAIN}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          {shouldRenderUser && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={authorizationStatus === AuthorizationStatus.Auth ? APP_ROUTE.FAVORITES : APP_ROUTE.LOGIN}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <>
                        <span
                          className="header__user-name user__name"
                          onClick={(evt) => {
                            evt.preventDefault();
                            navigate(APP_ROUTE.FAVORITES);
                          }}
                        >
                          {user?.email || ''}
                        </span>
                        <span
                          className="header__favorite-count"
                          onClick={(evt) => {
                            evt.preventDefault();
                            navigate(APP_ROUTE.FAVORITES);
                          }}
                        >
                          {favoritesCount}
                        </span>
                      </>
                    ) : (
                      <span className="header__login">Sign in</span>
                    )}
                  </Link>
                </li>
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to="#"
                      onClick={(evt) => {
                        evt.preventDefault();
                        handleSignOut();
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
