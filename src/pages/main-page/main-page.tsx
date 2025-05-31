import { useAppSelector } from '../../store';
import MainEmpty from '../../components/main-empty';
import OfferList from '../../components/offer-list';
import Sort from '../../components/sort';
import { CityType, SortTypeType } from '../../const';
import { Map } from '../../components/map';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setSort } from '../../store/offers-slice';
import LoadingSpinner from '../../components/loading-spinner';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.offers.city);
  const offers = useAppSelector((state) => state.offers.offers);
  const activeOfferId = useAppSelector((state) => state.offers.activeOfferId);
  const currentSort = useAppSelector((state) => state.offers.sort) as SortTypeType;
  const isOffersLoading = useAppSelector((state) => state.offers.isOffersLoading);
  const offersError = useAppSelector((state) => state.offers.offersError);

  const filteredOffers = offers.filter((offer) => offer.city.name === city.name);

  const handleSortChange = (sort: SortTypeType) => {
    dispatch(setSort(sort));
  };

  if (isOffersLoading) {
    return <LoadingSpinner message="Загружаем предложения..." withHeader={false} />;
  }

  if (offersError) {
    return (
      <div className="page">
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
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {filteredOffers.length === 0 ? (
            <MainEmpty city={city.name as CityType} />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {city.name}</b>
                <Sort currentSort={currentSort} onSortChange={handleSortChange} />
                <OfferList offers={filteredOffers} />
              </section>
              <div className="cities__right-section">
                <Map
                  offers={filteredOffers}
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
