import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { fetchOfferThunk, fetchNearbyOffersThunk, fetchReviewsThunk, toggleFavoriteThunk } from '../../store/api-actions';
import { AuthorizationStatus } from '../../types/state';
import { APP_ROUTE } from '../../const';
import LoadingSpinner from '../../components/loading-spinner';
import Header from '../../components/header';
import Card from '../../components/offer-card';
import ReviewList from '../../components/review/review-list';
import { Map } from '../../components/map';
import { getRating } from '../../utils/utils';

function mapOfferToCard(offer: any) {
  return {
    id: offer.id,
    img: offer.previewImage,
    rating: offer.rating,
    isPremium: offer.isPremium,
    price: offer.price,
    title: offer.title,
    type: offer.type,
    isFavorite: offer.isFavorite,
    location: offer.location
  };
}

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentOffer = useAppSelector((state) => state.offers.currentOffer);
  const nearbyOffers = useAppSelector((state) => state.offers.nearbyOffers);
  const reviews = useAppSelector((state) => state.reviews.reviews);
  const isCurrentOfferLoading = useAppSelector((state) => state.offers.isCurrentOfferLoading);
  const offersError = useAppSelector((state) => state.offers.offersError);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferThunk(id));
      dispatch(fetchNearbyOffersThunk(id));
      dispatch(fetchReviewsThunk(id));
    }
  }, [dispatch, id]);

  const handleFavoriteClick = () => {
    if (!isAuth) {
      navigate(APP_ROUTE.LOGIN);
      return;
    }
    if (currentOffer) {
      dispatch(toggleFavoriteThunk({
        offerId: currentOffer.id,
        status: currentOffer.isFavorite ? 0 : 1
      }));
    }
  };

  if (!id) {
    return <Navigate to={APP_ROUTE.NOT_FOUND} />;
  }

  if (offersError && !isCurrentOfferLoading) {
    return <Navigate to="*" />;
  }

  if (isCurrentOfferLoading || !currentOffer) {
    return (
      <div className="page">
        <main className="page__main page__main--offer">
          <div>Loading offer...</div>
        </main>
      </div>
    );
  }

  const nearbyOffersLimited = nearbyOffers.slice(0, 3);
  const mapOffers = [currentOffer, ...nearbyOffersLimited];

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images?.slice(0, 6).map((image, index) => (
                <div key={index} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button
                  className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: getRating(currentOffer.rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods?.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper ${currentOffer.host?.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                    <img className="offer__avatar user__avatar" src={currentOffer.host?.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host?.name}
                  </span>
                  {currentOffer.host?.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <ReviewList reviews={reviews} offerId={currentOffer.id} />
            </div>
          </div>
          <section className="offer__map map">
            <Map
              offers={mapOffers}
              activeOfferId={currentOffer.id}
              lat={currentOffer.city.location.latitude}
              lng={currentOffer.city.location.longitude}
              zoom={currentOffer.city.location.zoom}
              className="offer__map"
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighborhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffersLimited.map((offer) => (
                <Card
                  key={offer.id}
                  card={mapOfferToCard(offer)}
                  isNearCard
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
