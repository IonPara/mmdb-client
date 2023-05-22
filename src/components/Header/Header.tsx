import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useAppDispatch } from "../../state/hooks/hooks";
import { sortMovies } from "../../state/reducers/movieReducer";
import { fetchTvs } from "../../hooks/fetchMovies";
import { fetchPeople } from "../../hooks/fetchPeople";

interface Props {
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ setInputText }: Props) => {
  const [showModal, setShowModal] = useState<string | boolean>(false);
  const movieCollections: string[] = ["now_playing", "popular", "top_rated"];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // This hook will handle the click over the "MMDB"
  const handleClick = useCallback(() => {
    setInputText("");
    movieCollections.forEach((movie) =>
      dispatch(sortMovies([movie, "Default"]))
    );
    navigate("/");
  }, []);

  // This modal will be shown when hover over "Movies"
  const modal = (
    <ul className={!showModal ? "modal" : "modal openModal"}>
      <li onClick={() => navigate("now_playing")} className="modal-item">
        Now Playing
      </li>
      <li className="modal-item" onClick={() => navigate("popular")}>
        Popular
      </li>
      <li className="modal-item" onClick={() => navigate("top_rated")}>
        Top Rated
      </li>
    </ul>
  );

  // This modal will be shown when hover over "Tv Shows"
  const tvModal = (
    <ul className={!showModal ? "modal" : "modal openModal"}>
      <li
        onClick={() => {
          fetchTvs("airing_today", dispatch, "1");
          navigate("airing_today");
        }}
        className="modal-item"
      >
        Airing Today
      </li>
      <li
        className="modal-item"
        onClick={() => {
          fetchTvs("popular", dispatch, "1");

          navigate("popular_tv");
        }}
      >
        Popular
      </li>
      <li
        className="modal-item"
        onClick={() => {
          fetchTvs("top_rated", dispatch, "1");

          navigate("top_rated_tv");
        }}
      >
        Top Rated
      </li>
    </ul>
  );

  return (
    <header className="header">
      <h2 className="text-shadow text-shadow-hover" onClick={handleClick}>
        MMDB
      </h2>
      <ul className="list">
        <li
          className="header-list-item"
          onMouseOver={() => setShowModal("movies")}
          onMouseOut={() => setShowModal(false)}
        >
          Movies
          {showModal === "movies" && modal}
        </li>
        <li
          className="header-list-item"
          onMouseOver={() => setShowModal("tv-shows")}
          onMouseOut={() => setShowModal(false)}
        >
          TV Shows
          {showModal === "tv-shows" && tvModal}
        </li>
        <li
          className="header-list-item"
          onClick={() => {
            navigate("/people");
            fetchPeople(dispatch);
          }}
        >
          People
        </li>
      </ul>
    </header>
  );
};

export default Header;
