import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    languages: [],
  },
  reducers: {
    getAllLanguages(state, action) {
      state.languages = action.payload.languages;
    },
  },
});

export const languageActions = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
