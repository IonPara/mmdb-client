import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks/hooks";
import { dateFunction } from "../../hooks/dateFunction";
import { fetchPerson } from "../../hooks/fetchPeople";
import ReactPlayer from "react-player";
import noImage from "../../assets/images/no-profile-picture.webp";
import { useAppSelector } from "../../state/hooks/hooks";
import "react-alice-carousel/lib/alice-carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
// import Swiper and modules styles
import { MovieType } from "../../components/Movies/Movies";
import Movies from "../../components/Movies/Movies";
// Import css styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "./MovieDetails.css";

// Import the api key from the env file
const API_KEY = import.meta.env.VITE_REACT_API_KEY;

// create image interface
interface ImageType {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

const MovieDetails = () => {
  const [videoStr, setVideoStr] = useState<string>("");
  const [videos, setVideos] = useState<[]>([]);
  const [images, setImages] = useState<ImageType[]>();
  const [recommendations, setRecommendations] = useState<MovieType[]>();

  const movie = useAppSelector((state) => state.collection.movieDetails);
  const credits = useAppSelector((state) => state.collection.movieCredits);
  const type = useAppSelector((state) => state.collection.type);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const backgroundImage: React.CSSProperties = {
    backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
  };

  // Convert the length of the movie into more readable format
  const timeConvert = (num: number) => {
    const hours = num / 60;
    const roundH = Math.floor(hours);
    const minutes = Math.round((hours - roundH) * 60);
    return roundH + "h " + minutes + "m";
  };

  // Fetch images
  const fetchVideos = async (movieId: number, type: string) => {
    const urlToFetch: string = `https://api.themoviedb.org/3/${type}/${movieId}/videos?api_key=${API_KEY}`;

    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.results.length) {
          setVideoStr(
            jsonResponse.results[jsonResponse.results.length - 1].key
          );
        } else {
          setVideoStr("");
        }
        setVideos(jsonResponse.results);
      } else {
        throw new Error("Request failed!");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  // Fetch images
  const fetchImages = async (movieId: number, type: string) => {
    const urlToFetch: string = `https://api.themoviedb.org/3/${type}/${movieId}/images?api_key=${API_KEY}`;

    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        setImages(jsonResponse.backdrops);
      } else {
        throw new Error("Request failed!");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  // Fetch recommendations
  const fetchRecommendations = async (movieId: number, type: string) => {
    const urlToFetch: string = `https://api.themoviedb.org/3/${type}/${movieId}/recommendations?api_key=${API_KEY}`;

    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setRecommendations(jsonResponse.results);
      } else {
        throw new Error("Request failed!");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (movie && type) {
      fetchVideos(movie.id, type);
      fetchImages(movie.id, type);
      fetchRecommendations(movie.id, type);
    }
  }, [movie]);

  // Make the release date to be read depending on the movie_type
  const releaseDate =
    type === "movie" ? movie?.release_date : movie?.first_air_date;
  // Retrieve the title depending on the movie type
  const title = type === "movie" ? movie?.title : movie?.name;
  // Make the word "season" plural if there are more than 1 season
  const seasons =
    movie?.number_of_seasons && movie?.number_of_seasons > 1
      ? " Seasons"
      : " Season";

  return (
    <>
      <section className="movie-details-container" style={backgroundImage}>
        <div className="dark-bg">
          <div className="inner-container">
            <h1>{title}</h1>
            <div className="release-time-genre">
              {movie &&
                `${releaseDate && dateFunction(releaseDate)} | ${
                  movie.runtime
                    ? timeConvert(movie.runtime)
                    : movie.number_of_seasons + seasons
                }`}
              <div className="movie-genres">
                {movie &&
                  movie.genres.map((genre: { id: number; name: string }) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
              </div>
            </div>
            <div className="flex">
              <div className="poster-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                  alt=""
                />
              </div>
              <div className="player-wrapper">
                <ReactPlayer
                  url={`https://www.youtube.com/embed/${videoStr}`}
                  className="react-player"
                  playing={true}
                  controls={true}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </div>
            <div className="details">
              <div className="b-bottom">
                <h3>Overview</h3>
                <p className="overview">{movie?.overview}</p>
              </div>
              <div className="directors b-bottom">
                <h3>Directors</h3>
                {credits?.crew.map((person) => {
                  if (person.department === "Directing") {
                    return (
                      <span className="directors-list" key={person.name}>
                        {person.name}
                      </span>
                    );
                  }
                })}
              </div>
              <div className="top-cast">
                <h3>Top Cast</h3>
                <div className="cast">
                  {credits?.cast.map((member) => {
                    return (
                      <figure className="img-outer-cont" key={member.name}>
                        <img
                          src={
                            member.profile_path
                              ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                              : noImage
                          }
                          alt={member.name}
                          onClick={() => {
                            fetchPerson(member.id, dispatch);
                            navigate("/person");
                          }}
                        />
                        <figcaption className="actor-name">
                          {member.name} <br />{" "}
                          <span className="character">{member.character}</span>
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Images section */}
      <section className="items">
        <h1>
          Photos <span className="nr-of-items">{images?.length}</span>
        </h1>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          autoplay
        >
          {images?.map((image: ImageType) => {
            return (
              <SwiperSlide key={image.file_path}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  alt=""
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      {/* Video Section */}
      <section className="items">
        <h1>
          Videos{" "}
          <span className="nr-of-items">
            {videos?.length < 10 ? videos?.length : 10}
          </span>
        </h1>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          spaceBetween={50}
          slidesPerView={2}
          autoplay
        >
          {videos?.map((video: any, index) => {
            if (index < 11) {
              return (
                <SwiperSlide key={index}>
                  <iframe
                    className="youtube-video p-2"
                    width="500"
                    height="300"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </section>
      {/* Recommendations section */}
      <section className="items">
        <h1>
          Recommendations{" "}
          <span className="nr-of-items">{recommendations?.length}</span>
        </h1>
        <Movies props={recommendations} maxMovies={20} />
      </section>
    </>
  );
};

export default MovieDetails;
