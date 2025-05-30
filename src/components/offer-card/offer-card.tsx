import { Link, useNavigate } from 'react-router-dom';
import { getRating } from '../../utils/utils';
import { CardType } from '../../types/offer-type';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { toggleFavorite } from '../../store/thunks';
import { AuthorizationStatus } from '../../types/state';

type CardPropsType = {
  card: CardType;
};

function Card({ card }: CardPropsType) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }
    dispatch(toggleFavorite(card.id, card.isFavorite));
  };

  return (
    <article className="cities__card place-card">
      {card.isPremium === true && (
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
            <b className="place-card__price-value">&euro;{card.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${card.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handleFavoriteClick}
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
          <Link to={`/offer/${card.id}`}>{card.title}</Link>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
  }).isRequired,
};

export default Card;
