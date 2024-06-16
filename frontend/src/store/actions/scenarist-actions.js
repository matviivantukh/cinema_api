import { scenaristActions } from "../slices/scenarist";

const getAllScenarists = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/scenarists`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(scenaristActions.getAllScenarists(responseData));
    }
  };
};

export { getAllScenarists };
