import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { MovieType } from "../../components/Movies/Movies";
import { Response } from "../../components/Movies/Movies";
import { sortMovieList, sortTvList } from "../hooks/hooks";

type ResponseType = MovieType[] | undefined;

interface Genre {
  id: number;
  name: string;
}

// Define a type for the slice state
export interface MovieState {
  movies: {
    nowPlaying: ResponseType;
    popular: ResponseType;
    topRated: ResponseType;
    searchedMovies: Response | undefined;
    movieGenres: Genre[] | undefined;
  };
  tv: {
    nowPlaying: ResponseType;
    popular: ResponseType;
    topRated: ResponseType;
    searchedTvShows: Response | undefined;
    tvGenres: Genre[] | undefined;
  };
  videos: {
    keys: string[];
    titles: string[];
  };
}

// Define the initial state using that type
const initialState: MovieState = {
  movies: {
    nowPlaying: undefined,
    popular: undefined,
    topRated: undefined,
    searchedMovies: undefined,
    movieGenres: undefined,
  },
  tv: {
    nowPlaying: undefined,
    popular: undefined,
    topRated: undefined,
    searchedTvShows: undefined,
    tvGenres: undefined,
  },
  videos: {
    keys: [],
    titles: [],
  },
};

export const movieSlice = createSlice({
  name: "movies",
  // The initial state
  initialState,
  // The reducers
  reducers: {
    setNowPlaying: (state, action: PayloadAction<[Response, string]>) => {
      if (action.payload[1] === "movies") {
        state.movies.nowPlaying = action.payload[0].results;
      }
      if (action.payload[1] === "tv") {
        state.tv.nowPlaying = action.payload[0].results;
      }
    },
    setPopular: (state, action: PayloadAction<[Response, string]>) => {
      if (action.payload[1] === "movies") {
        state.movies.popular = action.payload[0].results;
      }
      if (action.payload[1] === "tv") {
        state.tv.popular = action.payload[0].results;
      }
    },
    setTopRated: (state, action: PayloadAction<[Response, string]>) => {
      if (action.payload[1] === "movies") {
        state.movies.topRated = action.payload[0].results;
      }
      if (action.payload[1] === "tv") {
        state.tv.topRated = action.payload[0].results;
      }
    },
    addMovies: (state, action: PayloadAction<[Response, string, string]>) => {
      const results = action.payload[0].results;
      switch (action.payload[1]) {
        case "now_playing": {
          if (action.payload[2] === "movies") {
            state.movies.nowPlaying = state.movies.nowPlaying?.concat(results);
          }
          break;
        }
        case "popular": {
          if (action.payload[2] === "movies") {
            state.movies.popular = state.movies.popular?.concat(results);
          }
          if (action.payload[2] === "tv") {
            state.tv.popular = state.tv.popular?.concat(results);
          }
          break;
        }

        case "airing_today": {
          if (action.payload[2] === "tv") {
            state.tv.nowPlaying = state.tv.nowPlaying?.concat(results);
          }
        }
        default: {
          if (action.payload[2] === "movies") {
            state.movies.topRated = state.movies.topRated?.concat(results);
          }
          if (action.payload[2] === "tv") {
            state.tv.topRated = state.tv.topRated?.concat(results);
          }
          break;
        }
      }
    },
    addKeys: (state, action: PayloadAction<string>) => {
      state.videos.keys.push(action.payload);
    },
    addTitles: (state, action: PayloadAction<string>) => {
      state.videos.titles.push(action.payload);
    },
    setSearchedMovies: (state, action: PayloadAction<Response>) => {
      state.movies.searchedMovies = action.payload;
    },
    setSearchedTvShows: (state, action: PayloadAction<Response>) => {
      state.tv.searchedTvShows = action.payload;
    },
    setMovieGenres: (state, action: PayloadAction<Genre[]>) => {
      state.movies.movieGenres = action.payload;
    },
    setTvGenres: (state, action: PayloadAction<Genre[]>) => {
      state.tv.tvGenres = action.payload;
    },

    sortMovies: (state, action: PayloadAction<string[]>) => {
      if (action.payload[0] === "now_playing") {
        state.movies.nowPlaying = sortMovieList(
          action.payload[1],
          state.movies.nowPlaying
        );
      }
      if (action.payload[0] === "popular") {
        state.movies.popular = sortMovieList(
          action.payload[1],
          state.movies.popular
        );
      }
      if (action.payload[0] === "top_rated") {
        state.movies.topRated = sortMovieList(
          action.payload[1],
          state.movies.topRated
        );
      }
    },

    sortTvShows: (state, action: PayloadAction<string[]>) => {
      if (action.payload[0] === "airing_today") {
        state.tv.nowPlaying = sortTvList(
          action.payload[1],
          state.tv.nowPlaying
        );
      }
      if (action.payload[0] === "popular") {
        state.tv.popular = sortTvList(action.payload[1], state.tv.popular);
      }
      if (action.payload[0] === "top_rated") {
        state.tv.topRated = sortTvList(action.payload[1], state.tv.topRated);
      }
    },
  },
});

export const {
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
  sortMovies,
  sortTvShows,
} = movieSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const movieReducer = (state: RootState) => state;

export default movieSlice.reducer;
