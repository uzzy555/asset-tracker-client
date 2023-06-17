import { useCheckWalletConnection } from "../hooks/useCheckWalletConnection";
import { useInitializeWeb3Packages } from "../hooks/useWeb3Intialize";
import {
  useInitializeContracts,
  useOnProviderChange,
} from "../hooks/web3.hooks";

const Web3Intializer = ({ children }) => {
  useInitializeWeb3Packages();
  useCheckWalletConnection();
  useOnProviderChange();
  useInitializeContracts();
  return <>{children}</>;
};

export default Web3Intializer;
