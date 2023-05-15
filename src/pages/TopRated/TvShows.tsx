import React from "react";
import { useAppSelector } from "../../state/hooks/hooks";
import MoviesPage from "../../components/MoviesPage/MoviesPage";

const TvShows = () => {
  const topRated = useAppSelector((state) => state.collection.tv.topRated);
  return (
    <MoviesPage props={topRated} movieCollection="top_rated" movieType="tv" />
  );
};

export default TvShows;
