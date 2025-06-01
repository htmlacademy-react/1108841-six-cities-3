import { useAppDispatch } from '../../store';
import { changeActiveOffer } from '../../store/thunks';
import Card from './offer-card';
import { Offer } from '../../types/state';
import { CardType } from '../../types/offer-type';
import { useCallback } from 'react';

type OfferListProps = {
  offers: Offer[];
  className?: string;
};

function OfferList({ offers, className = '' }: OfferListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCardHover = useCallback((offer: Offer) => {
    dispatch(changeActiveOffer(offer.id));
  }, [dispatch]);

  const handleCardLeave = useCallback(() => {
    dispatch(changeActiveOffer(null));
  }, [dispatch]);

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
    <div className={`cities__places-list places__list tabs__content ${className}`.trim()}>
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

export default OfferList;
