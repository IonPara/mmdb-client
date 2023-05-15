import { MovieType } from "./Movies";
import { dateFunction } from "../../hooks/dateFunction";

interface Props {
  movie: MovieType;
  overview: boolean;
}

const Movie = ({ movie, overview }: Props) => {
  return movie.poster_path ? (
    <div className="movie" key={movie.id}>
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
