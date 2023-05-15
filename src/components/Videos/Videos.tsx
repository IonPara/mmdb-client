import Video from "./Video";
import { Response } from "../Movies/Movies";
import "./Videos.css";
import { useAppSelector } from "../../state/hooks/hooks";
interface Props {
  props: Response | undefined;
}

export interface Video {
  keys: string[];
  titles: string[];
}

const Videos = () => {
  const videosState = useAppSelector((state) => state.collection);
  return (
    <section className="trailers-section">
      <h2 className="trailers-heading">Latest Trailers</h2>
      <div className="trailers-container">
        {videosState.videos.keys.map((key, index) => {
          return (
            <div key={key}>
              <Video embed={key} />
              <h3 className="p-5">{videosState.videos?.titles[index]}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Videos;
