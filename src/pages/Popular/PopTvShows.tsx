import React from "react";
import { useAppSelector } from "../../state/hooks/hooks";
import MoviesPage from "../../components/MoviesPage/MoviesPage";
const PopTvShows = () => {
  const popular = useAppSelector((state) => state.collection.tv.popular);
  return (
    <MoviesPage props={popular} movieCollection="popular" movieType="tv" />
  );
};

export default PopTvShows;
