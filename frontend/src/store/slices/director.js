import { createSlice } from "@reduxjs/toolkit";

const directorSlice = createSlice({
  name: "director",
  initialState: {
    directors: [],
  },
  reducers: {
    getAllDirectors(state, action) {
      state.directors = action.payload.directors;
    },
  },
});

export const directorActions = directorSlice.actions;
export const directorReducer = directorSlice.reducer;
