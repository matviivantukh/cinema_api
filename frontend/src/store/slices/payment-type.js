import { createSlice } from "@reduxjs/toolkit";

const paymentTypeSlice = createSlice({
  name: "payment type",
  initialState: {
    paymentTypes: [],
  },
  reducers: {
    getAllPaymentTypes(state, action) {
      state.paymentTypes = action.payload.paymentTypes;
    },
  },
});

export const paymentTypeActions = paymentTypeSlice.actions;
export const paymentTypeReducer = paymentTypeSlice.reducer;
