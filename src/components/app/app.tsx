import MainPage from '../../pages/main-page/main-page';
import { CARDS } from '../../mock/offers-mocks';

function App(): JSX.Element {
  return (
    <div>
      <MainPage offersCount={CARDS.length} />
    </div>
  );
}

export default App;
