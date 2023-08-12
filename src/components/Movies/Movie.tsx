import { MovieType } from "./Movies";
import { dateFunction } from "../../hooks/dateFunction";
import { useAppDispatch } from "../../state/hooks/hooks";
import { fetchMovieCredits, fetchMovieDetails } from "../../hooks/fetchMovies";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: MovieType;
  overview: boolean;
}

const Movie = ({ movie, overview }: Props) => {
  const type = movie.title ? "movie" : "tv";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = (movieId: number) => {
    navigate("/details");
    fetchMovieCredits(movieId, dispatch, type);
    fetchMovieDetails(movieId, dispatch, type);
  };
  return movie.poster_path ? (
    <div className="movie" key={movie.id} onClick={() => handleClick(movie.id)}>
      <div className="image-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="poster"
          className="poster"
        />
        {!overview && (
          <span className="rating">{movie.vote_average.toFixed(1)}</span>
        )}
      </div>
      <div className={!overview ? "movie-details" : "search-results-details"}>
        <h4 className="title">{movie.title || movie.name}</h4>
        <p>{dateFunction(movie.release_date || movie.first_air_date)}</p>
        {overview && <p className="overview">{movie.overview}</p>}
      </div>
    </div>
  ) : (
    <span></span>
  );
};

export default Movie;
