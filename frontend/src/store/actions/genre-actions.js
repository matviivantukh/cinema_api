import { genreActions } from "../slices/genre";

const getAllGenres = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/genres`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(genreActions.getAllGenres(responseData));
    }
  };
};

export { getAllGenres };
