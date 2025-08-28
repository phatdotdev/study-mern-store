import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlide";
import {
  addToFavoritesToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../../utils/localStorage";

import { useEffect, useState } from "react";

const HeartIcon = ({ product }) => {
  const dispath = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((p) => p._id === product._id);
  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispath(setFavorites(favoritesFromLocalStorage));
  }, []);
  const toggleFavorite = () => {
    if (isFavorite) {
      dispath(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product?._id);
    } else {
      dispath(addToFavorites(product));
      addToFavoritesToLocalStorage(product);
    }
  };
  return (
    <div className="absolute top-2 right-5 cursor-pointer">
      {isFavorite ? (
        <FaHeart onClick={toggleFavorite} className="text-pink-700" />
      ) : (
        <FaRegHeart onClick={toggleFavorite} className="text-pink-700" />
      )}
    </div>
  );
};

export default HeartIcon;
