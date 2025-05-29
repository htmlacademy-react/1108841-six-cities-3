import { useSelector } from 'react-redux';
import Header from '../../components/header';
import Footer from '../../components/footer';
import CardListMain from '../../components/offer-card';
import Sort from '../../components/sort';
import { Map } from '../../components/map/map';
import { CitiesList } from '../../components/cities-list/cities-list';
import { RootState } from '../../store';

function MainPage() {
  const { city, offers } = useSelector((state: RootState) => state);
  const filteredOffers = offers.filter((offer) => offer.city.name === city.name);

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
                {filteredOffers.length} places to stay in {city.name}
              </b>
              <Sort />
              <CardListMain offers={filteredOffers} />
            </section>
            <div className="cities__right-section">
              <Map offers={filteredOffers} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
