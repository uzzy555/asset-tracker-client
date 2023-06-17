import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNetworkInfo } from "../redux/wallet/wallet.slicer";
import { getNetworkInfo } from "../redux/wallet/wallet.actions";
import { ACCEPTED_CHAIN_IDs } from "../redux/web3/constants";
import { initializeContracts } from "../redux/contract/contract.actions";

export const useOnProviderChange = () => {
  const dispatch = useDispatch();
  const { provider } = useSelector((state) => state.Web3Instance);

  useEffect(() => {
    if (!provider) return;
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      console.log(accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      let isCorrectNetwork = false;
      if (ACCEPTED_CHAIN_IDs.includes(chainId)) isCorrectNetwork = true;
      dispatch(
        updateNetworkInfo({
          connectedChainId: chainId,
          isCorrectNetwork,
        })
      );
    });

    dispatch(getNetworkInfo());
  }, [provider, dispatch]);
};

// hook on initialize contracts
export const useInitializeContracts = () => {
  const dispatch = useDispatch();
  const { web3PackagesLoaded } = useSelector((state) => state.Web3Instance);
  const { isCorrectNetwork, connectedChainId } = useSelector(
    (state) => state.Wallet
  );
  useEffect(() => {
    isCorrectNetwork && web3PackagesLoaded && dispatch(initializeContracts());
  }, [isCorrectNetwork, web3PackagesLoaded, connectedChainId, dispatch]);
};
