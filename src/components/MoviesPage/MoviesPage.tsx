import React, { useCallback, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks/hooks";
import { sortMovies, sortTvShows } from "../../state/reducers/movieReducer";
import { sortMovieList, sortTvList } from "../../state/hooks/hooks";
import { fetchMovies, fetchTvs } from "../../hooks/fetchMovies";
import { MovieType } from "../Movies/Movies";
import Movies from "../Movies/Movies";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import "./MoviesPage.css";

type PropsType = {
  props: MovieType[] | undefined;
  movieCollection: "now_playing" | "popular" | "top_rated" | "airing_today";
  movieType: "movie" | "tv";
};

interface GenreType {
  id: number;
  name: string;
}

const sortBy: string[] = [
  "Rating Descending",
  "Rating Ascending",
  "Release Descending",
  "Release Ascending",
  "Title (A-Z)",
  "Title (Z-A)",
];

const NowPlayMovies = ({ props, movieCollection, movieType }: PropsType) => {
  const [filteredList, setFilteredList] = useState<MovieType[] | undefined>();
  const [appliedFilter, setAppliedFilter] = useState<string[]>([]);
  const [sortState, setSortState] = useState<string>("");

  // this ref will keep track of the pages
  const pageCounter = useRef<number>(2);

  const genresToFilter = useRef<number[]>([]);

  // These are the global states for movie genres
  const movieGenres = useAppSelector(
    (state) => state.collection.movies.movieGenres
  );
  const tvGenres = useAppSelector((state) => state.collection.tv.tvGenres);

  // These are the state for sort and filter modals
  const [showSort, setShowSort] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  // Handle click hook will add movies to the list
  const handleLoadMore = () => {
    if (movieType === "movie") {
      fetchMovies(movieCollection, dispatch, `${pageCounter.current}`);
    }
    if (movieType === "tv") {
      fetchTvs(movieCollection, dispatch, `${pageCounter.current}`);
    }
    pageCounter.current++;
    if (appliedFilter.length) {
      applyFilter();
    }
  };

  // Handle showFilter will open and close filter's modal
  const handleShowFilter = useCallback(() => {
    setShowFilter((prev) => !prev);
  }, [showFilter]);

  // This hook will filter the movies by checking if the movie array includes any of the genres from the array that will be past as an argument
  // Then it will set "filteredList" state to the new filtered list
  const handleFilter = (genres: number[]) => {
    const newList: MovieType[] = [];
    props?.forEach((movie) => {
      for (let i = 0; i < genres.length; i++) {
        if (movie.genre_ids.includes(genres[i])) {
          if (!newList.some((elem) => elem.id === movie.id)) {
            return newList.push(movie);
          }
        }
      }
    });
    if (sortState) {
      if (movieType === "movie") {
        dispatch(sortMovies([movieCollection, sortState]));
        sortMovieList(sortState, newList);
      }
      if (movieType === "tv") {
        dispatch(sortTvShows([movieCollection, sortState]));
        sortTvList(sortState, newList);
      }
    }
    setFilteredList([...newList]);
  };

  const applyFilter = () => {
    handleFilter(genresToFilter.current);
  };

  // This hook will add/remove the genre name to the "appliedFilter" state and genre id to the "genresToFilter" ref
  const handleGenreClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    genre: GenreType
  ) => {
    e.preventDefault();

    if (
      !appliedFilter.includes(genre.name) &&
      !genresToFilter.current.includes(genre.id)
    ) {
      setAppliedFilter([...appliedFilter, genre.name]);
      genresToFilter.current.push(genre.id);
    } else {
      const removedFilter = appliedFilter.filter((elem) => elem !== genre.name);
      const index = genresToFilter.current.indexOf(genre.id);
      genresToFilter.current.splice(index, 1);
      setAppliedFilter(removedFilter);
    }
  };

  // genresTag returns an anchor tag element that will containing the genre name and all its functionalities
  const genreTag = (genre: GenreType) => (
    <a
      href=""
      className={appliedFilter.includes(genre.name) ? "applied-filter" : ""}
      key={genre.id}
      onClick={(e) => handleGenreClick(e, genre)}
    >
      {genre.name}
    </a>
  );

  // genres will return tv show genres or movie genres
  const genres =
    movieType === "movie"
      ? movieGenres?.map((genre) => genreTag(genre))
      : tvGenres?.map((genre) => genreTag(genre));

  return (
    <div className="app-container">
      <div className="movies-page">
        <div className="actions">
          <div className="sort">
            <h4 onClick={() => setShowSort((prev) => !prev)}>
              Sort
              {!showSort ? <IoMdArrowDropright /> : <IoMdArrowDropdown />}
            </h4>
            <div className={showSort ? "dropdown" : "hide"}>
              <p>Sort Results By</p>
              {/* Return all of the sort elements from the array */}
              {sortBy.map((sort, index) => (
                <a
                  onClick={() => setSortState(sort)}
                  className={sortState === sort ? "applied-filter" : ""}
                  key={index}
                >
                  {sort}
                </a>
              ))}
            </div>
          </div>
          <div className="filter">
            <h4 onClick={handleShowFilter}>
              Filter
              {!showFilter ? <IoMdArrowDropright /> : <IoMdArrowDropdown />}
            </h4>
            <div className={showFilter ? "dropdown" : "hide"}>
              <p>Genres</p>
              <div className="genres">{genres}</div>
            </div>
          </div>
          <button className="apply-btn btn" onClick={applyFilter}>
            Apply
          </button>
          <button
            className="apply-btn btn reset-btn"
            onClick={() => {
              setFilteredList([]);
              setAppliedFilter([]);
              dispatch(sortMovies([movieCollection, "default"]));
              setSortState("");
              genresToFilter.current = [];
            }}
          >
            Reset
          </button>
        </div>
        <div>
          <Movies
            props={filteredList?.length ? filteredList : props}
            maxMovies={500}
          />
          <div className="btn-container">
            <button
              className="load-more-btn btn"
              type="button"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayMovies;
