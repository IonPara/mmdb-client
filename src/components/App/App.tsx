import { useEffect, useRef, useState, useCallback } from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Videos from "../Videos/Videos";
import NowPlayingMovies from "../../pages/NowPlaying/NowPlayingMovies";
import PopMovies from "../../pages/Popular/PopMovies";
import PopTvShows from "../../pages/Popular/PopTvShows";
import TRMovies from "../../pages/TopRated/TRMovies";
import TvShows from "../../pages/TopRated/TvShows";
import SearchResults from "../Search/SearchResults";
import Footer from "../Footer/Footer";
import { useAppSelector, useAppDispatch } from "../../state/hooks/hooks";
import { fetchMovies, fetchGenres } from "../../hooks/fetchMovies";
import { Route, Routes } from "react-router-dom";
import { handleSearch } from "../../hooks/fetchMovies";
import "./App.css";
import Collection from "../Collection/Collection";
import NowPlayTvShows from "../../pages/NowPlaying/NowPlayTvShows";
import People from "../../pages/People/People";

function App() {
  // create a state that will store value from the search input
  const [inputText, setInputText] = useState<string>("");
  // create a variable that will store the redux state value
  const movieState = useAppSelector((state) => state.collection.movies);
  const { nowPlaying, popular, topRated } = movieState;

  const effectRan = useRef<boolean>(true);
  const dispatch = useAppDispatch();

  // Create a callback function that will handle the movie search
  const handleSearchClick = useCallback(
    (title: string, page: string, movieType: string) => {
      handleSearch(title, dispatch, page, movieType);
    },
    []
  );

  useEffect(() => {
    if (effectRan.current) {
      fetchMovies("now_playing", dispatch);
      fetchMovies("popular", dispatch);
      fetchMovies("top_rated", dispatch);
      fetchGenres(dispatch);
    }
    return () => {
      effectRan.current = false;
    };
  }, []);

  // This variable will store the bg position
  const bgPosition = {
    backgroundPosition: "left",
  };

  return (
    <div className="App">
      <Header setInputText={setInputText} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <Search
                inputText={inputText}
                setInputText={setInputText}
                handleSearchClick={handleSearchClick}
              />

              <Collection
                props={nowPlaying}
                maxMovies={20}
                collection={"airing_today"}
              />

              <Videos />

              <Collection
                props={popular}
                maxMovies={20}
                bgPosition={bgPosition}
                collection="popular"
              />

              <Collection
                props={topRated}
                maxMovies={20}
                collection={"top_rated"}
              />
            </div>
          }
        />
        <Route
          path="search-results"
          element={
            <div className="app-container">
              <SearchResults
                inputText={inputText}
                setInputText={setInputText}
                handleSearchClick={handleSearchClick}
              />
            </div>
          }
        />
        <Route path="now_playing" element={<NowPlayingMovies />} />
        <Route path="popular" element={<PopMovies />} />
        <Route path="top_rated" element={<TRMovies />} />
        <Route path="airing_today" element={<NowPlayTvShows />} />
        <Route path="popular_tv" element={<PopTvShows />} />
        <Route path="top_rated_tv" element={<TvShows />} />
        <Route path="people" element={<People />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
