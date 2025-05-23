import { useState } from 'react';
import Card from './offer-card';
import { Offer } from '../../mock/mocks-types';
import { CardType } from '../../types/offer-type';

type OfferListProps = {
  offers: Offer[];
};

function CardListMain({ offers }: OfferListProps) {
  const [, setActiveOffer] = useState<Offer | null>(null);

  const handleCardHover = (offer: Offer) => {
    setActiveOffer(offer);
  };

  const handleCardLeave = () => {
    setActiveOffer(null);
  };

  const mapOffersToCardType = (offer: Offer): CardType => ({
    id: offer.id,
    img: offer.previewImage,
    rating: Math.floor(offer.rating),
    premiumMark: offer.isPremium,
    priceValue: String(offer.price),
    placeCardName: offer.title,
    placeCardType: offer.type.toLowerCase() as 'apartment' | 'room' | 'house' | 'hotel',
    isFavorite: offer.isFavorite,
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
