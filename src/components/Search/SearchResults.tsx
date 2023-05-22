import { MovieType } from "../Movies/Movies";
import Movie from "../Movies/Movie";
import { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAppSelector } from "../../state/hooks/hooks";
import Pagination from "../Pagination/Pagination";

interface FoundMovie {
  page: number;
  results: MovieType[];
}

interface Props {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  handleSearchClick: (title: string, page: string, movieType: string) => void;
}

const SearchResults = ({
  handleSearchClick,
  inputText,
  setInputText,
}: Props) => {
  const [active, setActive] = useState<string>("movie");

  // State that will store the current page
  const [page, setPage] = useState<number>(1);

  // Redux state that contains the movies
  const state = useAppSelector((state) => state.collection);
  const { searchedMovies } = state.movies;
  const { searchedTvShows } = state.tv;

  let movies = active === "movie" ? searchedMovies : searchedTvShows;

  // handle click
  const handleClick = useCallback(
    (type: string) => {
      setActive(type);
      handleSearchClick(inputText, `1`, active);
    },
    [inputText, active]
  );

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearchClick(inputText, "1", "movie");
    handleSearchClick(inputText, "1", "tv-shows");
  };

  // handle change page hook
  const handleChangePage = useCallback(
    (page: number) => {
      handleSearchClick(inputText, `${page}`, active);
    },
    [page]
  );

  return (
    <div className="search-results-container">
      <div className="d-flex">
        <h2 className="search-results" id="top">
          Search Results
        </h2>
        <div className="result-types">
          <h3
            className={
              active === "movie" ? "movies type active" : "movies type"
            }
            onClick={() => {
              setPage(1);
              handleClick("movie");
            }}
          >
            Movies
          </h3>
          <h3
            className={
              active === "tv-shows" ? "tv-shows type active" : "tv-shows type"
            }
            onClick={() => {
              setPage(1);
              handleClick("tv-shows");
            }}
          >
            TV Shows
          </h3>
          <h3
            className={active === "person" ? "type active" : "type"}
            onClick={() => {
              setPage(1);
              handleClick("person");
            }}
          >
            People
          </h3>
        </div>
      </div>
      {/* -------------Search Form -----------------*/}
      <form className="results-form" onSubmit={handleSubmit}>
        <input
          className="ml-1"
          value={inputText}
          type="text"
          placeholder="Search for a movie, tv-show or person"
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
        <FaSearch className="search-icon" type="submit" />
      </form>
      {/* -----------------Movies---------------- */}
      {movies?.results.map((movie) => {
        return (
          <div className="results-container" key={movie.id}>
            <div className="result">
              <Movie movie={movie} overview={true} />
            </div>
          </div>
        );
      })}

      <Pagination
        currentPage={page}
        setPage={setPage}
        numberOfPages={
          active === "movie"
            ? searchedMovies?.total_pages
            : searchedTvShows?.total_pages
        }
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default SearchResults;
