import React from "react";
import { useAppSelector } from "../../state/hooks/hooks";
import MoviesPage from "../../components/MoviesPage/MoviesPage";

const TRMovies = () => {
  const topRated = useAppSelector((state) => state.collection.movies.topRated);
  return (
    <MoviesPage
      props={topRated}
      movieCollection="top_rated"
      movieType="movie"
    />
  );
};

export default TRMovies;
