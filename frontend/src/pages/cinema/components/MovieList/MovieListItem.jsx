import classes from "./MovieListItem.module.css";

import moviePoster from "../../../../images/movie_poster_placeholder.jpg";
import { Link, useParams } from "react-router-dom";

const MovieListItem = ({ movie, startDate }) => {
  const { cinemaId } = useParams();

  return (
    <li>
      <Link
        className={classes["movie"]}
        to={`/cinemas/${cinemaId}/movies/${
          movie.movie_id
        }/sessions?startDate=${startDate.toISOString().slice(0, 10)}`}
      >
        <img
          className={classes["movie-poster"]}
          src={moviePoster}
          alt={movie.name}
        />
        <div className={classes["movie-content"]}>
          <h3>{movie.name}</h3>
        </div>
      </Link>
    </li>
  );
};

export default MovieListItem;
