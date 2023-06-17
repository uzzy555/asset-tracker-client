import { createSlice } from "@reduxjs/toolkit";
import { getAllDistributors } from "./distributors.actions";

const initialState = {
  areDistributorsLoading: false,
  areDistributorsLoaded: false,
  areDistributorsLoadingFailed: false,
  allDistributors: [],
};

const Distributors = createSlice({
  name: "Distributors",
  initialState,
  extraReducers: {
    [getAllDistributors.pending]: (state) => {
      state.areDistributorsLoading = true;
    },
    [getAllDistributors.fulfilled]: (state, action) => {
      state.areDistributorsLoading = false;
      state.allDistributors = action.payload.result;
      state.areDistributorsLoaded = true;
    },
    [getAllDistributors.rejected]: (state) => {
      state.areDistributorsLoading = false;
      state.areDistributorsLoadingFailed = true;
    },
  },
});

export default Distributors.reducer;
