import { directorActions } from "../slices/director";

const getAllDirectors = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/directors`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(directorActions.getAllDirectors(responseData));
    }
  };
};

export { getAllDirectors };
