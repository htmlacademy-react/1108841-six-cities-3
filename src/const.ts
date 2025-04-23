const APP_ROUTE = {
  MAIN: '/',
  FAVORITES: '/favorites',
  OFFER: '/offer/:id',
  LOGIN: '/login',
  NOT_FOUND: '*',
} as const;

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

const SORT_TYPES = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
] as const;

export { CITIES, SORT_TYPES, APP_ROUTE };
