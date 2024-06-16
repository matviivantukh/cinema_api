import { createSlice } from "@reduxjs/toolkit";

const countrySlice = createSlice({
  name: "country",
  initialState: {
    countries: [],
  },
  reducers: {
    getAllCountries(state, action) {
      state.countries = action.payload.countries;
    },
  },
});

export const countryActions = countrySlice.actions;
export const countryReducer = countrySlice.reducer;
