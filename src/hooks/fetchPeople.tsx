import { AppDispatch } from "../state/store/store";
import {
  loadMorePeople,
  setPeople,
  setPerson,
  setCombinedCredits,
} from "../state/reducers/movieReducer";

const API_KEY: string = import.meta.env.VITE_REACT_API_KEY;

export const fetchPeople = async (
  dispatch: AppDispatch,
  page: string = "1"
) => {
  // create a variable that will store the api string
  const urlToFetch: string = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${page}`;

  try {
    const response = await fetch(urlToFetch);

    // If response is "ok"
    if (response.ok) {
      const results = await response.json();
      if (page === "1") {
        dispatch(setPeople(results.results));
      } else {
        dispatch(loadMorePeople(results.results));
      }
    }
    // Catch the error
  } catch (error: unknown) {
    console.log(error);
  }
};

export const fetchPerson = async (personId: number, dispatch: AppDispatch) => {
  const urlToFetch: string = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      dispatch(setPerson(jsonResponse));
    } else {
      throw new Error("Request failed!");
    }
  } catch (error: unknown) {
    console.log(error);
  }
};

export const fetchCombinedCredits = async (
  personId: number,
  dispatch: AppDispatch
) => {
  const urlToFetch: string = `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      dispatch(setCombinedCredits(jsonResponse.cast));
    } else {
      throw new Error("Request failed!");
    }
  } catch (error: unknown) {
    console.log(error);
  }
};
