import { createAsyncThunk } from "@reduxjs/toolkit";
import { DistributorSignUpApi, loginApi, ManufacturerSignUpApi } from "./api";

export const DistributorSignUp = createAsyncThunk(
  "auth/distributorsignup",
  async (payload) => {
    const res = await DistributorSignUpApi(payload);
    return res.data;
  }
);
export const ManufactureSignUp = createAsyncThunk(
  "auth/signup",
  async (payload) => {
    const res = await ManufacturerSignUpApi(payload);
    return res.data;
  }
);
export const userLogin = createAsyncThunk("auth/userLogin", async (payload) => {
  const res = await loginApi(payload);
  return res.data;
});
export const logout = createAsyncThunk(
  "wallet/disconnectWallet",
  async (_, { getState }) => {
    const { web3Modal } = getState().Web3Instance;
    return await web3Modal.clearCachedProvider();
  }
);
