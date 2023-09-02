import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import type { MovieType } from "../../components/Movies/Movies";
import _default from "react-bootstrap/esm/Dropdown";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// This hook will sort the movies by the "sortBy" criteria
export const sortMovieList = (
  sortBy: string,
  state: MovieType[] | undefined
) => {
  //   let newState = structuredClone(state);
  switch (sortBy) {
    case "Rating Ascending":
      state?.sort(
        (a: MovieType, b: MovieType) => a.vote_average - b.vote_average
      );
      break;
    case "Rating Descending":
      state?.sort(
        (a: MovieType, b: MovieType) => b.vote_average - a.vote_average
      );
      break;
    case "Release Descending":
      state?.sort((a: MovieType, b: MovieType) => {
        if (a.release_date && b.release_date)
          new Date(b.release_date).valueOf() -
            new Date(a.release_date).valueOf();
        return 1;
      });
      break;
    case "Release Ascending":
      state?.sort((a: MovieType, b: MovieType) => {
        if (a.release_date && b.release_date)
          new Date(a.release_date).valueOf() -
            new Date(b.release_date).valueOf();
        return -1;
      });
      break;
    case "Title (A-Z)":
      state?.sort((a: MovieType, b: MovieType) => {
        if (b.title && a.title) a.title.localeCompare(b.title);
        return 1;
      });
      break;
    case "Title (Z-A)":
      state?.sort((a: MovieType, b: MovieType) => {
        if (b.title && a.title) b.title.localeCompare(a.title);
        return -1;
      });
      break;
    default:
      state?.sort((a: MovieType, b: MovieType) => b.popularity - a.popularity);
      break;
  }
  return state;
};

export const sortTvList = (sortBy: string, state: MovieType[] | undefined) => {
  switch (sortBy) {
    case "Rating Ascending":
      state?.sort(
        (a: MovieType, b: MovieType) => a.vote_average - b.vote_average
      );
      break;

    case "Rating Descending":
      state?.sort(
        (a: MovieType, b: MovieType) => b.vote_average - a.vote_average
      );
      break;

    case "Release Descending":
      state?.sort((a: MovieType, b: MovieType) => {
        if (a.first_air_date && b.first_air_date) {
          return (
            new Date(b.first_air_date).valueOf() -
            new Date(a.first_air_date).valueOf()
          );
        }
        return 0;
      });
      break;

    case "Release Ascending":
      state?.sort((a: MovieType, b: MovieType) => {
        if (a.first_air_date && b.first_air_date) {
          return (
            new Date(a.first_air_date).valueOf() -
            new Date(b.first_air_date).valueOf()
          );
        }
        return -1;
      });
      break;

    case "Title (A-Z)":
      state?.sort((a: MovieType, b: MovieType) => {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        }
        return 1;
      });
      break;

    case "Title (Z-A)":
      state?.sort((a: MovieType, b: MovieType) => {
        if (a.name && b.name) b.name.localeCompare(a.name);
        return -1;
      });
      break;

    default:
      state?.sort((a: MovieType, b: MovieType) => b.popularity - a.popularity);
      break;
  }
  return state;
};
