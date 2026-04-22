"use client";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import useFavorites from "@/store/Favorite";
// test

const FavoriteIcon = ({ id, product }) => {
  const { favorites, setFavorite, removeFavorite } = useFavorites();

  if (favorites.some((favorite) => favorite.id === id)) {
    return (
      <FaHeart
        className="w-8 h-8 cursor-pointer"
        onClick={() => {
          removeFavorite(id);
        }}
      />
    );
  } else {
    return (
      <FaRegHeart
        className="w-8 h-8 cursor-pointer"
        onClick={() => {
          setFavorite(id, product);
        }}
      />
    );
  }
};

export default FavoriteIcon;
