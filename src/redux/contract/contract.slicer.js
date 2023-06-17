import { createSlice } from "@reduxjs/toolkit";
import { initializeContracts } from "./contract.actions";

const initialState = {
  isContractInitialized: false,
  assetTrackerInstance: null,
};

const contractSlicer = createSlice({
  name: "contract-slicer",
  initialState,
  extraReducers: {
    [initializeContracts.fulfilled]: (state, action) => {
      state.isContractInitialized = true;
      state.assetTrackerInstance = action.payload.assetTrackerInstance;
    },
  },
});

export default contractSlicer.reducer;
