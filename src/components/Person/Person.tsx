import { PersonType } from "../../state/reducers/movieReducer";
import { fetchPerson } from "../../hooks/fetchPeople";
import { useAppDispatch } from "../../state/hooks/hooks";
import { useNavigate } from "react-router-dom";
import "../../pages/People/People.css";

interface Props {
  person: PersonType;
}

const Person = ({ person }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      {person.profile_path && (
        <div
          className="person"
          onClick={() => {
            fetchPerson(person.id, dispatch);
            navigate("/person");
          }}
        >
          <div className="image-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt="poster"
              className="poster"
            />
          </div>
          <h3 className="name">{person.name}</h3>
        </div>
      )}
    </>
  );
};

export default Person;
