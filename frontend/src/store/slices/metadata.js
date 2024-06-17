import { createSlice } from "@reduxjs/toolkit";

const metadataSlice = createSlice({
  name: "metadata",
  initialState: {
    oltpMetadatas: [],
    olapMetadataFacts: [],
    olapMetadataDimensions: [],
    dataLoadHistory: [],
  },
  reducers: {
    getOltpMetadatas(state, action) {
      state.oltpMetadatas = action.payload.metadatas;
    },
    getOlapMetadataFacts(state, action) {
      state.olapMetadataFacts = action.payload.metadatas;
    },
    getOlapMetadataDimensions(state, action) {
      state.olapMetadataDimensions = action.payload.metadatas;
    },
    getDataLoadHistory(state, action) {
      state.dataLoadHistory = action.payload.metadatas;
    },
  },
});

export const metadataActions = metadataSlice.actions;
export const metadataReducer = metadataSlice.reducer;
