import React from "react";
import { useAppSelector } from "../../state/hooks/hooks";
import MoviesPage from "../../components/MoviesPage/MoviesPage";

const PopMovies = () => {
  const popular = useAppSelector((state) => state.collection.movies.popular);
  return (
    <MoviesPage props={popular} movieCollection="popular" movieType="movie" />
  );
};

export default PopMovies;
