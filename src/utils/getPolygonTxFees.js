import axios from "axios";
import { chainIdToNetworkInfo } from "../redux/web3/constants";

export const getPolygonTxFees = async (chainId = "0x89") => {
  // get max fees from gas station
  let maxFeePerGas = null;
  let maxPriorityFeePerGas = null;

  if (!["0x89", "0x13881"].includes(chainId))
    return { maxFeePerGas, maxPriorityFeePerGas };

  try {
    const { default: Web3 } = await import("web3");
    const web3 = new Web3();

    if ("0x13881" === chainId)
      return {
        maxFeePerGas: web3.utils.toWei("40", "gwei"),
        maxPriorityFeePerGas: web3.utils.toWei("40", "gwei"),
      };

    const { data } = await axios({
      method: "get",
      url: chainIdToNetworkInfo[chainId].gasStation,
    });
    maxFeePerGas = web3.utils.toWei(
      Math.ceil(data.fast.maxFee).toString(),
      "gwei"
    );
    maxPriorityFeePerGas = web3.utils.toWei(
      Math.ceil(data.fast.maxPriorityFee).toString(),
      "gwei"
    );
  } catch (err) {
    // ignore
  }

  return { maxFeePerGas, maxPriorityFeePerGas };
};
