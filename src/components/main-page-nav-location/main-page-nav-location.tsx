import { APP_ROUTE } from '../../const';

function MainPageNavLocation() {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          <li className="locations__item">
            <a className="locations__item-link tabs__item tabs__item--active" href={APP_ROUTE.ANCHOR}>
              <span>Amsterdam</span>
            </a>
          </li>
          <li className="locations__item">
            <a className="locations__item-link tabs__item" href={APP_ROUTE.ANCHOR}>
              <span>Paris</span>
            </a>
          </li>
          <li className="locations__item">
            <a className="locations__item-link tabs__item" href={APP_ROUTE.ANCHOR}>
              <span>Hamburg</span>
            </a>
          </li>
          <li className="locations__item">
            <a className="locations__item-link tabs__item" href={APP_ROUTE.ANCHOR}>
              <span>Dusseldorf</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default MainPageNavLocation;
