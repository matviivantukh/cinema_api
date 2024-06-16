import { distributorActions } from "../slices/distributor";

const getAllDistributors = () => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8080/distributors`);

    if (response.ok) {
      const responseData = await response.json();

      dispatch(distributorActions.getAllDistributors(responseData));
    }
  };
};

export { getAllDistributors };
