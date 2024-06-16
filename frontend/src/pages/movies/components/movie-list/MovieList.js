import MovieListItem from "./MovieListItem";

import classes from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return (
    <ul className={classes["movie-list"]}>
      {movies.map((movie) => (
        <MovieListItem movie={movie} key={movie.movie_id} />
      ))}
    </ul>
  );
};

export default MovieList;
