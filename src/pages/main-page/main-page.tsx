import Header from '../../components/header';
import Footer from '../../components/footer';
import CardListMain from '../../components/offer-card';
import Sort from '../../components/sort';
import Map from '../../components/map';
import MainPageNavLocation from '../../components/main-page-nav-location';
import { Offer } from '../../mock/mocks-types';

type MainPageProps = {
  offers: Offer[];
};

function MainPage({ offers }: MainPageProps) {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <MainPageNavLocation />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in Amsterdam
              </b>
              <Sort />
              <CardListMain offers={offers} />
            </section>
            <div className="cities__right-section">
              <Map offers={offers} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
