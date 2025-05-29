import { useParams } from 'react-router-dom';
import Card from '../../components/offer-card/offer-card';
import Header from '../../components/header';
import { ReviewList } from '../../components/review';
import { Offer } from '../../types/state';
import { CardType } from '../../types/offer-type';
import { Map } from '../../components/map';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type OfferPageProps = {
  offers: Offer[];
};

export default function OfferPage({ offers }: OfferPageProps) {
  const { id } = useParams<{ id: string }>();
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);

  if (isOffersLoading || offers.length === 0) {
    return <div>Загрузка...</div>;
  }

  const currentOffer = offers.find((offer) => offer.id === id);

  if (!currentOffer) {
    return <div>Предложение не найдено</div>;
  }

  const similarOffers = offers
    .filter((offer) => offer.id !== currentOffer.id && offer.city.name === currentOffer.city.name)
    .slice(0, 3);

  const mapOfferToCard = (offer: Offer): CardType => ({
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

  const mockReviews = [
    {
      id: 1,
      user: {
        name: 'Max',
        avatarUrl: 'img/avatar-max.jpg',
      },
      rating: 4,
      comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      date: '2019-04-24',
    },
  ];

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer?.images?.slice(0, 6).map((image) => (
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
                  {currentOffer?.goods?.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${currentOffer?.host?.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer?.host?.avatarUrl || '/img/avatar.svg'}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer?.host?.name}</span>
                  {currentOffer?.host?.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <ReviewList reviews={mockReviews} offerId={currentOffer.id} />
            </div>
          </div>
          <section className="offer__map map">
            <Map
              offers={offers}
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
              {similarOffers.map((offer) => (
                <Card key={offer.id} card={mapOfferToCard(offer)} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
