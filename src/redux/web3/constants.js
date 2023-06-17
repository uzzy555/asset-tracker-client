// mainnet chainIDs
// export const ACCEPTED_CHAIN_IDs = ["0x1", "0x89"];

// testnet chainIDs
export const ACCEPTED_CHAIN_IDs = ["0x13881"];

export const chainIdToNetworkInfo = {
  "0x89": {
    chainSymbol: "Polygon",
    blockExplorerUrl: "https://polygonscan.com",
    rpcUrl: "https://polygon-rpc.com",

    // configs to add chain in wallet
    configs: {
      chainId: "0x89",
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
    // deployed contract addresses
    contracts: {
      erc721Address: "",
      auctionAddress: "",
      marketplaceAddress: "",
    },
  },
  "0x13881": {
    chainSymbol: "Mumbai",
    blockExplorerUrl: "https://mumbai.polygonscan.com",
    rpcUrl: "https://matic-mumbai.chainstacklabs.com",

    // configs to add chain in wallet
    configs: {
      chainId: "0x13881",
      chainName: "Mumbai",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
    // deployed contract addresses
    contracts: {
      assetTrackerAddress: "0xa253463368a1932a9fc615C2B3Db2c279f041503",
    },
  },
};
