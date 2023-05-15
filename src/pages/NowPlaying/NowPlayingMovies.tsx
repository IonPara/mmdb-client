import React from "react";
import { useAppSelector } from "../../state/hooks/hooks";
import MoviesPage from "../../components/MoviesPage/MoviesPage";

const NowPlayingMovies = () => {
  const nowPlaying = useAppSelector(
    (state) => state.collection.movies.nowPlaying
  );
  return (
    <MoviesPage
      props={nowPlaying}
      movieCollection="now_playing"
      movieType="movie"
    />
  );
};

export default NowPlayingMovies;
