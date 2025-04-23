import Header from '../../components/header';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import { APP_ROUTE } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main
        className="page__main page__main--index"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <h1>404 Not Found</h1>
        <Link to={APP_ROUTE.MAIN}>Go to main page</Link>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
