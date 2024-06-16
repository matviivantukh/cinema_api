import { createSlice } from "@reduxjs/toolkit";

const cinemaSlice = createSlice({
  name: "cinema",
  initialState: {
    cinemas: [],
  },
  reducers: {
    getAllCinemas(state, action) {
      state.cinemas = action.payload.cinemas;
    },
  },
});

export const cinemaActions = cinemaSlice.actions;
export const cinemaReducer = cinemaSlice.reducer;
