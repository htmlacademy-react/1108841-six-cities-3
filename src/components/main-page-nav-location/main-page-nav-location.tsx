import { CITIES } from '../../const';

function MainPageNavLocation(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li className="locations__item" key={city}>
              <a className={`locations__item-link tabs__item ${city === 'Amsterdam' ? 'tabs__item--active' : ''}`} href="#">
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ ul>
      </ section>
    </ div>
  );
}

export default MainPageNavLocation;
