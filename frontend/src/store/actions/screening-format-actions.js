import { screeningFormatActions } from "../slices/screening-format";

const getAllScreeningFormats = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/screening-formats`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(screeningFormatActions.getAllScreeningFormats(responseData));
    }
  };
};

export { getAllScreeningFormats };
