import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { getCinemaMovies } from "../../store/actions/movie-actions";

import MovieList from "./components/MovieList/MovieList";

import classes from "./Cinema.module.css";

const Cinema = () => {
  const { cinemaMovies } = useSelector((store) => store.movies);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const { cinemaId } = useParams();

  useEffect(() => {
    dispatch(getCinemaMovies(cinemaId, date));
  }, [cinemaId, date]);

  return (
    <div className={classes["cinema-page"]}>
      <input
        className={classes["date-selector"]}
        type="date"
        value={date.toISOString().slice(0, 10)}
        // min={new Date().toISOString().slice(0, 10)}
        onChange={(e) => setDate(new Date(e.target.value))}
      />
      <MovieList movies={cinemaMovies} startDate={date} />
    </div>
  );
};

export default Cinema;
