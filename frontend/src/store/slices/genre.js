import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genres: [],
  },
  reducers: {
    getAllGenres(state, action) {
      state.genres = action.payload.genres;
    },
  },
});

export const genreActions = genreSlice.actions;
export const genreReducer = genreSlice.reducer;
