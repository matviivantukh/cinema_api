import { createSlice } from "@reduxjs/toolkit";

const screeningFormatSlice = createSlice({
  name: "screeningFormat",
  initialState: {
    screeningFormats: [],
  },
  reducers: {
    getAllScreeningFormats(state, action) {
      state.screeningFormats = action.payload.screeningFormats;
    },
  },
});

export const screeningFormatActions = screeningFormatSlice.actions;
export const screeningFormatReducer = screeningFormatSlice.reducer;
