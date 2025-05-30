import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from '../../components/header';
import CardListMain from '../../components/offer-card';
import { SortOptions } from '../../components/sort-options/sort-options';
import { Map } from '../../components/map/map';
import { CitiesList } from '../../components/cities-list/cities-list';
import { RootState, useAppDispatch } from '../../store';
import { fetchOffers } from '../../store/thunks';
import { sortedOffersSelector, citySelector } from '../../store/selectors';

function Spinner() {
  return <div style={{textAlign: 'center', padding: 40}}>Загрузка...</div>;
}

function ErrorBlock({ message }: { message: string }) {
  return <div style={{textAlign: 'center', color: 'red', padding: 40}}>{message}</div>;
}

function MainPage() {
  const dispatch = useAppDispatch();
  const city = useSelector(citySelector);
  const sortedOffers = useSelector(sortedOffersSelector);
  const isOffersLoading = useSelector((state: RootState) => state.offers.isOffersLoading);
  const offersError = useSelector((state: RootState) => state.offers.offersError);
  const activeOfferId = useSelector((state: RootState) => state.offers.activeOfferId);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (isOffersLoading) {
    return <Spinner />;
  }

  if (offersError) {
    return <ErrorBlock message={offersError} />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} places to stay in {city.name}
              </b>
              <SortOptions />
              <CardListMain offers={sortedOffers} />
            </section>
            <div className="cities__right-section">
              <Map
                offers={sortedOffers}
                lat={city.location.latitude}
                lng={city.location.longitude}
                zoom={city.location.zoom}
                activeOfferId={activeOfferId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
