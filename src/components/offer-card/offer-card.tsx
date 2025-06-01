import { Link, useNavigate } from 'react-router-dom';
import { getRating } from '../../utils/utils';
import { CardType } from '../../types/offer-type';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { toggleFavorite } from '../../store/thunks';
import { AuthorizationStatus } from '../../types/state';
import { APP_ROUTE } from '../../const';

type CardProps = {
  card: CardType;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isNearCard?: boolean;
};

function Card({ card, className = '', onMouseEnter, onMouseLeave, isNearCard = false }: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);

  const actualOffer = useSelector((state: RootState) =>
    state.offers?.offers?.find((offer) => offer.id === card.id)
  );

  const isFavorite = actualOffer?.isFavorite ?? card.isFavorite;

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(APP_ROUTE.LOGIN);
      return;
    }
    dispatch(toggleFavorite(card.id, isFavorite));
  };

  return (
    <article
      className={`${isNearCard ? 'near-places__card' : 'cities__card'} place-card ${className}`.trim()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {card.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${APP_ROUTE.OFFER.replace(':id', card.id)}`}>
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
            <b className="place-card__price-value">&euro;{card.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating(card.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${APP_ROUTE.OFFER.replace(':id', card.id)}`}>{card.title}</Link>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
}

export default Card;
