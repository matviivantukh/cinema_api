import { createSlice } from "@reduxjs/toolkit";

const sessionSeatSlice = createSlice({
  name: "session seat",
  initialState: {
    sessionSeats: [],
  },
  reducers: {
    getAllSessionSeats(state, action) {
      state.sessionSeats = action.payload.sessionSeats;
    },
  },
});

export const sessionSeatActions = sessionSeatSlice.actions;
export const sessionSeatReducer = sessionSeatSlice.reducer;
