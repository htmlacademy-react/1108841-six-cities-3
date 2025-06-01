import { FormEvent, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../store/api-actions';
import { APP_ROUTE, CITIES, CITY_LOCATIONS, CityType } from '../../const';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../store';
import { AuthorizationStatus } from '../../types/state';
import { changeCity } from '../../store/offers-slice';

const MAIN_ROUTE = APP_ROUTE.MAIN as string;

function LoginPage(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [randomCity] = useState<CityType>(() => CITIES[Math.floor(Math.random() * CITIES.length)]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(MAIN_ROUTE);
    }
  }, [authorizationStatus, navigate]);

  const handleCityClick = () => {
    const cityData = CITY_LOCATIONS[randomCity];
    dispatch(changeCity(cityData));
    navigate(MAIN_ROUTE);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Некорректный email');
      return;
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!password || password.length < 1) {
      setError('Пароль обязателен');
      return;
    }

    if (!hasLetter || !hasNumber) {
      setError('Пароль должен содержать минимум одну букву и одну цифру');
      return;
    }

    setIsSubmitting(true);
    dispatch(loginThunk({ email, password }));
  };

  useEffect(() => {
    if (isSubmitting) {
      if (authorizationStatus === AuthorizationStatus.Auth) {
        setIsSubmitting(false);
        navigate(MAIN_ROUTE);
      } else if (authorizationStatus === AuthorizationStatus.NoAuth) {
        setIsSubmitting(false);
        setError('Ошибка авторизации');
      }
    }
  }, [authorizationStatus, isSubmitting, navigate]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={MAIN_ROUTE}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {error && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                {error}
              </div>
            )}
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </div>
              <button className="login__submit form__submit button" type="submit" disabled={isSubmitting}>
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button
                className="locations__item-link"
                type="button"
                onClick={handleCityClick}
                style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                <span>{randomCity}</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
