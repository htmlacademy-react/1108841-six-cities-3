export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: Location;
  };
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
  previewImage: string;
};

export type SortType = 'Popular' | 'PriceLowToHigh' | 'PriceHighToLow' | 'TopRated';

export type AuthInfo = {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export type State = {
  city: City;
  offers: Offer[];
  sort: SortType;
  activeOfferId: string | null;
  isOffersLoading: boolean;
  offersError: string | null;
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
};
