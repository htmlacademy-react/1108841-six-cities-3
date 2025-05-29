import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from '../../components/header';
import CardListMain from '../../components/offer-card';
import { SortOptions } from '../../components/sort-options/sort-options';
import { Map } from '../../components/map/map';
import { CitiesList } from '../../components/cities-list/cities-list';
import { RootState, useAppDispatch } from '../../store';
import { Offer, SortType } from '../../types/state';
import { fetchOffers } from '../../store/thunks';

function sortOffers(offers: Offer[], sort: SortType): Offer[] {
  if (sort === 'PriceLowToHigh') {
    return [...offers].sort((a, b) => a.price - b.price);
  }
  if (sort === 'PriceHighToLow') {
    return [...offers].sort((a, b) => b.price - a.price);
  }
  if (sort === 'TopRated') {
    return [...offers].sort((a, b) => b.rating - a.rating);
  }
  return offers;
}

function Spinner() {
  return <div style={{textAlign: 'center', padding: 40}}>Загрузка...</div>;
}

function ErrorBlock({ message }: { message: string }) {
  return <div style={{textAlign: 'center', color: 'red', padding: 40}}>{message}</div>;
}

function MainPage() {
  const dispatch = useAppDispatch();
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const sort = useSelector((state: RootState) => state.sort);
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);
  const offersError = useSelector((state: RootState) => state.offersError);
  const activeOfferId = useSelector((state: RootState) => state.activeOfferId);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (isOffersLoading) {
    return <Spinner />;
  }

  if (offersError) {
    return <ErrorBlock message={offersError} />;
  }

  const filteredOffers = offers.filter((offer) => offer.city.name === city.name);
  const sortedOffers = sortOffers(filteredOffers, sort);

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
