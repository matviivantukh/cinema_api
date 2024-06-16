import { createSlice } from "@reduxjs/toolkit";

const studioSlice = createSlice({
  name: "studio",
  initialState: {
    studios: [],
  },
  reducers: {
    getAllStudios(state, action) {
      state.studios = action.payload.studios;
    },
  },
});

export const studioActions = studioSlice.actions;
export const studioReducer = studioSlice.reducer;
