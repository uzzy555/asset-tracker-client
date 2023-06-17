import assetTrackerAbi from "../../assets/abis/assetTracker.json";

/**
 * @dev it will return and object with following properties:
 * erc721Instance, auctionInstance, marketplaceInstance
 */
export const getContractInstances = ({ web3Instance, assetTrackerAddress }) => {
  const assetTrackerInstance = new web3Instance.eth.Contract(
    assetTrackerAbi,
    assetTrackerAddress
  );
  return { assetTrackerInstance };
};
