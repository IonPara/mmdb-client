import React, { useCallback, useState, useEffect } from "react";
import { MovieType } from "../Movies/Movies";
import Movies from "../Movies/Movies";
import { fetchTvs } from "../../hooks/fetchMovies";
import { useAppDispatch, useAppSelector } from "../../state/hooks/hooks";
import "./Collection.css";

interface Props {
  props: MovieType[] | undefined;
  bgPosition?: { backgroundPosition: string };
  maxMovies: number;
  collection: string;
}

const Collection = ({ props, bgPosition, maxMovies, collection }: Props) => {
  const [movieOrTv, setMovieOrTv] = useState<string>("movies");

  const state = useAppSelector((state) => state.collection.tv);
  const { nowPlaying, popular, topRated } = state;

  const propToPass =
    collection === "popular"
      ? popular
      : collection === "top_rated"
      ? topRated
      : nowPlaying;

  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (type: string) => {
      setMovieOrTv(type);
    },
    [movieOrTv]
  );

  useEffect(() => {
    if (movieOrTv == "tv") {
      fetchTvs(collection, dispatch, "1");
    }
  }, [movieOrTv]);

  return (
    <section
      className={
        collection === "top_rated"
          ? "movie-section upcoming-section"
          : "movie-section"
      }
      style={bgPosition}
    >
      <div className="d-flex">
        <h2 className="trending black">
          {collection === "popular"
            ? "Popular"
            : collection === "top_rated"
            ? "Top Rated"
            : "Now Playing"}
        </h2>
        <div className="d-flex collections">
          <h3
            className={movieOrTv === "movies" ? "selected" : "unselected"}
            onClick={() => handleClick("movies")}
          >
            Movies
          </h3>
          <h3
            className={movieOrTv === "tv" ? "selected" : "unselected"}
            onClick={() => handleClick("tv")}
          >
            TV Shows
          </h3>
        </div>
      </div>
      <Movies
        props={movieOrTv === "movies" ? props : propToPass}
        maxMovies={maxMovies}
      />
    </section>
  );
};

export default Collection;
