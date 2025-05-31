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
                    <div className="header__nav-profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{user?.email}</span>
                    </div>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={APP_ROUTE.MAIN} onClick={handleLogoutClick}>
                      <span className="header__signout">Sign out</span>
                    </Link>
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
