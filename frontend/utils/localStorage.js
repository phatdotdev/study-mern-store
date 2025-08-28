// Add a product to a localStorage
export const addToFavoritesToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

// Remove product from localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  const updatedFavorites = favorites.filter(
    (product) => productId !== product._id
  );
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

// Retrive favorites from a localStorage
export const getFavoritesFromLocalStorage = () => {
  const favoriteJSON = localStorage.getItem("favorites");
  return favoriteJSON ? JSON.parse(favoriteJSON) : [];
};
