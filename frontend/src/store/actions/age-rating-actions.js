import { ageRatingActions } from "../slices/age-rating";

const getAllAgeRatings = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/age-ratings`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(ageRatingActions.getAllAgeRatings(responseData));
    }
  };
};

export { getAllAgeRatings };
