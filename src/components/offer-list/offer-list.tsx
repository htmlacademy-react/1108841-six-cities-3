import Card from '../offer-card/offer-card';
import { Offer } from '../../types/state';
import { CardType } from '../../types/offer-type';

type OfferListProps = {
  offers: Offer[];
};

function mapOffersToCardType(offer: Offer): CardType {
  return {
    id: offer.id,
    img: offer.previewImage,
    rating: Math.floor(offer.rating),
    premiumMark: offer.isPremium,
    priceValue: String(offer.price),
    placeCardName: offer.title,
    placeCardType: offer.type.toLowerCase() as 'apartment' | 'room' | 'house' | 'hotel',
    isFavorite: offer.isFavorite,
  };
}

function CardListMain({ offers }: OfferListProps) {
  const handleCardHover = () => {};
  const handleCardLeave = () => {};

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => handleCardHover()}
          onMouseLeave={handleCardLeave}
        >
          <Card card={mapOffersToCardType(offer)} />
        </div>
      ))}
    </div>
  );
}

export default CardListMain;
