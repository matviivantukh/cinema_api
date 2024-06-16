import { viewerActions } from "../slices/viewer";

const getAllViewers = (page = 1, search = "") => {
  return async (dispatch) => {
    const response = await fetch(
      `http://localhost:8080/viewers?page=${page}&search=${search}&pageSize=20`
    );

    if (response.ok) {
      const responseData = await response.json();

      dispatch(viewerActions.getAllViewers(responseData));
    }
  };
};

export { getAllViewers };
