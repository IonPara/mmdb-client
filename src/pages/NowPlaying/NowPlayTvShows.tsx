import React from "react";
import { useAppSelector } from "../../state/hooks/hooks";
import MoviesPage from "../../components/MoviesPage/MoviesPage";

const NowPlayTvShows = () => {
  const nowPlaying = useAppSelector((state) => state.collection.tv.nowPlaying);
  return (
    <MoviesPage
      props={nowPlaying}
      movieCollection="airing_today"
      movieType="tv"
    />
  );
};

export default NowPlayTvShows;
