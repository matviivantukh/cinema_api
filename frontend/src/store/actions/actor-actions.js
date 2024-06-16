import { actorActions } from "../slices/actor";

const getAllActors = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/actors`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(actorActions.getAllActors(responseData));
    }
  };
};

export { getAllActors };
