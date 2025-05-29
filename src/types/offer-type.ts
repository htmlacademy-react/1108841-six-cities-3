export type CardType = {
  id: string;
  img: string;
  price: number;
  rating: number;
  title: string;
  type: string;
  isPremium: boolean;
  isFavorite: boolean;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};
