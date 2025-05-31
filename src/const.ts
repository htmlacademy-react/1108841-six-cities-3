export const APP_ROUTE = {
  MAIN: '/',
  FAVORITES: '/favorites',
  OFFER: '/offer/:id',
  LOGIN: '/login',
  NOT_FOUND: '*',
} as const;

export const City = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

export const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

export const CITIES = Object.values(City);
export const SORT_TYPES = Object.values(SortType);

export type AppRouteType = typeof APP_ROUTE[keyof typeof APP_ROUTE];
export type CityType = typeof City[keyof typeof City];
export type SortTypeType = typeof SortType[keyof typeof SortType];
