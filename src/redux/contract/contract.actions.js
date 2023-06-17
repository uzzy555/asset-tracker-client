import { createAsyncThunk } from "@reduxjs/toolkit";
import { chainIdToNetworkInfo } from "../web3/constants";
import { getContractInstances } from "./constants";

export const initializeContracts = createAsyncThunk(
  "contract/initializeContracts",
  async (_, { getState }) => {
    try {
      const {
        Web3Instance: { web3Instance },
        Wallet: { connectedChainId },
      } = getState();

      const {
        contracts: { assetTrackerAddress },
      } = chainIdToNetworkInfo[connectedChainId];
      return getContractInstances({
        web3Instance: web3Instance,
        assetTrackerAddress,
      });
    } catch (error) {
      console.log(error);
    }
  }
);
