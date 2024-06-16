import { createSlice } from "@reduxjs/toolkit";

const actorSlice = createSlice({
  name: "actor",
  initialState: {
    actors: [],
  },
  reducers: {
    getAllActors(state, action) {
      state.actors = action.payload.actors;
    },
  },
});

export const actorActions = actorSlice.actions;
export const actorReducer = actorSlice.reducer;
