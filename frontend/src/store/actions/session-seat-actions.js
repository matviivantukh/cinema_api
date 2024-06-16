import { sessionSeatActions } from "../slices/session-seat";

const getAllSessionSeats = (sessionId) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://localhost:8080/sessions/${sessionId}/seats`
    );
    if (response.ok) {
      const responseData = await response.json();

      dispatch(sessionSeatActions.getAllSessionSeats(responseData));
    }
  };
};

export { getAllSessionSeats };
