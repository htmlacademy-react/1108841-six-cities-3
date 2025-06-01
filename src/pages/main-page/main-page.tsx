import { useAppSelector } from '../../store';
import MainEmpty from '../../components/main-empty';
import OfferList from '../../components/offer-list';
import { SortOptions } from '../../components/sort-options/sort-options';
import { CityType } from '../../const';
import { Map } from '../../components/map';
import CitiesList from '../../components/cities-list/cities-list';
import LoadingSpinner from '../../components/loading-spinner';
import Header from '../../components/header';
import { sortedOffersSelector } from '../../store/selectors';

function MainPage(): JSX.Element {
  const city = useAppSelector((state) => state.offers.city);
  const activeOfferId = useAppSelector((state) => state.offers.activeOfferId);
  const isOffersLoading = useAppSelector((state) => state.offers.isOffersLoading);
  const offersError = useAppSelector((state) => state.offers.offersError);
  const sortedOffers = useAppSelector(sortedOffersSelector);

  if (isOffersLoading) {
    return <LoadingSpinner message="Загружаем предложения..." withHeader />;
  }

  if (offersError) {
    return (
      <div className="page">
        <Header />
        <main className="page__main">
          <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
            <h1>Ошибка</h1>
            <p>{offersError}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {sortedOffers.length === 0 ? (
            <MainEmpty city={city.name as CityType} />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedOffers.length} places to stay in {city.name}</b>
                <SortOptions />
                <OfferList offers={sortedOffers} />
              </section>
              <div className="cities__right-section">
                <Map
                  offers={sortedOffers}
                  activeOfferId={activeOfferId}
                  lat={city.location.latitude}
                  lng={city.location.longitude}
                  zoom={city.location.zoom}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
