import Card from '../offer-card';
import { Offer } from '../../types/state';
import { CardType } from '../../types/offer-type';
import { useAppDispatch } from '../../store';
import { changeActiveOffer } from '../../store/thunks';
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
  const dispatch = useAppDispatch();

  const handleCardHover = useCallback((offerId: string) => {
    dispatch(changeActiveOffer(offerId));
  }, [dispatch]);

  const handleCardLeave = useCallback(() => {
    dispatch(changeActiveOffer(null));
  }, [dispatch]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card
          key={offer.id}
          card={mapOffersToCardType(offer)}
          onMouseEnter={() => handleCardHover(offer.id)}
          onMouseLeave={handleCardLeave}
        />
      ))}
    </div>
  );
}

export default CardListMain;
