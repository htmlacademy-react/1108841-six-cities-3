import { useDispatch } from 'react-redux';
import { setActiveOffer } from '../../store/offers-slice';
import Card from './offer-card';
import { Offer } from '../../types/state';
import { CardType } from '../../types/offer-type';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

type OfferListProps = {
  offers: Offer[];
};

function CardListMain({ offers }: OfferListProps) {
  const dispatch = useDispatch();

  const handleCardHover = useCallback((offer: Offer) => {
    dispatch(setActiveOffer(offer.id));
  }, [dispatch]);

  const handleCardLeave = useCallback(() => {
    dispatch(setActiveOffer(null));
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

CardListMain.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default CardListMain;
