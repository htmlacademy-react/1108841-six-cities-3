import Header from '../header';

type LoadingSpinnerProps = {
  message?: string;
  withHeader?: boolean;
};

function LoadingSpinner({ message = 'Загрузка...', withHeader = true }: LoadingSpinnerProps): JSX.Element {
  return (
    <div className="page">
      {withHeader && <Header />}
      <main className="page__main">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h1>{message}</h1>
        </div>
      </main>
    </div>
  );
}

export default LoadingSpinner;
