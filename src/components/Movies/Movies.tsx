import "./Movies.css";
import Movie from "./Movie";

export interface MovieType {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Response {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieType[];
  total_pages: number;
}

export interface Props {
  props: MovieType[] | undefined;
  maxMovies: number;
}

const Movies = ({ props, maxMovies }: Props) => {
  return (
    <div className="movie-container">
      {props &&
        props.map((movie, index) => {
          if (index <= maxMovies) {
            return <Movie movie={movie} overview={false} key={movie.id} />;
          }
        })}
    </div>
  );
};

export default Movies;
