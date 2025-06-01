const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const FAVORITES_KEY_NAME = 'six-cities-favorites';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const getFavoritesFromStorage = (): string[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY_NAME);
  return favorites ? JSON.parse(favorites) as string[] : [];
};

export const saveFavoritesToStorage = (favoriteIds: string[]): void => {
  localStorage.setItem(FAVORITES_KEY_NAME, JSON.stringify(favoriteIds));
};

export const addToFavorites = (offerId: string): void => {
  const favorites = getFavoritesFromStorage();
  if (!favorites.includes(offerId)) {
    favorites.push(offerId);
    saveFavoritesToStorage(favorites);
  }
};

export const removeFromFavorites = (offerId: string): void => {
  const favorites = getFavoritesFromStorage();
  const updatedFavorites = favorites.filter((id) => id !== offerId);
  saveFavoritesToStorage(updatedFavorites);
};
