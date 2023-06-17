import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";
import {
  connectWallet,
  disconnectWallet,
  getNetworkInfo,
} from "./wallet.actions";

const initialState = {
  connectedWallet: null,
  isWalletConnected: false,
  isWalletConnecting: false,

  // wallet chain info

  connectedChainId: null,
  isCorrectNetwork: false,
  isChainInfoLoading: false,
  isChainInfoLoaded: false,
  isChainInfoLoadingFailed: false,
};

const walletSlicer = createSlice({
  name: "wallet-slicer",

  initialState,
  reducers,
  extraReducers: {
    [connectWallet.pending]: (state) => {
      state.isWalletConnecting = true;
      state.isWalletConnected = false;
    },
    [connectWallet.fulfilled]: (state, action) => {
      state.isWalletConnecting = false;

      state.connectedWallet = action.payload.connectedWallet;
      state.isWalletConnected = true;
    },
    [connectWallet.rejected]: (state) => {
      state.isWalletConnecting = false;
    },

    // network info handling
    [getNetworkInfo.pending]: (state, action) => {
      state.isChainInfoLoading = true;
      state.isChainInfoLoaded = false;
    },
    [getNetworkInfo.fulfilled]: (state, action) => {
      state.connectedChainId = action.payload.connectedChainId;
      state.isCorrectNetwork = action.payload.isCorrectNetwork;
      state.isChainInfoLoading = false;
      state.isChainInfoLoaded = true;
    },
    [getNetworkInfo.rejected]: (state, action) => {
      state.isChainInfoLoading = false;
      state.isChainInfoLoadingFailed = true;
    },

    [disconnectWallet.fulfilled]: (state, action) => {
      state.connectedWallet = null;
      state.isWalletConnected = false;
    },
  },
});

export default walletSlicer.reducer;

export const { updateNetworkInfo } = walletSlicer.actions;
