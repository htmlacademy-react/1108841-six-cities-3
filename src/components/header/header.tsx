import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/thunks';
import { APP_ROUTE } from '../../const';
import { AuthorizationStatus } from '../../types/state';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
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
              {authorizationStatus === AuthorizationStatus.Auth && user ? (
                <>
                  <li className="header__nav-item user">
                    <div className="header__nav-profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img
                          className="header__avatar user__avatar"
                          src={user.avatarUrl}
                          alt={user.name}
                          width="20"
                          height="20"
                        />
                      </div>
                      <span className="header__user-name user__name">{user.email}</span>
                    </div>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={APP_ROUTE.FAVORITES}>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <button className="header__nav-link" onClick={handleLogout}>
                      <span className="header__signout">Sign out</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={APP_ROUTE.LOGIN}>
                    <span className="header__signin">Sign in</span>
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
