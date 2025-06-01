import Card from '../offer-card/offer-card';
import { Offer } from '../../types/state';
import { CardType } from '../../types/offer-type';
import { useDispatch } from 'react-redux';
import { setActiveOffer } from '../../store/offers-slice';
import { useCallback } from 'react';

type OfferListProps = {
  offers: Offer[];
};

function mapOffersToCardType(offer: Offer): CardType {
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

function CardListMain({ offers }: OfferListProps) {
  const dispatch = useDispatch();

  const handleCardHover = useCallback((offerId: string) => {
    dispatch(setActiveOffer(offerId));
  }, [dispatch]);

  const handleCardLeave = useCallback(() => {
    dispatch(setActiveOffer(null));
  }, [dispatch]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => handleCardHover(offer.id)}
          onMouseLeave={handleCardLeave}
        >
          <Card card={mapOffersToCardType(offer)} />
        </div>
      ))}
    </div>
  );
}

export default CardListMain;
