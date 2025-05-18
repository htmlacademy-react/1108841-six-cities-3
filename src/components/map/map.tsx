import { Offer } from '../../mock/mocks-types';

type MapProps = {
  offers: Offer[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Map({ offers }: MapProps) {
  return (
    <section className="cities__map map" />
  );
}

export default Map;
