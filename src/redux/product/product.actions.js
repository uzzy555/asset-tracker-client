import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductApi,
  getAllProductsForDistributorsApi,
  getAllProductsForManufacturerApi,
  getSingleProductApi,
} from "./apis";
import { getPolygonTxFees } from "../../utils/getPolygonTxFees";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (payload, { dispatch, getState }) => {
    const {
      name,
      description,
      d_wallet_address,
      cost,
      quantity,
      manufacturer,
      setTxInfo,
    } = payload;
    const { assetTrackerInstance } = getState().Contract;
    const { connectedWallet, connectedChainId } = getState().Wallet;

    try {
      setTxInfo({
        txStatus: "PENDING",
        txMessage: "Asset is being created. Sign metamask transaction",
      });
      return new Promise(async (resolve, reject) => {
        const { maxFeePerGas, maxPriorityFeePerGas } = await getPolygonTxFees(
          connectedChainId
        );
        const gasLimit = await assetTrackerInstance.methods
          .createAsset(
            name,
            description,
            d_wallet_address,
            cost,
            quantity,
            manufacturer,
            "a",
            "b",
            "c"
          )
          .estimateGas({
            from: connectedWallet,
            maxFeePerGas,
            maxPriorityFeePerGas,
          });

        await assetTrackerInstance.methods
          .createAsset(
            name,
            description,
            d_wallet_address,
            cost,
            quantity,
            manufacturer,
            "a",
            "b",
            "c"
          )
          .send({
            from: connectedWallet,
            maxFeePerGas,
            maxPriorityFeePerGas,
            gasLimit: gasLimit.toString(),
          })
          .once("transactionHash", (txHash) => {
            setTxInfo({
              txStatus: "PENDING",
              txMessage: "Please wait while the transaction is processing...",
              txHash,
            });
          })
          .once("receipt", async (receipt) => {
            const txHash = receipt.transactionHash;
            const fd = new FormData();
            fd.append("image", payload.file);
            fd.append("product_name", payload.name);
            fd.append("product_description", payload.description);
            fd.append("m_wallet_address", payload.m_wallet_address);
            fd.append("d_wallet_address", payload.d_wallet_address);
            fd.append("cost", payload.cost);
            fd.append("quantity", payload.quantity);
            fd.append("transaction_hash", txHash);

            try {
              const { data } = await addProductApi(fd);
              setTxInfo({
                txStatus: "SUCCESS",
                txMessage: "Asset successfully added",
              });
              resolve({ receipt, data });
            } catch (error) {
              throw error;
            }
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
export const getAllProductsForDistributors = createAsyncThunk(
  "product/getAllForDistributors",
  async (payload) => {
    const { data } = await getAllProductsForDistributorsApi(payload);
    return data;
  }
);
export const getAllProductsForManufacturer = createAsyncThunk(
  "product/getAllForDistributors",
  async (payload) => {
    const { data } = await getAllProductsForManufacturerApi(payload);
    return data;
  }
);
export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (payload) => {
    const { data } = await getSingleProductApi(payload);
    return data;
  }
);
