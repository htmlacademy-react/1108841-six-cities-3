import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { AuthorizationStatus } from '../../types/state';
import { logout } from '../../store/thunks';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { APP_ROUTE } from '../../const';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const user = useAppSelector((state) => state.user.user);
  const favoriteOffers = useAppSelector((state) => state.offers?.favoriteOffers) || [];

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={APP_ROUTE.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ? (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={APP_ROUTE.FAVORITES}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img src={user?.avatarUrl} alt="User avatar" width="20" height="20" />
                      </div>
                      <span className="header__user-name user__name">{user?.email}</span>
                      <span className="header__favorite-count">{favoriteOffers?.length || 0}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <button
                      className="header__nav-link header__signout"
                      type="button"
                      onClick={handleLogoutClick}
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={APP_ROUTE.LOGIN}>
                    <span className="header__signout">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
