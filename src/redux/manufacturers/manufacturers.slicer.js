import { createSlice } from "@reduxjs/toolkit";
import { getAllManufacturers } from "./manufacturers.actions";

const initialState = {
  areManufacturersLoading: false,
  areManufacturersLoaded: false,
  areManufacturersLoadingFailed: false,
  allManufacturers: [],
};

const Manufacturers = createSlice({
  name: "Manufacturers",
  initialState,
  extraReducers: {
    [getAllManufacturers.pending]: (state, action) => {
      state.areManufacturersLoading = true;
    },
    [getAllManufacturers.fulfilled]: (state, action) => {
      state.areManufacturersLoading = false;
      state.allManufacturers = action.payload;
      state.areManufacturersLoaded = true;
    },
    [getAllManufacturers.rejected]: (state, action) => {
      state.areManufacturersLoading = false;
      state.areManufacturersLoadingFailed = true;
    },
  },
});

export default Manufacturers.reducer;
