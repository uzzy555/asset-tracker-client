import { createSlice } from "@reduxjs/toolkit";
import { connectWallet } from "../wallet/wallet.actions";
import { initializeWeb3Packages } from "./web3.actions";

const initialState = {
  web3PackagesLoaded: false,
  Web3: null,
  web3Modal: null,
  provider: null,
};

const web3Slicer = createSlice({
  name: "web3-slicer",

  initialState,
  extraReducers: {
    [initializeWeb3Packages.pending]: (state, action) => {
      state.web3PackagesLoaded = false;
    },
    [initializeWeb3Packages.fulfilled]: (state, action) => {
      state.web3PackagesLoaded = true;
      state.Web3 = action.payload.Web3;
      state.web3Modal = action.payload.web3Modal;
    },

    [connectWallet.fulfilled]: (state, action) => {
      state.provider = action.payload.provider;
      state.web3Instance = action.payload.web3Instance;
    },
  },
});

export default web3Slicer.reducer;
