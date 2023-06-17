import { createAsyncThunk } from "@reduxjs/toolkit";

export const initializeWeb3Packages = createAsyncThunk(
  "web3/initializeWeb3Packages",
  async () => {
    let Web3 = import(
      "web3" /* webpackPreload: true */
      /* webpackChunkName: "web3" */
    );

    let Web3Modal = import(
      "web3modal" /* webpackPreload: true */
      /* webpackChunkName: "web3modal" */
    );

    let WalletConnectProvider = import(
      "@walletconnect/web3-provider" /* webpackPreload: true */
      /* webpackChunkName: "web3-provider" */
    );

    [
      { default: Web3 },
      { default: Web3Modal },
      { default: WalletConnectProvider },
    ] = await Promise.all([Web3, Web3Modal, WalletConnectProvider]);

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "12803c9f5919455ba1ac0be83197d502",
        },
      },
    };
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
    return { Web3, web3Modal };
  }
);
