import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import mario from "../../assets/images/mario2.png";
import avatar from "../../assets/images/avatar.jpg";
import johnWick from "../../assets/images/johnWick.jpg";
import shazam from "../../assets/images/shazam.png";
import "./Search.css";

const posters: string[] = [mario, johnWick, avatar, shazam];

interface Props {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  handleSearchClick: (title: string, page: string, movieType: string) => void;
}

const Search = ({ inputText, setInputText, handleSearchClick }: Props) => {
  const randomNumber: number = Math.floor(Math.random() * posters.length);
  const refNumber = useRef(randomNumber);

  const image: string = posters[refNumber.current];

  const style: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const navigate = useNavigate();

  const handleSubmit = () => {
    handleSearchClick(inputText, "1", "movie");
    handleSearchClick(inputText, "1", "tv-shows");
    navigate("/search-results");
  };

  return (
    <section className="search-section" style={style}>
      <div className="search-container">
        <h1 className="welcome-heading centered">Welcome</h1>
        <h2 className="welcome-subheading centered">
          Your favorite movies and TV shows to discover.
        </h2>
        <form className="search-form centered" onSubmit={handleSubmit}>
          <input
            value={inputText}
            type="text"
            placeholder="Search for a movie, tv show, people"
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <button disabled={!inputText.length} type="submit">
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Search;
