import { sessionActions } from "../slices/sessions";

const getCinemaMovieSessions = (cinemaId, movieId, startDate) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://localhost:8080/movies/${movieId}/cinemas/${cinemaId}/sessions?startDate=${startDate}`
    );
    const data = await response.json();
    dispatch(sessionActions.getSessions(data));
  };
};

export { getCinemaMovieSessions };
