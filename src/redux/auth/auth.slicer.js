import { createSlice } from "@reduxjs/toolkit";
import {
  DistributorSignUp,
  userLogin,
  ManufactureSignUp,
  logout,
} from "./auth.actions";
const initialState = {
  isDistributorSignedUp: false,
  isDistributorSignedUpLoading: false,
  isDistributorSignedUpLoadingFailed: false,
  distributorSignUpData: {},

  isManufacturerSignedUpLoading: false,
  isManufacturerSignedUpLoadingFailed: false,
  isManufacturerSignedUp: false,
  manufacturerSignUpData: {},

  isUserLoggedInLoading: false,
  isUserLoggedInLoadingFailed: false,
  isUserLoggedIn: false,
  UserLoggedInData: {
    userInfo: {
      name: "",
      organization_name: "",
      wallet_address: "",
      email: "",
      org_code: "",
      role: "",
    },
  },
};

const Auth = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [ManufactureSignUp.pending]: (state, action) => {
      state.isManufacturerSignedUpLoading = true;
    },
    [ManufactureSignUp.fulfilled]: (state, action) => {
      state.isManufacturerSignedUpLoading = false;
      state.manufacturerSignUpData = action.payload;
    },
    [ManufactureSignUp.rejected]: (state, action) => {
      state.isManufacturerSignedUpLoading = false;
      state.isManufacturerSignedUpLoadingFailed = true;
    },
    /////////////////////
    [userLogin.pending]: (state, action) => {
      state.isUserLoggedInLoading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.isUserLoggedIn = true;
      state.isUserLoggedInLoading = false;
      state.UserLoggedInData.userInfo = action.payload.userInfo;
    },
    [userLogin.rejected]: (state, action) => {
      state.isUserLoggedInLoading = false;
      state.isUserLoggedInLoadingFailed = true;
    },
    /////////////
    [DistributorSignUp.pending]: (state, action) => {
      state.isDistributorSignedUpLoading = true;
    },
    [DistributorSignUp.fulfilled]: (state, action) => {
      state.isDistributorSignedUp = true;
      state.isDistributorSignedUpLoading = false;
      state.distributorSignUpData = action.payload;
    },
    [DistributorSignUp.rejected]: (state, action) => {
      state.isDistributorSignedUpLoading = false;
      state.isDistributorSignedUpLoadingFailed = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.isUserLoggedIn = false;
      state.isUserLoggedInLoading = false;
      state.UserLoggedInData = {
        userInfo: {
          name: "",
          organization_name: "",
          wallet_address: "",
          email: "",
          org_code: "",
          role: "",
        },
      };
      state.isUserLoggedInLoadingFailed = false;
    },
  },
});
export default Auth.reducer;
