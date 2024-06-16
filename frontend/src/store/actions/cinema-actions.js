import { cinemaActions } from "../slices/cinema";

const getAllCinemas = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/cinemas`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(cinemaActions.getAllCinemas(responseData));
    }
  };
};

export { getAllCinemas };
