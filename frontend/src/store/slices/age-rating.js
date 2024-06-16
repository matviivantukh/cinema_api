import { createSlice } from "@reduxjs/toolkit";

const ageRatingSlice = createSlice({
  name: "ageRating",
  initialState: {
    ageRatings: [],
  },
  reducers: {
    getAllAgeRatings(state, action) {
      state.ageRatings = action.payload.ageRatings;
    },
  },
});

export const ageRatingActions = ageRatingSlice.actions;
export const ageRatingReducer = ageRatingSlice.reducer;
