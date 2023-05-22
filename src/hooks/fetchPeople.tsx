import { AppDispatch } from "../state/store/store";
import { loadMorePeople, setPeople } from "../state/reducers/movieReducer";

const apiKey: string = import.meta.env.VITE_REACT_API_KEY;

export const fetchPeople = async (
  dispatch: AppDispatch,
  page: string = "1"
) => {
  // create a variable that will store the api string
  const urlToFetch: string = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`;

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
