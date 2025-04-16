export type CardType = {
  id: number;
  img: string;
  premiumMark: boolean;
  priceValue: string;
  rating: number;
  placeCardName: string;
  placeCardType: 'apartment' | 'room' | 'house' | 'hotel';
  isFavorite: boolean;
};
