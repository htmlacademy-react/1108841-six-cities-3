import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { Offer, AuthorizationStatus } from '../../types/state';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchFavorites, toggleFavorite } from '../../store/thunks';
import LoadingSpinner from '../../components/loading-spinner';
import FavoritesPageEmpty from './favorites-page-empty';
import { APP_ROUTE } from '../../const';
import { getRating } from '../../utils/utils';

function FavoritePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFavoritesLoading = useAppSelector((state) => state.offers.isFavoritesLoading);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const favoriteOffers = useAppSelector((state) => state.offers.favoriteOffers) || [];

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(APP_ROUTE.LOGIN);
      return;
    }
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavorites());
    }
  }, [authorizationStatus, dispatch, navigate]);

  const handleFavoriteClick = (offerId: string, isFavorite: boolean) => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(APP_ROUTE.LOGIN);
      return;
    }
    dispatch(toggleFavorite(offerId, isFavorite));
  };

  if (isFavoritesLoading) {
    return (
      <div className="page">
        <main className="page__main page__main--favorites">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  if (!favoriteOffers || favoriteOffers.length === 0) {
    return (
      <div className="page page--favorites-empty">
        <Header />
        <FavoritesPageEmpty />
      </div>
    );
  }

  const offersByCity = favoriteOffers.reduce<Record<string, Offer[]>>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                <li className="favorites__locations-items" key={cityName}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="#">
                        <span>{cityName}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <article className="favorites__card place-card" key={offer.id}>
                        {offer.isPremium && (
                          <div className="place-card__mark">
                            <span>Premium</span>
                          </div>
                        )}
                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <Link to={`${APP_ROUTE.OFFER.replace(':id', offer.id)}`}>
                            <img
                              className="place-card__image"
                              src={offer.previewImage}
                              width={150}
                              height={110}
                              alt="Place image"
                            />
                          </Link>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">&euro;{offer.price}</b>
                              <span className="place-card__price-text">
                                /&nbsp;night
                              </span>
                            </div>
                            <button
                              className="place-card__bookmark-button place-card__bookmark-button--active button"
                              type="button"
                              onClick={() => handleFavoriteClick(offer.id, offer.isFavorite)}
                            >
                              <svg
                                className="place-card__bookmark-icon"
                                width={18}
                                height={19}
                              >
                                <use xlinkHref="#icon-bookmark" />
                              </svg>
                              <span className="visually-hidden">In bookmarks</span>
                            </button>
                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span style={{ width: getRating(offer.rating) }} />
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <Link to={`${APP_ROUTE.OFFER.replace(':id', offer.id)}`}>{offer.title}</Link>
                          </h2>
                          <p className="place-card__type">{offer.type}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritePage;
