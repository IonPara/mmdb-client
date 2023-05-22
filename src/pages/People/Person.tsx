import React from "react";
import { PersonType } from "../../state/reducers/movieReducer";
import "./People.css";
// const person: PersonType = {
//   adult: false,
//   gender: 1,
//   id: 16866,
//   known_for_department: "Acting",
//   name: "Jennifer Lopez",
//   original_name: "Jennifer Lopez",
//   popularity: 38.177,
//   profile_path: "/l2OLGt39AGflkzB7Lt9QT2h31Tl.jpg",
//   known_for: [
//     {
//       adult: false,
//       backdrop_path: "/94KpGOnZckDk6UQE9bThjnlDWcg.jpg",
//       id: 9360,
//       title: "Anaconda",
//       original_language: "en",
//       original_title: "Anaconda",
//       overview:
//         'A "National Geographic" film crew is taken hostage by an insane hunter, who takes them along on his quest to capture the world\'s largest - and deadliest - snake.',
//       poster_path: "/33NysOnLpLZY0ewHTcfpalzAsRG.jpg",
//       media_type: "movie",
//       genre_ids: [],
//       popularity: 32.934,
//       release_date: "1997-04-11",
//       video: false,
//       vote_average: 5.162,
//       vote_count: 2195,
//     },
//     {
//       adult: false,
//       backdrop_path: "/96iXwJibeNW9RGEa58zYa0SQV6m.jpg",
//       id: 241251,
//       title: "The Boy Next Door",
//       original_language: "en",
//       original_title: "The Boy Next Door",
//       overview:
//         "A recently cheated on married woman falls for a younger man who has moved in next door, but their torrid affair soon takes a dangerous turn.",
//       poster_path: "/tM0hpWw3GONam6TKcMMciecHjhT.jpg",
//       media_type: "movie",
//       genre_ids: [53],
//       popularity: 19.761,
//       release_date: "2015-01-23",
//       video: false,
//       vote_average: 4.847,
//       vote_count: 1918,
//     },
//     {
//       adult: false,
//       backdrop_path: "/l5sD0AK286fBpXyDHRCbtaFMArN.jpg",
//       id: 7303,
//       title: "Maid in Manhattan",
//       original_language: "en",
//       original_title: "Maid in Manhattan",
//       overview:
//         "Marisa Ventura is a struggling single mom who works at a posh Manhattan hotel and dreams of a better life for her and her young son. One fateful day, hotel guest and senatorial candidate Christopher Marshall meets Marisa and mistakes her for a wealthy socialite. After an enchanting evening together, the two fall madly in love. But when Marisa's true identity is revealed, issues of class and social status threaten to separate them. Can two people from very different worlds overcome their differences and live happily ever after?",
//       poster_path: "/a0xOVDKEWW1nyArKFS3Fg1b4PsE.jpg",
//       media_type: "movie",
//       genre_ids: [35, 18, 10749],
//       popularity: 19.541,
//       release_date: "2002-12-13",
//       video: false,
//       vote_average: 6.1,
//       vote_count: 1699,
//     },
//   ],
// };

interface Props {
  person: PersonType;
}

const Person = ({ person }: Props) => {
  return (
    <>
      {person.profile_path && (
        <div className="person">
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
