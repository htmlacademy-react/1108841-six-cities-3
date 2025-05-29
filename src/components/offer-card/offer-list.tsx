import { useDispatch } from 'react-redux';
import { setActiveOffer } from '../../store/action';
import Card from './offer-card';
import { Offer } from '../../types/state';
import { CardType } from '../../types/offer-type';

type OfferListProps = {
  offers: Offer[];
};

function CardListMain({ offers }: OfferListProps) {
  const dispatch = useDispatch();

  const handleCardHover = (offer: Offer) => {
    dispatch(setActiveOffer(offer.id));
  };

  const handleCardLeave = () => {
    dispatch(setActiveOffer(null));
  };

  const mapOffersToCardType = (offer: Offer): CardType => ({
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
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => handleCardHover(offer)}
          onMouseLeave={handleCardLeave}
        >
          <Card card={mapOffersToCardType(offer)} />
        </div>
      ))}
    </div>
  );
}

export default CardListMain;
