import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import CardListMain from '../../components/offer-card/offer-list';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';
import MainPageNavLocation from '../../components/main-page-nav-location/main-page-nav-location';

type MainPageProps = {
  offersCount: number;
};

function MainPage({ offersCount }: MainPageProps): JSX.Element {
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
                {offersCount} places to stay in Amsterdam
              </b>
              <Sort />
              <CardListMain />
            </section>
            <div className="cities__right-section">
              <Map />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
