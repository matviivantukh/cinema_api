import { languageActions } from "../slices/language";

const getAllLanguages = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/languages`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(languageActions.getAllLanguages(responseData));
    }
  };
};

export { getAllLanguages };
