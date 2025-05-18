import { useState } from 'react';
import Card from '../offer-card';
import { Offer } from '../../mock/mocks-types';

type OfferListProps = {
  offers: Offer[];
};

function OfferList({ offers }: OfferListProps) {
  const [, setActiveOffer] = useState<Offer | null>(null);

  const handleCardHover = (offer: Offer) => {
    setActiveOffer(offer);
  };

  const handleCardLeave = () => {
    setActiveOffer(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => handleCardHover(offer)}
          onMouseLeave={handleCardLeave}
        >
          <Card
            card={{
              id: offer.id,
              img: offer.previewImage,
              rating: Math.floor(offer.rating),
              premiumMark: offer.isPremium,
              priceValue: String(offer.price),
              placeCardName: offer.title,
              placeCardType: offer.type.toLowerCase() as 'apartment' | 'room' | 'house' | 'hotel',
              isFavorite: offer.isFavorite,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default OfferList;
