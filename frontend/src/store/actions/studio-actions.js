import { studioActions } from "../slices/studio";

const getAllStudios = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/studios`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(studioActions.getAllStudios(responseData));
    }
  };
};

export { getAllStudios };
