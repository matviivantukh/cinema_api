import { movieActions } from "../slices/movie";

const createMovieLicense = (license) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://localhost:8080/movie-license-contracts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(license),
      }
    );

    if (response.ok) {
      const responseData = await response.json();

      dispatch(movieActions.addMovieLicense(responseData));
    }
  };
};

export { createMovieLicense };
