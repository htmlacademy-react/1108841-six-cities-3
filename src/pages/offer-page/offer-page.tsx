import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/offer-card/offer-card';
import Header from '../../components/header';
import { ReviewList } from '../../components/review';
import { CardType } from '../../types/offer-type';
import { Map } from '../../components/map';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchOfferById, fetchNearbyOffersById, fetchReviewsById, toggleFavorite, clearCurrentOffer } from '../../store/thunks';
import { sortedReviewsSelector } from '../../store/selectors';
import LoadingSpinner from '../../components/loading-spinner';
import { AuthorizationStatus } from '../../types/state';
import { APP_ROUTE } from '../../const';

export default function OfferPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentOffer = useAppSelector((state) => state.offers.currentOffer);
  const nearbyOffers = useAppSelector((state) => state.offers.nearbyOffers);
  const reviews = useAppSelector(sortedReviewsSelector);
  const isCurrentOfferLoading = useAppSelector((state) => state.offers.isCurrentOfferLoading);
  const isReviewsLoading = useAppSelector((state) => state.reviews.isReviewsLoading);
  const offersError = useAppSelector((state) => state.offers.offersError);
  const reviewsError = useAppSelector((state) => state.reviews.reviewsError);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(clearCurrentOffer());
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffersById(id));
      dispatch(fetchReviewsById(id));
    }
  }, [dispatch, id]);

  const handleFavoriteClick = () => {
    if (!currentOffer) {
      return;
    }

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(APP_ROUTE.LOGIN);
      return;
    }
    dispatch(toggleFavorite(currentOffer.id, currentOffer.isFavorite));
  };

  if (isCurrentOfferLoading || isReviewsLoading) {
    return <LoadingSpinner message="Загружаем детали предложения..." />;
  }

  if (offersError || reviewsError) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
            <h1>Ошибка</h1>
            <p>{offersError || reviewsError}</p>
          </div>
        </main>
      </div>
    );
  }

  if (!currentOffer) {
    return <LoadingSpinner message="Загружаем предложение..." />;
  }

  const mapOfferToCard = (offer: typeof currentOffer): CardType => ({
    id: offer.id,
    img: offer.previewImage,
    rating: offer.rating,
    isPremium: offer.isPremium,
    price: offer.price,
    title: offer.title,
    type: offer.type,
    isFavorite: offer.isFavorite,
    location: offer.location
  });

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(0, 6).map((image) => (
                <div className="offer__image-wrapper" key={`image-${image}`}>
                  <img
                    className="offer__image"
                    src={image}
                    alt="Property photo"
                  />
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
                  className={`offer__bookmark-button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`}
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
                  <span style={{ width: `${Math.round(currentOffer.rating) * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} {currentOffer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} {currentOffer.maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer.host.name}</span>
                  {currentOffer.host.isPro && (
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
              offers={[currentOffer, ...nearbyOffers]}
              lat={currentOffer.city.location.latitude}
              lng={currentOffer.city.location.longitude}
              zoom={currentOffer.city.location.zoom}
              activeOfferId={currentOffer.id}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((offer) => (
                <Card key={offer.id} card={mapOfferToCard(offer)} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
