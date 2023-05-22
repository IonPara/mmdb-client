import React, { useCallback, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../state/hooks/hooks";
import Person from "./Person";
import "./People.css";
import { fetchPeople } from "../../hooks/fetchPeople";

const People = () => {
  const state = useAppSelector((state) => state.collection.people);
  const page = useRef<number>(2);
  const dispatch = useAppDispatch();
  const handleLoadMore = useCallback(() => {
    page.current++;
    fetchPeople(dispatch, `${page.current}`);
  }, []);
  return (
    <div className="people-container">
      {state?.map((person, index) => (
        <Person person={person} key={index} />
      ))}
      <button
        className="load-more-btn btn"
        type="button"
        onClick={handleLoadMore}
      >
        Load More
      </button>
    </div>
  );
};

export default People;
