import { useEffect, useState } from "react";
import { fetchCombinedCredits } from "../../hooks/fetchPeople";
import { useAppSelector, useAppDispatch } from "../../state/hooks/hooks";
import noImage from "../../assets/images/no-profile-picture.webp";
import Movie from "../../components/Movies/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
// Import css styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "./People.css";

// const person = {
//   adult: false,
//   also_known_as: [
//     "Rebecca Louisa Ferguson Sundström",
//     "ربکا فرگوسن",
//     "丽贝卡·弗格森",
//     "레베카 퍼거슨",
//     "レベッカ・ファーガソン",
//   ],
//   biography:
//     "Rebecca Louisa Ferguson Sundström (born 19 October 1983) is a Swedish actress. She began her acting career with the Swedish soap opera Nya tider (1999–2000) and went on to star in the slasher film Drowning Ghost (2004). She came to international prominence with her portrayal of Elizabeth Woodville in the British television miniseries The White Queen (2013), for which she was nominated for a Golden Globe for Best Actress in a Miniseries or Television Film.\n\nFerguson starred as MI6 agent Ilsa Faust in the action spy film Mission: Impossible – Rogue Nation (2015) and its sequel Mission: Impossible – Fallout (2018). She also played Jenny Lind in the musical film The Greatest Showman (2017) and acted in science fiction horror film Life (2017), starred in the horror film Doctor Sleep (2019), and had supporting parts in the comedy-drama Florence Foster Jenkins (2016), the mystery thriller The Girl on the Train (2016), and the science fiction film Men in Black: International (2019). She portrayed Lady Jessica in the sci-fi epic Dune (2021).",
//   birthday: "1983-10-19",
//   deathday: null,
//   gender: 1,
//   homepage: null,
//   id: 933238,
//   imdb_id: "nm0272581",
//   known_for_department: "Acting",
//   name: "Rebecca Ferguson",
//   place_of_birth: "Stockholm, Sweden",
//   popularity: 107.401,
//   profile_path: "/6NRlV9oUipeak7r00V6k73Jb7we.jpg",
// };

// const combinedCredits = [
//   {
//     adult: false,
//     backdrop_path: "/v6XrNwkKWRvvaJVb4W7N40U2FTc.jpg",
//     genre_ids: [18, 10749, 53],
//     id: 366901,
//     original_language: "en",
//     original_title: "Despite the Falling Snow",
//     overview:
//       "New York, 1961. Alexander Ivanov, a high-ranked Soviet bureaucrat, reluctantly defects to the West while is part of a diplomatic mission, feeling the grief of being unable to know the fate of his wife Katya, whom he has had to leave behind in Moscow. Only many years later, in 1991, he will finally find out the truth when his niece Lauren travels to Moscow to participate in a painting exhibition.",
//     popularity: 8.938,
//     poster_path: "/sYCwDIeGfOjxesa3j6wu44EjhwU.jpg",
//     release_date: "2016-01-29",
//     title: "Despite the Falling Snow",
//     video: false,
//     vote_average: 5.9,
//     vote_count: 73,
//     character: "Katya Grinkova / Lauren Grinkova",
//     credit_id: "563cad9d9251414ab70251b5",
//     order: 0,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [18],
//     id: 555427,
//     original_language: "sv",
//     original_title: "Lennart",
//     overview:
//       "An elderly man tries to learn to live and be independent after the death of his wife.",
//     popularity: 0.6,
//     poster_path: "/fHYZ6KR2qTDlXR5sFQKIfsmsj38.jpg",
//     release_date: "2010-06-02",
//     title: "Lennart",
//     video: false,
//     vote_average: 4,
//     vote_count: 1,
//     character: "Hemtjänstpersonal",
//     credit_id: "5bccec2b0e0a26016e01344d",
//     order: 0,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [35, 18],
//     id: 583312,
//     original_language: "en",
//     original_title: "Irresistible",
//     overview:
//       "A young couple is having a cup of coffee. When the woman asks if she may have the last cookie, the man contemplates his answer for a few seconds. His visualized, multifaceted thought process reveals a strained relationship.",
//     popularity: 0.635,
//     poster_path: "/gzXkoVCPe6USDOOOxHzzSJltmJb.jpg",
//     release_date: "2011-06-14",
//     title: "Irresistible",
//     video: false,
//     vote_average: 4,
//     vote_count: 1,
//     character: "Woman",
//     credit_id: "5c6c3e070e0a2617779da3cc",
//     order: 0,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [18],
//     id: 617900,
//     original_language: "sv",
//     original_title: "Puls",
//     overview:
//       "Lukas, a young boy, is a long-term resident at the hospital due to burns from a house fire. Wandering around the empty corridors one night he meets Linda, who just arrived after narrowly escaping a car crash. In need of a shoulder to lean on, they find each-other.",
//     popularity: 0.6,
//     poster_path: "/pjayLmVGGUZKkgYhpiMgPa4BBKu.jpg",
//     release_date: "2010-05-11",
//     title: "Puls",
//     video: false,
//     vote_average: 5,
//     vote_count: 1,
//     character: "Linda",
//     credit_id: "5d37f09c60c51d0012857489",
//     order: 0,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [],
//     id: 1134054,
//     original_language: "en",
//     original_title: "Best Served Cold",
//     overview:
//       "The story of the legendary mercenary Monza Murcatto, the betrayal that ostracizes her, and her ensuing quest for revenge that will forever change a nation.",
//     popularity: 0.6,
//     poster_path: "/cA7jJeHfq30NyPE4U67W3iqrtd5.jpg",
//     release_date: "",
//     title: "Best Served Cold",
//     video: false,
//     vote_average: 0,
//     vote_count: 0,
//     character: "Monza Murcatto",
//     credit_id: "64764f21b339030118108e50",
//     order: 0,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/1aYGhyYco2b7TaFGZAP7BI9NQAf.jpg",
//     genre_ids: [18],
//     id: 85340,
//     original_language: "sv",
//     original_title: "En enkel till Antibes",
//     overview:
//       "When George (Sven-Bertil Taube), a half-blind widower, learns that his children (Malin Morgan, Dan Ekborg) have conceived an elaborate plan to get their hands on his assets before he dies, he must confront his life choices. After catching his young home help Maria (Rebecca Ferguson's screen debut) red-handed in the act of stealing, George blackmails her into assisting him in a counterattack, triggering off a chain reaction in the family. George's children discover that he has a secret mistress in France.",
//     popularity: 1.658,
//     poster_path: "/nAeGQd7wkaMmT8YuiQtreZ4uMfp.jpg",
//     release_date: "2011-09-30",
//     title: "A One-Way Trip to Antibes",
//     video: false,
//     vote_average: 6.2,
//     vote_count: 5,
//     character: "Maria",
//     credit_id: "52fe49359251416c910a6213",
//     order: 1,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/4SO6pbGJTpM9YYovYxFLY3MXqZn.jpg",
//     genre_ids: [53, 9648, 18],
//     id: 346685,
//     original_language: "en",
//     original_title: "The Girl on the Train",
//     overview:
//       "Rachel Watson, devastated by her recent divorce, spends her daily commute fantasizing about the seemingly perfect couple who live in a house that her train passes every day, until one morning she sees something shocking happen there and becomes entangled in the mystery that unfolds.",
//     popularity: 20.629,
//     poster_path: "/AhTO2QWG0tug7yDoh0XoaMhPt3J.jpg",
//     release_date: "2016-10-05",
//     title: "The Girl on the Train",
//     video: false,
//     vote_average: 6.437,
//     vote_count: 5354,
//     character: "Anna Watson",
//     credit_id: "55f3833d9251417f76000d60",
//     order: 1,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/rfBUlspOpxPavxrhkhvzlBlwfD8.jpg",
//     genre_ids: [80, 53],
//     id: 372343,
//     original_language: "en",
//     original_title: "The Snowman",
//     overview:
//       "Detective Harry Hole investigates the disappearance of a woman whose pink scarf is found wrapped around an ominous looking snowman.",
//     popularity: 16.279,
//     poster_path: "/mKsQ8KMOk0VBX26Ev0Lj6EmfGJu.jpg",
//     release_date: "2017-10-12",
//     title: "The Snowman",
//     video: false,
//     vote_average: 5.201,
//     vote_count: 2056,
//     character: "Katrine Bratt",
//     credit_id: "56815d2c92514132db00ebbc",
//     order: 1,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
//     genre_ids: [878, 12],
//     id: 438631,
//     original_language: "en",
//     original_title: "Dune",
//     overview:
//       "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
//     popularity: 143.326,
//     poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
//     release_date: "2021-09-15",
//     title: "Dune",
//     video: false,
//     vote_average: 7.796,
//     vote_count: 9031,
//     character: "Lady Jessica Atreides",
//     credit_id: "5b90742fc3a368222e002f41",
//     order: 1,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/xPBBXV8LPVgBQacp6qNvmMGV3ga.jpg",
//     genre_ids: [9648, 878],
//     id: 579047,
//     original_language: "en",
//     original_title: "Reminiscence",
//     overview:
//       "Nicolas Bannister, a rugged and solitary veteran living in a near-future Miami flooded by rising seas, is an expert in a dangerous occupation: he offers clients the chance to relive any memory they desire. His life changes when he meets a mysterious young woman named Mae. What begins as a simple matter of lost and found becomes a passionate love affair. But when a different client's memories implicate Mae in a series of violent crimes, Bannister must delve through the dark world of the past to uncover the truth about the woman he fell for.",
//     popularity: 19.769,
//     poster_path: "/17siH6wJRQ2jZiqz9BWUhy1UtZ.jpg",
//     release_date: "2021-08-18",
//     title: "Reminiscence",
//     video: false,
//     vote_average: 6.7,
//     vote_count: 1508,
//     character: "Mae",
//     credit_id: "5c51f5ae0e0a263ccddbd0cd",
//     order: 1,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/rzEynyUJypcvxUFOdVQwwWyMeHn.jpg",
//     genre_ids: [18],
//     id: 583317,
//     original_language: "sv",
//     original_title: "Little Match Girl",
//     overview:
//       "Scandinavia, 1846. A poor young girl forced to sell matchsticks desperately lights one match to survive the winter night. She is drawn into a dream world where the flames of fire give her hope for a better life, while the cold creeps closer. Based on H.C. Andersen's short story.",
//     popularity: 1.079,
//     poster_path: "/5wg7u699qA6sZHLpf1lEhlR0VWV.jpg",
//     release_date: "2018-08-01",
//     title: "Little Match Girl",
//     video: false,
//     vote_average: 7.4,
//     vote_count: 5,
//     character: "Mother",
//     credit_id: "5c6c47b3c3a36848f1dde02b",
//     order: 1,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/if3Ge1oWObQx5dQGLdnbR8dHWDi.jpg",
//     genre_ids: [18, 9648, 35],
//     id: 617906,
//     original_language: "en",
//     original_title: "Cold Night",
//     overview:
//       "Confronted by the cultural restrict rules of his Scandinavian society, a private detective deconstructs himself through the argument of Shakespeare' s Hamlet.",
//     popularity: 0.972,
//     poster_path: "/fZNNqoWxnq525CPnK1MBbBDokJq.jpg",
//     release_date: "2019-10-27",
//     title: "Cold Night",
//     video: false,
//     vote_average: 4.5,
//     vote_count: 2,
//     character: "Jenny Sorensen",
//     credit_id: "5d37f747e54d5d7598da05e5",
//     order: 1,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [18],
//     id: 174077,
//     original_language: "sv",
//     original_title: "Vi",
//     overview:
//       "This is a story of Ida and Krister. It's about a relationship that goes to hell. They are both crazy in love but manage to strangle the supply of oxygen and adapt to each other in a way that will lead to catastrophic consequences.",
//     popularity: 3.397,
//     poster_path: "/398oP5HGjLCmW1c4rxNI3dnG71c.jpg",
//     release_date: "2013-05-10",
//     title: "Us",
//     video: false,
//     vote_average: 4.6,
//     vote_count: 20,
//     character: "Linda",
//     credit_id: "52fe4d43c3a36847f8257737",
//     order: 2,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/jvUKejL9uZtI0yi2aoQZ2oykRTA.jpg",
//     genre_ids: [27, 878, 9648, 53],
//     id: 395992,
//     original_language: "en",
//     original_title: "Life",
//     overview:
//       "The six-member crew of the International Space Station is tasked with studying a sample from Mars that may be the first proof of extra-terrestrial life, which proves more intelligent than ever expected.",
//     popularity: 37.56,
//     poster_path: "/wztfli5NgYDgurVgShNflvnyA3Z.jpg",
//     release_date: "2017-03-22",
//     title: "Life",
//     video: false,
//     vote_average: 6.419,
//     vote_count: 6690,
//     character: "Miranda North",
//     credit_id: "57299b189251415d67001849",
//     order: 2,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/ap6Zc5NDOfbZaMhkRDyghbGeLf0.jpg",
//     genre_ids: [27, 53, 14],
//     id: 501170,
//     original_language: "en",
//     original_title: "Doctor Sleep",
//     overview:
//       "Still irrevocably scarred by the trauma he endured as a child at the Overlook, Dan Torrance has fought to find some semblance of peace. But that peace is shattered when he encounters Abra, a courageous teenager with her own powerful extrasensory gift, known as the 'shine'. Instinctively recognising that Dan shares her power, Abra has sought him out, desperate for his help against the merciless Rose the Hat and her followers.",
//     popularity: 39.061,
//     poster_path: "/p69QzIBbN06aTYqRRiCOY1emNBh.jpg",
//     release_date: "2019-10-30",
//     title: "Doctor Sleep",
//     video: false,
//     vote_average: 7.153,
//     vote_count: 3848,
//     character: "Rose the Hat",
//     credit_id: "5b3537ab0e0a26400a02568c",
//     order: 2,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/2FYzxgLNuNVwncilzUeCGbOQzP7.jpg",
//     genre_ids: [35, 878, 28],
//     id: 479455,
//     original_language: "en",
//     original_title: "Men in Black: International",
//     overview:
//       "The Men in Black have always protected the Earth from the scum of the universe. In this new adventure, they tackle their biggest, most global threat to date: a mole in the Men in Black organization.",
//     popularity: 29.048,
//     poster_path: "/dPrUPFcgLfNbmDL8V69vcrTyEfb.jpg",
//     release_date: "2019-06-12",
//     title: "Men in Black: International",
//     video: false,
//     vote_average: 5.942,
//     vote_count: 4364,
//     character: "Riza Stavros",
//     credit_id: "5c6d131d0e0a265627a80bd8",
//     order: 2,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/4G3DsvGEACnuIKlmaEtbx9nv7oD.jpg",
//     genre_ids: [28, 12, 878],
//     id: 693134,
//     original_language: "en",
//     original_title: "Dune: Part Two",
//     overview:
//       "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
//     popularity: 63.503,
//     poster_path: "/cBDoFHJVcZqAonkTyhN9sMEggi5.jpg",
//     release_date: "2023-11-01",
//     title: "Dune: Part Two",
//     video: false,
//     vote_average: 0,
//     vote_count: 0,
//     character: "Lady Jessica Atreides",
//     credit_id: "5f193d28519bbb003570317b",
//     order: 2,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/x5zHw4qTZ1aP4Lrcv49coRluvxr.jpg",
//     genre_ids: [35, 18],
//     id: 315664,
//     original_language: "en",
//     original_title: "Florence Foster Jenkins",
//     overview:
//       "The story of Florence Foster Jenkins, a New York heiress, who dreamed of becoming an opera singer, despite having a terrible singing voice.",
//     popularity: 9.227,
//     poster_path: "/1HAdtUchzWEo0LMFHrgD2UBIBS3.jpg",
//     release_date: "2016-05-06",
//     title: "Florence Foster Jenkins",
//     video: false,
//     vote_average: 6.7,
//     vote_count: 1356,
//     character: "Kathleen Weatherley",
//     credit_id: "555a6d9c9251416a230006e8",
//     order: 3,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/OrYq215ZYM75dBaHt6v7EHEyPz.jpg",
//     genre_ids: [28, 12],
//     id: 177677,
//     original_language: "en",
//     original_title: "Mission: Impossible - Rogue Nation",
//     overview:
//       "Ethan and team take on their most impossible mission yet—eradicating 'The Syndicate', an International and highly-skilled rogue organization committed to destroying the IMF.",
//     popularity: 51.904,
//     poster_path: "/jwqL7croP7JMVfz0l9o7V4yJsJO.jpg",
//     release_date: "2015-07-23",
//     title: "Mission: Impossible - Rogue Nation",
//     video: false,
//     vote_average: 7.179,
//     vote_count: 7902,
//     character: "Ilsa Faust",
//     credit_id: "53cec5bf0e0a265df3007190",
//     order: 3,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/lrNKm3HNvGdZoAfiBKu7b04FLHN.jpg",
//     genre_ids: [18],
//     id: 316029,
//     original_language: "en",
//     original_title: "The Greatest Showman",
//     overview:
//       "The story of American showman P.T. Barnum, founder of the circus that became the famous traveling Ringling Bros. and Barnum & Bailey Circus.",
//     popularity: 31.157,
//     poster_path: "/b9CeobiihCx1uG1tpw8hXmpi7nm.jpg",
//     release_date: "2017-12-20",
//     title: "The Greatest Showman",
//     video: false,
//     vote_average: 7.914,
//     vote_count: 8702,
//     character: "Jenny Lind",
//     credit_id: "57eb8ef19251410de0003a48",
//     order: 3,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [27, 53],
//     id: 58384,
//     original_language: "sv",
//     original_title: "Strandvaskaren",
//     overview:
//       "Hundred years ago, three students at the Hellestads Boarding School were brutally slaughtered, the murderer drowned himself in a lake nearby and his body was never found. The story has become a legend for generations of students as well as a yearly festivity. Sara, a student, is writting an essay based on the legend and uncovers new facts from the event that will cast dark shadows on the family name of one of the school's main benificiaries. On the night of the hundreth anniversary, the festivities go awry, students disappear and something dark and unknown is moving through the schools corridors...",
//     popularity: 3.647,
//     poster_path: "/zkoh6mbwquEkqw8npcC1Ym7po10.jpg",
//     release_date: "2004-10-14",
//     title: "Drowning Ghost",
//     video: false,
//     vote_average: 4.8,
//     vote_count: 29,
//     character: "Amanda",
//     credit_id: "52fe4960c3a36847f8196d31",
//     order: 4,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/aw4FOsWr2FY373nKSxbpNi3fz4F.jpg",
//     genre_ids: [28, 12],
//     id: 353081,
//     original_language: "en",
//     original_title: "Mission: Impossible - Fallout",
//     overview:
//       "When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfill his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.",
//     popularity: 61.173,
//     poster_path: "/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
//     release_date: "2018-07-13",
//     title: "Mission: Impossible - Fallout",
//     video: false,
//     vote_average: 7.402,
//     vote_count: 7243,
//     character: "Ilsa Faust",
//     credit_id: "5823941c92514157e60000e1",
//     order: 4,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/7fN5rEBcRoylG3oZPZl1Qe6y7UV.jpg",
//     genre_ids: [28, 12, 53],
//     id: 575264,
//     original_language: "en",
//     original_title: "Mission: Impossible - Dead Reckoning Part One",
//     overview:
//       "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the fate of the world at stake, and dark forces from Ethan's past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan is forced to consider that nothing can matter more than his mission – not even the lives of those he cares about most.",
//     popularity: 145.304,
//     poster_path: "/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
//     release_date: "2023-07-08",
//     title: "Mission: Impossible - Dead Reckoning Part One",
//     video: false,
//     vote_average: 0,
//     vote_count: 0,
//     character: "Ilsa Faust",
//     credit_id: "5dfd8d03d1a893001285faaa",
//     order: 4,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [28, 12, 53],
//     id: 575265,
//     original_language: "en",
//     original_title: "Mission: Impossible - Dead Reckoning Part Two",
//     overview: "The eighth instalment of the Mission: Impossible franchise.",
//     popularity: 35.043,
//     poster_path: "/l2fgb4JU0uLpWTaMFrxPqfQ94Kr.jpg",
//     release_date: "2024-06-26",
//     title: "Mission: Impossible - Dead Reckoning Part Two",
//     video: false,
//     vote_average: 0,
//     vote_count: 0,
//     character: "Ilsa Faust",
//     credit_id: "62f5421e498bc2007c54284f",
//     order: 4,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/9jRv507vXUJxOfD7fXYQKYFLC7q.jpg",
//     genre_ids: [28, 12, 14, 10751],
//     id: 454294,
//     original_language: "en",
//     original_title: "The Kid Who Would Be King",
//     overview:
//       "Old-school magic meets the modern world when young Alex stumbles upon the mythical sword Excalibur. He soon unites his friends and enemies, and they become knights who join forces with the legendary wizard Merlin. Together, they must save mankind from the wicked enchantress Morgana and her army of supernatural warriors.",
//     popularity: 18.845,
//     poster_path: "/kBuvLX6zynQP0sjyqbXV4jNaZ4E.jpg",
//     release_date: "2019-01-16",
//     title: "The Kid Who Would Be King",
//     video: false,
//     vote_average: 6.111,
//     vote_count: 650,
//     character: "Morgana",
//     credit_id: "59e5ddfa925141024e008992",
//     order: 7,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/nl18gyzai02Tu99VkURu7kCFrR8.jpg",
//     genre_ids: [28, 12],
//     id: 184315,
//     original_language: "en",
//     original_title: "Hercules",
//     overview:
//       "Fourteen hundred years ago, a tormented soul walked the earth that was neither man nor god. Hercules was the powerful son of the god king Zeus, for this he received nothing but suffering his entire life. After twelve arduous labors and the loss of his family, this dark, world-weary soul turned his back on the gods finding his only solace in bloody battle. Over the years he warmed to the company of six similar souls, their only bond being their love of fighting and presence of death. These men and woman never question where they go to fight or why or whom, just how much they will be paid. Now the King of Thrace has hired these mercenaries to train his men to become the greatest army of all time. It is time for this bunch of lost souls to finally have their eyes opened to how far they have fallen when they must train an army to become as ruthless and blood thirsty as their reputation has become.",
//     popularity: 45.866,
//     poster_path: "/5X3VOy9lD44VclKsWTi8gHZGjhL.jpg",
//     release_date: "2014-07-23",
//     title: "Hercules",
//     video: false,
//     vote_average: 5.753,
//     vote_count: 3760,
//     character: "Ergenia",
//     credit_id: "52fe4cbd9251416c75124161",
//     order: 10,
//     media_type: "movie",
//   },
//   {
//     adult: false,
//     backdrop_path: "/kpACHAabhG6IyCpbafr81akDCTV.jpg",
//     genre_ids: [18],
//     id: 57092,
//     origin_country: ["GB"],
//     original_language: "en",
//     original_name: "The White Queen",
//     overview:
//       "Set against the backdrop of the Wars of the Roses, the series is the story of the women caught up in the protracted conflict for the throne of England.",
//     popularity: 18.117,
//     poster_path: "/8dB8lh4OeQZz0A3gDu5aKwm25kU.jpg",
//     first_air_date: "2013-06-16",
//     name: "The White Queen",
//     vote_average: 7.3,
//     vote_count: 274,
//     character: "Elizabeth Woodville",
//     credit_id: "5415ff16c3a3684d06002a6f",
//     episode_count: 10,
//     media_type: "tv",
//   },
//   {
//     adult: false,
//     backdrop_path: "/5dQh0KIUMOEp6zSgGevqpSusfka.jpg",
//     genre_ids: [10759, 18],
//     id: 61689,
//     origin_country: ["US"],
//     original_language: "en",
//     original_name: "The Red Tent",
//     overview:
//       "Her name is Dinah. In the Bible her life is only hinted at during a brief and violent detour within the more familiar chapters about her father, Jacob, and his dozen sons in the Book of Genesis. Told through Dinah's eloquent voice, this sweeping miniseries reveals the traditions and turmoil of ancient womanhood. Dinah's tale begins with the story of her mothers: Leah, Rachel, Zilpah, and Bilhah, the four wives of Jacob. They love Dinah and give her gifts that are to sustain her through a hard-working youth, a calling to midwifery, and a new home in a foreign land. Dinah tells us of the world of the red tent, the place where women were sequestered during their cycles of birthing, menses, and illness; of her initiations into the religious and sexual practices of her tribe; of Jacob's courtship with his four wives; of the mystery and wonder of caravans, farmers, shepherds, and slaves; of love and death in the city of Shechem; of her half-brother Joseph's rise in Egypt, and of course her marriage to Shechem and it's bloody consequences.",
//     popularity: 14.554,
//     poster_path: "/hSttE4mnZdmANv6snbK2RYncbbs.jpg",
//     first_air_date: "2014-12-07",
//     name: "The Red Tent",
//     vote_average: 7.1,
//     vote_count: 39,
//     character: "Dinah",
//     credit_id: "5487495492514128fa0001b9",
//     episode_count: 2,
//     media_type: "tv",
//   },
//   {
//     adult: false,
//     backdrop_path: "/6wX6105dCfRqTrwvoQgA8bGxUCo.jpg",
//     genre_ids: [35, 10767],
//     id: 1220,
//     origin_country: ["GB"],
//     original_language: "en",
//     original_name: "The Graham Norton Show",
//     overview:
//       "Each week celebrity guests join Irish comedian Graham Norton to discuss what's being going on around the world that week. The guests poke fun and share their opinions on the main news stories. Graham is often joined by a band or artist to play the show out.",
//     popularity: 85.514,
//     poster_path: "/vrbqaBXB8AALynQzpWz6JdCPEJS.jpg",
//     first_air_date: "2007-02-22",
//     name: "The Graham Norton Show",
//     vote_average: 7.1,
//     vote_count: 211,
//     character: "Self",
//     credit_id: "5a6ca72f925141075d0077db",
//     episode_count: 3,
//     media_type: "tv",
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [18],
//     id: 10812,
//     origin_country: ["US", "SE"],
//     original_language: "en",
//     original_name: "Ocean Ave.",
//     overview:
//       "Ocean Ave. was a Swedish-American low budget daytime soap opera, produced by the Swedish production company, Kajak, and filmed at the Florida based, Dolphin Entertainment. It was set and filmed in Miami, Florida between 2002 and 2003. The series was made for Swedish TV4 where it was moved from early prime time to middays due to bad ratings. No American or international network or channel picked up the series. The main cast included only five Swedish actors, two other Swedish actors were seen in minor roles. Dialogues were shot in both Swedish and English with hopes to sell the series internationally. One hundred thirty episodes were filmed but Swedish Television cut it into 260 episodes. Ocean Ave. received bad reviews from the start.",
//     popularity: 7.893,
//     poster_path: "/omD2bYcAhlkBNnSViBEEBcvO4On.jpg",
//     first_air_date: "2002-08-26",
//     name: "Ocean Ave.",
//     vote_average: 6,
//     vote_count: 1,
//     character: "Chrissy Eriksson",
//     credit_id: "5be75c3192514143f201ab91",
//     episode_count: 115,
//     media_type: "tv",
//   },
//   {
//     adult: false,
//     backdrop_path: "/lZbSA0xExNp6XabNa5Hqwab9th5.jpg",
//     genre_ids: [35, 10767],
//     id: 93660,
//     origin_country: ["US"],
//     original_language: "en",
//     original_name: "A Little Late with Lilly Singh",
//     overview:
//       'The comedian, actress, social media sensation, producer and author of "How to Be a Bawse: A Guide to Conquering Life," Lilly Singh brings her unique perspective to late night as she hosts celebrity interviews, talks current events, performs musical and sketch comedy, plays games, and more.',
//     popularity: 13.114,
//     poster_path: "/1o8OOaHP4JTKCSDDgsBrkRZVA1O.jpg",
//     first_air_date: "2019-09-16",
//     name: "A Little Late with Lilly Singh",
//     vote_average: 4.3,
//     vote_count: 27,
//     character: "Self",
//     credit_id: "6093286ec669ad00570e8d89",
//     episode_count: 1,
//     media_type: "tv",
//   },
//   {
//     adult: false,
//     backdrop_path: "/1V4SPkV3bQvl85zK4FqwTzdfBs4.jpg",
//     genre_ids: [10765, 18],
//     id: 125988,
//     origin_country: ["US", "GB"],
//     original_language: "en",
//     original_name: "Silo",
//     overview:
//       "In a ruined and toxic future, a community exists in a giant underground silo that plunges hundreds of stories deep. There, men and women live in a society full of regulations they believe are meant to protect them.",
//     popularity: 1134.675,
//     poster_path: "/zBx1X06G1OlndbXTCZI13FECNz2.jpg",
//     first_air_date: "2023-05-04",
//     name: "Silo",
//     vote_average: 8.281,
//     vote_count: 247,
//     character: "Juliette Nichols",
//     credit_id: "60a69f694b0c630078d2bdb3",
//     episode_count: 10,
//     media_type: "tv",
//   },
//   {
//     adult: false,
//     backdrop_path: "/3Jp0J9MnIrmC20ZkcS2bXIYkKYv.jpg",
//     genre_ids: [10767, 35],
//     id: 40302,
//     origin_country: ["GB"],
//     original_language: "en",
//     original_name: "The Jonathan Ross Show",
//     overview:
//       "The Jonathan Ross Show is a British chat show presented by Jonathan Ross. It was first broadcast on ITV on 3 September 2011 and currently airs on Saturday evenings following the conclusion of Ross' BBC One chat show, Friday Night with Jonathan Ross, in July 2010.",
//     popularity: 13.995,
//     poster_path: "/kVdXrrqVlNdqdzmQcnc3yeYqUkH.jpg",
//     first_air_date: "2011-09-03",
//     name: "The Jonathan Ross Show",
//     vote_average: 5.1,
//     vote_count: 16,
//     character: "Self",
//     credit_id: "60d042a70f1e58005e7f1432",
//     episode_count: 1,
//     media_type: "tv",
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [80],
//     id: 41261,
//     origin_country: ["DE", "SE"],
//     original_language: "de",
//     original_name: "Der Kommissar und das Meer",
//     overview: "Der Kommissar und das Meer is a German television series.",
//     popularity: 8.202,
//     poster_path: "/mswreh4dHv6Jbp92jkb5Kgls38G.jpg",
//     first_air_date: "2007-12-21",
//     name: "Der Kommissar und das Meer",
//     vote_average: 7.3,
//     vote_count: 6,
//     character: "Jasmine Larsson",
//     credit_id: "6132bce42cde980062d14ff7",
//     episode_count: 1,
//     media_type: "tv",
//   },
//   {
//     adult: false,
//     backdrop_path: "/gMMnf8VRg3Z98WaFmOLr9Jk8pIs.jpg",
//     genre_ids: [35, 10767],
//     id: 63770,
//     origin_country: ["US"],
//     original_language: "en",
//     original_name: "The Late Show with Stephen Colbert",
//     overview:
//       "Stephen Colbert brings his signature satire and comedy to The Late Show with Stephen Colbert, the #1 show in late night, where he talks with an eclectic mix of guests about what is new and relevant in the worlds of politics, entertainment, business, music, technology, and more. Featuring bandleader Jon Batiste with his band Stay Human, the Emmy Award-nominated show is broadcast from the historic Ed Sullivan Theater. Stephen Colbert, Chris Licht, Tom Purcell, and Jon Stewart are executive producers. Barry Julien and Denise Rehrig serve as co-executive producers.",
//     popularity: 69.714,
//     poster_path: "/9jkThAGYj2yp8jsS6Nriy5mzKFT.jpg",
//     first_air_date: "2015-09-08",
//     name: "The Late Show with Stephen Colbert",
//     vote_average: 6.5,
//     vote_count: 194,
//     character: "Self - Guest",
//     credit_id: "615c1092d144430088caff8f",
//     episode_count: 1,
//     media_type: "tv",
//   },
//   {
//     adult: false,
//     backdrop_path: "/5AkPhazx8F0Ht74CUdJU03vNzBi.jpg",
//     genre_ids: [10767],
//     id: 61818,
//     origin_country: ["US"],
//     original_language: "en",
//     original_name: "Late Night with Seth Meyers",
//     overview:
//       'Seth Meyers, who is "Saturday Night Live’s" longest serving anchor on the show’s wildly popular "Weekend Update," takes over as host of NBC’s "Late Night" — home to A-list celebrity guests, memorable comedy and the best in musical talent. As the Emmy Award-winning head writer for "SNL," Meyers has established a reputation for sharp wit and perfectly timed comedy, and has gained fame for his spot-on jokes and satire. Meyers takes his departure from "SNL" to his new post at "Late Night," as Jimmy Fallon moves to "The Tonight Show".',
//     popularity: 69.646,
//     poster_path: "/x5asOuPOjW21e0Ykkvkuzu1TGEl.jpg",
//     first_air_date: "2014-02-25",
//     name: "Late Night with Seth Meyers",
//     vote_average: 5.4,
//     vote_count: 50,
//     character: "Self",
//     credit_id: "619b2d9f9512e1002a074913",
//     episode_count: 1,
//     media_type: "tv",
//   },
//   {
//     adult: false,
//     backdrop_path: "/jK87TA68Yq267mxxwVPKI0YaVQT.jpg",
//     genre_ids: [99],
//     id: 226477,
//     origin_country: ["GB"],
//     original_language: "en",
//     original_name: "Wild Scandinavia",
//     overview:
//       "Witness the epic nature of Wild Scandinavia: orca, puffins and eagles rule the fjords; wolves and lynx patrol magical forests; polar bears and musk ox survive arctic extremes. Basejumpers and reindeer herders also embrace the wilderness.",
//     popularity: 1.488,
//     poster_path: "/c2ZBsGvJhj7HJTuCQWu8AxE8MfM.jpg",
//     first_air_date: "2023-03-30",
//     name: "Wild Scandinavia",
//     vote_average: 0,
//     vote_count: 0,
//     character: "Narrator",
//     credit_id: "647d99a017497300c13357e0",
//     episode_count: 3,
//     media_type: "tv",
//   },
// ];

const PersonPage = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const person = useAppSelector(
    (state) => state.collection.person.personDetails
  );
  const combinedCredits = useAppSelector(
    (state) => state.collection.person.combinedCredits
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (person) {
      fetchCombinedCredits(person.id, dispatch);
    }
  }, [person]);

  const getAge = (birthDate: string | undefined) => {
    if (birthDate) {
      return Math.floor(
        (new Date().valueOf() - new Date(birthDate).getTime()) / 3.15576e10
      );
    }
  };

  const styleHeight = !expand ? { maxHeight: "200px" } : { maxHeight: "100%" };

  return (
    <div className="person-details-container">
      <div>
        <h1>{person?.name}</h1>
        <div className="known-for d-flex">
          <p className="dash">Known For </p>
          <p>{person?.known_for_department}</p>
        </div>
      </div>
      <section className="personal-info">
        <figure className="personal-image-container">
          <img
            className="main-photo"
            src={
              person?.profile_path
                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                : noImage
            }
            alt={person?.name}
          />
        </figure>
        <div className="personal-details">
          <div className="biography">
            <h2>Biography</h2>
            <div id="see-more">
              <p style={styleHeight}>{person?.biography}</p>
              <span onClick={() => setExpand((prev) => !prev)}>
                ... {!expand ? "See more" : "See less"}
              </span>
            </div>
          </div>

          <div className="birthday">
            <h3>Birthday</h3>
            <p>
              {person?.birthday} ({getAge(person?.birthday)} years old)
            </p>
          </div>
          <div className="place-of-birth">
            <h3>Place of Birth</h3>
            <p>{person?.place_of_birth}</p>
          </div>
          <div className="known-as">
            <h3>Also Known As</h3>
            {person?.also_known_as.map((name: string, index) => (
              <p key={index}>
                {name} <br />
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="known-for-section">
        <h2 className="section-heading">Known For</h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          spaceBetween={50}
          slidesPerView={6}
          autoplay
        >
          {combinedCredits?.map((credit, index) => {
            if (credit.vote_average > 6) {
              return (
                <SwiperSlide key={index}>
                  <Movie movie={credit} overview={false} key={index} />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </section>
    </div>
  );
};

export default PersonPage;
