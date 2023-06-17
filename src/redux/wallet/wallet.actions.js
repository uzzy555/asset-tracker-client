import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin } from "../auth/auth.actions";
import { ACCEPTED_CHAIN_IDs } from "../web3/constants";

export const connectWallet = createAsyncThunk(
  "wallet/connect-wallet",
  async (_, { dispatch, getState }) => {
    const { Web3, web3Modal } = getState().Web3Instance;

    const provider = await web3Modal.connect();

    const web3Instance = new Web3(provider);

    const accounts = await web3Instance.eth.getAccounts();
    const connectedWallet = accounts[0];

    const {
      error,
      meta: { requestStatus },
    } = await dispatch(userLogin({ wallet_address: connectedWallet }));

    if (requestStatus === "rejected") throw new Error(error && error.message);

    return {
      web3Instance,
      provider,
      connectedWallet,
    };
  }
);

export const getNetworkInfo = createAsyncThunk(
  "wallet/getNetworkInfo",
  async (_, { getState }) => {
    const { provider } = getState().Web3Instance;

    if (!provider) return;

    const chainId = await provider.request({ method: "eth_chainId" });

    let isCorrectNetwork = false;

    if (ACCEPTED_CHAIN_IDs.includes(chainId)) isCorrectNetwork = true;

    return {
      connectedChainId: chainId,
      isCorrectNetwork,
    };
  }
);

export const disconnectWallet = createAsyncThunk(
  "wallet/disconnectWallet",
  async (_, { getState }) => {
    const { web3Modal } = getState().Web3Instance;
    return await web3Modal.clearCachedProvider();
  }
);
