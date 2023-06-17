import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "../redux/wallet/wallet.actions";

export const useCheckWalletConnection = () => {
  const hasBeenChecked = useRef(false);
  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector((state) => state.Auth);
  const { web3PackagesLoaded } = useSelector((state) => state.Web3Instance);

  useEffect(() => {
    const isConnected = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER");
    if (
      !isUserLoggedIn &&
      web3PackagesLoaded &&
      isConnected &&
      !hasBeenChecked.current
    ) {
      dispatch(connectWallet());
      hasBeenChecked.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3PackagesLoaded]);
};
