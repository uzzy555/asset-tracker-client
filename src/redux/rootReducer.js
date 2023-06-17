import { combineReducers } from "@reduxjs/toolkit";
import authSlicer from "./auth/auth.slicer";
import distributorsSlicer from "./distributors/distributors.slicer";
import manufacturersSlicer from "./manufacturers/manufacturers.slicer";
import productSlicer from "./product/product.slicer";
import walletSlicer from "./wallet/wallet.slicer";
import web3Slicer from "./web3/web3.slicer";
import contractSlicer from "./contract/contract.slicer";

const rootReducer = combineReducers({
  Auth: authSlicer,
  Contract: contractSlicer,
  Distributors: distributorsSlicer,
  Manufacturers: manufacturersSlicer,
  Product: productSlicer,
  Wallet: walletSlicer,
  Web3Instance: web3Slicer,
});

export default rootReducer;
