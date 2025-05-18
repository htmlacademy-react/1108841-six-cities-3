import { Link } from 'react-router-dom';
import { getRating } from '../../utils/utils';
import { CardType } from '../../types/offer-type';

type CardPropsType = {
  card: CardType;
};

function Card({ card }: CardPropsType) {
  return (
    <article className="cities__card place-card">
      {card.premiumMark === true && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${card.id}`}>
          <img
            className="place-card__image"
            src={card.img}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{card.priceValue}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${card.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">Rating</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating(card.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${card.id}`}>{card.placeCardName}</Link>
        </h2>
        <p className="place-card__type">{card.placeCardType}</p>
      </div>
    </article>
  );
}

export default Card;
