import { movieActions } from "../slices/movie";

const getAllMovies = (page = 1, filters = "{}", search = "") => {
  return async (dispatch) => {
    const response = await fetch(
      `http://localhost:8080/movies?page=${page}&filters=${filters}&search=${search}`
    );

    if (response.ok) {
      const responseData = await response.json();

      dispatch(movieActions.getAllMovies(responseData));
    }
  };
};

const getOneMovie = (movieId) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/movies/${movieId}`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(movieActions.getOneMovie(responseData));
    }
  };
};

const getCinemaMovies = (cinemaId, startDate) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://localhost:8080/movies/cinemas/${cinemaId}?startDate=${startDate
        .toISOString()
        .slice(0, 10)}`
    );

    if (response.ok) {
      const responseData = await response.json();

      dispatch(movieActions.getCinemaMovies(responseData));
    }
  };
};

const deleteMovie = (movieId) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/movies/${movieId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(movieActions.deleteMovie({ movieId }));
    }
  };
};

const createMovie = (movie) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:8080/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    if (response.ok) {
      const responseData = await response.json();

      dispatch(movieActions.createMovie(responseData));
      return dispatch(movieActions.getOneMovie(responseData));
    }
  };
};

export { getAllMovies, getOneMovie, getCinemaMovies, deleteMovie, createMovie };
