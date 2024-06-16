import { createSlice } from "@reduxjs/toolkit";

const scenaristSlice = createSlice({
  name: "scenarist",
  initialState: {
    scenarists: [],
  },
  reducers: {
    getAllScenarists(state, action) {
      state.scenarists = action.payload.scenarists;
    },
  },
});

export const scenaristActions = scenaristSlice.actions;
export const scenaristReducer = scenaristSlice.reducer;
