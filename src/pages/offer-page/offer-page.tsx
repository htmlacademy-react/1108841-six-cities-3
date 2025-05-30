import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/offer-card/offer-card';
import Header from '../../components/header';
import { ReviewList } from '../../components/review';
import { CardType } from '../../types/offer-type';
import { Map } from '../../components/map';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchOfferById, fetchNearbyOffersById, fetchReviewsById } from '../../store/thunks';

export default function OfferPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const reviews = useAppSelector((state) => state.reviews);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const isReviewsLoading = useAppSelector((state) => state.isReviewsLoading);
  const offersError = useAppSelector((state) => state.offersError);
  const reviewsError = useAppSelector((state) => state.reviewsError);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffersById(id));
      dispatch(fetchReviewsById(id));
    }
  }, [dispatch, id]);

  if (isOffersLoading || isReviewsLoading) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
            <h1>Загрузка...</h1>
          </div>
        </main>
      </div>
    );
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
    navigate('/404');
    return null;
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
