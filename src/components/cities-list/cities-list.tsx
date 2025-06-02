import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { changeCity } from '../../store/offers-slice';
import { City } from '../../types/state';
import { City as CityConst, APP_ROUTE } from '../../const';

const CITIES: City[] = [
  {
    name: CityConst.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: CityConst.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: CityConst.Brussels,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: CityConst.Amsterdam,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: CityConst.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: CityConst.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
];

type CitiesListProps = {
  className?: string;
};

function CitiesList({ className = '' }: CitiesListProps): JSX.Element {
  const dispatch = useDispatch();
  const currentCity = useSelector((state: RootState) => state.offers.city);

  const handleCityClick = (evt: React.MouseEvent<HTMLAnchorElement>, city: City) => {
    evt.preventDefault();
    dispatch(changeCity(city));
  };

  return (
    <div className={`tabs ${className}`.trim()}>
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city.name} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${
                  city.name === currentCity.name ? 'tabs__item--active' : ''
                }`}
                href={APP_ROUTE.ANCHOR}
                onClick={(evt) => handleCityClick(evt, city)}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
