import { createSlice } from "@reduxjs/toolkit";

const analyticSlice = createSlice({
  name: "analytic",
  initialState: {
    analyticResults: [],
  },
  reducers: {
    getAnalyticResults(state, action) {
      state.analyticResults = action.payload.analyticResults;
    },
  },
});

export const analyticActions = analyticSlice.actions;
export const analyticReducer = analyticSlice.reducer;
