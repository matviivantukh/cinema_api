import { countryActions } from "../slices/country";

const getAllCountries = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/countries`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(countryActions.getAllCountries(responseData));
    }
  };
};

export { getAllCountries };
