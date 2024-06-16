import MovieListItem from "./MovieListItem";

import classes from "./MovieList.module.css";

const MovieList = ({ movies, startDate }) => {
  return (
    <ul className={classes["movie-list"]}>
      {movies.map((movie) => (
        <MovieListItem movie={movie} startDate={startDate} />
      ))}
    </ul>
  );
};

export default MovieList;
