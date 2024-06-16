import { createSlice } from "@reduxjs/toolkit";

const viewerSlice = createSlice({
  name: "viewer",
  initialState: {
    viewers: [],
    pagesCount: null,
  },
  reducers: {
    getAllViewers(state, action) {
      state.viewers = action.payload.viewers;
      state.pagesCount = action.payload.pagesCount;
    },
  },
});

export const viewerActions = viewerSlice.actions;
export const viewerReducer = viewerSlice.reducer;
