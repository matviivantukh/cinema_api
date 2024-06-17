import { analyticActions } from "../slices/analytic";

const getAnalytics = (filters) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://localhost:8080/analytics?filters=${JSON.stringify(filters)}`
    );

    if (response.ok) {
      const responseData = await response.json();

      dispatch(analyticActions.getAnalyticResults(responseData));
    }
  };
};

export { getAnalytics };
