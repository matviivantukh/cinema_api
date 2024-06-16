import { createSlice } from "@reduxjs/toolkit";

const distributorSlice = createSlice({
  name: "distributor",
  initialState: {
    distributors: [],
  },
  reducers: {
    getAllDistributors(state, action) {
      state.distributors = action.payload.distributors;
    },
  },
});

export const distributorActions = distributorSlice.actions;
export const distributorReducer = distributorSlice.reducer;
