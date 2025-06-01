import { Link } from 'react-router-dom';
import Header from '../../components/header';

function NotFoundPage() {
  return (
    <div className="page">
      <Header />
      <main className="page__main">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h1>404</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Link to="/" style={{ color: '#4481c3', textDecoration: 'underline' }}>
            Go to Main Page
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
