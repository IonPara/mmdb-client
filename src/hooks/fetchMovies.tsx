import { AppDispatch } from "../state/store/store";
import {
  setNowPlaying,
  setPopular,
  setTopRated,
  addMovies,
  addKeys,
  addTitles,
  setSearchedMovies,
  setSearchedTvShows,
  setMovieGenres,
  setTvGenres,
} from "../state/reducers/movieReducer";
import { MovieType } from "../components/Movies/Movies";

const apiKey: string = "924ad7aa1e5625716c51fc60a9683870";

// ------------------------------------fetchVideos---------------------------------
export const fetchVideos = async (
  movieId: number,
  dispatch: AppDispatch,
  title: string
) => {
  const urlToFetch: string = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      if (jsonResponse.results[0].key) {
        dispatch(addKeys(jsonResponse.results[0].key));
        dispatch(addTitles(title));
      }
    } else {
      throw new Error("Request failed!");
    }
  } catch (error: unknown) {
    console.log(error);
  }
};

//--------------------------------------Fetch Movies------------------------------------
export const fetchMovies = async (
  param: string,
  dispatch: AppDispatch,
  page: string = "1"
) => {
  // create a variable that will store the api string
  const urlToFetch: string = `https://api.themoviedb.org/3/movie/${param}?api_key=${apiKey}&page=${page}`;

  try {
    const response = await fetch(urlToFetch);

    // If response is "ok"
    if (response.ok) {
      const moviesResponse = await response.json();
      // If page is equal to 1
      if (page === "1") {
        // Switch statement to check the value of "param"
        switch (param) {
          case "now_playing": {
            moviesResponse.results.forEach((movie: MovieType) => {
              fetchVideos(movie.id, dispatch, movie.title);
            });
            dispatch(setNowPlaying([moviesResponse, "movies"]));
            break;
          }
          case "popular": {
            dispatch(setPopular([moviesResponse, "movies"]));
            break;
          }
          default: {
            dispatch(setTopRated([moviesResponse, "movies"]));
            break;
          }
        }
        // if page is other than 1
      } else {
        dispatch(addMovies([moviesResponse, param, "movies"]));
      }
      // if response is not OK then throw an error
    } else {
      throw new Error("Request failed!");
    }
    // Catch the error
  } catch (error: unknown) {
    console.log(error);
  }
};

// -----------------------------------------Handle search -------------------------------------
export const handleSearch = async (
  title: string,
  dispatch: AppDispatch,
  page: string,
  movieType: string
) => {
  const movieTitle = encodeURI(title);
  let response: Response;
  try {
    if (movieType === "movie") {
      response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}&include_adult=false&page=${page}&language=en`
      );
    } else {
      response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${movieTitle}&page=${page}&include_adult=false`
      );
    }

    if (response.ok) {
      if (movieType === "movie") {
        const moviesResponse = await response.json();
        dispatch(setSearchedMovies(moviesResponse));
      }

      if (movieType === "tv-shows") {
        const tvResults = await response.json();
        dispatch(setSearchedTvShows(tvResults));
      }
    } else {
      throw new Error("Request failed!");
    }
  } catch (error: unknown) {
    console.log(error);
  }
};

//------------------------------------- Fetch genres ---------------------------------
export const fetchGenres = async (dispatch: AppDispatch) => {
  let movieResponse: Response;
  let tvResponse: Response;
  try {
    movieResponse = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    );
    tvResponse = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`
    );
    if (movieResponse.ok && tvResponse.ok) {
      const movieResults = await movieResponse.json();
      const tvResults = await tvResponse.json();
      dispatch(setMovieGenres(movieResults.genres));
      dispatch(setTvGenres(tvResults.genres));
    } else {
      throw new Error("Request failed!");
    }
  } catch (error: unknown) {
    console.log(error);
  }
};

export const fetchTvs = async (
  param: string,
  dispatch: AppDispatch,
  page: string = "1"
) => {
  // create a variable that will store the api string
  const urlToFetch: string = `https://api.themoviedb.org/3/tv/${param}?include_adult=false&language=en-US&sort_by=primary_release_date.desc&page=${page}&api_key=${apiKey}`;

  try {
    const response = await fetch(urlToFetch);

    // If response is "ok"
    if (response.ok) {
      const moviesResponse = await response.json();
      // If page is equal to 1
      if (page === "1") {
        // Switch statement to check the value of "param"
        switch (param) {
          case "airing_today": {
            dispatch(setNowPlaying([moviesResponse, "tv"]));
            break;
          }
          case "popular": {
            dispatch(setPopular([moviesResponse, "tv"]));
            break;
          }
          default: {
            dispatch(setTopRated([moviesResponse, "tv"]));
            break;
          }
        }
        // if page is other than 1
      } else {
        dispatch(addMovies([moviesResponse, param, "tv"]));
      }
      // if response is not OK then throw an error
    } else {
      throw new Error("Request failed!");
    }
    // Catch the error
  } catch (error: unknown) {
    console.log(error);
  }
};
