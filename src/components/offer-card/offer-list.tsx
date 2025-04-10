import { CARDS } from '../../mock/offers-mocks';
import Card from '../offer-card/offer-card';

function CardListMain(): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {CARDS.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </div>
  );
}
export default CardListMain;
