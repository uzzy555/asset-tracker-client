import { createAsyncThunk } from "@reduxjs/toolkit";
import { inviteDistributorsApi } from "./apis";
import { getPolygonTxFees } from "../../utils/getPolygonTxFees";

export const getAllDistributors = createAsyncThunk(
  "distributors/getAllDistributors",
  async (_, { dispatch, getState }) => {
    const { assetTrackerInstance } = getState().Contract;
    try {
      return await new Promise(async (resolve, reject) => {
        assetTrackerInstance.methods
          .getAlldistributors()
          .call((error, result) => {
            resolve({ result });
            return result;
          })
          .on("error", reject);
      });
    } catch (error) {
      throw error;
    }
  }
);
export const inviteDistributors = createAsyncThunk(
  "distributors/inviteDistributors",
  async (payload, { getState }) => {
    const { assetTrackerInstance } = getState().Contract;
    const { connectedWallet, connectedChainId } = getState().Wallet;
    const { name, address, email, phone, setTxInfo, ...apiPayload } = payload;

    try {
      setTxInfo({
        txStatus: "PENDING",
        txMessage: "Distributor is being added. Sign metamask transaction",
      });
      return await new Promise(async (resolve, reject) => {
        const { maxFeePerGas, maxPriorityFeePerGas } = await getPolygonTxFees(
          connectedChainId
        );

        const gasLimit = await assetTrackerInstance.methods
          .insertDistributor(name, address, email, phone)
          .estimateGas({
            from: connectedWallet,
            maxFeePerGas,
            maxPriorityFeePerGas,
          });

        assetTrackerInstance.methods
          .insertDistributor(name, address, email, phone)
          .send({
            from: connectedWallet,
            maxFeePerGas,
            maxPriorityFeePerGas,
            gasLimit: gasLimit.toString(),
          })
          .once("transactionHash", (txHash) => {
            setTxInfo({
              txStatus: "PENDING",
              txMessage: "Please wait for transaction to finish...",
              txHash,
            });
          })
          .once("receipt", async (receipt) => {
            await inviteDistributorsApi(apiPayload);
            setTxInfo({
              txStatus: "SUCCESS",
              txMessage: "Distributor successfully added",
            });
            resolve({ receipt });
          })
          .on("error", reject);
      });
    } catch (error) {
      setTxInfo({
        txStatus: "REJECTED",
        txMessage: "Transaction rejected",
      });
      throw error;
    }
  }
);
